"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const session = useSession();
  console.log(session);

  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-8 items-center text-gray-500 font-bold">
        <Link className="text-2xl text-primary font-semibold" href={"/"}>
          Slice Haven
        </Link>
        <Link className="hover:text-primary transition duration-700" href={""}>
          Home
        </Link>
        <Link className="hover:text-primary transition duration-700" href={""}>
          Menu
        </Link>
        <Link className="hover:text-primary transition duration-700" href={""}>
          About
        </Link>
        <Link className="hover:text-primary transition duration-700" href={""}>
          Contact
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        {session.status === "authenticated" ? (
        <> <Link href={'/profile'}><p className="text-gray-500 font-bold hover:text-primary transition duration-700">{session?.data?.user?.name}</p> </Link> <button onClick={()=>signOut()} className="bg-primary transform transition-transform duration-300 hover:scale-110 text-white px-6 py-2 rounded-full">
        Log out
      </button></>
        ) : (
          <>
            {" "}
            <Link
              className="hover:text-primary transition duration-700 text-gray-500 font-bold"
              href={"/signin"}
            >
              Login
            </Link>
            <Link
              className="bg-primary transform transition-transform duration-300 hover:scale-110 text-white px-6 py-2 rounded-full"
              href={"/register"}
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
