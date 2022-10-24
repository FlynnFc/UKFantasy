import React, { useState } from "react";

export const Player = () => {
  const [stats, setStats] = useState(false);
  return (
    <div id="player" className="z-0 h-96 w-72 overflow-hidden bg-orange-500">
      <div
        onMouseEnter={() => {
          console.log(stats);
          setStats(true);
        }}
        onMouseLeave={() => {
          console.log(stats);
          setStats(false);
        }}
        id="image"
        className="z-10 flex h-72 items-center justify-center bg-green-500"
      >
        image
      </div>

      <div className="flex h-[6rem] flex-col items-center justify-evenly bg-yellow-500">
        <h2 className="p-2 text-center text-3xl font-bold">Smooya</h2>
        <div>
          <p className="text-center text-2xl">£34,000</p>
        </div>
      </div>
      <div
        id="stats"
        className={`${
          stats ? "-translate-y-[100%]" : "translate-y-[105%]"
        }h-full w-full transition-transform`}
      >
        test
      </div>
    </div>
  );
};
