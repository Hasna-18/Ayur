"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createAuthClient } from "better-auth/react";

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

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold mb-4">
        Welcome {user.name || user.email}
      </h1>
      <div>
        <div className="bg-emerald-700/50 text-white">Book now</div>
      </div>
    </div> 
  );
}
