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
import { useRouter } from "next/navigation";
import {signIn} from "better-auth/react";

export default function SignupPage() {
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [confirmpassword,setConfirmpassword] = useState("");
    const [error,setError] = useState("");
    const [loading,setLoading] = useState("");

    const handleSubmit = async (e) => {
  e.preventDefault();
  if (password !== confirmpassword) {
    setError("Passwords do not match");
    return;
  }

  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || "Signup failed");
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
        <Button variant="outline" className="w-full" onClick={() => signIn("google")}>
          Signup with Google
        </Button>
        <CardTitle>Signup</CardTitle>
        <CardDescription>
          Create a new account to get started
        </CardDescription>
        

      </CardHeader>
      <CardContent>
        
        <form>
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
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
               <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center">
                <Label htmlFor="confirmpassword">confirm password</Label>
              </div>
              <Input
                id="confirmpassword"
                type="password"
                required
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" onClick={handleSubmit}>
          Signup
        </Button>
        
      </CardFooter>

      <CardAction>
          <Button variant="link">
            <Link href="/login">Already have an account?</Link>
          </Button>
        </CardAction>
    </Card>
    
</div>
  )
}