"use client";

import React, { useState } from "react";
import Common from "@/components/Common";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai'; // Import user icon

const SignInPage = () => {
  const [name, setName] = useState(""); // Add state for the name field
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Signing in with:", { name, email, password }); // Include name in the log

    try {
      // Replace with your actual authentication logic - make sure your backend expects a 'name' field for sign-in
      const response = await fetch('@/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Send name to the backend
      });

      if (response.ok) {
        router.push('/dashboard'); // Redirect on success
      } else {
        const errorData = await response.json();
        console.error("Sign in failed:", errorData);
        // Display error to user
      }
    } catch (error) {
      console.error("An error occurred during sign in:", error);
      // Handle network error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100" style={{ paddingTop: 40, marginTop: 0 }}>
      <div className="w-full flex justify-center mb-8">
        <h1 className="text-3xl font-bold text-center">Sign In</h1>
      </div>
      <div className="w-full md:w-[424px] h-[auto] bg-white shadow-sm space-y-4 rounded-lg p-6">
        <form onSubmit={handleSignIn}>
          {/* Add the Name field here */}
          <div className="flex p-4 gap-4 rounded-md border-[1px] items-center">
            <AiOutlineUser size={24} />
            <input
              type="text"
              placeholder="Name"
              className="flex-1 text-[#000000]"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex p-4 gap-4 rounded-md border-[1px] items-center">
            <MdOutlineMailOutline size={24} />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 text-[#000000]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative flex p-4 gap-4 rounded-md border-[1px] items-center">
            <CiLock size={24} />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              className="flex-1 text-[#000000]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 focus:outline-none"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
            </button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="bg-yellow-500 text-[#ffffff] mr-2"
              />
              <p className="text-sm">Remember Me</p>
            </div>
            <Link href="/forgot-password" className="text-sm text-yellow-500">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full h-[44px] rounded-md bg-yellow-500 text-[#ffffff] p-3"
          >
            Sign In
          </button>
          <div className="flex items-center justify-center my-4">
            <hr className="w-1/3 bg-gray-500 border-[1px]" />
            <span className="text-gray-500 px-3">OR</span>
            <hr className="w-1/3 bg-gray-500 border-[1px]" />
          </div>
          <div className="flex gap-4 items-center justify-center p-4 rounded-md border-[1px]">
            <FcGoogle size={24} />
            <p>Sign in with Google</p>
          </div>
          <div className="flex gap-4 items-center justify-center p-4 rounded-md border-[1px]">
            <FaApple size={24} />
            <p>Sign in with Apple</p>
          </div>
        </form>
        <p className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <Link href="/signup" className="text-yellow-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;