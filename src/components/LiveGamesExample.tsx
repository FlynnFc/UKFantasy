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
  startTime: number;
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
    channelName: "Eeninho",
    live: true,
    streamTitle: "YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Eeninho",
    live: true,
    streamTitle: "YOOOO playing last ever EPIC!",
    viewers: 6,
  },
];

const tempDataLiveGames: gameData[] = [
  {
    team1: { name: "Into the Breach", score: 11 },
    team2: { name: "Viperio", score: 4 },
    map: "Mirage",
    startTime: Date.now(),
  },
  {
    team1: { name: "Ross Kemp Bald", score: 15 },
    team2: { name: "Faze", score: 0 },
    map: "Anubis",
    startTime: Date.now(),
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
    <section className="rounded-btn m-2 flex w-auto flex-row justify-start gap-4 bg-base-100">
      <ul className=" items-left mt-3 flex w-1/4 flex-col justify-center gap-1 pl-2 text-left">
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
      <ul className="items-left mt-3 flex flex-col justify-start gap-1 pr-2 text-left">
        {streams?.length
          ? tempDataLiveGames?.map((el) => {
              return (
                <li key={el.team1.name}>
                  <a
                    href={`https://hltv.org/`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <div
                      className={`tooltip rounded-btn flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 bg-green-500/30  ${
                        el.startTime ? "border-error" : "border-base-content"
                      } p-2 text-center transition-all hover:bg-green-500 hover:text-base-300`}
                      data-tip="Go to channel"
                    >
                      <div className="inline-block w-full min-w-0 flex-col items-start text-left">
                        <h4 className="text-lg">
                          {el.team1.name} vs {el.team2.name}
                        </h4>
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
    </section>
  );
};

export default LiveGamesExample;
