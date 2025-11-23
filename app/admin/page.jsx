"use client";

import useAdmin from "@/hooks/useAdmin";

export default function AdminPage() {
  const session = useAdmin();

  return (
    <div>
      Welcome Admin {session?.user?.email}
    </div>
  );
}
