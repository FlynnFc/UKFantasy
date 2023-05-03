import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Loading from "../../../components/Loading";

import { MyPlayer } from "../../../components/myPlayer";
import Head from "next/head";

type player = {
  bonus: { name: string; description: string };
  id: string;
  name: string;
  price: number;
  rareity: string;
  teamId: string;
  statsId: string;
  image: string;
};

type playerTeam = {
  User: any;
  map(arg0: (el: any) => JSX.Element): React.ReactNode;
  id: string;
  points: string;
  SelectedPlayer: player[];
  teamName: string;
};

const UserTeam = () => {
  const { query } = useRouter();
  const [team, setTeam] = useState<playerTeam>();

  useEffect(() => {
    const fetcher = async () => {
      const teamId: string = query.userTeamid as string;
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
  }, [query.userTeamid]);

  console.log(team);

  return (
    <>
      <Head>
        <title>{`${team?.User.name}'s team`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
        {team ? (
          <div className="flex flex-col">
            <h1 className="mb-4 text-center text-4xl">{team.teamName}</h1>
            <h2 className="m-2 mx-2 text-center text-lg">{`${team.User.name}'s team`}</h2>
            <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg bg-base-300 p-6 sm:max-w-[80vw] sm:flex-row sm:space-x-4 sm:space-y-0">
              {team.SelectedPlayer.map((el) => {
                return (
                  <MyPlayer
                    key={el.id}
                    name={el.name}
                    price={el.price}
                    rareity={el.rareity}
                    img={el.image}
                    bonus={el.bonus}
                    index={0}
                    deleteBonus={function (i: number): void {
                      throw new Error("Function not implemented.");
                    }}
                    bonusEdit={false}
                  />
                );
              })}
            </div>
          </div>
        ) : (
          <Loading />
        )}
      </main>
    </>
  );
};

export default UserTeam;
