import Image from "next/image";
import React, { useEffect, useState } from "react";

type myPlayer = {
  name: string;
  price: number;
  rareity: string;
  img?: string | any;
};

export const MyPlayer = (props: myPlayer) => {
  const [rareity, setRareity] = useState("");
  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  return (
    <div
      className={`w-[16rem] flex-col rounded-xl bg-base-200 shadow-lg xl:h-[24rem]`}
    >
      <div
        className={`relative hidden h-72 cursor-auto justify-center xl:block`}
      >
        {props.img && (
          <Image
            className="text-center drop-shadow-2xl"
            alt="player portrait"
            layout="fill"
            src={props.img}
          />
        )}
      </div>
      <div
        className={`${rareity} flex h-[6rem] select-none flex-col items-center justify-evenly rounded-lg xl:rounded-none xl:rounded-b-lg `}
      >
        <h2 className="pt-3 text-center font-bold leading-none text-base-200 lg:text-xl xl:text-3xl">
          {props.name}
        </h2>
        <div>
          <p className="pb-3 text-center text-base-200 xl:text-2xl">
            £{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};
