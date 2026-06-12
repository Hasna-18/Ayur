// "use client";
// import { useEffect, useState } from "react";

// export default function BookAppointment() {
//   const [date, setDate] = useState("");
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [time, setTime] = useState("");
//   const [message, setMessage] = useState("");
//   const [status, setStatus] = useState("");

//   // Fetch admin availability when date changes
//   useEffect(() => {
//     if (!date) return;
//     loadSlots(date);
//   }, [date]);

//   // Load available time slots for selected date
//   const loadSlots = async (date) => {
//     setTime("");
//     setTimeSlots([]);
//     setStatus("");

//     try {
//       const res = await fetch(`/api/user/slots?date=${date}`);
//       const data = await res.json();

//       if (data.reason === "weekly-off") {
//         const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//         setStatus(`❌ Clinic is closed every ${days[data.day]}. Please choose another day.`);
//         return;
//       }

//       if (data.reason === "off-date") {
//         setStatus("❌ Doctor is unavailable on this date. Please choose another day.");
//         return;
//       }

//       if (data.reason === "no-time") {
//         setStatus("❌ No available time slots on this day. Please select another date.");
//         return;
//       }

//       if (data.reason === "no-daily-hours") {
//         setStatus("❌ Clinic working hours not set. Please try again later.");
//         return;
//       }

//       setTimeSlots(data.slots || []);

//     } catch (err) {
//       setStatus("Failed to load slots");
//     }
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("");

//     try {
//       const res = await fetch("/api/user/appointments", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ date, time, message }),
//       });

//       const out = await res.json();

//       if (!res.ok) {
//         setStatus("❌ " + out.error);
//         return;
//       }

//       setStatus("✅ Appointment booked successfully!");
//       setMessage("");
//       setDate("");
//       setTime("");
//       setTimeSlots([]);
//     } catch (err) {
//       setStatus("Error: " + err.message);
//     }
//   };

//   return (
//     <div
//       className="min-h-screen bg-cover bg-center relative"
//       style={{
//         backgroundImage:
//           "url('https://res.cloudinary.com/dhgy1gxa6/image/upload/q_auto/f_auto/v1781263498/ayur_booking_hero_cnqmid.png')",
//       }}
//     >
//       {/* Overlay */}
//       <div className="absolute inset-0 backdrop-blur-sm"></div>

//       <div className="relative z-10 container mx-auto px-6 py-16">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">

//           {/* Left Content */}
//           <div>
//             <h1 className="text-6xl font-serif font-bold text-[#0b3d2e] leading-tight">
//               Book Your
//               <br />
//               Appointment
//             </h1>

//             <div className="flex items-center gap-3 my-6">
//               <div className="h-[1px] w-24 bg-green-300"></div>
//               <span className="text-green-700 text-xl">❦</span>
//               <div className="h-[1px] w-24 bg-green-300"></div>
//             </div>

//             <p className="text-gray-700 text-xl leading-10 max-w-md">
//               Take a step towards a healthier,
//               balanced and peaceful you.
//               Our experts are here to guide you
//               on your wellness journey.
//             </p>

//             {/* Natural Healing Card */}
//             <div className="mt-10 bg-white/70 backdrop-blur-md rounded-3xl p-6 max-w-sm shadow-lg border border-green-100">
//               <div className="flex items-center gap-4">
//                 <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-3xl">
//                   🌿
//                 </div>

//                 <div>
//                   <h3 className="font-semibold text-xl text-[#0b3d2e]">
//                     Natural Healing
//                   </h3>
//                   <p className="text-gray-600">
//                     Holistic care for
//                     <br />
//                     mind, body & soul
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Appointment Card */}
//           <div className="relative">
//             {/* Top Icon */}
//             <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20">
//               <div className="w-24 h-24 rounded-full bg-[#eef3df] border-4 border-white flex items-center justify-center text-4xl shadow-md">
//                 📅
//               </div>
//             </div>

//             <div className="bg-white/95 backdrop-blur-xl rounded-[30px] shadow-2xl p-10 pt-20 border border-gray-100">

//               <h2 className="text-center text-5xl font-serif font-bold text-[#0b3d2e]">
//                 Book Appointment
//               </h2>

//               <div className="flex justify-center items-center gap-3 my-5">
//                 <div className="h-[1px] w-20 bg-green-300"></div>
//                 <span className="text-green-700">❦</span>
//                 <div className="h-[1px] w-20 bg-green-300"></div>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-6 mt-8">

//                 {/* Date */}
//                 <div>
//                   <label className="block mb-2 font-semibold text-[#0b3d2e]">
//                     Select Date
//                   </label>

//                   <input
//                     type="date"
//                     value={date}
//                     onChange={(e) => setDate(e.target.value)}
//                     className="w-full h-14 px-5 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
//                     required
//                   />
//                 </div>

//                 <div>
//                   <label className="block mb-2 font-semibold text-[#0b3d2e]">
//                     Select Time
//                   </label>

//                   <select
//                     value={time}
//                     onChange={(e) => setTime(e.target.value)}
//                     className="w-full text-black h-14 px-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
//                     required
//                   >
//                     <option value="">Choose time</option>

//                     {timeSlots.map((slot) => (
//                       <option key={slot} value={slot}>
//                         {slot}
//                       </option>
//                     ))}
//                   </select>
//                 </div>

//                 {/* Message */}
//                 <div>
//                   <label className="block mb-2 font-semibold text-[#0b3d2e]">
//                     Reason for appointment
//                   </label>

//                   <textarea
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Please provide a reason for your appointment..."
//                     rows={4}
//                     className="w-full text-black border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
//                   />
//                 </div>

//                 {/* Button */}
//                 <button
//                   type="submit"
//                   className="w-full h-16 rounded-xl bg-gradient-to-r from-green-800 to-green-700 text-white text-xl font-semibold shadow-lg hover:scale-[1.01] transition"
//                 >
//                   🌿 Book Appointment
//                 </button>
//               </form>

//               {status && (
//                 <p className="text-center mt-5 text-sm font-medium">
//                   {status}
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Features */}
//         <div className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-green-100">
//           <div className="grid md:grid-cols-3 gap-8">

//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
//                 🌿
//               </div>

//               <div>
//                 <h4 className="font-bold text-[#0b3d2e]">
//                   Expert Ayurvedic Doctors
//                 </h4>
//                 <p className="text-gray-600">
//                   Experienced & certified
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
//                 🛡️
//               </div>

//               <div>
//                 <h4 className="font-bold text-[#0b3d2e]">
//                   Safe & Natural Treatments
//                 </h4>
//                 <p className="text-gray-600">
//                   100% Ayurvedic
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-center gap-4">
//               <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-2xl">
//                 👨‍👩‍👧‍👦
//               </div>

//               <div>
//                 <h4 className="font-bold text-[#0b3d2e]">
//                   500+ Happy Patients
//                 </h4>
//                 <p className="text-gray-600">
//                   Trusted by thousands
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import { useEffect, useState } from "react";
import { Calendar, Clock, MessageCircle, Leaf, Shield, Users, Flower2, Heart, Sparkles, CheckCircle, AlertCircle } from "lucide-react";
import { GiLotus, GiHerbsBundle, GiHealing, GiSpaMassage, GiHealthNormal } from "react-icons/gi";

export default function BookAppointment() {
  const [date, setDate] = useState("");
  const [timeSlots, setTimeSlots] = useState([]);
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Fetch admin availability when date changes
  useEffect(() => {
    if (!date) return;
    loadSlots(date);
  }, [date]);

  // Load available time slots for selected date
  const loadSlots = async (date) => {
    setTime("");
    setTimeSlots([]);
    setStatus("");

    try {
      const res = await fetch(`/api/user/slots?date=${date}`);
      const data = await res.json();

      if (data.reason === "weekly-off") {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setStatus(`❌ Clinic is closed every ${days[data.day]}. Please choose another day.`);
        return;
      }

      if (data.reason === "off-date") {
        setStatus("❌ Doctor is unavailable on this date. Please choose another day.");
        return;
      }

      if (data.reason === "no-time") {
        setStatus("❌ No available time slots on this day. Please select another date.");
        return;
      }

      if (data.reason === "no-daily-hours") {
        setStatus("❌ Clinic working hours not set. Please try again later.");
        return;
      }

      setTimeSlots(data.slots || []);

    } catch (err) {
      setStatus("Failed to load slots");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("/api/user/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, time, message }),
      });

      const out = await res.json();

      if (!res.ok) {
        setStatus("❌ " + out.error);
        return;
      }

      setStatus("✅ Appointment booked successfully!");
      setMessage("");
      setDate("");
      setTime("");
      setTimeSlots([]);
    } catch (err) {
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://res.cloudinary.com/dhgy1gxa6/image/upload/q_auto/f_auto/v1781263498/ayur_booking_hero_cnqmid.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 backdrop-blur-sm"></div>

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <h1 className="text-6xl font-serif font-bold text-[#0b3d2e] leading-tight">
              Book Your
              <br />
              Appointment
            </h1>

            <div className="flex items-center gap-3 my-6">
              <div className="h-[1px] w-24 bg-green-300"></div>
              <div className="text-green-700">
                <Flower2 className="w-5 h-5" />
              </div>
              <div className="h-[1px] w-24 bg-green-300"></div>
            </div>

            <p className="text-gray-700 text-xl leading-10 max-w-md">
              Take a step towards a healthier,
              balanced and peaceful you.
              Our experts are here to guide you
              on your wellness journey.
            </p>

            {/* Natural Healing Card */}
            <div className="mt-10 bg-white/70 backdrop-blur-md rounded-3xl p-6 max-w-sm shadow-lg border border-green-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <GiLotus className="w-8 h-8 text-green-700" />
                </div>

                <div>
                  <h3 className="font-semibold text-xl text-[#0b3d2e]">
                    Natural Healing
                  </h3>
                  <p className="text-gray-600">
                    Holistic care for
                    <br />
                    mind, body & soul
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Appointment Card */}
          <div className="relative">
            {/* Top Icon */}
            <div className="absolute left-1/2 -translate-x-1/2 -top-10 z-20">
              <div className="w-24 h-24 rounded-full bg-[#eef3df] border-4 border-white flex items-center justify-center shadow-md">
                <Calendar className="w-10 h-10 text-green-700" />
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-xl rounded-[30px] shadow-2xl p-10 pt-20 border border-gray-100">

              <h2 className="text-center text-5xl font-serif font-bold text-[#0b3d2e]">
                Book Appointment
              </h2>

              <div className="flex justify-center items-center gap-3 my-5">
                <div className="h-[1px] w-20 bg-green-300"></div>
                <Flower2 className="w-4 h-4 text-green-700" />
                <div className="h-[1px] w-20 bg-green-300"></div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 mt-8">

                {/* Date */}
                <div>
                  <label className="block mb-2 font-semibold text-[#0b3d2e]">
                    Select Date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full h-14 px-5 text-black border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-[#0b3d2e]">
                    Select Time
                  </label>

                  <select
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full text-black h-14 px-5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-600"
                    required
                  >
                    <option value="">Choose time</option>

                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="block mb-2 font-semibold text-[#0b3d2e]">
                    Reason for appointment
                  </label>

                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide a reason for your appointment..."
                    rows={4}
                    className="w-full text-black border rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full h-16 rounded-xl bg-gradient-to-r from-green-800 to-green-700 text-white text-xl font-semibold shadow-lg hover:scale-[1.01] transition flex items-center justify-center gap-2"
                >
                  <Leaf className="w-6 h-6" />
                  Book Appointment
                </button>
              </form>

              {status && (
                <p className="text-center mt-5 text-sm font-medium flex items-center justify-center gap-2">
                  {status.includes("✅") ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : status.includes("❌") ? (
                    <AlertCircle className="w-4 h-4 text-red-600" />
                  ) : null}
                  {status.replace("✅", "").replace("❌", "")}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-12 bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-xl border border-green-100">
          <div className="grid md:grid-cols-3 gap-8">

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <GiHealthNormal className="w-7 h-7 text-green-700" />
              </div>

              <div>
                <h4 className="font-bold text-[#0b3d2e]">
                  Expert Ayurvedic Doctors
                </h4>
                <p className="text-gray-600">
                  Experienced & certified
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Shield className="w-7 h-7 text-green-700" />
              </div>

              <div>
                <h4 className="font-bold text-[#0b3d2e]">
                  Safe & Natural Treatments
                </h4>
                <p className="text-gray-600">
                  100% Ayurvedic
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center">
                <Users className="w-7 h-7 text-green-700" />
              </div>

              <div>
                <h4 className="font-bold text-[#0b3d2e]">
                  500+ Happy Patients
                </h4>
                <p className="text-gray-600">
                  Trusted by thousands
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}