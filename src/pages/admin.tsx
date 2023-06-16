import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

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
  const admins = new Set(temp.map((el: { id: string }) => el.id));
  const data = await res.json();

  if (admins.has(session?.user?.id)) {
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
  return (
    <div className={`container mx-auto min-h-screen w-full max-w-xl`}>
      <div
        className={`flex-wrap items-start justify-center gap-10 p-4 md:grid  md:grid-rows-2`}
      >
        {props.data.map((el) => {
          return (
            <div
              key={el.id}
              className="rounded-btn flex h-min min-w-max flex-col gap-2 bg-base-content p-4 uppercase text-base-100 shadow"
            >
              <h1 className="text-center text-2xl">{el.name}</h1>
              <div className="flex flex-row gap-2">
                <Link passHref href={`/${el.name.toLowerCase()}/points`}>
                  <a className="btn-sm btn cursor-pointer" target="_blank">
                    Apply points
                  </a>
                </Link>
                <Link passHref href={`/${el.name.toLowerCase()}/event`}>
                  <a
                    className="btn-disabled btn-sm btn cursor-pointer  text-base-100/50"
                    target="_blank"
                  >
                    Edit event details
                  </a>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Admin;
