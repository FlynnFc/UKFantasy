import React, { useEffect, useState } from "react";
import Image from "next/image";
type player = {
  PlayerSelect: (data: any) => void;
  name: string;
  price: number;
  rareity: string;
  img?: string | any;
  moneyLeft: number;
  teamFull: boolean;
  team: any[];
};

export const Player = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");
  const [disable, setDisabled] = useState(false);
  const [picked, setPicked] = useState(false);
  console.log(props.img);
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
};
