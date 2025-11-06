import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import crypto from "crypto";

export async function POST(req) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Generate token
    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 3600000); // 1 hour

    // Save token
    await prisma.passwordReset.create({
      data: { email, token, expires },
    });

    // Send mail
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${token}`;

    await transporter.sendMail({
      from: `"hasnaabida18@gmail.com" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 1 hour.</p>
      `,
    });

    return NextResponse.json({ message: "Reset link sent to email" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error sending email" }, { status: 500 });
  }
}


