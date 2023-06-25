import React, { useState } from "react";
import toast from "react-hot-toast";
import { json } from "stream/consumers";
import * as XLSX from "xlsx";

type bigPlayer = {
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
};

const PointCalcForm = (props: { data: [] }) => {
  const [file, setFile] = useState<any>();
  const [data, setData] = useState();

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
    const worksheet: any = workbook.Sheets["Copy of Round 1"];
    const jsonData: any = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    setData(jsonData);
    const Rowmap = new Map();
    //Index for all rows
    for (let index = 0; index < jsonData[0].length; index++) {
      const element = jsonData[0][index];
      Rowmap.set(element, index);
    }
    const playerPoints = [];

    //ALL BONUS CALCULATORS!
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
      });
    }
    return playerPoints;
  };

  const comparer = (points: string | any[], userPlayers: bigPlayer[]) => {
    const elements = [];
    for (let index = 0; index < userPlayers.length; index++) {
      let element: bigPlayer | undefined = userPlayers[index];
      for (let index = 0; index < points.length; index++) {
        const element2: bigPlayer = points[index];
        if (element?.name === element2.name.toLowerCase() && element) {
          element = {
            ...element,
            steamid: element2.steamid,
            points: element2.points,
            entry_king: element2.entry_king,
            ADR_warrior: element2.ADR_warrior,
            util_nerd: element2.util_nerd,
            PTFO: element2.PTFO,
            site_on_lock: element2.site_on_lock,
            clutcher: element2.clutcher,
            trade_me: element2.trade_me,
            stat_padder: element2.stat_padder,
            head_clicker: element2.head_clicker,
            all_rounder: element2.all_rounder,
          };
          elements.push(element);
        }
      }
    }
    return elements;
  };

  const handleUpload = async (e: HTMLFormElement) => {
    const currentlySelectedTeams = props.data;
    const processedPlayers = await fileProcesMain(e);
    const allSelectedPlayers: any[] = [];
    currentlySelectedTeams.forEach((el: any) => {
      el.SelectedPlayer.forEach((el: { name: string; id: string }) =>
        allSelectedPlayers.push({ name: el.name.toLowerCase(), id: el.id })
      );
    });
    console.log(processedPlayers);
    const finalData = comparer(processedPlayers, allSelectedPlayers);
    console.log(finalData);
    // const res = await fetch("/api/ApplyPoints", {
    //   method: "POST",
    //   body: JSON.stringify(finalData),
    // });
    // return res;
  };

  //Point form. Take 62nd col and -1 then * 100 then take 73 cols

  return (
    <form
      className="rounded-btn flex max-w-2xl flex-col gap-3 bg-base-300 p-4 text-xl"
      onSubmit={submit}
    >
      <div>
        <label htmlFor="sheetName" className="label">
          What sheet features the players you want to calculate points for?
        </label>
        <input
          type="text"
          name="sheetName"
          className="input w-full"
          placeholder="sheet name"
        />
      </div>{" "}
      <div>
        <label htmlFor="firstnumber" className="label">
          Calcuation options
        </label>
        <select className=" select w-full" name="calcOptions" id="calcOptions">
          <option value="default">default</option>
          {/* add table to sort through algo options and display here */}
          <option value="create">create new</option>
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
      <button className="btn-primary btn w-full" type="submit">
        submit
      </button>
    </form>
  );
};

export default PointCalcForm;
