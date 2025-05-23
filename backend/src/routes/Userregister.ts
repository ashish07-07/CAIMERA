// import express from "express";
// import prisma from "../db";

// import bcrypt from "bcrypt";

// interface Userdetails {
//   name: string;
//   email: string;
//   password: string;
// }

// const router = express.Router();
// router.use(express.json());

// router.post("/userregistration", async function (req: any, res: any) {
//   const { name, email, password }: Userdetails = req.body;

//   console.log(`the name is ${name} and email is ${email} `);

//   const encryptedpassword = await bcrypt.hash(password, 10);

//   const userdetails = await prisma.user.create({
//     data: {
//       name: name,
//       email: email,
//       password: encryptedpassword,
//     },
//   });

//   return res.status(201).json({
//     user: userdetails,
//   });
// });

// export default router;


// import express, { Request, Response } from "express";
// import prisma from "../db";
// import bcrypt from "bcrypt";

// interface Userdetails {
//   name?: string;
//   email: string;
//   password?: string;
// }

// const router = express.Router();
// router.use(express.json());

// // Registration Route (optional, but useful if you're handling sign-ups)
// router.post("/userregistration", async (req:any, res:any) => {
//   const { name, email, password }: Userdetails = req.body;

//   try {
//     const existingUser = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (existingUser) {
//       return res.status(409).json({ error: "Email already registered" });
//     }

//     const encryptedPassword = await bcrypt.hash(password!, 10);

//     const user = await prisma.user.create({
//       data: {
//         name: name!,
//         email,
//         password: encryptedPassword,
//       },
//     });

//     return res.status(201).json({ user });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // ✅ Login Support Route (used by NextAuth Credentials Provider)
// router.post("/getuserbyemail", async (req:any, res: any) => {
//   const { email } = req.body;

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     return res.status(200).json({ user });
//   } catch (error) {
//     console.error("Error fetching user:", error);
//     return res.status(500).json({ error: "Internal server error" });
//   }
// });

// export default router;

// router.post("/userlogin", async function (req: any, res: any) {
//   const { email, password }: { email: string; password: string } = req.body;

//   const user = await prisma.user.findUnique({
//     where: { email },
//   });

//   if (!user) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   const isPasswordValid = await bcrypt.compare(password, user.password);

//   if (!isPasswordValid) {
//     return res.status(401).json({ error: "Invalid email or password" });
//   }

//   return res.status(200).json({
//     user: {
//       id: user.id.toString(),
//       email: user.email,
//       name: user.name,
//     },
//   });
// });


// import express from "express";
// import prisma from "../db";
// import bcrypt from "bcrypt";
// import cors from "cors";
// import { emit } from "process";

// const router = express.Router();

// // Add CORS middleware
// router.use(cors({
//   origin: process.env.FRONTEND_URL || "http://localhost:3000",
//   credentials: true
// }));

// router.use(express.json());

// interface UserDetails {
//   name: string;
//   email: string;
//   password: string;
// }

// // Improved error handling middleware
// const handleErrors = (res: express.Response, status: number, message: string) => {
//   return res.status(status).json({ success: false, error: message });
// };

// router.post("/userregistration", async (req:any, res:any) => {
//   try {
//     const { name, email, password }: UserDetails = req.body;

//     // Validate input
//     if (!name || !email || !password) {
//       return handleErrors(res, 400, "All fields are required");
//     }

//     // Validate email format
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return handleErrors(res, 400, "Invalid email format");
//     }

//     // Check password strength
//     if (password.length < 8) {
//       return handleErrors(res, 400, "Password must be at least 8 characters long");
//     }

//     // Check if user already exists
//     const existingUser = await prisma.user.findUnique({
//       where:
//       {
//         email:email
//       }
//     });

//     if (existingUser) {
//       return handleErrors(res, 409, "User with this email already exists");
//     }

//     // Hash password
//     const saltRounds = process.env.SALT_ROUNDS ? parseInt(process.env.SALT_ROUNDS) : 10;
//     const encryptedPassword = await bcrypt.hash(password, saltRounds);

//     // Create new user
//     const newUser = await prisma.user.create({
//       data: {
//         name,
//         email,
//         password: encryptedPassword,
//       },
//       select: {  // Exclude sensitive fields
//         id: true,
//         name: true,
//         email: true,
//           created_at: true
//       }
//     });

//     return res.status(201).json({
//       success: true,
//       user: newUser
//     });

//   } catch (error) {
//     console.error("Registration error:", error);
//     return handleErrors(res, 500, "Internal server error");
//   }
// });

// export default router;


// src/routes/Userregister.ts
import express from 'express';
import prisma from '../db';
import bcrypt from 'bcrypt';
import cors from 'cors';

const router = express.Router();

router.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:3000",
  credentials: true
}));

router.use(express.json());

interface UserDetails {
  name: string;
  email: string;
  password: string;
}

router.post("/userregistration", async (req:any, res:any) => {
  try {
    const { name, email, password }: UserDetails = req.body;

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check existing user
    // const existingUser = await prisma.user.findUnique({
    //   where: { 
    //     email: email 
    //   }
    // });

    const existingUser = await prisma.user.findUnique({
  where: { email }
});

    if (existingUser) {
      return res.status(409).json({ error: "Email already exists" });
    }

    // Hash password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: encryptedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true
      }
    });

    return res.status(201).json(newUser);

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;