import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

type myPlayer = {
  bonus?: { name: string; description: string };
  bonusEdit: boolean;
  name: string;
  price: number;
  rareity: string;
  img?: string;
  index: number;
  points?: { value: number }[];
  deleteBonus: (i: number) => void;
};

export const MyPlayer = (props: myPlayer) => {
  const [rareity, setRareity] = useState("");
  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  const points = useMemo(() => {
    let value = 0;
    props.points?.map((el) => (value += el.value));
    return value;
  }, [props.points]);

  return (
    <div className={`w-[14rem] flex-col xl:h-[20rem]`}>
      <div
        className={` relative hidden h-[20rem] cursor-auto rounded-b-none bg-base-200 lg:block`}
      >
        {props.bonus && (
          <div
            className={`absolute top-0 z-10 flex w-full items-center justify-center  p-1 text-center  `}
          >
            <div className="rounded-btn flex flex-row gap-2 border border-white bg-gray-800 px-1 text-center">
              <button
                data-tip={props.bonus.description}
                className={` tooltip text-lg  text-white`}
              >
                {props.bonus.name}
              </button>
              {props.bonusEdit && (
                <button
                  onClick={() => props.deleteBonus(props.index)}
                  className="mr-2 mt-[0.1rem]  font-bold text-red-500"
                >
                  X
                </button>
              )}
            </div>
          </div>
        )}
        <div
          className={`absolute bottom-3 z-10 w-full select-none flex-col items-center justify-evenly justify-self-end font-bold  `}
        >
          <div className="lg:hidden">{props.name}</div>
          <div>
            <p
              className={`pb-2 text-center lg:text-3xl ${
                props.price >= 20000
                  ? "gold"
                  : props.price > 17499
                  ? "silver"
                  : "bronze"
              }`}
            >
              {" "}
              {props.img ===
                "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwiaWF0IjoxNjg5Nzk5MDQxLCJleHAiOjE3MjEzMzUwNDF9.zGDt3amKB3L7hwOoakyIySWv51yDnSOw7m5jvDh4hUE&t=2023-07-19T20%3A37%3A30.001Z" && (
                <span className={`hidden text-center lg:block`}>
                  {props.name}
                </span>
              )}
              £{new Intl.NumberFormat("en").format(props.price)}
            </p>
          </div>
        </div>
        {props.img ? (
          <Image
            loading="eager"
            className="z-0 text-center drop-shadow-2xl"
            alt="player portrait"
            src={props.img}
            layout="fill"
          />
        ) : (
          <div></div>
        )}
      </div>
      <div
        className={`rounded-btn flex flex-col items-center justify-center bg-neutral/50 p-2  lg:rounded-btn lg:hidden`}
      >
        <h2 className={`${props.rareity}`}>{props.name}</h2>
        <span className={`${props.rareity}`}>{props.price}</span>
      </div>
      {props.bonus && (
        <div
          className={`tooltip z-10 flex w-full gap-2 bg-base-100 p-1 text-center  text-base-content lg:hidden`}
          data-tip={props.bonus.description}
        >
          <button className="w-full text-center text-lg font-bold  text-base-content">
            {props.bonus.name}
          </button>
          {props.bonusEdit && (
            <button
              onClick={() => props.deleteBonus(props.index)}
              className="right-0 mr-2 mt-[0.1rem] font-bold text-error"
            >
              X
            </button>
          )}
        </div>
      )}
    </div>
  );
};
