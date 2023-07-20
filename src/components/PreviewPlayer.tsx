import React, { useState } from "react";
import Image from "next/image";
import { playerStats } from "./Player";
export type player = {
  key: string;
  name: string;
  price: number;
  rareity: string;
  image?: string;
  stats?: playerStats;
  id: string;
};
const PreviewPlayer = (props: player) => {
  const [stats, setStats] = useState(false);
  return (
    <div className={` flex-col lg:h-[20rem] lg:w-[14rem] lg:shadow-lg`}>
      <div className={` relative cursor-auto rounded bg-base-100 lg:h-[20rem]`}>
        <div
          className={`bottom-3 z-10 w-full select-none flex-col  items-center justify-evenly p-2 font-bold  lg:absolute  `}
        >
          <div>
            <div className="text-center lg:hidden">{props.name}</div>
            <p
              className={`z-0 pb-2 text-center lg:text-3xl ${
                props.price >= 21500
                  ? "gold"
                  : props.price > 19000
                  ? "silver"
                  : "bronze"
              }`}
            >
              £{props.price}
            </p>
          </div>
        </div>
        <div className={`z-0 hidden cursor-auto justify-center lg:block`}>
          {props.image ? (
            <Image
              loading="eager"
              className="z-0 text-center drop-shadow-2xl"
              alt="player portrait"
              src={props.image}
              layout="fill"
            />
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewPlayer;
