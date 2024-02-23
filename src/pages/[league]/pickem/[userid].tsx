import { getSession, useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FiShare } from "react-icons/fi";

import { randomUUID } from "crypto";
import { CheckCircle, CheckSquare, Pencil, XSquare } from "lucide-react";
import { BsChevronDoubleDown, BsChevronDoubleUp } from "react-icons/bs";
import { GetServerSidePropsContext } from "next";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { ImBin } from "react-icons/im";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  const path = "https://uk-fantasy.vercel.app";
  // const path = "http://localhost:3000";
  if (!session || !session?.user) {
    // Handle the case where the user is not logged in
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  //Fetch users team
  const res = await fetch(`${path}/api/pickem`, {
    method: "GET",
    headers: { id: session.user.id },
  });
  if (!res.ok) {
    console.error("error", res);
    return { props: { data: "nothing" } };
  }

  const path2 = "https://uk-fantasy.vercel.app";
  const res2 = await fetch(`${path2}/api/teams`, {
    method: "GET",
    headers: {
      leaguename: context.params?.league as string,
      create: "true",
    },
  });
  const data = await res.json();
  const teams = await res2.json();

  return {
    props: {
      data: data,
      teams,
    },
  };
}

type TeamType = {
  name: string;
  id: string;
  players: any[];
};

const temp = new Array(8).fill({ id: randomUUID, name: "" });

const Pickem = ({
  data,
}: {
  data: {
    id: string;
    highestRating: string;
    lowestRating: string;
    playoffs: { teamName: string; id: string }[];
    userId: string;
    user: { name: string };
    results: {
      lowestRating: string;
      highestRating: string;
      league: { startDate: string };
      playoffs: { teamName: string; id: string }[];
    };
  };
}) => {
  const linkSetter = () => {
    const path: string = data.userId as string;

    const host = `https://esportsfantasy.app/epic41/pickem/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };
  const [highestRating, setHighestRating] = useState<string>(
    data.highestRating
  );
  const [lowestRating, setLowestRating] = useState<string>(data.lowestRating);
  const [playoffs, setPlayoffs] = useState<{ teamName: string; id: string }[]>(
    data.playoffs
  );
  const [playoffSet, setPlayoffSet] = useState(new Set());

  useEffect(() => {
    const newSet = new Set();
    data.results.playoffs.forEach((el) => {
      newSet.add(el.id);
    });
    setPlayoffSet(newSet);
  }, [data.results.playoffs]);

  const isStarted = useMemo(() => {
    if (data.results.league.startDate)
      return new Date(data?.results.league.startDate) < new Date();
  }, [data.results.league.startDate]);

  const correct = useMemo(() => {
    data.playoffs.forEach;
    let total = 0;
    for (const team of data.playoffs) {
      // Check if the item exists in array2
      for (const team2 of data.results.playoffs) {
        if (team.id === team2.id) {
          total++;
        }
      }
    }
    if (highestRating === data.results.highestRating) {
      total++;
    }
    if (lowestRating === data.results.lowestRating) {
      total++;
    }
    if (total > 10) {
      return 10;
    }
    return total;
  }, [
    data.playoffs,
    data.results.highestRating,
    data.results.lowestRating,
    data.results.playoffs,
    highestRating,
    lowestRating,
  ]);

  const session = useSession();
  const { query } = useRouter();
  session.data?.user?.id;
  console.log(data);
  const teamDeleter = async () => {
    const res = await fetch("/api/pickem", {
      method: "DELETE",
      headers: { id: data.id },
    });
    if (!res.ok) {
      throw new Error("failed to delete");
    }
    return res;
  };

  function deleteHandler() {
    toast.promise(teamDeleter(), {
      loading: "Deleting...",
      success: <b>Pickems Deleted!</b>,
      error: <b>Could not delete your pickems!</b>,
    });
    router.push(`/${query.league}/`);
  }

  //When sending data to create pickem. Send array of teamids for playoff selections. And team ids for lowest and highest guesses
  return (
    <main className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-6xl select-none flex-col items-center justify-start  p-4 sm:mx-auto">
      <Toaster position="bottom-left" />
      <div className="flex h-full w-full flex-col items-center justify-center">
        <header className="flex flex-col items-center space-x-2">
          <div className="flex flex-row ">
            <h1 className="text-4xl">
              {data.user.name ?? "unknown"}&apos;s Group Stage Pickem
            </h1>
            <button
              onClick={linkSetter}
              className="btn-ghost rounded-btn mx-2  mb-1 p-2 text-2xl transition-all"
            >
              <FiShare className="" />
            </button>
            {session.data?.user?.id === query.userid && !isStarted && (
              <>
                <Link
                  href={{
                    pathname: "/[league]/pickem/edit",
                    query: { league: query.league },
                  }}
                >
                  <button
                    disabled={true}
                    className="btn-ghost rounded-btn my-1 h-fit w-fit cursor-pointer fill-secondary p-2 text-2xl text-secondary transition"
                  >
                    <Pencil className="fill-primary text-primary" />
                  </button>
                </Link>
                <button
                  onClick={deleteHandler}
                  className="btn-ghost rounded-btn my-1 h-fit w-fit cursor-pointer  p-2 text-2xl text-error transition"
                >
                  <ImBin />
                </button>
              </>
            )}
          </div>
        </header>
        <section className="w-full space-y-2 md:grid md:grid-rows-2 md:gap-4 md:space-y-0">
          <div className="flex w-full flex-col items-center justify-evenly gap-2 md:flex-row">
            <div>
              <h3 className=" gap-1 text-center font-bold leading-relaxed">
                1st Place
              </h3>
              <div className="rounded-btn flex h-20 w-40 items-center justify-center bg-green-900 p-2 text-center font-bold">
                {highestRating ? (
                  <span className="flex flex-row gap-2">
                    {highestRating}
                    {data.results.highestRating === highestRating ? (
                      <CheckSquare />
                    ) : (
                      <XSquare />
                    )}
                  </span>
                ) : (
                  <BsChevronDoubleUp className="text-3xl text-green-500" />
                )}
              </div>
            </div>
            <section>
              <div className="rounded-btn mt-5 grid w-fit bg-base-300  p-4 text-2xl">
                <h2>
                  <span
                    className={`font-bold ${
                      correct > 6
                        ? "text-green-600"
                        : correct > 3
                        ? "text-amber-500"
                        : "text-red-500"
                    }`}
                  >
                    {correct}
                  </span>
                  <span className="font-bold">/10</span>
                </h2>
              </div>
            </section>
            <div>
              <h3 className="gap-1 text-center font-bold leading-relaxed">
                Lowest rating
              </h3>
              <div className="rounded-btn flex h-20 w-fit items-center justify-center bg-red-900 p-2 text-center font-bold">
                {lowestRating ? (
                  <span className="flex flex-row items-center gap-2 px-2">
                    {lowestRating}
                    {data.results.lowestRating === lowestRating ? (
                      <CheckSquare />
                    ) : (
                      <XSquare />
                    )}
                  </span>
                ) : (
                  <BsChevronDoubleDown className="text-3xl text-red-500" />
                )}
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold leading-relaxed">Playoffs</h2>
            <div className="mx-auto grid grid-cols-2 gap-2  md:grid-cols-4 md:grid-rows-1">
              {playoffs.length
                ? playoffs?.map((el) => {
                    return (
                      <div
                        className="rounded-btn flex h-14
                         w-auto items-center justify-between bg-primary p-2 px-4 text-center font-bold shadow"
                        key={el.id}
                      >
                        {el.teamName}{" "}
                        <span className="text-2xl">
                          {playoffSet.has(el.id) ? (
                            <CheckSquare />
                          ) : (
                            <XSquare />
                          )}
                        </span>
                      </div>
                    );
                  })
                : temp.map((el) => {
                    return (
                      <div
                        className="rounded-btn flex h-12 w-auto items-center justify-center bg-base-300 p-2 text-center font-bold"
                        key={el.id}
                      >
                        {el.name}
                      </div>
                    );
                  })}
            </div>
          </div>
        </section>
        {/* <section>
          <div className="rounded-btn mt-5 grid w-fit bg-base-300  p-4 text-2xl">
            <h2>
              <span
                className={`font-bold ${
                  correct > 6
                    ? "text-green-600"
                    : correct > 3
                    ? "text-amber-500"
                    : "text-red-500"
                }`}
              >
                {correct}
              </span>
              <span className="font-bold">/10</span>
            </h2>
          </div>
        </section> */}
      </div>
    </main>
  );
};

export default Pickem;
