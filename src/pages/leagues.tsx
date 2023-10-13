//Grey out leagues user is already in

import Image from "next/image";
import Link from "next/link";
import React from "react";
import FeaturedLeague from "../components/FeaturedLeague";

export async function getServerSideProps() {
  // const path = "http://localhost:3000";
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/leagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }
  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}

const leagues = (props: {
  data: [{ id: string; name: string; offical: boolean }];
}) => {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-start justify-start p-4">
        <div className="hero">
          <div className="flex-col items-center justify-evenly lg:flex-row">
            <FeaturedLeague />
          </div>
        </div>
        <h2 className="mt-10 w-full border-b pb-2 text-left text-4xl font-bold">
          All leagues
        </h2>
        <div className="mt-2 w-full items-end space-y-2 sm:flex sm:flex-wrap">
          {props.data.map((el) => {
            if (!el.offical) return;
            return (
              <LeagueCard key={el.id} title={el.name} offical={el.offical} />
            );
          })}
        </div>
      </main>
    </>
  );
};

const LeagueCard = (props: { title: string; offical: boolean }) => {
  return (
    <div className="rounded-btn mx-1 h-[304px]  w-max bg-base-content text-base-100 shadow-xl sm:min-w-[15rem]">
      <div className="h-40 w-full bg-slate-600"></div>
      <div className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-2xl font-bold ">{props.title}</h2>
          {props.offical && props.title === "Demo" ? (
            <span className="badge badge-accent p-3 font-bold">Demo</span>
          ) : (
            props.offical && (
              <span className="badge badge-success p-3 font-bold">
                Official
              </span>
            )
          )}
        </div>
        <div className="flex w-full">
          <Link target={"_blank"} href={`./${props.title.toLowerCase()}`}>
            <button className="btn btn-primary mt-4 w-full"> View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default leagues;
