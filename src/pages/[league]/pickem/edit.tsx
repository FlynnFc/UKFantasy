import { GetSessionParams, getSession, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiShare } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";

import { motion } from "framer-motion";
import { playerStats } from "../../../components/Player";
import { randomUUID } from "crypto";
import { ChevronUp, ChevronUpIcon } from "lucide-react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const path = "https://uk-fantasy.vercel.app";
  // const path = "http://localhost:3000";
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
  if (data === "false") {
    return {
      redirect: {
        destination: `/${context?.params?.league}/pickem`,
        permanent: false,
      },
    };
  }
  // League started no more edits
  if (data.results.league.starDate) {
    return {
      redirect: {
        destination: `/${context?.params?.league}/pickem/${session.user.id}`,
        permanent: false,
      },
    };
  }
  const path2 = "https://uk-fantasy.vercel.app";
  const res2 = await fetch(`${path2}/api/teams`, {
    method: "GET",
    headers: {
      leaguename: context.params?.league as string,
      create: "true",
    },
  });
  const teams = await res2.json();
  return {
    props: {
      data: { userpickem: data, teams },
    },
  };
}

type TeamType = {
  teamName: string;
  id: string;
  players: any[];
};

const Pickem = (props: any) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { query } = useRouter();
  const [highestRating, setHighestRating] = useState<string>(
    props.data.userpickem.highestRating
  );
  const [lowestRating, setLowestRating] = useState<string>(
    props.data.userpickem.lowestRating
  );
  const [playoffs, setPlayoffs] = useState<TeamType[]>(
    props.data.userpickem.playoffs
  );
  const [playoffFull, setPlayoffFull] = useState(false);

  function playoffAdder({ teamName, id, players }: TeamType) {
    // Find the index of the next empty item
    const nextInsertion = playoffs.findIndex(
      (element) => element?.teamName === ""
    );

    // If there's no empty spot, set playoff full and return early
    if (nextInsertion === playoffs.length - 1) {
      setPlayoffFull(true);
    }

    // Create a new array with the updated team
    const newArr = [...playoffs];
    newArr[nextInsertion] = { teamName, id, players };

    // Update the state with the new array
    setPlayoffs(newArr);
  }

  function playoffDeleter(teamId: string) {
    // Find the index of the team to remove
    const indexToRemove = playoffs.findIndex((team) => team.id === teamId);

    // If the team is not found, return early
    if (indexToRemove === -1) return;
    const toAdd: TeamType = {
      teamName: "",
      id: (Math.random() * 100).toString(),
      players: [],
    };
    // Create a new array, removing the specified team and shifting elements
    const newArr = [
      ...playoffs.slice(0, indexToRemove),
      ...playoffs.slice(indexToRemove + 1),
      toAdd,
      // Add an empty spot at the end
    ];

    // Update the state with the new array
    setPlayoffs(newArr);
    setPlayoffFull(false);
  }
  console.log(playoffs);
  async function submitPickem() {
    const teamids: { id: string }[] = [];
    playoffs.forEach((el) => teamids.push({ id: el.id }));
    // Strings to remove are those present in original but not in edited
    const toRemove = props.data.userpickem.playoffs.filter(
      (originalItem: { id: string }) =>
        !teamids.some((editedItem) => editedItem.id === originalItem.id)
    );

    // Strings (ids) to add are those present in edited but not in original
    const toAdd = teamids.filter(
      (editedItem) =>
        !props.data.userpickem.playoffs.some(
          (originalItem: { id: string }) => originalItem.id === editedItem.id
        )
    );
    const res = await fetch(`/api/pickem`, {
      method: "PUT",
      headers: { id: session?.user?.id as string },
      body: JSON.stringify({
        id: props.data.userpickem.id,
        toAdd: toAdd,
        toRemove: toRemove,
        lowestRating: lowestRating,
        highestRating: highestRating,
      }),
    });
    if (!res.ok) {
      throw new Error("Couldn't submit");
    }
    return res;
  }

  function submitHandler() {
    toast.promise(submitPickem(), {
      loading: "Submitting...",
      success: <b>Pickems submitted!</b>,
      error: <b>Could not submit your pickems!</b>,
    });
    router.push(`/${query.league}/pickem/${session?.user?.id}`);
  }
  //When sending data to create pickem. Send array of teamids for playoff selections. And team ids for lowest and highest guesses
  return (
    <main className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-6xl select-none flex-col items-center justify-start  p-4 sm:mx-auto">
      <Toaster position="bottom-left" />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <header className="flex w-full flex-col items-center space-x-2">
          <div className="flex flex-row  items-stretch gap-4">
            <h1 className="mb-6 text-4xl">Editing your Group Stage Pickems</h1>
            <button
              disabled={!lowestRating || !highestRating || !playoffFull}
              onClick={submitHandler}
              className="btn btn-primary"
            >
              Edit
            </button>
          </div>
        </header>
        <section className="w-full space-y-2 md:grid md:grid-rows-2 md:gap-4 md:space-y-0">
          <div className="flex w-full flex-col items-center gap-2  lg:grid lg:grid-cols-8">
            <div className=" lg:col-start-3">
              <h3 className="text-center font-bold leading-relaxed">
                1st Place
              </h3>
              <div className="rounded-btn flex h-20 w-full items-center justify-center bg-green-900 p-2 text-center font-bold">
                {highestRating ?? (
                  <BsChevronDoubleUp className="text-3xl text-green-500" />
                )}
              </div>
            </div>
            <div className="lg:col-start-6">
              <h3 className="text-center font-bold leading-relaxed">
                Lowest rating
              </h3>
              <div className="rounded-btn flex h-20 w-full items-center justify-center bg-red-900 p-2 text-center font-bold">
                {lowestRating ?? (
                  <BsChevronDoubleDown className="text-3xl text-red-500" />
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold leading-relaxed">Playoffs</h2>
            <div className="mx-4 grid grid-cols-1 gap-2  md:mx-0 md:grid-cols-3 lg:grid-cols-4">
              {playoffs?.map((el) => {
                return (
                  <div
                    className="rounded-btn flex h-12 w-full flex-row items-center justify-between bg-primary p-2 text-center font-bold shadow"
                    key={el.id}
                  >
                    <h3 className="max-w-lg  overflow-hidden text-ellipsis whitespace-nowrap">
                      {el.teamName}
                    </h3>
                    {el.teamName !== "" && (
                      <div className="">
                        <span
                          onClick={() => playoffDeleter(el.id)}
                          className="cursor-pointer text-red-500"
                        >
                          X
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="mt-2 w-full">
          <ul className="mx-4 grid grid-cols-1 gap-2  md:mx-0 md:grid-cols-3 lg:grid-cols-4">
            {props.data.teams.Teams.map(
              (el: {
                id: string;
                teamName: string;
                Player: (JSX.IntrinsicAttributes & player)[];
              }) => {
                return (
                  <>
                    <label htmlFor={el.id} className={``}>
                      <div
                        key={el.teamName}
                        className="flex cursor-pointer items-center justify-between gap-1 bg-base-300 p-3 hover:bg-base-200"
                      >
                        <span className="max-w-sm  overflow-hidden text-ellipsis whitespace-nowrap  text-center  font-normal">
                          {el.teamName}
                        </span>

                        <IoMdAdd />
                      </div>{" "}
                    </label>
                    <input
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
                          {el.Player.map(
                            (ele: JSX.IntrinsicAttributes & player) => {
                              return (
                                <li key={ele.id}>
                                  <BasicPlayer {...ele} />
                                </li>
                              );
                            }
                          )}
                        </ul>
                        <div className="modal-action flex flex-col gap-1 space-x-0 md:flex-row">
                          <label
                            onClick={() => setLowestRating(el.teamName)}
                            htmlFor={el.id}
                            className={`${
                              el.teamName === lowestRating && "btn-disabled"
                            } btn btn-warning`}
                          >
                            Lowest Rating
                          </label>
                          <label
                            onClick={() => setHighestRating(el.teamName)}
                            htmlFor={el.id}
                            className={`${
                              el.teamName === highestRating && "btn-disabled"
                            } btn btn-success`}
                          >
                            Highest Rating
                          </label>{" "}
                          <label
                            htmlFor={el.id}
                            className={`${
                              (playoffs.some((team) => team.id === el.id) ||
                                playoffFull) &&
                              "btn-disabled"
                            } btn btn-primary`}
                            onClick={() =>
                              playoffAdder({
                                id: el.id,
                                teamName: el.teamName,
                                players: el.Player,
                              })
                            }
                          >
                            Will make playoffs
                          </label>
                          <label htmlFor={el.id} className="btn btn-error">
                            X
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                );
              }
            )}
          </ul>
          {!props.data.teams.Teams.length && <div>No teams found</div>}
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
