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

  return (
    <div
      className={`relative z-0 flex min-h-full w-52 flex-col overflow-hidden rounded-sm bg-neutral shadow-none lg:h-[20rem] lg:shadow-lg`}
    >
      <div
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        <div
          className={`absolute bottom-2 z-10 w-full select-none flex-col items-center justify-evenly justify-self-end rounded-b-lg font-bold `}
        >
          <div className="lg:hidden">{props.name}</div>
          <div>
            <p className={`pb-2 text-center lg:text-3xl  ${rareity}`}>
              £{new Intl.NumberFormat("en").format(props.price)}
            </p>
          </div>
        </div>
        <div
          className={`z-0 hidden h-[20rem] cursor-auto justify-center lg:block`}
        >
          {props.img ? (
            <Image
              loading="eager"
              className="z-0 text-center drop-shadow-2xl"
              alt="player portrait"
              src={props.img}
              layout="fill"
            />
          ) : (
            <div></div>
          )}
        </div>

        <div
          className={
            stats
              ? "playerstats absolute top-0 z-20 flex h-full w-full flex-col justify-between p-2 text-white"
              : "playerstats absolute top-full z-20 flex  h-full w-full  flex-col justify-between p-2 text-white"
          }
        >
          <ul className="grid grid-cols-1 gap-1">
            <li>HLTV: {props.stats ? props.stats.hltv : "N/A"}</li>
            <li>Faceit Elo: {props.stats ? props.stats.elo : "N/A"} </li>
            <li>KAST: {props.stats ? `${props.stats.kast}%` : "N/A"}</li>
            <li>ADR: {props.stats ? `${props.stats.adr}` : "N/A"}</li>
            <li>HS%: {props.stats ? `${props.stats.hs}%` : "N/A"}</li>
            <li>
              Entry/round%:{" "}
              {props.stats ? `${props.stats.entryRounds}%` : "N/A"}
            </li>
            <li>
              Clutch %: {props.stats ? `${props.stats.clutchRounds}%` : "N/A"}
            </li>
            <li>Clutch %: {props.stats ? `${props.stats.util}%` : "N/A"}</li>
            <li>Clutch %: {props.stats ? `${props.stats.util}%` : "N/A"}</li>
          </ul>
          <button
            className="btn-error btn w-auto border-none bg-red-500"
            onClick={() => props.PlayerRemove(props)}
          >
            Remove player
          </button>
        </div>
      </div>
    </div>
  );
};
export default SelectedPlayer;
