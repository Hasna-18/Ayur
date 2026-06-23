"use client";

import { useEffect, useState } from "react";
import { Calendar, Clock, MessageCircle, Leaf, Shield, Users, Sparkles, CheckCircle, AlertCircle, ShieldAlert, Key, MailOpen, Loader2 } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Button } from "@/components/ui/button";

const STANDARD_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", 
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

const generateSlots = (start, end) => {
  if (!start || !end) return [];
  const slots = [];
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);
  
  let currentHour = startHour;
  let currentMin = startMin;
  
  while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
    const hrs = String(currentHour).padStart(2, "0");
    const mins = String(currentMin).padStart(2, "0");
    slots.push(`${hrs}:${mins}`);
    
    currentMin += 30;
    if (currentMin >= 60) {
      currentHour += 1;
      currentMin -= 60;
    }
  }
  return slots;
};

const formatTime12Hour = (time24) => {
  if (!time24) return "";
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return `${hour}:${minuteStr} ${ampm}`;
};

export default function BookAppointment() {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [backendSlots, setBackendSlots] = useState([]);

  // Get tomorrow's date in local YYYY-MM-DD format
  const tomorrowDateStr = (() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  })();

  // Verification States
  const [isVerified, setIsVerified] = useState(false);
  const [checkingVerification, setCheckingVerification] = useState(true);
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerifying, setOtpVerifying] = useState(false);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    async function checkUserVerification() {
      try {
        const res = await fetch("/api/auth/get-user");
        if (res.ok) {
          const data = await res.json();
          if (data?.user?.emailVerified) {
            setIsVerified(true);
          }
        }
      } catch (err) {
        console.error("Failed to check user verification:", err);
      } finally {
        setCheckingVerification(false);
      }
    }
    checkUserVerification();
  }, []);

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setOtpError("");
    try {
      const res = await fetch("/api/user/verify/send-otp", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to send OTP");
      }
      setOtpSent(true);
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) {
      setOtpError("Please enter the verification code.");
      return;
    }
    setOtpVerifying(true);
    setOtpError("");
    try {
      const res = await fetch("/api/user/verify/check-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Invalid OTP");
      }
      setIsVerified(true);
      window.location.reload(); // Reload page to refresh layouts & headers
    } catch (err) {
      setOtpError(err.message);
    } finally {
      setOtpVerifying(false);
    }
  };

  // Load configured daily hours from backend on mount
  useEffect(() => {
    async function loadDailyTime() {
      try {
        const res = await fetch("/api/admin/availability/daily-time");
        if (res.ok) {
          const data = await res.json();
          if (data.start && data.end) {
            const slots = generateSlots(data.start, data.end);
            setBackendSlots(slots);
          }
        }
      } catch (err) {
        console.error("Failed to fetch daily hours from backend:", err);
      }
    }
    loadDailyTime();
  }, []);

  // Fetch admin availability when date changes
  useEffect(() => {
    if (!date) return;
    loadSlots(date);
  }, [date]);

  // Load available time slots for selected date
  const loadSlots = async (date) => {
    setTime("");
    setTimeSlots([]);
    setStatus("");

    try {
      const res = await fetch(`/api/user/slots?date=${date}`);
      const data = await res.json();

      if (data.reason === "weekly-off") {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setStatus(`❌ Clinic is closed every ${days[data.day]}. Please choose another day.`);
        return;
      }

      if (data.reason === "past-or-today") {
        setStatus("❌ Appointments can only be booked for dates after today (tomorrow or later).");
        return;
      }

      if (data.reason === "off-date") {
        setStatus("❌ Doctor is unavailable on this date. Please choose another day.");
        return;
      }

      if (data.reason === "no-time") {
        setStatus("❌ No available time slots on this day. Please select another date.");
        return;
      }

      if (data.reason === "no-daily-hours") {
        setStatus("❌ Clinic working hours not set. Please try again later.");
        return;
      }

      setTimeSlots(data.slots || []);

    } catch (err) {
      setStatus("Failed to load slots");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!time) {
      setStatus("❌ Please select a time slot.");
      return;
    }
    setStatus("");

    try {
      const res = await fetch("/api/user/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, message }),
      });

      const out = await res.json();

      if (!res.ok) {
        setStatus("❌ " + out.error);
        return;
      }

      setStatus("✅ Appointment booked successfully!");
      setMessage("");
      setDate("");
      setTime("");
      setTimeSlots([]);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  // Compile all slots to render: union of standard/backend slots and dynamically fetched slots
  const baseSlots = backendSlots.length > 0 ? backendSlots : STANDARD_SLOTS;
  const allSlotsToRender = Array.from(new Set([...baseSlots, ...timeSlots])).sort();

  return (
    <div
      className="min-h-screen lg:h-[calc(100vh-80px)] bg-cover bg-center relative flex items-center py-8 lg:py-0 px-4 md:px-12 bg-[#faf8f5]"
      style={{
        backgroundImage:
          "url('/user/ayur_booking_hero_cnqmid.webp')",
      }}
    >
      {/* Overlay */}
      {/* <div className="absolute inset-0 bg-[#faf8f5]/85 backdrop-blur-sm pointer-events-none"></div> */}

      <div className="relative z-10 max-w-6xl w-full mx-auto grid lg:grid-cols-12 gap-8 lg:gap-12 items-center text-[#3e4a3d] font-sans">
        <style dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
          .font-hand { font-family: 'Caveat', cursive; }
          .font-serif-display { font-family: 'Playfair Display', serif; }
        `}} />

        {/* Left Content Column */}
        <div className="lg:col-span-5 flex flex-col justify-center text-center lg:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#12372A]/5 text-[#12372A] mb-4 text-xs font-bold w-fit mx-auto lg:mx-0">
            <Leaf className="w-3.5 h-3.5 text-[#a1825b]" />
            <span>Wellness Journey</span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold font-serif-display text-[#12372A] leading-tight">
            Book Your<br />Appointment
          </h1>

          {/* Flourish Divider */}
          <div className="flex items-center justify-center lg:justify-start gap-3 my-4">
            <div className="h-[1px] w-12 bg-[#c2bba8]/60" />
            <div className="flex items-center gap-1 text-[#a1825b]">
              <Leaf className="w-3.5 h-3.5 rotate-[-45deg] fill-current" />
              <span className="text-[10px]">✿</span>
              <Leaf className="w-3.5 h-3.5 rotate-[135deg] fill-current" />
            </div>
            <div className="h-[1px] w-12 bg-[#c2bba8]/60" />
          </div>

          <p className="text-[#6b7a68] text-sm lg:text-base leading-relaxed font-medium mb-6 max-w-md mx-auto lg:mx-0">
            Take a step towards a healthier, balanced, and peaceful you. Our experts are here to guide you on your wellness journey.
          </p>

          {/* Compact Vertical Stack of Features */}
          <div className="flex flex-col gap-3 max-w-sm w-full mx-auto lg:mx-0">
            {/* Feature 1 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-[#e8e4d9]/50 shadow-[0_2px_8px_rgba(43,58,47,0.02)]">
              <div className="w-10 h-10 rounded-xl bg-[#e2ebe4] text-[#3e4a3d] flex items-center justify-center flex-shrink-0">
                <GiLotus className="w-6 h-6 text-[#3c5e48]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#12372A] tracking-wide">Expert Ayurvedic Doctors</h4>
                <p className="text-[10px] text-[#6b7a68] mt-0.5 font-semibold">Experienced & certified practitioners</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-[#e8e4d9]/50 shadow-[0_2px_8px_rgba(43,58,47,0.02)]">
              <div className="w-10 h-10 rounded-xl bg-[#e2ebe4] text-[#3e4a3d] flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-[#3c5e48]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#12372A] tracking-wide">Safe & Natural Treatments</h4>
                <p className="text-[10px] text-[#6b7a68] mt-0.5 font-semibold">100% organic & holistic formulations</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/60 border border-[#e8e4d9]/50 shadow-[0_2px_8px_rgba(43,58,47,0.02)]">
              <div className="w-10 h-10 rounded-xl bg-[#e2ebe4] text-[#3e4a3d] flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-[#3c5e48]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#12372A] tracking-wide">500+ Happy Patients</h4>
                <p className="text-[10px] text-[#6b7a68] mt-0.5 font-semibold">Trusted by thousands worldwide</p>
              </div>
            </div>
          </div>
        </div>

        {/* Appointment Card Column */}
        <div className="lg:col-span-7 w-full flex justify-center">
          <div className="bg-[#faf8f5]/95 rounded-[30px] border border-[#e8e4d9]/80 shadow-[0_10px_40px_rgba(43,58,47,0.04)] p-6 lg:p-8 max-w-xl w-full">
            
            {checkingVerification ? (
              <div className="py-16 flex flex-col items-center justify-center gap-4 text-[#12372A]">
                <Loader2 className="w-10 h-10 animate-spin text-[#C5A880]" />
                <p className="font-semibold text-sm">Checking verification status...</p>
              </div>
            ) : !isVerified ? (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200/60">
                  <ShieldAlert className="w-8 h-8 text-amber-600" />
                </div>
                <h2 className="text-2xl font-bold font-serif-display text-[#12372A]">
                  Verification Required
                </h2>
                <p className="text-xs text-[#6b7a68] mt-2 font-medium max-w-sm mx-auto leading-relaxed">
                  For security and authentic consultations, we require all patients to verify their email before booking an appointment.
                </p>

                <div className="w-full border-t border-[#e8e4d9]/60 my-6" />

                {!otpSent ? (
                  <div className="space-y-4">
                    <p className="text-xs font-semibold text-[#6b7a68]">
                      We will send a 6-digit One-Time Password (OTP) to your registered email address.
                    </p>
                    <button
                      onClick={handleSendOtp}
                      disabled={otpLoading}
                      className="w-full h-12 rounded-xl bg-[#12372A] hover:bg-[#1C3524] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    >
                      {otpLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending Code...
                        </>
                      ) : (
                        <>
                          <MailOpen className="w-4 h-4 text-[#C5A880]" />
                          Send Verification Code
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-5 text-left">
                    <div className="space-y-1.5">
                      <label className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                        <Key className="w-3.5 h-3.5 text-[#5a7258]" />
                        Enter 6-Digit OTP
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="••••••"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                        className="w-full h-12 text-center text-lg tracking-[8px] bg-white border border-[#e8e4d9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#12372A] font-bold text-[#12372A] placeholder:text-zinc-300"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={otpVerifying}
                      className="w-full h-12 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-zinc-200 disabled:text-zinc-400 disabled:cursor-not-allowed"
                    >
                      {otpVerifying ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 text-white" />
                          Verify & Proceed
                        </>
                      )}
                    </button>

                    <div className="text-center mt-4">
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={otpLoading}
                        className="text-xs text-[#5a7258] hover:underline font-bold"
                      >
                        Resend Verification Code
                      </button>
                    </div>
                  </form>
                )}

                {otpError && (
                  <div className="mt-4 p-3 rounded-xl bg-red-50 border border-red-500/20 text-red-800 text-xs font-medium text-left flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{otpError}</span>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="text-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-[#e2ebe4] text-[#3e4a3d] flex items-center justify-center mx-auto mb-3">
                    <Calendar className="w-6 h-6 text-[#3c5e48]" />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-bold font-serif-display text-[#12372A]">
                    Book Appointment
                  </h2>
                  {/* Mini flourish */}
                  <div className="flex justify-center items-center gap-2 mt-2">
                    <div className="h-[1px] w-12 bg-[#c2bba8]/60"></div>
                    <Leaf className="w-3.5 h-3.5 text-[#a1825b]" />
                    <div className="h-[1px] w-12 bg-[#c2bba8]/60"></div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Date selection */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <Calendar className="w-3.5 h-3.5 text-[#5a7258]" />
                      Select Appointment Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      min={tomorrowDateStr} // Only book days after today
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full h-11 px-4 text-sm bg-white border border-[#e8e4d9] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#12372A] font-semibold text-[#12372A] cursor-pointer"
                      required
                    />
                  </div>

                  {/* Time selection */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <Clock className="w-3.5 h-3.5 text-[#5a7258]" />
                      Select Appointment Time
                    </label>

                    <div className="space-y-1">
                      {/* Styled Grid container with no height scroll restriction */}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5 pr-1">
                        {allSlotsToRender.map((slot) => {
                          const isSelected = time === slot;
                          const isAvailable = date && timeSlots.includes(slot);
                          return (
                            <button
                              key={slot}
                              type="button"
                              disabled={!isAvailable}
                              onClick={() => isAvailable && setTime(slot)}
                              className={`h-9 rounded-lg text-[10px] font-bold transition-all border flex items-center justify-center gap-1 cursor-pointer ${
                                isSelected
                                  ? "bg-[#12372A] text-white border-transparent shadow-[0_2px_8px_rgba(18,55,42,0.15)] scale-[1.01]"
                                  : isAvailable
                                  ? "bg-white text-[#12372A] border-[#e8e4d9] hover:bg-[#12372A]/5 hover:border-[#12372A]"
                                  : "bg-zinc-100/50 text-zinc-400 border-zinc-200/40 opacity-50 cursor-not-allowed"
                              }`}
                            >
                              <Clock className={`w-3 h-3 ${isSelected ? "text-white" : isAvailable ? "text-[#5a7258]" : "text-zinc-400"}`} />
                              {formatTime12Hour(slot)}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Reason for Appointment */}
                  <div className="space-y-1">
                    <label className="flex items-center gap-1.5 text-xs font-bold text-[#12372A]">
                      <MessageCircle className="w-3.5 h-3.5 text-[#5a7258]" />
                      Reason for Appointment
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Briefly describe your health concern or consultation reason..."
                      rows={2}
                      className="w-full text-sm bg-white border border-[#e8e4d9] rounded-xl p-3 focus:outline-none focus:ring-1 focus:ring-[#12372A] font-semibold text-[#12372A] placeholder:text-zinc-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full h-12 rounded-xl bg-[#12372A] hover:bg-[#1C3524] text-white text-sm font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Leaf className="w-4 h-4 text-[#C5A880] fill-current" />
                    Book Appointment
                  </button>
                </form>

                {status && (
                  <div className={`mt-4 p-3 rounded-xl flex items-start gap-2 border text-xs transition-all duration-300 ${status.includes("✅")
                      ? "bg-emerald-50/60 border-emerald-500/20 text-emerald-800"
                      : "bg-red-50/60 border-red-500/20 text-red-800"
                    }`}>
                    <div className="mt-0.5 shrink-0">
                      {status.includes("✅") ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-bold">
                        {status.includes("✅") ? "Success" : "Notification"}
                      </p>
                      <p className="mt-0.5 opacity-90 font-medium">
                        {status.replace("✅", "").replace("❌", "").trim()}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}