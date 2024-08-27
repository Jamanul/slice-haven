import { connectDb } from "@/app/services/connectDb"

export const POST = async(request)=>{
    const db = await connectDb()
    const categoriesCollection = db.collection('categories')
    try {
        const category =await request.json()
        const result = await categoriesCollection.insertOne(category)
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}