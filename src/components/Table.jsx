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
        const totalPoints = 0;
        console.log(el.SelectedPlayer);
        el.SelectedPlayer.forEach((element) => {
          element.points.forEach((el) => (totalPoints += el.value));
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
              points: totalPoints,
              rolepoints: el.rolePoints,
              totalpoints: parseInt(el.points) + parseInt(el.rolePoints),
            },
          ];
        });
      }
    });
    setLoading(false);
  }, [checker, props.data, query.league]);

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
        Header: "bonus points",
        accessor: "rolepoints",
      },
      {
        Header: "points",
        accessor: "points",
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
        submissiondata.length > 1 ? (
          <table
            {...getTableProps()}
            className="table w-full select-none overflow-auto font-semibold shadow-lg"
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
                      className="rounded-t-btn sticky -top-1 box-content text-center "
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
                          className="text-center font-normal"
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
            <h3 className="w-full text-center text-inherit text-primary-content">
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
