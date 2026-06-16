
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiLotus } from "react-icons/gi";
import { authClient } from "@/lib/auth-client";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900/90 to-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-emerald-800/40 bg-emerald-900/40 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GiLotus className="w-8 h-8 text-[#d9b56d]" />
            <h1 className="text-5xl font-serif text-[#d9b56d]">
              Ayur
            </h1>
          </div>
          <p className="text-sm text-gray-300 mt-2">
            Ancient Wisdom. Modern Care.
          </p>
        </div>
        <div className="flex gap-6 items-center text-sm font-medium">
          <Link
            href="/user/dashboard"
            className="hover:text-emerald-400 transition-colors"
          >
            Dashboard
          </Link>
          <Link
            href="/user/book"
            className="hover:text-emerald-400 transition-colors"
          >
            Book
          </Link>
          <Link
            href="/user/appointment-list"
            className="hover:text-emerald-400 transition-colors"
          >
            My Appointments
          </Link>
          <Link
            href="/user/prescriptions"
            className="hover:text-emerald-400 transition-colors"
          >
            My Prescriptions
          </Link>
          <Link
            href="/about"
            className="hover:text-emerald-400 transition-colors"
          >
            About
          </Link>

          <Button
            variant="outline"
            size="sm"
            className="border-emerald-700/40 text-emerald-300 hover:bg-emerald-800/30 hover:text-white"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/login";
                  },
                },
              });
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      <main className="p-8">{children}</main>
    </div>
  );
}
