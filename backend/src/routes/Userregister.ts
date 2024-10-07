import express from "express";
import prisma from "../db";

import bcrypt from "bcrypt";

interface Userdetails {
  name: string;
  email: string;
  password: string;
}

const router = express.Router();
router.use(express.json());

router.post("/userregistration", async function (req: any, res: any) {
  const { name, email, password }: Userdetails = req.body;

  console.log(`the name is ${name} and email is ${email} `);

  const encryptedpassword = await bcrypt.hash(password, 10);

  const userdetails = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: encryptedpassword,
    },
  });

  return res.status(201).json({
    user: userdetails,
  });
});

export default router;

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
