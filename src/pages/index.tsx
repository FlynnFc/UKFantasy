import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="my-2 mt-[20%] text-4xl font-bold">
          Welcome to the UK CS Fantasy League!
        </h1>
        <p className="text-left text-lg">
          This is an experimental version of the site. If you find any bugs or
          have ideas of future features shoot me a message{" "}
          <a
            target="_blank"
            href="https://twitter.com/lutafatootoo"
            className="font-semibold"
            rel="noreferrer"
          >
            here
          </a>
          .
        </p>
      </main>
    </>
  );
};

export default Home;
