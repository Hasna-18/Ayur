"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        if (!res.ok) throw new Error("Failed to fetch appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  if (appointments.length === 0)
    return <p className="text-muted-foreground">No appointments found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {appointments.map((a) => (
        <Card key={a.id} className="bg-muted/20 border border-muted/40">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Appointment with {a.doctorName || "Dr. Priya Menon"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p><span className="font-medium">Date:</span> {a.date}</p>
            <p><span className="font-medium">Time:</span> {a.time}</p>
            <p><span className="font-medium">Name:</span> {a.name}</p>
            <p><span className="font-medium">Email:</span> {a.email}</p>
            {a.message && (
              <p className="mt-2 text-sm text-muted-foreground">
                {a.message}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
