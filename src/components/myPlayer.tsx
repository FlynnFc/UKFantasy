import Image from "next/image";
import React, { useEffect, useState } from "react";

type myPlayer = {
  bonus: { name: string; description: string };
  name: string;
  price: number;
  rareity: string;
  img?: string;
};

export const MyPlayer = (props: myPlayer) => {
  const [rareity, setRareity] = useState("");
  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  return (
    <div
      className={`w-[16rem] flex-col rounded-xl  border-amber-400 bg-base-200 shadow-lg  xl:h-[24rem]`}
    >
      <div
        className={`relative hidden h-72 cursor-auto justify-center xl:block`}
      >
        {props.bonus && (
          <div
            className={`tooltip absolute top-0  z-10 w-full rounded-t-lg ${rareity} text-center`}
            data-tip={props.bonus.description}
          >
            <button className="text-lg font-bold text-base-200">
              {props.bonus.name}
            </button>
          </div>
        )}
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
