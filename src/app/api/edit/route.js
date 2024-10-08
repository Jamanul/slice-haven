import { connectDb } from "@/app/services/connectDb"

import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const PUT=async(request)=>{
    const editData = await request.json()
    //console.log(editData)
    try {
        const db = await connectDb()
        const userCollection = db.collection('users')
        const session =await getServerSession(authOptions)
        //console.log(session)
        const userEmail = session?.user?.email
        const filter = {email: userEmail}
        console.log(filter)
        const options = {upsert: true}
        const updateDoc = {
            $set: {
                name : editData.name,
                phoneNumber : editData.phoneNumber,
                zip : editData.zip,
                country : editData.country,
                street : editData.street,
                city : editData.city
            },
          };
          const res =await userCollection.updateOne(filter,updateDoc,options) 
          console.log(res)
          return Response.json(res)
    } catch (error) {
        console.log(error)        
    }
}