"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient as auth } from "@/lib/auth-client";
import {
  CalendarPlus,
  CalendarDays,
  ClipboardList,
  Calendar,
  Clock,
  Video,
  ArrowRight,
  Leaf,
  Bell,
  Droplets,
  Activity,
  Utensils,
  Moon,
  Coffee,
  Book,
  Smile,
  Heart
} from "lucide-react";
import { GiLotus } from "react-icons/gi";
import Image from "next/image";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [nextAppointment, setNextAppointment] = useState(null);
  const [loadingAppts, setLoadingAppts] = useState(true);
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

  useEffect(() => {
    if (!user) return;

    async function fetchAppointments() {
      try {
        const res = await fetch("/api/user/appointments", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          // Find the next scheduled appointment that isn't expired
          const upcoming = data
            .filter(a => a.status === "SCHEDULED" && !a.meetingExpired)
            .sort((a, b) => new Date(a.time) - new Date(b.time))[0];
          setNextAppointment(upcoming || null);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      } finally {
        setLoadingAppts(false);
      }
    }

    fetchAppointments();
  }, [user]);

  if (!user) return (
    <div className="min-h-screen bg-[#f4f1e8] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-[#5a7258] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#5a7258] font-medium">Loading your wellness journey...</p>
      </div>
    </div>
  );

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    return new Date(dateStr).toLocaleDateString('en-US', options);
  };

  // Helper to format time
  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    return new Date(timeStr).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f4f1e8] text-[#3e4a3d] font-sans relative overflow-hidden pb-10">
      <style dangerouslySetInnerHTML={{
        __html: `
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
        .font-hand { font-family: 'Caveat', cursive; }
        .font-serif-display { font-family: 'Playfair Display', serif; }
        .paper-texture {
            background-color: #fdfdfa;
            background-image: url("https://www.transparenttextures.com/patterns/clean-textile.png");
            box-shadow: 2px 4px 15px rgba(0,0,0,0.03);
        }
      `}} />

      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12">
        <a href="/user/dashboard" className="flex items-center gap-2 hover:opacity-90 transition">
          <Leaf className="text-[#5a7258] w-8 h-8" />
          <div>
            <h1 className="text-2xl font-serif-display font-bold text-[#3e4a3d] tracking-tight">Ayur</h1>
            <p className="text-[10px] uppercase tracking-wider text-[#6b7a68]">Ancient Wisdom. Modern Care.</p>
          </div>
        </a>
        <div className="hidden md:flex text-3xl font-hand text-[#6b7a68]">
          {getGreeting()}, {user.name || user.email?.split('@')[0]} 👋
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#e0dcd0] rounded-full overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
            <Smile className="text-[#6b7a68] w-6 h-6" />
          </div>
          <button className="p-2 rounded-full hover:bg-black/5 relative">
            <Bell className="w-5 h-5 text-[#6b7a68]" />
            <span className="absolute top-1.5 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#f4f1e8]"></span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 mt-4">
        {/* Top Hero Section */}
        <div className="relative flex flex-col md:flex-row justify-between mb-12">
          {/* Left text */}
          <div className="max-w-md z-10 pt-8">
            <h2 className="text-6xl lg:text-7xl font-hand leading-tight text-[#2b3a2f]">
              Welcome back,<br />{user.name || user.email?.split('@')[0]}
            </h2>
            <div className="mt-6 flex items-start gap-4 text-[#5a7258]">
              <div className="hidden sm:block">
                <GiLotus className="w-8 h-8 opacity-60" />
              </div>
              <p className="text-sm font-medium leading-relaxed">
                Take care of your body.<br />It's the only place you have to live.
              </p>
            </div>
            {/* Next Appointment Card (Torn Paper look) */}
            <div className="mt-10 paper-texture rounded-sm p-6 relative w-80 transform -rotate-2 border border-[#e8e4d9] overflow-hidden">
              {loadingAppts ? (
                <div className="py-4 text-center text-sm text-[#6b7a68]">Checking appointments...</div>
              ) : nextAppointment ? (
                <div className="flex gap-4 items-start relative z-10">
                  <div className="bg-[#e8e4d9] p-3 rounded-lg border border-[#d1ccbd]">
                    <Calendar className="w-6 h-6 text-[#5a7258]" />
                  </div>
                  <div>
                    <p className="font-hand text-[#6b7a68] text-xl">Next Appointment</p>
                    <p className="font-bold text-[#3e4a3d] mt-1">{formatDate(nextAppointment.date)}</p>
                    <p className="text-sm font-medium text-[#6b7a68]">{formatTime(nextAppointment.time)}</p>
                    <a href="/user/appointment-list">
                      <button className="mt-4 bg-[#5a7258] hover:bg-[#465a44] text-white text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition shadow-sm">
                        View Appointment <ArrowRight className="w-3 h-3" />
                      </button>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="flex gap-4 items-start relative z-10">
                  <div className="bg-[#e8e4d9] p-3 rounded-lg border border-[#d1ccbd]">
                    <Calendar className="w-6 h-6 text-[#5a7258]" />
                  </div>
                  <div>
                    <p className="font-hand text-[#6b7a68] text-xl">Next Appointment</p>
                    <p className="font-bold text-[#3e4a3d] mt-1">No Upcoming Bookings</p>
                    <p className="text-sm font-medium text-[#6b7a68] mt-1">Start your natural healing today.</p>
                    <a href="/user/book">
                      <button className="mt-4 bg-[#5a7258] hover:bg-[#465a44] text-white text-xs px-5 py-2.5 rounded-full flex items-center gap-2 transition shadow-sm">
                        Book Appointment <ArrowRight className="w-3 h-3" />
                      </button>
                    </a>
                  </div>
                </div>

              )}
            </div>
            <div
              className="hidden lg:block absolute top-0 right-0 w-[50%] h-[450px] rounded-[30px] bg-cover bg-center shadow-sm"
              style={{ backgroundImage: "url('/user/d5.png')" }}
            ></div>
          </div>

          {/* Right side background image - simulating the tea/plant scene */}
          <div className="hidden lg:block absolute top-0 right-0 w-[50%] h-[450px] rounded-[30px] bg-cover bg-center shadow-sm" style={{ backgroundImage: "url('/user/hero_dash.png')" }}></div>

        </div>

        {/* Features Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Feature 1 */}
          <a href="/user/book" className="paper-texture bg-[#f6f7f3] rounded-2xl p-6 border border-[#e8e4d9] transform hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-[#7d8c72] rounded-full flex items-center justify-center text-white mb-5 shadow-inner">
              <CalendarPlus className="w-7 h-7" />
            </div>
            <h3 className="font-hand text-4xl text-[#2b3a2f]">Book<br />Appointment</h3>
            <p className="text-xs text-[#6b7a68] mt-3 mb-5 font-medium">Consult our experts and schedule your visit.</p>
            <ArrowRight className="w-5 h-5 text-[#6b7a68]" />
          </a>

          {/* Feature 2 */}
          <a href="/user/appointment-list" className="paper-texture bg-[#f5efe6] rounded-2xl p-6 border border-[#e8dcc4] transform hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-[#b5a385] rounded-full flex items-center justify-center text-white mb-5 shadow-inner">
              <CalendarDays className="w-7 h-7" />
            </div>
            <h3 className="font-hand text-4xl text-[#2b3a2f]">My<br />Appointment</h3>
            <p className="text-xs text-[#6b7a68] mt-3 mb-5 font-medium">View your upcoming bookings and details.</p>
            <ArrowRight className="w-5 h-5 text-[#6b7a68]" />
          </a>

          {/* Feature 3 */}
          <a href="/user/prescriptions" className="paper-texture bg-[#f1ebf4] rounded-2xl p-6 border border-[#dcd1ec] transform hover:-translate-y-1 transition duration-300">
            <div className="w-14 h-14 bg-[#9d8bb3] rounded-full flex items-center justify-center text-white mb-5 shadow-inner">
              <ClipboardList className="w-7 h-7" />
            </div>
            <h3 className="font-hand text-4xl text-[#2b3a2f]">My<br />Prescription</h3>
            <p className="text-xs text-[#6b7a68] mt-3 mb-5 font-medium">View your treatment and medication plan.</p>
            <ArrowRight className="w-5 h-5 text-[#6b7a68]" />
          </a>

          {/* Tip of the day */}
          <div className="paper-texture bg-[#f9f5ea] rounded-xl p-5 border border-[#e8e4d9] transform rotate-2 relative shadow-md">
            <div className="absolute top-2 right-4 w-3 h-3 rounded-full bg-[#d69e2e] shadow-sm"></div>
            <h3 className="font-hand text-3xl text-[#2b3a2f] flex items-center gap-2">Today's Tip
              <div>
                <Image
                  src="/l11.png"
                  width={125}
                  height={125}
                  alt="leaf"
                  className="scale-x-[-1]"
                />
              </div></h3>
            <div className="flex gap-4 mt-4 items-center">
              <div className="w-24 h-24 bg-[#e8e4d9] rounded-full overflow-hidden border-4 border-white shadow-sm flex-shrink-0 relative">
                <Image src="/e1.png" layout="fill" objectFit="cover" alt="Oil Massage" />
              </div>
              <div>
                <p className="text-xs text-[#3e4a3d] font-bold">Practice Abhyanga</p>
                <p className="text-[10px] text-[#6b7a68] leading-tight mt-1">(self-massage) with warm sesame oil before your shower to calm the nervous system.</p>
              </div>
            </div>
            <div className="mt-5 flex gap-2 justify-center">
              <div className="w-2 h-2 rounded-full bg-[#5a7258]"></div>
              <div className="w-2 h-2 rounded-full bg-[#d1ccbd]"></div>
              <div className="w-2 h-2 rounded-full bg-[#d1ccbd]"></div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Upcoming Appointment */}
          <div className="lg:col-span-5 paper-texture bg-white rounded-2xl p-6 border border-[#e8e4d9]">
            <h3 className="font-hand text-3xl text-[#2b3a2f] mb-5">Upcoming Appointment</h3>

            {loadingAppts ? (
              <div className="py-8 text-center text-sm text-[#6b7a68]">Loading consultation details...</div>
            ) : nextAppointment ? (
              <>
                <div className="flex flex-col sm:flex-row gap-5 justify-between items-start">
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-full bg-[#e0dcd0] overflow-hidden border-2 border-white shadow-sm flex items-center justify-center">
                      <Image src="/g33.png" alt="doc" width={100} height={100} />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#3e4a3d]">Dr. Kajal</h4>
                      <p className="text-[11px] text-[#6b7a68] mt-0.5">Ayurveda General • Ayurveda Expert</p>
                      <div className="flex gap-4 text-xs mt-2 font-medium text-[#3e4a3d]">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-[#6b7a68]" /> {formatDate(nextAppointment.date)}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-[#6b7a68]" /> {formatTime(nextAppointment.time)}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] mt-1 text-[#6b7a68]">
                        <Video className="w-3 h-3" /> Online Consultation
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto mt-2 sm:mt-0">
                    <a href={`https://meet.jit.si/${nextAppointment.jitsiRoom}`} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                      <button className="bg-[#4a5f48] hover:bg-[#3e4a3d] text-white text-[11px] px-4 py-2 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 shadow-sm transition">
                        <Video className="w-3.5 h-3.5" /> Join Consultation
                      </button>
                    </a>
                    <a href="/user/appointment-list" className="text-[11px] text-[#6b7a68] hover:text-[#3e4a3d] flex items-center gap-1 mt-1">
                      View Details <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                <div className="mt-5 pt-4 border-t border-dashed border-[#d1ccbd] flex justify-between items-center">
                  <p className="text-xs text-[#6b7a68]">Meeting Room Code: <span className="font-bold text-[#3e4a3d]">{nextAppointment.jitsiRoom}</span></p>
                  <a href={`https://meet.jit.si/${nextAppointment.jitsiRoom}`} target="_blank" rel="noopener noreferrer" className="text-[11px] text-[#6b7a68] hover:text-[#3e4a3d] flex items-center gap-1">
                    Direct Join Link <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </>
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-[#6b7a68] font-medium">You have no upcoming consultations.</p>
                <a href="/user/book">
                  <button className="mt-4 bg-[#5a7258] hover:bg-[#465a44] text-white text-xs px-5 py-2 rounded-full transition shadow-sm">
                    Book Consultation Now
                  </button>
                </a>
              </div>
            )}
          </div>

          {/* Quote Card */}
          <div className="lg:col-span-3 bg-[#4a5f48] rounded-xl p-8 text-white shadow-lg transform -rotate-1 flex flex-col justify-center relative overflow-hidden">
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-12 h-4 bg-[#c2bba8] shadow-sm transform rotate-2"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <span className="text-5xl opacity-40 font-serif leading-none absolute top-4 left-4">"</span>
            <p className="font-hand text-3xl leading-snug mt-4 z-10 pl-2">
              Ayurveda believes in treating the root cause, not just the symptoms.
            </p>
            <div className="absolute bottom-2 right-2 opacity-30">
              <Leaf className="w-12 h-12" />
            </div>
          </div>

          {/* Daily Wellness Tracker */}
          <div className="lg:col-span-4 paper-texture rounded-2xl p-6 border border-[#e8e4d9]">
            <h3 className="font-hand text-3xl text-[#2b3a2f] mb-6">Daily Wellness</h3>
            <div className="flex justify-between items-end text-center px-2 pt-2">
              <div className="flex flex-col items-center">
                <Droplets className="w-7 h-7 text-[#5b9ca8] mb-3" strokeWidth={1.5} />
                <p className="text-[11px] font-bold text-[#3e4a3d]">Water</p>
                <p className="text-[10px] text-[#6b7a68] mt-0.5">8-12 glasses</p>
              </div>
              <div className="flex flex-col items-center">
                <Activity className="w-7 h-7 text-[#a8825b] mb-3" strokeWidth={1.5} />
                <p className="text-[11px] font-bold text-[#3e4a3d]">Movement</p>
                <p className="text-[10px] text-[#6b7a68] mt-0.5">30-60 mins</p>
              </div>
              <div className="flex flex-col items-center">
                <Utensils className="w-7 h-7 text-[#5a7258] mb-3" strokeWidth={1.5} />
                <p className="text-[11px] font-bold text-[#3e4a3d]">Meals</p>
                <p className="text-[10px] text-[#6b7a68] mt-0.5">3 completed</p>
              </div>
              <div className="flex flex-col items-center">
                <Moon className="w-7 h-7 text-[#625ba8] mb-3" strokeWidth={1.5} />
                <p className="text-[11px] font-bold text-[#3e4a3d]">Sleep</p>
                <p className="text-[10px] text-[#6b7a68] mt-0.5">7-9 hrs</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Reminder */}
        <div className="mt-10 border-t border-b border-[#d1ccbd] py-6 flex flex-col md:flex-row gap-6 items-center justify-between text-[#6b7a68] relative">


          <div className="flex items-center gap-4 z-10">
            <div className="w-20 h-20 relative rounded-full overflow-hidden border border-white">
              <Image src="/user/d4.png" layout="fill" objectFit="cover" alt="Plant" />
            </div>
            <div>
              <h4 className="font-hand text-2xl text-[#3e4a3d]">Evening Reminder</h4>
              <p className="text-[11px] leading-tight">Take 5 deep breaths, unwind,<br />and let go of the day.</p>
            </div>
          </div>

          <div className="flex items-center gap-8 text-xs font-medium z-10">
            <div className="flex items-center gap-2"><Coffee className="w-5 h-5 text-[#2b3a2f] opacity-70" /> Drink warm water</div>
            <div className="flex items-center gap-2"><Book className="w-5 h-5 text-[#2b3a2f] opacity-70" /> Gratitude journal</div>
            <div className="flex items-center gap-2"><Smile className="w-5 h-5 text-[#2b3a2f] opacity-70" /> Meditate for 10 mins</div>
          </div>

          <div className="font-hand text-3xl text-[#3e4a3d] flex items-center gap-2 z-10">
            Be kind to your<br />body and mind. <Heart className="w-4 h-4 text-[#3e4a3d]" fill="transparent" strokeWidth={2} />
          </div>

          <div className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/4 hidden lg:block">
            {/* <Leaf className="w-32 h-32 text-[#5a7258] transform -scale-x-100" /> */}
            <Image src="/l11.png" alt='leaf' width={200} height={200} />
          </div>
        </div>

      </main>
    </div>
  );
}