import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../styles/showcase.module.css";
import CreateExample from "./CreateExample";
import BonusExample from "./BonusExample";
import LiveGamesExample from "./LiveGamesExample";

export interface Ingredient {
  icon: string;
  label: string;
}

const tabs = [
  { icon: "🔍", label: "View live games", content: "games" },
  { icon: "⚒️", label: "Create a team", content: "create" },
  { icon: "🎁", label: "Apply bonuses" },
];

export default function SiteShowcase() {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <motion.div
      transition={{ ease: "easeIn" }}
      className={`${styles.window} w-[94vw] max-w-[85rem]`}
    >
      <nav className={styles.nav}>
        <ul className={styles.tabs}>
          {tabs.map((item) => (
            <li
              key={item?.label}
              className={`${styles.item}`}
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
            ) : (
              <BonusExample />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
