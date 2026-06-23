import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const dailyTime = await prisma.dailyTime.findFirst({
      orderBy: { createdAt: "desc" }
    });
    return NextResponse.json(dailyTime || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const { start, end } = await req.json();
    const dailyTime = await prisma.dailyTime.create({ data: { start, end } });
    return NextResponse.json(dailyTime);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
