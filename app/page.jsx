"use client";

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
} from "lucide-react";
import { GiLotus } from "react-icons/gi";

// const treatments = [
//   {
//     title: "Weight Loss",
//     desc: "Natural metabolism boost, diet plans, and body detoxification.",
//     icon: Dumbbell,
//     color: "from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 text-amber-700 dark:text-amber-400 border-amber-100 dark:border-amber-900/30",
//     badge: "Metabolism"
//   },
//   {
//     title: "PCOS Management",
//     desc: "Hormonal balance therapies through herbs and lifestyle changes.",
//     icon: Sparkles,
//     color: "from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 text-purple-700 dark:text-purple-400 border-purple-100 dark:border-purple-900/30",
//     badge: "Hormonal Health"
//   },
//   {
//     title: "Diabetes Care",
//     desc: "Regulate blood sugar levels through tailored Panchakarma treatments.",
//     icon: Activity,
//     color: "from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 text-blue-700 dark:text-blue-400 border-blue-100 dark:border-blue-900/30",
//     badge: "Sugar Control"
//   },
//   {
//     title: "Hair Loss Control",
//     desc: "Strengthen roots and promote hair growth with natural oils and herbs.",
//     icon: Droplets,
//     color: "from-teal-50 to-emerald-50 dark:from-teal-950/20 dark:to-emerald-950/20 text-teal-700 dark:text-teal-400 border-teal-100 dark:border-teal-900/30",
//     badge: "Scalp Care"
//   },
//   {
//     title: "Skin Care & Glow",
//     desc: "Restore your natural radiance and treat acne with herbal remedies.",
//     icon: Flower2,
//     color: "from-rose-50 to-red-50 dark:from-rose-950/20 dark:to-red-950/20 text-rose-700 dark:text-rose-400 border-rose-100 dark:border-rose-900/30",
//     badge: "Radiance"
//   },
//   {
//     title: "Stress & Anxiety",
//     desc: "Calm your mind and improve sleep with Shirodhara and meditation.",
//     icon: Heart,
//     color: "from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20 text-green-700 dark:text-green-400 border-emerald-100 dark:border-green-900/30",
//     badge: "Mindfulness"
//   },
// ];
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
  return (
    <main className="bg-brand-cream text-slate-800 font-sans min-h-screen selection:bg-brand-gold/30 selection:text-brand-green-dark">

      {/* Hero Background Elements */}
      <div className="absolute top-0 left-0 right-0 h-[650px] bg-gradient-to-b from-brand-gold-light/50 via-brand-cream to-transparent -z-10 pointer-events-none" />

      {/* Decorative Organic Vector Shape */}
      <div className="absolute top-20 right-0 w-96 h-96 opacity-10 bg-brand-green rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-[450px] left-0 w-[500px] h-[500px] opacity-[0.06] bg-brand-gold rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-brand-gold-light/50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-22 flex items-center justify-between">
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

          <div className="hidden md:flex gap-10 items-center">
            <Link href="#" className="text-brand-green font-medium hover:text-brand-gold transition duration-200 text-sm tracking-wide">
              Home
            </Link>
            <Link href="/user/about" className="text-slate-600 font-medium hover:text-brand-gold transition duration-200 text-sm tracking-wide">
              About
            </Link>
            <Link href="#" className="text-slate-600 font-medium hover:text-brand-gold transition duration-200 text-sm tracking-wide">
              Contact
            </Link>
          </div>

          <a href="/user/dashboard" className="transition-transform active:scale-95">
            <button className="shimmer-btn bg-brand-green hover:bg-brand-green-dark text-white px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 shadow-lg shadow-brand-green/10 border border-brand-green/20">
              Book Appointment
            </button>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#fbf9f4] to-[#f4ebd9] pt-12 pb-16">
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
          className="absolute top-0 left-0 z-0 opacity-40 pointer-events-none mix-blend-multiply"
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
                <a href="/user/dashboard">
                  <button className="bg-[#0f4c3a] hover:bg-[#0a3327] transition-colors text-white px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-lg shadow-[#0f4c3a]/20">
                    Book Appointment
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </a>

                <a href="#treatments">
                  <button className="bg-white hover:bg-slate-50 transition-colors text-slate-700 px-8 py-4 rounded-full font-semibold flex items-center gap-2 shadow-sm border border-slate-100">
                    <PlayCircle className="w-5 h-5 text-slate-400" />
                    Learn More
                  </button>
                </a>
              </div>

              {/* Stats Row */}
              <div className="bg-white/60 backdrop-blur-md rounded-3xl md:rounded-full border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] mt-12 py-5 px-6 w-full max-w-3xl mx-auto">
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
                className="absolute -left-28 top-[10%] z-0 opacity-70 pointer-events-none mix-blend-multiply"
              />

              <Image
                src="/g2.png"
                alt="leaf"
                width={200}
                height={300}
                className="absolute -right-16 top-[40%] z-0 opacity-70 pointer-events-none mix-blend-multiply rotate-[100deg]"
              />

              {/* Doctor Card Container */}
              <div className="relative z-10 bg-white rounded-[40px] shadow-[0_20px_50px_rgb(0,0,0,0.06)] p-3 md:p-4 w-full max-w-[460px] ml-auto">

                {/* Image Circle Container */}
                <div className="bg-[#e8ede4] rounded-full overflow-hidden aspect-square relative flex items-end justify-center shadow-inner">
                  <Image
                    src="/g33.png"
                    alt="Doctor"
                    fill
                    className="object-cover object-top scale-110 translate-y-4"
                    priority
                  />
                </div>

                {/* Top Right Badge */}
                <div className="absolute top-8 -right-8 md:-right-12 bg-white shadow-xl rounded-2xl px-5 py-3.5 border border-slate-50 flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#eef3e5]">
                    <ShieldCheck className="w-6 h-6 text-[#0f4c3a] fill-[#0f4c3a] text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-brand-sage font-bold uppercase tracking-wider leading-none mb-1">Practitioner</p>
                    <p className="font-bold text-[13px] text-[#0f4c3a] leading-none">Licensed Doctor</p>
                  </div>
                </div>

                {/* Bottom Left Badge */}
                <div className="absolute bottom-16 -left-8 md:-left-12 bg-white shadow-xl rounded-2xl px-5 py-3.5 border border-slate-50 flex items-center gap-3">
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
        <div className="max-w-[85rem] mx-auto px-6 pb-6 relative z-20 mt-10">
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
        className="py-24 md:py-32 relative overflow-hidden"
      >
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold-light/20 rounded-full blur-3xl -z-10" />

        {/* Left Decorative Image */}
        <div className="absolute left-0 top-10 hidden xl:block">
          <Image
            src={f1}
            alt="Ayurveda"
            width={280}
            height={420}
            className="object-contain opacity-90"
          />
        </div>

        {/* Right Decorative Image */}
        <div className="absolute right-0 top-10 hidden xl:block">
          <Image
            src={f2}
            alt="Ayurveda"
            width={280}
            height={420}
            className="object-contain opacity-90"
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
                    className="bg-white rounded-[32px] overflow-hidden border border-brand-gold-light/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-row h-[240px]"
                  >
                    {/* Left content block */}
                    <div className="p-6 pr-2 flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        {/* Icon & Badge */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className={`w-10 h-10 rounded-full ${item.theme.iconBg} flex items-center justify-center text-white shadow-sm`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <span className={`text-[10px] px-3 py-1 rounded-full uppercase tracking-wider font-semibold border ${item.theme.badgeBg}`}>
                            {item.badge}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-brand-green mb-2">
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
                    <div className="w-[42%] relative overflow-hidden flex-shrink-0 flex items-center justify-center">
                      {/* Crescent background shape */}
                      <div className={`absolute right-0 top-0 bottom-0 w-[120%] h-full rounded-l-full bg-gradient-to-br ${item.theme.circleBg} opacity-70`} />

                      {/* Image container */}
                      <div className="absolute inset-0 flex items-center justify-center p-3 z-10">
                        <div className="relative w-full h-[85%]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-contain group-hover:scale-110 transition-transform duration-700 ease-out"
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
          <div className="max-w-6xl mx-auto mt-16 bg-[#FAF6F0]/60 backdrop-blur-md rounded-[32px] border border-brand-gold-light/60 p-6 md:px-8 md:py-5 relative z-10">
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

      <section className="relative py-28 overflow-hidden bg-gradient-to-b from-[#fafaf6] to-[#f4f7ed]">

        {/* Decorative Leaves */}
        <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
          <Image src="/leaf-top.png" fill alt="" />
        </div>

        <div className="absolute bottom-0 left-0 w-48 h-48 opacity-20">
          <Image src="/leaf-bottom.png" fill alt="" />
        </div>

        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-24">

            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#d8c19c] text-[#c9a15d] uppercase tracking-[3px] font-semibold text-sm bg-white/70">
              🌿 Simple Process
            </span>

            <h2 className="mt-8 text-5xl md:text-7xl font-serif font-bold text-[#0f4c3a]">
              Your Journey to Wellness
            </h2>

            <p className="mt-6 text-xl text-slate-500">
              Healing step-by-step with authentic advice and direct organic medicines shipped worldwide.
            </p>

          </div>

          {/* Steps */}
          <div className="grid lg:grid-cols-4 gap-14 relative">

            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.step}
                  className="relative text-center group"
                >

                  {/* Arrow Connector */}
                  {index < 3 && (
                    <div className="hidden lg:flex absolute top-16 left-[70%] w-full items-center z-0">
                      <div className="flex-1 border-t-2 border-dashed border-[#b7cc8f]" />
                      <div className="w-10 h-10 rounded-full bg-white border border-[#d9c6a1] flex items-center justify-center shadow-sm">
                        →
                      </div>
                    </div>
                  )}

                  {/* Icon Circle */}
                  <div className="relative z-10 mx-auto w-36 h-36 rounded-full bg-[#f8f6ef] border-[8px] border-[#edf2df] shadow-lg flex items-center justify-center group-hover:scale-105 transition">

                    <Icon className="w-14 h-14 text-[#0f4c3a]" />

                    <div className="absolute top-3 right-3 w-12 h-12 rounded-full bg-[#0f4c3a] text-[#d8c19c] font-bold flex items-center justify-center shadow-lg">
                      {step.step}
                    </div>

                  </div>

                  <h3 className="mt-8 text-3xl font-serif font-bold text-[#0f4c3a]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-slate-500 leading-8 max-w-xs mx-auto">
                    {step.desc}
                  </p>

                </div>
              );
            })}

          </div>

          {/* Trust Strip */}
          <div className="mt-24 max-w-5xl mx-auto bg-white rounded-3xl shadow-xl border border-[#edf2df] p-8">

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
      <section className="py-24 md:py-32 bg-[#f9f8f4] relative overflow-hidden">
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
                        alt="Dr. Hasna Nair"
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
                    Dr. Hasna Nair
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
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
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
      <section className="bg-white py-24 md:py-32 relative border-t border-brand-gold-light/40">
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
      <section className="py-24 md:py-32 bg-brand-green text-white relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-brand-gold/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-sage/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center space-y-8 relative z-10">
          <GiLotus className="w-14 h-14 text-brand-gold mx-auto animate-pulse" />

          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
              Ready to Begin Your
              <br />
              <span className="text-text-gold-gradient font-serif">Healing Journey?</span>
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

    </main>
  );
}
