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
    <div className={`w-[14rem] flex-col shadow-lg xl:h-[20rem]`}>
      <div
        className={` relative hidden h-[20rem] cursor-auto rounded-b-none bg-base-200 lg:block`}
      >
        {props.bonus && (
          <div
            className={`tooltip absolute top-0 z-10 w-full bg-base-100/60 p-1 text-center  `}
            data-tip={props.bonus.description}
          >
            <button className={` text-lg font-bold  text-base-content`}>
              {props.bonus.name}
            </button>
            {props.bonusEdit && (
              <button
                onClick={() => props.deleteBonus(props.index)}
                className="absolute right-0 mr-2 mt-[0.1rem]  font-bold text-error"
              >
                X
              </button>
            )}
          </div>
        )}
        <div
          className={`absolute bottom-3 z-10 w-full select-none flex-col items-center justify-evenly justify-self-end font-bold  `}
        >
          <div className="lg:hidden">{props.name}</div>
          <div>
            <p className={`pb-2 text-center lg:text-3xl ${rareity}`}>
              £{props.price}
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
        className={`rounded-btn flex flex-col items-center justify-center   bg-neutral lg:hidden`}
      >
        <h2 className={`${props.rareity}`}>{props.name}</h2>
        <span className={`${props.rareity}`}>{props.price}</span>
      </div>
      {props.bonus && (
        <div
          className={`tooltip z-10 flex w-full gap-2 bg-green-500 p-1 text-center xl:hidden`}
          data-tip={props.bonus.description}
        >
          <button className="w-full text-center text-lg font-bold text-base-200">
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
