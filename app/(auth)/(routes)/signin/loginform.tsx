"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
//import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";



export const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [email, setEmail] = useState("");
  //const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        //password,
        callbackUrl
      })
      console.log("Res", res);
      if (!res?.error) {
        router.push(callbackUrl);
      } else {
        setError("Invalid email or password");
      }
    } catch (err: any) {}
  };


return(
  <form onSubmit={onSubmit} className="w-full h-screen flex items-start">
    <div className="relative sm:block hidden w-1/3 h-full flex flex-col">
      <img src="/img/image.jpg" className="w-full h-full object-cover" />
    </div>

    <div className="sm:w-2/3 h-full bg-[#f5f5f5] flex flex-col px-10 py-20 flex items-center justify-center">
      {/* <h1 className="text-xl text-[060606] font-semibold">FoodSupply.AI</h1> */}

      <div className="w-[432px] h-[515px] bg-orange-50 px-10 py-20 rounded-2xl shadow flex flex-col items-center justify-center">
        <div className="w-full flex flex-col text-center">
          <h3 className="text-2xl font-['Manrope'] font-semibold mb-2">Sign in</h3>
          {/* <p className="text-base mb-2">Welcome Back Please enter your details</p> */}
        </div>

        <div className="w-full flex flex-col my-4 flex items-center justify-center">
          <button onClick={() => signIn("google")} className="w-[190px] h-[45px] text-black my-2 bg-white border border-black hover:border-blue-500 rounded-xl p-4 text-center flex items-center justify-center cursor-pointer text-xs whitespace-nowrap font-['Manrope']">
            <img src="/img/google.svg" alt="Google Icon" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        </div>

        <div className="w-full flex flex items-center justify-center relative py-2">
          {/* <div className="w-full h-[1px] bg-black/40"></div> */}
          <p className="text-lg absolute text-black/60 bg-orange-50 font-['Manrope']">-OR-</p>
        </div>
        

        <div className="w-full flex flex-col font-['Manrope']">
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none" />

      
        </div>

        {/* <div className="w-full flex items-center justify-between">
          <div className="w-full flex items-center">
            <input type="checkbox" className="w-4 h-4 mr-2" />
            <p className="sm:text-xs text-sm">Remember Me</p>
          </div>
          <p className="text-sm text-teal-300 font-medium whitespace-nowrap cursor-pointer underline underline-offset-2">Forgot Password?</p>
        </div> */}
        <div className="w-full flex flex-col items-center justify-center my-4">
          <button className="w-[303px] h-[44px] text-white my-2 font-semibold bg-[#13B894] hover:bg-[#13B894] rounded-xl p-4 text-center flex items-center justify-center cursor-pointer font-['Manrope']">
            Log In
          </button>
        </div>

      </div>

      {/* <div className="w-full flex items-center justify-center">
        <p className="text-sm font-normal text-black">Dont have an Account <a href="http://localhost:3000/signup" className="text-blue-500 underline">Sign up for Free</a></p>
      </div> */}
    </div>
  </form>
);
};
