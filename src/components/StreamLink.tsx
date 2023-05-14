import React from "react";
import { BsFillCircleFill } from "react-icons/bs";
import { stream } from "./AllLiveChannels";

const StreamLink = (props: stream) => {
  return (
    <li>
      <a
        href={`https://twitch.tv/${props.channelName}`}
        target="_blank"
        rel="noreferrer"
      >
        <div
          className={`tooltip rounded-btn flex w-full min-w-0 cursor-pointer items-center justify-between gap-1  ${
            props.live ? "border-error" : "border-base-content"
          } p-2 text-center transition-all hover:bg-neutral/20`}
          data-tip="Go to channel"
        >
          <div className="inline-block w-full min-w-0 flex-col items-start text-left">
            <h4 className="text-lg">{props.channelName}</h4>
            <p className="block overflow-hidden truncate text-xs">
              {props.streamTitle}
            </p>
          </div>

          <span className="flex flex-row items-center gap-1 text-xs font-bold text-red-500">
            {props.live ? (
              <>
                <BsFillCircleFill />
                <span>{props.viewers}</span>
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
