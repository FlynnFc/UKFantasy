import { Stats } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";

const Stats = (props: any) => {
  const [event, setEvent] = useState("");
  const [currentStats, setCurrentStats] = useState<Stats>(props.stats[0]);

  useEffect(() => {
    console.log(props.stats);
    if (event) {
      console.log(event);
    }
  }, [event, props.stats]);

  const list = useMemo(() => {
    if (currentStats) {
      return (
        <ul className="p-2">
          <li>{`ADR: ${currentStats.ADR}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
          <li>{`HLTV: ${currentStats.hltv}`}</li>
          <li>{`Objectives: ${currentStats.Objectives}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
        </ul>
      );
    } else return;
  }, [currentStats]);
  return (
    <div>
      {props.stats.map((el: { event: string }) => (
        <button
          key={el.event}
          onClick={() => setEvent(el.event)}
          className={`btn btn-sm rounded-none ${
            currentStats.event === el.event && "btn-active"
          }`}
        >
          {el.event}
        </button>
      ))}
      {list}
    </div>
  );
};

export default Stats;
