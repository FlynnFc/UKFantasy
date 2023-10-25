import type { NextPage } from "next";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteShowcase from "../components/SiteShowcase";

const Player = {
  id: "clb6rmzhi0003j9dw2xp7vagz",
  name: "LVN",
  price: 22000,
  image:
    "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_LVN_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fTFZOX0NhcmQuanBnIiwiaWF0IjoxNjg5NzEwNjA4LCJleHAiOjE3MjEyNDY2MDh9.InNlkB11ZS_cuePsUg0iQzyESCcimXSJFvSRmdfK6JU&t=2023-07-18T20%3A03%3A35.745Z",
  rareity: "gold",
  statsId: "clb3wv98b0000j9fgp1eqw0xj",
  teamId: "clb6rkolq0000j9dwh0qge2ev",
};

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
            className="my-2 w-4/6 text-center text-4xl font-semibold md:text-6xl xl:text-[6rem] xl:leading-tight"
          >
            Welcome to the <b>UK CS</b>
            <span className="font-bold text-emerald-500"> Fantasy League</span>!
          </motion.h1>
          <section className="my-10">
            <Link href={"/epic40"}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                id="getStarted"
                className="duration-400 rounded-btn bg-primary p-5 text-xl font-bold uppercase text-primary-content shadow-lg   transition-all"
              >
                Go to Epic 40
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
