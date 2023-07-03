import SteamProvider from '../../../utils/steam'
import NextAuth from 'next-auth/next'
import GoogleProvider from "next-auth/providers/google"
import FaceitProvider from "next-auth/providers/faceit"
import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import authOptions from '../../../server/auth';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),
    providers: [FaceitProvider({clientId:process.env.FACEIT_ID, clientSecret:process.env.FACEIT_SECRET}) ,GoogleProvider({
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
      SteamProvider(req, {
        clientSecret: process.env.STEAM_CLIENT_SECRET!,
        callbackUrl: 'https://esportsfantasy.app/api/auth/callback/steam'
      }), TwitterProvider({
        clientId: process.env.TWITTER_ID!,
        clientSecret: process.env.TWITTER_SECRET!,
        version: "2.0"
      })
    ],   secret: process.env.sercet,  pages:{
        signIn: "/auth/signin"
      },  session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
      },callbacks: {
        session({ session, user, token }) {
      console.log("sadasoidhaosid ", user)
          if (session.user) {
            session.user.id = user.id;
          }
          return session;
        },
      }
  })


//Fall back if this down work!
  // return NextAuth(req, res,authOptions)
}

