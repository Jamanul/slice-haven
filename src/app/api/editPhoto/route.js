import { connectDb } from "@/app/services/connectDb"
import { authOptions } from "../auth/[...nextauth]/route"
import { getServerSession } from "next-auth"

export const PUT = async(request)=>{
 
    try {
        const db = await connectDb()
        const userCollection = db.collection('users')
        const session =await getServerSession(authOptions);
        console.log(session)
        const imageUrl =await request.json()
        //console.log(imageUrl)
        const options = {upsert: true}
        const updateDoc = {
            $set: {
                photoUrl : imageUrl
            },
          };
        //console.log(imageUrl)
        const result = await userCollection.updateOne({email:session?.user?.email},updateDoc,options)
        //console.log(result)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}