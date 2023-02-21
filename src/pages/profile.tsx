import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { MdHome, MdPayment, MdQueryStats, MdSettings } from "react-icons/md";

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
    <div className="container mx-auto flex min-h-screen select-none flex-col space-y-2 p-4 md:flex-row md:items-start md:justify-evenly">
      <Toaster position="bottom-left" />
      <section className="rounded-btn h-full bg-primary p-6 text-primary-content shadow-lg">
        <ul className="flex select-none flex-row items-center justify-evenly md:flex-col md:items-stretch md:space-y-8">
          <li className=" btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
            <MdHome className="text-3xl md:mr-4" />
            <span className="hidden md:inline"> Main</span>
          </li>
          <li className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
            <MdQueryStats className="text-3xl md:mr-4" />
            <span className="hidden md:inline"> Stats</span>
          </li>
          <li className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
            <MdSettings className="text-3xl md:mr-4" />
            <span className="hidden md:inline">Settings</span>
          </li>
          <li className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
            <MdPayment className="text-3xl md:mr-4" />
            <span className="hidden md:inline">Payments</span>
          </li>
        </ul>
      </section>
      <main className="">
        <section className="flex h-full flex-row justify-between rounded-lg bg-primary p-8  md:w-[30rem]">
          <div className="">
            <h1 className="flex flex-row items-end text-3xl text-primary-content">
              {session?.user?.name}
              <span className="btn-ghost mx-1 cursor-pointer rounded p-1 text-2xl transition-all hover:scale-105">
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
        <section className="flex h-full flex-col justify-start rounded-lg bg-base-100 p-8 md:w-[30rem]">
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
      <section className="hidden h-[80vh] w-[25rem] flex-row justify-between rounded-lg bg-base-300 p-8 text-base-content xl:flex ">
        <div className="">
          <h1 className="flex flex-row items-end text-3xl">
            Some content in here?
          </h1>
          <span className="text-base">{session?.user?.email}</span>
        </div>
      </section>
    </div>
  );
};

export default Profile;
