import { connectDb } from "@/app/services/connectDb"
import { ObjectId } from "mongodb"

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

export const PUT =async(request)=>{
    const db = await connectDb()
    const categoriesCollection = await db.collection('categories')
    try {
        const categoryData =await request.json()
        const{_id,category} =categoryData
        console.log(_id,category)
        const updateDoc ={
            $set:{
                category: category
            }
        }
        const result = await categoriesCollection.updateOne({_id :new ObjectId(_id)},updateDoc,{upsert:true})
        return Response.json(result)
    } catch (error) {
        console.log(error)
    }
}

export const DELETE = async (request)=>{
    const db = await connectDb()
    const categoriesCollection = await db.collection('categories')
    try {
        const id =await request.json()
        console.log(id)
        const result=await categoriesCollection.deleteOne({_id:new ObjectId(id)})
        return Response.json(result) 
    } catch (error) {
        console.log(error)
    }
}