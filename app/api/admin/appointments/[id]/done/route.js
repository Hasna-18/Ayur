import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, context) {
  try {
    const { id } = await context.params;    // ← unwrap the Promise
    const numId = Number(id);               // convert to number

    await prisma.appointment.update({
      where: { id: numId },
      data: { status: "COMPLETED" }
    });

    return NextResponse.json({ message: "Done" });
  } catch (error) {
    console.error("Done error:", error);
    return NextResponse.json({ error: "Failed to mark done" }, { status: 500 });
  }
}
