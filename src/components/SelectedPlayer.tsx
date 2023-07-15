import Image from "next/image";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { playerStats } from "./Player";

type player = {
  name: string;
  price: number;
  rareity: string;
  img?: string;
  team: any;
  stats?: playerStats;
  id: string;
  playersTeam: string;
  PlayerRemove: (data: any) => void;
};

const SelectedPlayer = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");
  const [, setScrolled] = useState(false);
  const [offset, setOffset] = useState(0);

  useLayoutEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setScrolled(false);
    if (offset < 50) {
      setScrolled(true);
    } else setScrolled(false);
  }, [offset]);

  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  console.log(props);

  return (
    <div
      className={`relative z-0 flex h-full w-56 flex-col overflow-hidden rounded-xl shadow-none lg:shadow-lg`}
    >
      <div
        className={`image hidden h-52 cursor-auto justify-center overflow-hidden bg-base-300 xl:block 
          `}
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        {props.img && (
          <Image
            className="text-center drop-shadow-2xl"
            alt="player portrait"
            height={500}
            width={500}
            src={props.img}
          />
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
        className={`flex ${rareity} z-10 h-[5rem] select-none flex-col items-center justify-evenly rounded-b-lg`}
      >
        <h2 className=" pt-2 text-center font-bold leading-none text-neutral lg:text-2xl">
          {props.name}
        </h2>
        <div>
          <p className="pb-2 text-center text-neutral lg:text-2xl">
            £{props.price.toLocaleString("en-US")}
          </p>
        </div>
      </div>
      <div
        onClick={() => props.PlayerRemove(props)}
        className="absolute right-2 top-1 z-10 cursor-pointer"
      >
        <b>X</b>
      </div>
    </div>
  );
};
export default SelectedPlayer;
