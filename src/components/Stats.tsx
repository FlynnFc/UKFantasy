import { Stats } from "@prisma/client";
import React, { useEffect, useMemo, useState } from "react";

const Stats = (props: any) => {
  const [event, setEvent] = useState("");
  const [currentStats, setCurrentStats] = useState<Stats>(props.stats[0]);
  useEffect(() => {
    if (props.stats.length > 0) {
      props.stats.forEach((el: any) => {
        if (el.event === event) {
          setCurrentStats(el);
          return;
        }
      });
    }
  }, [event, props.stats]);

  const list = useMemo(() => {
    if (currentStats) {
      return (
        <ul className="p-2 text-lg">
          <li>{`ADR: ${currentStats.ADR}`}</li>
          <li>{`KAST: ${currentStats.KAST}`}</li>
          <li>{`HLTV: ${currentStats.hltv}`}</li>
          <li>{`Objectives: ${currentStats.Objectives.toPrecision(1)}`}</li>
          <li>{`Clutch win: ${currentStats.clutchRounds}%`}</li>
          <li>{`Trade death: ${(currentStats.deathsTraded * 100).toPrecision(
            3
          )}%`}</li>
          <li>{`Entrys/Round: ${currentStats.entryKills.toPrecision(1)}`}</li>
          <li>{`Util/Round: ${currentStats.utilThrown}`}</li>
        </ul>
      );
    } else return <div className="p-2 text-center">No stats found</div>;
  }, [currentStats]);
  return (
    <div>
      {props.stats.length > 0 &&
        props.stats.map((el: { event: string }) => (
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
