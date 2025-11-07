"use client";
import { useState } from "react";

export default function BookAppointment() {
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", message: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/user/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to book appointment");
      setStatus("Appointment booked successfully!");
      setForm({ name: "", email: "", date: "", time: "", message: "" });
    } catch (error) {
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Book Appointment</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="date" name="date" onChange={handleChange} value={form.date} className="border p-2 w-full" required />
        <input type="time" name="time" onChange={handleChange} value={form.time} className="border p-2 w-full" required />
        <textarea name="message" placeholder="Reason" onChange={handleChange} value={form.message} className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Book</button>
      </form>
      {status && <p className="mt-4 text-center">{status}</p>}
    </div>
  );
}
