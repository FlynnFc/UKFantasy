import React, { FormEvent, useState } from "react";
import * as XLSX from "xlsx";

const AddTeamsAdmin = () => {
  const [file, setFile] = useState<any>();
  const [data, setData] = useState();
  const [sheet, setSheet] = useState("");

  const fileProcess = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = file[0];
    const data = await f.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet: any = workbook.Sheets["Team Profiles"];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    const teams = [];
    const jump = 9;
    for (let index = 2; index < jsonData.length; ) {
      const element = jsonData[index];
      const teamName: string = element[1];
      if (teamName.length) {
        const players = [];
        for (let j = index + 1; j <= index + 5; j++) {
          const player = jsonData[j];
          const price = player[4] ? parseInt(player[4]) : 1000;
          const name = player[1];
          const steamid = player[2].toString();
          const rareity =
            price > 19999 ? "gold" : price >= 1500 ? "silver" : "bronze";
          players.push({
            name: name,
            price: price,
            rareity: rareity,
            steamid: steamid,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwiaWF0IjoxNjg5Nzk5MDQxLCJleHAiOjE3MjEzMzUwNDF9.zGDt3amKB3L7hwOoakyIySWv51yDnSOw7m5jvDh4hUE&t=2023-07-19T20%3A37%3A30.001Z",
          });
        }
        console.log(players);
        const team = {
          teamName: teamName,
          players: players,
        };
        teams.push(team);
      } else {
        console.log("Skipped");
      }
      index += jump;
    }

    const targetIndex = teams.findIndex(
      (team) => team.teamName === "TYREECESIMPSON"
    );

    console.log(teams);
    if (targetIndex > -1) {
      const [targetTeam] = teams.splice(targetIndex, 1);
      teams.unshift(targetTeam);
    }
    console.log(JSON.stringify(teams));
    console.log("CALLING");
    const res = await fetch("/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teams),
    });
    if (res.ok) {
      console.log(await res.json);
      return res;
    } else {
      console.log("FAiled to add teams");
      throw new Error("couldnt submit");
    }
  };
  return (
    <form onSubmit={fileProcess} className="rounded-btn bg-base-300 p-4">
      <h3 className="text-2xl">Teams & Players competing yer</h3>
      <section className="mb-2 grid gap-4">
        <div className="grid">
          <label className="label" htmlFor="">
            Excel file with players and their teams
          </label>
          <input
            required
            onChange={(e) => setFile(e.target.files)}
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            className="file-input w-full"
            type="file"
            name="roundFile"
            id="roundFile"
          />
        </div>
        <div className="flex flex-col">
          <label className="label" htmlFor="">
            Name of targeted sheet
          </label>
          <input type="text" name="" className="input" id="" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Name of player column
            </label>
            <input type="text" name="" className="input" id="" />
          </div>{" "}
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Name of team column
            </label>
            <input type="text" name="" className="input" id="" />
          </div>
        </div>
      </section>
      <button className="btn w-full">Submit</button>
    </form>
  );
};

export default AddTeamsAdmin;
