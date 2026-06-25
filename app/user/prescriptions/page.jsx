"use client";

import { useEffect, useState } from "react";
import {
  FileText,
  Calendar,
  User,
  Sparkles,
  Download,
  AlertCircle,
  FileImage,
  Heart,
  Pill,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Leaf
} from "lucide-react";
import { GiLotus, GiHerbsBundle } from "react-icons/gi";
import { Button } from "@/components/ui/button";

export default function UserPrescriptions() {
  const [reports, setReports] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("ayur_reports");
      return cached ? JSON.parse(cached) : [];
    }
    return [];
  });
  const [loading, setLoading] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("ayur_reports");
      return cached ? false : true;
    }
    return true;
  });
  const [error, setError] = useState("");
  const [expandedReport, setExpandedReport] = useState(() => {
    if (typeof window !== "undefined") {
      const cached = sessionStorage.getItem("ayur_reports");
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (parsed.length > 0) return parsed[0].id;
        } catch (e) {}
      }
    }
    return null;
  });

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/user/reports");
        if (!res.ok) {
          throw new Error("Failed to load your prescriptions");
        }
        const data = await res.json();
        setReports(data);
        sessionStorage.setItem("ayur_reports", JSON.stringify(data));
        if (data.length > 0) {
          setExpandedReport(data[0].id); // Expand the latest one by default
        }
      } catch (err) {
        console.error(err);
        setError(err.message || "An error occurred while fetching reports.");
      } finally {
        setLoading(false);
      }
    }
    fetchReports();
  }, []);

  const toggleExpand = (id) => {
    if (expandedReport === id) {
      setExpandedReport(null);
    } else {
      setExpandedReport(id);
    }
  };

  const isImageFile = (fileName) => {
    if (!fileName) return false;
    return /\.(jpg|jpeg|png|webp|gif)$/i.test(fileName);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f0e6] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#12372A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#12372A] font-semibold">Loading your prescriptions & plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f0e6] py-16 px-4 sm:px-6 lg:px-8 bg-[url('/user/prescription.png')] bg-cover bg-center bg-no-repeat text-[#3e4a3d]">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
      `}} />

      <div className="max-w-5xl mx-auto flex flex-col gap-8">

        {/* HEADER */}
        <div className="bg-[#faf8f5]/90 border border-[#e8e4d9] rounded-[30px] p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm backdrop-blur-sm">
          <div className="text-center md:text-left">
            <span className="text-[#a1825b] text-xs font-bold uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 mb-2">
              <Leaf className="w-3.5 h-3.5 text-[#a1825b]" />
              Wellness Recommendations
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif-display text-[#12372A] flex items-center justify-center md:justify-start gap-2">
              My Prescriptions & Plans
              <GiLotus className="w-7 h-7 text-[#a1825b]" />
            </h1>
            <p className="text-[#6b7a68] mt-2 text-sm sm:text-base font-medium">
              View historical reports, natural prescriptions, and diet/lifestyle recommendations sent by your doctor.
            </p>
          </div>
          <div className="bg-[#e2ebe4] text-[#3c5e48] border border-[#c1d0b5] rounded-full px-4 py-2 text-xs font-bold flex items-center gap-1.5 shadow-sm self-center md:self-auto flex-shrink-0">
            <Leaf className="w-3.5 h-3.5 rotate-[-45deg] text-[#3c5e48]" />
            <span>{reports.length} Reports Found</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-600" />
            <p className="font-semibold text-sm">{error}</p>
          </div>
        )}

        {reports.length === 0 ? (
          <div className="bg-[#faf8f5]/90 border border-[#e8e4d9] rounded-[30px] shadow-sm p-12 text-center backdrop-blur-sm">
            <div className="w-16 h-16 bg-[#e2ebe4] text-[#3e4a3d] border border-[#c1d0b5]/50 rounded-full flex items-center justify-center mx-auto mb-6 flex-shrink-0">
              <FileText className="w-7 h-7 text-[#3c5e48]" />
            </div>
            <h3 className="text-2xl font-serif-display text-[#12372A] font-bold">No Prescriptions Yet</h3>
            <p className="text-[#6b7a68] max-w-lg mx-auto mt-3 text-sm font-medium leading-relaxed">
              Consultation reports and plans will appear here after you have a meeting or when your doctor issues recommendations.
            </p>
            <a href="/user/book" className="mt-8 inline-block">
              <Button className="bg-[#12372A] hover:bg-[#1C3524] text-white rounded-full px-8 py-5 flex items-center gap-2 shadow-sm text-sm font-semibold border border-transparent hover:border-[#FAF8F5]/10 cursor-pointer">
                <Leaf className="w-4 h-4 text-[#C5A880] fill-current" />
                Book Consultation
              </Button>
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map((report) => {
              const isExpanded = expandedReport === report.id;
              const hasFile = !!report.fileUrl;

              return (
                <div
                  key={report.id}
                  className="bg-[#faf8f5]/95 border border-[#e8e4d9] rounded-[30px] shadow-sm overflow-hidden transition-all duration-300"
                >
                  {/* Summary Bar (Clickable header) */}
                  <div
                    onClick={() => toggleExpand(report.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#f5f0e1]/30 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#e8e4d9]/60 border border-[#d1ccbd]/30 flex items-center justify-center flex-shrink-0 text-xl text-[#5a7258]">
                        <Leaf className="w-6 h-6 text-[#5a7258]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-[#12372A] font-serif-display">
                            Consultation Summary
                          </h3>
                          <span className="text-xs text-[#6b7a68] bg-[#e8e4d9]/50 border border-[#d1ccbd]/30 px-2 py-0.5 rounded-full font-semibold">
                            ID: #{report.id}
                          </span>
                        </div>
                        <div className="flex gap-x-4 gap-y-1 mt-1.5 text-xs text-[#6b7a68] flex-wrap font-medium">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-[#5a7258]" />
                            {new Date(report.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5 text-[#5a7258]" />
                            By: {report.doctorName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-[#e8e4d9]/60">
                      {hasFile && (
                        <span className="text-xs text-[#a1825b] bg-[#f4eae1]/80 border border-[#e5dfce] px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-sm">
                          <FileText className="w-3 h-3" />
                          Attachment
                        </span>
                      )}

                      <button className="text-[#12372A] hover:bg-slate-100 p-1.5 bg-white rounded-full border border-[#e8e4d9] shadow-sm transition-colors cursor-pointer">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#e8e4d9]/60 bg-white/40">
                      <div className="grid md:grid-cols-3 gap-6 mt-4">

                        {/* 1. Prescribed Medicines */}
                        <div className="bg-[#faf8f5]/65 p-5 rounded-2xl border border-[#e8e4d9]">
                          <h4 className="font-serif-display font-bold text-[#12372A] flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4d9]/60">
                            <Pill className="w-4 h-4 text-[#a1825b]" />
                            Medicines & Dosage
                          </h4>
                          {report.medicines ? (
                            <p className="text-[#4a5a4b] text-sm whitespace-pre-line leading-relaxed font-medium">
                              {report.medicines}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic text-xs">No specific medicines prescribed.</p>
                          )}
                        </div>

                        {/* 2. Wellness Plans */}
                        <div className="bg-[#faf8f5]/65 p-5 rounded-2xl border border-[#e8e4d9]">
                          <h4 className="font-serif-display font-bold text-[#12372A] flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4d9]/60">
                            <BookOpen className="w-4 h-4 text-[#a1825b]" />
                            Treatment & Diet Plans
                          </h4>
                          {report.plans ? (
                            <p className="text-[#4a5a4b] text-sm whitespace-pre-line leading-relaxed font-medium">
                              {report.plans}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic text-xs">No specific diet/lifestyle plans provided.</p>
                          )}
                        </div>

                        {/* 3. Daily Tips */}
                        <div className="bg-[#faf8f5]/65 p-5 rounded-2xl border border-[#e8e4d9]">
                          <h4 className="font-serif-display font-bold text-[#12372A] flex items-center gap-2 mb-3 pb-2 border-b border-[#e8e4d9]/60">
                            <Heart className="w-4 h-4 text-[#a1825b]" />
                            Daily Wellness Tips
                          </h4>
                          {report.tips ? (
                            <p className="text-[#4a5a4b] text-sm whitespace-pre-line leading-relaxed font-medium">
                              {report.tips}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic text-xs">No wellness tips listed in this report.</p>
                          )}
                        </div>

                      </div>

                      {/* Attachment Section */}
                      {hasFile && (
                        <div className="mt-6 p-4 bg-[#e2ebe4]/40 rounded-2xl border border-[#c1d0b5]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#a1825b] shadow-sm border border-[#e8e4d9] flex-shrink-0">
                              {isImageFile(report.fileName) ? (
                                <FileImage className="w-5 h-5" />
                              ) : (
                                <FileText className="w-5 h-5" />
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-bold text-[#12372A] truncate max-w-xs sm:max-w-md">
                                {report.fileName}
                              </p>
                              <p className="text-xs text-[#6b7a68] font-medium mt-0.5">
                                Doctor's Consultation Attachment
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-3 w-full sm:w-auto justify-end">
                            {isImageFile(report.fileName) && (
                              <a
                                href={report.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs bg-white text-[#12372A] hover:bg-slate-50 px-4 py-2 rounded-xl font-bold border border-[#e8e4d9] shadow-sm flex items-center gap-1.5 cursor-pointer"
                              >
                                View Image
                              </a>
                            )}
                            <a
                              href={report.fileUrl}
                              download={report.fileName}
                              className="text-xs bg-[#12372A] hover:bg-[#1C3524] text-white px-4 py-2 rounded-xl font-bold shadow-sm flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-3.5 h-3.5" />
                              Download File
                            </a>
                          </div>
                        </div>
                      )}

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
