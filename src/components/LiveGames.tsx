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
                      className={`btn-success tooltip rounded-btn btn-lg btn flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 p-2 text-center transition-all`}
                      data-tip="Go to channel"
                    >
                      <div className="inline-block w-full min-w-0  flex-col items-start text-left">
                        <div className="grid  grid-cols-3 text-center text-xl">
                          <span className="text-left text-xl">
                            {el.team1.name}
                          </span>
                          <span className="text-center text-xl">vs</span>
                          <span className="text-right text-xl">
                            {el.team2.name}
                          </span>
                        </div>
                        <div className="flex flex-row justify-between">
                          <p className="block overflow-hidden truncate text-xs">
                            {el.map}
                          </p>

                          <span className="flex w-min flex-row items-center gap-1 text-xs font-bold text-red-500">
                            <span> {el.team1.score}</span> <span>-</span>
                            <span> {el.team2.score}</span>
                          </span>
                        </div>
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
