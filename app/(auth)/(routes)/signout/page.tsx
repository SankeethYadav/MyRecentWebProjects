"use client";


import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signOut } from "next-auth/react";


export default function SignOutPage() {
    return (
    
      <div className="h-screen w-screen flex justify-center items-center bg-slate-100">

      <div className="grid justify-items-center sm:shadow-xl px-8 pb-8 pt-5 sm:bg-white rounded-xl ">
      <img src="./fsai-logo.jpeg" alt="Icon Image" className="w-60"/>
        <h1 className="font-semibold text-2xl">Are you sure, you want to logout?</h1>
        <div className="pt-9 space-x-3">
        <Button className="" size="lg">
        <Link href={'/signin'}>Cancel</Link>
          </Button>
          <Button className="" size="lg" onClick={() => signOut({ callbackUrl: 'http://localhost:3000/signin' })}>
            Sign Out
          </Button>
          </div>
        
      </div>
    </div>
    
    )
  };