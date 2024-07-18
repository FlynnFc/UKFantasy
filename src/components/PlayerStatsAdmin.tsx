import React, {
  useMemo,
  useState,
  PureComponent,
  useCallback,
  useEffect,
} from "react";
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

const allBonuses = [
  {
    name: "ADR warrior",
    color: "#4f0d9b",
  },
  {
    name: "All rounder",
    color: "#e6e741",
  },
  {
    name: "awper",
    color: "#efa1a2",
  },
  {
    name: "Clutcher",
    color: "#3cf814",
  },
  {
    name: "Entry king",
    color: "#c4d0cf",
  },
  {
    name: "Head Clicker",
    color: "#87fec9",
  },
  {
    name: "PTFO",
    color: "#d5420b",
  },
  {
    name: "Site on lock",
    color: "#b98ac5",
  },
  {
    name: "Stat padder",
    color: "#a53849",
  },
  {
    name: "Trade me",
    color: "#87992f",
  },
  {
    name: "Util nerd",
    color: "#2c138a",
  },
];
const PlayerStatsAdmin = () => {
  const [playerData, setPlayerData] = useState(new Map());
  const [emptyPlayer, setEmptyPlayer] = useState(new Map());
  const playerDataHandler = async (league: string) => {
    const res = await fetch(`/api/userteam`, {
      method: "GET",
      headers: { leaguename: league.toLowerCase() },
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
    const data = await res.json();

    const res2 = await fetch(`/api/teams`, {
      method: "GET",
      headers: { leaguename: league.toLowerCase() },
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
    const data2 = await res2.json();

    const newPlayerstats = new Map<string, any>();
    for (let i = 0; i < data.length; i++) {
      const team = data[i].SelectedPlayer;
      for (let j = 0; j < team.length; j++) {
        const player = team[j];
        if (newPlayerstats.has(player.name)) {
          const valss = newPlayerstats.get(player.name);
          const bonus = player.bonusName;
          let newval = 1;
          for (const [key, value] of Object.entries(valss)) {
            if (key === bonus) {
              newval = (value as number) + 1;
            }
          }
          newPlayerstats.set(player.name, {
            ...newPlayerstats.get(player.name),
            [bonus]: newval,
          });
        } else {
          newPlayerstats.set(player.name, { [player.bonusName]: 1 });
        }
      }
    }

    //General player frequency
    const players = [];
    for (let i = 0; i < data.length; i++) {
      const team = data[i].SelectedPlayer;
      for (let j = 0; j < team.length; j++) {
        const player = team[j];
        players.push(player);
      }
    }
    const pickFreq = new Map<string, number>();
    for (let i = 0; i < data2.Teams.length; i++) {
      const team = data2.Teams[i];

      for (let j = 0; j < team.Player.length; j++) {
        const player = team.Player[j];

        pickFreq.set(player.name, 0);
      }
    }

    for (let i = 0; i < players.length; i++) {
      const element = players[i].name;
      if (pickFreq.has(element)) {
        const newVal = pickFreq.get(element)! + 1;
        pickFreq.set(element, newVal);
      }
    }

    setEmptyPlayer(new Map(pickFreq));
    setPlayerData(new Map(newPlayerstats));
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Add event listener to track changes in the window size
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const players = useMemo(() => {
    const elements: any[] = [];
    playerData.forEach((val, key) => {
      elements.push({ ...val, name: key });
    });

    return elements;
  }, [playerData]);

  const playerfreq = useMemo(() => {
    const elements: any[] = [];
    emptyPlayer.forEach((val, key) => {
      elements.push({ name: key, freq: val });
    });

    return elements;
  }, [emptyPlayer]);

  return (
    <div className="flex w-full max-w-3xl flex-col justify-center gap-2">
      <label className="label">What league is the player in?</label>
      <select
        onChange={(e) => {
          playerDataHandler(e.target.value);
        }}
        className="select select-bordered min-w-max"
      >
        <option selected disabled value="">
          League
        </option>
        <option value="epic42">Epic42</option>
        <option value="epic41">Epic41</option>
        <option value="epic40">Epic40</option>
        <option value="epic39">Epic39</option>
        <option value="demo">Demo</option>
      </select>
      {/* {players.length > 0 && (
        <section className="mt-2 grid grid-cols-1 gap-4">
          <h3 className="text-center text-3xl">Selected player bonus picks</h3>
          {players.length > 0 && (
            <div className="rounded-btn flex w-full justify-center p-3">
              <BarChart
                width={screenWidth * 0.65}
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
                <Bar dataKey={"freq"} stackId="a" />
                {allBonuses.map((el) => {
                  return (
                    <Bar
                      dataKey={el.name}
                      stackId="a"
                      key={el.name}
                      fill={el.color}
                    />
                  );
                })}
                <Legend />
              </BarChart>
            </div>
          )}
        </section>
      )} */}
      {players.length > 0 && (
        <section className="mt-2 grid grid-cols-1 gap-4">
          <h3 className="text-center text-3xl">Player picks</h3>
          {players.length > 0 && (
            <section className="mt-2 grid grid-cols-1 gap-4">
              {players.length > 0 && (
                <div className="rounded-btn flex w-full justify-center p-3">
                  <BarChart
                    width={screenWidth * 0.65}
                    height={400}
                    data={playerfreq}
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
                    <Bar fill="#3457d4" dataKey={"freq"} stackId="a" />
                    <Legend />
                  </BarChart>
                </div>
              )}
            </section>
          )}
        </section>
      )}
    </div>
  );
};

export default PlayerStatsAdmin;
