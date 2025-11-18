import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all weekly off days
export async function GET() {
  try {
    const weeklyOff = await prisma.weeklyOff.findMany({
      orderBy: { dayOfWeek: "asc" }
    });
    return NextResponse.json(weeklyOff);
  } catch (error) {
    console.error("GET /api/admin/availability/weekly-off error:", error);
    return NextResponse.json(
      { error: "Failed to fetch weekly off days" },
      { status: 500 }
    );
  }
}

// POST - add weekly off day
export async function POST(req) {
  try {
    const { dayOfWeek } = await req.json();

    if (dayOfWeek === undefined || dayOfWeek < 0 || dayOfWeek > 6) {
      return NextResponse.json(
        { error: "Invalid dayOfWeek (0-6)" },
        { status: 400 }
      );
    }

    // Check if already exists
    const existing = await prisma.weeklyOff.findFirst({
      where: { dayOfWeek }
    });

    if (existing) {
      return NextResponse.json(
        { error: "This day is already marked as weekly off" },
        { status: 400 }
      );
    }

    const weeklyOff = await prisma.weeklyOff.create({
      data: { dayOfWeek }
    });

    return NextResponse.json(weeklyOff);
  } catch (error) {
    console.error("POST /api/admin/availability/weekly-off error:", error);
    return NextResponse.json(
      { error: "Failed to create weekly off" },
      { status: 500 }
    );
  }
}

// DELETE - remove weekly off day
export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    await prisma.weeklyOff.delete({
      where: { id }
    });

    return NextResponse.json({ message: "Weekly off day removed" });
  } catch (error) {
    console.error("DELETE /api/admin/availability/weekly-off error:", error);
    return NextResponse.json(
      { error: "Failed to delete weekly off" },
      { status: 500 }
    );
  }
}