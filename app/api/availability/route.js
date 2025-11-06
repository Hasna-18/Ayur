import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET - fetch all availability slots
export async function GET() {
  try {
    const slots = await prisma.availability.findMany({
      orderBy: { startTime: "asc" },
    });
    return NextResponse.json(slots);
  } catch (error) {
    console.error("GET /api/availability error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}

// POST - create a new availability slot
export async function POST(req) {
  try {
    const body = await req.json();
    const { startTime, status } = body;

    if (!startTime) {
      return NextResponse.json(
        { error: "Missing startTime" },
        { status: 400 }
      );
    }

    const slot = await prisma.availability.create({
      data: {
        startTime: new Date(startTime),
        status: status || "AVAILABILITY",
      },
    });

    return NextResponse.json(slot);
  } catch (error) {
    console.error("POST /api/availability error:", error);
    return NextResponse.json(
      { error: "Failed to create slot" },
      { status: 500 }
    );
  }
}
