"use client";

import { signUp, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    // Validate inputs
    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      setLoading(false);
      return;
    }

    try {
      console.log("🔐 Attempting admin registration for:", email);

      // Sign up with better-auth
      const result = await signUp.email({
        email,
        password,
        name,
      });

      console.log("✅ Sign-up response:", JSON.stringify(result, null, 2));

      if (result.error) {
        const errorMsg = result.error.message || JSON.stringify(result.error) || "Registration failed";
        console.error("❌ Sign-up error details:", result.error);
        console.error("❌ Full error response:", result);
        setError(errorMsg);
        setLoading(false);
        return;
      }

      if (!result.data || !result.data.user) {
        console.error("❌ No user data in sign-up response:", result);
        setError("Sign-up failed: No user data returned");
        setLoading(false);
        return;
      }

      console.log("👤 User created:", result.data.user);

      // Wait for session to be established
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update user role to ADMIN
      console.log("🔄 Updating user role to ADMIN...");
      const updateResponse = await fetch("/api/admin/update-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, role: "ADMIN" }),
      });

      const updateData = await updateResponse.json();
      console.log("📋 Update response:", updateData);

      if (!updateResponse.ok) {
        console.error("❌ Failed to update user role:", updateData.error);
        setError(`Registration successful but role update failed: ${updateData.error}`);
        setLoading(false);
        return;
      }

      // Verify the session
      const { data: session } = await authClient.getSession();
      console.log("📋 Current session after registration:", session);

      setSuccess("Admin registration successful! Redirecting...");
      console.log("✅ Admin registration complete, redirecting...");
      
      setTimeout(() => {
        router.push("/admin");
      }, 1500);
    } catch (err) {
      console.error("❌ Registration exception:", err);
      setError(err.message || "Registration failed. Please try again.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans flex items-center justify-center py-12 px-4 select-none">
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
      
      {/* BOTTOM RIGHT GOLD MANDALA DECORATION */}
      <div className="absolute bottom-0 right-0 opacity-[0.08] pointer-events-none mix-blend-multiply w-[360px] md:w-[480px] h-[360px] md:h-[480px] z-0 select-none translate-x-[15%] translate-y-[15%]">
        <Image src="/g1.png" alt="Mandala Decoration" layout="fill" objectFit="contain" />
      </div>

      <div className="absolute -bottom-16 -right-16 opacity-[0.75] pointer-events-none mix-blend-multiply rotate-[45deg] w-[260px] md:w-[320px] h-[260px] md:h-[320px] z-0 select-none">
        <Image src="/l13.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-md relative z-10">
        <Card className="w-full p-8 md:p-10 shadow-[0_15px_35px_rgba(43,58,47,0.03)] border border-[#e8e4d9]/85 bg-white/95 backdrop-blur-sm rounded-[32px] border-t-[8px] border-t-[#12372A]">
          
          {/* Header section with lotus */}
          <div className="flex flex-col items-center mb-8 text-center">
            <div className="w-14 h-14 bg-[#eef3e5] border border-[#c1d0b5]/50 rounded-2xl flex items-center justify-center shadow-sm mb-3">
              <GiLotus className="w-9 h-9 text-[#C5A880]" />
            </div>
            
            <p className="font-hand text-3xl text-emerald-800 font-medium leading-none mb-1">
              Practitioner Portal
            </p>
            <h1 className="text-3xl font-bold font-serif-display text-[#12372A] tracking-tight">
              Create Account
            </h1>
            <div className="w-12 h-[2px] bg-[#a1825b] mt-2.5" />
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                <input
                  type="text"
                  placeholder="Dr. John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                <input
                  type="email"
                  placeholder="admin@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-4 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-10 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a9988] hover:text-[#12372A] focus:outline-none"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  disabled={loading}
                  className="w-full bg-white border border-[#e8e4d9] rounded-2xl pl-10 pr-10 py-2.5 text-sm text-[#12372A] placeholder-[#8a9988] focus:outline-none focus:ring-1 focus:ring-[#12372A] shadow-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8a9988] hover:text-[#12372A] focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-700 px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed">
                {error}
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="bg-[#f3f6ee] border border-[#c1d0b5]/25 text-emerald-800 px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed">
                {success}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12372A] hover:bg-[#1a4335] text-white rounded-2xl py-6 flex items-center justify-center gap-2 shadow-md transition-all duration-300 font-semibold border-none cursor-pointer text-sm mt-2"
            >
              {loading ? "Registering..." : "Register as Admin"}
            </Button>

            {/* Navigation back to login */}
            <div className="text-center text-xs font-bold text-[#6b7a68] mt-4 select-none">
              Already have an account?{" "}
              <Link href="/admin/login" className="text-[#a1825b] hover:text-[#12372A] underline transition-colors ml-1">
                Login here
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

