import type { NextPage } from "next";

import Link from "next/link";

import { motion } from "framer-motion";
import SiteShowcase from "../components/SiteShowcase";
import { useSession } from "next-auth/react";
const Home: NextPage = () => {
  // const router = useRouter();
  const data = useSession();
  console.log("asdsad", data.data);
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
            transition={{ duration: 0.6 }}
            className="my-2 w-5/6 text-center text-4xl font-semibold md:text-6xl xl:text-[6rem] xl:leading-tight"
          >
            Welcome to the <b>UK CS</b>
            <span className="font-bold text-[#FA8128]"> Fantasy League</span>!
          </motion.h1>
          <section className="my-10">
            <Link href={"/demo"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="getStarted"
                className="duration-400 rounded-btn bg-primary p-5 text-xl font-bold uppercase shadow-lg   transition-all"
              >
                Try out the demo
              </motion.button>
            </Link>
          </section>
          <motion.section
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <SiteShowcase />
          </motion.section>
        </section>
      </main>
    </>
  );
};

export default Home;
