import React from "react";
import PlayerGroup from "../../components/playerGroup";
import { playerStats } from "../../components/Player";
import PreviewPlayer, { player } from "../../components/PreviewPlayer";

export async function getStaticProps() {
  const res = await fetch("https://uk-fantasy.vercel.app/api/allTeams");
  const data = await res.json();
  return {
    props: {
      data,
    },
  };
}

export async function getStaticPaths() {
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
  const data = await res.json();
  const paths = data.map((league: { name: string }) => ({
    params: { league: league.name.toLowerCase() },
  }));

  return {
    paths,
    fallback: false,
  };
}

const teams = (props: { data: { teamName: string; Player: player[] }[] }) => {
  return (
    <section className="container mx-auto mb-5 flex min-h-screen flex-col gap-4">
      <div className="prose">
        <h1 className="">All teams</h1>
      </div>

      {props.data?.map((el: { teamName: string; Player: player[] }) => {
        return (
          <PlayerGroup team={el.teamName} key={el.teamName}>
            {el.Player?.map((els) => {
              console.log(els);
              return (
                <PreviewPlayer
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
      })}
    </section>
  );
};

export default teams;
