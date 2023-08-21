import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import { Analytics } from "@vercel/analytics/react";
const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>Play Fantasy esports here!</title>
        <meta name="title" content="Play Fantasy esports here!" />
        <meta
          name="description"
          content="The center for UK esports fantasy. Join leagues, Create your team, compete against others."
        />
        <link rel="icon" href="/favicon.ico" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://esportsfantasy.app" />
        <meta
          property="twitter:title"
          content="Welcome to the UK CS Fantasy League!"
        />
        <meta
          property="twitter:description"
          content="UK Esports Fantasy League"
        />
        <meta
          property="twitter:image"
          content="https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/public/images/image.jpg?t=2023-07-19T17%3A18%3A38.302Z"
        ></meta>
      </Head>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        {/* <Analytics /> */}
      </SessionProvider>
    </>
  );
};

export default MyApp;
