// - Teams created are connected to said league
// Fetch teams and players registered in that league
// - Fetch player Teams for leaderboard
// - Fetch Teams for create page
//TODO line 163 if no res then give user error and prompt back to league screen
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Player } from "./Player";
import PlayerGroup from "./playerGroup";
import PlayerGroupSkeleton from "./playerGroupSkeleton";
import SelectedPlayer from "./SelectedPlayer";
import toast, { Toaster } from "react-hot-toast";

import { AnimatePresence } from "framer-motion";
import Head from "next/head";

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
        teamName: "Into the breach",
        Player: [
          {
            id: "clb6rldmx0002j9dwhvehjk9p",
            name: "Rallen",
            price: 24000,
            image:
              "https://img-cdn.hltv.org/playerbodyshot/I1ABQFlv-1vKh0QfZqgJ2t.png?ixlib=java-2.1.0&w=400&s=a87f39842f0056664d21ced21c658e08",
            rareity: "gold",
            statsId: null,
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhi0003j9dw2xp7vagz",
            name: "CRUC1AL",
            price: 22000,
            image:
              "https://img-cdn.hltv.org/playerbodyshot/NQ9EkN_JfInD-s2xphdfy9.png?ixlib=java-2.1.0&w=400&s=83ffe82afd8ab13cc2511c3d61d37a00",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhj0005j9dwnl5t10af",
            name: "Thomas",
            price: 23500,
            image:
              "https://img-cdn.hltv.org/playerbodyshot/19lZmEgLlFpQl0FP_89OEr.png?ixlib=java-2.1.0&w=400&s=ce6a66e60feacb2cbe0a6161a77f4ff2",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhj0007j9dwhye4s3zc",
            name: "CYPHER",
            price: 23000,
            image:
              "https://img-cdn.hltv.org/playerbodyshot/2O8iemGgkX6tUOUzaZrRtc.png?ixlib=java-2.1.0&w=400&s=d4568a843a84deae87421c508b5a01b6",
            rareity: "gold",
            statsId: "clb3wv98b0000j9fgp1eqw0xj",
            teamId: "clb6rkolq0000j9dwh0qge2ev",
          },
          {
            id: "clb6rmzhj0009j9dw5aoy6tnl",
            name: "volt",
            price: 22500,
            image:
              "https://img-cdn.hltv.org/playerbodyshot/UWZQElkD5-inGTM72NGJXU.png?ixlib=java-2.1.0&w=400&s=763997cba47f7fe1c765ded00e2cd181",
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
            name: "LVN",
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
            rareity: "silver",
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
    ],
  };

  const [introModal, setIntroModal] = useState(true);
  const [myTeam, setMyTeam] = useState<JSX.Element[]>([]);
  const [money, setMoney] = useState(100000);
  const [teamFull, setTeamFull] = useState(false);
  const [deletes, setDeletes] = useState("");
  const session = useSession();
  const [submitted, setSubmitted] = useState(false);
  const [teamName, setTeamName] = useState("Your Team");
  const [loading, setLoading] = useState(false);
  const [teamSort, setTeamSort] = useState(true);
  const [allPlayers, setAllPlayers] = useState<player[]>();
  //Ensures Team name is never empty string
  useEffect(() => {
    if (teamName.length < 1) {
      setTeamName("Your Team");
    }
  }, [teamName.length]);

  const sorter = (order: string) => {
    if (order === "team") {
      setTeamSort(true);
      return;
    }
    setAllPlayers(allPlayers);
    setTeamSort(false);
  };

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
    console.log("running effect");
    const tempTeam = myTeam;
    console.log("looping to find player");
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
    console.log("Deleted player", data.name, deletes);
  };

  //Adding player to myTeam
  const PlayerSelect = (data: {
    rareity: string;
    name: string;
    price: number;
    img: string;
    id: string;
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
          img={data.img}
          key={data.name}
          id={data.id}
          team={myTeam}
        />,
      ]);
    }
  };

  return (
    <>
      <main className="min-w-screen container rounded-btn m-6 flex h-full min-h-[88.3vh] w-max select-none flex-col items-end justify-start px-8 py-4 sm:mx-auto">
        <div className="w-full">
          <h2 className="text-center text-3xl leading-snug lg:text-5xl">
            {teamName}
          </h2>

          <div id="stickyContainer" className="sticky top-5 z-10 my-4">
            <PlayerGroupSkeleton setTeamName={setTeamName} money={money}>
              {myTeam}
            </PlayerGroupSkeleton>
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
                            />
                          );
                        }
                      )}
                    </PlayerGroup>
                  );
                })}
              </section>
            ) : (
              <section className="flex flex-wrap items-start justify-start gap-5 rounded-lg bg-base-300 p-6">
                {allPlayers?.map((els) => {
                  return (
                    <Player
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
                    />
                  );
                })}
              </section>
            )}
          </AnimatePresence>
        </div>
      </main>
    </>
  );
};
export default CreateExample;
