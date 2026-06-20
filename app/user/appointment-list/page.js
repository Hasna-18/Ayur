"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JitsiMeeting from "@/components/jitsi-meeting";
import {
  CalendarDays,
  Clock,
  User,
  Mail,
  Leaf,
  CircleDot,
  Settings,
  Video,
  XCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import Image from "next/image";

// Custom icons for the bottom banner
const MortarIcon = () => (
  <svg className="w-5 h-5 text-[#C5A880]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 11h16a1 1 0 0 1 1 1v2a6 6 0 0 1-6 6H9a6 6 0 0 1-6-6v-2a1 1 0 0 1 1-1z" />
    <path d="M9 20v1h6v-1" />
    <path d="M18 4l-7 8" />
    <path d="M16 3l2 2" />
  </svg>
);

const YogaIcon = () => (
  <svg className="w-5 h-5 text-[#C5A880]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="1.5" />
    <path d="M12 7.5c-1 0-2 .8-2 2v2.5M12 7.5c1 0 2 .8 2 2v2.5" />
    <path d="M7.5 17c1.5-1.5 3-2 4.5-2s3 .5 4.5 2" />
    <path d="M6 14c2.5-1 5.5-1 8 0" />
    <path d="M9.5 20c1.5-.5 3.5-.5 5 0" />
  </svg>
);

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState(null);
  const [userName, setUserName] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/user/appointments", {
          method: "GET",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);

        // Get user name from first appointment or from session
        if (data.length > 0) {
          setUserName(data[0].name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1e8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#12372A] font-semibold">Loading appointments...</p>
        </div>
      </div>
    );
  }

  const noAppointments = appointments.length === 0;

  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`/api/user/appointments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const text = await res.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch (e) {
        body = { raw: text };
      }

      if (!res.ok) {
        console.error("Cancel failed status:", res.status, "body:", body);
        alert(body?.error || body?.message || "Failed to cancel appointment");
        return;
      }

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "CANCELLED" } : item
        )
      );
    } catch (err) {
      console.error("Cancel Error (network):", err);
      alert("Network error while cancelling. Check console.");
    }
  };

  const isJoinAllowed = (appointment) => {
    return (
      appointment.status === "SCHEDULED" &&
      appointment.jitsiRoom &&
      !appointment.meetingExpired
    );
  };

  const handleJoinCall = (appointment) => {
    if (isJoinAllowed(appointment)) {
      setActiveCall(appointment);
    } else if (appointment.meetingExpired) {
      alert("The meeting code has expired. Please reschedule if needed.");
    } else {
      alert("Video call not available for this appointment yet. Please refresh the page.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#3e4a3d] font-sans relative overflow-hidden pb-12 pt-6 px-4 md:px-12">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      <div className="max-w-7xl mx-auto flex flex-col gap-6">
        
        {/* Header Banner */}
        <div className="relative overflow-hidden rounded-[30px] border border-[#e8e4d9] bg-[#faf8f5] p-8 md:p-12 min-h-[280px] md:min-h-[320px] flex flex-col justify-center shadow-sm">
          {/* Background Image on Right */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-full md:w-[60%] lg:w-[50%] bg-contain bg-no-repeat bg-right-center opacity-85 pointer-events-none hidden md:block" 
            style={{ 
              backgroundImage: "url('/user/appo1.png')"
            }} 
          />
          {/* Gradient overlay to blend image */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5] via-[#faf8f5]/95 to-transparent md:w-[55%] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-semibold tracking-widest text-[#a1825b] uppercase">
              <Leaf className="w-3.5 h-3.5 text-[#a1825b]" />
              <span>Ayurveda</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif-display font-bold text-[#12372A] mt-2 tracking-tight">
              Appointments
            </h2>
            
            {/* Flourish Divider */}
            <div className="flex items-center justify-center md:justify-start gap-3 my-4">
              <div className="h-[1px] w-12 bg-[#c2bba8]/60" />
              <div className="flex items-center gap-1 text-[#a1825b]">
                <Leaf className="w-3.5 h-3.5 rotate-[-45deg] fill-current" />
                <span className="text-[10px]">✿</span>
                <Leaf className="w-3.5 h-3.5 rotate-[135deg] fill-current" />
              </div>
              <div className="h-[1px] w-12 bg-[#c2bba8]/60" />
            </div>
            
            <p className="text-[#6b7a68] text-sm md:text-base mt-2 font-medium">
              View and manage all your scheduled appointments.
            </p>
          </div>
          
          {/* New Appointment Button */}
          <a 
            href="/user/book" 
            className="absolute top-6 right-6 md:top-8 md:right-8 z-20"
          >
            <Button className="bg-[#12372A] hover:bg-[#1C3524] text-white rounded-full px-6 py-5 flex items-center gap-2 shadow-sm text-sm font-medium border border-transparent hover:border-[#FAF8F5]/10 cursor-pointer">
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
              New Appointment
              <Sparkles className="w-3.5 h-3.5 text-[#C5A880] animate-pulse" />
            </Button>
          </a>
        </div>

        {/* Appointments Table Card */}
        <div className="bg-[#faf8f5] rounded-[30px] border border-[#e8e4d9]/80 shadow-[0_4px_20px_rgba(43,58,47,0.02)] overflow-hidden">
          <div>
            {noAppointments ? (
              <div className="p-16 text-center text-[#12372A] overflow-x-auto">
                <GiLotus className="w-16 h-16 text-[#c2bba8] mx-auto mb-4 animate-bounce" />
                <p className="text-2xl font-bold font-serif-display text-[#12372A]">You have no upcoming appointments.</p>
                <p className="mt-3 text-[#6b7a68] text-sm font-medium">Book a new appointment to get a Jitsi meeting code.</p>
                <a href="/user/book" className="mt-6 inline-block">
                  <Button className="bg-[#12372A] hover:bg-[#1C3524] text-white rounded-full px-6 py-5 text-sm font-semibold">
                    Book Appointment
                  </Button>
                </a>
              </div>
            ) : isMobile ? (
              <div className="flex flex-col gap-4 p-4">
                {appointments.map((a) => (
                  <div 
                    key={a.id} 
                    className="bg-white rounded-2xl border border-[#e8e4d9] p-5 shadow-sm flex flex-col gap-4 text-left"
                  >
                    {/* Card Header: Date & Status */}
                    <div className="flex justify-between items-start border-b border-[#e8e4d9]/60 pb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#e8e4d9]/50 flex items-center justify-center border border-[#d1ccbd]/20 text-[#5a7258] flex-shrink-0">
                          <CalendarDays className="w-5.5 h-5.5" />
                        </div>
                        <div>
                          <p className="text-[#12372A] font-bold text-sm">
                            {new Date(a.date).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </p>
                          <p className="text-xs text-[#6b7a68] font-medium flex items-center gap-1 mt-0.5">
                            <Clock className="w-3.5 h-3.5 text-[#a1825b]" />
                            {new Date(a.time).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                      <div>
                        {a.status === "SCHEDULED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e2ebe4] text-[#3c5e48] border border-[#c1d0b5] text-[11px] font-semibold font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3c5e48]" />
                            Scheduled
                          </span>
                        )}
                        {a.status === "COMPLETED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#dce9f5] text-[#2c5282] border border-[#b9d2eb] text-[11px] font-semibold font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#2c5282]" />
                            Completed
                          </span>
                        )}
                        {a.status === "CANCELLED" && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#fde8e8] text-[#9b2c2c] border border-[#f8b4b4] text-[11px] font-semibold font-sans">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#9b2c2c]" />
                            Cancelled
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Body: Patient Info */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-xs uppercase flex-shrink-0">
                          {a.name?.charAt(0).toLowerCase()}
                        </div>
                        <div>
                          <p className="font-bold text-[#12372A] text-sm leading-tight">{a.name}</p>
                          <p className="text-[11px] text-[#6b7a68] mt-0.5 font-medium">Patient</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 text-xs text-[#4a5a4b] font-medium pt-1">
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#C5A880] flex-shrink-0" />
                          <span className="break-all">{a.email}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Leaf className="w-4 h-4 text-[#C5A880] mt-0.5 flex-shrink-0" />
                          <span className="leading-relaxed">Reason: {a.message || "-"}</span>
                        </div>
                      </div>
                    </div>

                    {/* Jitsi code & Link */}
                    {a.jitsiRoom && (
                      <div className="bg-[#f5f2e9]/70 rounded-xl p-3.5 border border-[#e8e4d9]/50 flex flex-col gap-2 mt-1">
                        <div className="flex items-center justify-between text-xs text-[#6b7a68]">
                          <div className="flex items-center gap-1.5">
                            <Video className="w-4 h-4 text-[#5a7258]" />
                            <span className="font-semibold text-[#12372A]">Video Call Code</span>
                          </div>
                          <span className="font-bold text-[#3e4a3d] bg-white px-2 py-0.5 rounded border border-[#e8e4d9]">
                            {a.jitsiRoom}
                          </span>
                        </div>
                        {!a.meetingExpired ? (
                          <a
                            href={`https://meet.jit.si/${a.jitsiRoom}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#5a7258] hover:underline font-bold text-xs flex items-center gap-1 justify-center w-full bg-white border border-[#e8e4d9] py-2 rounded-lg mt-1 transition-all hover:bg-gray-50 shadow-sm"
                          >
                            Go to Jitsi Meet <span className="text-[10px] text-[#C5A880]">↗</span>
                          </a>
                        ) : (
                          <p className="text-[11px] text-red-500 font-semibold text-center mt-1">
                            Meeting link has expired
                          </p>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    {a.status === "SCHEDULED" && (
                      <div className="flex gap-2.5 mt-2">
                        <Button
                          onClick={() => handleJoinCall(a)}
                          disabled={!isJoinAllowed(a)}
                          className={`flex-1 rounded-xl py-5 text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer ${
                            isJoinAllowed(a)
                              ? "bg-[#12372A] text-white hover:bg-[#1c4737]"
                              : "bg-zinc-200 text-zinc-400 border border-zinc-300 opacity-60 cursor-not-allowed"
                          }`}
                        >
                          <Video className="w-4 h-4" />
                          Join Call
                        </Button>
                        <Button
                          onClick={() => cancelAppointment(a.id)}
                          className="bg-transparent border border-[#e38585] text-[#d84c4c] hover:bg-red-50/50 rounded-xl py-5 px-4 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        >
                          <XCircle className="w-4 h-4" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-[#23382b] text-white">
                    <tr>
                      <th className="p-5 text-left border-r border-white/10 last:border-r-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f4eae1]">
                          <Clock className="w-4 h-4 text-[#C5A880]" />
                          <span>TIME</span>
                        </div>
                      </th>
                      <th className="p-5 text-left border-r border-white/10 last:border-r-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f4eae1]">
                          <User className="w-4 h-4 text-[#C5A880]" />
                          <span>PATIENT</span>
                        </div>
                      </th>
                      <th className="p-5 text-left border-r border-white/10 last:border-r-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f4eae1]">
                          <Mail className="w-4 h-4 text-[#C5A880]" />
                          <span>EMAIL</span>
                        </div>
                      </th>
                      <th className="p-5 text-left border-r border-white/10 last:border-r-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f4eae1]">
                          <Leaf className="w-4 h-4 text-[#C5A880]" />
                          <span>REASON</span>
                        </div>
                      </th>
                      <th className="p-5 text-left border-r border-white/10 last:border-r-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f4eae1]">
                          <CircleDot className="w-4 h-4 text-[#C5A880]" />
                          <span>STATUS</span>
                        </div>
                      </th>
                      <th className="p-5 text-left border-r border-white/10 last:border-r-0">
                        <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#f4eae1]">
                          <Settings className="w-4 h-4 text-[#C5A880]" />
                          <span>ACTION</span>
                        </div>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {appointments.map((a) => (
                      <tr
                        key={a.id}
                        className="border-b border-[#e8e4d9]/50 hover:bg-[#f5f0e1]/30 transition-colors"
                      >
                        {/* Time cell */}
                        <td className="p-5 align-middle">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#e8e4d9]/60 flex items-center justify-center border border-[#d1ccbd]/30 text-[#5a7258] flex-shrink-0">
                              <CalendarDays className="w-6 h-6 text-[#5a7258]" />
                            </div>
                            <div>
                              <div className="text-[#12372A] font-bold text-sm">
                                {new Date(a.date).toLocaleDateString([], {
                                  month: "numeric",
                                  day: "numeric",
                                  year: "numeric"
                                })}
                              </div>
                              <div className="text-xs text-[#6b7a68] font-medium mt-0.5">
                                {new Date(a.time).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Patient cell */}
                        <td className="p-5 align-middle">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#12372A] flex items-center justify-center text-[#faf8f5] font-bold text-sm uppercase">
                              {a.name?.charAt(0).toLowerCase()}
                            </div>
                            <div>
                              <p className="font-bold text-[#12372A] text-sm">
                                {a.name}
                              </p>
                              <p className="text-xs text-[#6b7a68] mt-0.5">
                                Patient
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Email cell */}
                        <td className="p-5 align-middle text-sm text-[#4a5a4b] font-medium">
                          {a.email}
                        </td>

                        {/* Reason cell */}
                        <td className="p-5 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full bg-[#e8e4d9]/40 flex items-center justify-center text-[#5a7258] flex-shrink-0">
                              <Leaf className="w-4 h-4 text-[#5a7258]" />
                            </div>
                            <span className="text-sm text-[#4a5a4b] font-medium max-w-[180px] truncate block" title={a.message || "-"}>
                              {a.message || "-"}
                            </span>
                          </div>
                        </td>

                        {/* Status cell */}
                        <td className="p-5 align-middle">
                          {a.status === "SCHEDULED" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e2ebe4] text-[#3c5e48] border border-[#c1d0b5] text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#3c5e48]" />
                              Scheduled
                            </span>
                          )}
                          {a.status === "COMPLETED" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#dce9f5] text-[#2c5282] border border-[#b9d2eb] text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2c5282]" />
                              Completed
                            </span>
                          )}
                          {a.status === "CANCELLED" && (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fde8e8] text-[#9b2c2c] border border-[#f8b4b4] text-xs font-semibold">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#9b2c2c]" />
                              Cancelled
                            </span>
                          )}
                        </td>

                        {/* Action cell */}
                        <td className="p-5 align-middle">
                          <div className="flex flex-col gap-2">
                            {a.status === "SCHEDULED" ? (
                              <div className="flex flex-wrap gap-2 items-center">
                                <Button
                                  onClick={() => handleJoinCall(a)}
                                  disabled={!isJoinAllowed(a)}
                                  className={`rounded-xl px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer ${
                                    isJoinAllowed(a)
                                      ? "bg-[#12372A] text-white hover:bg-[#1c4737] border border-transparent"
                                      : "bg-zinc-200 text-zinc-400 border border-zinc-300 opacity-60 cursor-not-allowed"
                                  }`}
                                >
                                  <Video className="w-3.5 h-3.5" />
                                  Join
                                </Button>

                                <Button
                                  onClick={() => cancelAppointment(a.id)}
                                  className="bg-transparent border border-[#e38585] text-[#d84c4c] hover:bg-red-50/50 rounded-xl px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  Cancel
                                </Button>
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm font-medium pl-2">-</span>
                            )}

                            {a.jitsiRoom && (
                              <div className="flex flex-col gap-0.5 text-xs text-[#6b7a68] mt-1 pl-1">
                                <p className="font-medium">
                                  Code: <span className="font-semibold text-[#3e4a3d]">{a.jitsiRoom}</span>
                                  {a.meetingExpired ? " (expired)" : ""}
                                </p>
                                {!a.meetingExpired && (
                                  <a
                                    href={`https://meet.jit.si/${a.jitsiRoom}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#5a7258] hover:underline font-semibold flex items-center gap-0.5 mt-0.5 w-fit"
                                  >
                                    Direct Link <span className="text-[10px]">↗</span>
                                  </a>
                                )}
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination / Table Footer */}
          {!noAppointments && (
            <div className="flex items-center justify-between p-6 bg-[#faf8f5] border-t border-[#e8e4d9]/60">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#e2ebe4] text-[#3e4a3d] flex items-center justify-center flex-shrink-0 border border-[#c1d0b5]/50">
                  <GiLotus className="w-5 h-5" />
                </div>
                <p className="text-xs text-[#6b7a68] font-bold">
                  Showing 1 to {appointments.length} of {appointments.length} appointments
                </p>
              </div>

              <div className="flex gap-2">
                <button className="w-9 h-9 rounded-xl border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 flex items-center justify-center transition-colors cursor-pointer">
                  <ChevronLeft className="w-4 h-4" />
                </button>

                <button className="w-9 h-9 rounded-xl bg-[#12372A] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  1
                </button>

                <button className="w-9 h-9 rounded-xl border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 flex items-center justify-center transition-colors cursor-pointer">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Feature Banner at the bottom */}
        <div className="bg-[#23382b] rounded-[24px] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between text-white gap-6 relative overflow-hidden mt-2 border border-white/5">
          {/* Leaf decoration absolute position */}
          <div className="absolute right-0 bottom-0 opacity-15 translate-x-4 translate-y-4 pointer-events-none hidden lg:block">
            <Image 
              src="/l11.png" 
              alt="leaf decoration" 
              width={160} 
              height={160} 
              className="scale-x-[-1]"
            />
          </div>

          {/* Left branding */}
          <div className="flex items-center gap-4 z-10">
            <div className="w-12 h-12 bg-white text-[#23382b] rounded-full flex items-center justify-center flex-shrink-0 shadow-inner">
              <GiLotus className="w-7 h-7" />
            </div>
            <div>
              <p className="font-serif-display italic text-lg md:text-xl text-[#f4eae1] leading-relaxed">
                Rooted in Tradition, Committed to Your Well-being.
              </p>
            </div>
          </div>

          {/* Right features row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full lg:w-auto z-10 border-t lg:border-t-0 border-white/10 pt-6 lg:pt-0">
            {/* Feature 1 */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[#C5A880] flex-shrink-0">
                <Leaf className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f4eae1] tracking-wide">Natural Healing</p>
                <p className="text-[10px] text-[#c2bba8] mt-0.5 font-medium">Holistic & safe</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-6">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[#C5A880] flex-shrink-0">
                <MortarIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f4eae1] tracking-wide">Ancient Wisdom</p>
                <p className="text-[10px] text-[#c2bba8] mt-0.5 font-medium">Backed by science</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-6">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[#C5A880] flex-shrink-0">
                <YogaIcon />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f4eae1] tracking-wide">Balanced Living</p>
                <p className="text-[10px] text-[#c2bba8] mt-0.5 font-medium">Mind, Body & Soul</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="flex items-center gap-3 lg:border-l lg:border-white/10 lg:pl-6">
              <div className="p-2 bg-white/5 rounded-xl border border-white/10 text-[#C5A880] flex-shrink-0">
                <GiLotus className="w-4 h-4 text-[#C5A880]" />
              </div>
              <div>
                <p className="text-xs font-bold text-[#f4eae1] tracking-wide">Pure & Authentic</p>
                <p className="text-[10px] text-[#c2bba8] mt-0.5 font-medium">100% Ayurvedic</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Video Call Dialog */}
      <Dialog open={!!activeCall} onOpenChange={(open) => {
        if (!open) setActiveCall(null);
      }}>
        <DialogContent className="w-full max-w-6xl h-[90vh] p-0 bg-[#faf8f5] border border-[#e8e4d9]">
          <DialogHeader className="absolute top-0 left-0 right-0 z-50 bg-[#23382b] text-white p-4 flex items-center justify-between">
            <DialogTitle className="text-lg font-serif-display text-[#f4eae1]">
              Video Call - {activeCall?.name}
            </DialogTitle>
          </DialogHeader>
          {activeCall && (
            <div className="mt-12 w-full h-full">
              <JitsiMeeting
                roomName={activeCall.jitsiRoom}
                userName={userName}
                onClose={() => setActiveCall(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
