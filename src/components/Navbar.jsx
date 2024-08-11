import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
      <div><Link className="text-2xl text-primary font-semibold" href={'/'}>Slice Haven</Link> </div>
      <div className="flex gap-8 items-center text-gray-500 font-bold">
        <Link className="hover:text-primary transition duration-700" href={''}>Home</Link>
        <Link className="hover:text-primary transition duration-700" href={''}>Menu</Link>
        <Link className="hover:text-primary transition duration-700" href={''}>About</Link>
        <Link className="hover:text-primary transition duration-700" href={''}>Contact</Link>
        <Link className="bg-primary transform transition-transform duration-300 hover:scale-110 text-white px-6 py-2 rounded-full" href={''}>Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
