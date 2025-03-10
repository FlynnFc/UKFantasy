import Image from "next/image";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { playerStats } from "./Player";
import Stats from "./Stats";

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
      className={`lg:h-[20rem] relative z-0 flex min-h-full w-52 flex-col overflow-hidden rounded-sm bg-neutral shadow-none lg:shadow-lg`}
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
            <p
              className={`pb-2 text-center lg:text-3xl  ${
                props.price >= 20501
                  ? "gold"
                  : props.price >= 17500
                  ? "silver"
                  : "bronze"
              }`}
            >
              {props.img ===
                "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwiaWF0IjoxNjg5Nzk5MDQxLCJleHAiOjE3MjEzMzUwNDF9.zGDt3amKB3L7hwOoakyIySWv51yDnSOw7m5jvDh4hUE&t=2023-07-19T20%3A37%3A30.001Z" && (
                <span className={`hidden text-center lg:block`}>
                  {props.name}
                </span>
              )}
              £{new Intl.NumberFormat("en").format(props.price)}
            </p>
          </div>
        </div>
        <div
          className={`h-[20rem] z-0 hidden cursor-auto justify-center lg:block`}
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
              ? "playerstats absolute top-0 z-20 flex h-full w-full flex-col justify-between text-white"
              : "playerstats absolute top-full z-20 flex  h-full w-full flex-col justify-between text-white"
          }
        >
          {props.stats ? <Stats stats={props.stats} /> : <div></div>}
          <button
            className="btn btn-error w-auto rounded-none border-none bg-red-500"
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
