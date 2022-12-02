import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";

import { MyPlayer } from "../../components/myPlayer";

type player = {
  id: string;
  name: string;
  price: number;
  Rareity: string;
  teamId: string;
  statsId: string;
  Image: string;
};

type playerTeam = {
  map(arg0: (el: any) => JSX.Element): React.ReactNode;
  id: string;
  points: string;
  Player: player[];
  teamName: string;
};

const UserTeam = () => {
  const { query } = useRouter();

  const [team, setTeam] = useState<playerTeam>();

  useEffect(() => {
    const fetcher = async () => {
      const teamId: string | any = query.userTeamid;

      const res = await fetch("/api/UserTeamById", {
        method: "GET",
        headers: { id: teamId },
      });
      if (!res.ok) {
        console.log("error");
      }
      const data = await res.json();

      setTeam(data);
    };

    fetcher();

    console.log("running");
  }, [query.userTeamid]);

  setTimeout(() => console.log(team));

  return (
    <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      {team ? (
        <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg bg-base-300 p-6 sm:max-w-[80vw] sm:flex-row sm:space-y-0 sm:space-x-4">
          {team.Player.map((el) => {
            console.log(el);
            return (
              <MyPlayer
                key={el.id}
                name={el.name}
                price={el.price}
                rareity={el.Rareity}
                img={el.Image}
              />
            );
          })}
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default UserTeam;
