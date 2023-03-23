import React, { Dispatch, SetStateAction, useState } from "react";

import PlayerSkeleton from "./PlayerSkeleton";

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
    <div
      className=" mt-5 flex w-full flex-col items-center justify-evenly rounded-lg bg-primary p-3 pb-6
"
    >
      <div className="flex w-full justify-between p-3">
        <input
          type="text"
          placeholder="Team name"
          className="input input-sm my-2 w-auto max-w-xs md:input-md lg:text-2xl"
          onChange={(e) => {
            inputHandler(e.target.value);
          }}
        />
        <span className="py-4 font-bold text-base-100 md:text-lg lg:text-2xl">
          Money Left: {props.money.toLocaleString("en-US")}
        </span>
      </div>
      <div className=" flex w-[95%] flex-row justify-evenly space-x-2 lg:w-full">
        {props.children[0] ? props.children[0] : <PlayerSkeleton />}
        {props.children[1] ? props.children[1] : <PlayerSkeleton />}
        {props.children[2] ? props.children[2] : <PlayerSkeleton />}
        {props.children[3] ? props.children[3] : <PlayerSkeleton />}
        {props.children[4] ? props.children[4] : <PlayerSkeleton />}
      </div>
    </div>
  );
};

export default PlayerGroupSkeleton;
