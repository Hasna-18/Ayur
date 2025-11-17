export async function DELETE(request, { params }) {
  const resolved = await params; // 💥 unlock the promise
  const id = Number(resolved.id);

  console.log("Resolved Params:", resolved);
  console.log("Parsed ID:", id);

  if (!Number.isInteger(id)) {
    return new Response(JSON.stringify({ error: "Invalid id" }), {
      status: 400,
    });
  }

  try {
    await prisma.appointment.delete({ where: { id } });
    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json(
      { error: "Failed to cancel appointment" },
      { status: 500 }
    );
  }
}
