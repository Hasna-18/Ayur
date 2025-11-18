"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AdminProfile() {
  // Default fields — always strings to avoid undefined values
  const emptyProfile = {
    name: "",
    email: "",
    phone: "",
    specialization: "",
    clinicAddress: "",
    bio: "",
  };

  const [profile, setProfile] = useState(emptyProfile);
  const [status, setStatus] = useState("");

  // Load existing data from database
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await fetch("/api/admin/profile");

      const text = await res.text();
      const data = text ? JSON.parse(text) : {};

      // Always merge with defaults → prevents undefined values
      setProfile({
        ...emptyProfile,
        ...data,
      });
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setStatus("");

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!res.ok) throw new Error("Update failed");

      setStatus("Profile updated successfully!");
    } catch (err) {
      setStatus("Error updating profile");
      console.error(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 space-y-4">
      <h1 className="text-2xl font-bold">Admin Profile</h1>

      <form onSubmit={updateProfile} className="space-y-3">
        <Input
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />

        <Input
          placeholder="Email"
          value={profile.email}
          disabled
        />

        <Input
          placeholder="Phone"
          value={profile.phone}
          onChange={(e) =>
            setProfile({ ...profile, phone: e.target.value })
          }
        />

        <Input
          placeholder="Specialization"
          value={profile.specialization}
          onChange={(e) =>
            setProfile({ ...profile, specialization: e.target.value })
          }
        />

        <Textarea
          placeholder="Clinic Address"
          value={profile.clinicAddress}
          onChange={(e) =>
            setProfile({ ...profile, clinicAddress: e.target.value })
          }
        />

        <Textarea
          placeholder="About / Bio"
          value={profile.bio}
          onChange={(e) =>
            setProfile({ ...profile, bio: e.target.value })
          }
        />

        <Button className="bg-emerald-600 text-white" type="submit">
          Save
        </Button>
      </form>

      {status && <p className="text-center mt-3">{status}</p>}
    </div>
  );
}
