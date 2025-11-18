"use client";

import { useState, useEffect } from "react";

export default function AvailabilityManager() {
  const [weeklyOff, setWeeklyOff] = useState([]);
  const [offDates, setOffDates] = useState([]);
  const [timeOff, setTimeOff] = useState([]);
  const [dailyTime, setDailyTime] = useState({ start: "", end: "" });
  const [loading, setLoading] = useState(false);

  // Fetch all data on component mount
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      
      const [weeklyRes, datesRes, timeRes, dailyRes] = await Promise.all([
        fetch("/api/admin/availability/weekly-off"),
        fetch("/api/admin/availability/off-dates"),
        fetch("/api/admin/availability/time-off"),
        fetch("/api/admin/availability/daily-time")
      ]);

      if (weeklyRes.ok) setWeeklyOff(await weeklyRes.json());
      if (datesRes.ok) setOffDates(await datesRes.json());
      if (timeRes.ok) setTimeOff(await timeRes.json());
      if (dailyRes.ok) {
        const dailyData = await dailyRes.json();
        if (dailyData.start) setDailyTime(dailyData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Weekly Off Functions
  const addWeeklyOff = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dayOfWeek = Number(formData.get("dayOfWeek"));

    try {
      const res = await fetch("/api/admin/availability/weekly-off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dayOfWeek })
      });

      if (res.ok) {
        const newOff = await res.json();
        setWeeklyOff(prev => [...prev, newOff]);
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add weekly off");
      }
    } catch (error) {
      alert("Error adding weekly off");
    }
  };

  const deleteWeeklyOff = async (id) => {
    try {
      const res = await fetch(`/api/admin/availability/weekly-off?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setWeeklyOff(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete weekly off");
      }
    } catch (error) {
      alert("Error deleting weekly off");
    }
  };

  // Off Dates Functions
  const addOffDate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get("offDate");

    try {
      const res = await fetch("/api/admin/availability/off-dates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date })
      });

      if (res.ok) {
        const newDate = await res.json();
        setOffDates(prev => [...prev, newDate]);
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add off date");
      }
    } catch (error) {
      alert("Error adding off date");
    }
  };

  const removeOffDate = async (id) => {
    try {
      const res = await fetch(`/api/admin/availability/off-dates?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setOffDates(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete off date");
      }
    } catch (error) {
      alert("Error deleting off date");
    }
  };

  // Time Off Functions
  const addTimeOff = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get("date");
    const start = formData.get("start");
    const end = formData.get("end");

    try {
      const res = await fetch("/api/admin/availability/time-off", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date, start, end })
      });

      if (res.ok) {
        const newTimeOff = await res.json();
        setTimeOff(prev => [...prev, newTimeOff]);
        e.target.reset();
      } else {
        const error = await res.json();
        alert(error.error || "Failed to add time off");
      }
    } catch (error) {
      alert("Error adding time off");
    }
  };

  const removeTimeOff = async (id) => {
    try {
      const res = await fetch(`/api/admin/availability/time-off?id=${id}`, {
        method: "DELETE"
      });

      if (res.ok) {
        setTimeOff(prev => prev.filter(item => item.id !== id));
      } else {
        alert("Failed to delete time off");
      }
    } catch (error) {
      alert("Error deleting time off");
    }
  };

  // Daily Time Functions
  const setDailyTimeHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const start = formData.get("start");
    const end = formData.get("end");

    try {
      const res = await fetch("/api/admin/availability/daily-time", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start, end })
      });

      if (res.ok) {
        const newDailyTime = await res.json();
        setDailyTime({ start: newDailyTime.start, end: newDailyTime.end });
      } else {
        const error = await res.json();
        alert(error.error || "Failed to set daily time");
      }
    } catch (error) {
      alert("Error setting daily time");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading availability settings...</div>;
  }

  return (
    <div className="min-h-screen bg-background text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Manage Availability</h1>

      {/* Weekly Off Section */}
      <section className="mb-10 p-6 rounded-xl border border-emerald-800/30 bg-emerald-950/20 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Weekly Off Days</h2>
        
        <form onSubmit={addWeeklyOff} className="flex flex-wrap gap-4 items-center mb-4">
          <select
            name="dayOfWeek"
            defaultValue={0}
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          >
            <option value={0}>Sunday</option>
            <option value={1}>Monday</option>
            <option value={2}>Tuesday</option>
            <option value={3}>Wednesday</option>
            <option value={4}>Thursday</option>
            <option value={5}>Friday</option>
            <option value={6}>Saturday</option>
          </select>

          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Add Weekly Off
          </button>
        </form>

        <div className="border border-emerald-800/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-emerald-900/40">
              <tr>
                <th className="p-3 text-left">Day</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {weeklyOff.length === 0 ? (
                <tr>
                  <td className="p-3 text-gray-400" colSpan={2}>
                    No weekly off days configured
                  </td>
                </tr>
              ) : (
                weeklyOff.map(item => (
                  <tr key={item.id} className="border-t border-emerald-800/30">
                    <td className="p-3">
                      {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][item.dayOfWeek]}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => deleteWeeklyOff(item.id)}
                        className="text-red-400 hover:text-red-300 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Off Dates Section */}
      <section className="mb-10 p-6 rounded-xl border border-emerald-800/30 bg-emerald-950/20 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Specific Off Dates</h2>
        
        <form onSubmit={addOffDate} className="flex flex-wrap gap-4 items-center mb-4">
          <input
            type="date"
            name="offDate"
            required
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          />

          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Add Off Date
          </button>
        </form>

        <div className="border border-emerald-800/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-emerald-900/40">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {offDates.length === 0 ? (
                <tr>
                  <td className="p-3 text-gray-400" colSpan={2}>
                    No specific off dates configured
                  </td>
                </tr>
              ) : (
                offDates.map(item => (
                  <tr key={item.id} className="border-t border-emerald-800/30">
                    <td className="p-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => removeOffDate(item.id)}
                        className="text-red-400 hover:text-red-300 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Daily Time Section */}
      <section className="mb-10 p-6 rounded-xl border border-emerald-800/30 bg-emerald-950/20 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Daily Working Hours</h2>
        
        <form onSubmit={setDailyTimeHandler} className="flex flex-wrap gap-4 items-center mb-4">
          <input
            type="time"
            name="start"
            required
            defaultValue={dailyTime.start}
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          />
          <span className="text-gray-400">to</span>
          <input
            type="time"
            name="end"
            required
            defaultValue={dailyTime.end}
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          />

          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Set Daily Time
          </button>
        </form>

        {dailyTime.start && (
          <div className="p-4 border border-emerald-700/30 rounded-lg bg-emerald-900/20">
            <p className="text-emerald-300">
              Current daily availability: <strong>{dailyTime.start}</strong> to <strong>{dailyTime.end}</strong>
            </p>
          </div>
        )}
      </section>

      {/* Time Off Section */}
      <section className="p-6 rounded-xl border border-emerald-800/30 bg-emerald-950/20 max-w-2xl">
        <h2 className="text-xl font-semibold mb-4 text-emerald-400">Time Off Slots</h2>
        
        <form onSubmit={addTimeOff} className="flex flex-wrap gap-4 items-center mb-4">
          <input
            type="date"
            name="date"
            required
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          />
          <input
            type="time"
            name="start"
            required
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          />
          <span className="text-gray-400">to</span>
          <input
            type="time"
            name="end"
            required
            className="p-2 border rounded-lg bg-gray-800 border-emerald-700/50 text-white"
          />

          <button 
            type="submit"
            className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            Add Time Off
          </button>
        </form>

        <div className="border border-emerald-800/30 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-emerald-900/40">
              <tr>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {timeOff.length === 0 ? (
                <tr>
                  <td className="p-3 text-gray-400" colSpan={3}>
                    No time off slots configured
                  </td>
                </tr>
              ) : (
                timeOff.map(item => (
                  <tr key={item.id} className="border-t border-emerald-800/30">
                    <td className="p-3">
                      {new Date(item.date).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      {item.start} - {item.end}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => removeTimeOff(item.id)}
                        className="text-red-400 hover:text-red-300 hover:underline"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}