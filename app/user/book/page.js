"use client";
import { useEffect, useState } from "react";

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

    try {
      const res = await fetch(`/api/user/slots?date=${date}`);
      const data = await res.json();
      setTimeSlots(data.slots || []);
    } catch (err) {
      setStatus("Failed to load slots");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const dateISO = new Date(date + "T00:00:00").toISOString();
      const timeISO = new Date(date + "T" + time).toISOString();

      const res = await fetch("/api/user/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: dateISO, time: timeISO, message }),
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
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">Book Appointment</h1>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* DATE PICKER */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 w-full"
          required
        />

        {/* TIME SLOT DROPDOWN */}
        {timeSlots.length > 0 && (
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="border p-2 w-full"
            required
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        )}

        {/* MESSAGE */}
        <textarea
          placeholder="Reason for appointment"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Book
        </button>
      </form>

      {status && <p className="text-center mt-2">{status}</p>}
    </div>
  );
}
