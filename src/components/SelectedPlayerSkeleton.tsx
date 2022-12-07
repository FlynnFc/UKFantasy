import React, { useEffect, useState } from "react";

const PlayerSkeleton = () => {
  const [stats, setStats] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);
    // clean up code
    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (offset < 50) {
      setScrolled(true);
    } else setScrolled(false);
  }, [offset]);

  return (
    <div
      className={`z-0 w-56 overflow-hidden rounded-xl bg-neutral text-sm shadow-lg ${
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
        className={`image h-full justify-center overflow-hidden bg-base-300`}
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
