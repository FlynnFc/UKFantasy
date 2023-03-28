import Image from "next/image";
import React, { FormEvent, useState } from "react";
import { player } from "./[league]/create";
import { toast, Toaster } from "react-hot-toast";
type team = {
  Player: player[];
  id: string;
  teamName: string;
};

const Help = (props: { data: team[] }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<player>();
  const [showImg, setShowImg] = useState(false);

  const formSubmitter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.error("Not accepting requests at this time");
  };

  const playerDetailHandler = (id: string) => {
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
      <Toaster position="bottom-left" />
      <header>
        <h1 className="mt-5 mb-10 text-2xl md:mt-0 md:text-5xl">
          Request to edit player details
        </h1>
      </header>
      <form
        onSubmit={(e) => formSubmitter(e)}
        className="w-5/6 text-xl md:w-2/6"
      >
        <div className="flex w-full flex-col">
          <select
            name="playerSelect"
            id="playerSelect"
            className="select-bordered select my-1 border-2 border-primary md:select-lg focus:outline-1"
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
                className="input-bordered input w-full  md:input-lg focus:outline-1"
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
                <div className="flex w-full justify-start pt-2 pb-5">
                  <Image
                    className="rounded-lg text-center drop-shadow-2xl"
                    alt="player portrait"
                    height={200}
                    width={200}
                    src={selectedPlayer.image}
                  />
                </div>
              )}
              <input
                type="file"
                className="file-input-bordered file-input w-full md:file-input-lg focus:outline-1"
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
                className="input-bordered input w-full md:input-lg focus:outline-1"
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

export default Help;
