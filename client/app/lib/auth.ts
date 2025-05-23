// import NextAuth from "next-auth/next";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import axios from "axios";

// export const NEXT_AUTH = {
//   providers: [
//     CredentialsProvider({
//       name: "Email",
//       credentials: {
//         name: { label: "name", type: "text", placeholder: "enter your name" },
//         email: {
//           label: "email",
//           type: "email",
//           placeholder: "bkashishh07@gmail.com",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//           placeholder: "123456",
//         },
//       },
//       async authorize(credentials: any) {
//         const { email, password, name } = credentials;
//         const hashedPassword = await bcrypt.hash(password, 10);

//         try {
//           // const response = await axios.post(
//           //   `${process.env.AWS_HOSTED_URL}/user/userregistration`,

//           //   {
//           //     name,
//           //     email,
//           //     password: hashedPassword,
//           //   }
//           // );
//           const response = await axios.post(
//     'https://caimera-2.onrender.com/user/userregistration',
//     {
//       name,
//       email,
//       password: hashedPassword,
//     }
//   );

//           if (response.data && response.data.user) {
//             const user = response.data.user;
//             return {
//               id: user.id.toString(),
//               email: user.email,
//               name: user.name,
//             };
//           }
//         } catch (e) {
//           console.error(e);
//         }

//         return null;
//       },
//     }),
//   ],

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//       }
//       return token;
//     },

//     async session({ token, session }: any) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;

//         console.log(session);
//       }
//       return session;
//     },
//   },
// };

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';

export const NEXT_AUTH = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // const response = await axios.post(
          //   `${process.env.BACKEND_URL}/api/login`,
          //   {
          //     email: credentials?.email,
          //     password: credentials?.password
          //   }
          // );
          const response = await axios.post(
  'https://caimera-4.onrender.com/user/userregistration',
  {
   
    email: credentials?.email,
    password: credentials?.password // Send plain password
  }
);

          if (response.data) {
            return {
              id: response.data.id.toString(),
              email: response.data.email,
              name: response.data.name
            };
          }
          return null;
        } catch (error) {
          console.error('Authorization error:', error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.user.id = token.id;
      session.user.name = token.name;
      return session;
    }
  },
  pages: {
    signIn: '/signin'
  }
};

// export default NextAuth(authOptions);


// app/api/auth/[...nextauth]/route.ts (for Next.js App Router)
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import axios from "axios";

// export const NEXT_AUTH = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "you@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         const { email, password } = credentials;

//         try {
//           // Call your backend to get the user
//           const res = await axios.post(
//             "https://caimera-2.onrender.com/user/userregistration", // <== should be a login endpoint
//             { email, password }
//           );

//           const user = res.data?.user;

//           if (user) {
//             return {
//               id: user.id.toString(),
//               email: user.email,
//               name: user.name,
//             };
//           }
//         } catch (error) {
//           console.error("Auth error:", error);
//         }

//         return null;
//       },
//     }),
//   ],

//   pages: {
//     // 👇 Remove this if you're not overriding any default page
//     // signIn: "/auth/signin", 
//   },

//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ token, session }: any) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcrypt";
// import axios from "axios";
// import { NEXT_AUTH } from '@/app/lib/auth';

// export const NEXT_AUTH = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email", placeholder: "you@example.com" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials: any) {
//         const { email, password } = credentials;

//         try {
//           // 👉 Corrected to use getuserbyemail route
//           const res = await axios.post("https://caimera-2.onrender.com/user/getuserbyemail", {
//             email,
//           });

//           const user = res.data?.user;

//           if (!user) {
//             console.error("No user found with email");
//             return null;
//           }

//           // Compare the password
//           const isValidPassword = await bcrypt.compare(password, user.password);
//           if (!isValidPassword) {
//             console.error("Invalid password");
//             return null;
//           }

//           return {
//             id: user.id.toString(),
//             email: user.email,
//             name: user.name,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       },
//     }),
//   ],

//   // ✅ Let NextAuth use its default pages
//   // Don't define `pages: { signIn: ... }` if you want the default UI
//   secret: process.env.NEXTAUTH_SECRET,

//   callbacks: {
//     async jwt({ token, user }: any) {
//       if (user) {
//         token.id = user.id;
//         token.name = user.name;
//       }
//       return token;
//     },
//     async session({ token, session }: any) {
//       if (token) {
//         session.user.id = token.id;
//         session.user.name = token.name;
//       }
//       return session;
//     },
//   },
// };

