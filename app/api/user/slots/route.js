import prisma from "@/lib/prisma";

export async function GET(req) {
  const date = new URL(req.url).searchParams.get("date");
  if (!date) return Response.json({ slots: [] });

  const picked = new Date(date + "T00:00:00.000Z");

  // FUTURE-ONLY DATE CHECK
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  if (picked <= today) {
    return Response.json({
      slots: [],
      reason: "past-or-today"
    });
  }

  // WEEKLY OFF
  const weekday = picked.getUTCDay();
  const weeklyOff = await prisma.weeklyOff.findFirst({
    where: { dayOfWeek: weekday }
  });
  if (weeklyOff) {
    return Response.json({
      slots: [],
      reason: "weekly-off",
      day: weekday
    });
  }

  // OFF DATE
  const offDate = await prisma.offDate.findFirst({ where: { date: picked } });
  if (offDate) {
    return Response.json({
      slots: [],
      reason: "off-date"
    });
  }

  // DAILY HOURS
  const daily = await prisma.dailyTime.findFirst({
    orderBy: { createdAt: "desc" }
  });
  if (!daily) {
    return Response.json({
      slots: [],
      reason: "no-daily-hours"
    });
  }

  const start = new Date(date + "T" + daily.start + ":00.000Z");
  const end = new Date(date + "T" + daily.end + ":00.000Z");

  let cursor = new Date(start);
  const slots = [];

  while (cursor < end) {
    slots.push(cursor.toISOString().substring(11, 16));
    cursor = new Date(cursor.getTime() + 30 * 60000);
  }

  // TIME-OFF (DOCTOR OFF TIMES)
  const timeOff = await prisma.timeOff.findMany({ where: { date: picked } });

  let finalSlots = slots.filter((slot) => {
    const t = new Date(date + "T" + slot + ":00.000Z");

    return !timeOff.some((block) => {
      const start = new Date(date + "T" + block.start + ":00.000Z");
      const end = new Date(date + "T" + block.end + ":00.000Z");
      return t >= start && t < end;
    });
  });

  // EXCLUDE ALREADY BOOKED/SCHEDULED APPOINTMENTS FOR THIS DATE
  const bookedAppointments = await prisma.appointment.findMany({
    where: {
      date: picked,
      status: "SCHEDULED"
    }
  });

  const bookedTimes = bookedAppointments.map(a => {
    return a.time.toISOString().substring(11, 16);
  });

  finalSlots = finalSlots.filter((slot) => !bookedTimes.includes(slot));

  if (finalSlots.length === 0) {
    return Response.json({
      slots: [],
      reason: "no-time"
    });
  }

  return Response.json({ slots: finalSlots });
}
