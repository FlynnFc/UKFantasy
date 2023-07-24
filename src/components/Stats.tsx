import React from "react";

const Stats = (props: any) => {
  return (
    <ul className="grid grid-cols-1 gap-1">
      <li>HLTV: {props.stats.hltv}</li>
      <li>Faceit Elo: {props.stats.elo} </li>
      <li>KAST: 50%</li>
      <li>ADR: 10</li>
      <li>HS%: {props.stats.hs}%</li>
      <li>Entry Kill win%: {props.stats.entryRounds}%</li>
      <li>Clutch Rounds: {props.stats.clutchRounds}%</li>
      <li>Util thrown: {props.stats.clutchRounds}</li>
      <li>Util thrown: {props.stats.clutchRounds}</li>
    </ul>
  );
};

export default Stats;
