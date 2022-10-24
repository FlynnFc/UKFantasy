import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="my-8 text-4xl font-bold">
          Welcome to the UK CS Fantasy League!
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          soluta quo qui atque natus et impedit maxime, explicabo libero
          dignissimos saepe minima mollitia ipsa. Minima eveniet inventore
          dolorum unde assumenda!
        </p>
      </main>
    </>
  );
};

export default Home;
