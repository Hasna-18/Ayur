"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Dashboard({user}) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome {user?.name || "user"}</h1>
      <p className="text-muted-foreground">
        Manage your appointments and connect with your doctor easily.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button asChild><Link href="/user/book">Book Appointment</Link></Button>
        <Button asChild variant="outline"><Link href="/user/appointments">View My Appointments</Link></Button>
        <Button asChild variant="ghost"><Link href="/user/about">About</Link></Button>
      </div>
    </div>
  );
}
