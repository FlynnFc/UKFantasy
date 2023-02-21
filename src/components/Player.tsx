import React, { useEffect, useState } from "react";
import Image from "next/image";
type player = {
  PlayerSelect: (data: any) => void;
  name: string;
  price: number;
  rareity: string;
  img?: string;
  moneyLeft: number;
  teamFull: boolean;
  team: any[];
  id: string;
};

export const Player = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");
  const [disable, setDisabled] = useState(false);
  const [picked, setPicked] = useState(false);
  useEffect(() => {
    const nameCheck = (name: string) => {
      return props.name === name;
    };
    const updatedPick = props.team.find((el) => nameCheck(el.key));

    setPicked(updatedPick);
  }, [props.name, props.team]);

  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  useEffect(() => {
    if (props.moneyLeft < props.price) {
      setDisabled(true);
    } else if (props.moneyLeft >= props.price) {
      setDisabled(false);
    } else return;
  }, [props.moneyLeft, props.price]);

  return (
    <div
      className={`relative z-0 w-56 overflow-hidden rounded-xl bg-neutral shadow-lg lg:h-72`}
    >
      {picked ? (
        <div className="pickedPlayer absolute z-10 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">Already Picked</p>
        </div>
      ) : props.teamFull ? (
        <div className="pickedPlayer absolute z-10 flex h-full w-full select-none items-center justify-center  font-bold lg:text-xl">
          <p className="p-4 text-center text-white">No more slots</p>
        </div>
      ) : disable ? (
        <div className="disabledPlayer absolute z-10 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">
            You cant afford this player!
          </p>
        </div>
      ) : (
        ""
      )}

      <div
        className={`hidden h-52 cursor-auto justify-center lg:block`}
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        {props.img ? (
          <Image
            className="text-center drop-shadow-2xl"
            alt="player portrait"
            height={500}
            width={500}
            src={props.img}
          />
        ) : (
          <div></div>
        )}
        <div
          className={
            stats
              ? "stats absolute top-0 h-full w-full p-2 text-white"
              : "stats absolute top-full h-full w-full p-2 text-white"
          }
        >
          <div className="flex h-full flex-col justify-start space-y-4">
            <ul>
              <li>HLTV: N/A</li>
              <li>Faceit Elo: 3400 </li>
              <li>HS%: 54.3%</li>
              <li>Entry Rounds: 10.4%</li>
              <li>Clutch Rounds: 0.4%</li>
            </ul>
            <button className="btn">Detailed Stats</button>
          </div>
        </div>
      </div>
      <div
        className={`${rareity} tooltip flex h-[5rem] cursor-pointer select-none flex-col items-center justify-evenly rounded-b-lg `}
        data-tip="Add player"
        onClick={() => {
          //Check if team is full already
          if (!disable && !picked) {
            console.log(props);
            props.PlayerSelect(props);
            setPicked(true);
          }
        }}
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
