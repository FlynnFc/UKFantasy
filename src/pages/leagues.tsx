//Grey out leagues user is already in

import Link from "next/link";
import React from "react";
import FeaturedLeague from "../components/FeaturedLeague";

export async function getStaticProps() {
  // const path = "http://localhost:3000/";
  const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}api/allLeagues`, { method: "GET" });
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
        <div className="hero rounded-xl">
          <div className="flex-col items-center justify-evenly lg:flex-row">
            <FeaturedLeague />
          </div>
        </div>
        <h2 className="mt-10 w-full border-b pb-2 text-left text-4xl font-bold">
          All leagues
        </h2>
        <div className="mt-2 w-full items-end space-y-2 sm:flex sm:flex-wrap">
          {props.data.map((el) => {
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
      <div className="rounded-t-btn h-40 w-full bg-slate-600"></div>
      <div className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-2xl font-bold ">{props.title}</h2>
          {props.offical && (
            <span className="badge-success badge p-3 font-bold">Official</span>
          )}
        </div>
        <div className="flex w-full">
          <Link target={"_blank"} href={`./${props.title.toLowerCase()}`}>
            <button className="btn-primary btn mt-4 w-full"> View</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default leagues;
