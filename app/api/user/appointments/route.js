import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { generateJitsiRoomName, getJitsiRoomExpiry, isJitsiRoomActive } from "@/lib/jitsi-utils";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

// --------------------- POST (BOOK APPOINTMENT) -----------------------
export async function POST(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { date: dateStr, time: timeStr, message } = body;

    if (!dateStr || !timeStr) {
      return NextResponse.json({ error: "Date and time are required" }, { status: 400 });
    }

    const picked = new Date(dateStr + "T00:00:00.000Z");
    const userTime = new Date(dateStr + "T" + timeStr + ":00.000Z");

    // Future-only date check: Booking is only allowed for dates strictly after today (tomorrow or later)
    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    if (picked <= today) {
      return NextResponse.json(
        { error: "Appointments can only be booked for dates after today (tomorrow or later)." },
        { status: 400 }
      );
    }

    // Weekly off
    const weekday = picked.getUTCDay();
    const weeklyOff = await prisma.weeklyOff.findFirst({
      where: { dayOfWeek: weekday }
    });
    if (weeklyOff) {
      return NextResponse.json({ error: "Clinic is closed on this day" }, { status: 400 });
    }

    // Off date
    const offDate = await prisma.offDate.findFirst({
      where: { date: picked }
    });
    if (offDate) {
      return NextResponse.json({ error: "Clinic is closed on this date" }, { status: 400 });
    }

    // Time off
    const timeOffs = await prisma.timeOff.findMany({
      where: { date: picked }
    });
    const isTimeOff = timeOffs.some((block) => {
      const start = new Date(dateStr + "T" + block.start + ":00.000Z");
      const end = new Date(dateStr + "T" + block.end + ":00.000Z");
      return userTime >= start && userTime < end;
    });
    if (isTimeOff) {
      return NextResponse.json({ error: "This time slot is unavailable (Doctor Time Off)" }, { status: 400 });
    }

    // Daily hours
    const daily = await prisma.dailyTime.findFirst({
      orderBy: { createdAt: "desc" }
    });

    if (daily) {
      const start = new Date(dateStr + "T" + daily.start + ":00.000Z");
      const end = new Date(dateStr + "T" + daily.end + ":00.000Z");

      if (userTime < start || userTime > end) {
        return NextResponse.json(
          { error: `Appointments allowed only between ${daily.start} - ${daily.end}` },
          { status: 400 }
        );
      }
    }

    // double booking checking (conflict check)
    const conflict = await prisma.appointment.findFirst({
      where: {
        time: userTime,
        status: "SCHEDULED"
      }
    });

    if (conflict) {
      return NextResponse.json(
        { error: "This time slot is already booked. Please choose another time." },
        { status: 400 }
      );
    }

    const appointment = await prisma.appointment.create({
      data: {
        name: session.user.name || "Patient",
        email: session.user.email,
        message: message,
        date: picked,
        time: userTime,
        status: "SCHEDULED",
      },
    });

    const jitsiRoom = generateJitsiRoomName(appointment.id);
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointment.id },
      data: { jitsiRoom },
    });

    return NextResponse.json({
      success: true,
      appointment: {
        ...updatedAppointment,
        id: Number(updatedAppointment.id),
        date: updatedAppointment.date.toISOString(),
        time: updatedAppointment.time.toISOString(),
        createdAt: updatedAppointment.createdAt.toISOString(),
        meetingExpired: !isJitsiRoomActive(updatedAppointment.time),
        meetingExpiresAt: getJitsiRoomExpiry(updatedAppointment.time),
      },
    });

  } catch (err) {
    return NextResponse.json({ error: "Failed to book", details: err.message }, { status: 500 });
  }
}


// ----------------------- GET (SHOW USER APPOINTMENTS) -----------------------
export async function GET(req) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const email = session.user.email;

    const appointments = await prisma.appointment.findMany({
      where: { email },
      orderBy: [
        { date: "desc" },
        { time: "desc" }
      ],
    });

    const enriched = await Promise.all(
      appointments.map(async (appointment) => {
        let room = appointment.jitsiRoom;

        if (!room && appointment.status === "SCHEDULED" && isJitsiRoomActive(appointment.time)) {
          room = generateJitsiRoomName(appointment.id);
          await prisma.appointment.update({
            where: { id: appointment.id },
            data: { jitsiRoom: room },
          });
        }

        return {
          ...appointment,
          id: Number(appointment.id),
          date: appointment.date.toISOString(),
          time: appointment.time.toISOString(),
          createdAt: appointment.createdAt.toISOString(),
          jitsiRoom: room,
          meetingExpired: !isJitsiRoomActive(appointment.time),
          meetingExpiresAt: getJitsiRoomExpiry(appointment.time),
        };
      })
    );

    return NextResponse.json(enriched);

  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
