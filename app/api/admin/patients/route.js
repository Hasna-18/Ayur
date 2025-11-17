import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = 20;

    const skip = (page - 1) * limit;

    // Count total users with PATIENT role
    const total = await prisma.user.count({
      where: { role: "PATIENT" },
    });

    // Fetch users
    const patients = await prisma.user.findMany({
      where: { role: "PATIENT" },
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    // Map into frontend-friendly structure
    const cleaned = patients.map((p) => ({
      id: p.id,
      name: p.name || "Unnamed",
      age: 22, // you don’t have age field yet
      gender: "Unknown", // no gender field in your schema
      lastVisit: p.updatedAt.toISOString(),
    }));

    return NextResponse.json({
      total,
      page,
      totalPages: Math.ceil(total / limit),
      patients: cleaned,
    });
  } catch (error) {
    console.error("GET /api/admin/patients error:", error);
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}

