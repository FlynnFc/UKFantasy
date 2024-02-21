import React, { useState } from "react";
import Image from "next/image";
import { playerStats } from "./Player";
import { ChevronsDown, ChevronsUp } from "lucide-react";
export type player = {
  key: string;
  name: string;
  price: number;
  rareity: string;
  image?: string;
  stats?: playerStats;
  id: string;
  priceadjust: number;
};
const PreviewPlayer = (props: player) => {
  const [stats, setStats] = useState(false);
  return (
    <div className={` mx-2 flex-col lg:h-[20rem] lg:w-[14rem] lg:shadow-lg`}>
      <div className={` relative cursor-auto rounded bg-base-100 lg:h-[20rem]`}>
        <div
          className={`bottom-3 z-10 w-full select-none flex-col  items-center justify-evenly p-2 font-bold  lg:absolute  `}
        >
          <div>
            <div className={`text-center lg:hidden`}>{props.name}</div>

            <p
              className={`z-0 pb-2 text-center lg:text-3xl ${
                props.price >= 19999
                  ? "gold"
                  : props.price > 17499
                  ? "silver"
                  : "bronze"
              }`}
            >
              {props.image ===
                "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwiaWF0IjoxNjg5Nzk5MDQxLCJleHAiOjE3MjEzMzUwNDF9.zGDt3amKB3L7hwOoakyIySWv51yDnSOw7m5jvDh4hUE&t=2023-07-19T20%3A37%3A30.001Z" && (
                <span className={`hidden text-center lg:block`}>
                  {props.name}
                </span>
              )}
              <span
                className={`flex items-center justify-center ${
                  props.price >= 20000
                    ? "gold"
                    : props.price > 17499
                    ? "silver"
                    : "bronze"
                }`}
              >
                {props.price === 1000 ? (
                  <>No Price</>
                ) : (
                  <>
                    {" "}
                    £
                    {new Intl.NumberFormat("en").format(
                      props.price + props.priceadjust
                    )}
                    {props.priceadjust > 0 && (
                      <ChevronsUp
                        size={36}
                        className="w-fit"
                        color="rgb(34 197 94)"
                        strokeWidth={2.75}
                      />
                    )}
                    {props.priceadjust < 0 && (
                      <ChevronsDown
                        size={36}
                        className="w-fit"
                        color="rgb(239 68 68)"
                        strokeWidth={2.75}
                      />
                    )}
                  </>
                )}
              </span>
            </p>
          </div>
        </div>
        <div className={`z-0 hidden cursor-auto justify-center lg:block`}>
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
    </div>
  );
};

export default PreviewPlayer;
