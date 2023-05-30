import React, { useState } from "react";

const PlayerSkeleton = () => {
  const [stats, setStats] = useState(false);

  return (
    <div
      className={`z-0 flex  h-72 w-56 flex-col justify-between overflow-hidden rounded-xl bg-neutral text-sm shadow-lg ${
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
        className={` image  justify-center overflow-hidden bg-base-100`}
      ></div>

      <div className="flex h-[5rem] select-none flex-col items-center justify-evenly rounded-b-lg bg-base-200">
        <h2 className=" pt-2 text-center text-2xl font-bold leading-none"></h2>
        <div>
          <p className="pb-2 text-center text-2xl"></p>
        </div>
      </div>
    </div>
  );
};
export default PlayerSkeleton;
