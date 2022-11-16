import React from "react";

import PlayerSkeleton from "./PlayerSkeleton";

const PlayerGroupSkeleton = (props: { children: any; money: number }) => {
  return (
    <div
      className="my-2 flex w-full flex-col items-center justify-evenly rounded-lg bg-primary
 pb-4"
    >
      <div className="flex w-full justify-between  px-5">
        <input
          type="text"
          placeholder="Team name"
          className="input my-2 w-full max-w-xs text-2xl"
        />
        <span className="py-4 text-2xl font-bold">
          Money Left: {props.money.toLocaleString("en-US")}
        </span>
      </div>
      <div className="flex w-full flex-row justify-evenly">
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
