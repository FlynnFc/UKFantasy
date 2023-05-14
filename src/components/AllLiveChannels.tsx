import React, { useEffect, useState } from "react";
import StreamLink from "./StreamLink";

export type stream = {
  channelName: string;
  live: boolean;
  streamTitle: string;
  viewers: number;
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

const EmpyData: stream[] = [];
const AllLiveChannels = () => {
  const [expanded, setExpanded] = useState(false);
  const [streams, setStreams] = useState<stream[]>();
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
    setStreams(data);
  }, [expanded]);

  console.log(streams);
  return (
    <ul className="items-left mt-3 flex w-full flex-col justify-center gap-1 text-left">
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
  );
};

export default AllLiveChannels;
