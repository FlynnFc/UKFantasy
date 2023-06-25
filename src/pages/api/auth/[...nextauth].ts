import SteamProvider from '../../../utils/steam'
import NextAuth from 'next-auth/next'
import GoogleProvider from "next-auth/providers/google"
import type { NextApiRequest, NextApiResponse } from 'next'
import TwitterProvider from "next-auth/providers/twitter";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, {
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
      SteamProvider(req, {
        clientSecret: process.env.STEAM_CLINET_SECRET!,
        callbackUrl: 'http://localhost:3000/api/auth/callback'
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
    ], pages:{
        signIn: "/auth/signin"
      },
  })
}

