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
      className={`relative z-0  w-[16rem] overflow-hidden rounded-xl bg-neutral shadow-lg lg:h-72`}
    >
      <div className={`z-10 hidden h-52 cursor-auto justify-center lg:block`}>
        <Image
          className="overflow-hidden text-center drop-shadow-2xl"
          alt="player portrait"
          layout="fill"
          src={props.img}
        />
      </div>
      <div
        className={`${rareity} tooltip flex h-[5rem] cursor-pointer select-none flex-col items-center justify-evenly rounded-b-lg `}
      >
        <h2 className=" pt-2 text-center font-bold leading-none text-neutral lg:text-2xl xl:text-4xl">
          {props.name}
        </h2>
        <div>
          <p className="pb-2 text-center text-neutral xl:text-3xl">
            £{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};
