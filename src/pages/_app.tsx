import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <>
      <Head>
        <title>UK Fantasy</title>
        <meta name="title" content="Welcome to the UK CS Fantasy League!" />
        <meta name="description" content="UK Esports Fantasy League " />
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
          content="https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/public/images/Screenshot_11.png"
        ></meta>
      </Head>
      <SessionProvider session={session}>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SessionProvider>
    </>
  );
};

export default MyApp;
