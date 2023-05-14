import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import team from "../../public/teamcreation.jpg";
import bonuses from "../../public/apply bonuses.jpg";
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
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <h1 className="my-2 w-5/6 text-center text-2xl font-semibold md:text-4xl xl:text-[6rem] xl:leading-tight">
          Welcome to the UK CS{" "}
          <span className="font-bold text-accent"> Fantasy League</span>!
        </h1>
        <div className="mt-[5%] flex w-full flex-col items-center">
          <Link href={"./demo"}>
            <button className="btn-primary btn w-fit md:btn-lg">
              Take a peek
            </button>
          </Link>
          <p className="mt-2 text-center text-xs md:text-left md:text-base">
            This is an experimental version of the site. If you find any bugs or
            have ideas of future features shoot me an email{" "}
            <i>foleyclarkef@gmail.com</i>.
          </p>
          {/* <section className="flex flex-col">
            <div className="my-5 flex flex-col gap-4 pt-5">
              <h2 className="text-5xl font-thin">Step 1</h2>
              <h3 className="text-5xl ">
                Find a <span className="font-bold text-info">league</span>
              </h3>
            </div>
            <div className="my-5 flex flex-col gap-4  pt-5">
              <h2 className="text-5xl font-thin">Step 2</h2>
              <h3 className="gap-4  text-5xl">
                Create your{" "}
                <span className="font-bold text-secondary">team</span>
              </h3>
            </div>
            <div className="my-5 flex flex-col gap-4 pt-5">
              <h2 className="text-5xl font-thin">Step 2</h2>
              <h3 className="w-auto text-5xl ">
                apply <span className="font-bold text-primary">bonuses</span> to
                boost your points
              </h3>
            </div>
          </section> */}
        </div>
      </main>
    </>
  );
};

export default Home;
