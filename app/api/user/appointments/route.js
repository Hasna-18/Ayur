import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

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

    // 1) WEEKLY OFF CHECK
    const weekday = picked.getUTCDay();
    const weeklyOff = await prisma.weeklyOff.findFirst({
      where: { dayOfWeek: weekday }
    });
    if (weeklyOff) {
      return Response.json({ error: "Clinic is closed on this day" }, { status: 400 });
    }

    // 2) OFF DATE CHECK
    const offDate = await prisma.offDate.findFirst({
      where: { date: picked }
    });
    if (offDate) {
      return Response.json({ error: "Clinic is closed on this date" }, { status: 400 });
    }

    // 3) TIME OFF CHECK
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

    // 4) DAILY WORKING HOURS CHECK
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

    // 5) SAVE APPOINTMENT
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
