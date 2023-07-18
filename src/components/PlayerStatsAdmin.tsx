import React, { useMemo, useState } from "react";
import leagues from "../pages/leagues";

const PlayerStatsAdmin = () => {
  const [playerData, setPlayerData] = useState(new Map());
  const playerDataHandler = async (league: string) => {
    const res = await fetch(`/api/allUserTeams`, {
      method: "GET",
      headers: { leaguename: league.toLowerCase() },
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
    const data = await res.json();

    const playerstats = new Map<string, any>();
    for (let i = 0; i < data.length; i++) {
      const team = data[i].SelectedPlayer;
      for (let j = 0; j < team.length; j++) {
        const player: { name: string } = team[j];
        let newVal = 1;
        if (playerstats.has(player.name)) {
          newVal = playerstats.get(player.name) + 1;
        }
        playerstats.set(player.name.toLowerCase(), newVal);
      }
    }
    setPlayerData(new Map(playerstats));
  };

  const players = useMemo(() => {
    const elements: any[] = [];
    playerData.forEach((val, key) => {
      elements.push({ freq: val, name: key });
    });

    elements.sort((a, b) => b.freq - a.freq);
    return elements;
  }, [playerData]);

  console.log(playerData);
  return (
    <div className=" ml-2 flex w-full max-w-3xl flex-col justify-center">
      <label className="label">What league is the player in?</label>
      <select
        onChange={(e) => {
          playerDataHandler(e.target.value);
        }}
        className="select-bordered select min-w-max"
      >
        <option selected disabled value="">
          League
        </option>
        <option value="epic39">Epic39</option>
        <option value="demo">Demo</option>
      </select>
      <section className="mt-2 flex w-full flex-row items-center justify-center gap-4 ">
        {players.length > 0 && (
          <div className="rounded-btn bg-base-300 p-3">
            <table className="rounded-btn table">
              <thead className="">
                <tr>
                  <th>Player</th>
                  <th>freq picked</th>
                </tr>
              </thead>
              <tbody>
                {players.map((val) => {
                  return (
                    <tr key={val.name}>
                      <td>{val.name}</td>
                      <td className="text-center">{val.freq}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlayerStatsAdmin;
