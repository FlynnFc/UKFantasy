import Image from "next/image";
import React, { useEffect, useState } from "react";

type player = {
  name: string;
  price: number;
  rareity: string;
  img?: any;
  team: any;
  id: string;
  PlayerRemove: (data: any) => void;
};

const SelectedPlayer = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");

  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  return (
    <div
      className={`relative z-0 flex h-full w-56 flex-col overflow-hidden rounded-xl shadow-none lg:shadow-lg`}
    >
      <div
        className={`h-0 justify-center overflow-hidden bg-neutral transition-all lg:inline-block lg:h-52`}
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
            layout="fill"
            src={props.img}
          />
        )}
        <div
          className={
            stats
              ? "stats absolute top-0 h-full w-full p-2 text-white"
              : "stats absolute top-full h-full w-full p-2 text-white"
          }
        >
          <ul className="flex h-full flex-col justify-start space-y-4">
            <div>
              <li>HLTV: N/A</li>
              <li>Faceit Elo: 3400 </li>
              <li>HS%: 54.3%</li>
              <li>Entry Rounds: 10.4%</li>
              <li>Clutch Rounds: 0.4%</li>
            </div>
            <button className="btn">Detailed Stats</button>
          </ul>
        </div>
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
        className="absolute top-1 right-2 z-10 cursor-pointer"
      >
        <b>X</b>
      </div>
    </div>
  );
};
export default SelectedPlayer;
