"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { google, github, email } from "better-auth";
import { createAuthClient } from "better-auth/react";

export default function SignupPage() {
    const auth = createAuthClient();
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {

    
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    
    if (!res.ok) {
      setError(data.error || "Login failed");
    } else {
      router.push("/login");
    }
  } catch (error) {
    setError("Something went wrong");
  }
};

    
    return( 
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <Button
          variant="outline"
          className="w-full"
          onClick={() => auth.signIn.social({ provider: "google" })}
        >
          Signin with Google
        </Button>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Login in to your accounnt
        </CardDescription>
        

      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
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
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
          </div>

          <CardFooter className="flex-col gap-2 mt-4">
            <Button type="submit" className="w-full">
              Login
            </Button>
          </CardFooter>
        </form>

      </CardContent>

      <CardAction>
          <Button variant="link">
            <Link href="/signup">Don't have an account?</Link>
          </Button>
        </CardAction>
    </Card>
    
</div>
  )
}