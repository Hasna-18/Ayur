"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Settings, Clock, MapPin, Activity, Sparkles, ArrowRight, Leaf } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

export default function AdminDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    specialization: "",
    clinicAddress: "",
    avatar: "",
  });

  const [stats, setStats] = useState({
    upcomingCount: 0,
    nextAppointment: null,
    totalPatients: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  async function loadProfile() {
    try {
      const res = await fetch("/api/admin/profile");
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      setProfile({
        name: data.name || "Doctor",
        specialization: data.specialization || "",
        clinicAddress: data.clinicAddress || "",
        avatar: data.avatar || "",
      });
    } catch (err) {
      console.error("Profile load error:", err);
    }
  }

  async function loadStats() {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats load error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans pb-24 pt-10 px-4 md:px-8 select-none">
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

      {/* BACKGROUND DECORATIVE LEAVES */}
      <div className="absolute top-0 left-0 opacity-[0.85] pointer-events-none mix-blend-multiply w-[280px] md:w-[360px] h-[280px] md:h-[360px] z-0 select-none">
        <Image src="/l11.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute top-0 right-0 opacity-[0.85] pointer-events-none mix-blend-multiply rotate-[90deg] w-[280px] md:w-[360px] h-[280px] md:h-[360px] z-0 select-none">
        <Image src="/l12.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      
      {/* BOTTOM RIGHT GOLD MANDALA DECORATION */}
      <div className="absolute bottom-0 right-0 opacity-[0.12] pointer-events-none mix-blend-multiply w-[360px] md:w-[480px] h-[360px] md:h-[480px] z-0 select-none translate-x-[15%] translate-y-[15%]">
        <Image src="/g1.png" alt="Mandala Decoration" layout="fill" objectFit="contain" />
      </div>

      <div className="absolute -bottom-16 -right-16 opacity-[0.75] pointer-events-none mix-blend-multiply rotate-[45deg] w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image src="/l13.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>

      {/* CORNER MORTAR AND PESTLE */}
      <div className="absolute bottom-0 left-0 w-[260px] md:w-[340px] h-[260px] md:h-[340px] z-10 pointer-events-none select-none translate-x-[-12%] translate-y-[12%]">
        <Image src="/admin/profile.png" alt="Ayurvedic Mortar & Pestle" layout="fill" objectFit="contain" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="max-w-5xl mx-auto flex flex-col gap-10 relative z-20">

        {/* HERO SECTION */}
        <section className="w-full">
          <div className="bg-white rounded-[32px] border border-[#e8e4d9]/85 p-6 md:p-10 shadow-[0_15px_35px_rgba(43,58,47,0.02)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden border-t-[8px] border-t-[#12372A]">

            {/* HERO TEXT CONTENT */}
            <div className="flex-1 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold uppercase tracking-wider bg-[#eef3e5] border border-[#c1d0b5]/50 rounded-full px-3.5 py-1.5 shadow-sm">
                  <Leaf className="w-3.5 h-3.5 text-emerald-800" />
                  LEAD PRACTITIONER
                </span>
                <span className="flex items-center gap-1.5 text-[10px] text-amber-800 font-bold uppercase tracking-wider bg-[#fff9eb] border border-amber-200/50 rounded-full px-3.5 py-1.5 shadow-sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  ACTIVE SESSION
                </span>
              </div>

              <div>
                <h2 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] tracking-tight flex items-center gap-2 flex-wrap">
                  Welcome, {profile.name}
                  <Leaf className="w-8 h-8 text-emerald-800/60 rotate-45 transform shrink-0 inline-block align-middle ml-1" />
                </h2>
                {profile.specialization && (
                  <p className="font-hand text-3xl text-emerald-800 font-medium leading-none mt-2">
                    {profile.specialization}
                  </p>
                )}
              </div>

              {profile.clinicAddress && (
                <div className="flex items-center gap-2 text-sm text-[#6b7a68] font-medium">
                  <MapPin className="w-4 h-4 text-[#a1825b]" />
                  <span>{profile.clinicAddress}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-4 pt-2">
                <Link href="/admin/appointments">
                  <Button className="bg-[#12372A] hover:bg-[#1a4335] text-white rounded-xl px-5 py-4 flex items-center gap-2 shadow-md transition-all duration-300 font-semibold border-none cursor-pointer text-sm">
                    <CalendarDays className="w-4 h-4 text-white" />
                    View Appointments
                    <ArrowRight className="w-4 h-4 text-white ml-0.5" />
                  </Button>
                </Link>

                <Link href="/admin/availability">
                  <Button variant="outline" className="border border-[#e8e4d9] text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-xl px-5 py-4 font-semibold shadow-sm transition-all duration-300 flex items-center gap-2 text-sm cursor-pointer">
                    <CalendarDays className="w-4 h-4 text-[#12372A]" />
                    Manage Availability
                  </Button>
                </Link>
              </div>
            </div>

            {/* AVATAR AND LEAF DECORATION */}
            <div className="relative flex-shrink-0">
              {/* Decorative background dotted circle */}
              <div className="absolute -inset-4 rounded-full border border-dashed border-[#C5A880]/30 pointer-events-none z-0 animate-spin-slow"></div>

              {/* Decorative sparkles */}
              <div className="absolute -top-6 -left-6 text-[#C5A880]/30 pointer-events-none z-0">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="absolute -bottom-6 -right-6 text-[#C5A880]/30 pointer-events-none z-0">
                <Sparkles className="w-4 h-4" />
              </div>

              {/* Organic Leaves framing the avatar */}
              <div className="absolute -left-14 -top-6 w-24 h-24 z-0 pointer-events-none mix-blend-multiply opacity-80 select-none">
                <Image src="/l11.png" alt="" layout="fill" objectFit="contain" />
              </div>
              <div className="absolute -right-14 -bottom-6 w-24 h-24 z-0 pointer-events-none mix-blend-multiply opacity-80 select-none rotate-[100deg]">
                <Image src="/l12.png" alt="" layout="fill" objectFit="contain" />
              </div>

              <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border-4 border-[#faf8f5] relative z-10 bg-white">
                <Image
                  src={profile.avatar || "/g33.png"}
                  alt="Doctor Avatar"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute bottom-0 right-0 bg-[#12372A] text-[#FAF8F5] p-2.5 rounded-full shadow-md z-20 border-2 border-white flex items-center justify-center">
                <GiLotus className="w-5 h-5 text-[#C5A880]" />
              </div>
            </div>

          </div>
        </section>

        {/* CLINIC PERFORMANCE SUMMARY */}
        <section className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold font-serif-display text-[#12372A] flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-[#eef3e5] flex items-center justify-center text-emerald-800 border border-[#c1d0b5]/30">
                  <GiLotus className="w-5 h-5 text-emerald-800" />
                </div>
                Clinic Performance Summary
              </h3>
              <div className="w-20 h-[2px] bg-[#a1825b] mt-2 ml-11" />
            </div>

            {/* Styled Date Dropdown Badge */}
            <div className="bg-white rounded-xl border border-[#e8e4d9]/85 px-4 py-2 flex items-center gap-2.5 text-sm font-semibold text-[#12372A] shadow-sm select-none">
              <CalendarDays className="w-4.5 h-4.5 text-[#a1825b]" />
              <span>Today, {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              <svg className="w-4 h-4 text-[#6b7a68] ml-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* UPCOMING APPOINTMENTS */}
            <Link href="/admin/appointments/upcoming" className="block group">
              <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 border-l-[6px] border-l-[#c1d0b5] p-6 shadow-[0_8px_30px_rgba(43,58,47,0.01)] hover:shadow-[0_15px_35px_rgba(43,58,47,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#eef3e5] flex items-center justify-center text-emerald-800">
                    <CalendarDays className="w-4.5 h-4.5 text-[#12372A]" />
                  </div>
                  <span className="text-xs font-bold text-[#12372A] uppercase tracking-wider">
                    Upcoming
                  </span>
                </div>

                <div className="mt-4 z-10">
                  <div className="text-5xl font-bold font-serif-display text-[#12372A]">
                    {stats.upcomingCount}
                  </div>
                  <p className="text-xs font-medium text-[#6b7a68] mt-1.5 line-clamp-2 leading-relaxed">
                    {stats.nextAppointment
                      ? `Next: ${new Date(stats.nextAppointment.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} with ${stats.nextAppointment.patient}`
                      : "No upcoming sessions"}
                  </p>
                </div>

                {/* Calendar SVG Watermark */}
                <svg className="absolute bottom-4 right-4 w-20 h-20 text-[#12372A]/[0.03] pointer-events-none select-none transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <circle cx="8" cy="14" r="1" fill="currentColor" />
                  <circle cx="12" cy="14" r="1" fill="currentColor" />
                  <circle cx="16" cy="14" r="1" fill="currentColor" />
                  <circle cx="8" cy="18" r="1" fill="currentColor" />
                  <circle cx="12" cy="18" r="1" fill="currentColor" />
                  <circle cx="16" cy="18" r="1" fill="currentColor" />
                </svg>

                {/* Corner Leaf Watermark */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-30 pointer-events-none select-none rotate-[45deg] mix-blend-multiply">
                  <Image src="/l13.png" alt="" layout="fill" objectFit="contain" />
                </div>
              </div>
            </Link>

            {/* TOTAL PATIENTS */}
            <Link href="/admin/patients" className="block group">
              <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 border-l-[6px] border-l-[#C5A880] p-6 shadow-[0_8px_30px_rgba(43,58,47,0.01)] hover:shadow-[0_15px_35px_rgba(43,58,47,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fff9eb] flex items-center justify-center text-amber-800">
                    <Users className="w-4.5 h-4.5 text-[#12372A]" />
                  </div>
                  <span className="text-xs font-bold text-[#12372A] uppercase tracking-wider">
                    Patients
                  </span>
                </div>

                <div className="mt-4 z-10">
                  <div className="text-5xl font-bold font-serif-display text-[#12372A]">
                    {stats.totalPatients}
                  </div>
                  <p className="text-xs font-medium text-[#6b7a68] mt-1.5">
                    Unique practitioner files
                  </p>
                </div>

                {/* Users SVG Watermark */}
                <svg className="absolute bottom-4 right-4 w-20 h-20 text-[#12372A]/[0.03] pointer-events-none select-none transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

                {/* Corner Leaf Watermark */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-30 pointer-events-none select-none rotate-[45deg] mix-blend-multiply">
                  <Image src="/l13.png" alt="" layout="fill" objectFit="contain" />
                </div>
              </div>
            </Link>

            {/* CANCELLED / MISSED */}
            <Link href="/admin/cancelled-list" className="block group">
              <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 border-l-[6px] border-l-[#dca4a4] p-6 shadow-[0_8px_30px_rgba(43,58,47,0.01)] hover:shadow-[0_15px_35px_rgba(43,58,47,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fff5f5] flex items-center justify-center text-red-600">
                    <Clock className="w-4.5 h-4.5 text-[#12372A]" />
                  </div>
                  <span className="text-xs font-bold text-[#12372A] uppercase tracking-wider">
                    Cancelled
                  </span>
                </div>

                <div className="mt-4 z-10">
                  <div className="text-5xl font-bold font-serif-display text-[#12372A]">
                    {stats.cancelledCount}
                  </div>
                  <p className="text-xs font-medium text-[#6b7a68] mt-1.5">
                    Missed slot count this month
                  </p>
                </div>

                {/* Clock SVG Watermark */}
                <svg className="absolute bottom-4 right-4 w-20 h-20 text-[#12372A]/[0.03] pointer-events-none select-none transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>

                {/* Corner Leaf Watermark */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-30 pointer-events-none select-none rotate-[45deg] mix-blend-multiply">
                  <Image src="/l13.png" alt="" layout="fill" objectFit="contain" />
                </div>
              </div>
            </Link>

            {/* SETTINGS */}
            <Link href="/admin/profile" className="block group">
              <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 border-l-[6px] border-l-[#12372A] p-6 shadow-[0_8px_30px_rgba(43,58,47,0.01)] hover:shadow-[0_15px_35px_rgba(43,58,47,0.03)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-[#fff9eb] flex items-center justify-center text-amber-800">
                    <Settings className="w-4.5 h-4.5 text-[#12372A]" />
                  </div>
                  <span className="text-xs font-bold text-[#12372A] uppercase tracking-wider">
                    Settings
                  </span>
                </div>

                <div className="mt-4 z-10 text-left">
                  <div className="text-xl font-bold font-serif-display text-[#12372A] leading-snug">
                    Profile settings
                  </div>
                  <p className="text-xs font-medium text-[#6b7a68] mt-1.5 leading-relaxed">
                    Edit bio, specialization, and details
                  </p>
                </div>

                {/* Gear SVG Watermark */}
                <svg className="absolute bottom-4 right-4 w-20 h-20 text-[#12372A]/[0.03] pointer-events-none select-none transition-transform group-hover:scale-105" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51-1z" />
                </svg>

                {/* Corner Leaf Watermark */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-30 pointer-events-none select-none rotate-[45deg] mix-blend-multiply">
                  <Image src="/l13.png" alt="" layout="fill" objectFit="contain" />
                </div>
              </div>
            </Link>

          </div>
        </section>

        {/* BOTTOM BRANDING DIVIDER & LOGO */}
        <div className="w-full mt-10 mb-6 relative z-10">
          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e8e4d9]/70" />
            </div>
            <div className="relative bg-[#faf8f5] px-6 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.25em] text-[#a1825b] font-serif-display select-none">
              <GiLotus className="w-5 h-5 text-[#12372A] animate-spin-slow" />
              <span>AyurVeechi Clinic</span>
            </div>
          </div>
          <p className="font-hand text-3xl text-[#12372A] text-center font-medium leading-none">
            Heal your body. Calm your mind. Live your best life.
          </p>
        </div>

      </div>
    </div>
  );
}