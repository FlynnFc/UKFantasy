import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import Stats from "./Stats";

export type playerStats = {
  hltv: number;
  elo: number;
  hs: number;
  clutchRounds: number;
  entryRounds: number;
  adr?: number;
  kast?: number;
  util?: number;
};
type player = {
  PlayerSelect: (data: any) => void;
  name: string;
  price: number;
  rareity: string;
  img?: string;
  stats?: playerStats;
  moneyLeft: number;
  teamFull: boolean;
  team: any[];
  id: string;
  priceadjust: number;
  playersTeam: any;
};

export const Player = (props: player) => {
  const [stats, setStats] = useState(false);
  const [disable, setDisabled] = useState(false);
  const [picked, setPicked] = useState(false);
  const [teamLimit, setTeamLimit] = useState(false);

  //Team comparer

  useEffect(() => {
    const checkIfTwoTeammatesPicked = () => {
      let totalTeammates = 0;
      for (let i = 0; i < props.team.length; i++) {
        const element = props.team[i];
        if (element.props.playersTeam === props.playersTeam) {
          totalTeammates++;
        }
      }
      if (totalTeammates >= 2) {
        return setTeamLimit(true);
      } else return setTeamLimit(false);
    };
    checkIfTwoTeammatesPicked();
  }, [props.playersTeam, props.team]);

  useEffect(() => {
    const nameCheck = (name: string) => {
      return props.name === name;
    };
    const updatedPick = props.team.find((el) => nameCheck(el.key));

    setPicked(updatedPick);
  }, [props.name, props.team]);

  const rareity = useMemo(() => props.rareity, [props.rareity]);

  useEffect(() => {
    if (props.moneyLeft < props.price) {
      setDisabled(true);
    } else if (props.moneyLeft >= props.price) {
      setDisabled(false);
    } else return;
  }, [props.moneyLeft, props.price]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout={true}
      className={`relative z-0 w-52 overflow-hidden rounded-sm bg-base-100 shadow-lg lg:h-[20rem] `}
    >
      {picked ? (
        <div className="pickedPlayer absolute z-30 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">Already Picked</p>
        </div>
      ) : props.teamFull ? (
        <div className="pickedPlayer absolute z-30 flex h-full w-full select-none items-center justify-center  font-bold lg:text-xl">
          <p className="p-4 text-center text-white">No more slots</p>
        </div>
      ) : teamLimit ? (
        <div className="disabledPlayer absolute z-30 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">
            You can only have 2 players per team!
          </p>
        </div>
      ) : disable ? (
        <div className="disabledPlayer absolute z-20 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">
            You cant afford this player!
          </p>
        </div>
      ) : (
        ""
      )}

      <div
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        <div
          className={`bottom-3 z-10 w-full select-none flex-col items-center  justify-evenly p-2 font-bold lg:absolute  lg:p-0  `}
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
              {props.img ===
                "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwiaWF0IjoxNjg5Nzk5MDQxLCJleHAiOjE3MjEzMzUwNDF9.zGDt3amKB3L7hwOoakyIySWv51yDnSOw7m5jvDh4hUE&t=2023-07-19T20%3A37%3A30.001Z" && (
                <span className={`hidden text-center lg:block`}>
                  {props.name}
                </span>
              )}
              <span
                className={`flex items-center justify-center ${
                  props.price >= 21500
                    ? "gold"
                    : props.price > 19000
                    ? "silver"
                    : "bronze"
                }`}
              >
                £
                {new Intl.NumberFormat("en").format(
                  props.price + props.priceadjust
                )}
                {props.priceadjust > 0 && (
                  <ChevronsUp
                    size={36}
                    className="w-fit"
                    color="rgb(34 197 94)"
                    strokeWidth={2.75}
                  />
                )}
                {props.priceadjust < 0 && (
                  <ChevronsDown
                    size={36}
                    className="w-fit"
                    color="rgb(239 68 68)"
                    strokeWidth={2.75}
                  />
                )}
              </span>
            </p>
          </div>
        </div>
        <div className={`z-0 hidden cursor-auto justify-center lg:block`}>
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
          {props.stats && (
            <div
              className={
                stats
                  ? "playerstats absolute top-0 z-20 flex h-full w-full flex-col justify-between p-2 text-white"
                  : "playerstats absolute top-full z-20 flex  h-full w-full  flex-col justify-between p-2 text-white"
              }
            >
              <Stats stats={stats} />

              <button
                className="btn-success btn w-auto border-none bg-green-500"
                onClick={() => {
                  //Check if team is full already
                  if (!disable && !picked) {
                    props.PlayerSelect(props);
                    setPicked(true);
                  }
                }}
              >
                Add player
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
