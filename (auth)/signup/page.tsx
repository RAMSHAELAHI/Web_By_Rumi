"use client";

import React, { useState } from "react";
import Common from "@/components/Common";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineMailOutline } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'; // Import eye icons

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Signing up with:", { name, email, password });

    try {
      // Replace with your actual registration logic
      const response = await fetch('@/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        router.push('/signin'); // Redirect to sign in after successful signup
      } else {
        const errorData = await response.json();
        console.error("Sign up failed:", errorData);
        // Display error to user
      }
    } catch (error) {
      console.error("An error occurred during sign up:", error);
      // Handle network error
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100" style={{ paddingTop: 40, marginTop: 0 }}> {/* Adjusted paddingTop */}
      <div className="w-full flex justify-center mb-8"> {/* Centered and added bottom margin */}
        <h1 className="text-3xl font-bold text-center">Sign Up</h1> {/* Bold and larger heading */}
      </div>
      <div className="w-full md:w-[424px] h-[624px] bg-white shadow-sm space-y-4 rounded-lg p-6"> {/* Removed top margin from form */}
        <form onSubmit={handleSignUp}>
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
              type={showPassword ? 'text' : 'password'} // Toggle password visibility
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
          <div className="flex p-4 gap-4 items-center">
            <input type="checkbox" className="bg-yellow-500 text-[#ffffff]" />
            <p>Remember Me?</p>
          </div>
          <button type="submit" className="w-full h-[44px] rounded-md bg-yellow-500 text-[#ffffff] p-3">
            Sign Up
          </button>
          <p className="text-right mt-4">Forgot Password</p>
          <div className="flex items-center justify-center my-4">
            <hr className="w-1/3 bg-gray-500 border-[1px]" />
            <span className="text-gray-500 px-3">OR</span>
            <hr className="w-1/3 bg-gray-500 border-[1px]" />
          </div>
          <div className="flex gap-4 items-center justify-center p-4 rounded-md border-[1px]">
            <FcGoogle size={24} />
            <p>Sign up with Google</p>
          </div>
          <div className="flex gap-4 items-center justify-center p-4 rounded-md border-[1px]">
            <FaApple size={24} />
            <p>Sign up with Apple</p>
          </div>
        </form>
        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link href="/signin" className="text-yellow-500">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;