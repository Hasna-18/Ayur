// import { NextResponse } from "next/server";
// import prisma from "@/lib/prisma";
// import bcryptjs from "bcryptjs";
// import { verifyAdmin } from "@/lib/auth-helpers";

// export async function POST(request) {
//   try {
//     // 1. Verify that the caller is an ADMIN
//     const authResult = await verifyAdmin();
//     if (!authResult.authorized) {
//       return authResult.response;
//     }

//     const { name, email, password } = await request.json();

//     if (!name || !email || !password) {
//       return NextResponse.json(
//         { error: "All fields are required" },
//         { status: 400 }
//       );
//     }

//     if (password.length < 8) {
//       return NextResponse.json(
//         { error: "Password must be at least 8 characters" },
//         { status: 400 }
//       );
//     }

//     // 2. Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists with this email" },
//         { status: 400 }
//       );
//     }

//     // 3. Hash password
//     const hashed = await bcryptjs.hash(password, 10);

//     // 4. Create the admin user
//     const admin = await prisma.user.create({
//       data: {
//         email,
//         password: hashed,
//         role: "ADMIN",
//         name,
//         emailVerified: true,
//       },
//     });

//     return NextResponse.json({
//       message: "Admin registered successfully",
//       user: {
//         id: admin.id,
//         email: admin.email,
//         name: admin.name,
//         role: admin.role,
//       },
//     });
//   } catch (error) {
//     console.error("❌ Admin registration error:", error);
//     return NextResponse.json(
//       { error: error.message || "Failed to register admin" },
//       { status: 500 }
//     );
//   }
// }
