import React, { useState } from "react";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
type LeagueData = {
  Teams: {
    teamName: string;
    id: string;
    Player: { id: string; name: string; steamid: string }[];
  }[];
};

const PlayerEditAdmin = () => {
  const [selectedLeague, setSelectedLeague] = useState("epic39");
  const [leagueData, setLeagueData] = useState<LeagueData>();

  const leagueDataHandler = async (league: string) => {
    const res = await fetch(`/api/allTeams`, {
      method: "GET",
      headers: { leaguename: league },
    });
    if (!res.ok) {
      console.error("error", res);
      return;
    }
    const data = await res.json();
    setLeagueData(data);
  };

  console.log(leagueData);
  const [playerName, setPlayerName] = useState("");
  const [playerPrice, setPlayerPrice] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState("");
  const [playerData, setPlayerData] = useState();
  const [playerAdjustPrice, setPlayerAdjustPrice] = useState(0);
  const [file, setFile] = useState();
  const playerDataHandler = async (player: string) => {
    const res = await fetch(`/api/playerById`, {
      method: "GET",
      headers: { id: player },
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
    const data = await res.json();
    setPlayerData(data);
    setPlayerName(data.name);
    setPlayerPrice(data.price);
    setPlayerAdjustPrice(data.priceadjust);
    console.log(data);
  };

  const submiter = async () => {
    const playerinfo = JSON.stringify({
      name: playerName,
      price: playerPrice,
      priceadjust: playerAdjustPrice,
    });
    const res = await fetch(`/api/updatePlayer`, {
      method: "POST",
      headers: { id: selectedPlayer },
      body: playerinfo,
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
  };

  const playerUpdateHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.promise(submiter(), {
      loading: "Updating player...",
      success: <b>Updated!</b>,
      error: <b>Could not update.</b>,
    });
  };

  const playerStatsHandler = async (e: any) => {
    e.preventDefault();
    const f: any = file![0];
    const data = await f.arrayBuffer();
    const workbook = XLSX.read(data);
    const epic39: any = workbook.Sheets["EPIC38"];
    const s45: any = workbook.Sheets["S45"];
    const ruby: any = workbook.Sheets["Ruby"];
    const epic39jsonData: any = XLSX.utils.sheet_to_json(epic39, {
      header: 1,
      defval: "",
    });
    const s45jsonData: any = XLSX.utils.sheet_to_json(s45, {
      header: 1,
      defval: "",
    });
    const rubyjsonData: any = XLSX.utils.sheet_to_json(ruby, {
      header: 1,
      defval: "",
    });

    const GlobalRowmap = new Map();
    //Index for all rows
    for (let index = 0; index < epic39jsonData[0].length; index++) {
      const element = epic39jsonData[0][index];
      GlobalRowmap.set(element, index);
    }
    if (!leagueData) return;
    //Differnt events
    const epicLan = (player: any) => {
      for (let r = 1; r < epic39jsonData.length; r++) {
        const row = epic39jsonData[r];
        if (row[1] === player.steamid) {
          const hltv = row[GlobalRowmap.get("Rating")];
          const KAST = Math.round(row[GlobalRowmap.get("KAST%")]);
          const ADR = Math.round(row[GlobalRowmap.get("ADR")]);
          const hs = Math.round(row[GlobalRowmap.get("HS%")]);
          const deathsTraded = row[GlobalRowmap.get("% of Deaths Traded")];
          const utilThrown = row[GlobalRowmap.get("Util thrown / Round")];
          const entryKills = row[GlobalRowmap.get("Entry Kills / Round")];
          const clutchRounds = Math.round(
            row[GlobalRowmap.get("Clutch won %")]
          );

          const Objectives =
            (row[GlobalRowmap.get("Bomb planted")] +
              row[GlobalRowmap.get("Bomb defused")]) /
            row[GlobalRowmap.get("Rounds")];
          //,Objectives
          return {
            event: "epic39",
            steamid: player?.steamid,
            hltv,
            KAST,
            ADR,
            hs,
            entryKills,
            deathsTraded,
            utilThrown,

            clutchRounds,
            Objectives,
          };
        } else continue;
      }
    };

    const season45 = (player: any) => {
      for (let r = 1; r < s45jsonData.length; r++) {
        const row = s45jsonData[r];
        if (row[1] === player.steamid) {
          const hltv = row[GlobalRowmap.get("Rating")];
          const KAST = Math.round(row[GlobalRowmap.get("KAST%")]);
          const ADR = Math.round(row[GlobalRowmap.get("ADR")]);
          const hs = Math.round(row[GlobalRowmap.get("HS%")]);
          const deathsTraded = row[GlobalRowmap.get("% of Deaths Traded")];
          const utilThrown = row[GlobalRowmap.get("Util thrown / Round")];
          const entryKills = row[GlobalRowmap.get("Entry Kills / Round")];
          const clutchRounds = Math.round(
            row[GlobalRowmap.get("Clutch won %")]
          );

          const Objectives =
            (row[GlobalRowmap.get("Bomb planted")] +
              row[GlobalRowmap.get("Bomb defused")]) /
            row[GlobalRowmap.get("Rounds")];
          //,Objectives
          const newStats = {
            event: "s45",
            steamid: player?.steamid,
            hltv,
            KAST,
            ADR,
            hs,
            entryKills,
            deathsTraded,
            utilThrown,
            clutchRounds,
            Objectives,
          };
          return newStats;
        }
      }
    };

    const rubyLeague = (player: any) => {
      for (let r = 1; r < rubyjsonData.length; r++) {
        const row = rubyjsonData[r];
        if (row[1] === player.steamid) {
          const hltv = row[GlobalRowmap.get("Rating")];
          const KAST = Math.round(row[GlobalRowmap.get("KAST%")]);
          const ADR = Math.round(row[GlobalRowmap.get("ADR")]);
          const hs = Math.round(row[GlobalRowmap.get("HS%")]);
          const deathsTraded = row[GlobalRowmap.get("% of Deaths Traded")];
          const utilThrown = row[GlobalRowmap.get("Util thrown / Round")];
          const entryKills = row[GlobalRowmap.get("Entry Kills / Round")];
          const clutchRounds = Math.round(
            row[GlobalRowmap.get("Clutch won %")]
          );

          const Objectives =
            (row[GlobalRowmap.get("Bomb planted")] +
              row[GlobalRowmap.get("Bomb defused")]) /
            row[GlobalRowmap.get("Rounds")];
          //,Objectives
          const newStats = {
            event: "ruby",
            steamid: player?.steamid,
            hltv,
            KAST,
            ADR,
            hs,
            entryKills,
            deathsTraded,
            utilThrown,
            clutchRounds,
            Objectives,
          };
          return newStats;
        } else continue;
      }
    };

    console.log(GlobalRowmap);
    const allStats = [];
    for (let i = 0; i < leagueData.Teams.length; i++) {
      const team = leagueData.Teams[i]?.Player;
      for (let j = 0; j < team!.length; j++) {
        const player = team![j];
        const epic = epicLan(player);
        const seas45 = season45(player);
        const rubyleg = rubyLeague(player);
        if (epic !== undefined) allStats.push(epic);
        if (seas45 !== undefined) allStats.push(seas45);
        if (rubyleg !== undefined) allStats.push(rubyleg);
      }
    }

    const res = await fetch("/api/PlayerStats", {
      method: "POST",
      body: JSON.stringify(allStats),
    });
    if (!res.ok) throw new Error("failed res");
    console.log(allStats);
  };

  return (
    <div className="grid w-full max-w-3xl gap-2 ">
      <label className="label">What league is the player in?</label>
      <select
        onChange={(e) => {
          setSelectedLeague(e.target.value);
          leagueDataHandler(e.target.value);
        }}
        className="select-bordered select w-full"
      >
        <option selected disabled value="">
          League
        </option>
        <option value="epic39">Epic39</option>
        <option value="demo">Demo</option>
      </select>

      {leagueData && (
        <>
          <label htmlFor="" className="label">
            What is the players name?
          </label>
          <select
            value={selectedPlayer}
            onChange={(e) => {
              setSelectedPlayer(e.target.value);
              playerDataHandler(e.target.value);
            }}
            className="select-bordered select"
          >
            {leagueData &&
              leagueData.Teams.map((team) => {
                return (
                  <optgroup key={team.teamName} label={team.teamName}>
                    {team.Player.map((player) => (
                      <option value={player.id} className="p-1" key={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
          </select>
        </>
      )}

      {playerData && (
        <form
          className="rounded-btn flex flex-col gap-3 bg-base-300 p-4"
          onSubmit={(e) => playerUpdateHandler(e)}
        >
          <h2 className="text-center text-xl">Edit details</h2>
          <div className="flex flex-col">
            <label className="label" htmlFor="">
              Name
            </label>
            <input
              value={playerName ? playerName : ""}
              onChange={(e) => setPlayerName(e.target.value)}
              className="input-bordered input"
              type="text"
              placeholder="playername"
            />
            <section className="grid w-full grid-cols-2 gap-3">
              <div>
                <label className="label" htmlFor="">
                  Base Price
                </label>
                <input
                  value={playerPrice ? playerPrice : 0}
                  onChange={(e) => setPlayerPrice(parseInt(e.target.value))}
                  className="input-bordered input w-full"
                  type="number"
                  placeholder="base price"
                />
              </div>
              <div>
                <label className="label" htmlFor="">
                  Adjustment Price
                </label>
                <input
                  value={playerAdjustPrice ? playerAdjustPrice : 0}
                  onChange={(e) =>
                    setPlayerAdjustPrice(parseInt(e.target.value))
                  }
                  className="input-bordered input w-full"
                  type="number"
                  placeholder="base price"
                />
              </div>
            </section>
          </div>
          <button className="btn">Update</button>
        </form>
      )}

      <h2>Adding player stats</h2>
      <form onSubmit={playerStatsHandler}>
        <input
          onChange={(e: any) => setFile(e.target.files)}
          className="file-input bg-base-300"
          type="file"
          name=""
          id=""
        />
        <button className="btn">Submit</button>
      </form>
    </div>
  );
};

export default PlayerEditAdmin;
