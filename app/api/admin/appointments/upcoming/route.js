import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const now = new Date();

    const nextAppointments = await prisma.appointment.findMany({
      where: {
        time: { gte: now }, // only upcoming appointments
      },
      orderBy: { time: "asc" },
      take: 10,
    });

    return NextResponse.json({
      count: nextAppointments.length,
      nextAppointments,
    });
  } catch (error) {
    console.error("GET /api/appointments/upcoming error:", error);
    return NextResponse.json(
      { error: "Failed to fetch upcoming appointments" },
      { status: 500 }
    );
  }
}
