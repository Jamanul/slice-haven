"use client";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const session = useSession();
  const image = session?.data?.user?.image;
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    if (session?.data?.user?.name) {
      setFullName(session?.data?.user?.name);
    }
  }, [session, session.status]);
  const handleEditName = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const userData = {
      name,
    };
    const res = await fetch("http://localhost:3000/api/edit", {
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
      method: "PATCH",
    });
    console.log(res);
  };

  if(session.status== 'unauthenticated'){
    return redirect('/signin')
  }

  return (
    <div className="mx-auto max-w-3xl min-h-screen ">
      <h2 className="text-primary text-center text-4xl mt-4 font-bold">
        Profile
      </h2>
      <div className=" max-w-md mx-auto ">
        <div className="flex items-center">
          <div className="text-center">
            <Image src={image} height={150} width={150} alt="logo" className="rounded-2xl"/>
            <button className="font-bold border rounded-2xl px-4 py-2">
              Change Image
            </button>
          </div>
          <form
            onSubmit={handleEditName}
            action=""
            className="mx-auto max-w-lg"
          >
            <div className="form-control">
              <input
                type="text"
                placeholder="First and Last name"
                name="name"
                value={fullName}
                className="input input-bordered"
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="First and Last name"
                name="name"
                value={session.data?.user?.email}
                className="input input-bordered mt-2"
                readOnly
                required
              />
            </div>
            <div className="form-control mt-2">
              <button className="btn bg-primary text-white">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
