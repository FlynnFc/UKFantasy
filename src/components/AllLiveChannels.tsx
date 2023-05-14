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
    channelName: "Edeninho",
    live: false,
    streamTitle: "YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Xetherato",
    live: true,
    streamTitle:
      "YOOOO playing last ever EPIC! YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Meffew",
    live: false,
    streamTitle: "YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Pepic1",
    live: true,
    streamTitle: "YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Edeinho",
    live: true,
    streamTitle: "YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Petherato",
    live: true,
    streamTitle:
      "YOOOO playing last ever EPIC! YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!YOOOO playing last ever EPIC!",
    viewers: 6,
  },
  {
    channelName: "Moffew",
    live: false,
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
  const [noOffline, setNoOffline] = useState(true);
  const [streams, setStreams] = useState<stream[]>();
  useEffect(() => {
    const data = tempData.filter((el, idx) => {
      if (!expanded && idx > 5) {
        return;
      } else if (noOffline && !el.live) {
        return;
      } else {
        return el;
      }
    });
    setStreams(data);
  }, [expanded, noOffline]);

  console.log(streams);
  return (
    <ul className="items-left mt-3 flex w-full flex-col justify-center gap-1 text-left">
      {streams?.length
        ? streams?.map((el) => {
            return (
              <StreamLink
                key={el.channelName}
                streamTitle={el.streamTitle}
                name={el.channelName}
                live={el.live}
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
