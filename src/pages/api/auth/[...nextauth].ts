import NextAuth, { type NextAuthOptions } from "next-auth";

// Prisma adapter for NextAuth, optional and can be removed
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {

  // Configure one or more authentication providers
  providers: [   GoogleProvider({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clientId: process.env.GOOGLE_ID!,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    clientSecret: process.env.GOOGLE_SECRET!,
    authorization: {
      params: {
        prompt: "consent",
        access_type: "offline",
        response_type: "code"
      }
    },
  }),],
  pages:{
    signIn: "/auth/signin"
  },
  secret: process.env.sercet,  
  // Include user.id on session

};

export default NextAuth(authOptions);
