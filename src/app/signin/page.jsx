"use client"
import Image from 'next/image';
import bg from "../../../public/pizza.PNG";
import React from 'react';
import { signIn } from "next-auth/react";
import Link from 'next/link';

const page = () => {
    const handleSignIn= async(e)=>{
        e.preventDefault()
        const email =e.target.email.value
        const password =e.target.password.value
        const res = await signIn("credentials",{
            email,
            password,
            redirect: false,
        })
        console.log(res)
    }
    return (
        <div className="">
      <Image
        src={bg}
        alt="pizza"
        className="-z-10 absolute"
        layout="fill"
        
      />
      <div className="relative flex items-center justify-center h-screen">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h2 className="text-primary text-3xl font-bold text-center pt-4">Sign In</h2>
          <form onSubmit={handleSignIn} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                name="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                name="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn bg-primary text-white">Sign In</button>
            </div>
          </form>
          <h2 className="text-center pb-1">
            Don{"'"}t have an account? <span className="text-primary font-bold"><Link href={'/register'}>Register Now!!!</Link></span>
          </h2>
        </div>
      </div>
    </div>
    );
};

export default page;