"use client";

import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

export default function Loading() {
  const messages = [
    "Restoring your balance...",
    "Aligning body, mind, & spirit...",
    "Brewing natural wellness...",
    "Nurturing your path to health...",
    "Finding your inner harmony..."
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-[#F5F1E8] flex flex-col items-center justify-center z-[9999] transition-all duration-300">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-green-100 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-emerald-100 rounded-full blur-3xl opacity-60"></div>

      <div className="relative flex flex-col items-center max-w-sm px-6 text-center">
        
        {/* Spinner Container */}
        <div className="relative mb-8 flex items-center justify-center">
          
          {/* Pulsing Outer Ring */}
          <div className="absolute w-24 h-24 rounded-full border border-green-800/20 animate-ping opacity-25"></div>
          
          {/* Spinning Ring */}
          <div className="w-20 h-20 rounded-full border-4 border-emerald-900/10 border-t-emerald-700 animate-spin"></div>
          
          {/* Center Leaf Icon */}
          <div className="absolute bg-[#E9E3D4] w-12 h-12 rounded-full flex items-center justify-center shadow-inner border border-emerald-800/10">
            <Leaf className="w-6 h-6 text-emerald-800 animate-pulse" />
          </div>
        </div>

        {/* Brand */}
        <span className="text-xs uppercase tracking-[0.25em] text-emerald-800/60 font-semibold mb-2">
          Ayur Wellness
        </span>

        {/* Loading text */}
        <p className="text-xl font-serif text-[#123524] font-medium h-8 animate-pulse transition-all duration-500">
          {messages[messageIndex]}
        </p>

        {/* Small Ayurvedic symbol */}
        <div className="flex items-center gap-2 mt-8">
          <div className="h-[1px] w-12 bg-green-300/60"></div>
          <span className="text-emerald-700 text-sm">❦</span>
          <div className="h-[1px] w-12 bg-green-300/60"></div>
        </div>
      </div>
    </div>
  );
}
