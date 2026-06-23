import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GiLotus } from "react-icons/gi";
import { Mail, Phone, Clock, Globe, Instagram, Facebook, Youtube } from "lucide-react";


const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Medical web -ayu",
  description: "connect with doctors anytime, anywhere",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className}`} suppressHydrationWarning>

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >

          <main className="min-h-screen">{children}</main>

          <footer className="bg-[#12372A] text-white/90 border-t border-white/5 pt-16 pb-12 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/[0.02] rounded-full blur-3xl pointer-events-none" />
            <div className="absolute top-0 left-0 w-80 h-80 bg-[#FAF6F0]/[0.02] rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 pb-12 border-b border-white/10">

                {/* Brand Column */}
                <div className="space-y-5">
                  <div className="flex items-center gap-2.5">
                    <GiLotus className="w-9 h-9 text-[#d9b56d]" />
                    <span className="text-3xl font-serif font-bold text-[#FAF6F0] tracking-wide">
                      Ayurveechi
                    </span>
                  </div>
                  <p className="text-[13.5px] text-[#FAF6F0]/80 leading-relaxed font-light font-sans">
                    Authentic classical Ayurveda consultations and personalized wellness plans. Bringing ancient healing wisdom straight to your modern lifestyle, globally.
                  </p>
                  {/* Social links */}
                  <div className="flex items-center gap-3 pt-2">
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d9b56d] hover:text-[#12372A] transition duration-300">
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d9b56d] hover:text-[#12372A] transition duration-300">
                      <Facebook className="w-4 h-4" />
                    </a>
                    <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#d9b56d] hover:text-[#12372A] transition duration-300">
                      <Youtube className="w-4 h-4" />
                    </a>
                  </div>
                </div>

                {/* Patient Care Links */}
                <div className="space-y-4 lg:pl-10">
                  <h4 className="text-[14px] uppercase tracking-wider text-[#d9b56d] font-bold font-sans">
                    Patient Care
                  </h4>
                  <ul className="space-y-2.5 text-[13.5px] font-sans font-light">
                    <li>
                      <Link href="/user/dashboard" className="hover:text-[#d9b56d] transition duration-200">
                        My Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link href="/user/book" className="hover:text-[#d9b56d] transition duration-200">
                        Book Consultation
                      </Link>
                    </li>
                    <li>
                      <Link href="/user/appointment-list" className="hover:text-[#d9b56d] transition duration-200">
                        My Appointments
                      </Link>
                    </li>
                    <li>
                      <Link href="/user/prescriptions" className="hover:text-[#d9b56d] transition duration-200">
                        Prescriptions
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Practice Links */}
                <div className="space-y-4 lg:pl-8">
                  <h4 className="text-[14px] uppercase tracking-wider text-[#d9b56d] font-bold font-sans">
                    Our Practice
                  </h4>
                  <ul className="space-y-2.5 text-[13.5px] font-sans font-light">
                    <li>
                      <Link href="/" className="hover:text-[#d9b56d] transition duration-200">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link href="/about" className="hover:text-[#d9b56d] transition duration-200">
                        About Dr. Kajal
                      </Link>
                    </li>
                    <li>
                      <Link href="/#treatments" className="hover:text-[#d9b56d] transition duration-200">
                        Treatments
                      </Link>
                    </li>
                  </ul>
                </div>

                {/* Contact Column */}
                <div className="space-y-4">
                  <h4 className="text-[14px] uppercase tracking-wider text-[#d9b56d] font-bold font-sans">
                    Get in Touch
                  </h4>
                  <ul className="space-y-3.5 text-[13px] font-sans font-light">
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#d9b56d] shrink-0 mt-0.5" />
                      <span>hello@ayurveechi.com</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#d9b56d] shrink-0 mt-0.5" />
                      <span>+91 98765 43210</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Clock className="w-4 h-4 text-[#d9b56d] shrink-0 mt-0.5" />
                      <span>Mon - Sat: 9:00 AM - 6:00 PM IST</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Globe className="w-4 h-4 text-[#d9b56d] shrink-0 mt-0.5" />
                      <span>Online Global Consultation</span>
                    </li>
                  </ul>
                </div>

              </div>

              {/* Bottom Copyright & Legal links */}
              <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-sans font-light text-[#FAF6F0]/65">
                <p>
                  &copy; {new Date().getFullYear()} Ayurveechi. All rights reserved.
                </p>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <Link href="/privacy" className="hover:text-[#d9b56d] transition">
                    Privacy Policy
                  </Link>
                  <Link href="/terms" className="hover:text-[#d9b56d] transition">
                    Terms of Service
                  </Link>
                  <span className="hidden md:inline">|</span>
                  <span className="text-[10px] text-[#FAF6F0]/40 max-w-xs text-center md:text-right leading-tight block">
                    Medical Disclaimer: Information provided is for educational purposes only.
                  </span>
                </div>
              </div>

            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
