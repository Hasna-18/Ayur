"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Settings, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-background text-white">
      {/* Navbar */}
      <nav className="w-full border-b border-emerald-800/40 bg-emerald-950/20 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-emerald-400">
            Dr. Admin Portal
          </h1>
          <Button variant="outline" className="border-emerald-700/50">
            Logout
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-2">Welcome, Dr. Sharma</h2>
            <p className="text-muted-foreground mb-4">
              Here’s an overview of your consultation schedule and activities.
            </p>
            <div className="flex gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/admin/appointments">View Appointments</Link>
              </Button>
              <Button variant="outline" className="border-emerald-700/40">
                <Link href="admin/availability">Manage Availability</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <Image
              src="data:image/jpeg;base64,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"
              alt="Doctor Avatar"
              width={220}
              height={220}
              className="rounded-full border-2 border-emerald-600 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md hover:border-emerald-700/50 transition-all">
            <Link href="/admin/appointments/upcoming">
            <CardHeader className="flex items-center gap-3">
              <CalendarDays className="text-emerald-400" />
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">12</p>
              <p className="text-sm text-muted-foreground">
                Next: 10:30 AM with John Doe
              </p>
            </CardContent>
            </Link>
          </Card>

          <Link href="/admin/patients">
          <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md hover:border-emerald-700/50 transition-all">
            <CardHeader className="flex items-center gap-3">
              <Users className="text-emerald-400" />
              <CardTitle>Total Patients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">128</p>
              <p className="text-sm text-muted-foreground">
                +4 new this week
              </p>
            </CardContent>
          </Card>
          </Link>

          <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md hover:border-emerald-700/50 transition-all">
            <CardHeader className="flex items-center gap-3">
              <Clock className="text-emerald-400" />
              <CardTitle>Cancelled / Missed</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold">3</p>
              <p className="text-sm text-muted-foreground">This month</p>
            </CardContent>
          </Card>

          <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md hover:border-emerald-700/50 transition-all">
            <CardHeader className="flex items-center gap-3">
              <Settings className="text-emerald-400" />
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <Button size="sm" variant="outline" className="border-emerald-700/40">
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
