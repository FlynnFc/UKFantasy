/* eslint-disable @typescript-eslint/no-non-null-assertion */
import NextAuth, { type NextAuthOptions } from "next-auth";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma} from "../../../server/db/client";
import GoogleProvider from "next-auth/providers/google"
import FaceItProvider from "next-auth/providers/faceit";

export const authOptions: NextAuthOptions = {

  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [GoogleProvider({
    clientId: process.env.GOOGLE_ID!,
    clientSecret: process.env.GOOGLE_SECRET!,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    },
  })   ,  FaceItProvider({
    clientId: process.env.FACEIT_CLIENT_ID,
    clientSecret: process.env.FACEIT_CLIENT_SECRET
  })],
  pages:{
    signIn: "/auth/signin"
  },
  secret: process.env.sercet,  

  // Include user.id on session
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);



