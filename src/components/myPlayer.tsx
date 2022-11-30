import Image from "next/image";
import React, { useEffect, useState } from "react";

type myPlayer = {
  name: string;
  price: number;
  rareity: string;
  img?: string;
};

export const MyPlayer = (props: myPlayer) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");

  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  return (
    <div
      className={`relative z-0 h-auto w-[18.7rem] overflow-hidden rounded-xl bg-neutral shadow-lg`}
    >
      <div
        className={`z-10 m-0 hidden h-auto cursor-auto justify-center overflow-hidden lg:flex`}
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        <Image
          className="drop-shadow-2xl"
          alt="portrait"
          height={300}
          width={300}
          src="/_next/static/media/dweg.0d76dcc6.webp"
        />
      </div>
      <div
        className={`${rareity} flex h-auto select-none flex-col items-center justify-evenly rounded-b-lg `}
      >
        <h2 className="pt-2 text-center font-bold leading-none text-neutral md:text-xl xl:text-3xl">
          {props.name}
        </h2>
        <div>
          <p className="pb-2 text-center text-neutral lg:text-3xl">
            £{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};
