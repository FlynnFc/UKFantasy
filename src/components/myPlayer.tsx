import Image from "next/image";
import React, { useEffect, useState } from "react";

type myPlayer = {
  bonus?: { name: string; description: string };
  bonusEdit: boolean;
  name: string;
  price: number;
  rareity: string;
  img?: string;
  index: number;
  deleteBonus: (i: number) => void;
};

export const MyPlayer = (props: myPlayer) => {
  const [rareity, setRareity] = useState("");
  useEffect(() => {
    setRareity(props.rareity);
  }, [props.rareity]);

  return (
    <div
      className={`rounded-btn flex-col shadow-lg xl:h-[24rem]  xl:w-[16rem]`}
    >
      <div
        className={`rounded-btn relative hidden h-[16.4rem] cursor-auto justify-center bg-base-200 xl:block`}
      >
        {props.bonus && (
          <div
            className={`tooltip absolute top-0 z-10 w-full rounded-t-lg p-1 ${rareity} text-center`}
            data-tip={props.bonus.description}
          >
            <button className="text-lg font-bold text-base-200">
              {props.bonus.name}
            </button>
            {props.bonusEdit && (
              <button
                onClick={() => props.deleteBonus(props.index)}
                className="absolute right-0 mr-2 mt-[0.1rem] font-bold text-error"
              >
                X
              </button>
            )}
          </div>
        )}
        {props.img && (
          <Image
            className="rounded-t-lg text-center drop-shadow-2xl"
            alt="player portrait"
            layout="fill"
            src={props.img}
          />
        )}
      </div>
      <div className="flex w-full flex-col">
        <div
          className={`${rareity} flex h-[6rem] w-full select-none flex-col items-center justify-evenly rounded-t-lg p-4 xl:rounded-b-lg xl:rounded-t-none`}
        >
          <h2 className="pt-3 text-center text-xs font-bold leading-none text-base-200 lg:text-xl xl:text-3xl">
            {props.name}
          </h2>
          <div>
            <p className="pb-3 text-center text-base-200 xl:text-2xl">
              £{props.price}
            </p>
          </div>
        </div>
        {props.bonus && (
          <div
            className={`tooltip z-10 flex w-full gap-2 rounded-b-lg bg-base-content p-1 text-center xl:hidden`}
            data-tip={props.bonus.description}
          >
            <button className="re  text-lg font-bold text-base-200">
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
    </div>
  );
};
