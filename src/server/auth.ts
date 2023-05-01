import {
  type NextAuthOptions,
  type DefaultSession,
} from "next-auth";
import getServerSession from "next-auth/next";
import SteamProvider from "../utils/steam";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./db/client";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google"
declare module "next-auth" {
  interface Session extends DefaultSession {
    userLogin: {
      id: string;
    } & DefaultSession["user"];
  }

}


const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
GoogleProvider({
  clientId: process.env.GOOGLE_ID!,
  clientSecret: process.env.GOOGLE_SECRET!,
  authorization: {
    params: {
      prompt: "consent",
      access_type: "offline",
      response_type: "code"
    }
  },
}),
    SteamProvider({
      clientId: process.env.STEAM_CLIENT_ID!,
      clientSecret: process.env.STEAM_CLIENT_SECRET!,
    }),TwitterProvider({
        clientId: process.env.TWITTER_ID!,
        clientSecret: process.env.TWITTER_SECRET!,
        version: "2.0" , 
      })

  ],  pages:{
    signIn: "/auth/signin"
  },
  secret: process.env.sercet,  
  session: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },  
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
};


export const getServerAuthSession = (ctx: {
  req: any;
  res: any;
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};


export default authOptions;