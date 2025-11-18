// import { createAuthClient } from "better-auth/react"
// import { withAccelerate } from "@prisma/extension-accelerate"
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient().$extends(withAccelerate());

// export const authClient = createAuthClient({

//     baseURL: process.env.NEXT_PUBLIC_URL || "http://localhost:3000" 
// })


// export const { signIn, signUp, useSession , signOut, forgetPassword, resetPassword } = 
// createAuthClient()



import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
});

export const {
  signIn,
  signUp,
  useSession,
  signOut,
  forgetPassword,
  resetPassword
} = authClient;
