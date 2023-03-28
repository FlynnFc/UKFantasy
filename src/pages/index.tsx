import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Home: NextPage = () => {
  // const router = useRouter();
  // const { status, data } = useSession();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/leagues");
  //   } else return;
  // }, [router, status]);
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-between p-4">
        <h1 className="my-2 w-5/6 text-center text-2xl font-semibold md:text-4xl xl:text-[6rem] xl:leading-tight">
          Welcome to the UK CS{" "}
          <span className="font-bold text-accent"> Fantasy League</span>!
        </h1>

        <div className="flex w-full flex-col items-center">
          <Link href={"./epic39"}>
            <button className="btn-primary btn-lg btn w-fit">
              Take a peek
            </button>
          </Link>
          <p className="mt-2 text-left text-base">
            This is an experimental version of the site. If you find any bugs or
            have ideas of future features shoot me an email{" "}
            <i>foleyclarkef@gmail.com</i>.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
