"use client";

import { useEffect, useState } from "react";
import { User, Save, Sparkles, Loader2, Mail, ShieldCheck } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProfilePage() {
  const [profile, setProfile] = useState({ name: "", email: "", age: "", gender: "" });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/user/profile");
      if (!res.ok) throw new Error("Failed to fetch profile");
      const data = await res.json();
      setProfile({
        name: data.name || "",
        email: data.email || "",
        age: data.age !== null && data.age !== undefined ? data.age.toString() : "",
        gender: data.gender || "",
      });
    } catch (error) {
      console.error(error);
      setMessage({ text: "Error loading profile details.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("/api/user/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          age: profile.age ? parseInt(profile.age, 10) : null,
          gender: profile.gender || null,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to update profile");
      }

      setMessage({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setMessage({ text: error.message || "Failed to save changes.", type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  // Helpers: dynamic avatar color based on initials
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#12372A] font-semibold">Loading profile...</p>
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

      <div className="max-w-5xl mx-auto flex flex-col gap-6 md:gap-8 relative z-10 mt-6">
        
        {/* HEADER SECTION */}
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] tracking-tight">
              My Profile
            </h1>
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </div>
          <p className="text-[#6b7a68] text-sm font-medium mt-1">
            Update your personal details to customize your medical treatments and consultation records.
          </p>
        </div>

        {/* DUAL COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: VISUAL PROFILE CARD SUMMARY */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
            {/* Top accent line */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-[#C5A880] to-emerald-800" />
            
            {/* Large Initials Avatar */}
            <div className={`w-24 h-24 rounded-full ${getAvatarColor(profile.name)} flex items-center justify-center font-bold text-3xl uppercase shadow-md my-4 border-4 border-[#faf8f5]`}>
              {profile.name ? profile.name.charAt(0).toUpperCase() : "A"}
            </div>

            {/* Profile Info */}
            <h2 className="text-2xl font-bold font-serif-display text-[#12372A] tracking-tight truncate w-full px-2">
              {profile.name || "Patient"}
            </h2>
            
            <p className="text-xs text-[#6b7a68] font-semibold flex items-center gap-1 mt-1.5 justify-center bg-[#f2efe6]/60 px-3 py-1 rounded-full border border-[#e8e4d9]/40 shadow-inner w-fit">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
              Verified Patient
            </p>

            <div className="w-full border-t border-[#e8e4d9]/45 my-5" />

            {/* Email strip */}
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6b7a68] mb-3">
              <Mail className="w-4 h-4 text-[#a1825b]" />
              <span className="truncate max-w-[180px]">{profile.email}</span>
            </div>

            {/* Cursive handwritten placeholder */}
            <div className="my-2">
              <span className="font-hand text-3xl text-emerald-800 tracking-wide select-none">
                Heal naturally.
              </span>
            </div>

            {/* Bottom leaf illustration mask */}
            <div className="w-20 h-20 relative opacity-15 mt-3 select-none pointer-events-none">
              <GiLotus className="w-full h-full text-emerald-950" />
            </div>
          </div>

          {/* RIGHT COLUMN: EDIT DETAILS CARD */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-shadow duration-300">
            <h3 className="text-xl font-bold font-serif-display text-[#12372A] mb-6 border-b border-[#e8e4d9]/45 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-[#a1825b]" />
              Personal Details
            </h3>

            <form onSubmit={handleUpdate} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Readonly: Name */}
                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Full Name
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={profile.name}
                    className="w-full bg-[#f2efe6]/40 border border-[#e8e4d9] rounded-2xl px-4 py-3 text-sm text-zinc-500 focus:outline-none"
                  />
                </div>

                {/* Readonly: Email */}
                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <input
                    type="email"
                    readOnly
                    value={profile.email}
                    className="w-full bg-[#f2efe6]/40 border border-[#e8e4d9] rounded-2xl px-4 py-3 text-sm text-zinc-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Editable: Age */}
                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Age (Years)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="120"
                    required
                    placeholder="e.g. 28"
                    value={profile.age}
                    onChange={(e) => setProfile(prev => ({ ...prev, age: e.target.value }))}
                    className="w-full bg-white border border-[#e8e4d9] rounded-2xl px-4 py-3 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                  />
                </div>

                {/* Editable: Gender */}
                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Gender Identity
                  </label>
                  <div className="relative">
                    <select
                      value={profile.gender}
                      onChange={(e) => setProfile(prev => ({ ...prev, gender: e.target.value }))}
                      required
                      className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-4 pr-10 py-3 text-sm text-[#12372A] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                      <option value="Prefer not to say">Prefer not to say</option>
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988] pointer-events-none flex items-center justify-center">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Success / Error Messages */}
              {message.text && (
                <div className={`p-4 rounded-2xl text-xs font-bold transition duration-300 ${
                  message.type === "success" 
                    ? "bg-[#f3f6ee] text-emerald-800 border border-[#c1d0b5]/25 shadow-sm" 
                    : "bg-[#fff5f5] text-red-700 border border-red-200"
                }`}>
                  {message.text}
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#12372A] hover:bg-[#1c4a3b] text-white rounded-2xl py-6 flex items-center justify-center gap-2 shadow-md transition font-semibold"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving profile changes...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-[#C5A880]" />
                      <span>Update Profile</span>
                    </>
                  )}
                </Button>
              </div>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
}

// Chevron selector arrow helper icon
function ChevronDown(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
