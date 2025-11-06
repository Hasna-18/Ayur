"use client";

import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

export default function UpcomingAppointments() {
  const [upcoming, setUpcoming] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/appointments/upcoming")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch upcoming appointments");
        return res.json();
      })
      .then(setUpcoming)
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error loading appointments: {error}
      </div>
    );
  }

  if (!upcoming) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        Loading upcoming appointments...
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <CalendarDays className="text-emerald-400" /> Upcoming Appointments
      </h1>

      {upcoming.count === 0 ? (
        <p className="text-muted-foreground">No upcoming appointments found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.nextAppointments?.map((appt) => (
            <Card
              key={appt.id}
              className="bg-emerald-950/30 border border-emerald-800/40 hover:border-emerald-700/50"
            >
              <CardHeader>
                <CardTitle>{appt.patientName}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  Time:{" "}
                  <span className="text-emerald-400 font-medium">
                    {new Date(appt.startAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
                <p>Status: {appt.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
