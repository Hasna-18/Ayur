"use client";
import { useEffect, useState } from "react";

export default function CancelledMissedList() {
  const [cancelled, setCancelled] = useState([]);
  const [missed, setMissed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/admin/appointments/cancelled-missed");

        // Handle empty body safely
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        setCancelled(data.cancelled || []);
        setMissed(data.missed || []);
      } catch (err) {
        console.error("Load error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-10">

      {/* CANCELLED */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Cancelled Appointments</h2>
        {cancelled.length === 0 ? (
          <p>No cancelled appointments.</p>
        ) : (
          cancelled.map(a => (
            <div key={a.id} className="border p-3 rounded mb-2">
              <p><strong>{a.name}</strong></p>
              <p>Date: {a.date}</p>
              <p>Time: {a.time}</p>
            </div>
          ))
        )}
      </div>

      {/* MISSED */}
      <div>
        <h2 className="text-2xl font-bold mb-3">Missed Appointments</h2>
        {missed.length === 0 ? (
          <p>No missed appointments.</p>
        ) : (
          missed.map(a => (
            <div key={a.id} className="border p-3 rounded mb-2">
              <p><strong>{a.name}</strong></p>
              <p>Date: {a.date}</p>
              <p>Time: {a.time}</p>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
