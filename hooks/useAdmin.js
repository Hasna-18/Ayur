"use client";

import { useSession } from "@/lib/auth-client";   // your file
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAdmin() {
  const { data: session, isLoading } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!session) {
      router.replace("/login");
      return;
    }

    if (session.user.role !== "admin") {
      router.replace("/not-authorized");
    }
  }, [session, isLoading]);

  return session;
}
