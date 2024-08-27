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
  console.log(session)
  const image = session?.data?.user?.image;
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [street, setStreet] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [isAdmin, setIsAdmin] = useState(true);
  const pathName = usePathname();
  //console.log(pathName)
  useEffect(() => {
    if (session?.data?.user?.name) {
      setFullName(session?.data?.user?.name);
      setPhoneNumber(session?.data?.user?.phoneNumber);
      setZip(session?.data?.user?.zip);
      setStreet(session?.data?.user?.street);
      setCity(session?.data?.user?.city);
      setCountry(session?.data?.user?.country);
      // setFullName(session?.data?.user?.name);
      //   setIsAdmin(session?.data?.user?.isAdmin);
    }
  }, [session, session.status,image]);
  const handleEditName = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;
    const street = form.street.value;
    const zip = form.zip.value;
    const country = form.country.value;
    const city = form.city.value;
    const userData = {
      name,phoneNumber,street,zip,country,city
    };
    console.log(userData)
    const res = await fetch("http://localhost:3000/api/edit", {
      body: JSON.stringify(userData),
      headers: {
        "content-type": "application/json",
      },
      method: "PUT",
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
      <div className="max-w-lg mx-auto ">
        <div className="flex flex-col md:flex-row items-center relative">
          <div className="text-center md:absolute top-0 left-0">
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
            className="mx-auto "
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
                className="input input-bordered mt-2 bg-slate-300"
                readOnly
                required
              />
            </div>
            <div className="form-control">
              <input
                type="number"
                placeholder="Your phone Number"
                name="phoneNumber"
                value={phoneNumber}
                className="input input-bordered mt-2"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="Street"
                name="street"
                value={street}
                className="input input-bordered mt-2"
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>
            <div className="flex flex-col"> 
            <div className="form-control ">
              <input
                type="number"
                placeholder="zip"
                name="zip"
                value={zip}
                className="input input-bordered mt-2"
                onChange={(e) => setZip(e.target.value)}
              />
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="city"
                name="city"
                value={city}
                className="input input-bordered mt-2"
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            </div>
            <div className="form-control">
              <input
                type="text"
                placeholder="country"
                name="country"
                value={country}
                className="input input-bordered mt-2"
                onChange={(e) => setCountry(e.target.value)}
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
