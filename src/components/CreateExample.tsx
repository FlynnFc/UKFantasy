// - Teams created are connected to said league
// Fetch teams and players registered in that league
// - Fetch player Teams for leaderboard
// - Fetch Teams for create page
//TODO line 163 if no res then give user error and prompt back to league screen
import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import PlayerGroup from "./playerGroup";
import PlayerGroupSkeleton from "./playerGroupSkeleton";
import SelectedPlayer from "./SelectedPlayer";

import { AnimatePresence } from "framer-motion";
import PlayerGroupSkeletonExample from "./playerGroupSkeletonExample";

export type player = {
  map(
    arg0: (el: {
      id: string;
      image: string;
      name: string;
      price: number;
      rareity: string;
    }) => JSX.Element
  ): unknown;
  id: string;
  name: string;
  price: number;
  rareity: string;
  teamId: string;
  statsId: string;
  image: string;
};

const CreateExample = () => {
  const props = {
    data: [
      {
        id: "clb6rkolq0000j9dwh0qge2ev",
        teamName: "Team 7AM",
        Player: [
          {
            id: "clb6rldmx0002j9dwhvehjk9p",
            name: "Rallen",
            price: 24000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Husky_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fSHVza3lfQ2FyZC5qcGciLCJpYXQiOjE2ODk3MTA1OTksImV4cCI6MTcyMTI0NjU5OX0.gD7E-eILojmWm2gM5v_nHsbQXcFxvHzk3ftk70bmFA8&t=2023-07-18T20%3A03%3A26.963Z",
            rareity: "gold",
            statsId: "",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhi0003j9dw2xp7vagz",
            name: "CRUC1AL",
            price: 22000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_LVN_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fTFZOX0NhcmQuanBnIiwiaWF0IjoxNjg5NzEwNjA4LCJleHAiOjE3MjEyNDY2MDh9.InNlkB11ZS_cuePsUg0iQzyESCcimXSJFvSRmdfK6JU&t=2023-07-18T20%3A03%3A35.745Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhj0005j9dwnl5t10af",
            name: "Thomas",
            price: 23500,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Silence.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fU2lsZW5jZS5qcGciLCJpYXQiOjE2ODk3MTA2MTYsImV4cCI6MTcyMTI0NjYxNn0.dBtlwJKpIrAf_F7AZKGPess6qSYMvK0IO0RB007P87Q&t=2023-07-18T20%3A03%3A44.184Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhj0007j9dwhye4s3zc",
            name: "CYPHER",
            price: 23000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Vacancy_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fVmFjYW5jeV9DYXJkLmpwZyIsImlhdCI6MTY4OTcxMDYyNCwiZXhwIjoxNzIxMjQ2NjI0fQ.FIfSNOt-e0eMGnSypqwhP8qNKGGxsaur_DsnREB3tVU&t=2023-07-18T20%3A03%3A52.177Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhj0009j9dw5aoy6tnl",
            name: "volt",
            price: 22500,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_yz0.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1feXowLmpwZyIsImlhdCI6MTY4OTcxMDYzNSwiZXhwIjoxNzIxMjQ2NjM1fQ.e6MlGpQIVdOlKIjEKwumPloaKaHmTmqI5O1Ea_TCzg8&t=2023-07-18T20%3A04%3A02.854Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
        ],
      },
      {
        id: "clb6rncjx000bj9dwopf23b9z",
        teamName: "UK Legends",
        Player: [
          {
            id: "clb6rrsr8000pj9dw3s2e4pey",
            name: "Sheekey",
            price: 20000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rncjx000bj9dwopf23b9z",
          },
          {
            id: "clb6rrsr9000qj9dwscu1ga2b",
            name: "Mamamia",
            price: 17000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "silver",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rncjx000bj9dwopf23b9z",
          },
          {
            id: "clb6rrsr9000rj9dwe0p0ndnw",
            name: "Mighty Max",
            price: 21000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rncjx000bj9dwopf23b9z",
          },
          {
            id: "clb6rrsr9000sj9dwesa4984z",
            name: "Imoru",
            price: 18000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "silver",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rncjx000bj9dwopf23b9z",
          },
          {
            id: "clb6rrsr9000sj9dw",
            name: "Stayx",
            price: 11000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "bronze",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rncjx000bj9dwopf23b9z",
          },
        ],
      },
      {
        id: "clb6roz48000nj9dwfk86tp0c",
        teamName: "Ross Kemp Bald",
        Player: [
          {
            id: "clb3wvsw70004j9fgpesrc6qg",
            name: "m2k",
            price: 20000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "silver",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6roz48000nj9dwfk86tp0c",
          },
          {
            id: "clb6ugg1y000nj9ygj1b4zxal",
            name: "Edeninho",
            price: 15000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/edeninho.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2VkZW5pbmhvLndlYnAiLCJ0cmFuc2Zvcm1hdGlvbnMiOiIiLCJpYXQiOjE2NzA5NjIwNzQsImV4cCI6MTk4NjMyMjA3NH0.ZoifktgPG8mqq4ff7oP9H7GJd3mTrZMagIal0fHMNZs&t=2022-12-13T20%3A07%3A55.252Z",
            rareity: "bronze",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6roz48000nj9dwfk86tp0c",
          },
          {
            id: "clb6uhqg9000oj9ygt8puq8f2",
            name: "Yenixs",
            price: 18000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "silver",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6roz48000nj9dwfk86tp0c",
          },
          {
            id: "clb6uhqg9000pj9ygmi8oawdl",
            name: "Ross Kemp",
            price: 50000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6roz48000nj9dwfk86tp0c",
          },
          {
            id: "clb6uibb3000qj9ygg7b4q89j",
            name: "Deevil",
            price: 19000,
            image:
              "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/ghost?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzL2dob3N0IiwidHJhbnNmb3JtYXRpb25zIjoiIiwiaWF0IjoxNjcyNTE0ODQ2LCJleHAiOjE5ODc4NzQ4NDZ9.yl_t6TRs1MwbxEPUM919l2TvjGj7AnvnmBFdfDCcwFA&t=2022-12-31T19%3A27%3A42.231Z",
            rareity: "silver",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6roz48000nj9dwfk86tp0c",
          },
        ],
      },
    ],
  };

  const [myTeam, setMyTeam] = useState<JSX.Element[]>([]);
  const [money, setMoney] = useState(100000);
  const [teamFull, setTeamFull] = useState(false);
  const [deletes, setDeletes] = useState("");
  const [teamName, setTeamName] = useState("Your Team");
  const [teamSort, setTeamSort] = useState(true);
  const [allPlayers, setAllPlayers] = useState<player[]>();
  //Ensures Team name is never empty string
  useEffect(() => {
    if (teamName.length < 1) {
      setTeamName("Your Team");
    }
  }, [teamName.length]);

  //Updates total money as user changes players
  useEffect(() => {
    let count = 100000;
    if (myTeam.length === 0) {
      setMoney(count);
      return;
    }
    //Loops through team, player prices take away from total.
    for (let i = 0; i < myTeam.length; i++) {
      count = count - myTeam[i]?.props.price;
    }
    setMoney(count);
  }, [myTeam]);

  //Using this to update on delete I have no idea why react doesnt allow me to access the most recent state when onClick from different component
  useEffect(() => {
    if (deletes.length < 1) {
      return;
    }

    const tempTeam = myTeam;

    for (let index = 0; index < tempTeam.length; index++) {
      const element = tempTeam[index]?.key;
      if (element === deletes) {
        tempTeam.splice(index, 1);
      }
    }

    setMyTeam([...tempTeam]);
    setDeletes("");
    if (tempTeam.length < 5) {
      setTeamFull(false);
    }
  }, [deletes, myTeam]);

  //Sets name to deletes so I know which player to delete
  const PlayerRemove = (data: { name: React.SetStateAction<string> }) => {
    setDeletes(data.name);
  };

  //Adding player to myTeam
  const PlayerSelect = (data: {
    rareity: string;
    name: string;
    price: number;
    img: string;
    id: string;
    playersTeam: string;
  }) => {
    if (!teamFull) {
      if (myTeam.length === 4) {
        setTeamFull(true);
      }
      setMyTeam((prev) => [
        ...prev,
        <SelectedPlayer
          PlayerRemove={PlayerRemove}
          rareity={data.rareity}
          name={data.name}
          price={data.price}
          img={
            "https://wosipkxcwhwqrtnbwdxx.supabase.co/storage/v1/object/sign/players/7AM/7AM_Husky_Card.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwbGF5ZXJzLzdBTS83QU1fSHVza3lfQ2FyZC5qcGciLCJpYXQiOjE2ODk2OTIxNzMsImV4cCI6MTcyMTIyODE3M30.lxJFTt2YYwAh8-fQw1DHDsiYFBmM03xN7ONR7g1VE3o&t=2023-07-18T14%3A56%3A21.181Z"
          }
          key={data.name}
          id={data.id}
          team={myTeam}
          playersTeam={data.playersTeam}
        />,
      ]);
    }
  };

  return (
    <>
      <main className="min-w-screen container rounded-btn m-6 flex h-full select-none flex-col items-end justify-start px-8 py-4 sm:mx-auto">
        <div className="w-full">
          <h2 className="text-center text-3xl leading-snug lg:text-5xl">
            {teamName}
          </h2>
          <div className="mt-4 flex items-end justify-center lg:mt-0 lg:justify-end"></div>
          <div id="stickyContainer" className="sticky top-5 z-10 my-4">
            <PlayerGroupSkeletonExample setTeamName={setTeamName} money={money}>
              {myTeam}
            </PlayerGroupSkeletonExample>
          </div>

          <AnimatePresence>
            {teamSort ? (
              <section className="space-y-6">
                {/* Maps all teams found in DB then inside each team maps all players found in team */}

                {props.data?.map((el) => {
                  return (
                    <PlayerGroup team={el.teamName} key={el.teamName}>
                      {el.Player?.map(
                        (els: {
                          id: string;
                          image: string;
                          name: string;
                          price: number;
                          rareity: string;
                        }) => {
                          return (
                            <Player
                              stats={{
                                hltv: 1,
                                elo: 2,
                                hs: 4,
                                clutchRounds: 6,
                                entryRounds: 8,
                              }}
                              key={els.id}
                              id={els.id}
                              teamFull={teamFull}
                              PlayerSelect={PlayerSelect}
                              moneyLeft={money}
                              rareity={els.rareity}
                              name={els.name}
                              price={els.price}
                              img={els.image}
                              team={myTeam}
                              playersTeam={el.teamName}
                            />
                          );
                        }
                      )}
                    </PlayerGroup>
                  );
                })}
              </section>
            ) : null}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};
export default CreateExample;
