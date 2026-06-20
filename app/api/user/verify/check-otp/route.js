import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(req) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const email = session.user.email;
    if (!email) {
      return NextResponse.json(
        { error: "User email address is missing from session" },
        { status: 400 }
      );
    }

    const { otp } = await req.json();
    if (!otp) {
      return NextResponse.json(
        { error: "Verification code is required" },
        { status: 400 }
      );
    }

    // Query Verification table
    const verification = await prisma.verification.findFirst({
      where: {
        identifier: email,
        value: otp.trim(),
      },
    });

    if (!verification) {
      return NextResponse.json(
        { error: "Invalid verification code. Please check and try again." },
        { status: 400 }
      );
    }

    if (new Date() > new Date(verification.expiresAt)) {
      return NextResponse.json(
        { error: "Verification code has expired. Please request a new one." },
        { status: 400 }
      );
    }

    // Verify user in database
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        emailVerified: true,
      },
    });

    // Delete verification record
    await prisma.verification.deleteMany({
      where: { identifier: email },
    });

    return NextResponse.json({ success: true, message: "Account verified successfully!" });
  } catch (error) {
    console.error("check-otp API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to verify code" },
      { status: 500 }
    );
  }
}
