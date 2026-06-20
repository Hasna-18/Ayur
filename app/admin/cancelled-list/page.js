"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { GiLotus } from "react-icons/gi";
import { 
  ArrowLeft, 
  Clock, 
  User, 
  Sparkles, 
  XCircle, 
  AlertCircle, 
  Loader2,
  CalendarDays
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CancelledMissedList() {
  const [cancelled, setCancelled] = useState([]);
  const [missed, setMissed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/appointments/cancelled-missed");

        // Handle empty body safely
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        setCancelled(data.cancelled || []);
        setMissed(data.missed || []);
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#12372A] animate-spin" />
          <p className="text-[#12372A] font-semibold">Loading history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans pb-24 pt-10 px-4 md:px-8 select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      {/* BACKGROUND DECORATIVE LEAVES */}
      <div className="absolute top-0 left-0 opacity-[0.85] pointer-events-none mix-blend-multiply w-[280px] md:w-[360px] h-[280px] md:h-[360px] z-0 select-none">
        <Image src="/l11.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute top-0 right-0 opacity-[0.85] pointer-events-none mix-blend-multiply rotate-[90deg] w-[280px] md:w-[360px] h-[280px] md:h-[360px] z-0 select-none">
        <Image src="/l12.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-[0.12] pointer-events-none mix-blend-multiply w-[360px] md:w-[480px] h-[360px] md:h-[480px] z-0 select-none translate-x-[15%] translate-y-[15%]">
        <Image src="/g1.png" alt="Mandala Decoration" layout="fill" objectFit="contain" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8 relative z-20">
        
        {/* HERO HEADER CARD */}
        <div className="bg-white rounded-[32px] border border-[#e8e4d9]/85 p-6 md:p-10 shadow-[0_15px_35px_rgba(43,58,47,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden border-t-[8px] border-t-[#12372A]">
          <div className="flex items-start gap-4 flex-1">
            <Link href="/admin" className="mt-1">
              <Button size="icon" variant="outline" className="border-[#e8e4d9] text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-xl shadow-xs transition cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-red-800 font-bold uppercase tracking-wider bg-[#fff5f5] border border-red-200/50 rounded-full px-3 py-1.5 w-fit">
                <AlertCircle className="w-3.5 h-3.5 text-red-600" />
                <span>Issues & Cancellations</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif-display text-[#12372A] tracking-tight mt-2 flex items-center gap-2">
                Cancelled & Missed
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h2>
              <p className="text-[#6b7a68] text-sm mt-1.5 font-medium leading-relaxed max-w-xl">
                Review cancelled appointments and patients who missed their scheduled sessions.
              </p>
            </div>
          </div>
        </div>

        {/* STATS SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Cancelled Stat Card */}
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/80 shadow-[0_4px_12px_rgba(43,58,47,0.01)] p-6 flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#fff5f5] text-red-800 flex items-center justify-center border border-red-100 flex-shrink-0">
              <XCircle className="w-7 h-7 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-extrabold font-serif-display text-[#12372A] leading-tight">
                {cancelled.length}
              </p>
              <p className="text-xs text-[#6b7a68] font-bold uppercase tracking-wider mt-0.5">
                Cancelled Appointments
              </p>
            </div>
          </div>

          {/* Missed Stat Card */}
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/80 shadow-[0_4px_12px_rgba(43,58,47,0.01)] p-6 flex items-center gap-4 hover:scale-[1.01] transition-transform duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#fffcf5] text-amber-800 flex items-center justify-center border border-amber-100 flex-shrink-0">
              <AlertCircle className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-extrabold font-serif-display text-[#12372A] leading-tight">
                {missed.length}
              </p>
              <p className="text-xs text-[#6b7a68] font-bold uppercase tracking-wider mt-0.5">
                Missed Appointments
              </p>
            </div>
          </div>
        </div>

        {/* DUAL SECTIONS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* CANCELLED SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-3 mb-2">
              <h3 className="text-xl font-bold font-serif-display text-[#12372A] flex items-center gap-2">
                Cancelled Appointments
              </h3>
              <span className="bg-red-50 text-red-700 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                {cancelled.length}
              </span>
            </div>

            {cancelled.length === 0 ? (
              <div className="bg-white border border-[#e8e4d9] rounded-[24px] p-10 text-center shadow-xs">
                <GiLotus className="w-12 h-12 text-[#c2bba8] mx-auto mb-3 opacity-60" />
                <p className="text-sm text-[#6b7a68] font-semibold">No cancelled appointments found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {cancelled.map(appt => {
                  const dateObj = new Date(appt.time);
                  const monthStr = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
                  const dayStr = dateObj.getDate();
                  const yearStr = dateObj.getFullYear();
                  const timeStr = dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  });

                  return (
                    <div key={appt.id} className="bg-white border border-[#e8e4d9] rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Calendar Badge */}
                      <div className="flex flex-col items-center justify-center bg-[#f7f5ef] border border-[#e8e4d9] rounded-xl px-2.5 py-1.5 min-w-[54px] text-center shadow-xs">
                        <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider leading-none mb-0.5">
                          {monthStr}
                        </span>
                        <span className="text-lg font-extrabold text-[#12372A] leading-none">
                          {dayStr}
                        </span>
                        <span className="text-[8px] text-zinc-500 font-bold leading-none mt-0.5">
                          {yearStr}
                        </span>
                      </div>
                      
                      {/* Patient & Time Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#12372A] text-sm truncate">{appt.name}</h4>
                        <p className="text-xs text-[#6b7a68] font-medium mt-0.5 truncate">{appt.email}</p>
                        
                        <div className="flex items-center gap-1.5 text-[11px] text-[#6b7a68] mt-2.5 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#a1825b]" />
                          <span>{timeStr}</span>
                          {appt.message && (
                            <>
                              <span className="text-zinc-300 mx-1">•</span>
                              <span className="truncate max-w-[150px] font-medium" title={appt.message}>
                                Reason: "{appt.message}"
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="bg-red-50 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded border border-red-200 uppercase tracking-wider self-start shrink-0">
                        Cancelled
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* MISSED SECTION */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#e8e4d9] pb-3 mb-2">
              <h3 className="text-xl font-bold font-serif-display text-[#12372A] flex items-center gap-2">
                Missed Appointments
              </h3>
              <span className="bg-amber-50 text-amber-700 text-xs font-bold px-3 py-1 rounded-full border border-amber-200">
                {missed.length}
              </span>
            </div>

            {missed.length === 0 ? (
              <div className="bg-white border border-[#e8e4d9] rounded-[24px] p-10 text-center shadow-xs">
                <GiLotus className="w-12 h-12 text-[#c2bba8] mx-auto mb-3 opacity-60" />
                <p className="text-sm text-[#6b7a68] font-semibold">No missed appointments found.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {missed.map(appt => {
                  const dateObj = new Date(appt.time);
                  const monthStr = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
                  const dayStr = dateObj.getDate();
                  const yearStr = dateObj.getFullYear();
                  const timeStr = dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit"
                  });

                  return (
                    <div key={appt.id} className="bg-white border border-[#e8e4d9] rounded-2xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow">
                      {/* Calendar Badge */}
                      <div className="flex flex-col items-center justify-center bg-[#f7f5ef] border border-[#e8e4d9] rounded-xl px-2.5 py-1.5 min-w-[54px] text-center shadow-xs">
                        <span className="text-[9px] font-extrabold text-emerald-800 uppercase tracking-wider leading-none mb-0.5">
                          {monthStr}
                        </span>
                        <span className="text-lg font-extrabold text-[#12372A] leading-none">
                          {dayStr}
                        </span>
                        <span className="text-[8px] text-zinc-500 font-bold leading-none mt-0.5">
                          {yearStr}
                        </span>
                      </div>
                      
                      {/* Patient & Time Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#12372A] text-sm truncate">{appt.name}</h4>
                        <p className="text-xs text-[#6b7a68] font-medium mt-0.5 truncate">{appt.email}</p>
                        
                        <div className="flex items-center gap-1.5 text-[11px] text-[#6b7a68] mt-2.5 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-[#a1825b]" />
                          <span>{timeStr}</span>
                          {appt.message && (
                            <>
                              <span className="text-zinc-300 mx-1">•</span>
                              <span className="truncate max-w-[150px] font-medium" title={appt.message}>
                                Msg: "{appt.message}"
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <span className="bg-amber-50 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 uppercase tracking-wider self-start shrink-0">
                        Missed
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
