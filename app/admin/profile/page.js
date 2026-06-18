"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Activity,
  MapPin,
  FileText,
  Save,
  Sparkles,
  Loader2,
  LayoutDashboard,
  ClipboardList
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function AdminProfile() {
  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    specialization: "",
    clinicAddress: "",
    bio: "",
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Load existing data from database
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      setProfile({
        ...emptyProfile,
        ...data,
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setStatus("");
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Update failed");

      setStatus("success");
    } catch (err) {
      setStatus("error");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

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
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-4 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-4xl md:text-5xl font-bold font-serif-display text-[#12372A] tracking-tight">
                Profile Settings
              </h1>
              <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            </div>
            <p className="text-[#6b7a68] text-sm font-medium mt-1">
              Update your clinic metadata, specialization details, phone number, and professional bio.
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

        {/* DUAL COLUMN LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: DOCTOR VISUAL SUMMARY CARD */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-all duration-300 flex flex-col items-center text-center relative overflow-hidden">
            {/* Gradient Top Line banner */}
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-emerald-600 via-[#C5A880] to-emerald-800" />

            {/* Doctor Avatar image */}
            <div className="w-24 h-24 rounded-full overflow-hidden shadow-md border-4 border-[#faf8f5] relative mt-4 mb-3">
              <Image
                src="/profile.jpeg"
                alt="Doctor Avatar"
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Name */}
            <h2 className="text-xl font-bold font-serif-display text-[#12372A] tracking-tight truncate w-full px-1">
              {profile.name || "Doctor"}
            </h2>

            {/* Specialization Cursive */}
            {profile.specialization && (
              <p className="font-hand text-2xl text-emerald-800 font-medium leading-none mt-1">
                {profile.specialization}
              </p>
            )}

            <p className="text-[10px] text-emerald-800 font-bold uppercase tracking-widest bg-[#eef3e5] border border-[#c1d0b5]/50 rounded-full px-3 py-1 mt-3 shadow-inner">
              Lead Practitioner
            </p>

            <div className="w-full border-t border-[#e8e4d9]/45 my-4" />

            {/* Contact strip details */}
            <div className="w-full text-left space-y-2.5 px-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#6b7a68]">
                <Mail className="w-4 h-4 text-[#a1825b] flex-shrink-0" />
                <span className="truncate">{profile.email || "No email listed"}</span>
              </div>

              {profile.phone && (
                <div className="flex items-center gap-2.5 text-xs font-semibold text-[#6b7a68]">
                  <Phone className="w-4 h-4 text-[#a1825b] flex-shrink-0" />
                  <span>{profile.phone}</span>
                </div>
              )}
            </div>

            <div className="w-full border-t border-[#e8e4d9]/45 my-4" />

            {/* Bio summary */}
            {profile.bio && (
              <p className="text-xs text-[#6b7a68] leading-relaxed italic text-center px-1 max-h-24 overflow-y-auto w-full">
                "{profile.bio}"
              </p>
            )}

            <div className="w-12 h-12 relative opacity-15 mt-3 select-none pointer-events-none">
              <GiLotus className="w-full h-full text-emerald-950" />
            </div>
          </div>

          {/* RIGHT COLUMN: EDIT DETAILS CARD */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-[#e8e4d9]/85 p-6 md:p-8 shadow-[0_4px_20px_rgba(43,58,47,0.01)] hover:shadow-[0_8px_30px_rgba(43,58,47,0.02)] transition-shadow duration-300">
            <h3 className="text-xl font-bold font-serif-display text-[#12372A] mb-6 border-b border-[#e8e4d9]/45 pb-3 flex items-center gap-2">
              <User className="w-5 h-5 text-[#a1825b]" />
              Doctor Profile Details
            </h3>

            <form onSubmit={updateProfile} className="space-y-5">

              {/* Row 1: Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                    <input
                      type="text"
                      required
                      placeholder="Dr. Admin"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="email"
                      readOnly
                      placeholder="doctor@ayurmedi.com"
                      value={profile.email}
                      className="w-full bg-[#f2efe6]/40 border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-zinc-500 focus:outline-none cursor-not-allowed"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Phone & Specialization */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={profile.phone}
                      onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                      className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                    Medical Specialization
                  </label>
                  <div className="relative">
                    <Activity className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                    <input
                      type="text"
                      placeholder="BAMS - Panchakarma Specialist"
                      value={profile.specialization}
                      onChange={(e) => setProfile({ ...profile, specialization: e.target.value })}
                      className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Clinic Address */}
              <div>
                <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                  Clinic Location / Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-4 w-4 h-4 text-[#8a9988]" />
                  <textarea
                    placeholder="123 Ayurveda Marg, Healing Hills, Kerala"
                    rows={2}
                    value={profile.clinicAddress}
                    onChange={(e) => setProfile({ ...profile, clinicAddress: e.target.value })}
                    className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                  />
                </div>
              </div>

              {/* Row 4: Bio */}
              <div>
                <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                  Doctor Bio / Description
                </label>
                <div className="relative">
                  <FileText className="absolute left-3.5 top-4 w-4 h-4 text-[#8a9988]" />
                  <textarea
                    placeholder="Briefly describe your years of experience, treatments you specialize in, and your medical philosophy..."
                    rows={4}
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                  />
                </div>
              </div>

              {/* Update messages */}
              {status === "success" && (
                <div className="p-4 rounded-2xl text-xs font-bold bg-[#f3f6ee] text-emerald-800 border border-[#c1d0b5]/25 shadow-sm">
                  Profile updated successfully!
                </div>
              )}
              {status === "error" && (
                <div className="p-4 rounded-2xl text-xs font-bold bg-[#fff5f5] text-red-700 border border-red-200">
                  Failed to update profile settings. Please try again.
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
                      <span>Saving profile...</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 text-[#C5A880]" />
                      <span>Save Changes</span>
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
