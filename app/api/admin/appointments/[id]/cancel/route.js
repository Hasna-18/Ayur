import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";   // ← you forgot this

export async function POST(req, context) {
  try {
    const { id } = await context.params;      // params is a Promise
    const numId = Number(id);

    await prisma.appointment.update({
      where: { id: numId },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ message: "Cancelled" });
  } catch (error) {
    console.error("Cancel error:", error);
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }
}
