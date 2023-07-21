import type { NextPage } from "next";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import SiteShowcase from "../components/SiteShowcase";
import { useMemo } from "react";
import { ChevronsDown, ChevronsUp } from "lucide-react";

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
  const player = useMemo(() => Player, []);
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
          <section className="rounded-btn flex min-h-screen w-[94vw] max-w-[85rem] flex-col justify-start gap-12 bg-base-300 p-4">
            <h2 className="mt-4 text-center text-5xl font-bold">
              Keep an eager eye
            </h2>

            <h3 className="text-center text-2xl font-bold">{`Prices change during the team creation phase, make sure you're getting the best deal!`}</h3>

            <section className=" mx-auto grid grid-cols-3 items-center justify-center gap-5 justify-self-center">
              <div className="relative h-[20rem]">
                <div className="absolute bottom-7 left-9 z-20 flex">
                  <p
                    className={`gold flex flex-row pb-2 text-center lg:text-3xl`}
                  >
                    £{new Intl.NumberFormat("en").format(player.price)}
                  </p>
                </div>

                <Image
                  loading="eager"
                  className="z-0 text-center drop-shadow-2xl"
                  alt="player portrait"
                  src={player.image}
                  width={215}
                  height={315}
                />
              </div>
              <h3 className="text-3xl">high pickrate?</h3>
              <div className="relative h-[20rem]">
                <div className="absolute bottom-7 left-9 z-20 flex">
                  <p
                    className={`gold flex flex-row pb-2 text-center lg:text-3xl`}
                  >
                    £{new Intl.NumberFormat("en").format(player.price + 600)}
                  </p>{" "}
                  <ChevronsUp
                    size={36}
                    className="m-0 h-10 w-fit pb-2"
                    color="rgb(34 197 94)"
                    strokeWidth={2.75}
                  />
                </div>

                <Image
                  loading="eager"
                  className="z-0 text-center drop-shadow-2xl"
                  alt="player portrait"
                  src={player.image}
                  width={215}
                  height={315}
                />
              </div>
            </section>
            <section className=" mx-auto grid grid-cols-3 items-center justify-center gap-5 justify-self-center">
              <div className="relative h-[20rem]">
                <div className="absolute bottom-7 left-9 z-20 flex">
                  <p
                    className={`gold flex flex-row pb-2 text-center lg:text-3xl`}
                  >
                    £{new Intl.NumberFormat("en").format(player.price)}
                  </p>
                </div>

                <Image
                  loading="eager"
                  className="z-0 text-center drop-shadow-2xl"
                  alt="player portrait"
                  src="https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/The%20Lizards/thelizards_godku.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL1RoZSBMaXphcmRzL3RoZWxpemFyZHNfZ29ka3UuanBnIiwiaWF0IjoxNjg5ODY1MDEzLCJleHAiOjE3MjE0MDEwMTN9.dzq53AtaQGOFYKuZLnKVGkW9o-MLal_mlkZyID7saGg&t=2023-07-20T14%3A57%3A02.403Z"
                  width={215}
                  height={315}
                />
              </div>
              <h3 className=" text-center text-3xl">low pickrate?</h3>
              <div className="relative h-[20rem]">
                <div className="absolute bottom-7 left-9 z-20 flex">
                  <p
                    className={`gold flex flex-row pb-2 text-center lg:text-3xl`}
                  >
                    £{new Intl.NumberFormat("en").format(player.price - 2200)}
                  </p>
                  <ChevronsDown
                    size={36}
                    className="m-0 h-10 w-fit  pb-2"
                    color="rgb(239 68 68)"
                    strokeWidth={2.75}
                  />
                </div>

                <Image
                  loading="eager"
                  className="z-0 text-center drop-shadow-2xl"
                  alt="player portrait"
                  src="https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/The%20Lizards/thelizards_godku.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL1RoZSBMaXphcmRzL3RoZWxpemFyZHNfZ29ka3UuanBnIiwiaWF0IjoxNjg5ODY1MDEzLCJleHAiOjE3MjE0MDEwMTN9.dzq53AtaQGOFYKuZLnKVGkW9o-MLal_mlkZyID7saGg&t=2023-07-20T14%3A57%3A02.403Z"
                  width={215}
                  height={315}
                />
              </div>
            </section>
          </section>
        </section>
      </main>
    </>
  );
};

export default Home;
