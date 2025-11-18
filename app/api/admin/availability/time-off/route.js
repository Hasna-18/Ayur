import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const timeOff = await prisma.timeOff.findMany({
    orderBy: [{ date: "asc" }, { start: "asc" }]
  });
  return NextResponse.json(timeOff);
}

export async function POST(req) {
  const { date, start, end } = await req.json();
  const timeOff = await prisma.timeOff.create({
    data: { date: new Date(date), start, end }
  });
  return NextResponse.json(timeOff);
}

export async function DELETE(req) {
  const id = new URL(req.url).searchParams.get("id");
  await prisma.timeOff.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
