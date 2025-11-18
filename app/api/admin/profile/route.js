import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const profile = await prisma.adminProfile.findFirst();
    return Response.json(profile || {});
  } catch (err) {
    return Response.json({ error: "Failed to load" }, { status: 500 });
  }
}

export async function PUT(req) {
  const data = await req.json();

  try {
    const existing = await prisma.adminProfile.findFirst();

    if (existing) {
      await prisma.adminProfile.update({
        where: { id: existing.id },
        data,
      });
    } else {
      await prisma.adminProfile.create({ data });
    }

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Failed to update" }, { status: 500 });
  }
}
