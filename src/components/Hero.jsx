import Image from "next/image";
import React from "react";
import { Right } from "./icons/Right";

const Hero = () => {
  return (
    <div className="grid grid-cols-10 mt-6">
      <div className="col-span-4 my-12">
        <h2 className="text-5xl font-bold ">
          Everything <br /> is better <br /> with a{" "}
          <span className="text-primary">Pizza</span>{" "}
        </h2>
        <p className="text-gray-600 font-bold my-6">
          Pizza is the missing piece that makes every <br />
          day complete, a simple yet delicious joy in life.
        </p>
        <div className="flex">
          <button className="mx-2 py-2 px-4 flex items-center gap-2 bg-primary text-white hover:scale-105 duration-700 rounded-full">Order Now <Right/></button>
          <p className="font-bold py-2 px-4 flex items-center gap-2 border border-gray-500 rounded-full hover:scale-105 duration-700 text-gray-600">Learn more <Right/></p>
        </div>
      </div>
      <div className="relative col-span-6 ">
        <Image
          alt="pizza.exe"
          layout="fill"
         
          objectFit="contain"
          src={"/pizza.jpg"}
        />
      </div>
    </div>
  );
};

export default Hero;
