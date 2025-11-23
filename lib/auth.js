import { betterAuth } from "better-auth/*";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export const auth = betterAuth({
    routes: {
    base: "/api/auth"
  },
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }
  }
});