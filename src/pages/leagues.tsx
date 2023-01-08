//Grey out leagues user is already in
//

import React from "react";

const leagues = () => {
  return (
    <>
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-start p-4">
        <div className="mb-10 w-[80%] rounded-xl bg-info p-6 text-base-100">
          <h1 className="my-2 text-4xl font-bold">All leagues shown here</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            eveniet cupiditate, quia iure libero quam autem dignissimos alias
            accusantium excepturi ab officia. Aliquam quidem reprehenderit
            incidunt cum eum amet voluptates.
          </p>
        </div>
        <div className="flex w-full flex-col items-center space-y-6 lg:grid lg:grid-cols-5 lg:items-baseline">
          <LeagueCard title="epic36" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
          <LeagueCard title="Example" offical={true} />
        </div>
      </main>
    </>
  );
};

const LeagueCard = (props: { title: string; offical: boolean }) => {
  return (
    <div className="m-0 w-[17em] rounded-lg bg-base-content text-base-100">
      <div className="h-40 w-full rounded-t-lg bg-slate-600"></div>
      <div className="p-6">
        <div className="flex items-center justify-center space-x-2">
          <h2 className="text-2xl font-bold ">{props.title}</h2>
          {props.offical && (
            <span className="badge-success badge p-3 font-bold">Official</span>
          )}
        </div>
        <div className="flex w-full">
          <button className="btn-info btn mt-4 w-full"> View</button>
        </div>
      </div>
    </div>
  );
};

export default leagues;
