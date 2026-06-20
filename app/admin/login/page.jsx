"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { GiLotus } from "react-icons/gi";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      console.log("🔐 Attempting login for:", email);
      
      const result = await signIn.email({
        email,
        password
      });

      console.log("✅ Sign-in response:", result);

      if (result.error) {
        const errorMsg = result.error.message || "Invalid credentials";
        console.error("❌ Sign-in error:", errorMsg);
        setError(errorMsg);
        setLoading(false);
        return;
      }

      // Wait a moment for session to be established
      await new Promise(resolve => setTimeout(resolve, 500));

      // Fetch full user data including role from the new endpoint
      console.log("📡 Fetching full user data from /api/auth/get-user...");
      const userResponse = await fetch("/api/auth/get-user");
      
      if (!userResponse.ok) {
        console.error("❌ Failed to fetch user data:", userResponse.status);
        setError("Failed to fetch user data. Please try again.");
        setLoading(false);
        return;
      }

      const userData = await userResponse.json();
      console.log("👤 Full user data:", userData);

      if (!userData?.user) {
        console.error("❌ No user data returned");
        setError("User data not found.");
        setLoading(false);
        return;
      }

      const userRole = userData.user.role;
      console.log("🔍 User role from database:", userRole);

      if (userRole !== "ADMIN") {
        console.error("❌ User role is not ADMIN:", userRole);
        setError(`Access denied. User role is ${userRole || 'UNKNOWN'}, only ADMIN allowed.`);
        setLoading(false);
        return;
      }

      console.log("✅ Admin login successful, redirecting to /admin...");
      
      // Don't set loading to false - let it stay true during redirect
      // This prevents any re-renders from interrupting the navigation
      await new Promise(resolve => setTimeout(resolve, 100));
      router.push("/admin");
    } catch (err) {
      console.error("❌ Login exception:", err);
      setError(err.message || "Login failed. Please try again.");
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
              Welcome Back
            </h1>
            <div className="w-12 h-[2px] bg-[#a1825b] mt-2.5" />
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold text-[#6b7a68] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8a9988]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-700 px-4 py-3 rounded-2xl text-xs font-semibold leading-relaxed">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#12372A] hover:bg-[#1a4335] text-white rounded-2xl py-6 flex items-center justify-center gap-2 shadow-md transition-all duration-300 font-semibold border-none cursor-pointer text-sm"
            >
              {loading ? "Logging in..." : "Login to Portal"}
            </Button>

            {/* Navigation to register */}
            <div className="text-center text-xs font-bold text-[#6b7a68] mt-4 select-none">
              Don't have an account?{" "}
              <Link href="/admin/register" className="text-[#a1825b] hover:text-[#12372A] underline transition-colors ml-1">
                Register here
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}

