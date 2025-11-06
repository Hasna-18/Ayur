"use client";
import { useEffect, useState } from "react";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/appointments");
        const data = await res.json();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <p className="p-8 text-white">Loading appointments...</p>;

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <h1 className="text-3xl font-semibold mb-6">Appointments</h1>

      <div className="overflow-x-auto rounded-lg border border-emerald-800/30">
        <table className="min-w-full border-collapse text-sm">
          <thead className="bg-emerald-950/40 text-emerald-400 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Patient</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Reason</th>
              <th className="px-6 py-3 text-left">Meet Link</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-emerald-800/40">
            {appointments.map((user) => (
              <tr key={user.id} className="hover:bg-emerald-900/20 transition">
                <td className="px-6 py-4">
                  {new Date(user.time).toLocaleString()}
                </td>
                <td className="px-6 py-4">{user.patientName}</td>
                <td className="px-6 py-4">{user.patientEmail}</td>
                <td className="px-6 py-4">{user.reason || "-"}</td>
                <td className="px-6 py-4">
                  {user.meetLink ? (
                    <a
                      href={user.meetLink}
                      target="_blank"
                      className="text-emerald-400 underline hover:text-emerald-300"
                    >
                      Join
                    </a>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "Scheduled"
                        ? "bg-emerald-700/30 text-emerald-300"
                        : user.status === "Cancelled"
                        ? "bg-red-700/30 text-red-300"
                        : "bg-gray-700/40 text-gray-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button className="text-sm px-3 py-1 bg-red-700/40 rounded hover:bg-red-700/60">
                    Cancel
                  </button>
                  <button className="text-sm px-3 py-1 bg-emerald-700/40 rounded hover:bg-emerald-700/60">
                    Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
