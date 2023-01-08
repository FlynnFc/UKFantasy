//Grey out leagues user is already in
// Fetch all leagues --done
// using Hero from daisy Add a featured League?

import Link from "next/link";
import React from "react";

export async function getServerSideProps() {
  const path = "http://localhost:3000/";
  // const path = "https://uk-fantasy.vercel.app/";
  const res = await fetch(`${path}api/allLeagues`, { method: "GET" });
  if (!res.ok) {
    console.error("error");
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
  console.log(props.data);
  return (
    <>
      <main className="container mx-auto flex min-h-screen w-[78%] flex-col items-center justify-start p-4">
        <div className="hero rounded-xl">
          <div className="flex-col items-center justify-evenly lg:flex-row">
            <div>
              <h1 className="text-5xl font-bold text-base-content">
                Featured League
              </h1>
              <div className="shad mt-4 rounded-xl bg-primary p-6 text-primary-content shadow-lg">
                <h2 className="py-4 text-4xl font-bold">Epic 36</h2>
                <p className="py-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas
                  neque ad nisi commodi totam, dolorem inventore repellat esse
                  beatae accusantium enim minus ipsam libero ab, temporibus
                  aliquam dolor eaque quidem!
                </p>{" "}
                <button className="btn">Take a look</button>
              </div>
            </div>
          </div>
        </div>
        <h2 className="mt-4 w-full border-b pb-2 text-left text-3xl font-bold">
          All leagues
        </h2>
        <div className="mt-2 flex w-full flex-col items-center space-y-6 lg:grid lg:grid-cols-5 lg:items-baseline">
          {props.data.map((el) => {
            return (
              <LeagueCard key={el.id} title={el.name} offical={el.offical} />
            );
          })}
          <LeagueCard title="epic36" offical={true} />
          <LeagueCard title="Example" offical={true} />
        </div>
      </main>
    </>
  );
};

const LeagueCard = (props: { title: string; offical: boolean }) => {
  return (
    <div className="m-0 w-[17em] rounded-lg bg-base-content text-base-100 shadow-xl">
      <div className="h-40 w-full rounded-t-lg bg-slate-600"></div>
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
