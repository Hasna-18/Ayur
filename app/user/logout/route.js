import { auth } from "@/lib/auth";

export async function POST() {
  await auth.api.signOut();
  return Response.json({ success: true });
}
