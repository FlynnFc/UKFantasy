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
    <div
      className={`relative z-0 w-56 overflow-hidden rounded-xl bg-neutral shadow-lg lg:h-72`}
    >
      <div
        className={`hidden h-52 cursor-auto justify-center lg:block`}
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        {props.image ? (
          <Image
            loading="eager"
            className="text-center drop-shadow-2xl"
            alt="player portrait"
            height={500}
            width={500}
            src={props.image}
          />
        ) : (
          <div></div>
        )}
        {props.stats && (
          <div
            className={
              stats
                ? "playerstats absolute top-0  h-full w-full p-2 text-white"
                : "playerstats absolute top-full h-full w-full p-2 text-white"
            }
          >
            <ul className="flex flex-col justify-start gap-1">
              <li>HLTV: {props.stats.hltv}</li>
              <li>Faceit Elo: {props.stats.elo} </li>
              <li>KAST: %</li>
              <li>ADR: 10</li>
              <li>HS%: {props.stats.hs}%</li>
              <li>Entry Rounds: {props.stats.entryRounds}%</li>
              <li>Clutch Rounds: {props.stats.clutchRounds}%</li>
            </ul>
          </div>
        )}
      </div>
      <div
        className={`${props.rareity} relative flex h-[5rem] cursor-pointer select-none flex-col items-center justify-evenly rounded-b-lg `}
      >
        <h2 className=" pt-2 text-center font-bold leading-none text-neutral lg:text-2xl">
          {props.name}
        </h2>
        <div>
          <p className="pb-2 text-center text-neutral lg:text-2xl">
            £{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PreviewPlayer;
