import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const dailyTime = await prisma.dailyTime.findFirst({
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(dailyTime || {});
}

export async function POST(req) {
  const { start, end } = await req.json();
  const dailyTime = await prisma.dailyTime.create({ data: { start, end } });
  return NextResponse.json(dailyTime);
}
