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
      filteredRounds.forEach((el: { round: number }) => {
        if (el.round > round) round = el.round;
      });
    }
    return round;
  }, [props.serverTeam.SelectedPlayer, query.league]);

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
        return 0;
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
      const mappedPoints: any = new Map(
        filteredPoints.map((el: any) => [el.round, el])
      );
      console.log(el.name, mappedPoints);
      let total = 0;
      let bonusTotal = 0;
      for (let i = 1; i <= groupStop; i++) {
        const pointsObj = mappedPoints.get(i);
        if (!pointsObj) {
          playersPointsRow.push(
            <td
              key={Math.random()}
              className="bg-base-300 text-center text-base-content"
            ></td>
          );

          playersBonusRow.push(
            <td
              key={Math.random()}
              className="bg-base-300 text-center text-base-content"
            ></td>
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
      console.log(el);
      const playersPointsRow: JSX.Element[] = [];
      const playersBonusRow: JSX.Element[] = [];
      let total = 0;
      let bonusTotal = 0;
      const filteredPoints = el.Player.playerPoints.filter(
        (point: { league: string }) => point.league === query.league
      );

      const mappedPoints = new Map(
        filteredPoints.map((el: any) => [el.round, el])
      );

      for (let i = groupStop + 1; i <= rounds; i++) {
        const pointsObj: any = mappedPoints.get(i);

        if (!pointsObj) {
          playersPointsRow[i] = (
            <td className="bg-base-300 text-center text-base-content"></td>
          );
          playersBonusRow[i] = (
            <td className="bg-base-300 text-center text-base-content"></td>
          );
        } else {
          const element = pointsObj.points ?? "n/a";
          playersPointsRow[i] = (
            <td
              key={pointsObj.id}
              className="bg-base-300 text-center text-base-content"
            >
              {element}
            </td>
          );
          total += element;

          const bonusElement = bonusFinder(el, pointsObj);
          playersBonusRow[i] = (
            <td
              key={pointsObj.id + "cheese"}
              className="bg-base-300 text-center text-base-content"
            >
              {bonusElement}
            </td>
          );

          bonusTotal += bonusElement ?? 0;
        }
      }

      for (let i = groupStop; i <= rounds && i < filteredPoints.length; i++) {}
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
    setPlayerRowsGroups(rows);
    return;
  }, [props.serverTeam.SelectedPlayer, query.league, rounds]);

  useEffect(() => {
    const tempRounds = [];
    for (let index = 1; index <= rounds; index++) {
      tempRounds.push(
        <th className="bg-primary text-center text-slate-50">{`R${index}`}</th>
      );
    }

    return setMaxRounds(tempRounds);
  }, [rounds]);

  useEffect(() => {
    const tempRounds = [];

    for (let index = 1; index <= rounds; index++) {
      tempRounds.push(
        <th className="bg-primary text-center text-slate-50">{`BR${index}`}</th>
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
      {/* <section className="grid gap-4">
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
      </section> */}
    </div>
  );
};

export default InsightsTable;
