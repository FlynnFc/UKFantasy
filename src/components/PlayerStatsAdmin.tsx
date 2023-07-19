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
    console.log(data);
    const playerstats = new Map<string, any>();
    for (let i = 0; i < data.length; i++) {
      const team = data[i].SelectedPlayer;
      for (let j = 0; j < team.length; j++) {
        const player: { name: string } = team[j];
        let newVal = 1;
        if (playerstats.has(player.name)) {
          newVal = playerstats.get(player.name).freq + 1;
        }
        playerstats.set(player.name.toLowerCase(), {
          freq: newVal,
        });
      }
    }
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
              newval++;
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
      console.log(newPlayerstats);
    }
    setPlayerData(new Map(newPlayerstats));
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  console.log(screenWidth);
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
      <section className="mt-2 grid grid-cols-1 gap-4">
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
              {allBonuses.map((el) => (
                <Bar
                  dataKey={el.name}
                  stackId="a"
                  key={el.name}
                  fill={el.color}
                />
              ))}
              <Legend />
            </BarChart>
          </div>
        )}
      </section>
    </div>
  );
};

export default PlayerStatsAdmin;
