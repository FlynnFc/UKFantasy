// TODO
// Fetch Leaderboard of users that have teams in this league
// New Team page would be [league]/team/[teamid]
// User profile page shows what leagues they are in current/past/upcoming use the https://daisyui.com/components/tab/ component

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useMemo, useState } from "react";
import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Head from "next/head";
import AllLiveChannels, { stream } from "../../components/AllLiveChannels";
import { ExternalLink } from "lucide-react";

export async function getStaticProps(paths: { params: { league: string } }) {
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/leagues`, {
    method: "GET",
    headers: { leaguename: paths.params.league },
  });
  const data = await res.json();
  const streamsRes = await fetch(`${path}/api/twitchstreams`);
  const streamData = await streamsRes.json();
  const streams = streamData.data;
  return {
    props: {
      data,
      streams,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  // const path = "http://localhost:3000";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/leagues`, { method: "GET" });
  const data = await res.json();

  const paths = data.map((league: { name: string }) => ({
    params: { league: league.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

type league = {
  name: string;
  description: string;
  id: string;
  endDate: string;
  startDate: string;
  openDate: string;
};

type UserProps = {
  User: [{ id: string }];
};

const LeaguePage = (props: { data: league; streams: stream[] }) => {
  const session = useSession();
  const { status } = useSession();
  const { query } = useRouter();
  const [createModal, setCreateModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userHasTeam, setUserHasTeam] = useState<boolean>();
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [league, setLeague] = useState<league>();
  const [leagueOpen, setLeagueOpen] = useState(false);

  const isOpen = useMemo(() => {
    if (league?.openDate) return new Date(league.openDate) < new Date();
  }, [league?.openDate]);
  const isStarted = useMemo(() => {
    if (league?.startDate) return new Date(league.startDate) < new Date();
  }, [league?.startDate]);
  const isEnded = useMemo(() => {
    if (league?.endDate) return new Date(league.endDate) < new Date();
  }, [league?.endDate]);

  useEffect(() => {
    setLoading(true);
    const tempData: any = [];
    console.log(query.league);
    fetch("/api/userteam", {
      method: "GET",
      headers: { leaguename: query.league as string },
    })
      .then((res) => res.json())
      .then((data) => {
        data.forEach((el: { league: { name: string } }) => {
          if (el.league?.name.toLowerCase() === query.league) {
            tempData.push(el);
          } else return;
        });
        setLoading(false);
        return setData(tempData);
      });
  }, [query.league]);

  console.log(data);

  const dateSetter = (date?: string) => {
    let event;
    if (date) {
      event = new Date(date);
    } else {
      event = new Date();
    }

    // const options = {
    //   weekday: "long",
    //   year: "numeric",
    //   month: "long",
    //   day: "numeric",
    // };
    return event.toLocaleDateString();
  };

  useEffect(() => {
    setLeague(props.data);
  }, [props.data, query.league]);
  //Filters teams so it only shows user submitted teams from this league
  // useEffect(() => {
  //   const tempData: any = [];
  //   props.data.forEach((el: { league: { name: string } }) => {
  //     if (el.league?.name.toLowerCase() === query.league) {
  //       tempData.push(el);
  //     } else return;
  //   });
  //   return setData(tempData);
  // }, [props.data, query.league]);

  // const data = useMemo(() => {
  //   const tempData: any = [];
  //   props.data.forEach(
  //     (el: { league: { name: { toLowerCase: () => ParsedUrlQuery } }[] }) => {
  //       console.log(el.league[0]?.name.toLowerCase());
  //       console.log(query.league);
  //       if (el.league[0]?.name.toLowerCase() === query.league) {
  //         tempData.push(el);
  //       } else return;
  //     }
  //   );
  //   return tempData;
  // }, [props.data, query.league]);
  //Checks is signed in user has already created a team for this league

  useEffect(() => {
    if (data) {
      for (let index = 0; index < data.length; index++) {
        const element: UserProps | any = data[index];
        if (element?.User.id === session.data?.user?.id) {
          setUserHasTeam(true);
          return;
        }
      }
      setUserHasTeam(false);
    }
  }, [data, session.data?.user?.id]);

  return (
    <>
      <Head>
        <title>
          {league?.name ? `${league.name} tournament center` : "League"}
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-start justify-start p-4">
        {loading && <Loading />}
        <div className="mt-4 flex w-full">
          {isStarted && !isEnded && (
            <span className="rounded-btn w-full select-none bg-green-500 p-3 text-center font-semibold uppercase text-base-content">
              Tournament live
            </span>
          )}
          {isEnded && (
            <span className="rounded-btn w-full select-none bg-red-500 p-3 text-center font-semibold uppercase text-base-content">
              Tournament ended
            </span>
          )}
        </div>
        <div className="rounded-btn mt-5 flex w-full flex-col gap-6 bg-primary px-5 py-7 text-primary-content shadow-lg md:px-8">
          <h1 className="text-4xl font-bold">
            {league && league.name} tournament centre
          </h1>
          <p className="text-base">{league?.description}</p>
          {isOpen && !isStarted && !isEnded && (
            <div className="flex items-end justify-start gap-2">
              {status !== "authenticated" ? (
                <div className="">
                  <button
                    className={`${"btn mt-4 w-max"} btn btn-sm mr-2 text-sm sm:btn-md`}
                    onClick={() => signIn()}
                  >
                    Sign in to create team
                  </button>
                </div>
              ) : !userHasTeam ? (
                <Link href={`./${query.league}/create`}>
                  <button className="btn w-max">Create team</button>
                </Link>
              ) : (
                userHasTeam && (
                  <Link href={`${query.league}/myteam`}>
                    <button className="btn w-max ">my fantasy team</button>
                  </Link>
                )
              )}
            </div>
          )}
          {/* League is live */}
          {userHasTeam && isStarted && (
            <Link href={`${query.league}/myteam`}>
              <button className="btn w-max ">my fantasy team</button>
            </Link>
          )}
          {!userHasTeam && isStarted && (
            <span className="rounded-btn w-fit select-none bg-neutral p-3 text-neutral-content">
              You didnt make a team :/
            </span>
          )}
          {/* League hasnt started */}
          {!isOpen && (
            <div className=" rounded-btn w-fit select-none bg-neutral p-3 text-neutral-content ">
              This league opens on{" "}
              <span className=" font-semibold">
                {league && new Date(league.startDate).toDateString()}
              </span>
            </div>
          )}
          {/* League ended */}
        </div>

        <div className="flex w-full flex-col justify-between 2xl:flex-row 2xl:space-x-4">
          <section className="rounded-btn mt-5 flex h-max flex-col gap-3 text-base-content 2xl:w-[25%]">
            <Link href={`${query.league}/teams`}>
              <button className="btn btn-primary flex flex-row items-center justify-center gap-1 border-0">
                Competing teams <ExternalLink height={20} />
              </button>
            </Link>
            <Link href={`${query.league}/stats`}>
              <button className="btn btn-info flex flex-row items-center justify-center gap-1 border-0 hover:bg-info/75">
                Player Pick Stats <ExternalLink height={20} />
              </button>
            </Link>
            <AllLiveChannels streams={props.streams} />
            {/* 
            <LiveGames /> */}
          </section>

          <section className="rounded-btn my-2 mt-5 h-max text-base-content  2xl:w-[75%]">
            <div className=" flex w-full flex-col gap-3 overflow-x-auto">
              {loadingTable ? (
                <Table data={data} />
              ) : (
                <div className="rounded-2 ju rounded-btn flex w-full animate-pulse flex-row justify-between  bg-base-200 p-2 text-center text-xl font-bold text-base-content">
                  <div
                    role="status"
                    className="w-full max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div
                    role="status"
                    className="w-full max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  </div>
                  <div
                    role="status"
                    className="w-full max-w-md animate-pulse space-y-4 divide-y divide-gray-200 rounded p-4 shadow dark:divide-gray-700 dark:border-gray-700 md:p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="mb-2.5 h-2.5 w-24 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                        <div className="h-2 w-32 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      </div>
                      <div className="h-2.5 w-12 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <h3 className="mt-2 text-base-content">
              Number of Fantasy teams:{" "}
              <span className=" font-bold "> {data.length}</span>
            </h3>
          </section>
        </div>
      </main>
    </>
  );
};

export default LeaguePage;
