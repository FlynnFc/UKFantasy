import React, { useEffect, useState } from "react";
import StreamLink from "./StreamLink";

export type stream = {
  user_name: string;
  live: boolean;
  title: string;
  viewer_count: number;
};

export type gameData = {
  team1: { name: string; score: number };
  team2: { name: string; score: number };
  map: string;
  startTime?: number;
};

const tempData: stream[] = [
  {
    user_name: "Edeninho_",
    live: true,
    title: "Getting grouped? Maybe! Klon Super coach",
    viewer_count: 2,
  },
  {
    user_name: "fenomm",
    live: true,
    title: "YOOOO playing last ever IEM Kettering!",
    viewer_count: 22,
  },
  {
    user_name: "meffewcs",
    live: true,
    title: "Last Epic Group stage",
    viewer_count: 9,
  },
  {
    user_name: "EPICLAN1",
    live: true,
    title: "LIVE!! EpicLan Day 0 Into the Breach vs Binmen",
    viewer_count: 6,
  },
  {
    user_name: "EPICLAN2",
    live: true,
    title: "Last Epic Day 0",
    viewer_count: 1311,
  },
  {
    user_name: "Neul",
    live: true,
    title: "Game week 4",
    viewer_count: 6,
  },
  {
    user_name: "Haznoodle",
    live: true,
    title: "Pugs & Groups",
    viewer_count: 1,
  },
];

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
    team1: { name: "Apeks", score: 9 },
    team2: { name: "GL", score: 2 },
    map: "Inferno",
    startTime: Date.now(),
  },
  {
    team1: { name: "fnatic", score: 17 },
    team2: { name: "ENCE", score: 16 },
    map: "Mirage",
    startTime: Date.now(),
  },
  {
    team1: { name: "Heroic", score: 1 },
    team2: { name: "Liquid", score: 9 },
    map: "Mirage",
    startTime: Date.now(),
  },
  {
    team1: { name: "G2", score: 12 },
    team2: { name: "FURIA", score: 12 },
    map: "Mirage",
    startTime: Date.now(),
  },
];

// const EmpyData: stream[] = [];
const LiveGamesExample = () => {
  const [expanded, setExpanded] = useState(false);
  const [streams, setStreams] = useState<stream[]>();
  //Only displaying live channels
  useEffect(() => {
    const data = tempData.filter((el, idx) => {
      if (!expanded && idx > 5) {
        return;
      } else if (!el.live) {
        return;
      } else {
        return el;
      }
    });
    //sorting by viewer_count hi-low
    data.sort((a, b) => b.viewer_count - a.viewer_count);
    setStreams(data);
  }, [expanded]);

  console.log(streams);
  return (
    <section className="rounded-btn m-2 flex w-auto flex-col justify-between gap-2 lg:flex-row">
      <ul className=" items-left rounded-btn my-3 flex flex-col justify-center gap-1 bg-base-100 px-2 py-2 text-left lg:w-1/4">
        {streams?.length
          ? streams?.map((el) => {
              return (
                <StreamLink
                  key={el.user_name}
                  title={el.title}
                  user_name={el.user_name}
                  live={el.live}
                  viewer_count={el.viewer_count}
                />
              );
            })
          : "No live streams"}
      </ul>
      <ul className="items-left rounded-btn mt-3 flex h-full w-full flex-col justify-start gap-1 bg-base-100 p-2 text-left">
        {streams?.length
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
                      className={`rounded-btn  btn grid h-auto w-full min-w-0 cursor-pointer grid-cols-3 gap-1 border-0 bg-green-500/40 p-2 text-center  text-lg text-base-100 transition-all hover:bg-green-500 hover:text-base-300`}
                    >
                      <div className="flex flex-col items-start">
                        <span>{el.team1.name}</span>
                        <span className="text-xs">{el.map}</span>
                      </div>
                      <div>VS</div>{" "}
                      <div className="flex flex-col items-end">
                        <span>{el.team2.name}</span>
                        <span className="text-xs text-red-400">
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
      <div className="rounded-btn my-3 flex items-center justify-center bg-base-100 px-4">
        <iframe
          className="rounded-btn"
          src="https://player.twitch.tv/?channel=esl_csgo&parent=esportsfantasy.app"
          height="360"
          width="640"
        ></iframe>
      </div>
    </section>
  );
};

export default LiveGamesExample;
