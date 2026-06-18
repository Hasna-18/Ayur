"use client";

import { useEffect, useState } from "react";
import { 
  CalendarDays, 
  User, 
  LayoutDashboard, 
  ClipboardList, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Patients() {
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    setData(null); // show loading state
    fetch(`/api/admin/patients?page=${page}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch patients");
        return res.json();
      })
      .then(setData)
      .catch((err) => setError(err.message));
  }, [page]);

  // Helpers: dynamic initials avatar color
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

  // Helpers: Formats date to local format
  const formatDateLocale = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return new Date(dateStr).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center p-6 text-center">
        <div className="bg-[#fff5f5] border border-red-200 text-red-700 p-6 rounded-2xl max-w-md shadow-sm">
          <p className="font-bold text-lg">Error loading patients</p>
          <p className="text-sm mt-1">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#12372A] font-semibold">Loading patients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans pb-16 pt-6 px-4 md:px-12">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      {/* BACKGROUND LEAF ILLUSTRATIONS */}
      {/* Top Left Leaves */}
      <div className="absolute -top-12 -left-12 opacity-80 pointer-events-none mix-blend-multiply w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image
          src="/l11.png"
          alt="Leaves decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Top Right Hanging Leaves */}
      <div className="absolute -top-10 -right-10 opacity-90 pointer-events-none mix-blend-multiply rotate-[120deg] w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image
          src="/l12.png"
          alt="Leaves decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Bottom Right Mandalas */}
      <div className="absolute -bottom-16 -right-16 opacity-75 pointer-events-none mix-blend-multiply rotate-[45deg] w-[220px] h-[220px] z-0 select-none">
        <Image
          src="/l13.png"
          alt="Leaves decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col gap-6 md:gap-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] tracking-tight">
                All Patients
              </h1>
              <span className="bg-[#eef3e5] text-emerald-800 text-xs font-extrabold px-3 py-1 rounded-full border border-[#c1d0b5]/50 shadow-inner">
                {data.total} Total
              </span>
            </div>
            <p className="text-[#6b7a68] text-sm font-medium mt-1">
              A complete list of registered patients and their visit status.
            </p>
          </div>

          <div className="flex gap-3">
            <a href="/admin">
              <Button variant="outline" className="border-[#12372A]/20 text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-full px-5 py-4 flex items-center gap-2 shadow-sm font-medium transition duration-200">
                <LayoutDashboard className="w-4 h-4 text-[#12372A]" />
                Dashboard
              </Button>
            </a>
            <a href="/admin/appointments">
              <Button className="bg-[#23382b] hover:bg-[#12372A] text-[#FAF8F5] rounded-full px-6 py-4 flex items-center gap-2 shadow-md font-medium transition duration-200 border-none">
                <ClipboardList className="w-4 h-4 text-[#C5A880]" />
                Appointments List
              </Button>
            </a>
          </div>
        </div>

        {/* PATIENTS CARDS GRID */}
        {data.patients.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-16 text-center shadow-[0_4px_20px_rgba(43,58,47,0.01)] max-w-xl mx-auto mt-6">
            <GiLotus className="w-16 h-16 text-[#c2bba8] mx-auto mb-4 animate-bounce" />
            <h2 className="text-xl font-bold font-serif-display text-[#12372A]">No patients registered</h2>
            <p className="mt-2 text-[#6b7a68] text-sm font-medium">There are currently no patients registered under the clinic system.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-4">
            {data.patients.map((p) => (
              <div
                key={p.id}
                className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Header: Initials Circle & Name */}
                  <div className="flex items-center gap-3.5 mb-4 border-b border-[#e8e4d9]/45 pb-3">
                    <div className={`w-10 h-10 rounded-full ${getAvatarColor(p.name)} flex items-center justify-center font-bold text-sm uppercase shadow-sm flex-shrink-0`}>
                      {p.name ? p.name.charAt(0).toUpperCase() : "A"}
                    </div>
                    <h3 className="text-lg font-bold font-serif-display text-[#12372A] truncate" title={p.name}>
                      {p.name}
                    </h3>
                  </div>

                  {/* Body Content */}
                  <div className="space-y-2.5 text-sm">
                    {/* User Profile Meta (Age & Gender) */}
                    <div className="flex items-center gap-2 text-[#4a5a4b] font-semibold">
                      <User className="w-4 h-4 text-[#a1825b] flex-shrink-0" />
                      <span>Age: {p.age}</span>
                      <span className="text-zinc-300">•</span>
                      <span>Gender: {p.gender}</span>
                    </div>

                    {/* Visit Logs */}
                    <div className="flex items-center gap-2 text-[#4a5a4b] font-semibold">
                      <CalendarDays className="w-4 h-4 text-[#a1825b] flex-shrink-0" />
                      <span>Last Visit:</span>
                      <span className="text-[#12372A] font-bold">
                        {formatDateLocale(p.lastVisit)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION / TABLE FOOTER */}
        {data.total > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-white rounded-3xl border border-[#e8e4d9]/85 shadow-[0_4px_20px_rgba(43,58,47,0.01)] mt-8">
            {/* Pagination Info */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#eef3e5] text-emerald-800 flex items-center justify-center border border-[#c1d0b5]/50 flex-shrink-0">
                <GiLotus className="w-4 h-4" />
              </div>
              <p className="text-xs text-[#6b7a68] font-bold">
                Showing {Math.min((data.page - 1) * 20 + 1, data.total)} to {Math.min(data.page * 20, data.total)} of {data.total} patients
              </p>
            </div>

            {/* Page Navigation Buttons */}
            <div className="flex gap-1.5 items-center">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="w-8 h-8 rounded-xl border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: data.totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  onClick={() => setPage(pNum)}
                  className={`w-8 h-8 rounded-xl font-bold text-xs shadow-sm transition ${
                    page === pNum
                      ? "bg-[#12372A] text-white"
                      : "border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 cursor-pointer bg-white"
                  }`}
                >
                  {pNum}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, data.totalPages))}
                disabled={page === data.totalPages}
                className="w-8 h-8 rounded-xl border border-[#e8e4d9] text-[#6b7a68] hover:bg-[#eae6db]/30 flex items-center justify-center transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
