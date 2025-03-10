import React from "react";
import PlayerSkeleton from "./PlayerSkeleton";

const PlayerGroup = (props: {
  team: string;
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
}) => {
  return (
    <div className="rounded-btn flex w-full flex-col items-center justify-evenly bg-base-300 pb-4">
      <div className="relative my-4">
        <span className="mb-2 select-none py-6 text-2xl font-bold">
          {props.team}
        </span>
      </div>

      <div className="flex w-[98%] flex-col justify-evenly gap-2 md:gap-1 lg:w-full lg:flex-row">
        {props.children[0] ? props.children[0] : <PlayerSkeleton />}
        {props.children[1] ? props.children[1] : <PlayerSkeleton />}
        {props.children[2] ? props.children[2] : <PlayerSkeleton />}
        {props.children[3] ? props.children[3] : <PlayerSkeleton />}
        {props.children[4] ? props.children[4] : <PlayerSkeleton />}
      </div>
    </div>
  );
};

export default PlayerGroup;
