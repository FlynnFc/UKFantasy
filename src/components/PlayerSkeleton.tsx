import React, { useState } from "react";

const PlayerSkeleton = () => {
  const [stats, setStats] = useState(false);

  return (
    <div
      id="player"
      className={`z-0 h-72 w-56 overflow-hidden rounded-xl bg-neutral shadow-lg ${
        stats && "animate-pulse"
      }`}
      onMouseEnter={() => {
        setTimeout(() => setStats(true), 100);
      }}
      onMouseLeave={() => {
        setTimeout(() => setStats(false), 100);
      }}
    >
      <div
        id="image"
        className="z-10  h-52 justify-center overflow-hidden bg-base-300"
      ></div>
      <div className="flex h-[5rem]  select-none flex-col items-center justify-evenly rounded-b-lg ">
        <h2 className=" pt-2 text-center text-2xl font-bold leading-none"></h2>
        <div>
          <p className="pb-2 text-center text-2xl"></p>
        </div>
      </div>
    </div>
  );
};
export default PlayerSkeleton;
