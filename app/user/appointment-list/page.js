"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JitsiMeeting from "@/components/jitsi-meeting";

export default function AppointmentList() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState(null);
  const [userName, setUserName] = useState("");

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

        // Get user name from first appointment or from session
        if (data.length > 0) {
          setUserName(data[0].name);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  if (loading) return <p>Loading appointments...</p>;

  const noAppointments = appointments.length === 0;

  const cancelAppointment = async (id) => {
    try {
      const res = await fetch(`/api/user/appointments/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const text = await res.text();
      let body;
      try { body = JSON.parse(text); } catch (e) { body = { raw: text } }

      if (!res.ok) {
        console.error("Cancel failed status:", res.status, "body:", body);
        alert(body?.error || body?.message || "Failed to cancel appointment");
        return;
      }

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

  const isJoinAllowed = (appointment) => {
    return (
      appointment.status === "SCHEDULED" &&
      appointment.jitsiRoom &&
      !appointment.meetingExpired
    );
  };

  const handleJoinCall = (appointment) => {
    if (isJoinAllowed(appointment)) {
      setActiveCall(appointment);
    } else if (appointment.meetingExpired) {
      alert("The meeting code has expired. Please reschedule if needed.");
    } else {
      alert("Video call not available for this appointment yet. Please refresh the page.");
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-emerald-500/20 bg-gradient-to-br from-[#071410] via-[#081a16] to-[#071410] shadow-[0_0_50px_rgba(16,185,129,0.08)]">

      {/* Header */}
      <div className="flex items-center justify-between p-8 border-b border-emerald-500/10">
        <div>
          <h2 className="text-4xl font-bold text-white">
            Appointments
          </h2>

          <p className="text-zinc-400 mt-2">
            View and manage all your scheduled appointments.
          </p>
        </div>

        <a href='/user/book'>
          <Button className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl px-6">
            + New Appointment
          </Button>
        </a>
      </div>


      <div className="overflow-x-auto">
        {noAppointments ? (
          <div className="p-16 text-center text-white/80">
            <p className="text-2xl font-semibold">You have no upcoming appointments.</p>
            <p className="mt-3 text-zinc-400">Book a new appointment to get a Jitsi meeting code.</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-emerald-500/10">

                <th className="text-left p-6 text-emerald-400">
                  TIME
                </th>

                <th className="text-left p-6 text-emerald-400">
                  PATIENT
                </th>

                <th className="text-left p-6 text-emerald-400">
                  EMAIL
                </th>

                <th className="text-left p-6 text-emerald-400">
                  REASON
                </th>

                <th className="text-left p-6 text-emerald-400">
                  STATUS
                </th>

                <th className="text-left p-6 text-emerald-400">
                  ACTION
                </th>

              </tr>
            </thead>

            <tbody>

              {appointments.map((a) => (
                <tr
                  key={a.id}
                  className="border-b border-emerald-500/10 hover:bg-emerald-500/5 transition"
                >
                  {/* Date */}
                  <td className="p-6">
                    <div className="flex items-center gap-4">

                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                        📅
                      </div>

                      <div>
                        <div className="text-emerald-400 font-semibold">
                          {new Date(a.date).toLocaleDateString()}
                        </div>

                        <div className="text-white">
                          {new Date(a.time).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>

                    </div>
                  </td>

                  {/* Patient */}
                  <td className="p-6">
                    <div className="flex items-center gap-3">

                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-600 flex items-center justify-center text-black font-bold">
                        {a.name?.charAt(0)}
                      </div>

                      <div>
                        <p className="font-semibold text-white">
                          {a.name}
                        </p>

                        <p className="text-zinc-400 text-sm">
                          Patient
                        </p>
                      </div>

                    </div>
                  </td>

                  {/* Email */}
                  <td className="p-6 text-zinc-300">
                    {a.email}
                  </td>

                  {/* Reason */}
                  <td className="p-6 text-zinc-300">
                    {a.message || "-"}
                  </td>

                  {/* Status */}
                  <td className="p-6">

                    {a.status === "SCHEDULED" && (
                      <span className="px-4 py-2 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        ● Scheduled
                      </span>
                    )}

                    {a.status === "COMPLETED" && (
                      <span className="px-4 py-2 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/30">
                        ● Completed
                      </span>
                    )}

                    {a.status === "CANCELLED" && (
                      <span className="px-4 py-2 rounded-full bg-red-500/15 text-red-400 border border-red-500/30">
                        ● Cancelled
                      </span>
                    )}

                  </td>

                  {/* Action */}
                  <td className="p-6">
                    <div className="flex flex-col gap-3">
                      {a.status === "SCHEDULED" ? (
                        <div className="flex flex-wrap gap-3 items-center">
                          <Button
                            onClick={() => handleJoinCall(a)}
                            disabled={!isJoinAllowed(a)}
                            className={`bg-transparent border rounded-xl px-4 ${isJoinAllowed(a) ? "border-emerald-500 text-emerald-400 hover:bg-emerald-500/10" : "border-zinc-700 text-zinc-500 cursor-not-allowed opacity-70"}`}
                          >
                            Join
                          </Button>

                          <Button
                            onClick={() => cancelAppointment(a.id)}
                            className="bg-transparent border border-red-500 text-red-400 hover:bg-red-500/10 rounded-xl px-4"
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <span className="text-gray-400 font-medium">-</span>
                      )}

                      {a.jitsiRoom && (
                        <div className="flex flex-col gap-1 text-xs text-zinc-400">
                          <p>
                            Code: {a.jitsiRoom}{a.meetingExpired ? " (expired)" : ""}
                          </p>
                          {!a.meetingExpired && (
                            <a
                              href={`https://meet.jit.si/${a.jitsiRoom}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-emerald-400 hover:underline block"
                            >
                              Direct Link ↗
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>
          </table>
        )}
      </div>

      {!noAppointments && (
        <div className="flex items-center justify-between p-6 border-t border-emerald-500/10">

          <p className="text-zinc-400">
            Showing 1 to {appointments.length} of {appointments.length} appointments
          </p>

          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl bg-white/5 text-white">
              ←
            </button>

            <button className="w-10 h-10 rounded-xl bg-emerald-500 text-black font-bold">
              1
            </button>

            <button className="w-10 h-10 rounded-xl bg-white/5 text-white">
              →
            </button>
          </div>

        </div>
      )}

      <Dialog open={!!activeCall} onOpenChange={(open) => {
        if (!open) setActiveCall(null);
      }}>
        <DialogContent className="w-full max-w-6xl h-[90vh] p-0">
          <DialogHeader className="absolute top-0 left-0 right-0 z-50 bg-black text-white p-4">
            <DialogTitle>
              Video Call - {activeCall?.name}
            </DialogTitle>
          </DialogHeader>
          {activeCall && (
            <div className="mt-12 w-full h-full">
              <JitsiMeeting
                roomName={activeCall.jitsiRoom}
                userName={userName}
                onClose={() => setActiveCall(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );

}
