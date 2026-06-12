"use client";

import { signIn, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";


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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Admin Login</h1>
          <p className="text-center text-sm text-gray-400">Enter your credentials</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <Input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

<div className="grid gap-2">
  <Label htmlFor="password">Password</Label>

  <div className="relative">
    <Input
      id="password"
      type={showPassword ? "text" : "password"}
      required
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>

          <div className="text-center text-sm text-gray-400 mt-4">
            Don't have an account?{" "}
            <Link href="/admin/register" className="text-blue-500 hover:text-blue-400">
              Register here
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
