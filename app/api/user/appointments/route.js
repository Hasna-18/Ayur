import prisma from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function POST(req) {
  // AUTH CHECK
  const session = await auth.api.getSession({
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    const appointment = await prisma.appointment.create({
      data: {
        name: session.user.name || "Unknown User",
        email: session.user.email,
        message: body.message,
        date: body.date,
        time: body.time,
      },
    });

    return Response.json({ success: true, appointment });
  } catch (err) {
    console.error("ERROR:", err);
    return Response.json({ error: "Failed", details: err.message }, { status: 500 });
  }
}

export async function GET(req) {
  // AUTH CHECK
  const session = await auth.api.getSession({
    headers: {
      cookie: req.headers.get("cookie") || "",
    },
  });

  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: "desc" },
    });

    const clean = appointments.map(a => ({
      ...a,
      id: Number(a.id),
      date: a.date.toISOString(),
      time: a.time.toISOString(),
      createdAt: a.createdAt.toISOString(),
    }));

    return Response.json(clean);
  } catch (err) {
    console.error("DB Error:", err);
    return Response.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}
