// TODO
// Sign in callback goes to homepage
// Create team goes to [league]/create
// - Teams created are connected to said league
// Fetch teams and players registered in that league
// - Fetch player Teams for leaderboard
// - Fetch Teams for create page
// Fetch Leaderboard of users that have teams in this league
// New Team page would be [league]/team/[teamid]
// User profile page shows what leagues they are in current/past/upcoming use the https://daisyui.com/components/tab/ component

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../components/Loading";
import LoginBtn from "../../components/LoginBtn";
import Table from "../../components/Table";

export async function getStaticProps() {
  // const path = "http://localhost:3000";
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}/api/allUserTeams`, { method: "GET" });
  if (!res.ok) {
    console.error("error");
    return;
  }
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}/api/allUserTeams`, { method: "GET" });
  const data = await res.json();
  const paths = data.map((league: { name: string }) => {
    params: {
      name: league.name;
    }
  });
  return { paths, fallback: "blocking" };
}

type UserProps = {
  User: [{ id: string }];
};

const LeaguePage = (props: { data: any }) => {
  const session = useSession();
  const { query } = useRouter();
  const [createModal, setCreateModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [userHasTeam, setUserHasTeam] = useState(false);
  const [data, setData] = useState([]);

  //Filters teams so it only shows user submitted teams from this league
  useEffect(() => {
    console.log(props.data);
    const tempData: any = [];
    props.data.forEach(
      (el: { league: { name: { toLowerCase: () => ParsedUrlQuery } }[] }) => {
        console.log(el.league[0]?.name.toLowerCase());
        console.log(query.league);
        if (el.league[0]?.name.toLowerCase() === query.league) {
          tempData.push(el);
        } else return;
      }
    );
    return setData(tempData);
  }, [props.data, query.league]);

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
        if (element?.User[0].id === session.data?.user?.id) {
          setUserHasTeam(true);
          return;
        }
      }

      setUserHasTeam(false);
    }
  }, [data, session.data?.user?.id]);

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-start justify-start p-4">
      {createModal && session.data ? (
        <div className="fixed bottom-2 right-2 z-20 rounded-lg bg-base-content p-2">
          <div
            onClick={() => setCreateModal(false)}
            className="absolute right-3 cursor-pointer  text-base-100"
          >
            <b>X</b>
          </div>
          <h2 className="px-7 pt-6 pb-2 text-xl font-semibold text-base-100">
            You have not registered a team for this League!
          </h2>
          <p className="px-7 font-semibold text-base-100">
            To enter this league you need to create a team
          </p>
          <div className="mx-3  flex w-full flex-row justify-start p-6">
            <Link href="/create">
              <button
                onClick={() => setLoading(true)}
                className="btn-primary btn w-max outline"
              >
                Create Team
              </button>
            </Link>
          </div>
        </div>
      ) : null}
      {loading && <Loading />}
      <div className="mt-14 flex flex-col rounded-lg bg-primary px-10 pb-10 text-base-100 shadow-lg">
        <h1 className="my-8 text-4xl font-bold">
          {query.league} Tournement center
        </h1>
        <p className="text-lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
          soluta quo qui atque natus et impedit maxime, explicabo libero
          dignissimos saepe minima mollitia ipsa. Minima eveniet inventore
          dolorum unde assumenda!
        </p>
        {!session.data ? (
          <div className="">
            <LoginBtn primary={false} />
          </div>
        ) : !userHasTeam ? (
          <Link href={`./${query.league}/create`}>
            <button className="btn mt-4 w-max">Create team</button>
          </Link>
        ) : (
          <Link href="/myteam">
            <button className="btn mt-4 w-max ">View Team</button>
          </Link>
        )}
      </div>

      <div className="flex w-full flex-col justify-between 2xl:flex-row 2xl:space-x-4">
        <section className="my-2 mt-5 h-max rounded-lg bg-base-300 py-5 px-0 text-base-content shadow-lg 2xl:w-[25%]">
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
        <section className="my-2 mt-5 flex justify-center rounded-lg bg-base-300 px-10 pb-10 text-base-content  2xl:w-[75%]">
          <div className=" w-full overflow-x-auto">
            {/* <table className="table w-full font-semibold">
              <thead>
                <tr>
                  <th></th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Rol</th>
                  <th>Points</th>
                  <th>Total Points</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>Littel, Schaden and Vandervort</td>
                  <td>Canada</td>
                  <td>12/16/2020</td>
                </tr>
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Zemlak, Daniel and Leannon</td>
                  <td>United States</td>
                  <td>12/5/2020</td>
                </tr>
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Carroll Group</td>
                  <td>China</td>
                  <td>8/15/2020</td>
                </tr>
                <tr>
                  <th>4</th>
                  <td>Marjy Ferencz</td>
                  <td>Office Assistant I</td>
                  <td>Rowe-Schoen</td>
                  <td>Russia</td>
                  <td>3/25/2021</td>
                </tr>
                <tr>
                  <th>5</th>
                  <td>Yancy Tear</td>
                  <td>Community Outreach Specialist</td>
                  <td>Wyman-Ledner</td>
                  <td>Brazil</td>
                  <td>5/22/2020</td>
                </tr>
                <tr>
                  <th>6</th>
                  <td>Irma Vasilik</td>
                  <td>Editor</td>
                  <td>Wiza, Bins and Emard</td>
                  <td>Venezuela</td>
                  <td>12/8/2020</td>
                </tr>
                <tr>
                  <th>7</th>
                  <td>Meghann Durtnal</td>
                  <td>Staff Accountant IV</td>
                  <td>Schuster-Schimmel</td>
                  <td>Philippines</td>
                  <td>2/17/2021</td>
                </tr>

                <tr>
                  <th>9</th>
                  <td>Lesya Tinham</td>
                  <td>Safety Technician IV</td>
                  <td>Turner-Kuhlman</td>
                  <td>Philippines</td>
                  <td>2/21/2021</td>
                </tr>
                <tr>
                  <th>10</th>
                  <td>Zaneta Tewkesbury</td>
                  <td>VP Marketing</td>
                  <td>Sauer LLC</td>
                  <td>Chad</td>
                  <td>6/23/2020</td>
                </tr>
              </tbody>
            </table> */}
            <h2 className="mb-4 mt-4 text-center text-2xl font-bold">
              Scoreboard
            </h2>
            {data && <Table data={data} />}
          </div>
        </section>
      </div>
    </main>
  );
};

export default LeaguePage;
