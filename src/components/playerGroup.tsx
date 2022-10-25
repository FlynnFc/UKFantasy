import { stat } from "fs";
import React, { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
const PlayerGroup = (props: { team: string; children: any[] }) => {
  const [stats, setStats] = useState(false);

  return (
    <div className="flex w-full flex-col items-center justify-evenly rounded-lg bg-base-300 pb-4">
      <div
        className="tooltip relative my-2"
        data-tip="ESEA League: Advanced, Avg ELO: 3900"
      >
        <span className="py-4 text-2xl font-bold">{props.team}</span>
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
