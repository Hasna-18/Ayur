"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JitsiMeeting from "@/components/jitsi-meeting";
import { Loader2, Sparkles, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCall, setActiveCall] = useState(null);

  // Report Form States
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [tips, setTips] = useState("");
  const [plans, setPlans] = useState("");
  const [medicines, setMedicines] = useState("");
  const [file, setFile] = useState(null);
  const [submittingReport, setSubmittingReport] = useState(false);

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

  const handleSendReport = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) return;

    setSubmittingReport(true);
    try {
      const formData = new FormData();
      formData.append("appointmentId", selectedAppointment.id);
      formData.append("patientEmail", selectedAppointment.email);
      formData.append("patientName", selectedAppointment.name);
      formData.append("tips", tips);
      formData.append("plans", plans);
      formData.append("medicines", medicines);
      if (file) {
        formData.append("file", file);
      }

      const res = await fetch("/api/admin/reports", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to send report");
      }

      alert("Consultation report sent successfully!");
      setIsReportOpen(false);
      
      // Reset form
      setTips("");
      setPlans("");
      setMedicines("");
      setFile(null);

      // Update status in local state
      setAppointments((prev) =>
        prev.map((item) =>
          item.id === selectedAppointment.id ? { ...item, status: "COMPLETED" } : item
        )
      );
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to submit report");
    } finally {
      setSubmittingReport(false);
    }
  };

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

  if (loading) return <p className="p-8 text-white">Loading appointments...</p>;

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-3xl font-semibold text-emerald-400">Appointments</h1>
        <div className="flex gap-3">
          <a href="/admin">
            <Button variant="outline" className="border-emerald-800/40 text-emerald-300 hover:bg-emerald-950/20">
              ← Dashboard
            </Button>
          </a>
          <a href="/admin/reports">
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
              Reports & Prescriptions
            </Button>
          </a>
        </div>
      </div>

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
                <td className="px-6 py-4 flex gap-2 flex-wrap">
                  <button
                    onClick={() => handleStatus(user.id, "cancel")}
                    className="text-xs px-2.5 py-1 bg-red-700/40 rounded hover:bg-red-700/60 font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => handleStatus(user.id, "done")}
                    className="text-xs px-2.5 py-1 bg-emerald-700/40 rounded hover:bg-emerald-700/60 font-medium"
                  >
                    Done
                  </button>

                  <button
                    onClick={() => {
                      setSelectedAppointment(user);
                      setIsReportOpen(true);
                    }}
                    className="text-xs px-2.5 py-1 bg-amber-600/60 hover:bg-amber-600/80 rounded text-white font-medium"
                  >
                    Send Report
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

      {/* Send Report Modal */}
      <Dialog open={isReportOpen} onOpenChange={setIsReportOpen}>
        <DialogContent className="max-w-2xl bg-zinc-950 border border-emerald-800/40 text-white rounded-2xl overflow-y-auto max-h-[90vh]">
          <DialogHeader className="border-b border-emerald-800/20 pb-4">
            <DialogTitle className="text-xl font-bold text-emerald-400 flex items-center gap-2">
              Send Prescription & Tips to {selectedAppointment?.name}
              <Sparkles className="w-4 h-4 text-amber-400" />
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSendReport} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Patient Name</label>
                <input
                  type="text"
                  readOnly
                  value={selectedAppointment?.name || ""}
                  className="w-full bg-emerald-950/10 border border-emerald-800/20 rounded-xl px-3 py-2 text-sm text-zinc-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Patient Email</label>
                <input
                  type="email"
                  readOnly
                  value={selectedAppointment?.email || ""}
                  className="w-full bg-emerald-950/10 border border-emerald-800/20 rounded-xl px-3 py-2 text-sm text-zinc-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Medicines & Dosages (1 per line)</label>
              <textarea
                placeholder="e.g. Ashwagandha Tablet - 1 after breakfast&#10;Triphala Churna - 1 tsp with warm water before bed"
                value={medicines}
                onChange={(e) => setMedicines(e.target.value)}
                rows={4}
                className="w-full bg-emerald-950/20 border border-emerald-800/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 whitespace-pre-wrap"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Diet / Treatment / Lifestyle Plans</label>
              <textarea
                placeholder="e.g. Drink warm ginger tea in the morning. Avoid cold food and drinks. Perform oil massage before bath."
                value={plans}
                onChange={(e) => setPlans(e.target.value)}
                rows={3}
                className="w-full bg-emerald-950/20 border border-emerald-800/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Daily Wellness Tips</label>
              <textarea
                placeholder="e.g. Sleep by 10 PM. Wake up early for meditation. Stay active throughout the day."
                value={tips}
                onChange={(e) => setTips(e.target.value)}
                rows={2}
                className="w-full bg-emerald-950/20 border border-emerald-800/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div className="border border-dashed border-emerald-800/30 rounded-xl p-4 bg-emerald-950/10">
              <label className="block text-xs font-semibold text-zinc-400 mb-2">Upload PDF Document or Image Attachment</label>
              <div className="flex items-center gap-3">
                <div className="relative cursor-pointer bg-emerald-900/30 hover:bg-emerald-900/40 text-emerald-400 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose File</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    onChange={(e) => setFile(e.target.files[0] || null)}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                </div>
                <span className="text-xs text-zinc-400 truncate max-w-xs">
                  {file ? file.name : "No file chosen (Support PDF & Images)"}
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-emerald-800/20">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsReportOpen(false)}
                className="border-emerald-800/30 text-zinc-400 hover:text-white"
                disabled={submittingReport}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={submittingReport}
                className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[100px]"
              >
                {submittingReport ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Sending...
                  </div>
                ) : "Send Report"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
