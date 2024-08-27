import { connectDb } from "@/app/services/connectDb"

export const POST = async(request)=>{
    const db = await connectDb()
    const categoriesCollection = db.collection('categories')
    try {
        const category =await request.json()
        //console.log(category)
        const result = await categoriesCollection.insertOne(category)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}

export const GET =async()=>{
    const db = await connectDb()
    const categoriesCollection =await db.collection('categories')
    try {
        const result = await categoriesCollection.find().toArray()
        return Response.json(result)
    } catch (error) {
        console.log(error)
    } 
}