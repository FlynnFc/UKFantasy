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
    streamTitle:
      "YOOOO playing last ever EPIC! YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!",
    viewers: 22,
  },
  {
    channelName: "meffewcs",
    live: true,
    streamTitle: "Last Epic Day 0",
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
    team1: { name: "RKB", score: 15 },
    team2: { name: "Faze", score: 0 },
    map: "Anubis",
  },
];

const EmpyData: stream[] = [];
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
      <ul className=" items-left my-2 mt-3 flex w-1/4 flex-col justify-center gap-1 border-r-2 border-primary px-2 text-left">
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

        <p
          className="link-secondary link text-center"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? "Show less" : "Show more"}
        </p>
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
                      className={`tooltip rounded-btn btn-lg btn flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 bg-green-500/30 p-2 text-center transition-all hover:bg-green-500 hover:text-base-300`}
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
