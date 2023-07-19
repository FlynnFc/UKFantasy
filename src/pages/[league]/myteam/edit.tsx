// - Teams created are connected to said league
// Fetch teams and players registered in that league
// - Fetch player Teams for leaderboard
// - Fetch Teams for create page
//TODO line 163 if no res then give user error and prompt back to league screen
import { getSession, useSession } from "next-auth/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Player, playerStats } from "../../../components/Player";
import PlayerGroup from "../../../components/playerGroup";
import PlayerGroupSkeleton from "../../../components/playerGroupSkeleton";
import SelectedPlayer from "../../../components/SelectedPlayer";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import StandaloneSignIn from "../../../components/StandaloneSignIn";
import Filter from "bad-words";
import MyFilter from "../../../utils/profanityFilter/lib/badwords";
import { Info } from "lucide-react";

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

const myfilter = new MyFilter();
const filter = new Filter();

const Edit = (props: {
  data: {
    Teams: {
      map(arg0: (el: any) => void): React.ReactNode;
      player: player[];
    };
    startDate: string;
    openDate: string;
  };
  data2: { startDate: string; openDate: string; endDate: string };
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
  const [myTeamId, setMyTeamId] = useState("");
  const [originalTeam, setOriginalTeam] = useState();
  const router = useRouter();
  const query = router.query;
  const isStarted = useMemo(() => {
    if (props.data?.startDate)
      return new Date(props.data?.startDate) < new Date();
  }, [props.data?.startDate]);
  const isOpen = useMemo(() => {
    if (props.data?.openDate)
      return new Date(props.data?.openDate) < new Date();
  }, [props.data?.openDate]);

  ///// MY TEAM FETCHING
  useEffect(() => {
    const fetcher = async () => {
      console.log("running");
      const res = await fetch(`/api/myTeam`, {
        method: "GET",
        headers: { id: session?.data?.user?.id as string },
      });
      if (!res.ok) {
        throw new Error("Could not fetch users team");
      }
      const data = await res.json();
      if (data && data.PlayerTeam) {
        const matchedTeam = data.PlayerTeam.map(
          (el: { league: { name: string } }) => {
            if (el.league.name.toLowerCase() === query.league) {
              return el;
            }
          }
        );
        setTeamName(matchedTeam[0].teamName);
        setMyTeamId(matchedTeam[0].id);
        setOriginalTeam(
          matchedTeam[0].SelectedPlayer.map((el: { id: string }) => el.id)
        );
        const players = matchedTeam[0].SelectedPlayer.map((el: any) => (
          <SelectedPlayer
            PlayerRemove={PlayerRemove}
            rareity={el.rareity}
            name={el.name}
            price={el.price}
            img={el.image}
            key={el.name}
            id={el.id}
            team={myTeam}
            stats={el.stats}
            playersTeam={el.playersTeam}
          />
        ));
        setMyTeam(players);
      }
    };
    fetcher();
  }, [session?.data?.user?.id]);

  useEffect(() => {
    if (isStarted) {
      router.push(`/${query.league}`);
    } else if (!isOpen) router.push(`/${query.league}`);
  }, [isOpen, isStarted, query.league, router]);

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
    const allTeams = props.data.Teams;
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
    stats: playerStats;
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
          stats={data.stats}
          playersTeam={data.playersTeam}
        />,
      ]);
    }
  };
  //Submits people in myTeam to DB
  const teamSubmitHandler = async () => {
    try {
      const playerIds = await myTeam.map((el) => {
        return el.props.id;
      });

      const body = await {
        teamName: filter.clean(teamName),
        id: myTeamId,
        originalTeam: originalTeam,
        userId: session.data?.user?.id,
        players: playerIds,
        league: query.league,
      };

      const JSONbody = await JSON.stringify(body);
      const response = await fetch("/api/editTeam", {
        method: "POST",
        body: JSONbody,
      });
      if (response.ok) {
        return response;
      } else throw new Error("Could not submit team!");
    } catch (error) {
      throw error;
    }
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
            <div className="prose mt-10 flex max-w-2xl flex-col gap-2 rounded-lg bg-primary  p-10 text-primary-content prose-h3:my-0 prose-ul:mt-0">
              <h2 className="mb-0 text-3xl font-bold leading-loose text-primary-content">
                Welcome to team editing
              </h2>
              <p className="prose:p:m-0 mb-2 py-2 text-base">
                This is where you will decide who will give you the most points,
                be the most economically efficiant and be the person {`that's`}{" "}
                too expensive. You will have a budget of a £100,000, with this
                you will need to select 5 players.
              </p>
              <ul className="marker:text-primary-content">
                There are 3 simple <b> limitations:</b>
                <li className="text-primary-content">
                  You cannot select more than 2 players per team.
                </li>
                <li>You cannot select the same player twice.</li>
                <li>You cannot spend more than £100,000</li>
              </ul>
              <h3 className="text-xl text-primary-content ">Dynamic Pricing</h3>
              <p>
                The prices of players is <b>dynamic!</b> They will change as
                people make and edit their teams. Players picked less with
                decrease in price and vice versa for players picked the most.
              </p>

              <h2 className="my-0 text-2xl  font-bold leading-loose text-primary-content">
                How do points work?
              </h2>
              <p>
                After each round a player is assesed across multiple
                disciplines. A player is given a certain amount of points based
                on their overall performance. Bonuses points are given based on
                specific sets of criteria{" "}
                {`(You will learn about them when applying bonuses)`}.
              </p>
              <div className="mt-1 w-full">
                <button
                  onClick={() => setIntroModal(false)}
                  className="btn w-full"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        )}
        {submitted && (
          <div className="createModal fixed left-0 top-0 z-30 flex h-screen w-full items-start justify-center overflow-auto">
            <div className="mt-[13rem] w-[65.6%] rounded-lg bg-base-100 p-8 text-base-content">
              <h1 className="text-3xl font-bold leading-loose">
                {`You've edited your team!`}
              </h1>
              <p className="mb-2 py-2">
                {`Congrats you've edited your team! Dont like your team? Feel free to delete it and start over.`}
              </p>
              <h2 className="text-2xl font-bold leading-loose">What now?</h2>
              <p>
                Firstly {`you'll`} want to apply <b>bonuses</b> to your players.
                You can apply/edit/remove bonuses on your <b> team page</b>.{" "}
                {`If you're`} not ready to apply bonuses dont worry, you can
                apply them any time before the tournement starts.
              </p>
              <div className="mr-8 flex justify-end">
                <Link href={`/${query.league}/myteam`}>
                  <button disabled={!submitted} className="btn">
                    Team page
                  </button>
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
                    } else if (teamName.length < 4) {
                      toast.error(
                        "The team name needs to be at least 4 characters"
                      );
                    } else if (myfilter.trickey(teamName) !== null) {
                      toast.error("No naughty words please!");
                    } else submit();
                  }}
                  className="btn-outline btn"
                >
                  Edit Team
                </button>
              )}
            </div>
            <div className="sticky top-2 z-10 my-4">
              <PlayerGroupSkeleton setTeamName={setTeamName} money={money}>
                {myTeam}
              </PlayerGroupSkeleton>
            </div>
            <div className="flex justify-between">
              <select
                defaultValue={"team"}
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
              <button
                onClick={() => {
                  setIntroModal(true);
                }}
                className="btn flex flex-row gap-1"
              >
                Info <Info />
              </button>
            </div>
            <AnimatePresence>
              {teamSort ? (
                <section className="space-y-6">
                  {/* Maps all teams found in DB then inside each team maps all players found in team */}

                  {props.data?.Teams.map((el) => {
                    return (
                      <PlayerGroup team={el.teamName} key={el.teamName}>
                        {el.Player?.map(
                          (els: {
                            id: string;
                            image: string;
                            name: string;
                            price: number;
                            rareity: string;
                            stats: playerStats;
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
                                stats={els.stats}
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
export default Edit;

export async function getServerSideProps(paths: {
  params: { league: string };
}) {
  // const path = "http://localhost:3000/";
  const path = "https://esportsfantasy.app";
  const res = await fetch(`${path}/api/allTeams`, {
    method: "GET",
    headers: { leaguename: paths.params.league },
  });

  const data = await res.json();

  return {
    props: {
      data,
    },
  };
}
