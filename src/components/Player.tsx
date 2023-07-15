import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
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
  playersTeam: any;
};

export const Player = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");
  const [disable, setDisabled] = useState(false);
  const [picked, setPicked] = useState(false);
  const [teamLimit, setTeamLimit] = useState(false);

  //Team comparer

  useEffect(() => {
    const checkIfTwoTeammatesPicked = () => {
      props.team;
      let totalTeammates = 0;
      for (let i = 0; i < props.team.length; i++) {
        const element = props.team[i];
        if (element.props.playersTeam === props.playersTeam) {
          totalTeammates++;
        }
      }
      if (totalTeammates >= 2) {
        console.log("More than 2 from one team!");
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout={true}
      onClick={() => {
        //Check if team is full already
        if (!disable && !picked) {
          props.PlayerSelect(props);
          setPicked(true);
        }
      }}
      className={`tooltip relative  z-0  w-56 cursor-pointer overflow-hidden rounded-xl bg-neutral shadow-lg lg:h-72`}
      data-tip="Add player"
    >
      {picked ? (
        <div className="pickedPlayer absolute z-10 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">Already Picked</p>
        </div>
      ) : props.teamFull ? (
        <div className="pickedPlayer absolute z-10 flex h-full w-full select-none items-center justify-center  font-bold lg:text-xl">
          <p className="p-4 text-center text-white">No more slots</p>
        </div>
      ) : teamLimit ? (
        <div className="disabledPlayer absolute z-10 flex h-full w-full select-none items-center justify-center font-bold lg:text-xl">
          <p className="p-4 text-center text-white">
            You can only have 2 players per team!
          </p>
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

      <div className={`hidden h-52 justify-center lg:block`}>
        {props.img ? (
          <Image
            loading="eager"
            className="text-center drop-shadow-2xl"
            alt="player portrait"
            height={500}
            width={500}
            draggable={false}
            src={props.img}
          />
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={`${rareity} tooltip flex h-[5rem] flex-col items-center justify-evenly rounded-b-lg `}
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
    </motion.div>
  );
};
