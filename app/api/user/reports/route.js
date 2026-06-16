import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

// GET user reports
export async function GET(req) {
  try {
    const session = await auth.api.getSession({
      headers: { cookie: req.headers.get("cookie") || "" },
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const patientEmail = session.user.email;

    if (!patientEmail) {
      return NextResponse.json({ error: "Patient email not found in session" }, { status: 400 });
    }

    const reports = await prisma.consultationReport.findMany({
      where: { patientEmail },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("GET /api/user/reports error:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}
