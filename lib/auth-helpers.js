import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import redis from "@/lib/redis";

export async function verifyAdmin() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return { 
        authorized: false, 
        response: NextResponse.json({ error: "Not authenticated" }, { status: 401 }) 
      };
    }

    const userId = session.user.id;
    let role = null;

    // 1. Try to fetch the role from Redis cache if configured and connected
    if (redis && redis.status === "ready") {
      try {
        role = await redis.get(`user_role:${userId}`);
        if (role) {
          console.log(`⚡ Redis cache HIT for user role: ${userId} -> ${role}`);
        }
      } catch (cacheErr) {
        console.warn("⚠️ Redis cache read error (falling back to database):", cacheErr.message);
      }
    }

    // 2. Fetch from DB if cache missed or failed
    if (!role) {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { role: true },
      });
      role = user?.role || null;
      console.log(`📡 Database lookup for user role: ${userId} -> ${role}`);

      // 3. Write back to Redis cache if connection is active
      if (role && redis && redis.status === "ready") {
        try {
          // Cache the user role for 30 minutes (1800 seconds)
          await redis.set(`user_role:${userId}`, role, "EX", 1800);
          console.log(`💾 Cached user role in Redis for 30 mins: user_role:${userId}`);
        } catch (cacheErr) {
          console.warn("⚠️ Redis cache write error:", cacheErr.message);
        }
      }
    }

    if (role !== "ADMIN") {
      return { 
        authorized: false, 
        response: NextResponse.json({ error: "Forbidden: Admins only" }, { status: 403 }) 
      };
    }

    return { 
      authorized: true, 
      user: { id: userId, role }, 
      session 
    };
  } catch (error) {
    console.error("verifyAdmin error:", error);
    return { 
      authorized: false, 
      response: NextResponse.json({ error: "Internal Server Error" }, { status: 500 }) 
    };
  }
}
