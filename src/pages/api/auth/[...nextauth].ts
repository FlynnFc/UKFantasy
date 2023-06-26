import SteamProvider from '../../../utils/steam'
import NextAuth from 'next-auth/next'
import GoogleProvider from "next-auth/providers/google"
import FaceitProvider from "next-auth/providers/faceit"
import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import authOptions from '../../../server/auth';
import { userAgent } from 'next/server';
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
        version: "2.0" ,  authorization: {
          url: "https://twitter.com/i/oauth2/authorize",
          params: {
            scope: "users.read tweet.read offline.access",
          },
        },
      })
    ],   secret: process.env.sercet,  pages:{
        signIn: "/auth/signin"
      },  session: {
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
      },callbacks: {
        async session({ session, user }) {
          if(session.user) {
            const prismaUser = await prisma.user.findUnique({
              where: {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                email: session.user.email!,
              },
              include: {
                accounts: true,
              },
            });
            const steamAccount = prismaUser?.accounts.find(a => a.provider == "steam");
            session.user.id = steamAccount?.id ? steamAccount.id : user.id as string;
          }
    
            return session;
        },
      }
  })


//Fall back if this down work!
  // return NextAuth(req, res,authOptions)
}

