"use client";
import UserTabs from "@/components/layout/UserTabs";
import axios from "axios";
import { useSession } from "next-auth/react";

import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
  const imageHostingKEY = process.env.NEXT_PUBLIC_IMAGE_HOSTING
const page = () => {

//console.log(imageHostingKEY)
  const session = useSession();
  const image = session?.data?.user?.image;
  const [fullName, setFullName] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const pathName = usePathname();
  //console.log(pathName)
  useEffect(() => {
    if (session?.data?.user?.name) {
      setFullName(session?.data?.user?.name);
      //   setIsAdmin(session?.data?.user?.isAdmin);
    }
  }, [session, session.status,image]);
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

  const handleImage = async(e)=>{
    //console.log(e.target.files[0])
    const image = {image: e.target.files[0]}
    const res =await axios.post(`https://api.imgbb.com/1/upload?key=${imageHostingKEY}`,image,{
      headers: {"content-type":'multipart/form-data'}
    })
    //console.log(res.data)
    //console.log(res.data.data.url)
    if(res.data.success){
      //console.log(res.data.data.url)
    await fetch('http://localhost:3000/api/editPhoto',{
        body: JSON.stringify(res.data.data.url),
        headers:{
          "content-type": "application/json"
        },
        method:"PUT"
      });
      window.location.reload()
      //console.log(res)
    }
  }

  if (session.status == "unauthenticated") {
    return redirect("/signin");
  }

  return (
    <div className="mx-auto max-w-3xl min-h-screen ">
      <div className="py-12">
        <UserTabs isAdmin={isAdmin} pathname={pathName} />
      </div>
      <div className=" max-w-md mx-auto ">
        <div className="flex items-center">
          <div className="text-center">
            <Image
              src={image}
              height={150}
              width={150}
              alt="logo"
              className="rounded-2xl"
            />
            <button className="font-bold border rounded-2xl px-4 py-2">
              <label>
                <input type="file" name="" id="" className="hidden" onChange={handleImage}/>
                <span>Change Image</span>
              </label>
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
