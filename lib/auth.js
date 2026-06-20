import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient({
  errorFormat: "pretty",
});

const getBaseURL = () => {
  const url = process.env.BETTER_AUTH_URL ||
              process.env.NEXT_PUBLIC_URL ||
              (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : "") ||
              "http://localhost:3000";
  console.log("⚙️ Calculated BETTER_AUTH_URL:", url);
  return url;
};

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  secret: process.env.BETTER_AUTH_SECRET,
  trustHost: true,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  baseURL: getBaseURL(),
});
