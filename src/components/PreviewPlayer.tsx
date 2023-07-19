import React, { useState } from "react";
import Image from "next/image";
import { playerStats } from "./Player";
export type player = {
  key: string;
  name: string;
  price: number;
  rareity: string;
  image?: string;
  stats?: playerStats;
  id: string;
};
const PreviewPlayer = (props: player) => {
  const [stats, setStats] = useState(false);
  return (
    <div className={` flex-col shadow-lg lg:w-[14rem] xl:h-[20rem]`}>
      <div
        className={` relative hidden h-[20rem] cursor-auto rounded-b-none bg-base-200 xl:block`}
      >
        <div
          className={`absolute bottom-3 z-10 w-full select-none flex-col items-center justify-evenly justify-self-end font-bold  `}
        >
          <div>
            <p
              className={`flex flex-col pb-2 text-center shadow-2xl lg:text-3xl ${
                props.price >= 21500
                  ? "gold"
                  : props.price > 19000
                  ? "silver"
                  : "bronze"
              }`}
            >
              <span>
                {props.image ===
                  "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwiaWF0IjoxNjg5Nzk5MDQxLCJleHAiOjE3MjEzMzUwNDF9.zGDt3amKB3L7hwOoakyIySWv51yDnSOw7m5jvDh4hUE&t=2023-07-19T20%3A37%3A30.001Z" &&
                  props.name}
              </span>
              £{props.price}
            </p>
          </div>
        </div>
        {props.image ? (
          <Image
            loading="eager"
            className="z-0 text-center drop-shadow-2xl"
            alt="player portrait"
            src={props.image}
            layout="fill"
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default PreviewPlayer;
