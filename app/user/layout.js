import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function UserLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-950 via-emerald-900/90 to-background text-foreground">
      <nav className="sticky top-0 z-50 border-b border-emerald-800/40 bg-emerald-900/40 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-400 tracking-wide">
          Ayur
        </h1>
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
            href="/user/about"
            className="hover:text-emerald-400 transition-colors"
          >
            About
          </Link>

         <Button
          variant="outline"
          size="sm"
          className="border-emerald-700/40 text-emerald-300 hover:bg-emerald-800/30 hover:text-white"
          onClick={async () => {
            await fetch("/api/user/logout", { method: "POST" });
            window.location.href = "/"; // redirect to home/login
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
