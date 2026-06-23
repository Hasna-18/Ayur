import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/auth-helpers";

export async function GET() {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const timeOff = await prisma.timeOff.findMany({
      orderBy: [{ date: "asc" }, { start: "asc" }]
    });
    return NextResponse.json(timeOff);
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

    const { date, start, end } = await req.json();
    const timeOff = await prisma.timeOff.create({
      data: { date: new Date(date), start, end }
    });
    return NextResponse.json(timeOff);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const authResult = await verifyAdmin();
    if (!authResult.authorized) {
      return authResult.response;
    }

    const id = new URL(req.url).searchParams.get("id");
    await prisma.timeOff.delete({ where: { id } });
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
