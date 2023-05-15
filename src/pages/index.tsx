import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import team from "../../public/teamcreation.jpg";
import bonuses from "../../public/apply bonuses.jpg";
import { motion } from "framer-motion";
import SiteShowcase from "../components/SiteShowcase";
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
        <section className="container mx-auto flex min-h-screen flex-col items-center justify-start gap-12 p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="my-2 w-5/6 text-center text-2xl font-semibold md:text-4xl xl:text-[6rem] xl:leading-tight"
          >
            Welcome to the UK CS{" "}
            <span className="font-bold text-orange-500"> Fantasy League</span>!
          </motion.h1>
          <section>
            <SiteShowcase />
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
