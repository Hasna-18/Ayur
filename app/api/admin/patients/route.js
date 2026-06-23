import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth-helpers";

export async function GET(req) {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

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
      age: p.age !== null && p.age !== undefined ? p.age : "Not specified",
      gender: p.gender || "Not specified",
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

