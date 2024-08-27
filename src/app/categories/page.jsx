"use client"
import UserTabs from '@/components/layout/UserTabs';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const page = () => {
    const [isAdmin,setIsAdmin]=useState(true)
    const [category,setCategory]=useState([])
    const pathName =usePathname()
    useEffect(()=>{
        getCategory()
    },[])
    const getCategory =async()=>{
        const res = await fetch('http://localhost:3000/api/categories',{
            method: "GET",
            headers:{
                "content-type":"application/json"
            },
        })
        const data = await res.json()
        setCategory(data)
    }
    const handleCategories =async(e)=>{
        e.preventDefault()
        const name = e.target.category.value
        const res = await fetch('http://localhost:3000/api/categories',{
            body: JSON.stringify({category:name}),
            headers:{
                "content-type":"application/json"
            },
            method: "POST" 
        })
        console.log(res)
    }
    return (
        <div>
         <UserTabs isAdmin={isAdmin} pathname={pathName}/>  
         <form action="" onSubmit={handleCategories}>
            <div className='flex flex-col'>
                 <label >
                Create A Category
            </label>
            <div className='flex gap-2'>
            <input type="text" name='category' className='input input-bordered max-w-md grow'/>
            <input type="submit" value="Create" className='bg-primary btn text-white' />
            </div>
       
            </div>
           
         </form>
        </div>
    );
};

export default page;