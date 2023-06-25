/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from "react";
import { player, teamProps } from "../pages/[league]/myteam";

const InsightsTable = (props: any) => {
  const rounds = useMemo(() => {
    for (let index = 0; index < 5; index++) {
      if (props.serverTeam.SelectedPlayer[index]?.points.length) {
        return props.serverTeam.SelectedPlayer[index]?.points.length;
      } else continue;
    }
    return 0;
  }, [props.serverTeam.SelectedPlayer]);

  //   const [rounds, setRounds] = useState<number>(
  //     props.serverTeam.SelectedPlayer[0]?.points.length ?? 0
  //   );
  const [maxRounds, setMaxRounds] = useState<any>([]);
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
          <td>{el.points[index]?.value ? el.points[index]?.value : 0}</td>
        );
      }
      rows.push(
        <tr key={el.id}>
          <td>{el.name}</td>
          {playersPointsRow}
          <td>{total}</td>
          <td>{bonusTotal}</td>
        </tr>
      );
    });
    return setPlayerRows(rows);
  }, [props.serverTeam.SelectedPlayer, rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 0; index < rounds!; index++) {
      tempRounds.push(<th>{`Round ${index + 1}`}</th>);
    }

    return setMaxRounds(tempRounds);
  }, [rounds]);

  return (
    <table className="table w-fit overflow-scroll  rounded-xl">
      <thead className="sticky top-0">
        <tr>
          <th>Name</th>
          {maxRounds}
          <th>total points</th>
          <th>Total Bonus points</th>
        </tr>
      </thead>
      <tbody className="text-center">{playerRows}</tbody>
    </table>
  );
};

export default InsightsTable;
