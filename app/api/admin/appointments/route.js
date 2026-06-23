import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { generateJitsiRoomName, getJitsiRoomExpiry, isJitsiRoomActive } from "@/lib/jitsi-utils";
import { verifyAdmin } from "@/lib/auth-helpers";

// GET all appointments
export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: { time: "asc" },
    });

    const enriched = await Promise.all(
      appointments.map(async (appointment) => {
        let room = appointment.jitsiRoom;

        if (!room && appointment.status === "SCHEDULED" && isJitsiRoomActive(appointment.time)) {
          room = generateJitsiRoomName(appointment.id);
          await prisma.appointment.update({
            where: { id: appointment.id },
            data: { jitsiRoom: room },
          });
        }

        return {
          ...appointment,
          jitsiRoom: room,
          meetingExpired: !isJitsiRoomActive(appointment.time),
          meetingExpiresAt: getJitsiRoomExpiry(appointment.time),
        };
      })
    );

    // Always return a valid JSON response (even if empty)
    return NextResponse.json(enriched);
  } catch (error) {
    console.error("GET /api/admin/appointments error:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}
