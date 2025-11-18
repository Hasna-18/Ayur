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
    const picked = new Date(body.date);
    const userTime = new Date(body.time);

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
    const timeOff = await prisma.timeOff.findFirst({
      where: {
        date: picked,
        start: { lte: userTime.toISOString() },
        end: { gte: userTime.toISOString() }
      }
    });
    if (timeOff) {
      return Response.json({ error: "This time slot is unavailable" }, { status: 400 });
    }

    // Daily hours
    const daily = await prisma.dailyTime.findFirst({
      orderBy: { createdAt: "desc" }
    });

    if (daily) {
      const start = new Date(body.date + "T" + daily.start);
      const end = new Date(body.date + "T" + daily.end);

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
        date: body.date,
        time: body.time
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
        name: session.user.name,
        email: session.user.email,
        message: body.message,
        date: body.date,
        time: body.time,
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
