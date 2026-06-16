"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, EyeOff, Eye, Leaf, Users, ShieldCheck, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

import { Button } from "@/components/ui/button";
import { authClient, signIn } from "@/lib/auth-client";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // BetterAuth signup — handles DB + session + cookies automatically
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      if (result?.error) {
        setError(result.error.message);
      } else {
        router.push("/user/dashboard");
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[url('/login/login4.png')] bg-no-repeat bg-cover bg-right overflow-hidden flex items-center justify-center px-4">
      <div className="w-full max-w-[600px] flex flex-col items-center justify-center py-12 relative z-50 mx-auto">
        <Card className="w-full max-w-[520px] border border-gray-50 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[20px] overflow-hidden">
          <CardContent className="p-8 sm:p-10">

            {/* LOGO */}
            <div className="flex justify-center mb-6">
              <Image
                src="/login/login3.png"
                alt="Asyur Logo"
                width={140}
                height={140}
                className="object-contain"
              />
            </div>

            <Button
              variant="outline"
              type="button"
              className="w-full h-11 rounded-lg mb-6 border-gray-200 text-gray-700 font-medium hover:bg-gray-50 flex items-center justify-center gap-2 shadow-sm"
              onClick={() =>
                signIn.social({
                  provider: "google",
                  callbackURL: "/user/dashboard",
                })
              }
            >
              <FcGoogle className="w-5 h-5" />
              Sign up with Google
            </Button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-3 text-gray-500">or</span>
              </div>
            </div>

            <div className="mb-6">
              <h1 className="text-[22px] font-serif text-[#2b5336] mb-1 text-center md:text-left">
                Create an account
              </h1>
              <p className="text-[13px] text-gray-500 text-center md:text-left">
                Sign up to get started
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-gray-700">Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-11 pl-10 rounded-lg border-gray-200 focus-visible:ring-[#2b5336] text-sm text-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-gray-700">Email</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 pl-10 rounded-lg border-gray-200 focus-visible:ring-[#2b5336] text-sm text-black"
                  />
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-gray-700">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pl-10 pr-10 rounded-lg border-gray-200 focus-visible:ring-[#2b5336] text-sm text-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <Label className="text-xs font-semibold text-gray-700">Confirm Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-gray-400" />
                  </div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-11 pl-10 pr-10 rounded-lg border-gray-200 focus-visible:ring-[#2b5336] text-sm text-black"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-11 rounded-lg bg-[#2b5336] hover:bg-[#1f3c27] text-white mt-2 font-medium"
              >
                {loading ? "Creating account..." : "Sign Up"}
              </Button>

              {error && (
                <p className="text-red-500 text-sm text-center mt-2">
                  {error}
                </p>
              )}
            </form>

            <div className="text-center mt-6 text-[13px]">
              <span className="text-gray-500">Already have an account? </span>
              <Link
                href="/login"
                className="text-[#2b5336] font-semibold hover:underline"
              >
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* STATS - OUTSIDE CARD */}
        <div className="flex flex-nowrap items-center justify-between gap-x-4 mt-8 text-xs w-full max-w-[520px] mx-auto px-2">
          <div className="flex items-center gap-2">
            <Leaf className="w-5 h-5 text-[#2b5336]" strokeWidth={1.5} />
            <div className="text-left">
              <p className="font-semibold text-gray-900 leading-tight">Holistic Healing</p>
              <p className="text-gray-500 text-[10px]">Since 2010</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#2b5336]" strokeWidth={1.5} />
            <div className="text-left">
              <p className="font-semibold text-gray-900 leading-tight">500+</p>
              <p className="text-gray-500 text-[10px]">Happy Patients</p>
            </div>
          </div>

          <div className="hidden sm:block w-px h-8 bg-gray-300"></div>

          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#2b5336]" strokeWidth={1.5} />
            <div className="text-left">
              <p className="font-semibold text-gray-900 leading-tight">Trusted</p>
              <p className="text-gray-500 text-[10px]">by thousands</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
