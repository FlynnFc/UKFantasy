import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import {
  BsFillCalculatorFill,
  BsFillCollectionFill,
  BsGraphUp,
  BsReverseListColumnsReverse,
} from "react-icons/bs";

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
    <div className={`min-w-screen grid min-h-screen w-screen grid-cols-10 `}>
      <div className="rounded-btn col-span-2 my-2 ml-2 w-max bg-neutral p-4 px-6 shadow">
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
          <Link href={`admin/leagues`}>
            <li className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus">
              <BsReverseListColumnsReverse /> Leagues
            </li>
          </Link>
          <li
            onClick={() => setPage("diognostics")}
            className="rounded-btn flex cursor-pointer flex-row items-center gap-4 p-2 hover:bg-neutral-focus"
          >
            <BsGraphUp /> Diognostics
          </li>
        </ul>
      </div>
      <div className={` col-span-8  px-4 py-2`}></div>
    </div>
  );
};

export default Admin;
