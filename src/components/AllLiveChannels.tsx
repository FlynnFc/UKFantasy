import React, { useEffect, useState } from "react";
import StreamLink from "./StreamLink";

import LocalLoading from "./LocalLoading";

export type stream = {
  user_name: string;
  live: boolean;
  title: string;
  viewer_count: number;
};

const AllLiveChannels = () => {
  const [expanded, setExpanded] = useState(false);
  const [streams, setStreams] = useState<stream[]>();
  const [streamLoading, setStreamLoading] = useState(true);

  useEffect(() => {
    const getStreams = async () => {
      const res = await fetch("/api/allTwitchStreams");
      if (!res.ok) return;
      const data = await res.json();
      setStreamLoading(false);
      setStreams(data.data);
    };
    getStreams();
  }, []);

  return (
    <div className="rounded-btn bg-base-300 p-5 shadow-lg">
      <h2 className="text-center text-xl font-bold leading-none">
        Verified streams
      </h2>
      <ul className="items-left mt-3 flex w-full flex-col justify-center gap-1 p-1 text-left">
        {!streamLoading ? (
          streams?.length ? (
            streams?.map((el) => {
              return (
                <StreamLink
                  key={el.user_name}
                  title={el.title}
                  user_name={el.user_name}
                  live={el.viewer_count > 0}
                  viewer_count={el.viewer_count}
                />
              );
            })
          ) : (
            "No live streams"
          )
        ) : (
          <LocalLoading />
        )}

        <p
          className="link-secondary link mt-2 text-center"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {streams && streams?.length > 5
            ? expanded
              ? "Show less"
              : "Show more"
            : null}
        </p>
      </ul>
    </div>
  );
};

export default AllLiveChannels;
