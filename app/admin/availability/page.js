"use client";

import { useState, useEffect } from "react";
import { 
  CalendarDays, 
  Clock, 
  Trash2, 
  Plus, 
  Eye, 
  Leaf, 
  ChevronDown, 
  CalendarRange,
  Timer,
  Save,
  Check
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AvailabilityManager() {
  const [weeklyOff, setWeeklyOff] = useState([]);
  const [offDates, setOffDates] = useState([]);
  const [timeOff, setTimeOff] = useState([]);
  const [dailyTime, setDailyTime] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [weeklyRes, datesRes, timeRes, dailyRes] = await Promise.all([
        fetch("/api/admin/availability/weekly-off"),
        fetch("/api/admin/availability/off-dates"),
        fetch("/api/admin/availability/time-off"),
        fetch("/api/admin/availability/daily-time")
      ]);

      if (weeklyRes.ok) setWeeklyOff(await weeklyRes.json());
      if (datesRes.ok) setOffDates(await datesRes.json());
      if (timeRes.ok) setTimeOff(await timeRes.json());
      if (dailyRes.ok) {
        const dailyData = await dailyRes.json();
        if (dailyData.start) setDailyTime(dailyData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Weekly Off Functions
  const addWeeklyOff = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dayOfWeek = Number(formData.get("dayOfWeek"));

    try {
      const res = await fetch("/api/admin/availability/weekly-off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayOfWeek })
      });

      if (res.ok) {
        const newOff = await res.json();
        setWeeklyOff(prev => [...prev, newOff]);
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add weekly off");
      }
    } catch (error) {
      alert("Error adding weekly off");
    }
  };

  const deleteWeeklyOff = async (id) => {
    try {
      const res = await fetch(`/api/admin/availability/weekly-off?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setWeeklyOff(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete weekly off");
      }
    } catch (error) {
      alert("Error deleting weekly off");
    }
  };

  // Off Dates Functions
  const addOffDate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get("offDate");

    try {
      const res = await fetch("/api/admin/availability/off-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date })
      });

      if (res.ok) {
        const newDate = await res.json();
        setOffDates(prev => [...prev, newDate]);
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add off date");
      }
    } catch (error) {
      alert("Error adding off date");
    }
  };

  const removeOffDate = async (id) => {
    try {
      const res = await fetch(`/api/admin/availability/off-dates?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setOffDates(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete off date");
      }
    } catch (error) {
      alert("Error deleting off date");
    }
  };

  // Time Off Functions
  const addTimeOff = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get("date");
    const start = formData.get("start");
    const end = formData.get("end");

    try {
      const res = await fetch("/api/admin/availability/time-off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, start, end })
      });

      if (res.ok) {
        const newTimeOff = await res.json();
        setTimeOff(prev => [...prev, newTimeOff]);
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add time off");
      }
    } catch (error) {
      alert("Error adding time off");
    }
  };

  const removeTimeOff = async (id) => {
    try {
      const res = await fetch(`/api/admin/availability/time-off?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setTimeOff(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete time off");
      }
    } catch (error) {
      alert("Error deleting time off");
    }
  };

  // Daily Time Functions
  const setDailyTimeHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const start = formData.get("start");
    const end = formData.get("end");

    try {
      const res = await fetch("/api/admin/availability/daily-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end })
      });

      if (res.ok) {
        const newDailyTime = await res.json();
        setDailyTime({ start: newDailyTime.start, end: newDailyTime.end });
        alert("Daily working hours updated successfully!");
      } else {
        const error = await res.json();
        alert(error.error || "Failed to set daily time");
      }
    } catch (error) {
      alert("Error setting daily time");
    }
  };

  // Helpers: Formats a 24-hour time string "HH:MM" to 12-hour AM/PM format "HH:MM AM/PM"
  const formatTime12h = (timeStr) => {
    if (!timeStr) return "";
    try {
      const [hoursStr, minutesStr] = timeStr.split(":");
      let hours = parseInt(hoursStr, 10);
      const minutes = minutesStr;
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12;
      const formattedHours = hours < 10 ? `0${hours}` : hours;
      return `${formattedHours}:${minutes} ${ampm}`;
    } catch {
      return timeStr;
    }
  };

  // Helpers: Formats raw HTML date picker values "YYYY-MM-DD" to standard local locale
  const formatDateLocale = (dateStr) => {
    if (!dateStr) return "";
    try {
      return new Date(dateStr).toLocaleDateString([], {
        month: "numeric",
        day: "numeric",
        year: "numeric"
      });
    } catch {
      return dateStr;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#12372A] font-semibold">Loading availability settings...</p>
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
      {/* Top Left Leaf */}
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
      {/* Bottom Left Mandalas */}
      <div className="absolute -bottom-16 -left-16 opacity-75 pointer-events-none mix-blend-multiply rotate-[45deg] w-[220px] h-[220px] z-0 select-none">
        <Image
          src="/l13.png"
          alt="Leaves decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {/* Bottom Right Leaf */}
      <div className="absolute -bottom-8 -right-8 opacity-85 pointer-events-none mix-blend-multiply rotate-[260deg] w-[180px] h-[180px] z-0 select-none">
        <Image
          src="/l12.png"
          alt="Leaves decoration"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="max-w-4xl mx-auto flex flex-col gap-6 md:gap-8 relative z-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] tracking-tight">
              Manage Availability
            </h1>
            <p className="text-[#6b7a68] text-sm font-medium mt-1">
              Set your availability and control when you're open for appointments.
            </p>
          </div>

          <a href="/user/book" target="_blank" rel="noopener noreferrer">
            <Button className="bg-[#23382b] hover:bg-[#12372A] text-white rounded-full px-5 py-4 flex items-center gap-2 shadow-md text-xs font-semibold border-none transition duration-200">
              <Eye className="w-4 h-4 text-[#C5A880]" />
              Preview Availability
            </Button>
          </a>
        </div>

        {/* 1. WEEKLY OFF DAYS CARD */}
        <section className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-shadow duration-300 relative overflow-hidden">
          {/* Mortar Vector Deco inside card */}
          <div className="absolute right-6 top-6 w-32 h-32 opacity-80 select-none pointer-events-none hidden sm:block mix-blend-multiply">
            <Image 
              src="/admin/appo1.png" 
              alt="Mortar & Leaves Deco" 
              layout="fill" 
              objectFit="contain" 
            />
          </div>

          {/* Header Flex */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#eef3e5] text-emerald-800 flex items-center justify-center flex-shrink-0 border border-[#c1d0b5]/40 shadow-inner">
              <CalendarDays className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-display text-[#12372A]">Weekly Off Days</h2>
              <p className="text-xs text-[#6b7a68] font-medium mt-0.5">Select days of the week you are unavailable.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={addWeeklyOff} className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative">
              <select
                name="dayOfWeek"
                defaultValue={0}
                className="pl-4 pr-10 py-2 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm appearance-none cursor-pointer w-48"
              >
                <option value={0}>Sunday</option>
                <option value={1}>Monday</option>
                <option value={2}>Tuesday</option>
                <option value={3}>Wednesday</option>
                <option value={4}>Thursday</option>
                <option value={5}>Friday</option>
                <option value={6}>Saturday</option>
              </select>
              <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988] pointer-events-none" />
            </div>

            <button 
              type="submit"
              className="px-5 py-2 rounded-full bg-[#23382b] hover:bg-[#12372A] text-[#FAF8F5] text-xs font-bold transition shadow-sm flex items-center gap-1 border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
              Add Weekly Off
            </button>
          </form>

          {/* Weekly Off Table */}
          <div className="border border-[#e8e4d9]/70 rounded-2xl overflow-hidden shadow-sm max-w-xl">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#f2efe6] border-b border-[#e8e4d9]/60 text-[#4a5a4b] text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 border-r border-[#e8e4d9]/30 last:border-r-0">Day</th>
                  <th className="px-5 py-3.5 text-right border-r border-[#e8e4d9]/30 last:border-r-0">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e4d9]/45">
                {weeklyOff.length === 0 ? (
                  <tr>
                    <td className="px-5 py-6 text-zinc-500 font-medium text-sm text-center" colSpan={2}>
                      <GiLotus className="w-8 h-8 text-[#c2bba8] mx-auto mb-2" />
                      No weekly off days configured
                    </td>
                  </tr>
                ) : (
                  weeklyOff.map(item => (
                    <tr key={item.id} className="hover:bg-[#fafaf7] transition-colors duration-150">
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#12372A]">
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][item.dayOfWeek]}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => deleteWeeklyOff(item.id)}
                          className="text-red-600 hover:text-red-700 hover:underline text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. SPECIFIC OFF DATES CARD */}
        <section className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-shadow duration-300">
          {/* Header Flex */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#eef3e5] text-emerald-800 flex items-center justify-center flex-shrink-0 border border-[#c1d0b5]/40 shadow-inner">
              <CalendarRange className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-display text-[#12372A]">Specific Off Dates</h2>
              <p className="text-xs text-[#6b7a68] font-medium mt-0.5">Add specific dates when you are unavailable.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={addOffDate} className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative">
              <input
                type="date"
                name="offDate"
                required
                className="pl-4 pr-4 py-2 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-48"
              />
            </div>

            <button 
              type="submit"
              className="px-5 py-2 rounded-full bg-[#23382b] hover:bg-[#12372A] text-[#FAF8F5] text-xs font-bold transition shadow-sm flex items-center gap-1 border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
              Add Off Date
            </button>
          </form>

          {/* Table */}
          <div className="border border-[#e8e4d9]/70 rounded-2xl overflow-hidden shadow-sm max-w-xl">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#f2efe6] border-b border-[#e8e4d9]/60 text-[#4a5a4b] text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 border-r border-[#e8e4d9]/30 last:border-r-0">Date</th>
                  <th className="px-5 py-3.5 text-right border-r border-[#e8e4d9]/30 last:border-r-0">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e4d9]/45">
                {offDates.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8" colSpan={2}>
                      <div className="flex flex-col items-center justify-center text-center text-zinc-500 font-medium bg-[#fafaf7]/30">
                        <CalendarDays className="w-10 h-10 text-[#c2bba8] mb-2" />
                        <p className="text-sm font-semibold text-[#12372A]">No specific off dates configured</p>
                        <p className="text-xs text-zinc-400 mt-1">Add dates when you will be unavailable.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  offDates.map(item => (
                    <tr key={item.id} className="hover:bg-[#fafaf7] transition-colors duration-150">
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#12372A]">
                        {formatDateLocale(item.date)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => removeOffDate(item.id)}
                          className="text-red-600 hover:text-red-700 hover:underline text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* 3. DAILY WORKING HOURS CARD */}
        <section className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-shadow duration-300">
          {/* Header Flex */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#eef3e5] text-emerald-800 flex items-center justify-center flex-shrink-0 border border-[#c1d0b5]/40 shadow-inner">
              <Clock className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-display text-[#12372A]">Daily Working Hours</h2>
              <p className="text-xs text-[#6b7a68] font-medium mt-0.5">Set the time range for your daily availability.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={setDailyTimeHandler} className="flex flex-wrap gap-4 items-center mb-4">
            {/* Start Picker wrapper */}
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988] pointer-events-none" />
              <input
                type="time"
                name="start"
                required
                defaultValue={dailyTime.start}
                className="pl-10 pr-4 py-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-40"
              />
            </div>
            <span className="text-[#8a9988] font-medium text-sm">to</span>
            {/* End Picker wrapper */}
            <div className="relative">
              <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988] pointer-events-none" />
              <input
                type="time"
                name="end"
                required
                defaultValue={dailyTime.end}
                className="pl-10 pr-4 py-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-40"
              />
            </div>

            <button 
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#23382b] hover:bg-[#12372A] text-[#FAF8F5] text-xs font-bold transition shadow-md flex items-center gap-1.5 border-none cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 text-[#C5A880]" />
              Update Daily Time
            </button>
          </form>

          {/* Current Settings Alert */}
          {dailyTime.start && (
            <div className="flex items-center gap-2 px-4 py-3 bg-[#f3f6ee] text-[#12372A] rounded-xl text-xs font-bold mt-4 border border-[#c1d0b5]/20 shadow-sm w-fit">
              <Leaf className="w-4 h-4 text-emerald-600 rotate-[45deg]" />
              <span>
                Current daily availability: {formatTime12h(dailyTime.start)} to {formatTime12h(dailyTime.end)}
              </span>
            </div>
          )}
        </section>

        {/* 4. TIME OFF SLOTS CARD */}
        <section className="bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-shadow duration-300">
          {/* Header Flex */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-[#eef3e5] text-emerald-800 flex items-center justify-center flex-shrink-0 border border-[#c1d0b5]/40 shadow-inner">
              <Timer className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-display text-[#12372A]">Time Off Slots</h2>
              <p className="text-xs text-[#6b7a68] font-medium mt-0.5">Add time slots when you are unavailable during the day.</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={addTimeOff} className="flex flex-wrap gap-3 items-center mb-6">
            <div className="relative">
              <input
                type="date"
                name="date"
                required
                className="pl-4 pr-4 py-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-44"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988] pointer-events-none" />
              <input
                type="time"
                name="start"
                required
                className="pl-9 pr-3 py-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-32"
              />
            </div>
            <span className="text-[#8a9988] font-medium text-sm mx-1">to</span>
            <div className="relative">
              {/* Optional Visual Date display matches Mockup date input range */}
              <input
                type="date"
                name="endDate"
                className="pl-4 pr-4 py-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-44"
                placeholder="End Date"
              />
            </div>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988] pointer-events-none" />
              <input
                type="time"
                name="end"
                required
                className="pl-9 pr-3 py-2.5 bg-white border border-[#e8e4d9] rounded-2xl text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm cursor-pointer w-32"
              />
            </div>

            <button 
              type="submit"
              className="px-5 py-2.5 rounded-full bg-[#23382b] hover:bg-[#12372A] text-[#FAF8F5] text-xs font-bold transition shadow-md flex items-center gap-1 border-none cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
              Add Time Off
            </button>
          </form>

          {/* Table */}
          <div className="border border-[#e8e4d9]/70 rounded-2xl overflow-hidden shadow-sm max-w-2xl">
            <table className="w-full border-collapse text-left">
              <thead className="bg-[#f2efe6] border-b border-[#e8e4d9]/60 text-[#4a5a4b] text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-5 py-3.5 border-r border-[#e8e4d9]/30 last:border-r-0">Date</th>
                  <th className="px-5 py-3.5 border-r border-[#e8e4d9]/30 last:border-r-0">Time</th>
                  <th className="px-5 py-3.5 text-right border-r border-[#e8e4d9]/30 last:border-r-0">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8e4d9]/45">
                {timeOff.length === 0 ? (
                  <tr>
                    <td className="px-5 py-8" colSpan={3}>
                      <div className="flex flex-col items-center justify-center text-center text-zinc-500 font-medium bg-[#fafaf7]/30">
                        <Clock className="w-10 h-10 text-[#c2bba8] mb-2" />
                        <p className="text-sm font-semibold text-[#12372A]">No time off slots configured</p>
                        <p className="text-xs text-zinc-400 mt-1">Add time slots to block your availability.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  timeOff.map(item => (
                    <tr key={item.id} className="hover:bg-[#fafaf7] transition-colors duration-150">
                      <td className="px-5 py-3.5 text-sm font-semibold text-[#12372A]">
                        {formatDateLocale(item.date)}
                      </td>
                      <td className="px-5 py-3.5 text-sm font-bold text-[#12372A]">
                        {formatTime12h(item.start)} - {formatTime12h(item.end)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <button
                          onClick={() => removeTimeOff(item.id)}
                          className="text-red-600 hover:text-red-700 hover:underline text-xs font-bold flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* BOTTOM BRANDING BANNER */}
        <div className="flex flex-col items-center gap-4 mt-4 text-center">
          <div className="h-[1px] w-full bg-[#e8e4d9]/60" />
          <div className="flex items-center gap-1.5 text-emerald-800 font-serif-display italic text-base md:text-lg select-none">
            <Leaf className="w-4 h-4 text-emerald-600 rotate-[-45deg] fill-current opacity-70" />
            <span className="text-[#6b7a68]">Heal your body. Calm your mind. Live your best life.</span>
            <Leaf className="w-4 h-4 text-emerald-600 rotate-[135deg] fill-current opacity-70" />
          </div>
        </div>

      </div>
    </div>
  );
}