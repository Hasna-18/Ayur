import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const offDates = await prisma.offDate.findMany({ orderBy: { date: "asc" } });
  return NextResponse.json(offDates);
}

export async function POST(req) {
  const { date } = await req.json();
  const offDate = await prisma.offDate.create({
    data: { date: new Date(date) }
  });
  return NextResponse.json(offDate);
}

export async function DELETE(req) {
  const id = new URL(req.url).searchParams.get("id");
  await prisma.offDate.delete({ where: { id } });
  return NextResponse.json({ message: "Deleted" });
}
