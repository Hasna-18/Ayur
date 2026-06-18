"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JitsiMeeting from "@/components/jitsi-meeting";
import { 
  Loader2, 
  Sparkles, 
  Upload, 
  CalendarDays, 
  Clock, 
  User, 
  Mail, 
  Leaf, 
  CircleDot, 
  Settings, 
  Video, 
  X, 
  Check, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Sun, 
  Cloud, 
  Moon,
  LayoutDashboard,
  ClipboardList
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState(null);

  // Search & Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Report Form States
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [tips, setTips] = useState("");
  const [plans, setPlans] = useState("");
  const [medicines, setMedicines] = useState("");
  const [file, setFile] = useState(null);
  const [submittingReport, setSubmittingReport] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/admin/appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const handleSendReport = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    setSubmittingReport(true);
    try {
      const formData = new FormData();
      formData.append("appointmentId", selectedAppointment.id);
      formData.append("patientEmail", selectedAppointment.email);
      formData.append("patientName", selectedAppointment.name);
      formData.append("tips", tips);
      formData.append("plans", plans);
      formData.append("medicines", medicines);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/admin/reports", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send report");
      }

      alert("Consultation report sent successfully!");
      setIsReportOpen(false);
      
      // Reset form
      setTips("");
      setPlans("");
      setMedicines("");
      setFile(null);

      // Update status in local state
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === selectedAppointment.id ? { ...item, status: "COMPLETED" } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to submit report");
    } finally {
      setSubmittingReport(false);
    }
  };

  const handleStatus = async (id, action) => {
    try {
      await fetch(`/api/admin/appointments/${id}/${action}`, {
        method: "POST",
      });

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status:
                  action === "cancel"
                    ? "CANCELLED"
                    : action === "done"
                    ? "COMPLETED"
                    : item.status,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const canJoinCall = (appointment) => {
    return appointment.status === "SCHEDULED" && appointment.jitsiRoom && !appointment.meetingExpired;
  };

  const handleJoinCall = (appointment) => {
    if (canJoinCall(appointment)) {
      setActiveCall(appointment);
    } else if (appointment.meetingExpired) {
      alert("The meeting code has expired for this appointment.");
    } else {
      alert("Video call not available for this appointment yet.");
    }
  };

  // Helper: dynamic avatar colors matching character
  const getAvatarColor = (name) => {
    const char = name ? name.charAt(0).toUpperCase() : "A";
    const colors = {
      A: "bg-emerald-700 text-white",
      B: "bg-blue-700 text-white",
      C: "bg-cyan-700 text-white",
      D: "bg-teal-700 text-white",
      E: "bg-indigo-700 text-white",
      F: "bg-orange-700 text-white",
      G: "bg-amber-700 text-white",
      H: "bg-emerald-600 text-white",
      I: "bg-sky-700 text-white",
      J: "bg-violet-700 text-white",
      K: "bg-lime-700 text-white",
      L: "bg-yellow-700 text-white",
      M: "bg-rose-700 text-white",
      N: "bg-pink-700 text-white",
      O: "bg-purple-700 text-white",
      P: "bg-fuchsia-700 text-white",
      Q: "bg-red-700 text-white",
      R: "bg-amber-600 text-white",
      S: "bg-teal-600 text-white",
      T: "bg-blue-600 text-white",
      U: "bg-indigo-600 text-white",
      V: "bg-purple-600 text-white",
      W: "bg-pink-600 text-white",
      X: "bg-red-600 text-white",
      Y: "bg-orange-600 text-white",
      Z: "bg-yellow-600 text-white",
    };
    return colors[char] || "bg-emerald-700 text-white";
  };

  // Helper: sun/moon weather icon mapping based on appointment time
  const getTimeIcon = (dateString) => {
    try {
      const date = new Date(dateString);
      const hours = date.getHours();
      if (hours >= 18 || hours < 6) {
        return <Moon className="w-4 h-4 text-emerald-600/70" />;
      } else if (hours >= 12 && hours < 17) {
        return <Cloud className="w-4 h-4 text-emerald-600/70" />;
      } else {
        return <Sun className="w-4 h-4 text-emerald-600/70" />;
      }
    } catch {
      return <Sun className="w-4 h-4 text-emerald-600/70" />;
    }
  };

  // Computed summary metrics
  const stats = {
    total: appointments.length,
    completed: appointments.filter((a) => a.status === "COMPLETED").length,
    scheduled: appointments.filter((a) => a.status === "SCHEDULED").length,
    cancelled: appointments.filter((a) => a.status === "CANCELLED").length,
  };

  // Live filtering
  const filteredAppointments = appointments.filter((a) => {
    const query = searchQuery.toLowerCase();
    const nameMatch = a.name ? a.name.toLowerCase().includes(query) : false;
    const emailMatch = a.email ? a.email.toLowerCase().includes(query) : false;
    const reasonMatch = a.message ? a.message.toLowerCase().includes(query) : false;
    const statusMatch = a.status ? a.status.toLowerCase().includes(query) : false;
    return nameMatch || emailMatch || reasonMatch || statusMatch;
  });

  // Client-side pagination calculations
  const totalItems = filteredAppointments.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);
  const currentAppointments = filteredAppointments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#12372A] font-semibold">Loading appointments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans pb-12 pt-6 px-4 md:px-12">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      {/* BACKGROUND DECORATIONS (Leaves & Mortar/Pestle) */}
      {/* Top Left Mortar & Pestle */}
      <div className="absolute -top-12 -left-12 opacity-85 pointer-events-none mix-blend-multiply w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image
          src="/admin/appo1.png"
          alt="Mortar & Pestle"
          layout="fill"
          objectFit="contain"
          className="pointer-events-none"
        />
      </div>
      {/* Top Left Leaf */}
      <div className="absolute top-[6%] left-[12%] opacity-65 pointer-events-none mix-blend-multiply rotate-[35deg] w-[120px] h-[120px] z-0 select-none hidden md:block">
        <Image
          src="/l12.png"
          alt="Leaf Decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Top Right Hanging Leaves */}
      <div className="absolute -top-10 -right-10 opacity-90 pointer-events-none mix-blend-multiply rotate-[120deg] w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image
          src="/l11.png"
          alt="Leaves Decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Bottom Left Leaf */}
      <div className="absolute -bottom-8 -left-8 opacity-75 pointer-events-none mix-blend-multiply rotate-[15deg] w-[180px] h-[180px] z-0 select-none">
        <Image
          src="/l12.png"
          alt="Leaf Decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Bottom Right Mandalas / Leaves */}
      <div className="absolute -bottom-12 -right-12 opacity-80 pointer-events-none mix-blend-multiply rotate-[270deg] w-[220px] h-[220px] z-0 select-none">
        <Image
          src="/l13.png"
          alt="Leaf Decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-6 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] tracking-tight">
                Appointments
              </h1>
              <Leaf className="w-6 h-6 text-emerald-600 rotate-[45deg] animate-pulse" />
            </div>
            <p className="text-[#6b7a68] text-sm font-medium mt-1">
              Track and manage all your appointments in one place
            </p>
          </div>

          <div className="flex gap-3">
            <a href="/admin">
              <Button variant="outline" className="border-[#12372A]/20 text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-full px-5 py-4 flex items-center gap-2 shadow-sm font-medium transition duration-200">
                <LayoutDashboard className="w-4 h-4 text-[#12372A]" />
                Dashboard
              </Button>
            </a>
            <a href="/admin/reports">
              <Button className="bg-[#23382b] hover:bg-[#12372A] text-[#FAF8F5] rounded-full px-6 py-4 flex items-center gap-2 shadow-md font-medium transition duration-200 border-none">
                <ClipboardList className="w-4 h-4 text-[#C5A880]" />
                Reports & Prescriptions
              </Button>
            </a>
          </div>
        </div>

        {/* METRIC SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-2">
          {/* Card 1: Total */}
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/80 shadow-[0_4px_12px_rgba(43,58,47,0.01)] p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[#eef3e5] text-emerald-800 flex items-center justify-center shadow-inner flex-shrink-0">
              <CalendarDays className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <p className="text-3xl font-extrabold font-serif-display text-[#12372A] leading-tight">
                {stats.total}
              </p>
              <p className="text-xs text-[#6b7a68] font-semibold tracking-wide mt-0.5">
                Total Appointments
              </p>
            </div>
          </div>

          {/* Card 2: Completed */}
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/80 shadow-[0_4px_12px_rgba(43,58,47,0.01)] p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[#f3f6ee] text-[#4f6b58] flex items-center justify-center shadow-inner flex-shrink-0">
              <GiLotus className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-3xl font-extrabold font-serif-display text-[#12372A] leading-tight">
                {stats.completed}
              </p>
              <p className="text-xs text-[#6b7a68] font-semibold tracking-wide mt-0.5">
                Completed
              </p>
            </div>
          </div>

          {/* Card 3: Scheduled */}
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/80 shadow-[0_4px_12px_rgba(43,58,47,0.01)] p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[#fff9eb] text-[#b4915b] flex items-center justify-center shadow-inner flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-3xl font-extrabold font-serif-display text-[#12372A] leading-tight">
                {stats.scheduled}
              </p>
              <p className="text-xs text-[#6b7a68] font-semibold tracking-wide mt-0.5">
                Scheduled
              </p>
            </div>
          </div>

          {/* Card 4: Cancelled */}
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/80 shadow-[0_4px_12px_rgba(43,58,47,0.01)] p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform duration-300">
            <div className="w-12 h-12 rounded-full bg-[#fff5f5] text-[#d84c4c] flex items-center justify-center shadow-inner flex-shrink-0">
              <X className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-3xl font-extrabold font-serif-display text-[#12372A] leading-tight">
                {stats.cancelled}
              </p>
              <p className="text-xs text-[#6b7a68] font-semibold tracking-wide mt-0.5">
                Cancelled
              </p>
            </div>
          </div>
        </div>

        {/* SEARCH AND FILTER BAR */}
        <div className="flex justify-end items-center gap-3 mt-2">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-11 pr-4 py-2.5 w-64 md:w-80 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm transition-all"
            />
          </div>
          <button className="p-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-[#3e4a3d] hover:bg-[#faf8f5] hover:border-[#12372A]/40 transition-colors shadow-sm cursor-pointer">
            <SlidersHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* APPOINTMENTS TABLE */}
        <div className="bg-white rounded-[28px] border border-[#e8e4d9]/85 shadow-[0_4px_20px_rgba(43,58,47,0.02)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-[#f2efe6] border-b border-[#e8e4d9]/70 text-[#4a5a4b] text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>DATE & TIME</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>PATIENT</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>EMAIL</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>REASON</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <Video className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>VIDEO CALL</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <CircleDot className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>STATUS</span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left border-r border-[#e8e4d9]/30 last:border-r-0">
                    <div className="flex items-center gap-2">
                      <Settings className="w-3.5 h-3.5 text-[#a1825b]" />
                      <span>ACTIONS</span>
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#e8e4d9]/45">
                {currentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-16 text-center text-zinc-500 font-medium">
                      <GiLotus className="w-12 h-12 text-[#c2bba8] mx-auto mb-3 animate-bounce" />
                      No appointments found matching your search.
                    </td>
                  </tr>
                ) : (
                  currentAppointments.map((user) => {
                    // Extract Date Details for the premium Calendar Card
                    const dateObj = new Date(user.time);
                    const monthStr = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
                    const dayStr = dateObj.getDate();
                    const yearStr = dateObj.getFullYear();
                    const timeStr = dateObj.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <tr key={user.id} className="hover:bg-[#fafaf7] transition-colors duration-150">
                        {/* Time & Date Cell */}
                        <td className="px-6 py-4 align-middle">
                          <div className="flex items-center gap-4">
                            {/* Calendar Box */}
                            <div className="flex flex-col items-center justify-center bg-[#f7f5ef] border border-[#e8e4d9] rounded-xl px-2.5 py-1.5 min-w-[54px] text-center shadow-sm">
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
                            {/* Time and Sunrise/Moon Icon */}
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm font-bold text-[#12372A]">
                                {timeStr}
                              </span>
                              {getTimeIcon(user.time)}
                            </div>
                          </div>
                        </td>

                        {/* Patient Cell */}
                        <td className="px-6 py-4 align-middle">
                          <div className="flex items-center gap-3">
                            <div className={`w-8 h-8 rounded-full ${getAvatarColor(user.name)} flex items-center justify-center font-bold text-xs uppercase shadow-sm flex-shrink-0`}>
                              {user.name ? user.name.charAt(0).toUpperCase() : "A"}
                            </div>
                            <span className="text-sm font-semibold text-[#12372A] whitespace-nowrap">
                              {user.name}
                            </span>
                          </div>
                        </td>

                        {/* Email Cell */}
                        <td className="px-6 py-4 align-middle text-sm text-[#4a5a4b] font-medium">
                          {user.email}
                        </td>

                        {/* Reason Cell */}
                        <td className="px-6 py-4 align-middle">
                          <span className="text-sm text-[#4a5a4b] font-medium max-w-[160px] line-clamp-2" title={user.message}>
                            {user.message || "-"}
                          </span>
                        </td>

                        {/* Video Call Cell */}
                        <td className="px-6 py-4 align-middle">
                          {user.jitsiRoom ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-2.5 flex-wrap">
                                <button
                                  onClick={() => handleJoinCall(user)}
                                  disabled={!canJoinCall(user)}
                                  className={`text-xs font-bold flex items-center gap-1.5 transition ${
                                    canJoinCall(user) 
                                      ? "text-emerald-700 underline hover:text-emerald-800 cursor-pointer" 
                                      : "text-zinc-400 cursor-not-allowed"
                                  }`}
                                >
                                  <Video className="w-3.5 h-3.5" />
                                  Join Call ↗
                                </button>
                                {!user.meetingExpired && (
                                  <a
                                    href={`https://meet.jit.si/${user.jitsiRoom}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[10px] text-emerald-600 hover:text-emerald-700 underline flex items-center gap-0.5"
                                  >
                                    Direct Link ↗
                                  </a>
                                )}
                              </div>
                              <p className="text-[10px] text-zinc-500 font-medium">
                                Code: <span className="font-semibold text-zinc-700">{user.jitsiRoom}</span>
                                {user.meetingExpired ? " (expired)" : ""}
                              </p>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm font-medium pl-1">-</span>
                          )}
                        </td>

                        {/* Status Cell */}
                        <td className="px-6 py-4 align-middle">
                          {user.status === "COMPLETED" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f0f6f0] border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide">
                              <GiLotus className="w-4 h-4 text-emerald-600" />
                              COMPLETED
                            </span>
                          ) : user.status === "SCHEDULED" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff9eb] border border-amber-200/80 text-amber-700 text-xs font-semibold tracking-wide">
                              <Clock className="w-3.5 h-3.5 text-amber-600" />
                              SCHEDULED
                            </span>
                          ) : user.status === "CANCELLED" ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#fff5f5] border border-red-200/85 text-red-700 text-xs font-semibold tracking-wide">
                              <X className="w-3.5 h-3.5 text-red-500" />
                              CANCELLED
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 border border-gray-200 text-gray-700 text-xs font-semibold tracking-wide">
                              {user.status}
                            </span>
                          )}
                        </td>

                        {/* Actions Cell */}
                        <td className="px-6 py-4 align-middle">
                          <div className="flex items-center gap-2">
                            {/* Cancel Button */}
                            <button
                              onClick={() => handleStatus(user.id, "cancel")}
                              disabled={user.status === "CANCELLED"}
                              title="Cancel Appointment"
                              className={`w-8 h-8 rounded-full border border-red-200/80 bg-[#fff5f5] hover:bg-[#ffeaea] flex items-center justify-center text-red-600 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>

                            {/* Done Button */}
                            <button
                              onClick={() => handleStatus(user.id, "done")}
                              disabled={user.status === "COMPLETED"}
                              title="Mark Completed"
                              className={`w-8 h-8 rounded-full border border-emerald-200/80 bg-[#f0f6f0] hover:bg-[#e3f0e3] flex items-center justify-center text-emerald-700 transition-colors shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>

                            {/* View Pill Button (Triggers Send Report Form) */}
                            <button
                              onClick={() => {
                                setSelectedAppointment(user);
                                setIsReportOpen(true);
                              }}
                              className="px-4 py-1.5 bg-[#12372A] hover:bg-[#1b4636] text-white rounded-full text-xs font-bold flex items-center gap-1 transition shadow-sm cursor-pointer hover:shadow"
                            >
                              Report
                              <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION / TABLE FOOTER */}
          {totalItems > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-[#FAF8F5] border-t border-[#e8e4d9]/70">
              {/* Pagination Info */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#eef3e5] text-emerald-800 flex items-center justify-center border border-[#c1d0b5]/50 flex-shrink-0">
                  <GiLotus className="w-4 h-4" />
                </div>
                <p className="text-xs text-[#6b7a68] font-bold">
                  Showing {startItem} to {endItem} of {totalItems} appointments
                </p>
              </div>

              {/* Page Selector & Controls */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Items Per Page Selector */}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#6b7a68]">
                  <span>Show</span>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => {
                      setItemsPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-white border border-[#e8e4d9] rounded-xl px-2.5 py-1.5 text-xs text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                  </select>
                  <span>per page</span>
                </div>

                {/* Page Navigation Buttons */}
                <div className="flex gap-1.5">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="w-8 h-8 rounded-xl border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-xl font-bold text-xs shadow-sm transition ${
                        currentPage === page
                          ? "bg-[#12372A] text-white"
                          : "border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 cursor-pointer"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="w-8 h-8 rounded-xl border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Jitsi Video Call Modal */}
      <Dialog open={!!activeCall} onOpenChange={(open) => {
        if (!open) setActiveCall(null);
      }}>
        <DialogContent className="w-full max-w-6xl h-[90vh] p-0 bg-[#faf8f5] border border-[#e8e4d9] rounded-[24px] overflow-hidden shadow-2xl">
          <DialogHeader className="absolute top-0 left-0 right-0 z-50 bg-[#12372A] text-[#FAF8F5] p-4 flex items-center justify-between">
            <DialogTitle className="text-lg font-serif-display text-[#FAF8F5] flex items-center gap-2">
              <Video className="w-5 h-5 text-[#C5A880]" />
              Video Call - {activeCall?.name}
            </DialogTitle>
          </DialogHeader>
          {activeCall && (
            <div className="mt-12 w-full h-full">
              <JitsiMeeting
                roomName={activeCall.jitsiRoom}
                userName="Doctor"
                onClose={() => setActiveCall(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Send Report & Prescription Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-2xl bg-[#faf8f5] border border-[#e8e4d9] text-[#12372A] rounded-[28px] overflow-y-auto max-h-[90vh] p-6 shadow-2xl">
          <DialogHeader className="border-b border-[#e8e4d9]/50 pb-4 mb-4">
            <DialogTitle className="text-2xl font-bold font-serif-display text-[#12372A] flex items-center gap-2.5">
              Send Prescription & Tips to {selectedAppointment?.name}
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSendReport} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">Patient Name</label>
                <input
                  type="text"
                  readOnly
                  value={selectedAppointment?.name || ""}
                  className="w-full bg-[#f2efe6]/40 border border-[#e8e4d9] rounded-xl px-3 py-2 text-sm text-zinc-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">Patient Email</label>
                <input
                  type="email"
                  readOnly
                  value={selectedAppointment?.email || ""}
                  className="w-full bg-[#f2efe6]/40 border border-[#e8e4d9] rounded-xl px-3 py-2 text-sm text-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">Medicines & Dosages (1 per line)</label>
              <textarea
                placeholder="e.g. Ashwagandha Tablet - 1 after breakfast&#10;Triphala Churna - 1 tsp with warm water before bed"
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                rows={4}
                className="w-full bg-white border border-[#e8e4d9] rounded-xl px-3.5 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] whitespace-pre-wrap shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">Diet / Treatment / Lifestyle Plans</label>
              <textarea
                placeholder="e.g. Drink warm ginger tea in the morning. Avoid cold food and drinks. Perform oil massage before bath."
                value={plans}
                onChange={(e) => setPlans(e.target.value)}
                rows={3}
                className="w-full bg-white border border-[#e8e4d9] rounded-xl px-3.5 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-inner"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">Daily Wellness Tips</label>
              <textarea
                placeholder="e.g. Sleep by 10 PM. Wake up early for meditation. Stay active throughout the day."
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                rows={2}
                className="w-full bg-white border border-[#e8e4d9] rounded-xl px-3.5 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-inner"
              />
            </div>

            <div className="border border-dashed border-[#e8e4d9] rounded-xl p-4 bg-[#fbfaf7]">
              <label className="block text-xs font-bold text-[#6b7a68] mb-2 uppercase tracking-wide">Upload PDF Document or Image Attachment</label>
              <div className="flex items-center gap-3">
                <div className="relative cursor-pointer bg-[#eef3e5] hover:bg-[#e2edd3] text-[#12372A] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow-sm border border-[#c1d0b5]/50">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                  />
                </div>
                <span className="text-xs text-zinc-500 font-medium truncate max-w-xs">
                  {file ? file.name : "No file chosen (Supports PDF & Images)"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e4d9]/50">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsReportOpen(false)}
                className="border-[#e8e4d9] text-[#6b7a68] hover:text-[#12372A] bg-white rounded-xl shadow-sm px-4"
                disabled={submittingReport}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submittingReport}
                className="bg-[#12372A] hover:bg-[#1c4a3b] text-white rounded-xl px-6 min-w-[110px] shadow-md transition"
              >
                {submittingReport ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending...
                  </div>
                ) : "Send Report"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
