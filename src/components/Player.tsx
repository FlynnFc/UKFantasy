import Image from "next/image";
import React, { useState } from "react";
import test from "../images/smooya.webp";
export const Player = () => {
  const [stats, setStats] = useState(false);
  return (
    <div
      id="player"
      className="z-0 h-96 w-72 overflow-hidden rounded-xl bg-neutral shadow-lg"
    >
      <div
        id="image"
        className="z-10  h-72 cursor-pointer justify-center overflow-hidden"
        onMouseEnter={() => {
          setTimeout(() => setStats(true), 100);
        }}
        onMouseLeave={() => {
          setTimeout(() => setStats(false), 100);
        }}
      >
        <Image alt="portrait" src={test} />
        <div
          id="stats"
          className={`${stats && "-translate-y-[106%]"} h-full w-full p-2`}
        >
          test
        </div>
      </div>
      <div
        id="nameplate"
        className="flex h-[6rem] cursor-grab select-none flex-col items-center justify-evenly "
      >
        <h2 className=" pt-2 text-center text-3xl font-bold leading-none">
          Smooya
        </h2>
        <div>
          <p className="pb-2 text-center text-2xl">£34,000</p>
        </div>
      </div>
    </div>
  );
};
