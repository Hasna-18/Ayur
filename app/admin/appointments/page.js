"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JitsiMeeting from "@/components/jitsi-meeting";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch("/api/admin/appointments");
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

  const handleStatus = async (id, action) => {
    try {
      await fetch(`/api/admin/appointments/${id}/${action}`, {
        method: "POST",
      });

      setAppointments((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status:
                  action === "cancel"
                    ? "CANCELLED"
                    : action === "done"
                    ? "COMPLETED"
                    : item.status,
              }
            : item
        )
      );
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  const canJoinCall = (appointment) => {
    return appointment.status === "SCHEDULED" && appointment.jitsiRoom && !appointment.meetingExpired;
  };

  const handleJoinCall = (appointment) => {
    if (canJoinCall(appointment)) {
      setActiveCall(appointment);
    } else if (appointment.meetingExpired) {
      alert("The meeting code has expired for this appointment.");
    } else {
      alert("Video call not available for this appointment yet.");
    }
  };

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
              <th className="px-6 py-3 text-left">Video Call</th>
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
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.message || "-"}</td>
                <td className="px-6 py-4">
                  {user.jitsiRoom ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleJoinCall(user)}
                          disabled={!canJoinCall(user)}
                          className={`text-sm font-medium ${canJoinCall(user) ? "text-emerald-400 underline hover:text-emerald-300" : "text-zinc-500 cursor-not-allowed"}`}
                        >
                          Join Call
                        </button>
                        {!user.meetingExpired && (
                          <a
                            href={`https://meet.jit.si/${user.jitsiRoom}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-400 hover:underline"
                          >
                            Direct Link ↗
                          </a>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400">
                        Code: {user.jitsiRoom}{user.meetingExpired ? " (expired)" : ""}
                      </p>
                    </div>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      user.status === "SCHEDULED"
                        ? "bg-emerald-700/30 text-emerald-300"
                        : user.status === "CANCELLED"
                        ? "bg-red-700/30 text-red-300"
                        : user.status === "COMPLETED"
                        ? "bg-blue-700/30 text-blue-300"
                        : "bg-gray-700/40 text-gray-300"
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <button
                    onClick={() => handleStatus(user.id, "cancel")}
                    className="text-sm px-3 py-1 bg-red-700/40 rounded hover:bg-red-700/60"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleStatus(user.id, "done")}
                    className="text-sm px-3 py-1 bg-emerald-700/40 rounded hover:bg-emerald-700/60"
                  >
                    Done
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Jitsi Video Call Modal */}
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
                userName="Doctor"
                onClose={() => setActiveCall(null)}
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
