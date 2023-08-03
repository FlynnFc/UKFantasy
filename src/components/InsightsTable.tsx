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
    }
    return round;
  }, [props.serverTeam.SelectedPlayer]);

  //   const [rounds, setRounds] = useState<number>(
  //     props.serverTeam.SelectedPlayer[0]?.points.length ?? 0
  //   );

  const [maxRounds, setMaxRounds] = useState<any>([]);
  const [maxBonusRounds, setMaxBonusRounds] = useState<any>([]);
  const [playerRowsGroups, setPlayerRowsGroups] = useState<any>([]);
  const [playerRowsPlayoffs, setPlayerRowsPlayoffs] = useState<any>([]);
  const [groupTotals, setGroupTotals] = useState<number[]>([]);
  const [playoffTotals, setPlayoffTotals] = useState<number[]>([]);
  useEffect(() => {
    let stopRound = 5;

    if (rounds < stopRound) stopRound = rounds;
    const rows: JSX.Element[] = [];
    const playoffRows: JSX.Element[] = [];
    //Group stage
    props.serverTeam.SelectedPlayer?.map((el: player) => {
      let total = 0;

      for (let i = 0; i < stopRound; i++) {
        const element = el.points[i]?.value ? el.points[i]?.value : 0;
        total += element!;
      }
      let bonusTotal = 0;

      if (el.bonusPoint.length > 0) {
        for (let i = 0; i < 5; i++) {
          const element = el.bonusPoint[i]?.value ?? 0;
          bonusTotal += element;
        }
      }

      const playersPointsRow = [];

      for (let index = 0; index < stopRound; index++) {
        playersPointsRow.push(
          <td className="bg-base-300 text-center text-base-content">
            {el.points[index]?.value ? el.points[index]?.value : 0}
          </td>
        );
      }

      const playersBonusRow = [];

      for (let index = 0; index < stopRound; index++) {
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

    //Playoffs
    props.serverTeam.SelectedPlayer?.map((el: player) => {
      let total = 0;

      for (let i = 5; i < rounds; i++) {
        const element = el.points[i]?.value ? el.points[i]?.value : 0;
        total += element!;
      }
      let bonusTotal = 0;

      if (el.bonusPoint.length > 0) {
        for (let i = 5; i < rounds; i++) {
          const element = el.bonusPoint[i]?.value ? el.bonusPoint[i]?.value : 0;
          bonusTotal += element!;
        }
      }

      const playersPointsRow = [];

      for (let index = 5; index < rounds!; index++) {
        playersPointsRow.push(
          <td className="bg-base-300 text-center text-base-content">
            {el.points[index]?.value ? el.points[index]?.value : 0}
          </td>
        );
      }

      const playersBonusRow = [];

      for (let index = 5; index < rounds!; index++) {
        playersBonusRow.push(
          <td className="bg-base-300 text-center text-base-content">
            {el.bonusPoint[index]?.value ? el.bonusPoint[index]?.value : 0}
          </td>
        );
      }

      playoffRows.push(
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

    setPlayerRowsPlayoffs(playoffRows);
    return setPlayerRowsGroups(rows);
  }, [props.serverTeam.SelectedPlayer, rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 0; index < rounds; index++) {
      tempRounds.push(
        <th className="bg-primary text-center text-slate-50">{`R${
          index + 1
        }`}</th>
      );
    }

    return setMaxRounds(tempRounds);
  }, [rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 0; index < rounds; index++) {
      tempRounds.push(
        <th className="bg-primary text-center text-slate-50">{`Bonus R${
          index + 1
        }`}</th>
      );
    }

    return setMaxBonusRounds(tempRounds);
  }, [rounds]);

  console.log(groupTotals);

  const totals = useMemo(() => {
    let total = 0;
    let bonusTotal = 0;
    props.serverTeam.SelectedPlayer?.map((el: player) => {
      for (let i = 0; i < rounds; i++) {
        const element = el.points[i]?.value ? el.points[i]?.value : 0;
        total += element!;
      }

      if (el.bonusPoint.length > 0) {
        for (let i = 0; i < rounds; i++) {
          const element = el.bonusPoint[i]?.value ? el.bonusPoint[i]?.value : 0;
          bonusTotal += element!;
        }
      }
    });
    return { total: total, bonusTotal: bonusTotal };
  }, [props.serverTeam.SelectedPlayer, rounds]);

  return (
    <div className="hidden w-full flex-col items-center gap-2 md:flex ">
      <div className="rounded-btn grid w-fit grid-cols-2 bg-base-300 p-4 text-2xl">
        <h2>
          Points:{" "}
          <span
            className={`font-bold ${
              totals.total > 0 ? "text-green-500" : "text-red-500"
            } `}
          >
            {" "}
            {totals.total}
          </span>
        </h2>
        <h2>
          Bonus Total:{" "}
          <span
            className={`font-bold ${
              totals.bonusTotal > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {" "}
            {totals.bonusTotal}
          </span>
        </h2>
      </div>
      <section className="grid gap-4">
        {rounds > 0 && (
          <>
            {" "}
            <h2 className="text-2xl">Group Stage</h2>
            <table className="table w-fit overflow-scroll  rounded-xl">
              <thead className="sticky top-0">
                <tr>
                  <th className="bg-primary text-slate-50">Name</th>
                  {maxRounds.slice(0, 5)}
                  {maxBonusRounds.slice(0, 5)}

                  <th className="bg-primary text-slate-50">total points</th>
                  <th className="bg-primary text-slate-50">
                    Total Bonus points
                  </th>
                </tr>
              </thead>
              <tbody className="">{playerRowsGroups}</tbody>
            </table>
          </>
        )}
        {rounds > 5 && (
          <>
            <h2 className="text-2xl">Playoff Stage</h2>
            <table className="table w-fit overflow-scroll  rounded-xl">
              <thead className="sticky top-0">
                <tr>
                  <th className="bg-primary text-slate-50">Name</th>

                  {maxRounds.slice(5)}
                  {maxBonusRounds.slice(5)}

                  <th className="bg-primary text-slate-50">total points</th>
                  <th className="bg-primary text-slate-50">
                    Total Bonus points
                  </th>
                </tr>
              </thead>
              <tbody className="">{playerRowsPlayoffs}</tbody>
            </table>
          </>
        )}
      </section>
    </div>
  );
};

export default InsightsTable;
