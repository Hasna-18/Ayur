"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GiLotus } from "react-icons/gi";
import { authClient } from "@/lib/auth-client";
import { Leaf, LogOut, Menu, X, Calendar, BookOpen, ClipboardList, User } from "lucide-react";

export default function UserLayout({ children }) {
  const pathname = usePathname();
  const [user, setUser] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("ayur_user");
      return cached ? JSON.parse(cached) : null;
    }
    return null;
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        if (userData) {
          sessionStorage.setItem("ayur_user", JSON.stringify(userData));
        } else {
          sessionStorage.removeItem("ayur_user");
        }
      } catch (err) {
        console.error("Error loading session in layout:", err);
      }
    }
    loadSession();
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      if (typeof window !== "undefined") {
        sessionStorage.clear();
      }
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
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition group">
            <div className="p-2 rounded-xl bg-[#12372A]/5 flex items-center justify-center group-hover:bg-[#12372A]/10 transition-colors">
              <GiLotus className="w-8 h-8 text-[#C5A880]" />
            </div>
            <div>
              <h1 className="text-2xl font-serif-display font-bold text-[#12372A] tracking-tight leading-none">
                ayurveechi
              </h1>
              <p className="text-[9px] uppercase tracking-wider text-[#6b7a68] font-bold mt-1 leading-none">
                Ancient Wisdom • Modern Care
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const LinkIcon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm tracking-wide font-semibold transition-all duration-200 py-2 px-3.5 rounded-xl group ${
                    isActive
                      ? "text-[#12372A] bg-[#12372A]/8 shadow-xs"
                      : "text-[#6b7a68] hover:text-[#12372A] hover:bg-[#12372A]/3"
                  }`}
                >
                  <LinkIcon className={`w-4 h-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#12372A]' : 'text-[#C5A880]'}`} />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop User Info & Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-3 bg-white border border-[#e8e4d9]/80 rounded-full pl-2 pr-4 py-1.5 shadow-[0_2px_8px_rgba(18,55,42,0.02)] hover:bg-[#FAF8F5] transition active:scale-98 select-none cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-xs uppercase shadow-sm">
                      {user.name ? user.name.charAt(0).toLowerCase() : (user.email ? user.email.charAt(0).toLowerCase() : "u")}
                    </div>
                    {user.emailVerified && (
                      <span className="absolute bottom-[-1px] left-[-1px] w-3 h-3 bg-emerald-600 rounded-full border border-white flex items-center justify-center shadow-xs">
                        <svg className="w-1.5 h-1.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="text-left">
                    <div className="flex items-center gap-1">
                      <p className="text-xs font-bold text-[#12372A] leading-tight max-w-[100px] truncate">
                        {user.name || user.email?.split("@")[0]}
                      </p>
                      {user.emailVerified && (
                        <span className="text-emerald-600 shrink-0" title="Verified Account">
                          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                            <path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.2L12 2.96 8.6 1.5 6.71 4.7 3.1 5.52l.34 3.69L1 12l2.44 2.79-.34 3.69 3.61.82 1.89 3.2 3.4-1.46 3.4 1.46 1.89-3.2 3.61-.82-.34-3.69L23 12zm-12.91 4.72l-3.8-3.81 1.48-1.48 2.32 2.33 5.85-5.87 1.48 1.48-7.33 7.35z"/>
                          </svg>
                        </span>
                      )}
                    </div>
                    <p className="text-[9px] text-[#6b7a68] font-bold uppercase tracking-wider leading-none mt-0.5">Patient</p>
                  </div>
                  <svg className={`w-3.5 h-3.5 text-[#6b7a68] transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-[#e8e4d9] rounded-2xl shadow-lg py-2 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-[#e8e4d9]/50">
                      <p className="text-[10px] font-bold uppercase text-[#6b7a68] tracking-wider">Logged In As</p>
                      <p className="text-xs font-bold text-[#12372A] truncate mt-0.5">{user.email}</p>
                    </div>
                    
                    <Link
                      href="/user/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#6b7a68] hover:bg-[#FAF8F5] hover:text-[#12372A] transition-colors"
                    >
                      <User className="w-4 h-4 text-[#C5A880]" />
                      <span>Patient Profile</span>
                    </Link>
                    
                    <hr className="border-[#e8e4d9]/50 my-1" />
                    
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>


          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            {user && (
              <Link href="/user/profile" className="relative active:scale-95 transition">
                <div className="w-8 h-8 rounded-full bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-xs uppercase shadow-sm">
                  {user.name ? user.name.charAt(0).toLowerCase() : "u"}
                </div>
                {user.emailVerified && (
                  <span className="absolute bottom-[-1px] left-[-1px] w-3 h-3 bg-emerald-600 rounded-full border border-white flex items-center justify-center shadow-xs">
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                )}
              </Link>
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
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? "max-h-[400px] opacity-100 border-t border-[#e8e4d9]/70" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="bg-[#faf8f5]/95 backdrop-blur-md px-6 py-5 flex flex-col gap-3.5 shadow-inner">
            {navLinks.map((link) => {
              const LinkIcon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "bg-[#12372A] text-white shadow-md shadow-[#12372A]/10"
                      : "text-[#6b7a68] hover:bg-white hover:text-[#12372A]"
                  }`}
                >
                  <LinkIcon className="w-4 h-4 text-[#C5A880]" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
            <hr className="border-[#e8e4d9]/50 my-1" />
            <Link
              href="/user/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-2xl text-sm font-semibold text-[#6b7a68] hover:bg-white hover:text-[#12372A] transition-all duration-200"
            >
              <User className="w-4 h-4 text-[#C5A880]" />
              <span>Patient Profile</span>
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
              className="flex items-center gap-3 p-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 text-left w-full cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
