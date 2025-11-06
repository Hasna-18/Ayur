import { NextResponse } from "next/server";

export async function GET() {
  const now = new Date();

  const appointments = [
    { id: 1, patientName: "John Doe", startAt: "2025-11-08T10:30:00", status: "confirmed" },
    { id: 2, patientName: "Sara Ali", startAt: "2025-11-08T12:00:00", status: "scheduled" },
  ];

  const upcoming = appointments
    .filter(a => new Date(a.startAt) >= now)
    .sort((a, b) => new Date(a.startAt) - new Date(b.startAt));

  return NextResponse.json({
    count: upcoming.length,
    nextAppointments: upcoming,
  });
}
