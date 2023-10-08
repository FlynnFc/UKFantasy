import React, { useMemo } from "react";
import PlayerGroup from "../../components/playerGroup";
import { playerStats } from "../../components/Player";
import PreviewPlayer, { player } from "../../components/PreviewPlayer";

export async function getServerSideProps(paths: {
  params: { league: string };
}) {
  // const path = "http://localhost:3000/";
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/teams`, {
    method: "GET",
    headers: { leaguename: paths.params.league },
  });
  const data = await res.json();
  return {
    props: {
      data,
    },
    revalidate: 500,
  };
}

// export async function getStaticPaths() {
//   const path = "https://uk-fantasy.vercel.app";
//   const res = await fetch(`${path}/api/leagues`, { method: "GET" });
//   const data = await res.json();
//   const paths = data.map((league: { name: string }) => ({
//     params: { league: league.name.toLowerCase() },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// }

const Teams = (props: { data: { Teams: [] } }) => {
  const allPlayers = useMemo(() => {
    const players: player[] = [];
    props.data.Teams.forEach((el: { teamName: string; Player: player[] }) => {
      players.push(...el.Player);
    });
    return players;
  }, [props.data.Teams]);

  return (
    <section className="mx-5 ml-8 min-h-screen">
      <div className="prose flex w-full max-w-full flex-col items-end justify-between prose-h1:mb-0 md:flex-row ">
        <h1 className="">All teams</h1>
      </div>
      <div className="mb-2 flex w-full flex-col items-center gap-2 lg:flex-row lg:items-start lg:justify-between">
        <div className=" flex w-full flex-col gap-2">
          {props.data?.Teams.map(
            (el: { teamName: string; Player: player[] }) => {
              return (
                <PlayerGroup team={el.teamName} key={el.teamName}>
                  {el.Player?.map((els) => {
                    return (
                      <PreviewPlayer
                        priceadjust={els.priceadjust}
                        key={els.id}
                        id={els.id}
                        rareity={els.rareity}
                        name={els.name}
                        price={els.price}
                        image={els.image}
                        stats={els.stats}
                      />
                    );
                  })}
                </PlayerGroup>
              );
            }
          )}
        </div>

        <ul className="rounded-btn w-full bg-base-300 p-4 lg:w-52">
          <h3 className="font-bold">Price adjustments</h3>
          {allPlayers.map((el) => {
            return (
              <li
                className="flex flex-row justify-between text-base-content"
                key={el.id}
              >
                {el.name}{" "}
                <span
                  className={`${
                    el.priceadjust > 0
                      ? "text-green-500"
                      : el.priceadjust < 0
                      ? "text-red-500"
                      : "text-base-content"
                  }`}
                >
                  {el.priceadjust}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Teams;
