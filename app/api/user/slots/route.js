import prisma from "@/lib/prisma";

export async function GET(req) {
  const date = new URL(req.url).searchParams.get("date");
  if (!date) return Response.json({ slots: [] });

  const picked = new Date(date);

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

  const start = new Date(date + "T" + daily.start);
  const end = new Date(date + "T" + daily.end);

  let cursor = new Date(start);
  const slots = [];

  while (cursor < end) {
    slots.push(cursor.toISOString().substring(11, 16));
    cursor = new Date(cursor.getTime() + 30 * 60000);
  }

  // TIME-OFF
  const timeOff = await prisma.timeOff.findMany({ where: { date: picked } });

  const finalSlots = slots.filter((slot) => {
    const t = new Date(date + "T" + slot);

    return !timeOff.some((block) => {
      const start = new Date(block.start);
      const end = new Date(block.end);
      return t >= start && t < end;
    });
  });

  if (finalSlots.length === 0) {
    return Response.json({
      slots: [],
      reason: "no-time"
    });
  }

  return Response.json({ slots: finalSlots });
}
