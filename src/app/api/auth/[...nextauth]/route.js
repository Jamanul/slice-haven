import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const handler = NextAuth({
    secret: "",
    session:{
        strategy: "jwt",
        maxAge: 30*24*60*60
    }, 
    providers : [
        CredentialsProvider({
            
        }),
      ],
    callbacks :{}
})



export { handler as GET, handler as POST }