import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Video,
  ClipboardList,
  Truck,
  Globe,
  Star,
  ShieldCheck,
} from "lucide-react";
import { GiLotus } from "react-icons/gi";

const treatments = [
  "Weight Loss",
  "PCOS",
  "Diabetes",
  "Hair Loss",
  "Skin Care",
  "Stress & Anxiety",
];

export default function Home() {
  return (
    <main className="bg-[#faf8f2] text-slate-800">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
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

          <div className="hidden md:flex gap-8">
            <Link href="#">Home</Link>
            <Link href="/user/about">About</Link>
            <Link href="#">Contact</Link>
          </div>

          <a href="/user/dashboard" className="text-green-700 font-medium">
            <button className="bg-green-700 text-white px-5 py-3 rounded-xl">
              Book Appointment
            </button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-green-900">
              Heal Naturally with
              <br />
              Expert Ayurvedic Care
            </h1>

            <p className="mt-6 text-xl text-slate-600 max-w-xl">
              Personalized Ayurvedic consultations from certified doctors
              anywhere in the world.
            </p>

            <div className="flex flex-wrap gap-4 mt-8">
              <a href="/user/dashboard" className="text-green-700 font-medium">
                <button className="bg-green-700 text-white px-8 py-4 rounded-xl font-medium">
                  Book Appointment
                </button>
              </a>

              <button className="border px-8 py-4 rounded-xl">
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12">
              <div>
                <p className="text-3xl font-bold">4.9★</p>
                <p className="text-gray-500">Patient Rating</p>
              </div>

              <div>
                <p className="text-3xl font-bold">50+</p>
                <p className="text-gray-500">Countries</p>
              </div>

              <div>
                <p className="text-3xl font-bold">1000+</p>
                <p className="text-gray-500">Consultations</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-green-100 rounded-full blur-3xl"></div>

            <Image
              src="/profile.jpeg"
              alt="Doctor"
              width={700}
              height={700}
              className="relative z-10"
            />
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8">

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div className="flex items-center justify-center gap-2">
              <Globe className="text-green-700" />
              International Patients
            </div>

            <div className="flex items-center justify-center gap-2">
              <ShieldCheck className="text-green-700" />
              Licensed Doctor
            </div>

            <div className="flex items-center justify-center gap-2">
              <Star className="text-green-700" />
              4.9 Rating
            </div>

            <div className="flex items-center justify-center gap-2">
              <Truck className="text-green-700" />
              Medicine Delivery
            </div>

          </div>
        </div>
      </section>

      {/* Treatments */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-900">
            Ayurvedic Treatments
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 mt-14">

            {treatments.map((item) => (
              <div
                key={item}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-center">
                  {item}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-white py-24">
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-4xl font-bold text-center text-green-900">
            How It Works
          </h2>

          <div className="grid md:grid-cols-4 gap-8 mt-16">

            <div className="text-center">
              <Calendar className="mx-auto w-12 h-12 text-green-700" />
              <h3 className="font-semibold mt-4">
                Book Appointment
              </h3>
            </div>

            <div className="text-center">
              <Video className="mx-auto w-12 h-12 text-green-700" />
              <h3 className="font-semibold mt-4">
                Online Consultation
              </h3>
            </div>

            <div className="text-center">
              <ClipboardList className="mx-auto w-12 h-12 text-green-700" />
              <h3 className="font-semibold mt-4">
                Personalized Plan
              </h3>
            </div>

            <div className="text-center">
              <Truck className="mx-auto w-12 h-12 text-green-700" />
              <h3 className="font-semibold mt-4">
                Medicine Delivery
              </h3>
            </div>

          </div>
        </div>
      </section>

      {/* Single Doctor Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">

          <div className="bg-white rounded-3xl shadow-sm p-10 grid lg:grid-cols-2 gap-10 items-center">

            <Image
              src="/profile.jpeg"
              alt="Doctor"
              width={500}
              height={500}
            />

            <div>

              <h2 className="text-4xl font-bold text-green-900">
                Meet Your Ayurvedic Doctor
              </h2>

              <h3 className="text-2xl font-semibold mt-4">
                Dr. Hasna Nair
              </h3>

              <p className="text-green-700 mt-2">
                BAMS | 10+ Years Experience
              </p>

              <p className="mt-6 text-slate-600 leading-8">
                Dedicated to helping patients achieve long-term
                wellness through authentic Ayurvedic treatments,
                lifestyle guidance and personalized care.
              </p>

              <a href="/user/dashboard" className="text-green-700 font-medium mt-4 inline-block">
                <button className="mt-8 bg-green-700 text-white px-8 py-4 rounded-xl">
                  Book Consultation
                </button>
              </a>

            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-24">

        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-center text-4xl font-bold text-green-900">
            What Our Patients Say
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-12">

            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#faf8f2] p-6 rounded-2xl"
              >
                <p>
                  "Excellent consultation and personalized
                  treatment plan."
                </p>

                <p className="font-semibold mt-4">
                  Patient {i}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-green-900 text-white">

        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-5xl font-bold">
            Ready to Begin Your Healing Journey?
          </h2>

          <p className="mt-6 text-lg">
            Book your consultation with an Ayurvedic expert today.
          </p>

          <button className="mt-8 bg-yellow-500 text-black px-8 py-4 rounded-xl font-semibold">
            Schedule Appointment
          </button>

        </div>
      </section>

    </main>
  );
}