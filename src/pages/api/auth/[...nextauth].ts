import SteamProvider from '../../../utils/steam'
import NextAuth from 'next-auth/next'
import GoogleProvider from "next-auth/providers/google"
import FaceitProvider from "next-auth/providers/faceit"
import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, {
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
      }),
     TwitterProvider({
        clientId: process.env.TWITTER_ID!,
        clientSecret: process.env.TWITTER_SECRET!,
        version: "2.0"
      }),
      // SteamProvider(req, {
      //   clientSecret: process.env.STEAM_CLIENT_SECRET!,
      //   callbackUrl: 'http://localhost:3000/api/auth/callback/steam',
      // }), 
    ],   secret: process.env.sercet,  pages:{
        signIn: "/auth/signin"
      },  session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
      },callbacks: {
       async session({ session, user,token}) {

          if (session.user) {
            if(!session.user.email) {
              session.user.email = `${user.name}@twitter.com`
            }
            session.user.id = user.id;
          }
          console.log(session,user,token)
          return session;
        },
      }
  })


//Fall back if this down work!
  // return NextAuth(req, res,authOptions)
}

