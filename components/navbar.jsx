"use client"
import Link from "next/link";
import * as React from "react";
import { usePathname } from "next/navigation";
import { GiLotus } from "react-icons/gi";

export function Navbar() {
    const pathname = usePathname();

    const getLinkClass = (path) => {
        const isActive = pathname === path;
        return isActive
            ? "text-brand-green font-bold hover:text-brand-gold transition duration-200 text-sm tracking-wide"
            : "text-slate-500 font-medium hover:text-brand-gold transition duration-200 text-sm tracking-wide";
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-brand-gold-light/50 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between">
                    <Link href='/'>
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-brand-green/5 flex items-center justify-center">
                                <GiLotus className="w-9 h-9 text-brand-gold" />
                            </div>
                            <div>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-3xl font-serif font-bold text-brand-green tracking-wide">
                                        Ayur
                                    </span>
                                    <span className="text-brand-gold font-bold text-lg leading-none">.</span>
                                </div>
                                <p className="text-[10px] uppercase tracking-widest text-brand-sage font-semibold">
                                    Ancient Wisdom • Modern Care
                                </p>
                            </div>
                        </div>
                    </Link>

                    <div className="hidden md:flex gap-10 items-center">
                        <Link href="/" className={getLinkClass("/")}>
                            Home
                        </Link>
                        <Link href="/about" className={getLinkClass("/about")}>
                            About
                        </Link>
                        <Link href="#" className={getLinkClass("/contact")}>
                            Contact
                        </Link>
                    </div>

                    <a href="/user/dashboard" className="transition-transform active:scale-95">
                        <button className="shimmer-btn bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-brand-green/10 hover:shadow-brand-green/20 hover:-translate-y-0.5 border border-brand-green/20">
                            Book Appointment
                        </button>
                    </a>
                </div>
            </nav>

        </div>
    )
}