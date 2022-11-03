import React, { useEffect, useState } from "react";

const PlayerSkeleton = () => {
  const [stats, setStats] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [y, setY] = useState(0);

  // useEffect(() => {
  //   const handleNavigation = (e: any) => {
  //     const window = e.currentTarget;
  //     if (y < window.scrollY) {
  //       setScroll(true);
  //     }
  //     setY(window.scrollY);
  //   };
  //   setY(window.scrollY);
  //   window.addEventListener("scroll", (e) => handleNavigation(e));
  // }, [y]);

  return (
    <div
      id="player"
      className={`z-0 ${
        !scroll && "h-72"
      } w-56 overflow-hidden rounded-xl bg-neutral shadow-lg ${
        stats && "animate-pulse"
      }`}
      onMouseEnter={() => {
        setTimeout(() => setStats(true), 100);
      }}
      onMouseLeave={() => {
        setTimeout(() => setStats(false), 100);
      }}
    >
      {!scroll && (
        <div
          id="image"
          className="z-10  h-52 justify-center overflow-hidden bg-base-300"
        ></div>
      )}
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
