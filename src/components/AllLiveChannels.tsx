import React, { useEffect, useMemo, useState } from "react";
import StreamLink from "./StreamLink";
import { P } from "vitest/dist/types-bae746aa";

export type stream = {
  user_name: string;
  live: boolean;
  title: string;
  viewer_count: number;
};

const AllLiveChannels = (props: { streams: stream[] }) => {
  const [expanded, setExpanded] = useState(false);
  const streams = useMemo(() => props.streams, [props.streams]);

  return (
    <div className="rounded-btn bg-base-300 p-5 shadow-lg">
      <h2 className="text-center text-xl font-bold leading-none">
        Verified streams
      </h2>
      <ul className="items-left mt-3 flex w-full flex-col justify-center gap-1 p-1 text-left">
        {streams.length ? (
          streams.map((el) => {
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
          <p className="select-none text-center">No streams online</p>
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
