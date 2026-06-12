"use client";

import { signUp, authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800">
      <Card className="w-full max-w-md p-8 shadow-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-center mb-2">Admin Registration</h1>
          <p className="text-center text-sm text-gray-400">Create a new admin account</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

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

          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-2">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="At least 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
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

          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative mt-2">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-500 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register as Admin"}
          </Button>

          <div className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <Link href="/admin/login" className="text-blue-500 hover:text-blue-400">
              Login here
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
