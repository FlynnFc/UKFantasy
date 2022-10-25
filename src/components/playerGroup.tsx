import React from "react";
import { Player } from "./Player";

const PlayerGroup = (props: { team: string; children: any[] }) => {
  return (
    <div className="flex w-full flex-col items-center justify-evenly rounded-lg bg-base-300 pb-4">
      <h2 className="py-2 text-2xl font-bold">{props.team}</h2>
      <div className="flex w-full flex-row justify-evenly">
        {props.children.map((child: any) => {
          return (
            <Player
              key={child.props.name}
              rareity={child.props.rareity}
              name={child.props.name}
              price={child.props.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PlayerGroup;
