"use client";

import { useEffect, useState } from "react";
import { 
  FileText, 
  Calendar, 
  User, 
  Sparkles, 
  ArrowRight,
  Download,
  AlertCircle,
  FileImage,
  Layers,
  Heart,
  Pill,
  BookOpen,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { GiLotus, GiHerbsBundle } from "react-icons/gi";

export default function UserPrescriptions() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedReport, setExpandedReport] = useState(null);

  useEffect(() => {
    async function fetchReports() {
      try {
        const res = await fetch("/api/user/reports");
        if (!res.ok) {
          throw new Error("Failed to load your prescriptions");
        }
        const data = await res.json();
        setReports(data);
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
          <div className="w-12 h-12 border-4 border-[#0b5d3b] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-[#0b5d3b] font-medium">Loading your prescriptions & plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f0e6] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* HEADER */}
        <div className="bg-[#faf8f1] rounded-[30px] shadow-md p-6 sm:p-8 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-[#e5dfce]">
          <div>
            <span className="text-[#d9b56d] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1.5">
              <Sparkles className="w-4 h-4 text-[#d9b56d]" />
              Wellness Recommendations
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold font-serif text-[#1c5135] flex items-center gap-2">
              My Prescriptions & Plans
              <GiLotus className="w-8 h-8 text-[#d9b56d]" />
            </h1>
            <p className="text-gray-600 mt-1.5 text-sm sm:text-base">
              View historical reports, natural prescriptions, and diet/lifestyle recommendations sent by your doctor.
            </p>
          </div>
          <div className="bg-[#0b5d3b]/10 text-[#0b5d3b] px-4 py-2.5 rounded-2xl flex items-center gap-2 border border-[#0b5d3b]/25">
            <GiHerbsBundle className="w-5 h-5" />
            <span className="text-sm font-semibold">{reports.length} Reports Found</span>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-2xl flex items-center gap-3 mb-6 shadow-sm">
            <AlertCircle className="w-6 h-6 flex-shrink-0 text-red-600" />
            <p className="font-medium text-sm">{error}</p>
          </div>
        )}

        {reports.length === 0 ? (
          <div className="bg-[#faf8f1] rounded-[40px] shadow-lg p-12 text-center border border-[#e5dfce]">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100">
              <FileText className="w-10 h-10 text-emerald-700" />
            </div>
            <h3 className="text-2xl font-serif text-[#173a2b] font-semibold">No Prescriptions Yet</h3>
            <p className="text-gray-600 max-w-md mx-auto mt-3">
              Consultation reports and plans will appear here after you have a meeting or when your doctor issues recommendations.
            </p>
            <a href="/user/book">
              <button className="mt-8 bg-[#0b5d3b] text-white px-8 py-3 rounded-full hover:bg-[#0a4a30] transition font-medium shadow-md">
                Book Consultation
              </button>
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
                  className="bg-[#faf8f1] rounded-[30px] shadow-md hover:shadow-lg transition-all duration-300 border border-[#e5dfce] overflow-hidden"
                >
                  {/* Summary Bar (Clickable header) */}
                  <div 
                    onClick={() => toggleExpand(report.id)}
                    className="p-6 cursor-pointer flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-[#fcfbf7] transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center flex-shrink-0 text-emerald-700 font-bold">
                        🌿
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-bold text-[#1c5135] font-serif">
                            Consultation Summary
                          </h3>
                          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            ID: #{report.id}
                          </span>
                        </div>
                        <div className="flex gap-x-4 gap-y-1 mt-1.5 text-xs text-gray-500 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {new Date(report.createdAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <User className="w-3.5 h-3.5" />
                            By: {report.doctorName}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                      {hasFile && (
                        <span className="text-xs text-amber-600 bg-amber-50 border border-amber-100 px-3 py-1 rounded-full font-medium flex items-center gap-1">
                          <FileText className="w-3 h-3" />
                          Attachment
                        </span>
                      )}
                      
                      <button className="text-gray-500 hover:text-emerald-700 p-1 bg-white rounded-full border border-gray-100 shadow-sm transition">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Expanded details */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-[#e5dfce] bg-white/50">
                      <div className="grid md:grid-cols-3 gap-6 mt-4">
                        
                        {/* 1. Prescribed Medicines */}
                        <div className="bg-[#faf8f1] p-5 rounded-2xl border border-[#e5dfce]">
                          <h4 className="font-serif font-semibold text-[#1c5135] flex items-center gap-2 mb-3 pb-2 border-b border-[#e5dfce]/60">
                            <Pill className="w-4 h-4 text-emerald-600" />
                            Medicines & Dosage
                          </h4>
                          {report.medicines ? (
                            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                              {report.medicines}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic text-xs">No specific medicines prescribed.</p>
                          )}
                        </div>

                        {/* 2. Wellness Plans */}
                        <div className="bg-[#faf8f1] p-5 rounded-2xl border border-[#e5dfce]">
                          <h4 className="font-serif font-semibold text-[#1c5135] flex items-center gap-2 mb-3 pb-2 border-b border-[#e5dfce]/60">
                            <BookOpen className="w-4 h-4 text-emerald-600" />
                            Treatment & Diet Plans
                          </h4>
                          {report.plans ? (
                            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                              {report.plans}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic text-xs">No specific diet/lifestyle plans provided.</p>
                          )}
                        </div>

                        {/* 3. Daily Tips */}
                        <div className="bg-[#faf8f1] p-5 rounded-2xl border border-[#e5dfce]">
                          <h4 className="font-serif font-semibold text-[#1c5135] flex items-center gap-2 mb-3 pb-2 border-b border-[#e5dfce]/60">
                            <Heart className="w-4 h-4 text-emerald-600" />
                            Daily Wellness Tips
                          </h4>
                          {report.tips ? (
                            <p className="text-gray-700 text-sm whitespace-pre-line leading-relaxed">
                              {report.tips}
                            </p>
                          ) : (
                            <p className="text-gray-400 italic text-xs">No wellness tips listed in this report.</p>
                          )}
                        </div>

                      </div>

                      {/* Attachment Section */}
                      {hasFile && (
                        <div className="mt-6 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-amber-600 shadow-sm border border-emerald-100">
                              {isImageFile(report.fileName) ? (
                                <FileImage className="w-5 h-5" />
                              ) : (
                                <FileText className="w-5 h-5" />
                              )}
                            </div>
                            <div className="text-left">
                              <p className="text-sm font-semibold text-[#1c5135] truncate max-w-xs sm:max-w-md">
                                {report.fileName}
                              </p>
                              <p className="text-xs text-gray-500">
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
                                className="text-xs bg-white text-emerald-700 hover:bg-emerald-50 px-4 py-2 rounded-xl font-medium border border-emerald-200 shadow-sm flex items-center gap-1.5"
                              >
                                View Image
                              </a>
                            )}
                            <a 
                              href={report.fileUrl}
                              download={report.fileName}
                              className="text-xs bg-[#0b5d3b] hover:bg-[#0a4a30] text-white px-4 py-2 rounded-xl font-medium shadow-sm flex items-center gap-1.5"
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
