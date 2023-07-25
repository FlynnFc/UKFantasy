import { useRouter } from "next/router";
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

const Stats = () => {
  const [playerData, setPlayerData] = useState(new Map());
  const [emptyPlayer, setEmptyPlayer] = useState(new Map());
  const { query } = useRouter();

  const playerDataHandler = async () => {
    const res = await fetch(`/api/allUserTeams`, {
      method: "GET",
      headers: { leaguename: query.league as string },
    });
    if (!res.ok) {
      console.error("error", res);
      throw new Error("error");
    }
    const data = await res.json();

    const res2 = await fetch(`/api/allTeams`, {
      method: "GET",
      headers: { leaguename: query.league as string },
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

  const [screenWidth, setScreenWidth] = useState(1000);

  // Add event listener to track changes in the window size
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    setScreenWidth(window.innerWidth);
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
    <section className="flex min-h-screen w-full items-start justify-center">
      <div className=" ml-2 flex  w-full max-w-3xl flex-col justify-center ">
        {!players.length && (
          <button className="btn" onClick={() => playerDataHandler()}>
            Generage stats
          </button>
        )}
        {players.length > 0 && (
          <section className="mt-2 grid grid-cols-1 gap-4">
            <h3 className="text-center text-3xl">
              Selected player bonus picks
            </h3>
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
        )}
        {players.length > 0 && (
          <section className="mt-2 grid grid-cols-1 gap-4">
            <h3 className="text-center text-3xl">Player picks</h3>
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
                  <Bar dataKey={"freq"} stackId="a" />
                  <Legend />
                </BarChart>
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  );
};

export default Stats;
