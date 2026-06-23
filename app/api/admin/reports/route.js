import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";
import { verifyAdmin } from "@/lib/auth-helpers";

// GET all reports (Admin)
export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const reports = await prisma.consultationReport.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(reports);
  } catch (error) {
    console.error("GET /api/admin/reports error:", error);
    return NextResponse.json({ error: "Failed to fetch reports" }, { status: 500 });
  }
}

// POST create report with file upload
export async function POST(req) {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const doctorName = authResult.session?.user?.name || "Doctor";

    const formData = await req.formData();
    const appointmentIdStr = formData.get("appointmentId");
    const appointmentId = appointmentIdStr ? parseInt(appointmentIdStr, 10) : null;
    const patientEmail = formData.get("patientEmail");
    const patientName = formData.get("patientName") || "Patient";
    const tips = formData.get("tips") || "";
    const plans = formData.get("plans") || "";
    const medicines = formData.get("medicines") || "";
    const file = formData.get("file");

    if (!patientEmail) {
      return NextResponse.json({ error: "Patient email is required" }, { status: 400 });
    }

    let fileName = null;
    let fileUrl = null;

    if (file && typeof file === "object" && file.size > 0) {
      fileName = file.name;
      const fileBytes = await file.arrayBuffer();
      const buffer = Buffer.from(fileBytes);

      // Create uploads directory inside public
      const uploadDir = path.join(process.cwd(), "public", "uploads");
      await fs.mkdir(uploadDir, { recursive: true });

      // Generate safe unique filename
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const safeName = uniqueSuffix + "-" + fileName.replace(/[^a-zA-Z0-9.-]/g, "_");
      const filePath = path.join(uploadDir, safeName);

      await fs.writeFile(filePath, buffer);
      fileUrl = `/uploads/${safeName}`;
    }

    const report = await prisma.consultationReport.create({
      data: {
        appointmentId,
        patientEmail,
        patientName,
        doctorName,
        tips,
        plans,
        medicines,
        fileName,
        fileUrl,
      },
    });

    // Mark appointment as COMPLETED when report is sent
    if (appointmentId && !isNaN(appointmentId)) {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: "COMPLETED" },
      });
    }

    return NextResponse.json({ success: true, report });
  } catch (error) {
    console.error("POST /api/admin/reports error:", error);
    return NextResponse.json({ error: "Failed to create consultation report" }, { status: 500 });
  }
}
