import Image from "next/image";
import React, { useEffect, useState } from "react";

type player = {
  name: string;
  price: number;
  rareity: string;
  img?: any;
  team: any;
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
        id="image"
        className={`z-10 hidden  h-52 cursor-pointer justify-center overflow-hidden  bg-neutral lg:inline-block`}
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        <Image alt="portrait" height={300} width={300} src={props.img} />
        <div
          className={`${
            stats && "h-full  w-full -translate-y-[110.5%] p-2"
          } stats h-full w-full p-2 text-base-content `}
        >
          <ul className="flex h-full flex-col justify-between">
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
        className={`flex ${rareity} h-[5rem] select-none flex-col items-center justify-evenly rounded-b-lg`}
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
