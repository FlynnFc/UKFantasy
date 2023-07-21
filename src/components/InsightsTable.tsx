/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from "react";
import { player, teamProps } from "../pages/[league]/myteam";

const InsightsTable = (props: any) => {
  const rounds = useMemo(() => {
    let round = 0;
    const players = props.serverTeam.SelectedPlayer;
    for (let index = 0; index < players.length; index++) {
      if (players[index]?.points.length > round) {
        round = players[index]?.points.length;
      }
      console.log(round, players[index].points.length);
    }
    return round;
  }, [props.serverTeam.SelectedPlayer]);

  //   const [rounds, setRounds] = useState<number>(
  //     props.serverTeam.SelectedPlayer[0]?.points.length ?? 0
  //   );

  console.log("Rounds", rounds);
  console.log(props);
  const [maxRounds, setMaxRounds] = useState<any>([]);
  const [maxBonusRounds, setMaxBonusRounds] = useState<any>([]);
  const [playerRows, setPlayerRows] = useState<any>([]);
  useEffect(() => {
    const rows: JSX.Element[] = [];
    props.serverTeam.SelectedPlayer?.map((el: player) => {
      let total = 0;
      el.points.map((el) => (total += el.value));
      let bonusTotal = 0;

      if (el.bonusPoint.length > 0) {
        el.bonusPoint.map((el: { value: number }) => (bonusTotal += el.value));
      }

      const playersPointsRow = [];

      for (let index = 0; index < rounds!; index++) {
        playersPointsRow.push(
          <td className="bg-base-300 text-center text-base-content">
            {el.points[index]?.value ? el.points[index]?.value : 0}
          </td>
        );
      }

      const playersBonusRow = [];

      for (let index = 0; index < rounds!; index++) {
        playersBonusRow.push(
          <td className="bg-base-300 text-center text-base-content">
            {el.bonusPoint[index]?.value ? el.bonusPoint[index]?.value : 0}
          </td>
        );
      }

      rows.push(
        <tr key={el.id}>
          <td className="bg-base-300 text-base-content">{el.name}</td>
          {playersPointsRow}
          {playersBonusRow}
          <td className="bg-base-300 text-center text-base-content">{total}</td>
          <td className="bg-base-300 text-center text-base-content">
            {bonusTotal}
          </td>
        </tr>
      );
    });
    return setPlayerRows(rows);
  }, [props.serverTeam.SelectedPlayer, rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 0; index < rounds!; index++) {
      tempRounds.push(
        <th className="bg-primary text-slate-50">{`Round ${index + 1}`}</th>
      );
    }

    return setMaxRounds(tempRounds);
  }, [rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 0; index < rounds; index++) {
      tempRounds.push(
        <th className="bg-primary text-slate-50">{`Bonus Round ${
          index + 1
        }`}</th>
      );
    }

    return setMaxBonusRounds(tempRounds);
  }, [rounds]);

  return (
    <div className="hidden w-full md:block">
      <table className="table w-fit overflow-scroll  rounded-xl">
        <thead className="sticky top-0">
          <tr>
            <th className="bg-primary text-slate-50">Name</th>
            {maxRounds}

            {maxBonusRounds}
            <th className="bg-primary text-slate-50">total points</th>
            <th className="bg-primary text-slate-50">Total Bonus points</th>
          </tr>
        </thead>
        <tbody className="">{playerRows}</tbody>
      </table>
    </div>
  );
};

export default InsightsTable;
