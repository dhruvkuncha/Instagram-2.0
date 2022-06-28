import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { FirebaseAdapter } from "@next-auth/firebase-adapter"
import * as firestoreFunctions from '@firebase/firestore'
import "firebase/firestore"
import { db } from "../../../firebase"
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
  secret: 'IamVeryHandsome',
  pages: {
    signIn: '/auth/signin',
  },
  // adapter: FirebaseAdapter({
  //   db: db,
  //   ...firestoreFunctions,
  // }),
  callbacks: {
    async session({ session, token, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLocaleLowerCase();
      session.user.uid = token.sub;
      return session;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
  },
});

