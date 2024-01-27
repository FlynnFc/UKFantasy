import { GetSessionParams, getSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiShare } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";

import { motion } from "framer-motion";
import { playerStats } from "../../../components/Player";
import { randomUUID } from "crypto";

export async function getServerSideProps(
  context: GetSessionParams | undefined
) {
  const session = await getSession(context);
  console.log("session:", session);
  // const path = "https://uk-fantasy.vercel.app";
  const path = "http://localhost:3000";
  if (!session || !session?.user) {
    // Handle the case where the user is not logged in
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  //Fetch users team
  const res = await fetch(`${path}/api/pickem`, {
    method: "GET",
    headers: { id: session.user.id },
  });
  if (!res.ok) {
    console.error("error", res);
    return { props: { data: "nothing" } };
  }
  const data = await res.json();
  const path2 = "https://uk-fantasy.vercel.app";
  const res2 = await fetch(`${path2}/api/teams`, {
    method: "GET",
    headers: {
      leaguename: "epic40",
      create: "true",
    },
  });
  const teams = await res2.json();
  console.log("teams:", teams);
  return {
    props: {
      data: { userpickem: data, teams },
    },
  };
}

type TeamType = {
  name: string;
  id: string;
  players: any[];
};

const Pickem = (props: any) => {
  const linkSetter = () => {
    const path: string = props.data.userpickem.userId as string;
    const host = `https://esportsfantasy.app/epic41/pickem/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };

  const [highestRating, setHighestRating] = useState<TeamType>();
  const [lowestRating, setLowestRating] = useState<TeamType>();
  const [playoffs, setPlayoffs] = useState<TeamType[]>(
    new Array(6).fill({ id: randomUUID, name: "" })
  );
  console.log(lowestRating);

  //When sending data to create pickem. Send array of teamids for playoff selections. And team ids for lowest and highest guesses
  return (
    <main className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-6xl select-none flex-col items-center justify-start  p-4 sm:mx-auto">
      <Toaster position="bottom-left" />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <header className="flex flex-col items-center space-x-2">
          <div className="flex flex-row ">
            <h1 className="text-4xl">Pickem</h1>
            <button
              onClick={linkSetter}
              className="btn-ghost rounded-btn mx-2  mb-1 p-2 text-2xl transition-all"
            >
              <FiShare className="" />
            </button>
          </div>
        </header>
        <section className="w-full space-y-2 md:grid md:grid-rows-2 md:gap-6">
          <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
            <div>
              <h3 className="text-center font-bold leading-relaxed">
                Highest rating
              </h3>
              <div className="rounded-btn flex h-20 w-36 items-center justify-center  bg-base-300 p-2 text-center font-bold">
                {highestRating?.name}
              </div>
            </div>
            <div>
              <h3 className="text-center font-bold leading-relaxed">
                Lowest rating
              </h3>
              <div className="rounded-btn flex h-20 w-36 items-center justify-center bg-base-300 p-2 text-center font-bold">
                {lowestRating?.name}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold leading-relaxed">Playoffs</h2>
            <div className="mx-auto grid grid-cols-2  items-center justify-between gap-2 md:flex md:flex-row">
              {playoffs?.map((el) => {
                return (
                  <div
                    className="rounded-btn h-20 w-36 bg-[#f47b20]"
                    key={el.id}
                  >
                    {el.name}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="mt-2 w-full">
          <ul className="mx-4 grid grid-cols-1 gap-2  md:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {props.data.teams.Teams.map((el) => {
              return (
                <li
                  key={el.id}
                  className="flex cursor-grab items-center justify-between gap-1 bg-base-300 p-3"
                >
                  <span className="max-w-sm  overflow-hidden text-ellipsis whitespace-nowrap  text-center  font-normal">
                    {el.teamName}
                  </span>

                  <label
                    htmlFor={el.id}
                    className={`p-2 hover:bg-secondary-content ${
                      el.id === highestRating?.id ||
                      el.id === lowestRating?.id ||
                      playoffs.some((item) => item.id === el.id)
                        ? "cursor-not-allowed"
                        : "cursor-pointer "
                    }`}
                  >
                    <IoMdAdd />
                  </label>

                  <input
                    // disabled={
                    //   el.id === highestRating?.id ||
                    //   el.id === lowestRating?.id ||
                    //   playoffs.some((item) => item.id === el.id)
                    // }
                    type="checkbox"
                    id={el.id}
                    className="modal-toggle"
                  />
                  <div
                    className="modal modal-bottom sm:modal-middle"
                    role="dialog"
                  >
                    <div className="rounded-btn w-full max-w-6xl bg-base-300 p-4">
                      <h3 className="mb-2 text-2xl font-bold leading-relaxed">
                        {el.teamName}
                      </h3>
                      <ul className="flex flex-row justify-evenly gap-4 overflow-x-auto">
                        {el.Player.map((ele) => {
                          return (
                            <li key={ele.id}>
                              <BasicPlayer {...ele} />
                            </li>
                          );
                        })}
                      </ul>
                      <div className="modal-action flex flex-col gap-1 space-x-0 md:flex-row">
                        <label
                          onClick={() =>
                            setLowestRating({
                              id: el.id,
                              name: el.teamName,
                              players: el.Player,
                            })
                          }
                          htmlFor={el.id}
                          className="btn btn-warning"
                        >
                          Lowest Rating
                        </label>
                        <label
                          onClick={() =>
                            setHighestRating({
                              id: el.id,
                              name: el.teamName,
                              players: el.Player,
                            })
                          }
                          htmlFor={el.id}
                          className="btn btn-success"
                        >
                          Highest Rating
                        </label>{" "}
                        <label htmlFor={el.id} className="btn btn-primary">
                          Will make playoffs
                        </label>
                        <label htmlFor={el.id} className="btn btn-error">
                          X
                        </label>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default Pickem;

type player = {
  PlayerSelect: (data: any) => void;
  name: string;
  price: number;
  rareity: string;
  image?: string;
  stats?: playerStats;
  moneyLeft: number;
  teamFull: boolean;
  team: any[];
  id: string;
  priceadjust: number;
  playersTeam: any;
};

export const BasicPlayer = (props: player) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout={true}
      className={`relative z-0 w-52 overflow-hidden rounded-sm bg-base-100 shadow-lg lg:h-[20rem] `}
    >
      <div>
        <div
          className={`bottom-3 z-10 w-full select-none flex-col items-center  justify-evenly p-2 font-bold lg:absolute  lg:p-0  `}
        >
          <div>
            <div className="text-center lg:hidden">{props.name}</div>
            <p
              className={`z-0 pb-2 text-center lg:text-3xl ${
                props.price >= 20000
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
                £
                {new Intl.NumberFormat("en").format(
                  props.price + props.priceadjust
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
    </motion.div>
  );
};
