import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { BiBarChartAlt2 } from "react-icons/bi";
import {
  BsFillCalculatorFill,
  BsFillCollectionFill,
  BsFillFilterSquareFill,
  BsGraphUp,
  BsReverseListColumnsReverse,
} from "react-icons/bs";
import { GrScorecard } from "react-icons/gr";
import { MdOutlineScoreboard } from "react-icons/md";
import Points from "../components/AdminPages/Points";

export async function getServerSideProps({ req }: any) {
  const session = await getSession({ req });
  // const path = "http://localhost:3000/";
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}api/allLeagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }

  const res2 = await fetch(`${path}/api/allAdmins`, {
    method: "GET",
  });
  if (!res.ok) {
    console.error("error");
  }
  const temp = await res2.json();
  const data = await res.json();
  const admins = new Set(temp.map((el: { id: string }) => el.id));

  const isAdmin = admins.has(session?.user?.id);

  if (isAdmin) {
    return {
      props: {
        data,
      },
    };
  } else
    return {
      redirect: {
        destination: "/epic39",
        permanent: false,
      },
    };
}

const Admin = (props: {
  data: [{ id: string; name: string; offical: boolean }];
}) => {
  const [page, setPage] = useState("points");
  return (
    <div
      className={`min-w-screen container flex min-h-screen w-screen max-w-xl flex-row`}
    >
      <div className="rounded-btn my-2 ml-2 w-max bg-neutral p-4 px-6 shadow">
        <ul className="flex flex-col gap-5 text-xl text-neutral-content ">
          <li
            onClick={() => setPage("points")}
            className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus"
          >
            <BsFillCalculatorFill /> Points
          </li>
          <li
            onClick={() => setPage("bonuses")}
            className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus"
          >
            <BsFillCollectionFill />
            Bonuses
          </li>
          <li
            onClick={() => setPage("leagues")}
            className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus"
          >
            <BsReverseListColumnsReverse /> Leagues
          </li>
          <li
            onClick={() => setPage("diognostics")}
            className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus"
          >
            <BsGraphUp /> Diognostics
          </li>
        </ul>
      </div>
      <div
        className={`flex w-11/12 flex-row items-start justify-center gap-4 px-4 py-2`}
      >
        {page === "points" && <Points data={props.data} />}
        {page === "bonuses" && <Bonuses />}
        {page === "leagues" && <Leagues />}
        {page === "diognostics" && <Diognostics />}
      </div>
    </div>
  );
};

const Leagues = () => {
  //TODO
  // Date logic - Check if date has already passed, if start time is before end time and if submit time is before start time
  // Dates need to be converted into prisma supported date format (look up)
  const [newLeagueModel, setNewLeagueModel] = useState(false);

  return (
    <div className="w-full">
      <div className="">
        <button onClick={() => setNewLeagueModel(true)} className="btn">
          Create new League
        </button>
      </div>
      {newLeagueModel && (
        <div className="fixed left-0 top-0 z-50 flex min-h-screen w-screen items-center justify-center overflow-auto bg-black/50">
          <form
            className="rounded-btn absolute flex flex-col gap-4 bg-base-300 p-6"
            action="#"
          >
            <button
              onClick={() => setNewLeagueModel(false)}
              className="btn-sm btn absolute right-2 top-2"
            >
              X
            </button>
            <section className="grid grid-cols-2 gap-4">
              <section className="grid gap-4">
                <h3 className="text-2xl">Basic Info</h3>
                <div className="flex flex-col">
                  <label className="label" htmlFor="">
                    League name
                  </label>
                  <input type="text" className="input" name="" id="" />
                </div>

                <div className="grid">
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      League description
                    </label>
                    <input type="text" className="input" name="" id="" />
                  </div>
                </div>
              </section>
              <section className="grid gap-4">
                <h3 className="text-2xl">Key dates</h3>
                <div className="flex flex-col">
                  <label className="label" htmlFor="">
                    Users can submit teams from
                  </label>
                  <input type="date" className="input" name="" id="" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      League start time
                    </label>
                    <input type="date" className="input" name="" id="" />
                  </div>
                  <div className="flex flex-col">
                    <label className="label" htmlFor="">
                      League end time
                    </label>
                    <input type="date" className="input" name="" id="" />
                  </div>
                </div>
              </section>
            </section>
            <h3 className="text-2xl">Teams & Players competing</h3>
            <section className="mb-2 grid gap-4">
              <div className="grid">
                <label className="label" htmlFor="">
                  Excel file with players and their teams
                </label>
                <input type="file" className="file-input" />
              </div>
              <div className="flex flex-col">
                <label className="label" htmlFor="">
                  Name of targeted sheet
                </label>
                <input type="text" name="" className="input" id="" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="label" htmlFor="">
                    Name of player column
                  </label>
                  <input type="text" name="" className="input" id="" />
                </div>{" "}
                <div className="flex flex-col">
                  <label className="label" htmlFor="">
                    Name of team column
                  </label>
                  <input type="text" name="" className="input" id="" />
                </div>
              </div>
            </section>
            <button className="btn">create new league</button>
          </form>
        </div>
      )}
    </div>
  );
};
const Bonuses = () => {
  return <div className="w-full">Bonuses</div>;
};

const Diognostics = () => {
  return <div className="w-full">Diognostics</div>;
};

export default Admin;
