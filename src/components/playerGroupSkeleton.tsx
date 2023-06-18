import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import PlayerSkeleton from "./PlayerSkeleton";
import { AnimatePresence, motion } from "framer-motion";

const PlayerGroupSkeleton = (props: {
  children: (
    | string
    | number
    | boolean
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined
  )[];
  money: number;
  setTeamName: Dispatch<SetStateAction<string>>;
}) => {
  const [y, setY] = useState(0);
  const [scrolled, setScrolled] = useState<boolean>();
  const [timer, setTimer] = useState<any>(null);

  const handleNavigation = useCallback(
    (e: any) => {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        console.log("scrolling up");
      } else if (y < window.scrollY) {
        console.log("scrolling down");
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);

  useEffect(() => {
    if (y > 190) setScrolled(true);
    else setScrolled(false);
  }, [y]);

  //Delays setting state until user stops typing
  const inputHandler = (e: string) => {
    if (timer) {
      clearTimeout(timer);
      setTimer(null);
    }
    setTimer(
      setTimeout(() => {
        props.setTeamName(e);
      }, 10)
    );
  };
  return (
    <div className="flex h-full w-full flex-col items-center justify-evenly gap-1 rounded-lg">
      <div className="flex w-full flex-row justify-between">
        <input
          type="text"
          placeholder="Team name"
          className="input input-sm my-2 w-auto max-w-xs bg-base-300 md:input-md lg:text-2xl"
          onChange={(e) => {
            inputHandler(e.target.value);
          }}
        />
        <span className="w-full py-4 text-end font-bold text-base-content md:text-lg lg:text-2xl">
          Money Left: {props.money.toLocaleString("en-US")}
        </span>
      </div>
      <div className="rounded-btn sticky top-5  flex w-[95%] flex-row justify-evenly space-x-2 bg-primary px-4 py-6 lg:w-full">
        {props.children[0] ? props.children[0] : <PlayerSkeleton />}
        {props.children[1] ? props.children[1] : <PlayerSkeleton />}
        {props.children[2] ? props.children[2] : <PlayerSkeleton />}
        {props.children[3] ? props.children[3] : <PlayerSkeleton />}
        {props.children[4] ? props.children[4] : <PlayerSkeleton />}
      </div>
      {scrolled ? (
        <AnimatePresence>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-btn invisible fixed right-1 bg-neutral p-4 text-end font-bold text-base-content transition md:text-base lg:text-xl xl:top-[4.75rem] xl:text-2xl 2xl:visible"
          >
            Money Left: {props.money.toLocaleString("en-US")}
          </motion.span>
        </AnimatePresence>
      ) : null}
    </div>
  );
};

export default PlayerGroupSkeleton;
