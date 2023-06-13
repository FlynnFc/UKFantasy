import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

import PlayerSkeleton from "./PlayerSkeleton";
import { AnimatePresence, motion } from "framer-motion";

const PlayerGroupSkeletonExample = (props: {
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
  const [timer, setTimer] = useState<any>(null);

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
    </div>
  );
};

export default PlayerGroupSkeletonExample;
