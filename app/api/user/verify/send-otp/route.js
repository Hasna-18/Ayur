import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";

export async function POST() {
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

    // Generate 6-digit random OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Store in Verification table
    // Delete any old OTPs for this email first
    await prisma.verification.deleteMany({
      where: { identifier: email },
    });

    await prisma.verification.create({
      data: {
        identifier: email,
        value: otp,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Valid for 10 minutes
      },
    });

    console.log(`
===================================================
📧 [VERIFICATION OTP EMAIL FOR ${email}]
Your verification code is: ${otp}
This code will expire in 10 minutes.
===================================================
    `);

    // Attempt to send email via SMTP if configured
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || "smtp.gmail.com",
          port: parseInt(process.env.SMTP_PORT || "587"),
          secure: process.env.SMTP_SECURE === "true",
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Ayur" <${process.env.SMTP_USER}>`,
          to: email,
          subject: "Ayur - Verify Your Account",
          text: `Your One-Time Password (OTP) for Ayur account verification is: ${otp}. It is valid for 10 minutes.`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; background-color: #faf8f5; border: 1px solid #e8e4d9; border-radius: 16px; max-width: 500px; color: #3e4a3d; margin: 0 auto;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h1 style="color: #12372A; margin: 0; font-family: serif; font-size: 28px;">Ayur</h1>
                <p style="font-size: 10px; text-transform: uppercase; tracking-wider: 1px; color: #6b7a68; margin-top: 5px;">Ancient Wisdom • Modern Care</p>
              </div>
              
              <h2 style="color: #12372A; font-size: 20px; font-weight: bold; border-bottom: 1px solid #e8e4d9; padding-bottom: 10px;">Verify Your Account</h2>
              <p>Hello,</p>
              <p>Thank you for choosing Ayur. To complete your account verification and proceed with booking your appointment, please use the verification code below:</p>
              
              <div style="font-size: 26px; font-weight: bold; background-color: #e2ebe4; padding: 18px; text-align: center; border-radius: 10px; letter-spacing: 5px; color: #12372A; border: 1px solid #c1d0b5; margin: 25px 0; font-family: monospace;">
                ${otp}
              </div>
              
              <p style="font-size: 12px; color: #6b7a68; line-height: 1.5;">This verification code is valid for <strong>10 minutes</strong>. If you did not request this code, you can safely ignore this email.</p>
              <hr style="border: none; border-top: 1px solid #e8e4d9; margin: 25px 0;" />
              <p style="font-size: 10px; text-align: center; color: #a1825b; margin: 0;">© 2026 Ayur. All rights reserved.</p>
            </div>
          `,
        });
        console.log(`✅ Verification email sent successfully to ${email}`);
      } catch (mailErr) {
        console.error("❌ Failed to send SMTP email:", mailErr);
      }
    } else {
      console.log("ℹ️ SMTP credentials are not configured in .env. OTP logged to console above.");
    }

    return NextResponse.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("send-otp API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send OTP" },
      { status: 500 }
    );
  }
}
