import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcryptjs from "bcryptjs";

const ADMIN_EMAIL = "admin@example.com";
const ADMIN_PASSWORD = "Admin123456";

export async function GET() {
  try {
    // Check if admin already exists
    const existingAdmin = await prisma.user.findUnique({
      where: { email: ADMIN_EMAIL },
    });                                                                                                                                            
  
    if (existingAdmin) {
      return NextResponse.json({ 
        message: "Admin already exists",
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD
      });
    }

    // Hash password with bcryptjs
    const hashed = await bcryptjs.hash(ADMIN_PASSWORD, 10);

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        email: ADMIN_EMAIL,
        password: hashed,
        role: "ADMIN",
        name: "Administrator",
        emailVerified: true,
      },
    });

    return NextResponse.json({ 
      message: "Admin created successfully",
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
      admin 
    });
  } catch (err) {
    console.error("Error creating admin:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
