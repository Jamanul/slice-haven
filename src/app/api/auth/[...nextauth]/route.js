import { connectDb } from "@/app/services/connectDb"
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
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
                // console.log(currentUser)
                // console.log(passwordMatched)
                return currentUser
            }
        }),
      ],
    callbacks :{
        async jwt({ token, account, user }) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            // console.log('account',account)
            // console.log('user',user)
            const db =await connectDb()
            const userCollection = db.collection('users')
            const currentUser = await userCollection.findOne({email:token.email})
            //console.log(currentUser)
              if(currentUser){
                token.photUrl = currentUser?.photoUrl
              }
            
            return token
          },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            //console.log('token',token)
            //console.log(session.user.photoURL)
            
            session.user.image = token?.photUrl
            //console.log(session)
            return session
          }
    }
}

const handler = NextAuth(authOptions)



export { handler as GET, handler as POST }