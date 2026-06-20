"use client";

import Image from "next/image";
import {
  Heart,
  Leaf,
  Shield,
  Award,
  Users,
  Star,
} from "lucide-react";
import { Navbar } from "@/components/navbar";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FAF6F0] relative overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 md:py-20">
        {/* Background Watercolor Leaf Watermark (hanging from top-left) */}
        <Image
          src="/l12.png"
          alt=""
          width={350}
          height={450}
          className="absolute -top-12 -left-12 opacity-[0.12] pointer-events-none mix-blend-multiply w-[350px] h-auto z-0 rotate-180 scale-x-[-1]"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left Column */}
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#EAE8E0] px-4 py-1.5 rounded-full">
                <Leaf className="w-4 h-4 text-brand-green" />
                <span className="text-brand-green font-semibold text-sm">
                  Ayurveda Specialist
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-serif font-bold text-brand-green leading-tight">
                About
                <br />
                Dr. Kajal
              </h1>

              <div className="w-20 h-1.5 bg-brand-gold rounded-full my-6" />

              <p className="text-base md:text-lg text-slate-600 font-light leading-relaxed max-w-xl">
                Dr. Kajal is a certified Ayurveda practitioner dedicated to bringing balance, healing, and wellness into people’s lives using time-tested Ayurvedic principles. The name "Ayurveechi" combines "Ayurveda" and "Veechi" (meaning wave or flow), symbolizing the natural flow of life and health through ancient wisdom.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10">
                {/* Stat Card 1 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/50 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#EAE8E0] flex items-center justify-center text-brand-green flex-shrink-0">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-brand-green leading-none mb-1">
                      10+
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      Years Experience
                    </p>
                  </div>
                </div>

                {/* Stat Card 2 */}
                <div className="bg-white rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/50 flex items-center gap-4 hover:shadow-md transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-[#EAE8E0] flex items-center justify-center text-brand-green flex-shrink-0">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-serif font-bold text-brand-green leading-none mb-1">
                      500+
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                      Happy Patients
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="relative justify-self-center lg:justify-self-end w-full max-w-[480px] mt-12 lg:mt-0 z-10">

              {/* Floating Top-Left Badge */}
              <div className="absolute -top-4 left-6 bg-white rounded-full px-5 py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100/50 z-20 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
                <Heart className="w-4 h-4 text-red-500 fill-none" />
                <span className="text-xs font-semibold text-slate-700 tracking-wide">
                  Personalized Treatment
                </span>
              </div>

              {/* Main Image Container */}
              <div className="relative rounded-[40px] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 ease-out border-8 border-white bg-white">
                <Image
                  src="/g33.png"
                  alt="Dr. Kajal"
                  width={600}
                  height={650}
                  className="w-full h-[520px] object-cover object-top"
                  unoptimized
                />
              </div>

              {/* Floating Bottom-Right Testimonial Card */}
              <div className="absolute bottom-6 -right-4 bg-white rounded-[24px] p-5 shadow-[0_12px_40px_rgb(0,0,0,0.08)] border border-slate-100/50 max-w-[280px] z-20 hover:scale-105 transition-transform duration-300">
                <div className="flex text-amber-500 gap-1 mb-3">
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                  <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                </div>
                <p className="text-brand-green font-medium text-xs md:text-sm leading-relaxed">
                  Dedicated to holistic healing and long-term wellness through
                  authentic Ayurvedic practices.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">

          {/* Feature 1 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/50 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#EAE8E0] flex items-center justify-center text-brand-green mb-6">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-green mt-4">
                Natural Healing
              </h3>
              <p className="text-slate-600 font-light mt-3 leading-relaxed">
                Traditional Ayurvedic therapies
                tailored to individual needs.
              </p>
            </div>
            <div className="w-12 h-0.5 bg-[#C5A880] mt-6" />
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/50 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#EAE8E0] flex items-center justify-center text-brand-green mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-green mt-4">
                Safe Treatments
              </h3>
              <p className="text-slate-600 font-light mt-3 leading-relaxed">
                Proven therapies focusing on
                prevention and long-term health.
              </p>
            </div>
            <div className="w-12 h-0.5 bg-[#C5A880] mt-6" />
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-[32px] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-slate-100/50 flex flex-col justify-between hover:-translate-y-1 transition-all duration-300">
            <div>
              <div className="w-14 h-14 rounded-full bg-[#EAE8E0] flex items-center justify-center text-brand-green mb-6">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-brand-green mt-4">
                Patient Focused
              </h3>
              <p className="text-slate-600 font-light mt-3 leading-relaxed">
                Compassionate care designed around
                each patient’s wellness journey.
              </p>
            </div>
            <div className="w-12 h-0.5 bg-[#C5A880] mt-6" />
          </div>

        </div>
      </section>

      {/* Mission Section */}
      <section className="max-w-7xl mx-auto px-6 pb-20 relative z-10">
        <div className="relative overflow-hidden bg-[#0F3C2A] rounded-[40px] text-white p-10 md:p-16 hover:shadow-lg transition-shadow duration-300">

          {/* Mortar & Pestle Watermark background (right-aligned) */}
          <div className="absolute right-0 bottom-0 top-0 w-full md:w-1/2 opacity-[0.08] pointer-events-none z-0">
            <Image
              src="/g4.png"
              alt="Botanical watermark"
              fill
              className="object-contain object-right-bottom scale-110"
            />
          </div>

          <div className="relative z-10 max-w-5xl">
            <div className="w-14 h-14 rounded-full border border-[#C5A880]/30 flex items-center justify-center text-[#C5A880] mb-8 bg-white/5">
              <Award className="w-7 h-7" />
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {/* Mission */}
              <div className="space-y-3 text-left">
                <h2 className="text-2xl font-serif font-bold text-[#C5A880]">
                  Our Mission
                </h2>
                <p className="text-sm leading-relaxed text-white/80 font-light">
                  To make authentic Ayurveda accessible and personalized for modern lifestyles—helping individuals restore balance, prevent disease, and live more consciously.
                </p>
              </div>

              {/* Vision */}
              <div className="space-y-3 text-left">
                <h2 className="text-2xl font-serif font-bold text-[#C5A880]">
                  Our Vision
                </h2>
                <p className="text-sm leading-relaxed text-white/80 font-light">
                  To be a global leader in integrative, holistic wellness through Ayurveda, empowering individuals to take charge of their health in alignment with nature.
                </p>
              </div>

              {/* Long-Term Goal */}
              <div className="space-y-3 text-left">
                <h2 className="text-2xl font-serif font-bold text-[#C5A880]">
                  Long-Term Goal
                </h2>
                <p className="text-sm leading-relaxed text-white/80 font-light">
                  To create a trusted online ecosystem for Ayurvedic healing, lifestyle education, and wellness transformation that reaches people worldwide.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}