import React, { useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
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
          newVal = playerstats.get(player.name).freq + 1;
        }
        playerstats.set(player.name.toLowerCase(), { freq: newVal });
      }
    }
    setPlayerData(new Map(playerstats));
    console.log(playerData);
  };

  const players = useMemo(() => {
    const elements: any[] = [];
    playerData.forEach((val, key) => {
      elements.push({ bonus1: val.freq, bonus2: val.freq + 3, name: key });
    });

    return elements;
  }, [playerData]);

  console.log(playerData);
  console.log(players);
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
            <BarChart
              width={1300}
              height={400}
              data={players}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bonus1" stackId="a" fill="#7bea79" />
              <Bar dataKey="bonus2" stackId="a" fill="#f4e67c" />
              <Legend />
            </BarChart>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlayerStatsAdmin;
