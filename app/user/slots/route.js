import prisma from "@/lib/prisma";

export async function GET(req) {
  const date = new URL(req.url).searchParams.get("date");
  if (!date) return Response.json({ slots: [] });

  const picked = new Date(date);

  // WEEKLY OFF CHECK
  const weekday = picked.getUTCDay();
  const weeklyOff = await prisma.weeklyOff.findFirst({
    where: { dayOfWeek: weekday }
  });
  if (weeklyOff) return Response.json({ slots: [] });

  // OFF DATE CHECK
  const offDate = await prisma.offDate.findFirst({ where: { date: picked } });
  if (offDate) return Response.json({ slots: [] });

  // GET DAILY HOURS
  const daily = await prisma.dailyTime.findFirst({
    orderBy: { createdAt: "desc" }
  });
  if (!daily) return Response.json({ slots: [] });

  const start = new Date(date + "T" + daily.start);
  const end = new Date(date + "T" + daily.end);

  // Generate 30-minute slots
  const slots = [];
  let cursor = new Date(start);

  while (cursor < end) {
    const iso = cursor.toISOString();
    slots.push(iso.substring(11, 16)); // "HH:mm"
    cursor = new Date(cursor.getTime() + 30 * 60000);
  }

  // Remove TIME-OFF
  const timeOff = await prisma.timeOff.findMany({ where: { date: picked } });
  const blocked = timeOff.map((t) => ({
    start: new Date(t.start),
    end: new Date(t.end),
  }));

  const finalSlots = slots.filter((slot) => {
    const t = new Date(date + "T" + slot);

    return !blocked.some((block) => t >= block.start && t < block.end);
  });

  return Response.json({ slots: finalSlots });
}
