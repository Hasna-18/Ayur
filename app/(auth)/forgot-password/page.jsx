"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";

export default function Forgotpassword() {
  const auth = createAuthClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // ✅ added

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        body: JSON.stringify({ email }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Resending failed");
      } else {
        setSuccess(true); // ✅ show success card
        setTimeout(() => router.push("/login"), 2000); // optional redirect
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Reset Password</CardTitle>
          <CardDescription>You will receive a link in your Gmail</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}> {/* ✅ attach submit here */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send Link"}
              </Button>
            </div>
          </form>

          {/* ✅ success message card */}
          {success && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded-xl shadow text-center">
              ✅ Email sent successfully!
            </div>
          )}

          {/* ❌ error message */}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-xl shadow text-center">
              ❌ {error}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button variant="link">
            <Link href="/login">Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
