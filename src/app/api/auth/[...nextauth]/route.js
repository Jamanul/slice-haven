import { connectDb } from "@/app/services/connectDb"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
const handler = NextAuth({
    secret: "h",
    session:{
        strategy: "jwt",
        maxAge: 30*24*60*60
    }, 
    providers : [
        CredentialsProvider({
            credentials:{
                email:{},
                password:{}
            },
            async authorize(credentials){
                const {email,password}= credentials
                if(!email || !password){
                    return null
                }
                const db =await connectDb()
                const userCollection = db.collection('users')
                const currentUser = await userCollection.findOne({email: email})
                if(!currentUser){
                    return null
                }
                const passwordMatched= bcrypt.compareSync(password, currentUser.password)
                if(!passwordMatched){
                    return null
                }
                console.log(currentUser)
                console.log(passwordMatched)
                return currentUser
            }
        }),
      ],
    callbacks :{}
})



export { handler as GET, handler as POST }