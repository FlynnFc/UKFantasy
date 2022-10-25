import Image from "next/image";
import React, { useEffect, useState } from "react";
import test from "../images/smooya.webp";

type player = {
  name: string;
  price: string;
  rareity: string;
  img?: any;
};

const SelectedPlayer = (props: player) => {
  const [stats, setStats] = useState(false);
  const [rareity, setRareity] = useState("");
  const [scroll, setScroll] = useState(false);
  const [y, setY] = useState(0);

  useEffect(() => {
    const handleNavigation = (e: any) => {
      const window = e.currentTarget;
      if (y < window.scrollY) {
        setScroll(true);
      }
      if (y === 0) {
        setScroll(false);
      }
      setY(window.scrollY);
    };
    setY(window.scrollY);
    window.addEventListener("scroll", (e) => handleNavigation(e));
  }, [y]);

  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);
  return (
    <div
      id="selectedPlayer"
      className={`z-0 ${
        !scroll && "h-72"
      } w-56 overflow-hidden rounded-xl bg-neutral shadow-lg`}
    >
      {!scroll && (
        <div
          id="image"
          className="z-10  h-52 cursor-pointer justify-center overflow-hidden"
          onMouseEnter={() => {
            setTimeout(() => setStats(true), 100);
          }}
          onMouseLeave={() => {
            setTimeout(() => setStats(false), 100);
          }}
        >
          <Image alt="portrait" height={300} width={300} src={props.img} />
          <div
            id="stats"
            className={`${
              stats && "h-full  w-full -translate-y-[110.5%] p-2"
            } "h-full p-2" w-full`}
          >
            <ul className="flex h-full flex-col justify-between">
              <div>
                <li>HLTV: N/A</li>
                <li>Faceit Elo: 3400 </li>
                <li>HS%: 54.3%</li>
                <li>Entry Rounds: 10.4%</li>
                <li>Clutch Rounds: 0.4%</li>
              </div>
              <button className="btn">Detailed Stats</button>
            </ul>
          </div>
        </div>
      )}
      <div
        id={rareity}
        className="flex h-[5rem] select-none flex-col items-center justify-evenly rounded-b-lg "
      >
        <h2 className=" pt-2 text-center text-2xl font-bold leading-none text-neutral">
          {props.name}
        </h2>
        <div>
          <p className="pb-2 text-center text-2xl text-neutral">
            £{props.price}
          </p>
        </div>
      </div>
    </div>
  );
};
export default SelectedPlayer;
