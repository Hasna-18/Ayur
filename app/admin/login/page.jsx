"use client";

import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();

    const result = await signIn("email", {
      email,
      password
    });

    if (!result.ok) {
      setError("Invalid credentials");
      return;
    }

    if (result.data.user.role !== "admin") {
      setError("Access denied. Admins only.");
      return;
    }

    router.push("/admin");
  }

  return (
    <form onSubmit={handleLogin}>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Login</button>
      {error && <p>{error}</p>}
    </form>
  );
}
