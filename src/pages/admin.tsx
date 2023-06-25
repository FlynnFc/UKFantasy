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
import Bonuses from "../components/AdminPages/Bonuses";

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
  const admins = new Set(temp.map((el: { email: string }) => el.email));

  const isAdmin = admins.has(session?.user?.email);

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
        <h1 className="mb-4 flex flex-row items-center justify-start gap-2 text-left text-2xl">
          <BiBarChartAlt2 /> Dashboard
        </h1>
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
          <li className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus">
            <BsReverseListColumnsReverse /> Leagues
          </li>
          <li className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus">
            <BsGraphUp /> Diognostics
          </li>
        </ul>
      </div>
      <div
        className={`flex w-11/12 flex-row items-start justify-center gap-4 px-4 py-2`}
      >
        {page === "points" && <Points data={props.data} />}
        {page === "bonuses" && <Bonuses />}
      </div>
    </div>
  );
};

export default Admin;
