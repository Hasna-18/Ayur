import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

// --------------------- POST (BOOK APPOINTMENT) -----------------------
export async function POST(req) {
  const session = await auth.api.getSession({
    headers: { cookie: req.headers.get("cookie") || "" },
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { date: dateStr, time: timeStr, message } = body;

    if (!dateStr || !timeStr) {
      return Response.json({ error: "Date and time are required" }, { status: 400 });
    }

    const picked = new Date(dateStr + "T00:00:00.000Z");
    const userTime = new Date(dateStr + "T" + timeStr + ":00.000Z");

    // Weekly off
    const weekday = picked.getUTCDay();
    const weeklyOff = await prisma.weeklyOff.findFirst({
      where: { dayOfWeek: weekday }
    });
    if (weeklyOff) {
      return Response.json({ error: "Clinic is closed on this day" }, { status: 400 });
    }

    // Off date
    const offDate = await prisma.offDate.findFirst({
      where: { date: picked }
    });
    if (offDate) {
      return Response.json({ error: "Clinic is closed on this date" }, { status: 400 });
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
      return Response.json({ error: "This time slot is unavailable (Doctor Time Off)" }, { status: 400 });
    }

    // Daily hours
    const daily = await prisma.dailyTime.findFirst({
      orderBy: { createdAt: "desc" }
    });

    if (daily) {
      const start = new Date(dateStr + "T" + daily.start + ":00.000Z");
      const end = new Date(dateStr + "T" + daily.end + ":00.000Z");

      if (userTime < start || userTime > end) {
        return Response.json(
          { error: `Appointments allowed only between ${daily.start} - ${daily.end}` },
          { status: 400 }
        );
      }
    }

    //double booking checking
    const conflict = await prisma.appointment.findFirst({
      where: {
        time: userTime,
        status: "SCHEDULED"
      }
    });

    if (conflict) {
      return Response.json(
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

    return Response.json({ success: true, appointment });

  } catch (err) {
    return Response.json({ error: "Failed to book", details: err.message }, { status: 500 });
  }
}


// ----------------------- GET (SHOW USER APPOINTMENTS) -----------------------
export async function GET(req) {
  const session = await auth.api.getSession({
    headers: { cookie: req.headers.get("cookie") || "" },
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const email = session.user.email;

    const appointments = await prisma.appointment.findMany({
      where: { email },
      orderBy: { createdAt: "desc" },
    });

    return Response.json(
      appointments.map(a => ({
        ...a,
        id: Number(a.id),
        date: a.date.toISOString(),
        time: a.time.toISOString(),
        createdAt: a.createdAt.toISOString(),
      }))
    );

  } catch (err) {
    return Response.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
