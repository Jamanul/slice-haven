import bcrypt from "bcrypt";
import { connectDb } from "@/app/services/connectDb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const db = await connectDb()
    const userCollection = db.collection('users')
    const user = await request.json()
    try {
        
        //console.log(user)
        const exist = await userCollection.findOne({email: user.email})
        //console.log(exist)
        if(exist){
            return Response.json({message: "user Already exist"})
        }
        
        const hashedPassword = bcrypt.hashSync(user.password, 14);
        const newUser = {...user,password: hashedPassword}
        //console.log(newUser)
        const res = await userCollection.insertOne(newUser)
        //console.log(res)
        //console.log(res)
        return Response.json({message: "user added"},{status: 200})
    } catch (error) {
        console.log(error)
    }
};
