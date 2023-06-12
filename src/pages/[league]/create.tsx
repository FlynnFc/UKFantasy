// - Teams created are connected to said league
// Fetch teams and players registered in that league
// - Fetch player Teams for leaderboard
// - Fetch Teams for create page
//TODO line 163 if no res then give user error and prompt back to league screen
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Player } from "../../components/Player";
import PlayerGroup from "../../components/playerGroup";
import PlayerGroupSkeleton from "../../components/playerGroupSkeleton";
import SelectedPlayer from "../../components/SelectedPlayer";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import StandaloneSignIn from "../../components/StandaloneSignIn";
import Filter from "bad-words";

import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";
import Head from "next/head";
export type player = {
  length: number;
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
  playerTeam: string;
};

const filter = new Filter();

const Create = (props: {
  data: {
    map(arg0: (el: any) => void): React.ReactNode;
    player: player[];
  };
}) => {
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
  const { query } = useRouter();

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
    const allTeams = props.data;
    const allPlayers: player[] = [];

    allTeams.map((el: { Player: any; teamName: string }) => {
      const players = el.Player;
      for (let i = 0; i < players.length; i++) {
        const element = players[i];
        allPlayers.push({ ...element, playerTeam: el.teamName });
      }
      // allPlayers = allPlayers.concat();
    });

    allPlayers.sort((a, b) => {
      return compare(a, b);
    });

    function compare(a: { price: number }, b: { price: number }): number {
      if (order === "ascend") {
        return a.price < b.price ? -1 : 1;
      } else return a.price < b.price ? 1 : -1;
    }
    setAllPlayers(allPlayers);
    return setTeamSort(false);
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
      return setTeamFull(false);
    } else return;
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
          img={data.img}
          key={data.name}
          id={data.id}
          team={myTeam}
          playersTeam={data.playersTeam}
        />,
      ]);
    }
  };
  //Submits people in myTeam to DB
  const teamSubmitHandler = async () => {
    const playerIds = await myTeam.map((el) => {
      return el.props.id;
    });

    const body = await {
      teamName: filter.clean(teamName),
      userId: session.data?.user?.id,
      players: playerIds,
      league: query.league,
    };

    const JSONbody = await JSON.stringify(body);
    const response = await fetch("/api/submitTeam", {
      method: "POST",
      body: JSONbody,
    });
    return response;
  };

  const submitSuccess = () => {
    setTimeout(() => setSubmitted(true), 200);
    return <b>Team Submitted!</b>;
  };

  const submit = () => {
    toast.promise(teamSubmitHandler(), {
      loading: "Submiting your team...",
      success: submitSuccess(),
      error: <b>We could not add your team</b>,
    });
  };

  //Checks if user has already submitted a team
  useEffect(() => {
    const teamChecker = async () => {
      setLoading(true);
      if (session.data?.user?.id) {
        const id = session.data?.user?.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          //add error tell user to go back to league page
          setSubmitted(false);
        }
        const data = await res.json();

        if (!data.PlayerTeam.length) {
          setSubmitted(false);
        } else {
          for (let i = 0; i < data.PlayerTeam.length; i++) {
            const el = data.PlayerTeam[i];
            const elLeague = el.league.name.toLowerCase();
            const currentLeague = query.league?.toString().toLowerCase();
            if (elLeague === currentLeague) {
              setSubmitted(true);
              break;
            }
          }
        }
      } else return "error";

      setTimeout(() => setLoading(false), 400);
    };
    teamChecker();
  }, [query.league, session.data?.user?.id]);

  return (
    <>
      <Head>
        <title>Create your team</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-w-screen container flex h-full min-h-[88.3vh]  max-w-7xl select-none flex-col items-end justify-start  p-4 sm:mx-auto">
        <Toaster position="top-center" />
        {introModal && (
          <div className="createModal fixed left-0 top-0 z-20 flex h-screen w-full items-start justify-center overflow-auto">
            <div className="mt-32 w-[80%] rounded-lg bg-primary p-10 text-primary-content">
              <h1 className="text-3xl font-bold leading-loose">
                Welcome to team creatation
              </h1>
              <p className="mb-2 py-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                accusamus expedita facere ex voluptatem exercitationem veniam
                itaque est repellendus libero neque, culpa distinctio aliquam
                dolor atque natus esse non nisi!
              </p>
              <h2 className="text-2xl font-bold leading-loose">
                How do points work?
              </h2>
              <p>
                Lorem, ipsm dolor sit amet consectetur adipisicing elit. Vero
                accusamus expedita facere ex voluptatem exercitationem veniam
                itaque est repellendus libero neque, culpa distinctio aliquam
                dolor atque natus esse non nisi!
              </p>
              <div className="mr-8 flex justify-end">
                <button onClick={() => setIntroModal(false)} className="btn">
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
        {submitted && (
          <div className="createModal fixed left-0 top-0 z-30 flex h-screen w-full items-start justify-center overflow-auto">
            <div className="mt-32 w-[80%] rounded-lg bg-base-100 p-10 text-base-content">
              <h1 className="text-3xl font-bold leading-loose">
                {`You've submitted your team!`}
              </h1>
              <p className="mb-2 py-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
                accusamus expedita facere ex voluptatem exercitationem veniam
                itaque est repellendus libero neque, culpa distinctio aliquam
                dolor atque natus esse non nisi!
              </p>
              <h2 className="text-2xl font-bold leading-loose">What now?</h2>
              <p>
                Lorem, ipsm dolor sit amet consectetur adipisicing elit. Vero
                accusamus expedita facere ex voluptatem exercitationem veniam
                itaque est repellendus libero neque, culpa distinctio aliquam
                dolor atque natus esse non nisi!
              </p>
              <div className="mr-8 flex justify-end">
                <Link href={`/${query.league}/myteam`}>
                  <button className="btn">Take me there</button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="fixed left-0 top-0 z-10 flex h-screen w-full items-center justify-center overflow-auto bg-base-100">
            <div className="animate-bounce rounded-lg bg-base-300 p-5 text-base-content">
              <h1 className=" text-3xl font-bold leading-loose">
                {session.data ? `Loading` : <StandaloneSignIn />}
              </h1>
            </div>
          </div>
        )}
        {session.data && (
          <div className="w-full">
            <h2 className="text-center text-3xl leading-snug lg:text-5xl">
              {teamName}
            </h2>
            <div className="mt-4 flex items-end justify-center lg:mt-0 lg:justify-end">
              {!submitted && (
                <button
                  disabled={!teamFull}
                  onClick={() => {
                    if (teamName === "Your Team") {
                      toast.error("Please enter a team name");
                      return;
                    } else if (teamName.length < 5) {
                      toast.error(
                        "The team name needs to be at least 5 characters"
                      );
                    } else if (teamName !== filter.clean(teamName)) {
                      toast.error("No naughty words please!");
                    } else submit();
                  }}
                  className="btn-outline btn"
                >
                  Submit Team
                </button>
              )}
            </div>
            <div className="sticky top-2 z-10 my-4">
              <PlayerGroupSkeleton setTeamName={setTeamName} money={money}>
                {myTeam}
              </PlayerGroupSkeleton>
            </div>
            <select
              defaultValue={"DEFAULT"}
              onChange={(e) => {
                sorter(e.target.value);
              }}
              className="select-bordered select mb-3 w-full max-w-xs text-lg"
            >
              <option value={"DEFAULT"} disabled>
                Sort by
              </option>
              <option value={"team"}>Teams</option>
              <option value={"ascend"}>Cheapest</option>
              <option value={"descend"}>Most Expensive</option>
            </select>
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
                                playersTeam={el.teamName}
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
                        playersTeam={els.playerTeam}
                      />
                    );
                  })}
                </section>
              )}
            </AnimatePresence>
          </div>
        )}
      </main>
    </>
  );
};
export default Create;

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
