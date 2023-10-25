/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useEffect, useMemo, useState } from "react";
import { player, teamProps } from "../pages/[league]/myteam";
import { useRouter } from "next/router";

const InsightsTable = (props: any) => {
  const { query } = useRouter();
  const rounds = useMemo(() => {
    let round = 0;
    const players = props.serverTeam.SelectedPlayer;
    for (let index = 0; index < players.length; index++) {
      const curr = players[index];
      const filteredRounds = curr.Player.playerPoints.filter(
        (el: any) => el.league === query.league
      );
      if (filteredRounds.length > round) round = filteredRounds.length;
    }
    return round;
  }, [props.serverTeam.SelectedPlayer, query.league]);

  console.log(rounds);
  //   const [rounds, setRounds] = useState<number>(
  //     props.serverTeam.SelectedPlayer[0]?.points.length ?? 0
  //   );

  const [maxRounds, setMaxRounds] = useState<any>([]);
  const [maxBonusRounds, setMaxBonusRounds] = useState<any>([]);
  const [playerRowsGroups, setPlayerRowsGroups] = useState<any>([]);
  const [playerRowsPlayoffs, setPlayerRowsPlayoffs] = useState<any>([]);
  const [groupTotals, setGroupTotals] = useState<number[]>([]);
  const [playoffTotals, setPlayoffTotals] = useState<number[]>([]);

  const bonusFinder = (player: any, currentPoints: any) => {
    switch (player.bonusName) {
      case "ADR warrior":
        return currentPoints.ADR_warrior;
      case "PTFO":
        return currentPoints.PTFO;
      case "All rounder":
        return currentPoints.all_rounder;
      case "Awper":
        return currentPoints.awper;
      case "Clutcher":
        return currentPoints.clutcher;
      case "Entry king":
        return currentPoints.entry_king;
      case "Head Clicker":
        return currentPoints.head_clicker;
      case "knife":
        return currentPoints.knife;
      case "Site on lock":
        return currentPoints.site_on_lock;
      case "Stat padder":
        return currentPoints.stat_padder;
      case "Trade me":
        return currentPoints.trade_me;
      case "Util nerd":
        return currentPoints.util_nerd;
      default:
        return -1;
    }
  };

  useEffect(() => {
    const rows: JSX.Element[] = [];
    const groupStop = 5;
    //Group stage
    const playoffRows: JSX.Element[] = [];
    props.serverTeam.SelectedPlayer?.map((el: any) => {
      const playersPointsRow: JSX.Element[] = [];
      const playersBonusRow: JSX.Element[] = [];

      const filteredPoints = el.Player.playerPoints.filter(
        (point: { league: string }) => point.league === query.league
      );
      let total = 0;
      let bonusTotal = 0;
      for (let i = 0; i < groupStop; i++) {
        const pointsObj = filteredPoints[i];
        if (!pointsObj) {
          playersPointsRow.push(
            <td
              key={Math.random()}
              className="bg-base-300 text-center text-base-content"
            >
              {0}
            </td>
          );

          playersBonusRow.push(
            <td
              key={Math.random()}
              className="bg-base-300 text-center text-base-content"
            >
              {0}
            </td>
          );
        } else if (pointsObj.league === query.league) {
          const element = pointsObj.points;
          playersPointsRow.push(
            <td
              key={pointsObj.id}
              className="bg-base-300 text-center text-base-content"
            >
              {element}
            </td>
          );
          total += element;

          const bonusElement = bonusFinder(el, pointsObj);
          playersBonusRow.push(
            <td
              key={pointsObj.id + "cheese"}
              className="bg-base-300 text-center text-base-content"
            >
              {bonusElement}
            </td>
          );
          bonusTotal += bonusElement;
        }
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
    props.serverTeam.SelectedPlayer?.map((el: any) => {
      const playersPointsRow: JSX.Element[] = [];
      const playersBonusRow: JSX.Element[] = [];
      let total = 0;
      let bonusTotal = 0;
      const filteredPoints = el.Player.playerPoints.filter(
        (point: { league: string }) => point.league === query.league
      );
      for (let i = groupStop; i <= rounds; i++) {
        const pointsObj = filteredPoints[i];
        if (!pointsObj) {
          playersPointsRow.push(
            <td
              key={Math.random()}
              className="bg-base-300 text-center text-base-content"
            >
              {0}
            </td>
          );

          playersBonusRow.push(
            <td
              key={Math.random()}
              className="bg-base-300 text-center text-base-content"
            >
              {0}
            </td>
          );
        } else if (pointsObj.league === query.league) {
          const element = pointsObj.points ?? 0;
          playersPointsRow.push(
            <td
              key={pointsObj.id}
              className="bg-base-300 text-center text-base-content"
            >
              {element}
            </td>
          );
          total += element;

          const bonusElement = bonusFinder(el, pointsObj);
          playersBonusRow.push(
            <td
              key={pointsObj.id + "cheese"}
              className="bg-base-300 text-center text-base-content"
            >
              {bonusElement ?? 0}
            </td>
          );
          bonusTotal += bonusElement ?? 0;
        }
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
  }, [props.serverTeam.SelectedPlayer, query.league, rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 0; index <= rounds; index++) {
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

    for (let index = 0; index <= rounds; index++) {
      tempRounds.push(
        <th className="bg-primary text-center text-slate-50">{`Bonus R${
          index + 1
        }`}</th>
      );
    }

    return setMaxBonusRounds(tempRounds);
  }, [rounds]);

  const totals = useMemo(() => {
    let total = 0;
    let bonusTotal = 0;
    props.serverTeam.SelectedPlayer?.map((el: any) => {
      const points = el.Player.playerPoints;
      points.forEach((pointsObj: any) => {
        if (pointsObj.league === query.league) {
          const element = pointsObj.points;
          total += element ?? 0;
          const bonusElement = bonusFinder(el, pointsObj);
          bonusTotal += bonusElement ?? 0;
        }
      });
    });
    return { total: total, bonusTotal: bonusTotal };
  }, [props.serverTeam.SelectedPlayer, query.league]);
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
        {/* {rounds > 5 && (
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
        )} */}
      </section>
    </div>
  );
};

export default InsightsTable;
