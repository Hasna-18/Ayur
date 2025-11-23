import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const hashed = await auth.password.hash("YourStrongPassword123");

    const admin = await prisma.user.create({
      data: {
        email: "admin@example.com",
        password: hashed,
        role: "DOCTOR",
      },
    });

    return NextResponse.json({ message: "Admin created", admin });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
