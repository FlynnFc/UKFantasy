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
          element.points.forEach((el) => (points += el.value));
          element.bonusPoint.forEach((el) => (bonusPoints += el.value));
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
    <>
      {!loading ? (
        playerData.length > 0 ? (
          <table
            {...getTableProps()}
            className="table select-none overflow-auto font-semibold"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  className="transition-all"
                  key={headerGroup}
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      key={column.Cell}
                      className="rounded-t-btn sticky -top-1 box-content bg-primary text-center text-primary-content "
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
                          className="bg-base-200  text-center  font-normal"
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
          <div className="flex min-w-full flex-row rounded-lg bg-base-100 p-4 ">
            <h3 className="w-full text-center text-base-content text-inherit">
              No teams submitted yet
            </h3>
          </div>
        )
      ) : (
        <LocalLoading />
      )}
    </>
  );
};

export default Table;
