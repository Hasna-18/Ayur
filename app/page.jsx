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
import e7 from "@/public/e7.png";
import e8 from "@/public/e8.png";
import e9 from "@/public/e9.png";
import e10 from "@/public/e10.png";

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
  Smile,
  Clock,
  MapPin,
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import { Navbar } from "@/components/navbar";

const treatments = [
  {
    title: "Wellness Consultations",
    desc: "Tailored, in-depth consultations rooted in classical Ayurveda to address root causes.",
    image: e1,
    badge: "Classical Ayurveda",
    icon: ClipboardList,
    theme: {
      iconBg: "bg-[#e28a2b]",
      badgeBg: "bg-[#FAF0E4] text-[#b46d1b] border-[#f5dfc6]",
      circleBg: "from-[#fbf7f0] to-[#f5ebd6]",
    }
  },
  {
    title: "Diet & Lifestyle",
    desc: "Personalized nutrition and daily routine adjustments based on your unique body constitution (Prakriti).",
    image: e2,
    badge: "Prakriti Guidance",
    icon: Scale,
    theme: {
      iconBg: "bg-[#8a5cb3]",
      badgeBg: "bg-[#f5effa] text-[#6d3e96] border-[#ebdcf5]",
      circleBg: "from-[#fbf0fc] to-[#ebd8f5]",
    }
  },
  {
    title: "Custom Remedies",
    desc: "Customized natural remedies and organic herbal formulations crafted to support your specific needs.",
    image: e3,
    badge: "Herbal Support",
    icon: Leaf,
    theme: {
      iconBg: "bg-[#1d8a8a]",
      badgeBg: "bg-[#e6fffa] text-[#1d8a8a] border-[#b2f5ea]",
      circleBg: "from-[#f0fdfa] to-[#d1f7f0]",
    }
  },
  {
    title: "Detox & Rasayana",
    desc: "Revitalize body and mind using traditional purification (Rasayana) guidance and detox paths.",
    image: e5,
    badge: "Rejuvenation",
    icon: Sparkles,
    theme: {
      iconBg: "bg-[#2b6cb0]",
      badgeBg: "bg-[#ebf8ff] text-[#2b6cb0] border-[#bee3f8]",
      circleBg: "from-[#f0f7ff] to-[#d3e9fa]",
    }
  },
  {
    title: "Mind-Body Balance",
    desc: "Practical techniques including yoga, breathwork, meditation, mindfulness, and sleep hygiene.",
    image: e6,
    badge: "Holistic Health",
    icon: Heart,
    theme: {
      iconBg: "bg-[#d53f8c]",
      badgeBg: "bg-[#fff5f7] text-[#d53f8c] border-[#fed7e2]",
      circleBg: "from-[#fff5f6] to-[#fad2e1]",
    }
  },
  {
    title: "Continuous Care",
    desc: "Ongoing health assessments, short check-ins, and flexible support as your body restores balance.",
    image: e7,
    badge: "Ongoing Support",
    icon: HeartHandshake,
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
    desc: "Connect directly via high-quality video call with Dr. Kajal, our Ayurvedic expert.",
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
    text: "The PCOS treatment has completely changed my life. After 6 months of following Dr. Kajal's personalized diet and herbal plan, my cycle is regular and I feel so much more energetic!",
  },
  {
    name: "Rahul M.",
    location: "Mumbai, India",
    initials: "RM",
    rating: 5,
    text: "Dr. Kajal's stress management plan helped me overcome severe insomnia. The Shirodhara oils recommended were extremely soothing. Highly recommend her consultation!",
  },
  {
    name: "Sarah J.",
    location: "London, UK",
    initials: "SJ",
    rating: 5,
    text: "Excellent online experience. I was skeptical about virtual Ayurvedic consulting, but the diagnosis was precise and the prescribed herbs were delivered to my doorstep in the UK.",
  },
];

const concerns = [
  {
    name: "Digestive Issues",
    detail: "Bloating, acidity, IBS & slow metabolism",
    icon: CupSoda,
    image: e1,
    theme: {
      iconBg: "bg-[#E28A2B]",
      cardBg: "from-[#FFFBF5] to-[#FDF0DF]",
    }
  },
  {
    name: "Thyroid Issues",
    detail: "Hormonal imbalances & energy regulation",
    icon: Sparkles,
    image: e2,
    theme: {
      iconBg: "bg-[#8a5cb3]",
      cardBg: "from-[#FAF8FC] to-[#F1EAF7]",
    }
  },
  {
    name: "Stress & Anxiety",
    detail: "Nervous system calming & mental wellness",
    icon: Smile,
    image: e3,
    theme: {
      iconBg: "bg-[#1d8a8a]",
      cardBg: "from-[#F5FBFB] to-[#E3F2F2]",
    }
  },
  {
    name: "Women’s Health",
    detail: "Menstrual care, PCOS & holistic hormone support",
    icon: Flower2,
    image: e4,
    theme: {
      iconBg: "bg-[#d53f8c]",
      cardBg: "from-[#FFF8FA] to-[#FCEAF0]",
    }
  },
  {
    name: "Arthritis & Joint Pain",
    detail: "Inflammation reduction & bone health",
    icon: Scale,
    image: e5,
    theme: {
      iconBg: "bg-[#5D7E62]",
      cardBg: "from-[#F8FAF8] to-[#EAF2EA]",
    }
  },
  {
    name: "Respiratory & Allergy",
    detail: "Immunity, respiratory strength & sinus care",
    icon: Activity,
    image: e6,
    theme: {
      iconBg: "bg-[#2b6cb0]",
      cardBg: "from-[#F5FAFF] to-[#E3F0FC]",
    }
  },
  {
    name: "Neurological Issues",
    detail: "Nerve health, chronic fatigue & sensory care",
    icon: Activity,
    image: e7,
    theme: {
      iconBg: "bg-[#6D3E96]",
      cardBg: "from-[#FAF8FC] to-[#F1EAF7]",
    }
  },
  {
    name: "Immunity Boosting",
    detail: "Natural disease resistance & ojas building",
    icon: ShieldCheck,
    image: e8,
    theme: {
      iconBg: "bg-[#c89d4f]",
      cardBg: "from-[#FFFBF4] to-[#F7EFE0]",
    }
  },
  {
    name: "Geriatric Care",
    detail: "Age-associated care, vitality & bone strength",
    icon: HeartHandshake,
    image: e9,
    theme: {
      iconBg: "bg-[#436850]",
      cardBg: "from-[#F7FAF7] to-[#E5ECE5]",
    }
  },
  {
    name: "Prenatal & Post Natal",
    detail: "Maternal wellness, recovery & baby bonding",
    icon: Heart,
    image: e10,
    theme: {
      iconBg: "bg-[#e07a9e]",
      cardBg: "from-[#FFF8F9] to-[#FCEBEF]",
    }
  },
];

const benefits = [
  { title: "Personalized Healing", desc: "Every plan is customized to your unique dosha and imbalances.", icon: Leaf },
  { title: "Experienced Practitioner", desc: "Consult directly with a certified and practicing Ayurvedic doctor.", icon: ShieldCheck },
  { title: "Online Convenience", desc: "Accessible from anywhere via video consultation.", icon: Video },
  { title: "Holistic Approach", desc: "Address body, mind, and spirit for deep healing.", icon: Heart },
  { title: "Empowering Education", desc: "Learn the 'why' behind your health issues and how to prevent them.", icon: Award },
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
                          500+
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
                      src="https://res.cloudinary.com/dhgy1gxa6/image/upload/v1782295720/dre_opr5jb.png"
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
                      <p className="font-bold text-[13px] text-[#0f4c3a] leading-none">5+ Years BAMS</p>
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
                HEALTH CONCERNS ADDRESSED
              </span>

              <h2 className="text-5xl md:text-6xl font-serif font-bold text-brand-green leading-tight">
                Specialized Care For{" "}
                <span className="text-brand-gold">
                  Your Wellness
                </span>
              </h2>

              <p className="mt-6 text-slate-600 text-lg max-w-2xl mx-auto">
                We offer structured holistic care for a wide range of specific health concerns, restoring your body's natural alignment.
              </p>
            </div>

            {/* Cards Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-0 mt-12 md:mt-20">
              <div className="grid grid-cols-1 pt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {concerns.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <div
                      key={item.name}
                      className={`bg-gradient-to-b ${item.theme.cardBg} rounded-[24px] overflow-hidden border border-brand-gold-light/10 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group flex flex-col justify-between h-[390px] sm:h-[410px]`}
                    >
                      {/* Top Content */}
                      <div className="p-5 flex-grow flex flex-col">
                        {/* Icon */}
                        <div className={`w-11 h-11 rounded-full ${item.theme.iconBg} flex items-center justify-center text-white shadow-sm mb-4 flex-shrink-0 group-hover:scale-105 transition-transform duration-300`}>
                          <IconComponent className="w-5 h-5" />
                        </div>

                        {/* Title */}
                        <h3 className="text-lg font-serif font-bold text-brand-green mb-1.5 leading-snug">
                          {item.name}
                        </h3>

                        {/* Description */}
                        <p className="text-[11px] text-slate-600 leading-normal font-light line-clamp-3">
                          {item.detail}
                        </p>
                      </div>

                      {/* Bottom Image */}
                      <div className="relative w-full h-[180px] mt-auto overflow-hidden rounded-b-[24px]">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                          sizes="(max-width: 768px) 100vw, 20vw"
                        />
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



        {/* Why Choose Us */}
        <section className="py-16 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center px-5 py-2 rounded-full border border-brand-green/30 text-brand-green font-semibold text-xs mb-4 uppercase tracking-wider bg-[#FAF6F0]">
                WHY AYURVEECHI
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-green leading-tight">
                Healing Rooted in Nature & Science
              </h2>
              <p className="mt-4 text-slate-600 text-base max-w-xl mx-auto">
                Experience the wave of flow and health through balanced, ancient Ayurvedic wisdom brought to modern life.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <div key={idx} className="bg-[#FAF6F0]/40 rounded-3xl p-6 border border-brand-gold-light/30 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 group">
                    <div>
                      <div className="w-12 h-12 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-white text-brand-gold mb-5 group-hover:bg-[#12372A] group-hover:text-white group-hover:border-[#12372A] transition-all duration-300 shadow-sm">
                        <Icon className="w-6 h-6" />
                      </div>
                      <h3 className="text-xl font-serif font-bold text-brand-green mb-3 group-hover:text-brand-gold transition-colors duration-300">{benefit.title}</h3>
                      <p className="text-xs text-slate-600 font-light leading-relaxed">{benefit.desc}</p>
                    </div>
                  </div>
                );
              })}
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
                      Dr. Kajal
                    </h3>

                    <div className="inline-flex items-center gap-2 bg-[#f5f7f2] rounded-full px-3 py-1.5 mt-2">
                      <ShieldCheck className="w-4 h-4 text-[#4a6b53]" />
                      <span className="font-semibold text-[11px] tracking-wide text-[#4a6b53]">
                        BAMS | CERTIFIED AYURVEDA PRACTITIONER
                      </span>
                    </div>
                  </div>

                  <p className="text-[15px] text-gray-600 leading-relaxed max-w-[500px]">
                    Dr. Kajal is a certified Ayurveda practitioner dedicated to bringing balance, healing, and wellness into people's lives using time-tested Ayurvedic principles. She believes in healing the body by working in alignment with the natural rhythms of life.
                  </p>

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

        {/* Consultation Packages */}
        <section className="py-16 bg-[#FAF6F0]/30 border-t border-b border-brand-gold-light/20 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="inline-flex items-center px-5 py-2 rounded-full border border-brand-green/30 text-brand-green font-semibold text-xs mb-4 uppercase tracking-wider bg-white">
                STRUCTURED WELLNESS PLANS
              </span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-brand-green leading-tight">
                Consultation Packages
              </h2>
              <p className="mt-4 text-slate-600 text-base max-w-xl mx-auto">
                Choose a structured plan that matches your health goals. We offer personalized paths to long-term healing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Package 1 */}
              <div className="bg-white rounded-[32px] p-8 border border-brand-gold-light/40 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between relative group">
                <div>
                  <span className="text-xs uppercase tracking-widest text-[#b46d1b] font-bold bg-[#FAF0E4] px-3.5 py-1.5 rounded-full border border-[#f5dfc6] inline-block mb-6">
                    Introductory
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-brand-green mb-2">Introductory Wellness Consult</h3>
                  <p className="text-sm text-slate-500 font-light mb-6">A comprehensive starting point for your Ayurvedic healing journey.</p>
                  <div className="text-3xl font-bold text-[#b89b65] font-serif mb-6 border-b border-slate-100 pb-6 flex items-baseline gap-2">
                    <span>1 Hour Session</span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Basic health assessment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Dosha analysis (Prakriti / Vikriti)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Initial personalized recommendations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Follow-up email with detailed consultation notes</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a href="/user/dashboard" className="w-full inline-block">
                    <button className="w-full py-4 bg-[#FAF6F0] hover:bg-brand-green text-brand-green hover:text-white font-bold rounded-2xl transition duration-300 border border-brand-gold-light/40">
                      Book Consult
                    </button>
                  </a>
                </div>
              </div>

              {/* Package 2 */}
              <div className="bg-white rounded-[32px] p-8 border-2 border-brand-gold shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between relative group">
                <div className="absolute -top-4 right-8 bg-brand-gold text-white font-bold text-[10px] uppercase tracking-wider py-1.5 px-4 rounded-full shadow-sm">
                  Recommended Journey
                </div>
                <div>
                  <span className="text-xs uppercase tracking-widest text-brand-green font-bold bg-[#eef3e5] px-3.5 py-1.5 rounded-full border border-brand-green/20 inline-block mb-6">
                    Complete Journey
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-brand-green mb-2">3-Session Wellness Journey</h3>
                  <p className="text-sm text-slate-500 font-light mb-6">Dr. Kajal's signature deep-dive program for progressive, sustained healing.</p>
                  <div className="text-3xl font-bold text-[#b89b65] font-serif mb-6 border-b border-slate-100 pb-6 flex items-baseline gap-2">
                    <span>3 Sessions</span>
                    <span className="text-xs text-slate-400 font-sans font-normal">/ over 4–6 weeks</span>
                  </div>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Three 45-minute structured sessions</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Full health & systemic analysis</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Custom diet, lifestyle & herbal support plans</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Progress review & plan adjustment</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-brand-green shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-600 font-medium">Direct Email / WhatsApp support between sessions</span>
                    </li>
                  </ul>
                </div>
                <div className="mt-8">
                  <a href="/user/dashboard" className="w-full inline-block">
                    <button className="w-full py-4 bg-brand-green hover:bg-brand-green-dark text-white font-bold rounded-2xl transition duration-300 shadow-md">
                      Begin Journey
                    </button>
                  </a>
                </div>
              </div>
            </div>

            {/* Ongoing Support Banner */}
            <div className="max-w-4xl mx-auto mt-12 bg-white rounded-3xl border border-brand-gold-light/40 p-6 flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full bg-[#fdf5e6] flex items-center justify-center text-brand-gold shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-brand-green text-lg">Ongoing Support</h4>
                  <p className="text-sm text-slate-500 font-light">Short 20-minute check-ins and extended sessions as needed for all returning clients.</p>
                </div>
              </div>
              <a href="/user/dashboard">
                <button className="px-6 py-3 bg-[#FAF6F0] hover:bg-brand-green text-brand-green hover:text-white font-semibold text-sm rounded-xl transition duration-200 shrink-0 border border-brand-gold-light/30">
                  Schedule Check-in
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Location & Service Areas */}
        <section className="py-12 md:py-20 px-4 md:px-8 bg-[#fafaf8] relative border-t border-[#f0eade]">
          <div className="max-w-[1300px] mx-auto relative bg-cover bg-center overflow-hidden rounded-[2.5rem] shadow-[0_8px_40px_rgba(0,0,0,0.04)]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1723307060937-b003478a2c03?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>

            {/* Vintage Soft Overlay */}
            <div className="absolute inset-0 bg-[#f9f5ed]/35 mix-blend-normal pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#fbf8f1]/50 via-transparent to-[#fbf8f1]/50 pointer-events-none" />

            {/* Bottom Left Leaves Overlay - Float over the box contents */}
            <div className="absolute bottom-0 left-0 w-[400px] h-[500px] opacity-80 z-30 pointer-events-none mix-blend-multiply">
              <Image src="/l12.png" fill className="object-contain object-bottom-left" alt="" />
            </div>

            <div className="relative z-20 px-6 py-16 md:p-16 lg:p-20 flex flex-col justify-between h-full">

              <div className="grid xl:grid-cols-12 gap-12 lg:gap-16 items-center w-full max-w-[1100px] mx-auto mb-10">

                {/* Left Column */}
                <div className="xl:col-span-5 text-left relative z-20">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#12372A]/20 bg-transparent text-[#12372A] font-bold text-[10px] uppercase tracking-[0.15em] mb-8">
                    <Globe className="w-3 h-3" />
                    GLOBAL ACCESSIBILITY
                  </div>

                  <h3 className="text-[40px] md:text-[50px] lg:text-[56px] font-serif font-bold text-[#12372A] leading-[1.05] tracking-tight">
                    Locations &<br />Service Areas
                  </h3>

                  {/* Divider */}
                  <div className="flex items-center gap-1 mb-8 mt-6">
                    <div className="h-[1.5px] bg-[#d5b98a] w-14" />
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#d5b98a] -ml-2">
                      <path d="M12 12L18 6M12 12L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 12L12 6M6 12L12 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  <p className="text-[#3a4f44] font-medium text-[15px] leading-[1.8] max-w-[400px]">
                    Ayurveechi is a global, online Ayurveda practice offering video consultations across international borders, making authentic healing simple and accessible.
                  </p>
                </div>

                {/* Right Column (Cards) */}
                <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6 relative z-20 mt-10 xl:mt-0">

                  {/* Card 1 */}
                  <div className="bg-white rounded-[2rem] p-8 border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative overflow-hidden group min-h-[420px]">
                    <div className="w-16 h-16 rounded-full bg-[#eef3e5] flex items-center justify-center text-[#12372A] mb-8 mt-2 border border-[#dce5cc]">
                      <Globe className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h4 className="font-bold text-[#12372A] text-[13px] uppercase tracking-widest leading-relaxed mb-3">Serving<br />Globally</h4>

                    <div className="flex items-center justify-center gap-1 w-12 mb-6">
                      <div className="h-[2px] bg-[#d3daba] w-3 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-[#d3daba] rounded-full" />
                      <div className="h-[2px] bg-[#d3daba] w-3 rounded-full" />
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed z-10 px-2 pb-16">India, Canada, USA,<br />UK, UAE, Australia,<br />and more.</p>

                    {/* Bottom Decor */}
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#eef3e5] to-[#f4f7ed]/20 flex items-end justify-center pb-6 pointer-events-none rounded-b-[2rem] opacity-70">
                      <svg viewBox="0 0 100 30" className="absolute bottom-8 w-[120%] h-8 stroke-dashed text-[#759f6d]/40 fill-none stroke-[2px]">
                        <path d="M-10,25 Q20,10 50,25 T110,15" strokeDasharray="4 4" />
                      </svg>
                      <div className="absolute bottom-6 right-6 w-6 h-6 rounded-full bg-[#759f6d] text-white flex items-center justify-center shadow-md">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-[2rem] p-8 border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative overflow-hidden group min-h-[420px]">
                    <div className="w-16 h-16 rounded-full bg-[#eef3e5] flex items-center justify-center text-[#12372A] mb-8 mt-2 border border-[#dce5cc]">
                      <Users className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h4 className="font-bold text-[#12372A] text-[13px] uppercase tracking-widest leading-relaxed mb-3">Languages<br />&nbsp;</h4>

                    <div className="flex items-center justify-center gap-1 w-12 mb-6">
                      <div className="h-[2px] bg-[#d3daba] w-3 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-[#d3daba] rounded-full" />
                      <div className="h-[2px] bg-[#d3daba] w-3 rounded-full" />
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed z-10 px-2 pb-16">Consultations are<br />conducted in<br />English and<br />Malayalam.</p>

                    {/* Bottom Decor */}
                    <div className="absolute bottom-0 left-0 right-0 h-[120px] pointer-events-none rounded-b-[2rem] overflow-hidden">
                      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute bottom-0 left-0 w-full h-full text-[#eef3e5]/70 fill-current">
                        <path d="M0,100 V60 Q30,30 60,70 T100,50 V100 Z" />
                      </svg>
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center w-full z-10 pl-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#759f6d] font-serif font-bold text-xl shadow-sm -mr-3 z-10 border-2 border-[#f4f7ed]">A</div>
                        <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[#759f6d] font-serif text-sm shadow-sm border-2 border-[#f4f7ed] z-0 mt-6">അ</div>
                      </div>
                    </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-[2rem] p-8 border border-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] flex flex-col items-center text-center relative overflow-hidden group min-h-[420px]">
                    <div className="w-16 h-16 rounded-full bg-[#fdf5e6] flex items-center justify-center text-[#c89d4f] mb-8 mt-2 border border-[#f8ebce]">
                      <Calendar className="w-7 h-7 stroke-[1.5]" />
                    </div>
                    <h4 className="font-bold text-[#12372A] text-[13px] uppercase tracking-widest leading-relaxed mb-3">Time-Zone<br />Friendly</h4>

                    <div className="flex items-center justify-center gap-1 w-12 mb-6">
                      <div className="h-[2px] bg-[#f0e3c5] w-3 rounded-full" />
                      <div className="w-1.5 h-1.5 bg-[#f0e3c5] rounded-full" />
                      <div className="h-[2px] bg-[#f0e3c5] w-3 rounded-full" />
                    </div>

                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed z-10 px-2 pb-16">Flexible booking<br />options supporting<br />IST, PST, EST, and<br />GMT.</p>

                    {/* Bottom Decor */}
                    <div className="absolute bottom-0 left-0 right-0 h-[140px] pointer-events-none rounded-b-[2rem] overflow-hidden">
                      <div className="absolute bottom-0 right-0 w-[90%] h-[90%] bg-[#fdf5e6]/80 rounded-tl-[100px]"></div>
                      <div className="absolute bottom-6 right-6 w-11 h-11 rounded-full border-[1.5px] border-[#c89d4f] text-[#c89d4f] flex items-center justify-center bg-white shadow-sm z-10">
                        <Clock className="w-[22px] h-[22px] stroke-[1.5]" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom Bar */}
              <div className="w-fit mx-auto bg-[#FAF6F0]/95 backdrop-blur-md border border-white/60 rounded-full py-3.5 px-8 flex items-center justify-center gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative z-20">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 border border-[#f0eade]">
                  <GiLotus className="w-5 h-5 text-[#4e6b52]" />
                </div>
                <div className="w-px h-6 bg-[#12372A]/10 shrink-0"></div>
                <p className="text-[#3a4f44] font-medium text-[15px] leading-normal text-center">
                  Compassionate care. <span className="font-serif italic font-bold text-[#12372A]">Wherever you are.</span>
                </p>
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
        <Navbar />


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
                src="https://res.cloudinary.com/dhgy1gxa6/image/upload/v1782295720/dre_opr5jb.png"
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
              HEALTH CONCERNS ADDRESSED
            </span>
            <h2 className="text-2xl font-serif font-bold text-[#12372A] leading-tight">
              Specialized Care For
              <br />
              <span className="text-[#C5A880]">Your Wellness</span>
            </h2>
          </div>

          {/* Cards Grid (2 columns on mobile) */}
          <div className="grid grid-cols-2 gap-3.5 px-4 mb-4 max-w-lg mx-auto">
            {concerns.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.name}
                  className={`bg-gradient-to-b ${item.theme.cardBg} rounded-[20px] overflow-hidden border border-brand-gold-light/10 shadow-xs flex flex-col justify-between min-h-[220px] group`}
                >
                  <div className="p-3 pb-0 flex-grow flex flex-col">
                    {/* Icon */}
                    <div className={`w-8 h-8 rounded-full ${item.theme.iconBg} flex items-center justify-center text-white shadow-xs mb-2 flex-shrink-0`}>
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Title */}
                    <h3 className="text-[11px] font-serif font-bold text-brand-green mb-1 leading-snug">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-[9px] text-slate-600 leading-snug font-light line-clamp-2">
                      {item.detail}
                    </p>
                  </div>

                  {/* Bottom Image */}
                  <div className="relative w-full h-[90px] mt-2 overflow-hidden rounded-b-[20px]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                      sizes="35vw"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>



        {/* Mobile Why Choose Us */}
        <section className="py-6 px-4 bg-white text-center border-b border-[#F4EAE1]/30">
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#12372A]/20 text-[#12372A] font-semibold text-[8px] uppercase tracking-wider mb-2">
              WHY AYURVEECHI
            </span>
            <h2 className="text-xl font-serif font-bold text-[#12372A] leading-tight">
              Healing Rooted in Nature
            </h2>
          </div>

          <div className="flex flex-col gap-2 max-w-sm mx-auto">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div key={idx} className="bg-[#FAF6F0]/40 rounded-xl p-3 border border-[#F4EAE1]/50 text-left flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full border border-[#C5A880]/30 flex items-center justify-center bg-white text-[#C5A880] shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-[11px] font-serif font-bold text-[#12372A] leading-none mb-1">{benefit.title}</h3>
                    <p className="text-[8px] text-slate-600 font-light leading-snug">{benefit.desc}</p>
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
                        src="https://res.cloudinary.com/dhgy1gxa6/image/upload/v1782295720/dre_opr5jb.png"
                        alt="Dr. Kajal"
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
                    Dr. Kajal
                  </h4>

                  <div className="inline-flex items-center gap-1 bg-[#f4f7ed] rounded-full px-2 py-0.5 mt-1 border border-[#12372A]/5">
                    <ShieldCheck className="w-2.5 h-2.5 text-[#12372A]" />
                    <span className="font-bold text-[7px] text-[#12372A]">
                      BAMS | CERTIFIED AYURVEDA PRACTITIONER
                    </span>
                  </div>

                  <p className="text-[9px] text-gray-600 leading-relaxed font-light mt-2">
                    Dr. Kajal is a certified Ayurveda practitioner dedicated to bringing balance, healing, and wellness into people's lives using time-tested Ayurvedic principles.
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

        {/* Mobile Consultation Packages */}
        <section className="py-6 px-4 bg-[#FAF6F0]/30 border-t border-b border-[#F4EAE1]/30">
          <div className="text-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-[#12372A]/20 text-[#12372A] font-semibold text-[8px] uppercase tracking-wider mb-2">
              STRUCTURED PLANS
            </span>
            <h2 className="text-xl font-serif font-bold text-[#12372A] leading-tight">
              Consultation Packages
            </h2>
          </div>

          <div className="flex flex-col gap-4 max-w-sm mx-auto">
            {/* Pack 1 */}
            <div className="bg-white rounded-2xl p-4 border border-[#F4EAE1]/85 shadow-xs text-left">
              <span className="text-[7px] uppercase tracking-wider text-[#b46d1b] font-bold bg-[#FAF0E4] px-2 py-1 rounded-full border border-[#f5dfc6] inline-block mb-2">
                Introductory
              </span>
              <h3 className="text-xs font-serif font-bold text-[#12372A]">Introductory Wellness Consult</h3>
              <p className="text-[8px] text-slate-500 font-light mt-1 mb-2">A comprehensive starting point for your Ayurvedic healing journey.</p>
              <p className="text-sm font-serif font-bold text-[#b89b65] border-b border-slate-50 pb-2 mb-2">1 Hour Session</p>
              <ul className="space-y-1 text-[8px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Basic health assessment</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Dosha analysis</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Initial recommendations</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Follow-up email notes</li>
              </ul>
              <a href="/user/dashboard" className="w-full inline-block mt-3">
                <button className="w-full py-2 bg-[#FAF6F0] hover:bg-[#12372A] text-[#12372A] hover:text-white text-[9px] font-bold rounded-lg border border-[#F4EAE1]/80 transition">
                  Book Consult
                </button>
              </a>
            </div>

            {/* Pack 2 */}
            <div className="bg-white rounded-2xl p-4 border-2 border-[#C5A880] shadow-xs text-left relative">
              <div className="absolute top-2 right-2 bg-[#C5A880] text-white font-bold text-[6px] uppercase tracking-wider py-0.5 px-2 rounded-full">
                Recommended
              </div>
              <span className="text-[7px] uppercase tracking-wider text-[#12372A] font-bold bg-[#eef3e5] px-2 py-1 rounded-full border border-[#12372A]/10 inline-block mb-2">
                Complete Journey
              </span>
              <h3 className="text-xs font-serif font-bold text-[#12372A]">3-Session Wellness Journey</h3>
              <p className="text-[8px] text-slate-500 font-light mt-1 mb-2">Dr. Kajal's signature deep-dive program for sustained healing.</p>
              <p className="text-sm font-serif font-bold text-[#b89b65] border-b border-slate-50 pb-2 mb-2">3 Sessions <span className="text-[8px] font-sans font-normal text-slate-400">/ 4-6 weeks</span></p>
              <ul className="space-y-1 text-[8px] text-slate-600 font-medium">
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Three 45-minute sessions</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Full health analysis</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Custom diet & lifestyle plan</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Herbal & progress review</li>
                <li className="flex items-center gap-1.5"><CheckCircle className="w-3 h-3 text-[#12372A]" /> Email/WhatsApp support</li>
              </ul>
              <a href="/user/dashboard" className="w-full inline-block mt-3">
                <button className="w-full py-2 bg-[#12372A] hover:bg-[#0A1E17] text-white text-[9px] font-bold rounded-lg transition">
                  Begin Journey
                </button>
              </a>
            </div>
          </div>
        </section>

        {/* Mobile Location & Service Areas */}
        <section className="py-8 px-4 bg-[#fafaf8] relative border-t border-b border-[#f0eade]">
          <div className="max-w-[400px] mx-auto relative bg-cover bg-center overflow-hidden rounded-[2.2rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1723307060937-b003478a2c03?q=80&w=1728&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>

            {/* Vintage Soft Overlay */}
            <div className="absolute inset-0 bg-[#f9f5ed]/35 mix-blend-normal pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#fbf8f1]/50 via-transparent to-[#fbf8f1]/50 pointer-events-none" />

            <div className="relative z-20 px-5 py-10 flex flex-col justify-between h-full">

              {/* Text Section */}
              <div className="text-left relative z-20 mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#12372A]/10 bg-white/80 text-[#12372A] font-bold text-[9px] uppercase tracking-[0.12em] mb-5 shadow-xs">
                  <Globe className="w-2.5 h-2.5 text-[#759f6d]" />
                  GLOBAL ACCESSIBILITY
                </div>

                <h3 className="text-[32px] font-serif font-bold text-[#12372A] leading-[1.1] tracking-tight">
                  Locations &<br />Service Areas
                </h3>

                {/* Divider */}
                <div className="flex items-center gap-1 mb-6 mt-4">
                  <div className="h-[1.5px] bg-[#d5b98a] w-20" />
                  {/* A beautiful gold leaf/branch ornament matching the mobile design */}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-[#d5b98a] -ml-1">
                    <path d="M2 12H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <path d="M12 12C14.5 9.5 17 9 19 10C17.5 12 15 13.5 12 12Z" fill="currentColor" />
                    <path d="M10 10C11.5 7.5 13.5 7 15 8C13.8 9.6 12 10.8 10 10Z" fill="currentColor" />
                    <path d="M13 14C14.5 16.5 16.5 17 18 16C16.8 14.4 15 13.2 13 14Z" fill="currentColor" />
                  </svg>
                </div>

                <p className="text-[#3a4f44] font-medium text-[13px] leading-[1.7] max-w-[320px] mb-8">
                  Ayurveechi is a global, online Ayurveda practice offering video consultations across international borders, making authentic healing simple and accessible.
                </p>

                {/* Mobile leaf overlay - placed under the text exactly like the mobile design */}
                <div className="absolute -bottom-6 left-0 w-[95px] h-[105px] opacity-95 pointer-events-none mix-blend-multiply">
                  <Image src="/l12.png" fill className="object-contain object-bottom-left" alt="" />
                </div>
              </div>

              {/* Cards Grid */}
              <div className="flex flex-col gap-4 relative z-20 mb-8">

                {/* Card 1 */}
                <div className="bg-white rounded-[1.8rem] p-4 border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.015)] flex flex-row items-center text-left relative overflow-hidden min-h-[110px] gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center text-[#12372A] shrink-0 border border-[#dce5cc]">
                    <Globe className="w-5.5 h-5.5 stroke-[1.5]" />
                  </div>

                  <div className="flex-1 flex flex-col items-start z-10 pb-6">
                    <h4 className="font-bold text-[#12372A] text-[11px] uppercase tracking-wider leading-none mb-1">Serving Globally</h4>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                      India, Canada, USA, UK, UAE, Australia, and more.
                    </p>
                  </div>

                  {/* Bottom Decor */}
                  <div className="absolute bottom-0 right-0 w-[120px] h-[65px] pointer-events-none overflow-hidden rounded-br-[1.8rem]">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-[#eef3e5]/60 fill-current">
                      <path d="M0,100 C30,85 60,65 100,85 V100 Z" />
                    </svg>
                    <svg viewBox="0 0 100 50" className="absolute bottom-4 left-2 w-[70%] h-5 stroke-dashed text-[#759f6d]/50 fill-none stroke-[2px] z-10">
                      <path d="M5,40 Q40,15 75,30 T95,15" strokeDasharray="3 3" />
                    </svg>
                    <div className="absolute bottom-3 right-3 text-[#759f6d] z-20">
                      <MapPin className="w-4 h-4 fill-white stroke-[2]" />
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-[1.8rem] p-4 border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.015)] flex flex-row items-center text-left relative overflow-hidden min-h-[110px] gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#eef3e5] flex items-center justify-center text-[#12372A] shrink-0 border border-[#dce5cc]">
                    <Users className="w-5.5 h-5.5 stroke-[1.5]" />
                  </div>

                  <div className="flex-1 flex flex-col items-start z-10 pb-6">
                    <h4 className="font-bold text-[#12372A] text-[11px] uppercase tracking-wider leading-none mb-1">Languages</h4>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                      Consultations are conducted in English and Malayalam.
                    </p>
                  </div>

                  {/* Bottom Decor */}
                  <div className="absolute bottom-0 right-0 w-[120px] h-[65px] pointer-events-none overflow-hidden rounded-br-[1.8rem]">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-[#eef3e5]/60 fill-current">
                      <path d="M0,100 C30,85 60,65 100,85 V100 Z" />
                    </svg>
                    <div className="absolute bottom-2 right-3 flex items-center z-20">
                      <div className="w-6.5 h-6.5 rounded-full bg-white flex items-center justify-center text-[#759f6d] font-serif font-bold text-xs shadow-xs border border-[#eef3e5] z-10">A</div>
                      <div className="w-5.5 h-5.5 rounded-full bg-[#e8efdd] flex items-center justify-center text-[#759f6d] font-serif text-[8px] shadow-xs border border-white -ml-1 mt-2.5 z-0">അ</div>
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-[1.8rem] p-4 border border-white/60 shadow-[0_6px_20px_rgba(0,0,0,0.015)] flex flex-row items-center text-left relative overflow-hidden min-h-[110px] gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#fdf5e6] flex items-center justify-center text-[#c89d4f] shrink-0 border border-[#f8ebce]">
                    <Calendar className="w-5.5 h-5.5 stroke-[1.5]" />
                  </div>

                  <div className="flex-1 flex flex-col items-start z-10 pb-6">
                    <h4 className="font-bold text-[#12372A] text-[11px] uppercase tracking-wider leading-none mb-1">Time-Zone Friendly</h4>
                    <p className="text-[12px] text-slate-500 font-medium leading-relaxed">
                      Flexible booking options supporting IST, PST, EST, and GMT.
                    </p>
                  </div>

                  {/* Bottom Decor */}
                  <div className="absolute bottom-0 right-0 w-[120px] h-[65px] pointer-events-none overflow-hidden rounded-br-[1.8rem]">
                    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full text-[#fdf5e6]/70 fill-current">
                      <path d="M0,100 C30,85 60,65 100,85 V100 Z" />
                    </svg>
                    <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full border border-[#c89d4f] text-[#c89d4f] flex items-center justify-center bg-white shadow-xs z-20">
                      <Clock className="w-4.5 h-4.5 stroke-[1.8]" />
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Bar */}
              <div className="w-auto max-w-[260px] mx-auto bg-[#FAF6F0]/95 backdrop-blur-md border border-white/60 rounded-2xl py-2 px-3.5 flex items-center justify-center gap-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.015)] relative z-20">
                <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs shrink-0 border border-[#f0eade]">
                  <GiLotus className="w-4 h-4 text-[#4e6b52]" />
                </div>
                <div className="w-px h-6 bg-[#12372A]/10 shrink-0"></div>
                <p className="text-[#3a4f44] font-medium text-[11px] leading-snug text-center">
                  Compassionate care. <span className="block font-serif italic font-bold text-[#12372A]">Wherever you are.</span>
                </p>
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
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeTestimonial === index ? "bg-[#12372A] w-3" : "bg-slate-200"
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
