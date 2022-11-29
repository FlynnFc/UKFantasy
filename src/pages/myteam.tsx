import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { string } from "zod";
import { MyPlayer } from "../components/myPlayer";

type player = {
  id: string;
  name: string;
  price: number;
  Image: string;
  Rareity: string;
};

type teamProps = {
  PlayerTeam: [];
  id: string;
  points: string;
  rolePoints: string;
  teamName: string;
};

const Myteam = () => {
  const session = useSession();
  const [team, setTeam] = useState<teamProps>();
  const [renders, setRenders] = useState(0);

  useEffect(() => {
    if (session.data?.user.id) {
      const id = session.data?.user.id;
      const fetcher = async () => {
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.log("error");
        }
        const { PlayerTeam } = await res.json();

        setTeam(PlayerTeam);
      };
      if (renders > 0) {
        return;
      } else {
        setRenders(1);
        fetcher();
      }
    } else return;

    console.log("running");
  }, [renders, session.data?.user.id]);

  const user = "Flynn";
  const seed = [
    { name: "Lvn", price: 22000, rareity: "gold", team: "God Squad" },
    { name: "Smooya", price: 30000, rareity: "gold", team: "God Squad" },
    { name: "Haznoodle", price: 20000, rareity: "silver", team: "God Squad" },
    { name: "Dweg", price: 200, rareity: "bronze", team: "God Squad" },
    { name: "Edeninho", price: 7.3, rareity: "bronze", team: "God Squad" },
  ];

  console.log(team);
  return (
    <main className="min-w-screen container mx-auto flex min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <h1 className="mb-10 text-4xl">{`${user}'s Team`}</h1>
      <div className="flex w-[70vw] flex-row justify-between space-x-2 bg-base-300 p-6">
        {team &&
          team.player.map(
            (el: {
              name: React.Key | null | undefined;
              price: number;
              rareity: string;
            }) => {
              return (
                <MyPlayer
                  key={el.name}
                  name={el.name}
                  price={el.price}
                  rareity={el.rareity}
                />
              );
            }
          )}
      </div>
    </main>
  );
};

export default Myteam;
