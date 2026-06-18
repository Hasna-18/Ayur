"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GiLotus } from "react-icons/gi";
import { authClient } from "@/lib/auth-client";
import { Leaf, LogOut, Menu, X, Calendar, BookOpen, ClipboardList } from "lucide-react";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadSession() {
      try {
        const session = await authClient.getSession();
        const userData =
          session?.data?.user ||
          session?.data?.session?.user ||
          session?.session?.user ||
          session?.user ||
          null;
        setUser(userData);
      } catch (err) {
        console.error("Error loading session in layout:", err);
      }
    }
    loadSession();
  }, []);

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/user/dashboard", icon: Leaf },
    { name: "Book Appointment", href: "/user/book", icon: Calendar },
    { name: "Appointments", href: "/user/appointment-list", icon: ClipboardList },
    { name: "Prescriptions", href: "/user/prescriptions", icon: BookOpen },
  ];

  return (
    <div className="min-h-screen bg-[#f4f1e8]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-[#faf8f5]/85 backdrop-blur-md border-b border-[#e8e4d9]/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link href="/user/dashboard" className="flex items-center gap-2.5 hover:opacity-90 transition group">
            <div className="p-2 rounded-xl bg-[#12372A]/5 flex items-center justify-center group-hover:bg-[#12372A]/10 transition-colors">
              <GiLotus className="w-8 h-8 text-[#C5A880]" />
            </div>
            <div>
              <h1 className="text-2xl font-serif-display font-bold text-[#12372A] tracking-tight leading-none">
                Ayur<span className="text-[#C5A880]">.</span>
              </h1>
              <p className="text-[9px] uppercase tracking-wider text-[#6b7a68] font-bold mt-1 leading-none">
                Ancient Wisdom • Modern Care
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide font-semibold transition-all duration-200 py-1.5 relative ${
                    isActive
                      ? "text-[#12372A] after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-[#12372A] after:rounded-full"
                      : "text-[#6b7a68] hover:text-[#12372A]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Desktop User Info & Actions */}
          <div className="hidden md:flex items-center gap-5">
            {user && (
              <div className="flex items-center gap-3 border-r border-[#e8e4d9] pr-5">
                <div className="w-9 h-9 rounded-full bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-sm uppercase shadow-sm">
                  {user.name ? user.name.charAt(0).toLowerCase() : (user.email ? user.email.charAt(0).toLowerCase() : "u")}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-[#12372A] leading-tight max-w-[120px] truncate">
                    {user.name || user.email?.split("@")[0]}
                  </p>
                  <p className="text-[10px] text-[#6b7a68] font-medium leading-tight">Patient</p>
                </div>
              </div>
            )}
            
            <button 
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors py-2 px-3.5 rounded-full hover:bg-red-50 cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {user && (
              <div className="w-8 h-8 rounded-full bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-xs uppercase shadow-sm">
                {user.name ? user.name.charAt(0).toLowerCase() : "u"}
              </div>
            )}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-[#12372A] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#e8e4d9] bg-[#faf8f5] px-6 py-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-[#12372A] text-white"
                      : "text-[#6b7a68] hover:bg-slate-50 hover:text-[#12372A]"
                  }`}
                >
                  <LinkIcon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <hr className="border-[#e8e4d9] my-1" />
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all text-left w-full cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
