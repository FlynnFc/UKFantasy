import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import Loading from "./Loading";
import TeamButtonTable from "./TeamButtonTable";
import { useRouter } from "next/router";
import LocalLoading from "./LocalLoading";

const Table = (props) => {
  const { query } = useRouter();
  //todo
  //Sort leaderboard by total points on load
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState([]);
  const [checker, setChecker] = useState(new Set([]));

  const bonusFinder = (player, currentPoints) => {
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
    const data = [...props.data];
    data.map((el) => {
      if (checker.has(el.id)) {
        return;
      } else {
        setChecker((prev) => new Set([...prev, el.id]));
        const points = 0;
        const bonusPoints = 0;
        el.SelectedPlayer.forEach((element) => {
          const allPoints = element.Player.playerPoints;
          allPoints.forEach((el) => {
            if (el.league === query.league) {
              points += el.points;
              console.log(el.league);
              bonusPoints += bonusFinder(element, el);
            }
          });
        });

        setPlayerData((prev) => {
          return [
            ...prev,
            {
              username: el.User.name,
              team: (
                <TeamButtonTable
                  name={el.teamName}
                  id={el.id}
                  league={query.league}
                />
              ),
              points: points,
              rolepoints: bonusPoints,
              totalpoints: points + bonusPoints,
            },
          ];
        });
      }
    });

    setLoading(false);
  }, [checker, props.data, query.league]);

  const sortedTeams = useMemo(() => {
    return playerData.sort((a, b) => b.totalpoints - a.totalpoints);
  }, [playerData]);

  const submissiondata = useMemo(() => [...playerData], [playerData]);

  const columns = useMemo(
    () => [
      {
        Header: "name",
        accessor: "username",
      },
      {
        Header: "Team name",
        accessor: "team",
      },
      {
        Header: "points",
        accessor: "points",
      },
      {
        Header: "bonus points",
        accessor: "rolepoints",
      },

      {
        Header: "Total points",
        accessor: "totalpoints",
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns, data: submissiondata }, useSortBy);

  return (
    <div className="max-h-[35rem] w-full">
      {!loading ? (
        playerData.length > 0 ? (
          <table
            {...getTableProps()}
            className="table w-full select-none overflow-scroll font-semibold"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="transition-all"
                  key={headerGroup}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column, idx) => (
                    <th
                      key={column.Cell}
                      className={`sticky top-0 box-content bg-primary text-center text-primary-content ${
                        idx === 0 &&
                        "rounded-btn rounded-r-none rounded-bl-none"
                      } ${
                        idx === headerGroup.headers.length - 1 &&
                        "rounded-btn rounded-l-none rounded-br-none"
                      }`}
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      <span className="absolute">
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="overflow-x-auto">
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    className="z-10 transition-all"
                    key={row.id}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => {
                      return (
                        <td
                          className="max-w-sm  overflow-hidden text-ellipsis whitespace-nowrap bg-base-200  text-center  font-normal"
                          key={"test"}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex min-w-full flex-row rounded-lg bg-base-200 p-4 ">
            <h3 className="w-full text-center text-base-content text-inherit">
              No teams submitted yet
            </h3>
          </div>
        )
      ) : (
        <LocalLoading />
      )}
    </div>
  );
};

export default Table;
