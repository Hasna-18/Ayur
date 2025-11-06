"use client";
import { useEffect, useState } from "react";

export default function AdminAvailability() {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/availability");
        if (!res.ok) throw new Error("API returned " + res.status);
        const data = await res.json();
        console.log("Fetched slots:", data);
        setSlots(Array.isArray(data) ? data : []); // prevent map error
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="p-8 text-white">Loading...</p>;
  if (error) return <p className="p-8 text-red-400">Error: {error}</p>;

  if (slots.length === 0)
    return <p className="p-8 text-gray-400">No availability slots yet.</p>;

  return (
    <div className="p-8 text-white">
      <h1 className="text-3xl mb-6">Availability</h1>
      <table className="w-full border border-emerald-800/30">
        <thead className="bg-emerald-950/40 text-emerald-400">
          <tr>
            <th className="p-2 text-left">Start Time</th>
            <th className="p-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {slots.map((s) => (
            <tr key={s.id} className="border-t border-emerald-800/30">
              <td className="p-2">{new Date(s.startTime).toLocaleString()}</td>
              <td className="p-2">{s.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
