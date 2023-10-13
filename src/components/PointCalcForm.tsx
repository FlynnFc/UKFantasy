import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";

type bigPlayer = {
  bonusName?: string;
  name: any;
  steamid: any;
  points: number;
  entry_king: number;
  util_nerd: number;
  PTFO: number;
  ADR_warrior: number;
  site_on_lock: number;
  clutcher: number;
  trade_me: number;
  stat_padder: number;
  head_clicker: number;
  all_rounder: number;
  awper: number;
  knife: number;
};

const PointCalcForm = (props: {
  data: [];
  currentRound: number;
  league: string;
}) => {
  const [file, setFile] = useState<any>();
  const [data, setData] = useState();
  const [playerSheet, setPlayerSheet] = useState("");
  const [killsSheet, setKillsSheet] = useState("");
  const { query } = useRouter();
  const submit = (e: any) => {
    toast.promise(handleUpload(e), {
      loading: "processing...",
      success: <b>File processed</b>,
      error: errorCall,
    });
  };

  const errorCall = (e: { message: string }) => {
    return <b>Could not process, {e.message}</b>;
  };

  const fileProcesMain = async (e: HTMLFormElement) => {
    e.preventDefault();
    const f = file[0];
    const data = await f.arrayBuffer();
    const workbook = XLSX.read(data);
    const worksheet: any = workbook.Sheets[playerSheet];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });

    const worksheet2: any = workbook.Sheets[killsSheet];
    const jsonDatakills: any = XLSX.utils.sheet_to_json(worksheet2, {
      header: 1,
      defval: "",
    });

    const KillsRowMap = new Map();
    for (let i = 0; i < jsonDatakills[0].length; i++) {
      const element = jsonDatakills[i];
      KillsRowMap.set(element, i);
    }

    setData(jsonData);
    const Rowmap = new Map();
    //Index for all rows
    for (let index = 0; index < jsonData[0].length; index++) {
      const element = jsonData[0][index];
      Rowmap.set(element, index);
    }
    const playerPoints = [];

    //ALL BONUS CALCULATORS!
    const knife = (element: any) => {
      const weaponIndex = 22;
      const elementSteamIdIndex = 5;
      const steamid = element[1];
      let knifeKills = 0;
      for (let i = 1; i < jsonDatakills.length; i++) {
        const element = jsonDatakills[i];
        if (element[elementSteamIdIndex] === steamid) {
          if (element[weaponIndex] === "Knife") {
            knifeKills++;
          }
        }
      }
      const val = knifeKills;
      if (val >= 2) return 10;
      else if (val >= 1) return 5;
      else return -5;
    };
    const awper = (element: any) => {
      const weaponAWPIndex = 22;
      const elementSteamIdIndex = 5;
      const steamid = element[1];
      let awpKills = 0;
      for (let i = 1; i < jsonDatakills.length; i++) {
        const element = jsonDatakills[i];
        if (element[elementSteamIdIndex] === steamid) {
          if (element[weaponAWPIndex] === "AWP") {
            awpKills++;
          }
        }
      }
      const val = awpKills / element[Rowmap.get("Rounds")];
      if (val >= 0.2) return 10;
      else if (val >= 0.12) return 5;
      else return -5;
    };
    const entryKing = (element: any) => {
      const val =
        element[Rowmap.get("Entry kill win")] / element[Rowmap.get("Rounds")];

      if (val >= 0.12) return 10;
      else if (val >= 0.06) return 5;
      else return -5;
    };

    const utilNerd = (element: any) => {
      const val =
        (element[Rowmap.get("Flashbang thrown")] +
          element[Rowmap.get("Smoke thrown")] +
          element[Rowmap.get("HE thrown")] +
          element[Rowmap.get("Molotov thrown")] +
          element[Rowmap.get("Incendiary thrown")]) /
        element[Rowmap.get("Rounds")];
      if (val >= 2) return 10;
      else if (val >= 1.5) return 5;
      else return -5;
    };

    const ptfo = (element: any) => {
      const val =
        (element[Rowmap.get("Bomb planted")] +
          element[Rowmap.get("Bomb defused")]) /
        element[Rowmap.get("Rounds")];
      if (val >= 0.09) return 10;
      else if (val >= 0.05) return 5;
      else return -5;
    };

    const adrWarrior = (elment: any) => {
      const val = elment[Rowmap.get("ADR")];
      if (val > 85) return 10;
      else if (val > 70) return 5;
      else return -5;
    };

    const siteOnLock = (element: any) => {
      const val = element[Rowmap.get("Entry hold kill win %")];
      if (val >= 60) return 10;
      else if (val >= 40) return 5;
      else return -5;
    };

    const clutcher = (element: any) => {
      const val = element[Rowmap.get("Clutch won %")];
      if (val >= 10) return 10;
      else if (val >= 1) return 5;
      else return -5;
    };

    const tradeMe = (element: any) => {
      // V / F
      const val =
        element[Rowmap.get("Trade Death")] / element[Rowmap.get("Deaths")];

      if (val >= 0.2) return 10;
      else if (val >= 0.15) return 5;
      else return -5;
    };

    const statPadder = (element: any) => {
      const val = element[Rowmap.get("Rating 2")];
      if (val >= 1.35) return 10;
      else if (val >= 0.85) return 5;
      else return -5;
    };

    const headClicker = (element: any) => {
      const val = element[Rowmap.get("HS%")];
      if (val >= 65) return 10;
      else if (val >= 40) return 5;
      else return -5;
    };

    const allRounder = (element: any) => {
      const val = element[Rowmap.get("KAST")] / element[Rowmap.get("Match")];
      if (val >= 70) return 10;
      else if (val >= 60) return 5;
      else return -5;
    };

    for (let index = 1; index < jsonData.length; index++) {
      const element = jsonData[index];
      //General point calc
      const points = Math.round(
        (element[Rowmap.get("Rating 2")] - 1) *
          100 *
          element[Rowmap.get("Match")]
      );

      playerPoints.push({
        name: element[0],
        steamid: element[1],
        points: points,
        entry_king: entryKing(element),
        util_nerd: utilNerd(element),
        PTFO: ptfo(element),
        ADR_warrior: adrWarrior(element),
        site_on_lock: siteOnLock(element),
        clutcher: clutcher(element),
        trade_me: tradeMe(element),
        stat_padder: statPadder(element),
        head_clicker: headClicker(element),
        all_rounder: allRounder(element),
        awper: awper(element),
        knife: knife(element),
      });
    }
    return playerPoints;
  };

  const playerFilter = (playerstats: any[], allplayers: any[]) => {
    const output = [];
    //All players competing league
    const presentPlayers = new Set();
    for (let i = 0; i < allplayers.length; i++) {
      const element = allplayers[i];
      for (let j = 0; j < element.Player.length; j++) {
        const player = element.Player[j];
        presentPlayers.add(player.steamid);
      }
    }

    for (let i = 0; i < playerstats.length; i++) {
      const element = playerstats[i];
      if (presentPlayers.has(element.steamid)) {
        output.push(element);
      }
    }

    return output;
  };

  const handleUpload = async (e: HTMLFormElement) => {
    const processedPlayers = await fileProcesMain(e);
    const playersRes = await fetch("/api/teams", {
      method: "GET",
      headers: { leaguename: JSON.stringify(query.league) },
    });

    if (!playersRes.ok) {
      throw new Error("couldnt find any players");
    }

    const allPlayers = await playersRes.json();

    const finalData = playerFilter(processedPlayers, allPlayers);
    const bodyData = JSON.stringify({
      playerData: finalData,
      league: props.league,
      round: props.currentRound,
    });
    const res = await fetch("/api/points", {
      body: bodyData,
      method: "POST",
    });
    console.log(finalData);
    if (!res.ok) throw new Error("Failed to upload points");
    else return res;
  };

  return (
    <form
      className="rounded-btn flex w-full flex-col gap-3 bg-base-300 p-4 text-xl"
      onSubmit={submit}
    >
      <div>
        <label htmlFor="sheetName" className="label flex flex-col">
          What sheet features the players you want to calculate points for?
          <span className="text-sm">{`This should include columns such as "KAST", "ADR", "Rating 2.0" etc`}</span>
        </label>
        <input
          required
          onChange={(e) => setPlayerSheet(e.target.value)}
          type="text"
          name="sheetName"
          className="input w-full"
          placeholder="sheet name"
        />
      </div>
      <div>
        <label htmlFor="sheetName" className="label flex flex-col">
          What sheet features the kill events?
          <span className="text-sm">{`This should include columns that detail all kill events. It should have a column called "Weapon"`}</span>
        </label>
        <input
          required
          onChange={(e) => setKillsSheet(e.target.value)}
          type="text"
          name="sheetName"
          className="input w-full"
          placeholder="sheet name"
        />
      </div>
      <div>
        <label htmlFor="firstnumber" className="label">
          Calcuation options
        </label>
        <select className=" select w-full" name="calcOptions" id="calcOptions">
          <option value="default">default</option>
          {/* add table to sort through algo options and display here */}
          <option disabled value="create">
            create new
          </option>
        </select>
      </div>
      <div>
        <label className="label" htmlFor="file">
          File upload
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
      <button className="btn btn-primary w-full" type="submit">
        submit
      </button>
    </form>
  );
};

export default PointCalcForm;
