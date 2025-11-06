import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { time: "asc" },
    });

    // Always return a valid JSON response (even if empty)
    return NextResponse.json(appointments);
  } catch (error) {
    console.error("GET /api/appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
