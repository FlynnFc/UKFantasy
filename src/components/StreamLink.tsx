import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { stream } from "./AllLiveChannels";

const StreamLink = (props: stream) => {
  console.log(props.user_name);
  return (
    <li>
      <a
        href={`https://twitch.tv/${props.user_name}`}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={`tooltip rounded-btn flex w-full min-w-0 cursor-pointer items-center justify-between gap-1 p-2 text-center transition-all hover:bg-base-200`}
          data-tip="Go to channel"
        >
          <div className="inline-block w-full min-w-0 flex-col items-start text-left">
            <h4 className="text-lg">{props.user_name}</h4>
            <p className="block overflow-hidden truncate text-xs">
              {props.title}
            </p>
          </div>

          <span className="flex flex-row items-center gap-1 text-xs font-bold text-red-500">
            {props.live ? (
              <>
                <BsFillCircleFill />
                <span>{props.viewer_count}</span>
              </>
            ) : (
              <h4 className="text-sm text-base-content"></h4>
            )}
          </span>
        </div>
      </a>
    </li>
  );
};

export default StreamLink;
