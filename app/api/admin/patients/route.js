import { NextResponse } from "next/server";

// Temporary dummy data (replace with DB later)
const patients = Array.from({ length: 103 }, (_, i) => ({
  id: i + 1,
  name: `Patient ${i + 1}`,
  age: 20 + (i % 40),
  gender: i % 2 === 0 ? "Male" : "Female",
  lastVisit: new Date(Date.now() - i * 86400000).toISOString(), // days ago
}));

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 20;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginated = patients.slice(start, end);

  return NextResponse.json({
    total: patients.length,
    page,
    totalPages: Math.ceil(patients.length / limit),
    patients: paginated,
  });
}
