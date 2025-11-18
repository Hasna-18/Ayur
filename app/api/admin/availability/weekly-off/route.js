import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const weeklyOff = await prisma.weeklyOff.findMany({
      orderBy: { dayOfWeek: "asc" }
    });
    return NextResponse.json(weeklyOff);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const { dayOfWeek } = await req.json();

    const existing = await prisma.weeklyOff.findFirst({ where: { dayOfWeek } });
    if (existing) {
      return NextResponse.json(
        { error: "Already exists" },
        { status: 400 }
      );
    }

    const weeklyOff = await prisma.weeklyOff.create({ data: { dayOfWeek } });
    return NextResponse.json(weeklyOff);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const id = new URL(req.url).searchParams.get("id");
    await prisma.weeklyOff.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
