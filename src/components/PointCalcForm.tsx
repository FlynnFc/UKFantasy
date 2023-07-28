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

const PointCalcForm = (props: { data: []; currentRound: number }) => {
  const [file, setFile] = useState<any>();
  const [data, setData] = useState();
  const [playerSheet, setPlayerSheet] = useState("");
  const [killsSheet, setKillsSheet] = useState("");
  const submit = (e: any) => {
    toast.promise(handleUpload(e), {
      loading: "processing...",
      success: <b>File processed</b>,
      error: <b>Could not process</b>,
    });
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

    console.log(jsonDatakills);
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
            console.log("Found a knife kill");
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
            console.log("Found an awp kill");
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

  const bonusFinder = (element: bigPlayer, bonusName: string) => {
    let bonus = 0;
    switch (bonusName) {
      case "ADR warrior":
        bonus = element.ADR_warrior;
        break;
      case "Awper":
        bonus = element.awper;
        break;
      case "The K0nfig":
        bonus = element.knife;
        break;
      case "All rounder":
        bonus = element.all_rounder;
        break;
      case "Clutcher":
        bonus = element.clutcher;
        break;
      case "Head Clicker":
        bonus = element.head_clicker;
        break;
      case "PTFO":
        bonus = element.PTFO;
        break;
      case "Site on lock":
        bonus = element.site_on_lock;
        break;
      case "Stat padder":
        bonus = element.stat_padder;
        break;
      case "Trade me":
        bonus = element.trade_me;
        break;
      case "Entry king":
        bonus = element.entry_king;
        break;
      case "Util nerd":
        bonus = element.util_nerd;
        break;
      default:
        bonus = 0;
        break;
    }
    return bonus;
  };

  const comparer = (points: bigPlayer[], userPlayers: any[]) => {
    const elements = [];
    for (let index = 0; index < userPlayers.length; index++) {
      let element = userPlayers[index];
      for (let index = 0; index < points.length; index++) {
        const element2: bigPlayer | undefined = points[index];
        if (element?.steamid === element2?.steamid && element && element2) {
          const bonus = bonusFinder(element2, element.bonusName);
          element = {
            ...element,
            steamid: element2.steamid,
            points: element2.points,
            bonusPoint: bonus,
          };
          elements.push(element);
        }
      }
    }
    console.log(elements);
    return elements;
  };

  const handleUpload = async (e: HTMLFormElement) => {
    const currentlySelectedTeams = props.data;
    const processedPlayers = await fileProcesMain(e);
    const allSelectedPlayers: any[] = [];
    currentlySelectedTeams.forEach((el: any) => {
      //Checking if users team has bonuses applied to all players
      el.SelectedPlayer.forEach(
        (el: {
          name: string;
          id: string;
          bonusName: string;
          steamid: string;
        }) =>
          allSelectedPlayers.push({
            name: el.name.toLowerCase(),
            id: el.id,
            bonusName: el.bonusName,
            steamid: el.steamid,
          })
      );
    });

    const finalData = comparer(processedPlayers, allSelectedPlayers);
    const res = await fetch("/api/ApplyPoints", {
      method: "POST",
      body: JSON.stringify({
        playerData: finalData,
        round: props.currentRound,
      }),
    });
    console.log("final data", finalData);
    if (!res.ok) {
      throw new Error();
    }
    return res;
  };

  //Point form. Take 62nd col and -1 then * 100 then take 73 cols

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
