"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { GiLotus } from "react-icons/gi";
import { Menu, X } from "lucide-react";

export function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const getLinkClass = (path) => {
        const isActive = pathname === path;
        return isActive
            ? "text-brand-green font-bold hover:text-brand-gold transition duration-200 text-sm tracking-wide relative after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-brand-green after:rounded-full"
            : "text-slate-500 font-medium hover:text-brand-gold transition duration-200 text-sm tracking-wide";
    };

    const getMobileLinkClass = (path) => {
        const isActive = pathname === path;
        return isActive
            ? "text-brand-green font-bold bg-brand-gold-light/40 px-4 py-3 rounded-xl transition duration-200 text-sm tracking-wide"
            : "text-slate-600 font-medium hover:text-brand-gold hover:bg-brand-gold-light/20 px-4 py-3 rounded-xl transition duration-200 text-sm tracking-wide";
    };

    return (
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-brand-gold-light/50 transition-all duration-300">
            {/* Desktop and Mobile Header */}
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-20 sm:h-22 flex items-center justify-between">
                {/* Logo Section */}
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                    <div className="flex items-center gap-2 sm:gap-3 hover:opacity-95 transition">
                        <div className="p-1.5 sm:p-2 rounded-xl bg-brand-green/5 flex items-center justify-center">
                            <GiLotus className="w-7 h-7 sm:w-9 sm:h-9 text-brand-gold" />
                        </div>
                        <div>
                            <div className="flex items-baseline gap-0.5 sm:gap-1">
                                <span className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-brand-green tracking-wide leading-none">
                                    Ayurveechi
                                </span>
                                <span className="text-brand-gold font-bold text-base sm:text-lg leading-none">.</span>
                            </div>
                            <p className="text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest text-brand-sage font-semibold leading-none mt-0.5 sm:mt-1">
                                Ancient Wisdom • Modern Care
                            </p>
                        </div>
                    </div>
                </Link>

                {/* Desktop Navigation Links */}
                <div className="hidden md:flex gap-8 lg:gap-10 items-center">
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

                {/* Desktop CTA Button */}
                <div className="hidden md:block">
                    <a href="/user/dashboard" className="transition-transform active:scale-95 inline-block">
                        <button className="shimmer-btn bg-brand-green hover:bg-brand-green-dark text-white px-5 lg:px-6 py-2.5 lg:py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-brand-green/10 hover:shadow-brand-green/20 hover:-translate-y-0.5 border border-brand-green/20">
                            Book Appointment
                        </button>
                    </a>
                </div>

                {/* Mobile Menu Toggle Button */}
                <div className="flex md:hidden items-center">
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-2 rounded-xl hover:bg-brand-gold-light/40 transition-colors duration-200 text-brand-green cursor-pointer"
                        aria-label="Toggle navigation menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer Menu */}
            <div
                className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
                    mobileMenuOpen ? "max-h-[350px] opacity-100 border-t border-brand-gold-light/35" : "max-h-0 opacity-0 pointer-events-none"
                }`}
            >
                <div className="bg-white/95 backdrop-blur-md px-6 py-5 flex flex-col gap-3.5 shadow-inner">
                    <Link href="/" className={getMobileLinkClass("/")} onClick={() => setMobileMenuOpen(false)}>
                        Home
                    </Link>
                    <Link href="/about" className={getMobileLinkClass("/about")} onClick={() => setMobileMenuOpen(false)}>
                        About
                    </Link>
                    <Link href="#" className={getMobileLinkClass("/contact")} onClick={() => setMobileMenuOpen(false)}>
                        Contact
                    </Link>
                    
                    <hr className="border-brand-gold-light/50 my-1" />
                    
                    <a href="/user/dashboard" className="w-full inline-block" onClick={() => setMobileMenuOpen(false)}>
                        <button className="w-full shimmer-btn bg-brand-green hover:bg-brand-green-dark text-white py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 shadow-md border border-brand-green/10">
                            Book Appointment
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}