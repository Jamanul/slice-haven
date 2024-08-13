"use client"
import React from "react";
import bg from "../../../public/pizza.PNG";
import Image from "next/image";
import Link from "next/link";

const registerPage = () => {
  const handleRegister =async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;
    const password = form.password.value;
    const email = form.email.value;
    const user = {
      name,
      photoUrl,
      password,
      email,
    };
    console.log(user)
    const res = await fetch('http://localhost:3000/register/api',{
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(user)
    })
    console.log(res)
  };
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
          <h2 className="text-primary text-3xl font-bold text-center pt-4">Register</h2>
          <form onSubmit={handleRegister} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Photo Url</span>
              </label>
              <input
                type="text"
                name="photoUrl"
                placeholder="Photo URl"
                className="input input-bordered"
                required
              />
            </div>
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
              <button className="btn bg-primary text-white">Register</button>
            </div>
          </form>
          <h2 className="text-center pb-1">
           Already have an account?  <Link href={"/signin"}><span className="text-primary font-bold">Sign in</span></Link>
          </h2>
        </div>
      </div>
    </div>
  );
};

export default registerPage;
