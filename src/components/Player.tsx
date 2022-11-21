import Image from "next/image";
import React, { useEffect, useState } from "react";

type player = {
  PlayerSelect: (data: any) => void;
  name: string;
  price: number;
  rareity: string;
  img?: any;
  moneyLeft: number;
  teamFull: boolean;
  team: any[];
};

export const Player = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");
  const [disable, setDisabled] = useState(false);
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  useEffect(() => {
    if (props.moneyLeft < props.price) {
      setDisabled(true);
    } else if (props.moneyLeft > props.price) {
      setDisabled(false);
    } else return;
  }, [props.moneyLeft, props.price]);

  return (
    <div
      id="player"
      className={`relative z-0 w-56 overflow-hidden rounded-xl bg-neutral shadow-lg lg:h-72`}
      onClick={() => {
        //Check if team is full already
        if (!disable && !picked) {
          props.PlayerSelect(props);
          setPicked(true);
        }
      }}
    >
      {picked ? (
        <div className="pickedPlayer absolute z-10 flex h-full w-full select-none items-center justify-center text-xl font-bold">
          <p className="p-4 text-center">Already Picked</p>
        </div>
      ) : props.teamFull ? (
        <div className="pickedPlayer absolute z-10 flex h-full w-full select-none items-center justify-center text-xl font-bold">
          <p className="p-4 text-center">No more slots</p>
        </div>
      ) : disable ? (
        <div className="disabledPlayer absolute z-10 flex h-full w-full select-none items-center justify-center text-xl font-bold">
          <p className="p-4 text-center">You cant afford this player!</p>
        </div>
      ) : (
        ""
      )}

      <div
        id="image"
        className="z-10 hidden h-52 cursor-pointer justify-center overflow-hidden lg:block"
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        <Image alt="portrait" height={300} width={300} src={props.img} />
        <div
          id="stats"
          className={`${
            stats && "h-full w-full -translate-y-[110.5%] p-2"
          } "h-full p-2" w-full `}
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
        id={rareity}
        className="flex h-[5rem] select-none flex-col items-center justify-evenly rounded-b-lg  "
      >
        <h2 className=" pt-2 text-center text-2xl font-bold leading-none text-neutral">
          {props.name}
        </h2>
        <div>
          <p className="pb-2 text-center text-2xl text-neutral">
            £{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};
