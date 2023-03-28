import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { player } from "./create";

type team = {
  Player: player[];
  id: string;
  teamName: string;
};

const Help = (props: { data: team[] }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<player>();
  const [showImg, setShowImg] = useState(false);

  const playerDetailHandler = (id: any) => {
    props.data.forEach((el) => {
      el.Player.forEach((player) => {
        if (player.id === id) {
          setSelectedPlayer(player);
          return;
        }
      });
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-start">
      <header>
        <h1 className="mb-10 text-5xl">Request to edit player details</h1>
      </header>
      <form action="#" className="w-5/6 text-xl md:w-2/6">
        <div className="flex w-full flex-col">
          <select
            name="playerSelect"
            id="playerSelect"
            className="select-bordered select select-lg my-1 bg-base-content text-base text-base-300 focus:outline-1"
            onChange={(e) => playerDetailHandler(e.target.value)}
          >
            <option disabled selected value="">
              Select player
            </option>
            {props.data.map &&
              props.data.map((team) => {
                return (
                  <optgroup key={team.teamName} label={team.teamName}>
                    {team.Player.map((player) => (
                      <option value={player.id} className="p-1" key={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
          </select>
        </div>
        {selectedPlayer && (
          <div className="my-2 flex w-full flex-col items-stretch justify-center space-y-4">
            <div>
              <label className="label" htmlFor="">
                Player name
              </label>
              <input
                required
                type="text"
                className="input-bordered input input-lg  w-full focus:outline-1"
                value={selectedPlayer.name}
                onChange={(e) =>
                  setSelectedPlayer({ ...selectedPlayer, name: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col">
              <label className="label" htmlFor="">
                Player image{" "}
                <span
                  onClick={() => setShowImg((prev) => !prev)}
                  className="link-primary ml-6 cursor-pointer"
                >
                  {showImg ? `hide current image` : `show current image`}
                </span>
              </label>
              {showImg && (
                <div className="flex w-full justify-start">
                  <Image
                    className="rounded-t-lg text-center drop-shadow-2xl"
                    alt="player portrait"
                    height={200}
                    width={200}
                    src={selectedPlayer.image}
                  />
                </div>
              )}
              <input
                type="file"
                className="file-input-bordered file-input file-input-lg w-full focus:outline-1"
                accept=".png, .jpeg, .jpg"
                size={100}
              />
            </div>
            <div>
              <label className="label" htmlFor="">
                Contact details*
              </label>
              {/*todo: add logic to check if email or twitter user link */}
              <input
                type="text"
                className="input-bordered input input-lg w-full focus:outline-1"
                placeholder="email or twitter handle"
              />
            </div>
            <button className="btn-primary btn-lg btn w-full" type="submit">
              Submit
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export async function getStaticProps() {
  const res = await fetch("https://uk-fantasy.vercel.app/api/allTeams");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
  const data = await res.json();
  const paths = data.map((league: { name: string }) => ({
    params: { league: league.name.toLowerCase() },
  }));

  console.log(paths);
  return {
    paths,
    fallback: false,
  };
}

export default Help;
