"use client";

import { useState } from "react";
import Image from "next/image";

import f1 from "@/public/f1.png";
import f2 from "@/public/f2.png";

import e1 from "@/public/e1.png";
import e2 from "@/public/e2.png";
import e3 from "@/public/e3.png";
import e4 from "@/public/e4.png";
import e5 from "@/public/e5.png";
import e6 from "@/public/e6.png";

import Link from "next/link";
import {
  Calendar,
  Video,
  ClipboardList,
  Truck,
  Globe,
  Star,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Heart,
  Activity,
  Droplets,
  Dumbbell,
  Flower2,
  CheckCircle,
  Quote,
  Award,
  Leaf,
  User,
  PlayCircle,
  Users,
  Lock,
  Scale,
  CupSoda,
  HeartHandshake,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Navbar } from "@/components/navbar";

const treatments = [
  {
    title: "Weight Loss",
    desc: "Natural metabolism boost, diet plans, and body detoxification.",
    image: e1,
    badge: "Metabolism",
    icon: Dumbbell,
    theme: {
      iconBg: "bg-[#e28a2b]",
      badgeBg: "bg-[#FAF0E4] text-[#b46d1b] border-[#f5dfc6]",
      circleBg: "from-[#fbf7f0] to-[#f5ebd6]",
    }
  },
  {
    title: "PCOS Management",
    desc: "Hormonal balance therapies through herbs and lifestyle changes.",
    image: e2,
    badge: "Hormonal Health",
    icon: Sparkles,
    theme: {
      iconBg: "bg-[#8a5cb3]",
      badgeBg: "bg-[#f5effa] text-[#6d3e96] border-[#ebdcf5]",
      circleBg: "from-[#fbf0fc] to-[#ebd8f5]",
    }
  },
  {
    title: "Diabetes Care",
    desc: "Regulate blood sugar levels through tailored Panchakarma treatments.",
    image: e5,
    badge: "Sugar Control",
    icon: Activity,
    theme: {
      iconBg: "bg-[#2b6cb0]",
      badgeBg: "bg-[#ebf8ff] text-[#2b6cb0] border-[#bee3f8]",
      circleBg: "from-[#f0f7ff] to-[#d3e9fa]",
    }
  },
  {
    title: "Hair Loss Control",
    desc: "Strengthen roots and promote hair growth with natural oils and herbs.",
    image: e3,
    badge: "Scalp Care",
    icon: Droplets,
    theme: {
      iconBg: "bg-[#1d8a8a]",
      badgeBg: "bg-[#e6fffa] text-[#1d8a8a] border-[#b2f5ea]",
      circleBg: "from-[#f0fdfa] to-[#d1f7f0]",
    }
  },
  {
    title: "Skin Care & Glow",
    desc: "Restore your natural radiance and treat acne with herbal remedies.",
    image: e4,
    badge: "Radiance",
    icon: Flower2,
    theme: {
      iconBg: "bg-[#d53f8c]",
      badgeBg: "bg-[#fff5f7] text-[#d53f8c] border-[#fed7e2]",
      circleBg: "from-[#fff5f6] to-[#fad2e1]",
    }
  },
  {
    title: "Stress & Anxiety",
    desc: "Calm your mind and improve sleep with Shirodhara and meditation.",
    image: e6,
    badge: "Mindfulness",
    icon: Heart,
    theme: {
      iconBg: "bg-[#5D7E62]",
      badgeBg: "bg-[#f0fff4] text-[#3b7a57] border-[#c6f6d5]",
      circleBg: "from-[#f2fcf5] to-[#dbf7e3]",
    }
  }
];

const steps = [
  {
    step: "01",
    title: "Book Appointment",
    desc: "Select a date and time that fits your schedule on our online portal.",
    icon: Calendar,
  },
  {
    step: "02",
    title: "Online Consultation",
    desc: "Connect directly via high-quality video call with our Ayurvedic experts.",
    icon: Video,
  },
  {
    step: "03",
    title: "Personalized Plan",
    desc: "Receive a tailored nutrition, lifestyle, and herbal medicine regimen.",
    icon: ClipboardList,
  },
  {
    step: "04",
    title: "Medicine Delivery",
    desc: "Get fresh, premium organic formulations delivered right to your door.",
    icon: Truck,
  },
];

const testimonials = [
  {
    name: "Ananya R.",
    location: "Bangalore, India",
    initials: "AR",
    rating: 5,
    text: "The PCOS treatment has completely changed my life. After 6 months of following Dr. Hasna's personalized diet and herbal plan, my cycle is regular and I feel so much more energetic!",
  },
  {
    name: "Rahul M.",
    location: "Mumbai, India",
    initials: "RM",
    rating: 5,
    text: "Dr. Hasna's stress management plan helped me overcome severe insomnia. The Shirodhara oils recommended were extremely soothing. Highly recommend her consultation!",
  },
  {
    name: "Sarah J.",
    location: "London, UK",
    initials: "SJ",
    rating: 5,
    text: "Excellent online experience. I was skeptical about virtual Ayurvedic consulting, but the diagnosis was precise and the prescribed herbs were delivered to my doorstep in the UK.",
  },
];

export default function Home() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main className="bg-brand-cream text-slate-800 font-sans min-h-screen selection:bg-brand-gold/30 selection:text-brand-green-dark">

      {/* ========================================================================= */}
      {/* DESKTOP VIEWPORT LAYOUT (Visible md and above) */}
      {/* ========================================================================= */}
      <div className="hidden md:block relative">

      {/* Hero Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[650px] bg-gradient-to-b from-brand-gold-light/50 via-brand-cream to-transparent -z-10 pointer-events-none" />

      {/* Decorative Organic Vector Shape */}
      <div className="absolute top-20 right-0 w-96 h-96 opacity-10 bg-brand-green rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[450px] left-0 w-[500px] h-[500px] opacity-[0.06] bg-brand-gold rounded-full blur-3xl -z-10 pointer-events-none" />

      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fbf9f4] to-[#f4ebd9] pt-6 pb-6">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] right-[5%] w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl" />
          <div className="absolute bottom-[20%] left-[5%] w-[500px] h-[500px] bg-brand-green/5 rounded-full blur-3xl" />
        </div>

        {/* Top Left Blur Leaf */}
        <Image
          src="/g2.png"
          alt=""
          width={350}
          height={500}
          className="absolute top-0 left-0 z-0 opacity-40 pointer-events-none mix-blend-multiply w-[350px] h-auto"
          priority
        />

        <div className="max-w-7xl mx-auto px-6 pt-12 lg:pt-16 pb-12 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* LEFT CONTENT */}
            <div className="lg:col-span-7">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#eef3e5] text-[#0f4c3a] mb-8 shadow-sm">
                <Leaf className="w-4 h-4 text-brand-green" />
                <span className="font-semibold text-sm tracking-wide">
                  Ancient Healing Redefined for Modern Living
                </span>
              </div>

              {/* Heading */}
              <h1 className="font-serif text-[#0f4c3a] text-5xl md:text-6xl lg:text-[76px] leading-[1.05] font-bold">
                Heal Naturally
                <br />
                with{" "}
                <span className="text-[#c89d4f]">
                  Expert
                </span>
                <br />
                Ayurvedic Care
              </h1>

              {/* Decorative Line (Swirl/Floral) */}
              <div className="my-8 opacity-80">
                <svg width="120" height="24" viewBox="0 0 150 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 15 C 30 15, 40 5, 75 15 C 110 25, 120 15, 150 15" stroke="#C89D4F" strokeWidth="2" strokeLinecap="round" />
                  <path d="M65 15 C 70 5, 80 5, 85 15 C 80 25, 70 25, 65 15 Z" fill="#C89D4F" opacity="0.6" />
                </svg>
              </div>

              {/* Description */}
              <p className="text-slate-600 text-lg leading-relaxed max-w-lg font-light mb-10">
                Consult certified Ayurvedic doctors from the comfort
                of your home. Get personalized treatment plans,
                herbal remedies, and lifestyle coaching tailored
                specifically to your body's unique constitution
                (Dosha).
              </p>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-5">
                <a href="/user/dashboard" className="transition-transform active:scale-95">
                  <button className="bg-[#0f4c3a] hover:bg-[#0a3327] transition-all duration-300 text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-[#0f4c3a]/20 hover:shadow-xl hover:-translate-y-0.5">
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>

                <a href="#treatments" className="transition-transform active:scale-95">
                  <button className="bg-white hover:bg-slate-50 transition-all duration-300 text-slate-700 px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5">
                    <PlayCircle className="w-5 h-5 text-slate-400" />
                    Learn More
                  </button>
                </a>
              </div>

              {/* Stats Row */}
              <div className="bg-white/60 backdrop-blur-md rounded-3xl md:rounded-full border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-6 py-4 px-6 w-full max-w-3xl mx-auto">
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">

                  {/* Rating */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#0f4c3a] fill-[#0f4c3a]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-[28px] font-bold text-[#0f4c3a]">
                        4.9★
                      </h3>
                      <p className="text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                        Patient Rating
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-slate-200"></div>

                  {/* Countries */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#0f4c3a]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-[28px] font-bold text-[#0f4c3a]">
                        50+
                      </h3>
                      <p className="text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                        Countries
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block w-px h-10 bg-slate-200"></div>

                  {/* Consultations */}
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center">
                      <Users className="w-6 h-6 text-[#0f4c3a] fill-[#0f4c3a]" />
                    </div>
                    <div>
                      <h3 className="text-2xl md:text-[28px] font-bold text-[#0f4c3a]">
                        1000+
                      </h3>
                      <p className="text-slate-500 uppercase text-[10px] tracking-wider font-bold">
                        Consultations
                      </p>
                    </div>
                  </div>

                </div>
              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="lg:col-span-5 relative flex justify-center mt-16 lg:mt-0">

              {/* Leaves Background Images */}
              <Image
                src="/g2.png"
                alt=""
                width={200}
                height={300}
                className="absolute -left-28 top-[10%] z-0 opacity-70 pointer-events-none mix-blend-multiply w-[200px] h-auto"
              />

              <Image
                src="/g2.png"
                alt="leaf"
                width={200}
                height={300}
                className="absolute -right-16 top-[40%] z-0 opacity-70 pointer-events-none mix-blend-multiply rotate-[100deg] w-[200px] h-auto"
              />

              {/* Doctor Card Container */}
              <div className="relative z-10 bg-white rounded-[40px] shadow-[0_20px_50px_rgb(0,0,0,0.06)] p-3 md:p-4 w-full max-w-[460px] ml-auto hover:-translate-y-1 transition duration-500">

                {/* Image Circle Container */}
                <div className="bg-[#e8ede4] rounded-full overflow-hidden aspect-square relative flex items-end justify-center shadow-inner">
                  <Image
                    src="/g33.png"
                    alt="Doctor"
                    fill
                    className="object-cover object-top scale-110 translate-y-4"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                </div>

                {/* Top Right Badge */}
                <div className="absolute top-8 -right-8 md:-right-12 bg-white shadow-xl rounded-2xl px-5 py-3.5 border border-slate-50 flex items-center gap-3 hover:scale-105 transition">
                  <div className="p-2 rounded-lg bg-[#eef3e5]">
                    <ShieldCheck className="w-6 h-6 text-[#0f4c3a] fill-[#0f4c3a] text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-sage font-bold uppercase tracking-wider leading-none mb-1">Practitioner</p>
                    <p className="font-bold text-[13px] text-[#0f4c3a] leading-none">Licensed Doctor</p>
                  </div>
                </div>

                {/* Bottom Left Badge */}
                <div className="absolute bottom-16 -left-8 md:-left-12 bg-white shadow-xl rounded-2xl px-5 py-3.5 border border-slate-50 flex items-center gap-3 hover:scale-105 transition">
                  <div className="p-2 rounded-lg bg-[#fdf5e6]">
                    <Award className="w-6 h-6 text-[#c89d4f]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-sage font-bold uppercase tracking-wider leading-none mb-1">Experience</p>
                    <p className="font-bold text-[13px] text-[#0f4c3a] leading-none">10+ Years BAMS</p>
                  </div>
                </div>

              </div>

              {/* Bottom Right Ayurvedic Image (Mortar) */}
              <Image
                src="/g4.png"
                alt=""
                width={320}
                height={320}
                className="absolute -bottom-20 -right-20 z-20 pointer-events-none drop-shadow-2xl"
              />

            </div>

          </div>
        </div>

        {/* TRUST BAR */}
        <div className="max-w-[85rem] mx-auto px-6 pb-4 relative z-20 mt-4">
          <div className="bg-white/90 backdrop-blur-xl rounded-full border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-10 py-6">
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-8 md:gap-4 divide-x divide-slate-100">

              <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start">
                <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center flex-shrink-0">
                  <Globe className="w-5 h-5 text-[#0f4c3a]" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-bold uppercase text-[11px] text-[#0f4c3a] tracking-wider leading-tight mb-0.5">Global Reach</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">International Patients</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start pl-0 md:pl-8">
                <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#0f4c3a] fill-[#0f4c3a] text-[#eef3e5]" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-bold uppercase text-[11px] text-[#0f4c3a] tracking-wider leading-tight mb-0.5">Verified Credential</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">Licensed Practitioners</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start pl-0 md:pl-8">
                <div className="w-12 h-12 rounded-full bg-[#fdf5e6] flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 text-[#c89d4f] fill-[#c89d4f]" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-bold uppercase text-[11px] text-[#0f4c3a] tracking-wider leading-tight mb-0.5">Trust Score</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">4.9 Patient Rating</p>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start pl-0 md:pl-8">
                <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-[#0f4c3a] fill-[#0f4c3a] text-[#eef3e5]" />
                </div>
                <div className="flex flex-col text-left">
                  <p className="font-bold uppercase text-[11px] text-[#0f4c3a] tracking-wider leading-tight mb-0.5">Convenience</p>
                  <p className="text-[11px] text-slate-500 font-medium leading-tight">Global Medicine Delivery</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {/* Treatments Section */}
      <section
        id="treatments"
        className="py-10 md:py-12 relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold-light/20 rounded-full blur-3xl -z-10" />

        {/* Left Decorative Image */}
        <div className="absolute left-0 top-10 hidden xl:block overflow-hidden rounded-[40px] mix-blend-multiply opacity-90">
          <Image
            src={f1}
            alt="Ayurveda"
            width={280}
            height={420}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Decorative Image */}
        <div className="absolute right-0 top-10 hidden xl:block overflow-hidden rounded-[40px] mix-blend-multiply opacity-90">
          <Image
            src={f2}
            alt="Ayurveda"
            width={280}
            height={420}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="max-w-7xl mx-auto px-6">

          {/* Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16 relative z-10">
            <span className="inline-flex items-center px-5 py-2 rounded-full border border-brand-green/30 text-brand-green font-semibold text-sm mb-6">
              SPECIALIZED CARE
            </span>

            <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-green leading-tight">
              Ayurvedic Treatments,
              <br />
              Tailored for{" "}
              <span className="text-brand-gold">
                You
              </span>
            </h2>

            <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto">
              We focus on identifying the root cause of ailments and restore harmony
              through holistic healing methodologies.
            </p>
          </div>

          {/* Cards Container */}
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {treatments.map((item) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={item.title}
                    className="bg-white rounded-[32px] overflow-hidden border border-brand-gold-light/40 shadow-sm hover:shadow-2xl hover:-translate-y-2 hover:border-brand-gold/40 transition-all duration-500 group flex flex-row h-auto sm:min-h-[260px] items-stretch"
                  >
                    {/* Left content block */}
                    <div className="p-4 xs:p-5 sm:p-6 sm:pr-2 flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        {/* Icon & Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-10 h-10 rounded-full ${item.theme.iconBg} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold border ${item.theme.badgeBg}`}>
                            {item.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-green mb-2 leading-tight">
                          {item.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-light line-clamp-3">
                          {item.desc}
                        </p>
                      </div>

                      {/* Link */}
                      <div className="mt-3">
                        <a
                          href="/user/dashboard"
                          className="inline-flex items-center gap-1.5 font-bold text-brand-green hover:text-brand-gold transition text-xs sm:text-sm"
                        >
                          Book Consultation
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                      </div>
                    </div>

                    {/* Right Image Mask / Circle container */}
                    <div className="w-[38%] sm:w-[42%] relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {/* Crescent background shape */}
                      <div className={`absolute right-0 top-0 bottom-0 w-[120%] h-full rounded-l-full bg-gradient-to-br ${item.theme.circleBg} opacity-70`} />

                      {/* Image container */}
                      <div className="absolute inset-0 flex items-center justify-center p-2 sm:p-3 z-10">
                        <div className="relative w-full h-[85%]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain group-hover:scale-108 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, 30vw"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Features */}
          <div className="max-w-6xl mx-auto mt-6 bg-[#FAF6F0]/60 backdrop-blur-md rounded-[32px] border border-brand-gold-light/60 p-6 md:px-8 md:py-4 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-4 justify-items-center items-center">

              {/* Feature 1 */}
              <div className="flex items-center gap-3 w-full max-w-[200px] justify-start md:justify-center">
                <div className="w-11 h-11 rounded-full border border-brand-gold/30 flex items-center justify-center bg-white text-brand-gold-dark flex-shrink-0 shadow-sm">
                  <Leaf className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-brand-green leading-snug">100% Natural</span>
                  <span className="text-[10px] text-brand-sage font-medium leading-snug">& Safe</span>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-center gap-3 w-full max-w-[200px] justify-start md:justify-center">
                <div className="w-11 h-11 rounded-full border border-brand-gold/30 flex items-center justify-center bg-white text-brand-gold-dark flex-shrink-0 shadow-sm">
                  <Sparkles className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-brand-green leading-snug">Personalized</span>
                  <span className="text-[10px] text-brand-sage font-medium leading-snug">Care</span>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-center gap-3 w-full col-span-2 md:col-span-1 max-w-[200px] justify-start md:justify-center">
                <div className="w-11 h-11 rounded-full border border-brand-gold/30 flex items-center justify-center bg-white text-brand-gold-dark flex-shrink-0 shadow-sm">
                  <User className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-brand-green leading-snug">Expert Ayurvedic</span>
                  <span className="text-[10px] text-brand-sage font-medium leading-snug">Doctors</span>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="flex items-center gap-3 w-full max-w-[200px] justify-start md:justify-center">
                <div className="w-11 h-11 rounded-full border border-brand-gold/30 flex items-center justify-center bg-white text-brand-gold-dark flex-shrink-0 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-brand-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-brand-green leading-snug">Holistic & Root</span>
                  <span className="text-[10px] text-brand-sage font-medium leading-snug">Cause Approach</span>
                </div>
              </div>

              {/* Feature 5 */}
              <div className="flex items-center gap-3 w-full max-w-[200px] justify-start md:justify-center">
                <div className="w-11 h-11 rounded-full border border-brand-gold/30 flex items-center justify-center bg-white text-brand-gold-dark flex-shrink-0 shadow-sm">
                  <GiLotus className="w-6 h-6 text-brand-gold" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] font-bold text-brand-green leading-snug">Ancient Wisdom</span>
                  <span className="text-[10px] text-brand-sage font-medium leading-snug">Modern Care</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="relative py-10 md:py-12 overflow-hidden bg-gradient-to-b from-[#fafaf6] to-[#f4f7ed]">

        {/* Decorative Leaves */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
          <Image src="/leaf-top.png" fill alt="" />
        </div>

        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20">
          <Image src="/leaf-bottom.png" fill alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">

            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#d8c19c]/60 text-[#a1825b] uppercase tracking-[2px] font-bold text-xs bg-[#fff9eb]/40">
              Simple Process
            </span>

            <h2 className="mt-4 text-3xl md:text-5xl font-serif font-bold text-[#12372A] leading-tight">
              Your Journey to Wellness
            </h2>

            <p className="mt-3 text-sm md:text-base text-slate-500 max-w-xl mx-auto leading-relaxed">
              Healing step-by-step with authentic advice and direct organic medicines shipped worldwide.
            </p>

          </div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  className="relative text-center group"
                >

                  {/* Arrow Connector */}
                  {index < 3 && (
                    <div className="hidden lg:flex absolute top-12 left-[65%] w-[70%] items-center z-0">
                      <div className="flex-1 border-t border-dashed border-[#C5A880]/50" />
                      <div className="w-6 h-6 rounded-full bg-white border border-[#e8e4d9] flex items-center justify-center text-[10px] text-[#C5A880] shadow-xs select-none">
                        →
                      </div>
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div className="relative z-10 mx-auto w-24 h-24 rounded-full bg-[#f8f6ef] border-[6px] border-[#e8e4d9]/50 shadow-md flex items-center justify-center group-hover:scale-105 group-hover:border-[#12372A]/20 transition-all duration-300">

                    <Icon className="w-8 h-8 text-[#12372A]" />

                    <div className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full bg-[#12372A] text-[#FAF8F5] font-bold text-xs flex items-center justify-center shadow-md">
                      {step.step}
                    </div>

                  </div>

                  <h3 className="mt-5 text-lg md:text-xl font-serif font-bold text-[#12372A]">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-xs md:text-sm text-slate-500 leading-relaxed max-w-[220px] mx-auto font-medium">
                    {step.desc}
                  </p>

                </div>
              );
            })}

          </div>

          {/* Trust Strip */}
          <div className="mt-8 max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-[#edf2df] p-8">

            <div className="grid md:grid-cols-4 gap-6 text-center">

              <div>
                <ShieldCheck className="w-8 h-8 mx-auto text-[#9bb85d]" />
                <p className="mt-3 font-medium">100% Natural & Safe</p>
              </div>

              <div>
                <Globe className="w-8 h-8 mx-auto text-[#9bb85d]" />
                <p className="mt-3 font-medium">Worldwide Delivery</p>
              </div>

              <div>
                <Leaf className="w-8 h-8 mx-auto text-[#9bb85d]" />
                <p className="mt-3 font-medium">Expert Ayurvedic Doctors</p>
              </div>

              <div>
                <Lock className="w-8 h-8 mx-auto text-[#9bb85d]" />
                <p className="mt-3 font-medium">Secure & Private</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* Single Doctor Section */}
      <section className="py-10 md:py-12 bg-[#f9f8f4] relative overflow-hidden">
        <div className="max-w-[1100px] mx-auto px-6">
          <div className="bg-white rounded-[40px] p-8 md:p-14 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">

            {/* Decorative Leaves */}
            <Image
              src="/l11.png"
              alt=""
              width={260}
              height={180}
              className="absolute top-0 right-0 w-48 md:w-64 opacity-80 pointer-events-none select-none"
            />

            <Image
              src="/l12.png"
              alt=""
              width={340}
              height={260}
              className="absolute bottom-0 left-0 w-52 md:w-80 opacity-80 pointer-events-none select-none"
            />

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

              {/* Doctor Portrait Section */}
              <div className="flex justify-center lg:justify-end lg:pr-4">
                <div className="relative w-full max-w-[380px]">

                  {/* Outer White Card for Portrait */}
                  <div className="bg-white p-3 rounded-[32px] shadow-[0_10px_40px_rgb(0,0,0,0.08)] relative z-10">
                    {/* Inner image container */}
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] bg-[#fbf9f4]">
                      {/* Leaf Behind Doctor */}
                      <Image
                        src="/l13.png"
                        alt=""
                        width={260}
                        height={260}
                        className="absolute inset-0 m-auto opacity-40 scale-110 pointer-events-none select-none"
                      />

                      {/* Doctor Image */}
                      <Image
                        src="/g33.png"
                        alt="Dr. Yeti"
                        fill
                        className="object-cover relative z-10"
                      />
                    </div>
                  </div>

                  {/* Floating Trust Badge */}
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-[0_8px_25px_rgb(0,0,0,0.08)] px-4 py-3 flex items-center gap-3 w-[90%] z-20">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-[#4a6b53] text-white flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-[13px] text-[#113a2c] leading-tight truncate">
                        Trusted by 1000+
                      </h4>
                      <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                        Patients Worldwide
                      </p>
                    </div>

                    <div className="flex items-center shrink-0">
                      <div className="flex -space-x-2">
                        <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                          <Image src="/profile.jpeg" width={28} height={28} alt="" className="object-cover w-full h-full" />
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                          <Image src="/profile.jpeg" width={28} height={28} alt="" className="object-cover w-full h-full" />
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                          <Image src="/profile.jpeg" width={28} height={28} alt="" className="object-cover w-full h-full" />
                        </div>
                        <div className="w-7 h-7 rounded-full border-2 border-white overflow-hidden bg-gray-200">
                          <Image src="/profile.jpeg" width={28} height={28} alt="" className="object-cover w-full h-full" />
                        </div>
                      </div>
                      <div className="ml-1.5 bg-[#f4f7ed] rounded-full px-2 py-0.5 text-[10px] font-bold text-[#4a6b53]">
                        1K+
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Doctor Details */}
              <div className="space-y-7 lg:pl-4">

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Leaf className="w-4 h-4 text-[#b89b65]" />
                    <span className="uppercase tracking-[1.5px] text-[12px] font-bold text-[#b89b65]">
                      AYURVEDIC PHYSICIAN
                    </span>
                    <div className="h-px w-12 bg-[#b89b65]/30" />
                  </div>

                  <h2 className="text-4xl md:text-[44px] font-serif font-bold text-[#1a3b2b] leading-[1.1]">
                    Meet Your Practitioner
                  </h2>

                  <h3 className="text-2xl md:text-[30px] font-serif text-[#b89b65]">
                    Dr. Priya
                  </h3>

                  <div className="inline-flex items-center gap-2 bg-[#f5f7f2] rounded-full px-3 py-1.5 mt-2">
                    <ShieldCheck className="w-4 h-4 text-[#4a6b53]" />
                    <span className="font-semibold text-[11px] tracking-wide text-[#4a6b53]">
                      BAMS | 10+ YEARS EXPERIENCE
                    </span>
                  </div>
                </div>

                <p className="text-[15px] text-gray-600 leading-relaxed max-w-[500px]">
                  Dedicated to helping patients achieve long-term wellness through
                  authentic Ayurvedic treatments, lifestyle guidance, and
                  personalized care. She believes in healing the body by working in
                  alignment with the natural rhythms of life.
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-y-5 gap-x-6 pt-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#e8ebd9] flex items-center justify-center shrink-0">
                      <Scale className="w-4 h-4 text-[#4a6b53]" />
                    </div>
                    <span className="font-medium text-[#1a3b2b] text-[14px]">
                      Dosha Balancing
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#e8ebd9] flex items-center justify-center shrink-0">
                      <CupSoda className="w-4 h-4 text-[#4a6b53]" />
                    </div>
                    <span className="font-medium text-[#1a3b2b] text-[14px]">
                      Panchakarma Guidance
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#e8ebd9] flex items-center justify-center shrink-0">
                      <Leaf className="w-4 h-4 text-[#4a6b53]" />
                    </div>
                    <span className="font-medium text-[#1a3b2b] text-[14px]">
                      Customized Herbs
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border border-[#e8ebd9] flex items-center justify-center shrink-0">
                      <HeartHandshake className="w-4 h-4 text-[#4a6b53]" />
                    </div>
                    <span className="font-medium text-[#1a3b2b] text-[14px]">
                      Continuous Care
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <a href="/user/dashboard" className="inline-block transition-transform active:scale-95">
                    <button className="group bg-[#1a3b2b] hover:bg-[#122a1f] text-white pl-6 pr-2 py-2 rounded-full font-medium text-[15px] transition-all duration-300 flex items-center gap-6">
                      Book Consultation
                      <span className="w-9 h-9 rounded-full bg-[#d4b982] flex items-center justify-center transition text-white">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                      </span>
                    </button>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-10 md:py-12 relative border-t border-brand-gold-light/40">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-xs uppercase tracking-widest text-brand-gold font-bold bg-brand-gold/5 px-4 py-1.5 rounded-full border border-brand-gold/25">
              Success Stories
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-green">
              What Our Patients Say
            </h2>
            <p className="text-slate-600 font-light">
              Real feedback from patients who started their natural healing path with us.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-brand-cream/40 rounded-3xl p-8 border border-brand-gold-light/30 flex flex-col justify-between hover:shadow-lg transition duration-300"
              >
                <div className="space-y-4">
                  {/* Quote icon and Rating */}
                  <div className="flex items-center justify-between">
                    <Quote className="w-8 h-8 text-brand-gold-light" />
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-brand-gold text-brand-gold" />
                      ))}
                    </div>
                  </div>

                  <p className="text-slate-600 font-light text-sm leading-relaxed italic">
                    "{t.text}"
                  </p>
                </div>

                {/* Patient Profile */}
                <div className="flex items-center gap-3.5 mt-8 pt-4 border-t border-brand-gold-light/30">
                  <div className="w-10 h-10 rounded-full bg-brand-gold text-white font-bold flex items-center justify-center text-sm shadow-inner">
                    {t.initials}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-brand-green text-sm">{t.name}</h4>
                    <p className="text-[11px] text-brand-sage font-medium tracking-wide">{t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 md:py-12 bg-brand-green text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <GiLotus className="w-14 h-14 text-brand-gold mx-auto animate-pulse" />

          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Ready to Begin Your
              <br />
              <span className="text-gold-gradient font-serif">Healing Journey?</span>
            </h2>
            <p className="text-brand-gold-light/80 text-lg md:text-xl font-light max-w-xl mx-auto">
              Schedule your standard online video consultation with an Ayurvedic expert doctor today.
            </p>
          </div>

          <a href="/user/dashboard" className="transition-transform active:scale-95 inline-block">
            <button className="shimmer-btn bg-brand-gold hover:bg-brand-gold-dark text-brand-green-dark px-10 py-5 rounded-2xl font-bold tracking-wide shadow-2xl transition-all duration-300">
              Schedule Appointment
            </button>
          </a>
        </div>
      </section>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE VIEWPORT LAYOUT (Visible below md) */}
      {/* ========================================================================= */}
      <div className="block md:hidden bg-[#FAF8F5] min-h-screen text-slate-800 font-sans pb-16 relative">
        {/* Soft background glow */}
        <div className="absolute top-0 left-0 right-0 h-[450px] bg-gradient-to-b from-[#F4EAE1]/40 to-transparent -z-10 pointer-events-none" />

        {/* Mobile Header / Navbar */}
        <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#F4EAE1]/30 px-4 py-3 flex items-center justify-between shadow-[0_2px_15px_rgba(0,0,0,0.015)]">
          <div className="flex items-center gap-2">
            <div className="p-1 rounded-lg bg-[#12372A]/5 flex items-center justify-center">
              <GiLotus className="w-6 h-6 text-[#C5A880]" />
            </div>
            <div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-lg font-serif font-bold text-[#12372A] tracking-wide leading-none">
                  Ayur
                </span>
                <span className="text-[#C5A880] font-bold text-md leading-none">.</span>
              </div>
              <p className="text-[7px] uppercase tracking-widest text-[#436850] font-bold leading-none">
                Ancient Wisdom. Modern Care
              </p>
            </div>
          </div>
          
          <button className="p-1.5 hover:bg-[#12372A]/5 rounded-lg transition" aria-label="Menu">
            <Menu className="w-5 h-5 text-[#12372A]" />
          </button>
        </header>

        {/* Mobile Hero Section */}
        <section className="px-4 pt-3 pb-3 text-center relative">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#eef3e5] border border-[#12372A]/10 text-[#0f4c3a] mb-5 shadow-xs">
            <Leaf className="w-3 h-3 text-[#12372A] fill-[#12372A]/20" />
            <span className="font-bold text-[8px] tracking-wide uppercase">
              Ancient Healing • Nature for Modern Living
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-[#12372A] text-[34px] leading-[1.1] font-bold mb-3 tracking-tight">
            Heal Naturally
            <br />
            with <span className="text-[#C5A880] italic">Expert</span>
            <br />
            Ayurvedic Care
          </h1>

          {/* Subtext Description */}
          <p className="text-slate-600 text-xs leading-relaxed max-w-sm mx-auto font-light mb-6">
            Trusted care for Ayurvedic solutions from the comfort of your home. Personalized treatments for holistic well-being and long-lasting results.
          </p>

          {/* CTAs */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <a href="/user/dashboard" className="transition-transform active:scale-95">
              <button className="bg-[#12372A] hover:bg-[#0A1E17] text-white px-5 py-3 rounded-full text-xs font-semibold flex items-center gap-2 shadow-md shadow-[#12372A]/15">
                Book Appointment
                <span className="w-5 h-5 rounded-full bg-[#0A1E17] flex items-center justify-center text-[10px] text-[#C5A880]">
                  ➔
                </span>
              </button>
            </a>

            <a href="#mobile-treatments" className="transition-transform active:scale-95">
              <button className="bg-white hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-full text-xs font-semibold flex items-center gap-2 shadow-xs border border-slate-100">
                <PlayCircle className="w-4 h-4 text-slate-400" />
                Learn More
              </button>
            </a>
          </div>

          {/* Doctor Image Composition */}
          <div className="relative w-64 h-64 mx-auto mb-3 flex items-center justify-center">
            {/* Soft background shape */}
            <div className="absolute inset-2 bg-gradient-to-br from-[#e8ede4] to-[#FAF6F0] rounded-full overflow-hidden shadow-inner" />
            
            {/* Leaf Graphic Background decoration */}
            <div className="absolute inset-0 bg-[url('/l13.png')] bg-contain bg-center bg-no-repeat opacity-15" />
            
            {/* Doctor portrait image */}
            <div className="absolute inset-2 flex items-end justify-center rounded-full overflow-hidden">
              <Image
                src="/g33.png"
                alt="Doctor"
                width={220}
                height={220}
                className="object-cover object-top scale-105 translate-y-3"
                priority
              />
            </div>

            {/* Overlapping Mortar & Pestle at bottom-right */}
            <div className="absolute -bottom-4 right-0 w-32 h-32 z-20 pointer-events-none drop-shadow-xl">
              <Image
                src="/g4.png"
                alt="Ayurvedic Mortar"
                width={128}
                height={128}
                className="object-contain w-full h-full"
              />
            </div>

            {/* Floating Practitioner Experience Badge */}
            <div className="absolute top-10 right-0 bg-white shadow-md rounded-xl p-2.5 border border-slate-100 flex items-center gap-2 hover:scale-105 transition z-20">
              <div className="p-1 rounded-md bg-[#eef3e5]">
                <User className="w-3.5 h-3.5 text-[#12372A]" />
              </div>
              <div className="text-left">
                <p className="text-[7px] text-[#436850] font-bold uppercase tracking-wider leading-none">Experienced</p>
                <p className="font-bold text-[9px] text-[#12372A] mt-0.5 leading-none">10+ Years</p>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-white shadow-[0_4px_20px_rgba(0,0,0,0.02)] py-3 px-2 max-w-sm mx-auto">
            <div className="grid grid-cols-4 divide-x divide-slate-100">
              <div className="flex flex-col items-center text-center px-1">
                <div className="w-8 h-8 rounded-full bg-[#eef3e5] flex items-center justify-center mb-1">
                  <Star className="w-4 h-4 text-[#12372A] fill-[#12372A]" />
                </div>
                <span className="text-xs font-extrabold text-[#12372A] leading-tight">4.9+</span>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tight mt-0.5 leading-none">Patient Rating</span>
              </div>

              <div className="flex flex-col items-center text-center px-1">
                <div className="w-8 h-8 rounded-full bg-[#eef3e5] flex items-center justify-center mb-1">
                  <Users className="w-4 h-4 text-[#12372A]" />
                </div>
                <span className="text-xs font-extrabold text-[#12372A] leading-tight">50+</span>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tight mt-0.5 leading-none">Solutions</span>
              </div>

              <div className="flex flex-col items-center text-center px-1">
                <div className="w-8 h-8 rounded-full bg-[#eef3e5] flex items-center justify-center mb-1">
                  <ShieldCheck className="w-4 h-4 text-[#12372A] fill-[#12372A]/20" />
                </div>
                <span className="text-xs font-extrabold text-[#12372A] leading-tight">1000+</span>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tight mt-0.5 leading-none">Consultations</span>
              </div>

              <div className="flex flex-col items-center text-center px-1">
                <div className="w-8 h-8 rounded-full bg-[#fdf5e6] flex items-center justify-center mb-1">
                  <CheckCircle className="w-4 h-4 text-[#c89d4f]" />
                </div>
                <span className="text-xs font-extrabold text-[#12372A] leading-tight">100%</span>
                <span className="text-[7px] text-slate-500 font-bold uppercase tracking-tight mt-0.5 leading-none">Natural & Safe</span>
              </div>
            </div>
          </div>
        </section>

        {/* Specialized Care Section */}
        <section id="mobile-treatments" className="py-4 text-center bg-[#FAF8F5]">
          <div className="mb-3">
            <span className="inline-flex items-center px-4 py-1 rounded-full border border-[#12372A]/20 text-[#12372A] font-semibold text-[9px] uppercase tracking-wider mb-2">
              SPECIALIZED CARE
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#12372A] leading-tight">
              Ayurvedic Treatments,
              <br />
              Tailored for <span className="text-[#C5A880]">You</span>
            </h2>
          </div>

          {/* Cards Grid (2 columns on mobile) */}
          <div className="grid grid-cols-2 gap-3 px-4 mb-4 max-w-md mx-auto">
            {treatments.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-white rounded-2xl p-3 border border-[#F4EAE1]/80 shadow-xs flex flex-col justify-between relative overflow-hidden group min-h-[160px]"
                >
                  <div className="text-left relative z-10">
                    {/* Icon */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className={`w-6 h-6 rounded-full ${item.theme.iconBg} flex items-center justify-center text-white shadow-xs flex-shrink-0`}>
                        <IconComponent className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xs font-serif font-bold text-[#12372A] leading-tight mb-1">
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[8px] text-slate-500 leading-relaxed font-light line-clamp-3 mb-2 pr-4">
                      {item.desc}
                    </p>
                  </div>

                  {/* Consultation Link */}
                  <div className="mt-auto relative z-10 text-left">
                    <a
                      href="/user/dashboard"
                      className="inline-flex items-center gap-0.5 font-bold text-[#12372A] hover:text-[#C5A880] transition text-[7px] uppercase tracking-wider"
                    >
                      Book Consultation
                      <ArrowRight className="w-2.5 h-2.5" />
                    </a>
                  </div>

                  {/* Right side floating illustration in crescent mask */}
                  <div className="absolute right-0 bottom-0 top-0 w-[45%] overflow-hidden pointer-events-none">
                    {/* Crescent background shape */}
                    <div className={`absolute right-[-15%] bottom-[-10%] w-[115%] h-[80%] rounded-l-full bg-gradient-to-br ${item.theme.circleBg} opacity-60`} />
                    
                    {/* Image */}
                    <div className="absolute inset-0 flex items-end justify-center p-1 z-10">
                      <div className="relative w-full h-[75%]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-contain animate-fade-in"
                          sizes="20vw"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Journey to Wellness (Simple Process) */}
        <section className="py-4 bg-[#fbfbf8] text-center border-t border-[#F4EAE1]/30">
          <div className="mb-3">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#C5A880]/60 text-[#A1825B] uppercase tracking-widest font-bold text-[8px] bg-[#fff9eb]/40">
              SIMPLE PROCESS
            </span>
            <h2 className="mt-2 text-2xl font-serif font-bold text-[#12372A] leading-tight">
              Your Journey to Wellness
            </h2>
          </div>

          {/* Timeline Layout */}
          <div className="relative max-w-sm mx-auto px-4 mb-4">
            {/* Horizontal Dotted Connector Line */}
            <div className="absolute top-6 left-12 right-12 h-px border-t border-dashed border-[#C5A880]/60 z-0" />
            
            <div className="grid grid-cols-4 gap-1 relative z-10">
              {steps.map((step, index) => {
                const Icon = step.icon;
                
                let mobileDesc = "";
                if (index === 0) mobileDesc = "Schedule a slot at your convenience online.";
                if (index === 1) mobileDesc = "Connect safely via video call with our expert.";
                if (index === 2) mobileDesc = "Receive a tailored wellness plan just for you.";
                if (index === 3) mobileDesc = "Get organic medicines delivered to your door.";

                return (
                  <div key={step.step} className="flex flex-col items-center">
                    {/* Icon Circle */}
                    <div className="w-12 h-12 rounded-full bg-white border border-[#edf2df] shadow-xs flex items-center justify-center mb-2 hover:scale-105 transition relative">
                      <Icon className="w-5 h-5 text-[#12372A]" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#12372A] text-[#FAF8F5] font-bold text-[8px] flex items-center justify-center shadow-xs">
                        {step.step}
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h4 className="text-[9px] font-bold text-[#12372A] leading-tight mb-1">
                      {step.title}
                    </h4>
                    
                    {/* Description */}
                    <p className="text-[7px] text-slate-500 leading-tight font-medium">
                      {mobileDesc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Meet Your Practitioner (Single Doctor Card) */}
        <section className="py-4 bg-[#FAF8F5] text-center border-t border-[#F4EAE1]/30">
          <div className="px-4 mb-1">
            <div className="bg-white rounded-3xl p-5 border border-[#F4EAE1]/85 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative overflow-hidden max-w-sm mx-auto">
              {/* Decorative backgrounds */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-[url('/l11.png')] bg-contain bg-right-top bg-no-repeat opacity-15 pointer-events-none" />
              
              <div className="flex flex-row gap-4 items-start relative z-10">
                {/* Left Column: Doctor Image (40% width) */}
                <div className="w-[40%] flex-shrink-0">
                  <div className="bg-white p-1 rounded-2xl shadow-xs border border-slate-50 relative">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#fbf9f4]">
                      <div className="absolute inset-0 bg-[url('/l13.png')] bg-contain bg-center bg-no-repeat opacity-25" />
                      <Image
                        src="/g33.png"
                        alt="Dr. Priya"
                        fill
                        className="object-cover relative z-10"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Trust Badge */}
                  <div className="mt-2.5 bg-[#f4f7ed] rounded-xl p-1.5 border border-[#12372A]/10 flex items-center gap-1.5 shadow-xs">
                    <div className="w-5 h-5 shrink-0 rounded-full bg-[#12372A] text-white flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-[#C5A880]" />
                    </div>
                    <div className="text-left min-w-0">
                      <h5 className="font-extrabold text-[8px] text-[#12372A] leading-tight truncate">
                        1000+ Patients
                      </h5>
                      <p className="text-[6px] text-gray-500 font-medium leading-none">
                        Trusted globally
                      </p>
                    </div>
                  </div>
                </div>

                {/* Right Column: Details (60% width) */}
                <div className="w-[60%] text-left">
                  <div className="flex items-center gap-1">
                    <Leaf className="w-3 h-3 text-[#b89b65]" />
                    <span className="uppercase tracking-wider text-[8px] font-bold text-[#b89b65]">
                      AYURVEDIC PHYSICIAN
                    </span>
                  </div>

                  <h3 className="text-lg font-serif font-bold text-[#12372A] mt-1 leading-tight">
                    Meet Your Practitioner
                  </h3>
                  
                  <h4 className="text-sm font-serif text-[#b89b65] leading-tight">
                    Dr. Priya
                  </h4>

                  <div className="inline-flex items-center gap-1 bg-[#f4f7ed] rounded-full px-2 py-0.5 mt-1 border border-[#12372A]/5">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#12372A]" />
                    <span className="font-bold text-[7px] text-[#12372A]">
                      BAMS, MD (AYURVEDA)
                    </span>
                  </div>

                  <p className="text-[9px] text-gray-600 leading-relaxed font-light mt-2">
                    Dedicated to helping patients achieve long-term wellness through authentic Ayurvedic treatments, lifestyle advice, and personalized care.
                  </p>

                  {/* Bullets grid (2x2) */}
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 mt-3 pt-2 border-t border-slate-100">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-[#12372A] shrink-0" />
                      <span className="font-medium text-[#12372A] text-[8px] leading-tight truncate">
                        Deeply Experienced
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-[#12372A] shrink-0" />
                      <span className="font-medium text-[#12372A] text-[8px] leading-tight truncate">
                        Dosha Based
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-[#12372A] shrink-0" />
                      <span className="font-medium text-[#12372A] text-[8px] leading-tight truncate">
                        Personalized Care
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5 text-[#12372A] shrink-0" />
                      <span className="font-medium text-[#12372A] text-[8px] leading-tight truncate">
                        Continuous Care
                      </span>
                    </div>
                  </div>

                  {/* Button */}
                  <div className="mt-4">
                    <a href="/user/dashboard" className="inline-block transition-transform active:scale-95">
                      <button className="bg-[#12372A] hover:bg-[#0A1E17] text-white pl-4 pr-1 py-1 rounded-full text-[10px] font-bold transition duration-300 flex items-center gap-3 shadow-sm shadow-[#12372A]/10">
                        Book Consultation
                        <span className="w-6 h-6 rounded-full bg-[#C5A880] text-white flex items-center justify-center">
                          ➔
                        </span>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-4 bg-white border-t border-[#F4EAE1]/30">
          <div className="px-4 mb-2">
            <div className="text-center mb-3">
              <span className="text-[8px] uppercase tracking-widest text-[#C5A880] font-bold bg-[#FAF6F0] px-3 py-1.5 rounded-full border border-[#FAF6F0]/85">
                WHAT OUR PATIENTS SAY
              </span>
            </div>
            
            <div className="bg-white rounded-3xl p-5 border border-[#F4EAE1]/85 shadow-[0_4px_20px_rgba(0,0,0,0.015)] flex flex-col justify-between min-h-[170px] relative max-w-sm mx-auto">
              <div className="text-left">
                {/* Stars rating */}
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-xs font-extrabold text-[#12372A] mr-1">5.0</span>
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#C5A880] text-[#C5A880]" />
                  ))}
                </div>
                
                {/* Quote text */}
                <p className="text-[10px] text-slate-600 font-light leading-relaxed italic">
                  "{testimonials[activeTestimonial].text}"
                </p>
              </div>
              
              {/* Profile row with slider controls */}
              <div className="flex items-center justify-between mt-5 pt-3 border-t border-slate-100">
                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                  className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-100 transition shrink-0"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-4 h-4 text-slate-600" />
                </button>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#C5A880] text-white font-bold flex items-center justify-center text-xs shadow-inner">
                    {testimonials[activeTestimonial].initials}
                  </div>
                  <div className="text-left">
                    <h4 className="font-serif font-bold text-[#12372A] text-[10px] leading-tight">{testimonials[activeTestimonial].name}</h4>
                    <p className="text-[8px] text-slate-400 font-medium tracking-wide leading-none mt-0.5">{testimonials[activeTestimonial].location}</p>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTestimonial((prev) => (prev + 1) % testimonials.length)}
                  className="w-7 h-7 rounded-full bg-slate-50 hover:bg-slate-100 flex items-center justify-center text-slate-400 border border-slate-100 transition shrink-0"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
              
              {/* Dots indicators */}
              <div className="flex items-center justify-center gap-1.5 mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === index ? "bg-[#12372A] w-3" : "bg-slate-200"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile CTA Section */}
        <section className="px-4 py-4">
          <div className="bg-[#12372A] rounded-3xl p-6 text-center relative overflow-hidden shadow-lg shadow-[#12372A]/10 max-w-sm mx-auto">
            {/* Background elements */}
            <div className="absolute inset-0 bg-[url('/l12.png')] bg-cover opacity-10 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center gap-4">
              <GiLotus className="w-10 h-10 text-[#C5A880]" />
              
              <h3 className="text-xl font-serif font-bold text-white leading-tight">
                Ready to Begin Your
                <br />
                <span className="text-[#C5A880] italic">Healing Journey?</span>
              </h3>
              
              <p className="text-white/80 text-[10px] leading-relaxed max-w-xs font-light">
                Schedule your standard online video consultation with an Ayurvedic expert doctor today.
              </p>
              
              <a href="/user/dashboard" className="transition-transform active:scale-95 mt-2">
                <button className="bg-[#C5A880] hover:bg-[#A1825B] text-[#12372A] px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
                  Schedule Appointment
                  <ArrowRight className="w-3.5 h-3.5 text-[#12372A]" />
                </button>
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
