import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineEdit } from "react-icons/ai";
import { MdHome, MdPayment, MdQueryStats, MdSettings } from "react-icons/md";
import { CgSpinner } from "react-icons/cg";
import Loading from "../components/Loading";

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
        console.log(data);
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
      {session ? (
        <>
          <Toaster position="bottom-left" />
          <section className="rounded-btn h-full bg-primary p-6 text-primary-content shadow-lg">
            <ul className="flex select-none flex-row items-center justify-evenly md:flex-col md:items-stretch md:space-y-8">
              <li className=" btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
                <MdHome className="text-3xl md:mr-4" />
                <span className="hidden md:inline"> Main</span>
              </li>
              <li className="btn-disabled rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl text-primary transition-all hover:scale-105">
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
            <section className="rounded-btn flex h-full flex-row justify-between bg-primary p-8  md:w-[30rem]">
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
                  {session?.user?.email
                    ? session?.user?.email
                    : "No email connected"}
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
            <section className="rounded-btn flex h-full flex-col justify-start bg-base-100 p-8 md:w-[30rem]">
              <h2 className="text-3xl">All teams</h2>
              {teams ? (
                teams.map(
                  (el: {
                    id: string;
                    teamName: string;
                    league: { name: string };
                  }) => {
                    return (
                      <div
                        key={el.id}
                        className="my-2 border-b border-primary p-2 py-6"
                      >
                        <div>
                          <Link href={`/${el.league.name.toLowerCase()}`}>
                            <h2 className="cursor-pointer text-3xl hover:underline">
                              {el.league.name}
                            </h2>
                          </Link>
                          <h3 className="text-2xl font-bold">{el.teamName}</h3>

                          <div className="flex flex-row items-start justify-start space-x-1 py-2">
                            <Link
                              href={`/${el.league.name.toLowerCase()}/myteam`}
                            >
                              <button className="btn w-full bg-primary text-primary-content hover:text-primary">
                                See Team
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )
              ) : (
                <div className="flex w-full justify-center">
                  <CgSpinner className="animate-spin text-4xl" />
                </div>
              )}
              {teams && teams.length < 1 && <div>No teams</div>}
            </section>
          </main>
          <section className="rounded-btn hidden h-[80vh] w-[25rem] flex-row items-center justify-center bg-base-300 text-base-content xl:flex ">
            <div className="h-[92%] w-5/6 rounded">
              <h2>Content here, idk what yet</h2>
            </div>
          </section>
        </>
      ) : (
        <div>
          <h1>Sign in to access this page!</h1>
        </div>
      )}
    </div>
  );
};

export default Profile;
