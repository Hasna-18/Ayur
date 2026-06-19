"use client";

import { usePathname } from "next/navigation";
import { AdminNavbar } from "@/components/admin-navbar";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  
  // Exclude login and register routes from displaying the main layout navbar
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/register";

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      <AdminNavbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
