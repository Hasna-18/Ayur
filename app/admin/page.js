"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarDays, Users, Settings, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function AdminDashboard() {
  const [profile, setProfile] = useState({
    name: "",
    specialization: "",
    clinicAddress: "",
    avatar: "",
  });

  const [stats, setStats] = useState({
    upcomingCount: 0,
    nextAppointment: null,
    totalPatients: 0,
    cancelledCount: 0,
  });

  useEffect(() => {
    loadProfile();
    loadStats();
  }, []);

  async function loadProfile() {
    try {
      const res = await fetch("/api/admin/profile");
      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      setProfile({
        name: data.name || "Doctor",
        specialization: data.specialization || "",
        clinicAddress: data.clinicAddress || "",
        avatar: data.avatar || "",
      });
    } catch (err) {
      console.error("Profile load error:", err);
    }
  }

  async function loadStats() {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Stats load error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-background text-white">

      {/* NAVBAR */}
      <nav className="w-full border-b border-emerald-800/40 bg-emerald-950/20 backdrop-blur-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-emerald-400">Dr. Admin Portal</h1>
          <Button variant="outline" className="border-emerald-700/50">Logout</Button>
        </div>
      </nav>

      {/* HERO */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center gap-8">

          {/* TEXT */}
          <div className="flex-1">
            <h2 className="text-4xl font-bold mb-2">
              Welcome, {profile.name}
            </h2>

            {profile.specialization && (
              <p className="text-muted-foreground mb-1">
                Specialization: {profile.specialization}
              </p>
            )}

            {profile.clinicAddress && (
              <p className="text-muted-foreground mb-4">
                Clinic: {profile.clinicAddress}
              </p>
            )}

            <div className="flex gap-4">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Link href="/admin/appointments">View Appointments</Link>
              </Button>

              <Button variant="outline" className="border-emerald-700/40">
                <Link href="/admin/availability">Manage Availability</Link>
              </Button>
            </div>
          </div>

          {/* AVATAR */}
          <div className="flex-1 flex justify-center">
            <Image
              src={profile.avatar || "/profile.jpeg"}
              alt="Doctor Avatar"
              width={220}
              height={220}
              className="rounded-full border-2 border-emerald-600 shadow-lg object-cover"
            />
          </div>
        </div>
      </section>

      {/* DASHBOARD CARDS */}
      <section className="container mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* UPCOMING APPOINTMENTS */}
          <Link href="/admin/appointments/upcoming">
            <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md transition-all">
              <CardHeader className="flex items-center gap-3">
                <CalendarDays className="text-emerald-400" />
                <CardTitle>Upcoming Appointments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats.upcomingCount}</p>

                <p className="text-sm text-muted-foreground mt-1">
                  {stats.nextAppointment
                    ? `Next: ${new Date(stats.nextAppointment.time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })} with ${stats.nextAppointment.patient}`
                    : "No upcoming"}
                </p>
              </CardContent>
            </Card>
          </Link>

          {/* TOTAL PATIENTS */}
          <Link href="/admin/patients">
            <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md transition-all">
              <CardHeader className="flex items-center gap-3">
                <Users className="text-emerald-400" />
                <CardTitle>Total Patients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats.totalPatients}</p>
                <p className="text-sm text-muted-foreground">Unique patients</p>
              </CardContent>
            </Card>
          </Link>

          {/* CANCELLED / MISSED */}
          <Link href="/admin/cancelled-list">
            <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md transition-all">
              <CardHeader className="flex items-center gap-3">
                <Clock className="text-emerald-400" />
                <CardTitle>Cancelled / Missed</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold">{stats.cancelledCount}</p>
                <p className="text-sm text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </Link>

          {/* SETTINGS */}
          <Link href="/admin/profile">
            <Card className="bg-emerald-950/30 border-emerald-800/30 hover:shadow-md transition-all">
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
          </Link>

        </div>
      </section>
    </div>
  );
}
