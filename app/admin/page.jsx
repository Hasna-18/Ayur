"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Settings, Clock, MapPin, Activity, Sparkles, ArrowRight } from "lucide-react";
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
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans pb-16 pt-0">
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
      <div className="absolute -top-12 -left-12 opacity-80 pointer-events-none mix-blend-multiply w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image src="/l11.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute -top-10 -right-10 opacity-90 pointer-events-none mix-blend-multiply rotate-[120deg] w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image src="/l12.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute -bottom-16 -right-16 opacity-75 pointer-events-none mix-blend-multiply rotate-[45deg] w-[220px] h-[220px] z-0 select-none">
        <Image src="/l13.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>

      {/* NAVBAR */}
      <nav className="w-full border-b border-[#e8e4d9]/80 bg-white/60 backdrop-blur-md sticky top-0 z-50 relative select-none">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <GiLotus className="w-6 h-6 text-emerald-800" />
            <h1 className="text-xl md:text-2xl font-bold font-serif-display text-[#12372A] tracking-tight">
              Dr. Admin Portal
            </h1>
          </div>
          <Button 
            variant="outline" 
            className="border-[#12372A]/20 text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-full px-5 py-2 font-medium shadow-sm transition duration-200"
            onClick={async () => {
              await authClient.signOut({
                fetchOptions: {
                  onSuccess: () => {
                    window.location.href = "/admin/login";
                  },
                },
              });
            }}
          >
            Logout
          </Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-5xl mx-auto px-6 py-12 relative z-10">
        <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-[#C5A880] to-emerald-800" />
          
          {/* TEXT */}
          <div className="flex-1 space-y-4">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest bg-[#eef3e5] border border-[#c1d0b5]/50 rounded-full px-3 py-1 shadow-inner">
                  Lead Practitioner
                </span>
                <span className="flex items-center gap-1 text-[10px] text-amber-800 font-bold uppercase tracking-widest bg-[#fff9eb] border border-amber-200/50 rounded-full px-3 py-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  Active Session
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] mt-3 tracking-tight">
                Welcome, {profile.name}
              </h2>
              {profile.specialization && (
                <p className="font-hand text-3xl text-emerald-800 font-medium leading-none mt-2">
                  {profile.specialization}
                </p>
              )}
            </div>

            {profile.clinicAddress && (
              <div className="flex items-start gap-2 text-sm text-[#6b7a68] font-medium max-w-md">
                <MapPin className="w-4 h-4 text-[#a1825b] mt-0.5 flex-shrink-0" />
                <span>{profile.clinicAddress}</span>
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/admin/appointments">
                <Button className="bg-[#12372A] hover:bg-[#1c4a3b] text-white rounded-full px-6 py-5 flex items-center gap-2 shadow-md transition font-semibold border-none">
                  View Appointments
                  <ArrowRight className="w-4 h-4 text-[#C5A880]" />
                </Button>
              </Link>

              <Link href="/admin/availability">
                <Button variant="outline" className="border-[#12372A]/20 text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-full px-6 py-5 font-semibold shadow-sm transition">
                  Manage Availability
                </Button>
              </Link>
            </div>
          </div>

          {/* AVATAR */}
          <div className="relative flex-shrink-0">
            <div className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden shadow-md border-4 border-[#faf8f5] relative z-10">
              <Image
                src={profile.avatar || "/profile.jpeg"}
                alt="Doctor Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-emerald-800 text-[#FAF8F5] p-2.5 rounded-full shadow-md z-20">
              <GiLotus className="w-5 h-5 text-[#C5A880]" />
            </div>
          </div>
        </div>
      </section>

      {/* DASHBOARD CARDS */}
      <section className="max-w-5xl mx-auto px-6 pb-12 relative z-10">
        <h3 className="text-xl font-bold font-serif-display text-[#12372A] mb-6 flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#a1825b]" />
          Clinic Performance Summary
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* UPCOMING APPOINTMENTS */}
          <Link href="/admin/appointments/upcoming" className="block group">
            <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_12px_30px_rgba(43,58,47,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#c1d0b5]" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#eef3e5] flex items-center justify-center text-emerald-800">
                  <CalendarDays className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#6b7a68] uppercase tracking-wider">
                  Upcoming
                </span>
              </div>

              <div className="mt-4 z-10">
                <div className="text-4xl font-bold font-serif-display text-[#12372A]">
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

              <div className="absolute bottom-4 right-4 text-emerald-800/10 group-hover:text-emerald-800/20 transition-colors">
                <CalendarDays className="w-16 h-16 -mr-4 -mb-4" />
              </div>
            </div>
          </Link>

          {/* TOTAL PATIENTS */}
          <Link href="/admin/patients" className="block group">
            <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_12px_30px_rgba(43,58,47,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#C5A880]" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#f3f6ee] flex items-center justify-center text-emerald-700">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#6b7a68] uppercase tracking-wider">
                  Patients
                </span>
              </div>

              <div className="mt-4 z-10">
                <div className="text-4xl font-bold font-serif-display text-[#12372A]">
                  {stats.totalPatients}
                </div>
                <p className="text-xs font-medium text-[#6b7a68] mt-1.5">
                  Unique practitioner files
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-emerald-800/10 group-hover:text-emerald-800/20 transition-colors">
                <Users className="w-16 h-16 -mr-4 -mb-4" />
              </div>
            </div>
          </Link>

          {/* CANCELLED / MISSED */}
          <Link href="/admin/cancelled-list" className="block group">
            <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_12px_30px_rgba(43,58,47,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-[#dca4a4]" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fff5f5] flex items-center justify-center text-red-600">
                  <Clock className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#6b7a68] uppercase tracking-wider">
                  Cancelled
                </span>
              </div>

              <div className="mt-4 z-10">
                <div className="text-4xl font-bold font-serif-display text-[#12372A]">
                  {stats.cancelledCount}
                </div>
                <p className="text-xs font-medium text-[#6b7a68] mt-1.5">
                  Missed slot count this month
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-red-800/5 group-hover:text-red-800/10 transition-colors">
                <Clock className="w-16 h-16 -mr-4 -mb-4" />
              </div>
            </div>
          </Link>

          {/* SETTINGS */}
          <Link href="/admin/profile" className="block group">
            <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_12px_30px_rgba(43,58,47,0.04)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-48 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-2 h-full bg-emerald-800" />
              
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#fff9eb] flex items-center justify-center text-amber-600">
                  <Settings className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-[#6b7a68] uppercase tracking-wider">
                  Settings
                </span>
              </div>

              <div className="mt-4 z-10">
                <div className="text-lg font-bold font-serif-display text-[#12372A]">
                  Profile settings
                </div>
                <p className="text-xs font-medium text-[#6b7a68] mt-1.5">
                  Edit bio, specialization, and details
                </p>
              </div>

              <div className="absolute bottom-4 right-4 text-[#C5A880]/15 group-hover:text-[#C5A880]/30 transition-colors">
                <Settings className="w-16 h-16 -mr-4 -mb-4" />
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* BOTTOM BRANDING DIVIDER & LOGO */}
      <div className="max-w-5xl mx-auto px-6 mt-8 mb-12 relative z-10">
        <div className="w-full border-t border-[#e8e4d9]/60 my-6" />
        <div className="flex flex-col items-center justify-center gap-2 select-none opacity-85">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#a1825b] font-serif-display">
            <GiLotus className="w-4 h-4 text-emerald-800 animate-spin-slow" />
            <span>AyurMedi Clinic</span>
          </div>
          <p className="font-hand text-2xl text-emerald-800 text-center font-medium leading-none">
            Heal your body. Calm your mind. Live your best life.
          </p>
        </div>
      </div>
    </div>
  );
}