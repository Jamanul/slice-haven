"use client"
import UserTabs from '@/components/layout/UserTabs';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';

const page = () => {
    const [isAdmin,setIsAdmin]=useState(true)
    const pathName =usePathname()
    return (
        <div>
         <UserTabs isAdmin={isAdmin} pathname={pathName}/>  
         <form action="">
            <div className='flex flex-col'>
                 <label >
                Create A Category
            </label>
            <div className='flex gap-2'>
            <input type="text"  className='input input-bordered max-w-md grow'/>
            <input type="submit" value="Create" className='bg-primary btn text-white' />
            </div>
       
            </div>
           
         </form>
        </div>
    );
};

export default page;