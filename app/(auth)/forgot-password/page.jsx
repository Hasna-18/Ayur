"use client";
import { useState } from "react";
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


export default function LoginPage() {
    const [email,setEmail] = useState("");
    const [error,setError] = useState("");
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);
    
    return( 
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Forgot Password</CardTitle>
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
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "sending....." : "Send Reset Link"}
        </Button>
        
      </CardFooter>

      <CardAction>
          <Button variant="link">
            <Link href="/login">Back to Login</Link>
          </Button>
        </CardAction>
    </Card>
    
</div>
  )
}