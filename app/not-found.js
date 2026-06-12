"use client";

import Link from "next/link";
import { Compass, Leaf, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F5F1E8] flex flex-col items-center justify-center px-6 py-12 relative overflow-hidden">
      
      {/* Background Decorative Rings */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full border border-green-800/5 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full border border-green-800/5 translate-x-1/2 translate-y-1/2"></div>
      
      {/* Blur Orbs */}
      <div className="absolute top-1/4 right-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 left-10 w-64 h-64 bg-emerald-200/30 rounded-full blur-3xl"></div>

      <div className="relative z-10 text-center max-w-lg">
        
        {/* Large Aesthetic Illustration Container */}
        <div className="relative flex justify-center mb-8">
          <div className="w-28 h-28 rounded-full bg-[#E9E3D4] flex items-center justify-center shadow-md border border-green-200">
            <Compass className="w-14 h-14 text-emerald-800 animate-spin-slow" style={{ animationDuration: '20s' }} />
          </div>
          
          {/* Floating Leaves */}
          <span className="absolute top-2 right-2 text-2xl animate-bounce">🌿</span>
          <span className="absolute bottom-2 left-2 text-2xl animate-bounce" style={{ animationDelay: '1s' }}>🍃</span>
        </div>

        {/* Heading */}
        <span className="text-sm font-semibold tracking-[0.3em] uppercase text-emerald-800/70 mb-3 block">
          404 - Lost Balance
        </span>
        
        <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#123524] tracking-tight leading-tight mb-6">
          Path Not Found
        </h1>

        {/* Ayurveda themed text */}
        <p className="text-[#3F5147] text-lg leading-relaxed mb-10 max-w-md mx-auto">
          In Ayurveda, wellness relies on following the correct channel (<em>Srotas</em>). 
          It appears you have wandered onto a path that doesn't exist or is currently unavailable.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          
          <Link
            href="/"
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#0B5D3B] text-white font-medium flex items-center justify-center gap-2 hover:bg-[#094d30] shadow-lg hover:scale-[1.02] transition-all"
          >
            <Leaf className="w-5 h-5" />
            Return to Path
          </Link>

          <Link
            href="/user/dashboard"
            className="w-full sm:w-auto h-14 px-8 rounded-full border border-emerald-800/20 text-[#0B5D3B] bg-white/40 hover:bg-white/80 font-medium flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
          >
            <Compass className="w-5 h-5" />
            Dashboard
          </Link>
        </div>

        {/* Footer ornament */}
        <div className="flex justify-center items-center gap-3 mt-16">
          <div className="h-[1px] w-20 bg-green-300/40"></div>
          <span className="text-emerald-700">❦</span>
          <div className="h-[1px] w-20 bg-green-300/40"></div>
        </div>
      </div>
    </div>
  );
}
