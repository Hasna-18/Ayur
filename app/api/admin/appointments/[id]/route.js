import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(_, context) {
  try {
    const { id } = await context.params; // NEXT.JS 16 FIX

    await prisma.appointment.update({
      where: { id: Number(id) },
      data: { status: "CANCELLED" },
    });

    return NextResponse.json({ message: "Cancelled" });
  } catch (error) {
    console.error("DELETE appointment error:", error);
    return NextResponse.json(
      { error: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}
