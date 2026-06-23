"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GiLotus } from "react-icons/gi";
import { authClient } from "@/lib/auth-client";
import { 
  Leaf, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  CalendarDays, 
  Clock, 
  Users, 
  ClipboardList, 
  User,
  Settings,
  AlertCircle
} from "lucide-react";
import Image from "next/image";

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({ name: "", avatar: "" });
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
      } catch (err) {
        console.error("Error loading session in admin navbar:", err);
      }
    }

    async function loadAdminProfile() {
      try {
        const res = await fetch("/api/admin/profile");
        if (res.ok) {
          const text = await res.text();
          const data = text ? JSON.parse(text) : {};
          setProfile({
            name: data.name || "",
            avatar: data.avatar || "",
          });
        }
      } catch (err) {
        console.error("Error loading admin profile in navbar:", err);
      }
    }

    loadSession();
    loadAdminProfile();
  }, []);

  // Close dropdown on click outside
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
        sessionStorage.removeItem("isAdminVerified");
      }
      await authClient.signOut();
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Appointments", href: "/admin/appointments", icon: CalendarDays },
    { name: "Availability", href: "/admin/availability", icon: Clock },
    { name: "Patients", href: "/admin/patients", icon: Users },
    { name: "Reports", href: "/admin/reports", icon: ClipboardList },
    { name: "Cancelled List", href: "/admin/cancelled-list", icon: AlertCircle },
  ];

  const displayName = profile.name || user?.name || "Admin Practitioner";
  const userInitial = displayName.charAt(0).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 bg-[#faf8f5]/90 backdrop-blur-md border-b border-[#e8e4d9]/85 transition-all duration-300 shadow-[0_2px_15px_rgba(43,58,47,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2.5 hover:opacity-95 transition group">
          <div className="p-2 rounded-xl bg-[#12372A]/5 flex items-center justify-center group-hover:bg-[#12372A]/10 transition-colors">
            <GiLotus className="w-8 h-8 text-[#C5A880]" />
          </div>
          <div>
            <div className="flex items-baseline gap-0.5">
              <span className="text-2xl font-serif-display font-bold text-[#12372A] tracking-tight leading-none">
                Ayurveechi
              </span>
              <span className="text-[#C5A880] font-bold text-lg leading-none">.</span>
            </div>
            <p className="text-[8px] uppercase tracking-wider text-[#6b7a68] font-bold mt-0.5 leading-none">
              PRACTITIONER PORTAL
            </p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
            const LinkIcon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-1.5 text-sm tracking-wide font-semibold transition-all duration-200 py-1.5 px-1 relative ${
                  isActive
                    ? "text-[#12372A] after:absolute after:bottom-[-6px] after:left-0 after:right-0 after:h-[2.5px] after:bg-[#12372A] after:rounded-full"
                    : "text-[#6b7a68] hover:text-[#12372A]"
                }`}
              >
                <LinkIcon className="w-4 h-4 text-[#C5A880]" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right Section: User Profile & Quick Actions */}
        <div className="hidden md:flex items-center gap-4">
          

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 bg-white border border-[#e8e4d9] rounded-full pl-2 pr-3.5 py-1.5 hover:bg-[#FAF8F5] transition shadow-sm cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#e8e4d9] relative bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-xs uppercase shadow-inner">
                {profile.avatar ? (
                  <Image
                    src={profile.avatar}
                    alt={displayName}
                    layout="fill"
                    objectFit="cover"
                  />
                ) : (
                  userInitial
                )}
              </div>
              <div className="text-left max-w-[120px]">
                <p className="text-xs font-bold text-[#12372A] leading-tight truncate">
                  {displayName}
                </p>
                <p className="text-[9px] text-[#6b7a68] font-bold uppercase tracking-wider leading-none mt-0.5">
                  Doctor
                </p>
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
                  <p className="text-xs font-bold text-[#12372A] truncate mt-0.5">{user?.email || "Practitioner"}</p>
                </div>
                
                <Link
                  href="/admin/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-[#6b7a68] hover:bg-[#FAF8F5] hover:text-[#12372A] transition-colors"
                >
                  <User className="w-4 h-4 text-[#C5A880]" />
                  <span>Profile Settings</span>
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

        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2.5">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors text-[#12372A] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Navigation */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "max-h-[600px] opacity-100 border-t border-[#e8e4d9]/70" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <div className="bg-[#faf8f5]/95 backdrop-blur-md px-6 py-5 flex flex-col gap-3.5 shadow-inner">
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-9 h-9 rounded-full overflow-hidden border border-[#e8e4d9] relative bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-sm uppercase shadow-sm">
              {profile.avatar ? (
                <Image
                  src={profile.avatar}
                  alt={displayName}
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                userInitial
              )}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-[#12372A] leading-tight">
                {displayName}
              </p>
              <p className="text-[10px] text-[#6b7a68] font-bold tracking-wider uppercase mt-0.5">Doctor</p>
            </div>
          </div>
          
          <hr className="border-[#e8e4d9]/50" />

          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/admin" && pathname?.startsWith(link.href));
            const LinkIcon = link.icon;
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

          <hr className="border-[#e8e4d9]/50" />

          <Link
            href="/admin/profile"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 p-3 rounded-2xl text-sm font-semibold text-[#6b7a68] hover:bg-white hover:text-[#12372A] transition-all duration-200"
          >
            <User className="w-4 h-4 text-[#C5A880]" />
            <span>Profile Settings</span>
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
  );
}
