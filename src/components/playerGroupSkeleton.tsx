import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import PlayerSkeleton from "./PlayerSkeleton";

const PlayerGroupSkeleton = (props: { children: any }) => {
  return (
    <div
      className="bg- my-2 flex w-full flex-col items-center justify-evenly rounded-lg bg-primary
 pb-4"
    >
      <h2 className="py-2 text-2xl font-bold">Your Team</h2>
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
