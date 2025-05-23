// "use client";

// import { signIn } from "next-auth/react";
// import { useState } from "react";
// import { redirect } from "next/navigation";
// import { useRouter } from "next/navigation";
// export default function SignIn() {
//   const [credentials, setCredentials] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const router = useRouter();

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     const res = await signIn("credentials", {
//       ...credentials,
//       redirect: false,
//     });

//     if (res?.error) {
//       console.log("error having");
//       console.error(res.error);
//       console.log(res);
//       console.log(credentials);
//     } else {
//       router.push("/");
//     }
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h1 className="text-2xl font-bold text-gray-800 mb-5">Sign In</h1>
//         <div className="mb-4">
//           <label className="block text-sm font-medium  text-black">Name</label>
//           <input
//             type="text"
//             value={credentials.name}
//             onChange={(e) =>
//               setCredentials({ ...credentials, name: e.target.value })
//             }
//             className="mt-1 p-2 block w-full border text-black border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             value={credentials.email}
//             onChange={(e) =>
//               setCredentials({ ...credentials, email: e.target.value })
//             }
//             className="mt-1 p-2 block w-full text-black border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             value={credentials.password}
//             onChange={(e) =>
//               setCredentials({ ...credentials, password: e.target.value })
//             }
//             className="mt-1 p-2 block w-full text-black border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-2 px-4 bg-orange-500 text-white rounded-md shadow hover:bg-orange-600 transition duration-200"
//         >
//           Sign In
//         </button>
//       </form>
//     </div>
//   );
// }





// "use client";
// import { useState } from 'react';
// import { signIn } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';

// export default function SignInPage() {
//   const router = useRouter();
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     try {
//       if (isRegistering) {
//         // Handle registration
//         await axios.post('/api/register', {
//           name: formData.name,
//           email: formData.email,
//           password: formData.password
//         });
//       }

//       // Handle login
//       const result = await signIn('credentials', {
//         redirect: false,
//         email: formData.email,
//         password: formData.password
//       });

//       if (result?.error) {
//         setError(result.error);
//       } else {
//         router.push('/');
//       }
//     } catch (err: any) {
//       setError(err.response?.data?.error || 'Something went wrong');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
//         <h1 className="text-2xl font-bold mb-6 text-center">
//           {isRegistering ? 'Register' : 'Sign In'}
//         </h1>

//         {error && (
//           <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
//         )}

//         {isRegistering && (
//           <div className="mb-4">
//             <label className="block text-sm font-medium mb-1">Name</label>
//             <input
//               type="text"
//               value={formData.name}
//               onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>
//         )}

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Email</label>
//           <input
//             type="email"
//             value={formData.email}
//             onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-medium mb-1">Password</label>
//           <input
//             type="password"
//             value={formData.password}
//             onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 mb-4"
//         >
//           {isRegistering ? 'Register' : 'Sign In'}
//         </button>

//         <button
//           type="button"
//           className="text-sm text-blue-600 hover:underline"
//           onClick={() => setIsRegistering(!isRegistering)}
//         >
//           {isRegistering
//             ? 'Already have an account? Sign In'
//             : 'Need an account? Register'}
//         </button>
//       </form>
//     </div>
//   );
// }




"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Directly call your backend signup endpoint
      const response = await axios.post(
        'https://caimera-4.onrender.com/user/userregistration',
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      );

      // If registration successful, redirect to home
      if (response.status === 201) {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}