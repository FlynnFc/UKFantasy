import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Toaster } from "react-hot-toast";

import {
  MdHome,
  MdOutlineAdminPanelSettings,
  MdQueryStats,
  MdSettings,
} from "react-icons/md";
import { CgSpinner } from "react-icons/cg";

import Settings from "../components/Settings";
import Head from "next/head";
import { BiLogOut } from "react-icons/bi";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";

  const res = await fetch(`${path}/api/admins`, {
    method: "GET",
  });
  if (!res.ok) {
    console.error("error");
  }
  const temp = await res.json();
  const admins = new Set(temp.map((el: { id: string }) => el.id));
  const isAdmin = admins.has(session?.user?.id);

  return {
    props: {
      isAdmin,
    },
  };
}

const Profile = (props: { isAdmin: boolean }) => {
  const admin = useMemo(() => props.isAdmin, [props.isAdmin]);
  const { data: session } = useSession();
  const [datateams, setTeams] = useState([]);
  const [currentPage, setCurrentPage] = useState("profile");
  useEffect(() => {
    const fetcher = async () => {
      if (session?.user?.id) {
        const id = session.user.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.error("error");
        }
        const data = await res.json();
        setTeams(data.PlayerTeam);
      } else return "error";
    };

    fetcher();
  }, [session]);

  return (
    <>
      <Head>
        <title>Your profile</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container mx-auto flex min-h-screen select-none flex-col items-start gap-8 p-4 md:grid md:grid-cols-6 md:grid-rows-1 ">
        {session ? (
          <>
            <Toaster position="bottom-left" />
            <section className="col-span-2 flex w-full items-start justify-end">
              <ul className="rounded-btn flex h-min w-full select-none flex-row items-center justify-evenly bg-primary p-6 text-primary-content shadow-lg md:w-fit md:flex-col md:items-stretch md:justify-start md:space-y-8">
                <li
                  onClick={() => setCurrentPage("profile")}
                  className=" btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105"
                >
                  <MdHome className="text-3xl md:mr-4" />
                  <span className="hidden md:inline"> Profile</span>
                </li>
                <li className="btn-disabled rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl text-primary transition-all hover:scale-105">
                  <MdQueryStats className="text-3xl md:mr-4" />
                  <span className="hidden md:inline"> Stats</span>
                </li>
                {/* <li
                  onClick={() => setCurrentPage("posts")}
                  className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105"
                >
                  <Edit className="text-3xl md:mr-4" />
                  <span className="hidden md:inline"> Posts</span>
                </li> */}
                <li
                  onClick={() => setCurrentPage("settings")}
                  className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105"
                >
                  <MdSettings className="text-3xl md:mr-4" />
                  <span className="hidden md:inline">Settings</span>
                </li>
                {admin && (
                  <Link target="_blank" href={"/admin"}>
                    <li className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
                      <MdOutlineAdminPanelSettings className="text-3xl md:mr-4" />
                      <span className="hidden flex-row md:flex ">Admin</span>
                    </li>
                  </Link>
                )}
                <li>
                  <button
                    className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105"
                    onClick={() =>
                      signOut({
                        callbackUrl: `${window.location.origin}`,
                      })
                    }
                  >
                    <BiLogOut className="text-3xl md:mr-4" />{" "}
                    <span className="hidden md:inline">Sign out</span>
                  </button>
                </li>
                {/* <li className="btn-ghost rounded-btn flex cursor-pointer flex-row items-center p-2 text-2xl transition-all hover:scale-105">
                <MdPayment className="text-3xl md:mr-4" />
                <span className="hidden md:inline">Payments</span>
              </li> */}
              </ul>
            </section>
            <main className="col-span-3 flex h-fit w-full flex-col items-start gap-4">
              <section className="rounded-btn flex h-full w-full flex-row justify-between bg-primary p-8  md:w-[30rem]">
                <div className="">
                  <h1 className="flex flex-row items-end text-3xl text-primary-content">
                    {session?.user?.name}
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
              {currentPage === "profile" && (
                <section className="rounded-btn flex h-fit w-full flex-col justify-start bg-base-300 p-8 md:w-[30rem]">
                  <h2 className="text-3xl">My teams</h2>
                  {datateams ? (
                    datateams.map(
                      (el: {
                        id: string;
                        teamName: string;
                        league: { name: string };
                      }) => {
                        return (
                          <div
                            key={el.id}
                            className="my-2 border-t border-primary p-2 py-6"
                          >
                            <div>
                              <Link href={`/${el.league.name.toLowerCase()}`}>
                                <h2 className="cursor-pointer text-3xl hover:underline">
                                  {el.league.name}
                                </h2>
                              </Link>
                              <h3 className="text-2xl font-bold">
                                {el.teamName}
                              </h3>

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
                  {datateams && datateams.length < 1 && <div>No teams</div>}
                </section>
              )}
              {currentPage === "settings" && <Settings />}
            </main>
            {/* <section className="rounded-btn col-span-1 hidden h-[80vh] w-[25rem] flex-row items-center justify-center text-base-content xl:flex ">
              <div className="h-[92%] w-5/6 rounded  bg-base-300">
                Put something here in the future
              </div>
            </section> */}
          </>
        ) : (
          <div>
            <h1>Sign in to access this page!</h1>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
