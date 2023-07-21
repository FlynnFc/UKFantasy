import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/showcase.module.css";
import CreateExample from "./CreateExample";
import BonusExample from "./BonusExample";
import LiveGamesExample from "./LiveGamesExample";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { ChevronsDown, ChevronsUp, Heart } from "lucide-react";
export interface Ingredient {
  icon: string;
  label: string;
}

const tabs = [
  { icon: "🔍", label: "View live games", content: "games" },
  { icon: "⚒️", label: "Create a team", content: "create" },
  { icon: "🎁", label: "Apply bonuses" },
  { icon: "📈", label: "Dynamic pricing", content: "pricing" },
];

export default function SiteShowcase() {
  const [selectedTab, setSelectedTab] = useState(tabs[1]);

  return (
    <motion.div
      transition={{ ease: "easeIn" }}
      className={`${styles.window} w-[94vw] max-w-[85rem]`}
    >
      <nav className={`${styles.nav}`}>
        <ul className={styles.tabs}>
          {tabs.map((item) => (
            <li
              key={item?.label}
              className={`transition-all ${styles.item}`}
              onClick={() => setSelectedTab(item)}
            >
              {`${item?.icon} ${item?.label}`}
              {item === selectedTab ? (
                <motion.div className={styles.underline} layoutId="underline" />
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <main className="h-auto">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {selectedTab?.content === "create" ? (
              <CreateExample />
            ) : selectedTab?.content === "games" ? (
              <LiveGamesExample />
            ) : selectedTab?.content === "pricing" ? (
              <Pricing />
            ) : (
              <BonusExample />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}

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

const Pricing = () => {
  const player: any = useMemo(() => Player, []);
  return (
    <section className="rounded-btn flex w-full  flex-col justify-start gap-3 p-4">
      <h2 className="mt-4 text-center text-4xl font-bold">Keep an eager eye</h2>

      <h3 className="text-center text-2xl font-bold">{`Prices change during the team creation phase, make sure you're getting the best deal!`}</h3>

      <section className=" mx-auto grid grid-cols-3 items-center justify-center gap-5 justify-self-center">
        <div className="relative h-[20rem]">
          <div className="absolute bottom-7 left-9 z-20 flex">
            <p className={`gold flex flex-row pb-2 text-center lg:text-3xl`}>
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
            <p className={`gold flex flex-row pb-2 text-center lg:text-3xl`}>
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
            <p className={`gold flex flex-row pb-2 text-center lg:text-3xl`}>
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
            <p className={`gold flex flex-row pb-2 text-center lg:text-3xl`}>
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
  );
};
