"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminNavbar } from "@/components/admin-navbar";
import { GiLotus } from "react-icons/gi";

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const isLoginPage = pathname === "/admin/login";
  const isAuthPage = pathname === "/admin/login" || pathname === "/admin/register";

  useEffect(() => {
    if (isAuthPage) {
      if (isLoginPage && typeof window !== "undefined") {
        sessionStorage.removeItem("isAdminVerified");
      }
      setLoading(false);
      setAuthorized(true);
      return;
    }

    // 1. Check if already authorized in React state
    if (authorized) {
      setLoading(false);
      return;
    }

    // 2. Check if already verified in session storage to avoid flashing loaders
    if (typeof window !== "undefined" && sessionStorage.getItem("isAdminVerified") === "true") {
      setAuthorized(true);
      setLoading(false);
      return;
    }

    async function checkAuth() {
      try {
        setLoading(true);
        const res = await fetch("/api/auth/get-user");
        if (!res.ok) {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("isAdminVerified");
          }
          router.replace("/admin/login");
          return;
        }

        const data = await res.json();
        if (data?.user?.role !== "ADMIN") {
          if (typeof window !== "undefined") {
            sessionStorage.removeItem("isAdminVerified");
          }
          router.replace("/admin/login");
          return;
        }

        if (typeof window !== "undefined") {
          sessionStorage.setItem("isAdminVerified", "true");
        }
        setAuthorized(true);
      } catch (err) {
        console.error("Auth check error:", err);
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    }

    checkAuth();
  }, [pathname, isAuthPage, isLoginPage, authorized, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center font-sans select-none animate-fade-in">
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
          .font-hand { font-family: 'Caveat', cursive; }
          .font-serif-display { font-family: 'Playfair Display', serif; }
          @keyframes spin-slow {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 15s linear infinite;
          }
        `}} />
        <div className="flex flex-col items-center text-center p-8 bg-white/85 backdrop-blur-sm rounded-[32px] border border-[#e8e4d9]/85 shadow-[0_15px_35px_rgba(43,58,47,0.03)] border-t-[8px] border-t-[#12372A] w-[320px]">
          <div className="w-14 h-14 bg-[#eef3e5] border border-[#c1d0b5]/50 rounded-2xl flex items-center justify-center shadow-sm mb-4">
            <GiLotus className="w-9 h-9 text-[#C5A880] animate-spin-slow" />
          </div>
          <p className="font-hand text-3xl text-emerald-800 font-medium leading-none mb-1">
            AyurVeechi
          </p>
          <h2 className="text-xl font-bold font-serif-display text-[#12372A] tracking-tight">
            Verifying Access...
          </h2>
          <div className="w-12 h-[2px] bg-[#a1825b] mt-3" />
        </div>
      </div>
    );
  }

  if (!authorized) {
    return null; // Prevents flashing content
  }

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

