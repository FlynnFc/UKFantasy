import "../styles/globals.css";
import type { AppProps } from "next/app";

import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Session, SessionContextProvider } from "@supabase/auth-helpers-react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";

function MyApp({
  Component,
  pageProps,
}: AppProps<{
  initialSession: Session;
}>) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <>
      <Head>
        <title>UKFantasy &#127918;</title>
        <meta name="description" content="UK Fantasy League " />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <SessionContextProvider
        supabaseClient={supabase}
        initialSession={pageProps.initialSession}
      >
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </SessionContextProvider>
    </>
  );
}

export default MyApp;
