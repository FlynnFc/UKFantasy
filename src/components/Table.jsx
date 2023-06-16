import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useTable, useSortBy } from "react-table";
import Loading from "./Loading";
import TeamButtonTable from "./TeamButtonTable";
import { useRouter } from "next/router";

const Table = (props) => {
  const { query } = useRouter();

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
                  className="sticky -top-1 box-content text-center "
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
    </>
  );
};

export default Table;
