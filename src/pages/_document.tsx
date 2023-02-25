import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

type theme = string[];
export default function Document() {
  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (!localTheme) {
      localStorage.setItem("theme", "night,winter");
    }
    return;
  }, []);
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body data-theme="">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
