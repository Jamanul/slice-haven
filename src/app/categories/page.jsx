"use client";
import UserTabs from "@/components/layout/UserTabs";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

const page = () => {
  const [isAdmin, setIsAdmin] = useState(true);
  const [category, setCategory] = useState([]);
  const [inputValue,setInputValue]=useState('')
  const [singleCategory,setSingleCategory]=useState(null)
  const pathName = usePathname();
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const res = await fetch("http://localhost:3000/api/categories", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    setCategory(data);
  };
  const handleCategories = async (e) => {
    e.preventDefault();
    const name = e.target.category.value;
    const data ={
        category: name
    }
    if(singleCategory){
       data._id =singleCategory._id
    }
    const res = await fetch("http://localhost:3000/api/categories", {
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
      method: singleCategory ? "PUT":"POST",
    });
    getCategory()
    console.log(res);
  };
  const handleDelete=async(id)=>{
    const res = await fetch(`http://localhost:3000/api/categories`,{
      method: "delete",
      body: JSON.stringify(id)
    })
    getCategory()
    console.log(res);
  }
  return (
    <div>
      <UserTabs isAdmin={isAdmin} pathname={pathName} />
      <form action="" onSubmit={handleCategories}>
        <div className="flex flex-col">
          <label className="text-sm text-gray-500 font-bold">{singleCategory ?  `Update category "${singleCategory?.category}"` : "Create a category"}</label>
          <div className="flex gap-2">
            <input
              type="text"
              name="category"
              value={inputValue}
              className="input input-bordered max-w-md grow"
              onChange={e=>setInputValue(e.target.value)}
            />
            <input
              type="submit"
              value={singleCategory ? 'Update' : "Create"}
              className="bg-primary btn text-white"
            />
          </div>
        </div>
      </form>
      {
        category.length> 0 ? <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No</th>
              <th>Category Name</th>
                <th>Update</th>
                <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {category?.map((c, idx) => (
              <tr key={c._id}>
                <th>{idx + 1}</th>
                <td>{c.category}</td>
                <td><button onClick={()=>{setSingleCategory(c);setInputValue(c.category)}} className="bg-primary text-white btn">Update</button></td>
                <td><button onClick={()=>handleDelete(c._id)} className="bg-primary text-white p-2 text-3xl"><MdDelete/></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : ""
      }
    </div>
  );
};

export default page;
