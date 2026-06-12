// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createAuthClient } from "better-auth/react";

// const auth = createAuthClient();

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const router = useRouter();

//   useEffect(() => {
//     async function loadUser() {
//       try {
//         const session = await auth.getSession();

//         const userData =
//           session?.data?.user ||
//           session?.data?.session?.user ||
//           session?.session?.user ||
//           session?.user ||
//           null;

//         if (!userData) {
//           router.push("/login");
//         } else {
//           setUser(userData);
//         }
//       } catch (err) {
//         console.error("Error getting session:", err);
//         router.push("/login");
//       }
//     }

//     loadUser();
//   }, [router]);

//   if (!user) return <p>Loading...</p>;
// return (
//   <div className="min-h-screen bg-[#f3f0e6] flex">
//     {/* SIDEBAR */}
//     <aside className="hidden lg:flex w-72 bg-gradient-to-b from-[#012e1f] via-[#013626] to-[#001a12] text-white flex-col p-6">
//       <div>
//         <h1 className="text-5xl font-serif text-[#d9b56d]">
//           Ayur
//         </h1>

//         <p className="text-sm text-gray-300 mt-2">
//           Ancient Wisdom. Modern Care.
//         </p>
//       </div>

//       <div className="mt-12 space-y-3">
//         {[
//           "Dashboard",
//           "Book Appointment",
//           "My Appointments",
//           "Doctors",
//           "Treatments",
//           "Ayurveda Guide",
//           "Health Tips",
//           "About Us",
//         ].map((item, i) => (
//           <button
//             key={i}
//             className={`w-full text-left px-5 py-4 rounded-2xl transition ${
//               i === 0
//                 ? "bg-[#2f5c34]"
//                 : "hover:bg-white/10"
//             }`}
//           >
//             {item}
//           </button>
//         ))}
//       </div>

//       <div className="mt-auto">
//         <div className="border border-[#d9b56d]/20 rounded-3xl p-6">
//           <p className="text-[#d9b56d] italic">
//             “A healthy outside starts
//             from the inside.”
//           </p>

//           <p className="text-gray-400 mt-4 text-sm">
//             Ancient Ayurveda
//           </p>
//         </div>
//       </div>
//     </aside>

//     {/* CONTENT */}
//     <main className="flex-1 p-4 lg:p-6">
//       {/* TOP BAR */}
//       <div className="bg-[#faf8f1] rounded-[30px] shadow-lg px-6 py-4 flex justify-between items-center">
//         <div>
//           <p className="text-gray-500">
//             Welcome back,
//           </p>

//           <h2 className="text-3xl font-bold text-[#1c5135]">
//             {user.name || user.email}
//           </h2>
//         </div>

//         <div className="hidden md:block">
//           <input
//             type="text"
//             placeholder="Search for treatments..."
//             className="w-96 bg-white rounded-full px-6 py-3 border outline-none"
//           />
//         </div>
//       </div>

//       {/* HERO */}
//       <section className="mt-6 bg-gradient-to-r from-[#efe7d4] via-[#f5f0e2] to-[#e9e4d7] rounded-[40px] overflow-hidden">
//         <div className="grid lg:grid-cols-2 gap-8 p-10">
//           <div>
//             <h1 className="text-6xl leading-tight font-serif text-[#173a2b]">
//               Rooted in Nature,
//               <br />
//               Dedicated to
//               <br />
//               Your Wellness
//             </h1>

//             <p className="mt-6 text-lg text-gray-700 max-w-lg">
//               Ayurveda is not just treatment,
//               it's a way of life. Let us help
//               you heal naturally and
//               holistically.
//             </p>

//             <div className="flex gap-4 mt-8">
//               <button className="bg-[#0b5d3b] text-white px-8 py-4 rounded-full">
//                 Book Appointment
//               </button>

//               <button className="border border-[#c9a86a] text-[#0b5d3b] px-8 py-4 rounded-full">
//                 View Appointments
//               </button>
//             </div>

//             <div className="mt-8 bg-white rounded-2xl p-4 w-fit shadow">
//               <p className="font-semibold">
//                 500+ Happy Patients
//               </p>

//               <p className="text-gray-500 text-sm">
//                 Trusted by thousands
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center justify-center">
//             <div className="w-full h-[400px] rounded-[30px] bg-gradient-to-br from-[#29583b] via-[#6e8e57] to-[#d6c19b] flex items-center justify-center">
//               <span className="text-white text-2xl">
//                 Your Ayurveda Image Here
//               </span>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CARDS */}
//       <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
//         {[
//           "Book Appointment",
//           "My Appointments",
//           "Ayurveda Guide",
//           "Wellness Tips",
//         ].map((card, i) => (
//           <div
//             key={i}
//             className="bg-[#faf8f1] rounded-[30px] p-6 shadow-lg"
//           >
//             <div className="w-16 h-16 rounded-full bg-green-100"></div>

//             <h3 className="mt-6 text-2xl font-semibold text-[#173a2b]">
//               {card}
//             </h3>

//             <p className="mt-4 text-gray-600">
//               Explore Ayurvedic services and
//               wellness solutions.
//             </p>

//             <button className="mt-8 border border-[#0b5d3b] px-6 py-2 rounded-full text-[#0b5d3b]">
//               Open
//             </button>
//           </div>
//         ))}
//       </section>

//       {/* BOTTOM BAR */}
//       <section className="mt-8 bg-gradient-to-r from-[#012e1f] via-[#0b5d3b] to-[#012e1f] rounded-[30px] text-white p-8">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
//           <div>
//             <h3 className="text-3xl font-bold">
//               100%
//             </h3>
//             <p>Natural</p>
//           </div>

//           <div>
//             <h3 className="text-3xl font-bold">
//               500+
//             </h3>
//             <p>Patients</p>
//           </div>

//           <div>
//             <h3 className="text-3xl font-bold">
//               Expert
//             </h3>
//             <p>Doctors</p>
//           </div>

//           <div>
//             <h3 className="text-3xl font-bold">
//               Trusted
//             </h3>
//             <p>Care</p>
//           </div>
//         </div>
//       </section>
//     </main>
//   </div>
// );
// }



"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";
import {
  LayoutDashboard,
  CalendarPlus,
  CalendarDays,
  Stethoscope,
  FlaskConical,
  BookOpen,
  Lightbulb,
  Info,
  LogOut,
  Search,
  Users,
  Shield,
  Heart,
  Leaf,
  Quote,
  Sparkles,
  Clock,
  CheckCircle,
  Award,
  Star,
  Flower2,
  User,
  TrendingUp,
  Smile,
  ClipboardList,
  Globe,
  Sun
} from "lucide-react";
import { GiLotus, GiHerbsBundle, GiHealing, GiSpaMassage, GiMeditation, GiYoga, GiHealthNormal } from "react-icons/gi";

const auth = createAuthClient();

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      try {
        const session = await auth.getSession();

        const userData =
          session?.data?.user ||
          session?.data?.session?.user ||
          session?.session?.user ||
          session?.user ||
          null;

        if (!userData) {
          router.push("/login");
        } else {
          setUser(userData);
        }
      } catch (err) {
        console.error("Error getting session:", err);
        router.push("/login");
      }
    }

    loadUser();
  }, [router]);

  if (!user) return (
    <div className="min-h-screen bg-[#f3f0e6] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#0b5d3b] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#0b5d3b] font-medium">Loading your wellness journey...</p>
      </div>
    </div>
  );

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, active: true },
    { name: "Book Appointment", icon: CalendarPlus },
    { name: "My Appointments", icon: CalendarDays },
    { name: "Doctors", icon: Stethoscope },
    { name: "Treatments", icon: GiHerbsBundle },
    { name: "Ayurveda Guide", icon: BookOpen },
    { name: "Health Tips", icon: Lightbulb },
    { name: "About Us", icon: Info }
  ];

  const featureCards = [
    {
      title: "Book Appointment",
      icon: CalendarPlus,
      desc: "Schedule your consultation with our expert Ayurvedic doctors.",
      action: "Book Now",
      color: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100"
    },
    {
      title: "My Appointments",
      icon: CalendarDays,
      desc: "View and manage your upcoming and past appointments.",
      action: "View Appointments",
      color: "from-amber-50 to-yellow-50",
      iconBg: "bg-amber-100"
    },
    {
      title: "Ayurveda Guide",
      icon: BookOpen,
      desc: "Learn about Ayurvedic treatments, therapies and living.",
      action: "Explore Guide",
      color: "from-teal-50 to-green-50",
      iconBg: "bg-teal-100"
    },
    {
      title: "Wellness Tips",
      icon: Lightbulb,
      desc: "Daily tips for a balanced mind, body and soul.",
      action: "Read Tips",
      color: "from-orange-50 to-amber-50",
      iconBg: "bg-orange-100"
    }
  ];

  return (
    <div className="min-h-screen bg-[#f3f0e6] flex">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-gradient-to-b from-[#012e1f] via-[#013626] to-[#001a12] text-white flex-col p-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <GiLotus className="w-8 h-8 text-[#d9b56d]" />
            <h1 className="text-5xl font-serif text-[#d9b56d]">
              Ayur
            </h1>
          </div>
          <p className="text-sm text-gray-300 mt-2">
            Ancient Wisdom. Modern Care.
          </p>
        </div>

        <div className="mt-12 space-y-2">
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                className={`w-full text-left px-5 py-3 rounded-2xl transition flex items-center gap-3 ${item.active
                    ? "bg-[#2f5c34] text-white"
                    : "hover:bg-white/10 text-gray-200"
                  }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-auto">
          <div className="border border-[#d9b56d]/20 rounded-3xl p-5 bg-white/5 backdrop-blur-sm">
            <Quote className="w-6 h-6 text-[#d9b56d] mb-3" />
            <p className="text-[#d9b56d] italic text-sm leading-relaxed">
              "A healthy outside starts from the inside."
            </p>
            <p className="text-gray-400 mt-3 text-xs">
              - Ancient Ayurveda
            </p>
          </div>

          <button className="w-full text-left px-5 py-3 rounded-2xl transition hover:bg-white/10 text-gray-200 flex items-center gap-3 mt-4">
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
        {/* TOP BAR */}
        <div className="bg-[#faf8f1] rounded-[30px] shadow-lg px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-gray-500 text-sm flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d9b56d]" />
              Welcome back,
            </p>
            <h2 className="text-3xl font-bold text-[#1c5135] flex items-center gap-2">
              {user.name || user.email}
              <Leaf className="w-6 h-6 text-green-600" />
            </h2>
          </div>

          <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search for treatments, doctors, tips..."
                className="w-96 bg-white rounded-full px-12 py-3 border outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>
        </div>

        {/* HERO SECTION */}
        <section className="mt-6 bg-gradient-to-r from-[#efe7d4] via-[#f5f0e2] to-[#e9e4d7] rounded-[40px] overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-8 p-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-12 bg-[#d9b56d]"></div>
                <span className="text-[#d9b56d] text-sm font-medium">ANCIENT WISDOM</span>
              </div>
              <h1 className="text-6xl leading-tight font-serif text-[#173a2b]">
                Rooted in Nature,
                <br />
                Dedicated to
                <br />
                Your Wellness
              </h1>

              <p className="mt-6 text-lg text-gray-700 max-w-lg leading-relaxed">
                Ayurveda is not just treatment, it's a way of life. Let us help
                you heal naturally and holistically.
              </p>

              {/* Quote Card */}
              <div className="mt-6 bg-white/70 backdrop-blur-sm rounded-2xl p-4 max-w-md border-l-4 border-[#d9b56d]">
                <Quote className="w-5 h-5 text-[#d9b56d] mb-2" />
                <p className="text-gray-700 italic text-sm">
                  "Let food be thy medicine and medicine be thy food."
                </p>
                <p className="text-xs text-gray-500 mt-1">- Charaka Samhita</p>
              </div>

              <div className="flex gap-4 mt-8">
                <button className="bg-[#0b5d3b] text-white px-8 py-4 rounded-full flex items-center gap-2 hover:bg-[#0a4a30] transition">
                  <CalendarPlus className="w-5 h-5" />
                  Book Appointment
                </button>

                <button className="border border-[#c9a86a] text-[#0b5d3b] px-8 py-4 rounded-full flex items-center gap-2 hover:bg-white/50 transition">
                  <CalendarDays className="w-5 h-5" />
                  View My Appointments
                </button>
              </div>

              {/* Stats Row */}
              <div className="flex gap-6 mt-8">
                <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-md">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#173a2b]">500+</p>
                    <p className="text-gray-500 text-xs">Happy Patients</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white rounded-2xl p-3 shadow-md">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-[#173a2b]">Trusted</p>
                    <p className="text-gray-500 text-xs">by thousands</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="w-full h-[450px] rounded-[30px] bg-gradient-to-br from-[#29583b] via-[#6e8e57] to-[#d6c19b] flex flex-col items-center justify-center relative overflow-hidden">
                <GiLotus className="w-28 h-28 text-white/80 mb-4" />
                <div className="text-center text-white">
                  <p className="text-lg font-serif italic">Ancient Wisdom</p>
                  <p className="text-sm mt-1">Modern Healing</p>
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white/20 backdrop-blur-md rounded-2xl p-3">
                  <div className="flex items-center justify-center gap-3 text-white text-sm">
                    <Heart className="w-4 h-4" />
                    <span>Holistic Healing Since 2010</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FEATURE CARDS */}
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">
          {featureCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <div
                key={i}
                className="bg-[#faf8f1] rounded-[30px] p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-16 h-16 rounded-full ${card.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-green-700" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold text-[#173a2b]">
                  {card.title}
                </h3>

                <p className="mt-3 text-gray-600 text-sm leading-relaxed">
                  {card.desc}
                </p>

                <button className="mt-6 border border-[#0b5d3b] px-5 py-2 rounded-full text-[#0b5d3b] text-sm hover:bg-[#0b5d3b] hover:text-white transition">
                  {card.action}
                </button>
              </div>
            );
          })}
        </section>

        {/* ABOUT SECTION */}
        <section className="mt-8 bg-white rounded-[40px] overflow-hidden shadow-lg">
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="p-10 bg-gradient-to-br from-[#faf8f1] to-white">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-[2px] w-12 bg-[#d9b56d]"></div>
                <span className="text-[#d9b56d] text-sm font-medium">ABOUT US</span>
              </div>

              <h2 className="text-4xl font-serif text-[#173a2b] mb-4">
                About Dr. Priya Menon
              </h2>

              <p className="text-gray-600 italic text-lg mb-4 leading-relaxed">
                "Healing is not just about treating illness, but nurturing the body, mind and soul."
              </p>

              <p className="text-gray-700 leading-relaxed">
                Dr. Priya Menon is a general physician with over 10 years of
                experience, passionate about accessible digital healthcare.
                Our mission is to make healthcare simple, transparent, and
                available anywhere through secure online consultations.
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-green-50">
                  <Heart className="w-5 h-5 text-green-700" />
                  <div>
                    <p className="font-semibold text-sm text-[#173a2b]">Natural Healing</p>
                    <p className="text-xs text-gray-500">Holistic & safe treatments</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-amber-50">
                  <Stethoscope className="w-5 h-5 text-amber-700" />
                  <div>
                    <p className="font-semibold text-sm text-[#173a2b]">Expert Doctors</p>
                    <p className="text-xs text-gray-500">Qualified professionals</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-teal-50">
                  <User className="w-5 h-5 text-teal-700" />
                  <div>
                    <p className="font-semibold text-sm text-[#173a2b]">Personalized Care</p>
                    <p className="text-xs text-gray-500">Tailored to your needs</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-purple-50">
                  <Shield className="w-5 h-5 text-purple-700" />
                  <div>
                    <p className="font-semibold text-sm text-[#173a2b]">Secure & Private</p>
                    <p className="text-xs text-gray-500">100% confidential</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#012e1f] to-[#001a12] p-10 flex flex-col justify-center items-center text-white">
              <div className="w-32 h-32 rounded-full bg-[#d9b56d]/20 flex items-center justify-center mb-6">
                <GiLotus className="w-16 h-16 text-[#d9b56d]" />
              </div>
              <blockquote className="text-center">
                <Quote className="w-8 h-8 text-[#d9b56d] mx-auto mb-4" />
                <p className="text-2xl font-serif italic leading-relaxed">
                  "The art of healing comes from nature, not from the physician."
                </p>
                <p className="mt-6 text-[#d9b56d] font-medium">
                  - Dr. Priya Menon
                </p>
              </blockquote>
            </div>
          </div>
        </section>

        {/* BOTTOM STATS BAR */}
        <section className="mt-8 bg-gradient-to-r from-[#012e1f] via-[#0b5d3b] to-[#012e1f] rounded-[30px] text-white p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <BookOpen className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold">Ancient</h3>
              <p className="text-gray-200 text-sm">Wisdom</p>
              <p className="text-xs text-gray-300 mt-1">Backed by Science</p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold">100%</h3>
              <p className="text-gray-200 text-sm">Natural</p>
              <p className="text-xs text-gray-300 mt-1">Safe & Effective</p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold">500+</h3>
              <p className="text-gray-200 text-sm">Patients</p>
              <p className="text-xs text-gray-300 mt-1">Trusted by Many</p>
            </div>

            <div>
              <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="text-3xl font-bold">Expert</h3>
              <p className="text-gray-200 text-sm">Care</p>
              <p className="text-xs text-gray-300 mt-1">Qualified Doctors</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}