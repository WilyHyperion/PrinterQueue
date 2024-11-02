import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"
import {getLoggedUser} from "./lib/credentiallogins"

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [ Google({
    clientId: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
  }), Credentials({
    credentials: {
        email: { label: "Email", type: "email" },
        password: {  label: "Password", type: "password" },
    },
    async authorize(credentials, request) {
       try {
        console.log(credentials, "credentials")
        const user = await getLoggedUser(credentials.email as String, credentials.password as String)
        if (!user.error) {
          console.log("user", user)
            user.id = user._id
            return user
        } else {
            return null
        }
       } catch (error) {
        console.log("error", error)
       } 
    },
    
  })],
  pages: {
    signIn: "/login",
    signOut: "/logout",
    
  },
})