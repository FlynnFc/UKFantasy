// TODO
// Fetch Leaderboard of users that have teams in this league
// New Team page would be [league]/team/[teamid]
// User profile page shows what leagues they are in current/past/upcoming use the https://daisyui.com/components/tab/ component

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import LoginBtn from "../../components/LoginBtn";
import Table from "../../components/Table";
import leagues from "../leagues";
import Head from "next/head";

export async function getStaticProps() {
  const res = await fetch("https://esportsfantasy.app/api/allLeagues");
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 5,
  };
}

export async function getStaticPaths() {
  // const path = "http://localhost:3000/";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
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

const LeaguePage = (props: { data: league[] }) => {
  const session = useSession();
  const { status } = useSession();
  const { query } = useRouter();
  const [createModal, setCreateModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userHasTeam, setUserHasTeam] = useState(false);
  const [data, setData] = useState([]);
  const [loadingTable, setLoadingTable] = useState(true);
  const [league, setLeague] = useState<league>();
  const [leagueOpen, setLeagueOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    const tempData: any = [];
    fetch("/api/allUserTeams")
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
    props.data.forEach((el: { name: string }, i: number) => {
      if (el.name.toLowerCase() === query.league) {
        setLeague(props.data[i]);
      }
    });
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
        <title>{league?.name ?? "League"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="container mx-auto flex min-h-screen flex-col items-start justify-start p-4">
        {createModal && !userHasTeam && status === "authenticated" && (
          <div className="fixed bottom-2 right-2 z-20 rounded-lg bg-base-content p-2">
            <div
              onClick={() => setCreateModal(false)}
              className="absolute right-3 cursor-pointer  text-base-100"
            >
              <b>X</b>
            </div>
            <h2 className="px-7 pb-2 pt-6 text-xl font-semibold text-base-100">
              You have not registered a team for this League!
            </h2>
            <p className="px-7 font-semibold text-base-100">
              To enter this league you need to create a team
            </p>
            <div className="mx-3  flex w-full flex-row justify-start p-6">
              <Link href={`${query.league}/create`}>
                <button
                  onClick={() => setLoading(true)}
                  className="btn-primary btn w-max outline"
                >
                  Create Team
                </button>
              </Link>
            </div>
          </div>
        )}
        {loading && <Loading />}
        <div className="rounded-btn mt-14 flex w-full flex-col gap-4 bg-primary px-5 py-7 text-primary-content shadow-lg">
          <h1 className="text-4xl font-bold">
            {league && league.name} Tournement center
          </h1>
          <p className="text-lg">{league?.description}</p>
          <div className="flex items-end justify-between">
            {status === "unauthenticated" ? (
              <div className="">
                <LoginBtn primary={false} />
              </div>
            ) : !userHasTeam ? (
              <Link href={`./${query.league}/create`}>
                <button className="btn w-max">Create team</button>
              </Link>
            ) : (
              userHasTeam && (
                <Link href={`${query.league}/myteam`}>
                  <button className="btn w-max ">View Team</button>
                </Link>
              )
            )}
          </div>
        </div>

        <div className="flex w-full flex-col justify-between 2xl:flex-row 2xl:space-x-4">
          <section className="rounded-btn my-2 mt-5 h-max bg-base-300 px-0 py-5 text-base-content shadow-lg 2xl:w-[25%]">
            <h2 className="text-center text-xl font-bold leading-none">
              Top Performers
            </h2>

            <ul className="mt-3 flex w-full flex-col items-center justify-center">
              <li className="grid w-full grid-cols-3 grid-rows-1 text-center">
                <b>StayX</b>
                <b>200</b>
                <b className="">1.2</b>
              </li>
              <li className="grid w-full grid-cols-3 grid-rows-1 text-center">
                <b>Vacancey</b>
                <b>195</b>
                <b>1.3</b>
              </li>
            </ul>
          </section>
          <section className="rounded-btn my-2 mt-5 flex justify-center bg-base-300 px-10 pb-10 text-base-content  2xl:w-[75%]">
            <div className=" w-full overflow-x-auto">
              <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
                Scoreboard
              </h2>
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
          </section>
        </div>
      </main>
    </>
  );
};

export default LeaguePage;
