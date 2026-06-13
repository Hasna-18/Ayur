import { NextResponse } from "next/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const { email, role } = await request.json();

    console.log(`🔄 Updating user ${email} role to ${role}`);

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    if (role !== "ADMIN" && role !== "PATIENT" && role !== "DOCTOR") {
      return NextResponse.json(
        { error: "Invalid role" },
        { status: 400 }
      );
    }

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      console.error(`❌ User not found: ${email}`);
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Update the user role
    const updatedUser = await prisma.user.update({
      where: { email },
      data: { role },
    });

    console.log(`✅ User role updated successfully:`, updatedUser);

    return NextResponse.json({
      message: "User role updated successfully",
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        name: updatedUser.name,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    console.error("❌ Error updating user role:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update user role" },
      { status: 500 }
    );
  }
}
