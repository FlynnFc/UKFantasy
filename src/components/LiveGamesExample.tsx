import React, { useEffect, useState } from "react";
import StreamLink from "./StreamLink";

export type stream = {
  channelName: string;
  live: boolean;
  streamTitle: string;
  viewers: number;
};

export type gameData = {
  team1: { name: string; score: number };
  team2: { name: string; score: number };
  map: string;
  startTime?: number;
};

const tempData: stream[] = [
  {
    channelName: "Edeninho_",
    live: true,
    streamTitle: "Getting grouped? Maybe! Klon Super coach",
    viewers: 2,
  },
  {
    channelName: "fenomm",
    live: true,
    streamTitle: "YOOOO playing last ever IEM Kettering!",
    viewers: 22,
  },
  {
    channelName: "meffewcs",
    live: true,
    streamTitle: "Last Epic Group stage",
    viewers: 9,
  },
  {
    channelName: "EPICLAN1",
    live: true,
    streamTitle: "LIVE!! EpicLan Day 0 Into the Breach vs Binmen",
    viewers: 6,
  },
  {
    channelName: "EPICLAN2",
    live: true,
    streamTitle: "Last Epic Day 0",
    viewers: 1311,
  },
  {
    channelName: "Neul",
    live: true,
    streamTitle: "Game week 4",
    viewers: 6,
  },
  {
    channelName: "Haznoodle",
    live: true,
    streamTitle: "Pugs & Groups",
    viewers: 1,
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
    team1: { name: "Heroic", score: 1 },
    team2: { name: "Liquid", score: 0 },
    map: "Overpass",
    startTime: Date.now(),
  },
  {
    team1: { name: "fnatic", score: 17 },
    team2: { name: "ENCE", score: 16 },
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
    //sorting by Viewers hi-low
    data.sort((a, b) => b.viewers - a.viewers);
    setStreams(data);
  }, [expanded]);

  console.log(streams);
  return (
    <section className="rounded-btn m-2 flex w-auto flex-row justify-between gap-2 bg-base-100">
      <ul className=" items-left my-3 flex w-1/4 flex-col justify-center gap-1 border-r-2 border-primary px-2 text-left">
        {streams?.length
          ? streams?.map((el) => {
              return (
                <StreamLink
                  key={el.channelName}
                  streamTitle={el.streamTitle}
                  channelName={el.channelName}
                  live={el.live}
                  viewers={el.viewers}
                />
              );
            })
          : "No live streams"}
      </ul>
      <ul className="items-left mt-3 flex w-full flex-col justify-start gap-1 pr-2 text-left">
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
                      className={`rounded-btn btn-lg btn grid w-full min-w-0 cursor-pointer grid-cols-3 gap-1 border-0 bg-green-500/40 p-2  text-center text-base-100 transition-all hover:bg-green-500 hover:text-base-300`}
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
      <div className="mr-2 flex items-center justify-center">
        <iframe
          src="https://player.twitch.tv/?channel=blastpremier&parent=esportsfantasy.app"
          height="360"
          width="640"
        ></iframe>
      </div>
    </section>
  );
};

export default LiveGamesExample;
