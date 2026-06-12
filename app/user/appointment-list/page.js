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
        const res = await fetch("/api/user/appointments", {
          method: "GET",
          credentials: "include",
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

      // success: update state to CANCELLED locally
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "CANCELLED" } : item
        )
      );
    } catch (err) {
      console.error("Cancel Error (network):", err);
      alert("Network error while cancelling. Check console.");
    }
  };
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-5xl font-serif font-bold text-[#77e0adff]">
          My Appointments
        </h1>

        <p className="mt-3 text-gray-600">
          View and manage all your booked appointments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Total Appointments</p>
          <h2 className="text-4xl font-bold text-[#0B5D3B]">
            {appointments.length}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Upcoming</p>
          <h2 className="text-4xl font-bold text-green-600">
            {
              appointments.filter(
                (a) => a.status === "SCHEDULED" && new Date(a.time) >= new Date()
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Completed</p>
          <h2 className="text-4xl font-bold text-amber-600">
            {
              appointments.filter(
                (a) => a.status === "COMPLETED" || (a.status === "SCHEDULED" && new Date(a.time) < new Date())
              ).length
            }
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow">
          <p className="text-gray-500">Cancelled</p>
          <h2 className="text-4xl font-bold text-red-600">
            {
              appointments.filter(
                (a) => a.status === "CANCELLED"
              ).length
            }
          </h2>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[30px] shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F6EF] text-black">
              <tr>
                <th className="text-left p-5">
                  Date & Time
                </th>

                <th className="text-left p-5">
                  Reason
                </th>

                <th className="text-left p-5">
                  Patient
                </th>

                <th className="text-left p-5">
                  Status
                </th>

                <th className="text-left p-5">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((a) => (
                <tr
                  key={a.id}
                  className="border-t text-black"
                >
                  <td className="p-5">
                    <div className="font-semibold">
                      {new Date(a.date).toLocaleDateString([], {
                        timeZone: "UTC",
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>

                    <div className="text-sm text-gray-500">
                      {new Date(a.time).toLocaleTimeString([], {
                        timeZone: "UTC",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true
                      })}
                    </div>
                  </td>

                  <td className="p-5">
                    {a.message || "-"}
                  </td>

                  <td className="p-5">
                    <div>
                      <div className="font-medium">
                        {a.name}
                      </div>

                      <div className="text-sm text-gray-500">
                        {a.email}
                      </div>
                    </div>
                  </td>

                  <td className="p-5">
                    {a.status === "SCHEDULED" && (
                      <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        Scheduled
                      </span>
                    )}
                    {a.status === "COMPLETED" && (
                      <span className="px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium">
                        Completed
                      </span>
                    )}
                    {a.status === "CANCELLED" && (
                      <span className="px-4 py-2 rounded-full bg-red-100 text-red-700 text-sm font-medium">
                        Cancelled
                      </span>
                    )}
                  </td>

                  <td className="p-5">
                    {a.status === "SCHEDULED" ? (
                      <Button
                        onClick={() =>
                          cancelAppointment(a.id)
                        }
                        className="bg-red-600 hover:bg-red-700 text-white font-medium"
                      >
                        Cancel
                      </Button>
                    ) : (
                      <span className="text-gray-400 font-medium">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );

}
