import React, { useState } from "react";

const PlayerSkeleton = () => {
  return (
    <div
      className={`z-0 flex  w-52 flex-col justify-between overflow-hidden rounded-sm bg-base-200 text-sm shadow-lg xl:h-[20rem] `}
    >
      <div className={`justify-center overflow-hidden bg-base-300`}></div>

      <div className="flex h-[5rem] select-none flex-col items-center justify-evenly rounded-b-lg bg-base-300">
        <h2 className=" pt-2 text-center text-2xl font-bold leading-none"></h2>
        <div>
          <p className="pb-2 text-center text-2xl"></p>
        </div>
      </div>
    </div>
  );
};
export default PlayerSkeleton;
