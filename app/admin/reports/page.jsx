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
import Image from "next/image";
import { GiLotus } from "react-icons/gi";
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
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-12 h-12 text-[#12372A] animate-spin" />
          <p className="text-[#12372A] font-semibold">Loading reports history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#12372A] relative overflow-hidden font-sans pb-24 pt-10 px-4 md:px-8 select-none">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      {/* BACKGROUND DECORATIVE LEAVES */}
      <div className="absolute top-0 left-0 opacity-[0.85] pointer-events-none mix-blend-multiply w-[280px] md:w-[360px] h-[280px] md:h-[360px] z-0 select-none">
        <Image src="/l11.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute top-0 right-0 opacity-[0.85] pointer-events-none mix-blend-multiply rotate-[90deg] w-[280px] md:w-[360px] h-[280px] md:h-[360px] z-0 select-none">
        <Image src="/l12.png" alt="Leaf Decoration" layout="fill" objectFit="contain" />
      </div>
      <div className="absolute bottom-0 right-0 opacity-[0.12] pointer-events-none mix-blend-multiply w-[360px] md:w-[480px] h-[360px] md:h-[480px] z-0 select-none translate-x-[15%] translate-y-[15%]">
        <Image src="/g1.png" alt="Mandala Decoration" layout="fill" objectFit="contain" />
      </div>

      <div className="max-w-5xl mx-auto flex flex-col gap-8 relative z-20">
        
        {/* HERO HEADER CARD */}
        <div className="bg-white rounded-[32px] border border-[#e8e4d9]/85 p-6 md:p-10 shadow-[0_15px_35px_rgba(43,58,47,0.02)] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden border-t-[8px] border-t-[#12372A]">
          <div className="flex items-start gap-4 flex-1">
            <Link href="/admin" className="mt-1">
              <Button size="icon" variant="outline" className="border-[#e8e4d9] text-[#12372A] bg-white hover:bg-[#FAF8F5] rounded-xl shadow-xs transition cursor-pointer">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-800 font-bold uppercase tracking-wider bg-[#eef3e5] border border-[#c1d0b5]/50 rounded-full px-3 py-1 w-fit">
                <LeafIcon className="w-3.5 h-3.5" />
                <span>Consultation Records</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold font-serif-display text-[#12372A] tracking-tight mt-2 flex items-center gap-2">
                Consultation Reports
                <Sparkles className="w-5 h-5 text-amber-500" />
              </h2>
              <p className="text-[#6b7a68] text-sm mt-1.5 font-medium leading-relaxed max-w-xl">
                Prescribe medicines, outline wellness plans, and send files to patients.
              </p>
            </div>
          </div>

          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-[#12372A] hover:bg-[#1a4335] text-white flex items-center gap-2 rounded-xl px-5 py-4 shadow-sm font-semibold border-none cursor-pointer w-full md:w-auto justify-center"
          >
            <Plus className="w-4 h-4" />
            Send New Report
          </Button>
        </div>

        {/* SEARCH AND FILTERS */}
        <div className="relative w-full shadow-sm rounded-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6b7a68] w-5 h-5" />
          <input
            type="text"
            placeholder="Search reports by patient name, email or doctor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white border border-[#e8e4d9] rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-[#12372A] hover:border-[#12372A]/40 transition-colors placeholder-zinc-400 text-[#12372A] font-semibold"
          />
        </div>

        {/* REPORTS LIST */}
        {filteredReports.length === 0 ? (
          <div className="bg-white border border-[#e8e4d9] rounded-[32px] p-12 text-center shadow-xs">
            <GiLotus className="w-16 h-16 text-[#c2bba8] mx-auto mb-4 animate-pulse" />
            <h3 className="text-xl font-bold font-serif-display text-[#12372A]">No Reports Found</h3>
            <p className="text-[#6b7a68] mt-2 max-w-md mx-auto text-sm font-medium">
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
                  className="bg-white border border-[#e8e4d9] rounded-2xl overflow-hidden transition-all shadow-sm hover:shadow-md"
                >
                  {/* Summary Bar */}
                  <div 
                    onClick={() => toggleExpand(report.id)}
                    className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 cursor-pointer hover:bg-[#FAF8F5]/60 transition-colors text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#e2ebe4] flex items-center justify-center text-[#12372A] font-bold border border-[#c1d0b5]/20 flex-shrink-0">
                        <FileText className="w-5.5 h-5.5 text-[#12372A]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#12372A] text-base leading-tight">
                          {report.patientName}
                        </h3>
                        <p className="text-xs text-[#6b7a68] font-medium mt-1">
                          {report.patientEmail}
                        </p>
                        <div className="flex gap-x-4 gap-y-1 mt-2 text-[11px] text-[#6b7a68] flex-wrap font-medium">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#a1825b]" />
                            {new Date(report.createdAt).toLocaleString([], {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </span>
                          <span className="flex items-center gap-1 bg-[#f4f1e8] px-2 py-0.5 rounded text-[#12372A]">
                            Doctor: {report.doctorName}
                          </span>
                          {report.appointmentId && (
                            <span className="text-emerald-800 font-bold">Appt ID: #{report.appointmentId}</span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:w-auto gap-4 border-t md:border-t-0 border-[#e8e4d9]/60 pt-3 md:pt-0">
                      {report.fileName ? (
                        <span className="text-[10px] bg-[#fff9eb] text-amber-800 border border-amber-300/40 px-3 py-1 rounded-full flex items-center gap-1 font-bold uppercase tracking-wider">
                          <Paperclip className="w-3 h-3 text-[#a1825b]" />
                          Attachment
                        </span>
                      ) : (
                        <span />
                      )}
                      <div className="flex items-center gap-1 text-sm font-semibold text-[#12372A]">
                        <span className="hidden sm:inline text-xs text-[#6b7a68]">{isExpanded ? "Collapse" : "Expand"}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="p-6 border-t border-[#e8e4d9]/70 bg-[#faf8f5]/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                      
                      {/* Prescribed Medicines */}
                      <div className="bg-white border border-[#e8e4d9]/80 p-5 rounded-2xl shadow-xs">
                        <h4 className="text-[#12372A] font-bold text-sm flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4d9]/50">
                          <Pill className="w-4 h-4 text-emerald-700" />
                          Medicines Prescribed
                        </h4>
                        <p className="text-[#3e4a3d] text-xs font-semibold whitespace-pre-line leading-relaxed">
                          {report.medicines || "No medicines listed."}
                        </p>
                      </div>

                      {/* Wellness Plans */}
                      <div className="bg-white border border-[#e8e4d9]/80 p-5 rounded-2xl shadow-xs">
                        <h4 className="text-[#12372A] font-bold text-sm flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4d9]/50">
                          <BookOpen className="w-4 h-4 text-[#a1825b]" />
                          Treatment / Diet Plan
                        </h4>
                        <p className="text-[#3e4a3d] text-xs font-semibold whitespace-pre-line leading-relaxed">
                          {report.plans || "No plans listed."}
                        </p>
                      </div>

                      {/* Daily Tips */}
                      <div className="bg-white border border-[#e8e4d9]/80 p-5 rounded-2xl shadow-xs">
                        <h4 className="text-[#12372A] font-bold text-sm flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4d9]/50">
                          <Heart className="w-4 h-4 text-[#C5A880]" />
                          Wellness Tips
                        </h4>
                        <p className="text-[#3e4a3d] text-xs font-semibold whitespace-pre-line leading-relaxed">
                          {report.tips || "No tips listed."}
                        </p>
                      </div>

                      {/* File attachment */}
                      {report.fileUrl && (
                        <div className="md:col-span-3 mt-1 p-4 bg-white border border-[#e8e4d9] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                          <div className="flex items-center gap-3 text-xs text-[#3e4a3d] font-bold">
                            <span className="text-xl">📁</span>
                            <span className="truncate max-w-xs md:max-w-lg">{report.fileName}</span>
                          </div>
                          <a 
                            href={report.fileUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-xs text-[#12372A] hover:underline font-bold bg-[#e2ebe4] px-4 py-2 rounded-xl border border-[#c1d0b5]/50 flex items-center gap-1 w-full sm:w-auto justify-center"
                          >
                            View / Download File <span className="text-[10px]">↗</span>
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
          <DialogContent className="w-[95vw] sm:w-full max-w-2xl bg-[#faf8f5] border border-[#e8e4d9] text-[#12372A] rounded-[32px] overflow-y-auto max-h-[95vh] p-6 sm:p-8 font-sans transition-all">
            <DialogHeader className="border-b border-[#e8e4d9] pb-4 text-left">
              <DialogTitle className="text-2xl font-bold font-serif-display text-[#12372A] flex items-center gap-2">
                Create & Send Prescription
                <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 pt-4 text-left">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#12372A]">Patient Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. John Doe"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full bg-white border border-[#e8e4d9] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-zinc-400/80 focus:outline-none focus:ring-1 focus:ring-[#12372A] hover:border-[#12372A]/40 transition-colors font-semibold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-[#12372A]">Patient Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. patient@gmail.com"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="w-full bg-white border border-[#e8e4d9] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-zinc-400/80 focus:outline-none focus:ring-1 focus:ring-[#12372A] hover:border-[#12372A]/40 transition-colors font-semibold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#12372A]">Medicines & Dosages (Text, 1 per line)</label>
                <textarea
                  placeholder="e.g. Ashwagandha Tablet - 1 after breakfast&#10;Triphala Churna - 1 tsp with warm water before bed"
                  value={medicines}
                  onChange={(e) => setMedicines(e.target.value)}
                  rows={4}
                  className="w-full bg-white border border-[#e8e4d9] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-zinc-400/80 focus:outline-none focus:ring-1 focus:ring-[#12372A] hover:border-[#12372A]/40 transition-colors font-semibold whitespace-pre-wrap"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#12372A]">Diet / Treatment / Lifestyle Plans</label>
                <textarea
                  placeholder="e.g. Drink warm ginger tea in the morning. Avoid cold food and drinks. Perform oil massage before bath."
                  value={plans}
                  onChange={(e) => setPlans(e.target.value)}
                  rows={3}
                  className="w-full bg-white border border-[#e8e4d9] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-zinc-400/80 focus:outline-none focus:ring-1 focus:ring-[#12372A] hover:border-[#12372A]/40 transition-colors font-semibold"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-[#12372A]">Daily Wellness Tips</label>
                <textarea
                  placeholder="e.g. Sleep by 10 PM. Wake up early for meditation. Stay active throughout the day."
                  value={tips}
                  onChange={(e) => setTips(e.target.value)}
                  rows={2}
                  className="w-full bg-white border border-[#e8e4d9] rounded-xl px-4 py-2.5 text-sm text-[#12372A] placeholder-zinc-400/80 focus:outline-none focus:ring-1 focus:ring-[#12372A] hover:border-[#12372A]/40 transition-colors font-semibold"
                />
              </div>

              <div className="border border-dashed border-[#e8e4d9] rounded-2xl p-4 bg-white shadow-xs">
                <label className="block text-xs font-bold text-[#12372A] mb-2">Upload PDF Document or Image Attachment</label>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <div className="relative cursor-pointer bg-[#e2ebe4] hover:bg-[#d5e0d7] text-[#12372A] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border border-[#c1d0b5]/50">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File</span>
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => setFile(e.target.files[0] || null)}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                  <span className="text-xs text-[#6b7a68] truncate max-w-xs font-semibold">
                    {file ? file.name : "No file chosen (PDF & Images supported)"}
                  </span>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[#e8e4d9]">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="border-[#e8e4d9] text-[#6b7a68] hover:bg-zinc-50 rounded-xl"
                  disabled={submitting}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#12372A] hover:bg-[#1C3524] text-white rounded-xl min-w-[100px] border-none font-bold"
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

// Decorative leaf logo helper
const LeafIcon = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 3.5 0 9.5a7 7 0 0 1-8 8.5z" />
    <path d="M19 2v0" />
    <path d="M9 22v-3" />
  </svg>
);
