import React from "react";
import bg from "../../../public/pizzaDoodle.jpg";
import Image from "next/image";

const registerPage = () => {
  return (
    <div className="h-screen">
      <Image src={bg} alt="pizza" className="-z-10 absolute" layout="fill"  objectFit="cover" />
      <div className="relative flex items-center justify-center h-screen">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input type="text" placeholder="Name" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo Url</span>
          </label>
          <input type="text" placeholder="Photo URl" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="password" className="input input-bordered" required />
          
        </div>
        <div className="form-control mt-6">
          <button className="btn bg-primary text-white">Register</button>
        </div>
      </form>
    </div>
      </div>
    </div>
  );
};

export default registerPage;
