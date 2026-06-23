import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const today = new Date();

    // CANCELLED LIST
    const cancelled = await prisma.appointment.findMany({
      where: { status: "CANCELLED" },
      orderBy: { date: "desc" },
    });

    // MISSED LIST
    // Missed = appointment date/time is older than now AND status = SCHEDULED (never completed)
    const missed = await prisma.appointment.findMany({
      where: {
        status: "SCHEDULED",
        date: { lt: today },
      },
      orderBy: { date: "desc" },
    });

    return Response.json({
      cancelled,
      missed,
    });

  } catch (err) {
    console.error("CANCELLED-MISSED ERROR:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
