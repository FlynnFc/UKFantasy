import type { NextPage } from "next";

import Link from "next/link";

import { motion } from "framer-motion";
import SiteShowcase from "../components/SiteShowcase";
const Home: NextPage = () => {
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "authenticated") {
  //     router.push("/leagues");
  //   } else return;
  // }, [router, status]);
  return (
    <>
      <main className=" mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <section className=" mx-auto flex min-h-screen flex-col items-center justify-start gap-12 p-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="my-2 w-5/6 text-center text-4xl font-semibold md:text-6xl xl:text-[6rem] xl:leading-tight"
          >
            Welcome to the <b>UK CS</b>
            <span className="font-bold text-emerald-500"> Fantasy League</span>!
          </motion.h1>
          <section className="my-10">
            <Link href={"/epic39"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="getStarted"
                className="duration-400 rounded-btn bg-primary p-5 text-xl font-bold uppercase text-primary-content shadow-lg   transition-all"
              >
                Go to Epic 39
              </motion.button>
            </Link>
          </section>
          <SiteShowcase />
        </section>
      </main>
    </>
  );
};

export default Home;
