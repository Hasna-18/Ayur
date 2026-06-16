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
    <div className="min-h-screen bg-[#F5F1E8]">

      <Navbar/>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f5f1e8] via-[#f5f1e8]/90 to-[#f5f1e8]/70" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">

          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>

              <div className="inline-flex items-center gap-2 bg-[#E9E3D4] px-4 py-2 rounded-full mb-6">
                <Leaf className="w-4 h-4 text-[#0B5D3B]" />
                <span className="text-[#0B5D3B] font-medium">
                  Ayurveda Specialist
                </span>
              </div>

              <h1 className="text-6xl font-serif font-bold text-[#123524] leading-tight">
                About
                <br />
                Dr. Priya Menon
              </h1>

              <div className="w-40 h-px bg-[#8DA17D] mt-8 mb-8" />

              <p className="text-xl text-[#3F5147] leading-relaxed">
                Dr. Priya Menon is a highly
                experienced Ayurvedic physician
                dedicated to helping patients
                achieve complete wellness through
                natural healing, preventive care,
                and personalized treatment plans.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-10">

                <div className="bg-white rounded-3xl p-5 shadow-sm">
                  <h3 className="text-4xl font-bold text-[#0B5D3B]">
                    10+
                  </h3>
                  <p className="text-gray-600">
                    Years Experience
                  </p>
                </div>

                <div className="bg-white rounded-3xl p-5 shadow-sm">
                  <h3 className="text-4xl font-bold text-[#0B5D3B]">
                    500+
                  </h3>
                  <p className="text-gray-600">
                    Happy Patients
                  </p>
                </div>

              </div>

            </div>

            {/* Right */}
            <div className="relative">

              <div className="absolute -top-6 -left-6 bg-white rounded-3xl p-5 shadow-xl z-20">
                <div className="flex items-center gap-3">
                  <Heart className="text-red-500" />
                  <div>
                    <p className="font-bold">
                      Patient Care
                    </p>
                    <p className="text-sm text-gray-500">
                      Personalized treatment
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative rounded-[40px] overflow-hidden shadow-2xl">
                <Image
                  src="/profile.jpeg"
                  alt="Doctor"
                  width={700}
                  height={800}
                  className="w-full h-[700px] object-cover"
                  unoptimized // Add this to ensure local build handles dev files safely
                />
              </div>

              <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur rounded-3xl p-6 shadow-xl max-w-xs">

                <div className="flex text-amber-500 gap-1 mb-3">
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                  <Star />
                </div>

                <p className="text-[#123524] font-medium">
                  Dedicated to holistic healing
                  and long-term wellness through
                  authentic Ayurvedic practices.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            <Leaf className="w-12 h-12 text-[#0B5D3B]" />

            <h3 className="text-2xl font-bold text-[#123524] mt-6">
              Natural Healing
            </h3>

            <p className="text-gray-600 mt-4">
              Traditional Ayurvedic therapies
              tailored to individual needs.
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            <Shield className="w-12 h-12 text-[#0B5D3B]" />

            <h3 className="text-2xl font-bold text-[#123524] mt-6">
              Safe Treatments
            </h3>

            <p className="text-gray-600 mt-4">
              Proven therapies focusing on
              prevention and long-term health.
            </p>
          </div>

          <div className="bg-white rounded-[30px] p-8 shadow-sm">
            <Users className="w-12 h-12 text-[#0B5D3B]" />

            <h3 className="text-2xl font-bold text-[#123524] mt-6">
              Patient Focused
            </h3>

            <p className="text-gray-600 mt-4">
              Compassionate care designed around
              each patient’s wellness journey.
            </p>
          </div>

        </div>
      </section>

      {/* Mission */}
      <section className="max-w-7xl mx-auto px-6 pb-20">

        <div className="bg-gradient-to-r from-[#012E1F] to-[#0B5D3B] rounded-[40px] text-white p-12">

          <Award className="w-14 h-14 mb-6" />

          <h2 className="text-5xl font-serif font-bold">
            Our Mission
          </h2>

          <p className="text-xl mt-6 max-w-3xl leading-relaxed">
            To make healthcare simple,
            transparent and accessible while
            preserving the wisdom of Ayurveda
            for modern lifestyles.
          </p>

        </div>

      </section>

    </div>
  );
}