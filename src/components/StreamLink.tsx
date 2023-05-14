import React from "react";
import { BsFillCircleFill } from "react-icons/bs";

const StreamLink = (props: {
  name: string;
  live: boolean;
  streamTitle: string;
}) => {
  return (
    <li
      className={`tooltip rounded-btn flex w-full min-w-0 cursor-pointer items-center justify-between gap-1  ${
        props.live ? "border-error" : "border-base-content"
      } p-2 text-center transition-all hover:bg-neutral/20`}
      data-tip="Go to channel"
    >
      <div className="inline-block w-full min-w-0 flex-col items-start text-left">
        <h4 className="text-lg">{props.name}</h4>
        <p className="block overflow-hidden truncate text-xs">
          {props.streamTitle}
        </p>
      </div>

      <span className="text-xs text-red-500">
        {props.live ? (
          <BsFillCircleFill />
        ) : (
          <h4 className="text-sm text-base-content"></h4>
        )}
      </span>
    </li>
  );
};

export default StreamLink;
