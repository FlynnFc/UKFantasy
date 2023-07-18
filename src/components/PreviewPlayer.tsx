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
    <div className={` flex-col shadow-lg lg:w-[14rem] xl:h-[20rem]`}>
      <div
        className={` relative hidden h-[20rem] cursor-auto rounded-b-none bg-base-200 xl:block`}
      >
        <div
          className={`absolute bottom-3 z-10 w-full select-none flex-col items-center justify-evenly justify-self-end font-bold  `}
        >
          <div className="lg:hidden">{props.name}</div>
          <div>
            <p
              className={`pb-2 text-center shadow-2xl lg:text-3xl ${props.rareity}`}
            >
              £{props.price}
            </p>
          </div>
        </div>
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
  );
};

export default PreviewPlayer;
