import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import clientPromise from "../../../lib/mongodb";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  pages:{
    signIn: '/auth/signin',
    signOut: '/',
  },
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    redirect: async (url, _baseUrl) => {
      if (url.toString() === '/profile') {
        return Promise.resolve('/')
      }
      return Promise.resolve('/')
    }
  }
})