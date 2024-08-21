"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const page = () => {
    const session =useSession()
    const image= session?.data?.user?.image
    return (
        <div className='mx-auto max-w-3xl'>
            <h2 className='text-primary text-center text-4xl mt-4 font-bold'>Profile</h2>
           <div className='flex max-w-2xl border justify-center gap-6 items-center'>
            <div>
                <Image src={image} height={150} width={150}/>
                <button className='font-bold border rounded-2xl px-4 py-2'>Change Image</button>
            </div>
            <form action="" className='mx-auto max-w-lg'>
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
                </form>            
           </div>
        </div>
    );
};

export default page;