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
        </div>
    );
};

export default page;