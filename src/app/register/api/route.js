import { connectDb } from "@/app/services/connectDb";
import { NextResponse } from "next/server";

export const POST = async (request) => {
    const db = await connectDb()
    const userCollection = db.collection('users')
    try {
        const user = await request.json()
        console.log(user)
        const exist = await userCollection.findOne({email: user.email})
        console.log(exist)
        if(exist){
            return NextResponse.json({message: "user Already exist"})
        }
        const res = await userCollection.insertOne(user)
        console.log(res)
        return NextResponse.json({message: "user added"},{status: 200})
    } catch (error) {
        console.log(error)
    }
};
