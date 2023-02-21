import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import Settings from "./settings";

const Profile = () => {
  const { data: session } = useSession();
  const [datateams, setTeams] = useState([]);
  const teams = useMemo(() => [...datateams], [datateams]);
  useEffect(() => {
    const fetcher = async () => {
      if (session?.user?.id) {
        const id = session.user.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.log("error");
        }
        const data = await res.json();

        setTeams(data.PlayerTeam);
        console.log(data.PlayerTeam);
      } else return "error";
    };

    fetcher();
    console.log("running");
  }, [session]);

  console.log(teams);
  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-start space-y-2 p-4">
      <Toaster position="bottom-left" />

      <section className="flex h-full w-[30rem] flex-row justify-between rounded-lg bg-primary p-8">
        <div className="">
          <h1 className="flex flex-row items-end text-3xl text-primary-content">
            {session?.user?.name}
            <span className="btn-ghost mx-1 rounded p-1 text-2xl">
              <Link href={"/settings"}>
                <AiOutlineEdit />
              </Link>
            </span>
          </h1>
          <span className="text-base text-primary-content">
            {session?.user?.email}
          </span>
        </div>
        {session?.user?.image && (
          <Image
            className="rounded-lg"
            src={session?.user?.image}
            height={60}
            width={60}
            alt="profile picture"
          ></Image>
        )}
      </section>
      <section className="flex h-full w-[30rem] flex-col justify-start rounded-lg bg-base-100 p-8">
        <h2 className="text-3xl">All teams</h2>
        {teams &&
          teams.map((el: any) => {
            return (
              <div
                key={el.id}
                className="my-2 border-b border-primary p-2 py-6 hover:bg-[#00000015]"
              >
                <Link href={`/${el.league.name.toLowerCase()}`}>
                  <div className="cursor-pointer">
                    <h2 className="text-3xl">{el.league.name}</h2>
                    <h3 className="text-2xl font-bold">{el.teamName}</h3>

                    <div className="flex flex-row items-start justify-start space-x-1 py-2">
                      <Link href={`/${el.league.name.toLowerCase()}/myteam`}>
                        <button className="btn-secondary btn w-full">
                          See Team
                        </button>
                      </Link>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </section>
    </main>
  );
};

export default Profile;
