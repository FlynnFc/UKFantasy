import React from "react";
import { gameData } from "./LiveGamesExample";

const tempDataLiveGames: gameData[] = [
  {
    team1: { name: "ITB", score: 11 },
    team2: { name: "Viperio", score: 4 },
    map: "Mirage",
    startTime: Date.now(),
  },
  {
    team1: { name: "RKB", score: 15 },
    team2: { name: "Faze", score: 0 },
    map: "Anubis",
    startTime: Date.now(),
  },
  {
    team1: { name: "RKB", score: 15 },
    team2: { name: "Faze", score: 0 },
    map: "Anubis",
  },
];

const LiveGames = () => {
  return (
    <div className=" rounded-btn bg-base-300 p-5">
      <h2 className="text-center text-xl font-bold leading-none">Live games</h2>
      <ul className="items-left mt-3 flex w-full  flex-col justify-start gap-1 text-left">
        {tempDataLiveGames?.length
          ? tempDataLiveGames?.map((el) => {
              if (!el.startTime) {
                return;
              }
              return (
                <li key={el.team1.name}>
                  <a
                    href={`https://hltv.org/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={`tooltip rounded-btn btn-lg btn grid w-full min-w-0 cursor-pointer grid-cols-3 gap-1 border-0 bg-green-500/40 p-2  text-center text-base-100 transition-all hover:bg-green-500 hover:text-base-300`}
                      data-tip="Go to channel"
                    >
                      <div className="flex flex-col items-start">
                        <span>{el.team1.name}</span>
                        <span className="text-xs">{el.map}</span>
                      </div>
                      <div>VS</div>{" "}
                      <div className="flex flex-col items-end">
                        <span>{el.team2.name}</span>
                        <span className="text-xs font-medium text-red-500">
                          {el.team1.score}-{el.team2.score}
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              );
            })
          : "No live Games"}
      </ul>
    </div>
  );
};

export default LiveGames;
