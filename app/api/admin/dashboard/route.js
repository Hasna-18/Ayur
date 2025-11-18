import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const now = new Date();

    const upcoming = await prisma.appointment.findMany({
      where: {
        date: { gte: now },
        status: "SCHEDULED",
      },
      orderBy: { date: "asc" },
      take: 3,
    });

    const nextAppointment = upcoming.length > 0
      ? {
          patient: upcoming[0].name,
          time: upcoming[0].time,
        }
      : null;

    const totalPatients = await prisma.appointment.groupBy({
      by: ["email"],
      _count: true,
    });

    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    const cancelledCount = await prisma.appointment.count({
      where: {
        status: "CANCELLED",
        date: { gte: thisMonthStart },
      },
    });

    return Response.json({
      upcomingCount: upcoming.length,
      nextAppointment,
      totalPatients: totalPatients.length,
      cancelledCount,
    });
  } catch (err) {
    console.error("Dashboard API Error:", err);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
