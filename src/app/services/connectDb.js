import { MongoClient, ServerApiVersion } from "mongodb";

let db;

export const connectDb = async()=>{
    if(db){
        return db
    }
    try {
        const uri = `mongodb+srv://${process.env.NEXT_PUBLIC_DB_USER}:${process.env.NEXT_PUBLIC_DB_PASSWORD}@cluster0.dibths0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            },
          });
          db = client.db("slice-haven")
          return db;
    } catch (error) {
        console.log(error)
    }
}