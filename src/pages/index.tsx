import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/leagues");
    } else return;
  }, [router, status]);
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="my-2 mt-[20%] text-4xl font-bold">
          Welcome to the UK CS Fantasy League!
        </h1>
        <p className="text-left text-lg">
          This is an experimental version of the site. If you find any bugs or
          have ideas of future features shoot me an email{" "}
          <i>foleyclarkef@gmail.com</i>.
        </p>
      </main>
    </>
  );
};

export default Home;
