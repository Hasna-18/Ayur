import {
  Calendar,
  Video,
  CreditCard,
  User,
  FileText,
  ShieldCheck,
} from "lucide-react";

// JSON data for features
export const features = [
  {
    icon: <User className="h-6 w-6 text-emerald-400" />,
    title: "Create Your Profile",
    description:
      "Sign up and complete your profile to get personalized healthcare recommendations and services.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-emerald-400" />,
    title: "Book Appointments",
    description:
      "Browse doctor profiles, check availability, and book appointments that fit your schedule.",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-400" />,
    title: "Video Consultation",
    description:
      "Connect with doctors through secure, high-quality video consultations from the comfort of your home.",
  },
  {
    icon: <CreditCard className="h-6 w-6 text-emerald-400" />,
    title: "Consultation Credits",
    description:
      "Purchase credit packages that fit your healthcare needs with our simple subscription model.",
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-emerald-400" />,
    title: "Verified Doctors",
    description:
      "All healthcare providers are carefully vetted and verified to ensure quality care.",
  },
  {
    icon: <FileText className="h-6 w-6 text-emerald-400" />,
    title: "Medical Documentation",
    description:
      "Access and manage your appointment history, doctor's notes, and medical recommendations.",
  },
];



