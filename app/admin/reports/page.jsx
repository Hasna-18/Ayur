"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Calendar, 
  User, 
  Mail, 
  Sparkles, 
  Upload,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  Pill,
  BookOpen,
  Heart,
  Loader2,
  Paperclip
} from "lucide-react";
import Link from "next/link";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Form fields
  const [patientEmail, setPatientEmail] = useState("");
  const [patientName, setPatientName] = useState("");
  const [tips, setTips] = useState("");
  const [plans, setPlans] = useState("");
  const [medicines, setMedicines] = useState("");
  const [file, setFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [expandedReport, setExpandedReport] = useState(null);

  useEffect(() => {
    async function loadReports() {
      try {
        const res = await fetch("/api/admin/reports");
        if (!res.ok) throw new Error("Failed to load reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Load reports error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!patientEmail) return alert("Patient email is required");

    setSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("patientEmail", patientEmail);
      formData.append("patientName", patientName);
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
        throw new Error(errorData.error || "Failed to save report");
      }

      const result = await res.json();
      alert("Consultation report sent successfully!");
      
      // Update local state
      setReports((prev) => [result.report, ...prev]);

      // Reset form
      setIsModalOpen(false);
      setPatientEmail("");
      setPatientName("");
      setTips("");
      setPlans("");
      setMedicines("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to submit report");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredReports = reports.filter((r) => {
    const term = search.toLowerCase();
    return (
      r.patientEmail.toLowerCase().includes(term) ||
      r.patientName.toLowerCase().includes(term) ||
      r.doctorName.toLowerCase().includes(term)
    );
  });

  const toggleExpand = (id) => {
    setExpandedReport((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
          <p className="text-zinc-400 font-medium">Loading reports history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white p-6 sm:p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* TOP NAVBAR */}
        <div className="flex items-center justify-between mb-8 pb-6 border-b border-emerald-950/40">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button size="icon" variant="outline" className="border-emerald-800/40 bg-emerald-950/20 text-emerald-400 hover:bg-emerald-900/40">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
                Consultation Reports
                <Sparkles className="w-5 h-5 text-amber-400" />
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Prescribe medicines, outline wellness plans, and send files to patients.
              </p>
            </div>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2 rounded-xl"
          >
            <Plus className="w-4 h-4" />
            Send New Report
          </Button>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search reports by patient name, email or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-emerald-950/20 border border-emerald-800/30 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 placeholder-zinc-500 text-white"
          />
        </div>

        {/* REPORTS LIST */}
        {filteredReports.length === 0 ? (
          <div className="bg-emerald-950/10 border border-emerald-800/20 rounded-[30px] p-12 text-center">
            <FileText className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-300">No Reports Found</h3>
            <p className="text-zinc-500 mt-2 max-w-md mx-auto">
              No consultation reports match your criteria. Click "Send New Report" to issue a new report or prescription.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredReports.map((report) => {
              const isExpanded = expandedReport === report.id;
              return (
                <div 
                  key={report.id}
                  className="bg-emerald-950/20 border border-emerald-800/20 hover:border-emerald-800/40 rounded-2xl overflow-hidden transition-all"
                >
                  {/* Summary Bar */}
                  <div 
                    onClick={() => toggleExpand(report.id)}
                    className="p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 cursor-pointer hover:bg-emerald-950/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-900/30 flex items-center justify-center text-emerald-400 font-bold">
                        📄
                      </div>
                      <div>
                        <h3 className="font-semibold text-emerald-300">
                          {report.patientName} ({report.patientEmail})
                        </h3>
                        <div className="flex gap-x-4 gap-y-1 mt-1 text-xs text-zinc-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-zinc-600" />
                            {new Date(report.createdAt).toLocaleString()}
                          </span>
                          <span>Doctor: {report.doctorName}</span>
                          {report.appointmentId && (
                            <span className="text-emerald-500">Appt ID: #{report.appointmentId}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {report.fileName && (
                        <span className="text-[11px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full flex items-center gap-1 font-medium">
                          <Paperclip className="w-3 h-3" />
                          Attachment
                        </span>
                      )}
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6 border-t border-emerald-800/20 bg-emerald-950/10 grid md:grid-cols-3 gap-6">
                      
                      {/* Prescribed Medicines */}
                      <div className="bg-emerald-950/30 border border-emerald-800/25 p-4 rounded-xl">
                        <h4 className="text-emerald-400 font-semibold text-sm flex items-center gap-2 mb-2 pb-1.5 border-b border-emerald-800/20">
                          <Pill className="w-4 h-4" />
                          Medicines Prescribed
                        </h4>
                        <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed">
                          {report.medicines || "No medicines listed."}
                        </p>
                      </div>

                      {/* Wellness Plans */}
                      <div className="bg-emerald-950/30 border border-emerald-800/25 p-4 rounded-xl">
                        <h4 className="text-emerald-400 font-semibold text-sm flex items-center gap-2 mb-2 pb-1.5 border-b border-emerald-800/20">
                          <BookOpen className="w-4 h-4" />
                          Treatment / Diet Plan
                        </h4>
                        <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed">
                          {report.plans || "No plans listed."}
                        </p>
                      </div>

                      {/* Daily Tips */}
                      <div className="bg-emerald-950/30 border border-emerald-800/25 p-4 rounded-xl">
                        <h4 className="text-emerald-400 font-semibold text-sm flex items-center gap-2 mb-2 pb-1.5 border-b border-emerald-800/20">
                          <Heart className="w-4 h-4" />
                          Wellness Tips
                        </h4>
                        <p className="text-zinc-300 text-sm whitespace-pre-line leading-relaxed">
                          {report.tips || "No tips listed."}
                        </p>
                      </div>

                      {/* File attachment */}
                      {report.fileUrl && (
                        <div className="md:col-span-3 mt-2 p-3 bg-emerald-900/20 border border-emerald-800/30 rounded-xl flex items-center justify-between gap-4">
                          <div className="flex items-center gap-2 text-sm text-zinc-300">
                            <span className="text-emerald-400 text-lg">📁</span>
                            <span className="font-medium truncate max-w-lg">{report.fileName}</span>
                          </div>
                          <a 
                            href={report.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-emerald-400 underline hover:text-emerald-300 font-medium"
                          >
                            View / Download File ↗
                          </a>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* DIALOG FOR SENDING NEW REPORT */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl bg-zinc-950 border border-emerald-800/40 text-white rounded-2xl overflow-y-auto max-h-[90vh]">
            <DialogHeader className="border-b border-emerald-800/20 pb-4">
              <DialogTitle className="text-xl font-bold text-emerald-400 flex items-center gap-2">
                Create & Send Prescription Report
                <Sparkles className="w-4 h-4 text-amber-400" />
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-emerald-950/20 border border-emerald-800/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1">Patient Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. patient@gmail.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-emerald-950/20 border border-emerald-800/30 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1">Medicines & Dosages (Text, 1 per line)</label>
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
                  onClick={() => setIsModalOpen(false)}
                  className="border-emerald-800/30 text-zinc-400 hover:text-white"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white min-w-[100px]"
                >
                  {submitting ? (
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
    </div>
  );
}
