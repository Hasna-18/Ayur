"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/user/appointments",{
          method:"GET",
          credentials:"include",
        });
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

const cancelAppointment = async (id) => {
  try {
    // optimistic UI: remove visually immediately (optional)
    // setAppointments(prev => prev.filter(item => item.id !== id));

    const res = await fetch(`/api/user/appointments/${id}`, {
      method: "DELETE",
      credentials: "include",
    });

    const text = await res.text();
    let body;
    try { body = JSON.parse(text); } catch (e) { body = { raw: text } }

    if (!res.ok) {
      console.error("Cancel failed status:", res.status, "body:", body);
      // show the server message to user (but not internal errors in production)
      alert(body?.error || body?.message || "Failed to cancel appointment");
      return;
    }

    // success: remove from UI
    setAppointments((prev) => prev.filter((item) => item.id !== id));
  } catch (err) {
    console.error("Cancel Error (network):", err);
    alert("Network error while cancelling. Check console.");
  }
};


  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {appointments.map((a) => (
        <Card key={a.id} className="bg-muted/20 border border-muted/40">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Appointment with { "Dr. Priya Menon"}
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
            <Button className="bg-red-700 text-white" onClick={() => cancelAppointment(a.id)}>Cancel</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
