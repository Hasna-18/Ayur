import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const now = new Date();

    const data = await prisma.appointment.findMany({
      where: {
        time: { gte: now },
      },
      orderBy: { time: "asc" },
      take: 10,
    });

    // Convert shape for frontend
    const nextAppointments = data.map((appt) => ({
      id: appt.id,
      patientName: appt.name,
      startAt: appt.time.toISOString(), // JSON-safe
      status: "SCHEDULED", // until you add true status
    }));

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


async function cancelAppointment(id) {
  const res = await fetch(`/api/admin/appointments/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    alert("Failed to cancel appointment");
    return;
  }

  setUpcoming((prev) => ({
  ...prev,
  nextAppointments: prev.nextAppointments.map(a =>
    a.id === id ? { ...a, status: "CANCELLED" } : a
  ),
}));
}
