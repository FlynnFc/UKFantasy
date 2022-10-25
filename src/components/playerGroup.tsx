import React from "react";

const PlayerGroup = (props: { team: string; children: any[] }) => {
  return (
    <div className="flex w-full flex-col items-center justify-evenly rounded-lg bg-base-300 pb-4">
      <div
        className="tooltip"
        data-tip="ESEA League: Advanced, Average Elo: 3500"
      >
        <button className="py-4 text-2xl font-bold">{props.team}</button>
      </div>

      <div className="flex w-full flex-row justify-evenly">
        {props.children.map((child: JSX.Element) => {
          return child;
        })}
      </div>
    </div>
  );
};

export default PlayerGroup;
