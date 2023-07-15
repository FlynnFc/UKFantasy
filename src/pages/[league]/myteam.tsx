import { useSession } from "next-auth/react";
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../components/Loading";
import { ImBin, ImTwitter, ImDice } from "react-icons/im";
import { FiArrowDownRight } from "react-icons/fi";
import { FiShare } from "react-icons/fi";
import { MyPlayer } from "../../components/myPlayer";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import Table from "../../components/Table";
import InsightsTable from "../../components/InsightsTable";
type bonus = {
  name: string;
  description: string;
};

export type player = {
  bonusPoint: { value: number }[];
  id: string;
  name: string;
  price: number;
  rareity: string;
  teamId: string;
  statsId: string;
  image: string;
  points: { value: number }[];
  bonus: { name: string; description: string };
};

export type teamProps = {
  id: string;
  points: string;
  teamName: string;
  SelectedPlayer: player[];
};

export async function getStaticProps(paths: { params: { league: string } }) {
  const path = "http://localhost:3000/";
  // const path = "https://uk-fantasy.vercel.app/";

  const res = await fetch(`${path}api/allBonuses`, { method: "GET" });
  if (!res.ok) {
    console.error("error", res);
    return;
  }
  const data = await res.json();

  const res2 = await fetch(`${path}/api/getLeague`, {
    method: "GET",
    headers: { leagueName: paths.params.league },
  });
  const data2 = await res2.json();

  return {
    props: {
      data,
      data2,
    },
  };
}

export async function getStaticPaths() {
  const path = "https://uk-fantasy.vercel.app";
  const res = await fetch(`${path}/api/allLeagues`, { method: "GET" });
  const data = await res.json();
  const paths = data.map((league: { name: string; id: string }) => {
    return {
      params: { league: league.name.toLowerCase() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

const Myteam = (props: {
  data: bonus[];
  leagueId: string;
  data2: { startDate: string };
}) => {
  const { status, data: session } = useSession();
  const [team, setTeam] = useState<teamProps>();
  const [serverTeam, setServerTeam] = useState<teamProps>();
  const { query } = useRouter();
  const router = useRouter();
  const [leagueName, setLeagueName] = useState("");
  const [bonusDesc, setBonusDesc] = useState(
    "or you can Drag and drop a bonus onto the desired player"
  );
  const [bonusName, setBonusName] = useState(
    `Click a bonus for more details & Drag the bonus to apply`
  );
  const [allBonuses, setAllBonuses] = useState<bonus[]>([]);
  const [userNeedsHelp, setUserNeedsHelp] = useState(false);

  const isStarted = useMemo(() => {
    if (props.data2?.startDate)
      return new Date(props.data2?.startDate) < new Date();
  }, [props.data2?.startDate]);

  useEffect(() => {
    setUserNeedsHelp(
      localStorage.getItem("UserTips") === "false" ? false : true
    );
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`/${query.league}`);
    } else return;
  }, [query.league, router, status]);
  useEffect(() => {
    const fetcher = async () => {
      if (session?.user?.id && query.league) {
        const id = session.user.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.error("error");
        }
        const data = await res.json();
        for (let i = 0; i < data.PlayerTeam.length; i++) {
          if (data.PlayerTeam[i].league.name.toLowerCase() === query.league) {
            setLeagueName(data.PlayerTeam[i].league.name);
            const allPlayers = data.PlayerTeam[i];
            setServerTeam(structuredClone(allPlayers));
            setTeam(structuredClone(allPlayers));

            return;
          }
        }
      } else return "error";
    };
    fetcher();
  }, [query.league, session]);

  useEffect(() => {
    if (session?.user?.id && query.league) {
      setAllBonuses([...props.data]);
    }
  }, [props.data, query.league, session?.user?.id]);

  const linkSetter = () => {
    const path: string = team?.id as string;
    const host = `https://esportsfantasy.app/${query.league}/team/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };

  const teamDeleter = async () => {
    if (session?.user?.id && team?.id) {
      const res = await fetch("/api/deleteTeam", {
        method: "DELETE",
        headers: { id: team.id },
      });
      if (!res.ok) {
        //add error tell user to go back to league page
        toast.error("Could not delete");
      } else {
        router.push(`/${query.league}`);
      }
    }
  };
  const handleOnDrag = (
    e: React.DragEvent,
    Identifier: string,
    index: number
  ) => {
    e.dataTransfer.setData("Identifier", Identifier);
    e.dataTransfer.setData("BonusIndex", index.toString());
  };

  const handleOnDrop = (e: React.DragEvent, i: number) => {
    const Identifier = e.dataTransfer.getData("Identifier");
    const Index = parseInt(e.dataTransfer.getData("BonusIndex"));
    //TODO Figure out this type error
    setTeam((prev: any) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prev!.SelectedPlayer[i]!.bonus = {
        name: Identifier,
        description: allBonuses[Index]?.description,
      };

      return { ...prev };
    });
  };

  const handleBonusDelete = (i: number) => {
    setTeam((prev: any) => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prev!.SelectedPlayer[i]!.bonus = null;

      return { ...prev };
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const HandleBonusSubmit = async () => {
    const data = { ...team, id: session?.user?.id, league: query.league };
    if (team) {
      const JSONbody = await JSON.stringify(data);
      const res = await fetch("/api/updateTeamBonuses", {
        method: "POST",
        body: JSONbody,
      });
      const load = toast.loading("updating...");
      if (!res.ok) {
        //add error tell user to go back to league page
        toast.dismiss(load);
        toast.error("Could not update team");
      } else {
        toast.dismiss(load);
        toast.success("Bonuses applied");
        router.reload();
      }
    }
  };

  return (
    <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <Toaster position="bottom-left" />
      {serverTeam ? (
        <div className="flex flex-col items-center justify-center ">
          <header className="flex flex-col items-center space-x-2">
            <div className="flex flex-row ">
              <h1 className="text-4xl">{serverTeam.teamName}</h1>
              <button
                onClick={linkSetter}
                className="btn-ghost rounded-btn mx-2  mb-1 p-2 text-2xl transition-all"
              >
                <FiShare className="" />
              </button>
            </div>
          </header>

          <input
            type="checkbox"
            id="my-modal"
            className="modal-toggle bg-red-500"
          />
          <div className="modal">
            <div className="modal-box">
              <h3 className="text-lg font-bold">
                Are you sure you want to delete your team?
              </h3>
              <p>After deleting you can never get it back!</p>
              <div className="modal-action flex w-full justify-end">
                <label
                  htmlFor="my-modal"
                  onClick={teamDeleter}
                  className="btn-error btn"
                >
                  Yes, get rid of it
                </label>
                <label htmlFor="my-modal" className="btn-info btn">
                  {`No I'll keep it`}
                </label>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end">
            <div className="flex w-full flex-row items-center justify-between">
              <Link href={`/${query.league}`}>
                <button className="btn-ghost rounded-btn my-1 w-fit cursor-pointer p-2 text-2xl text-base-content transition">
                  League page
                </button>
              </Link>
              {!isStarted && (
                <div>
                  <div
                    className="tooltip"
                    data-tip={userNeedsHelp ? null : "Edit player bonuses"}
                  >
                    {userNeedsHelp && (
                      <div className="rounded-btn absolute bottom-[2.6rem] right-10 hidden w-48 flex-col bg-info p-2 text-base text-info-content md:flex">
                        <p>Make sure you apply bonuses to your players!</p>
                        <button
                          onClick={() => {
                            localStorage.setItem("UserTips", "false");
                            setUserNeedsHelp(false);
                          }}
                          className="btn-sm btn text-white"
                        >
                          got it
                        </button>
                        <span className="absolute bottom-4 right-4 text-white">
                          <FiArrowDownRight />
                        </span>
                      </div>
                    )}
                    <button
                      onClick={() => {
                        localStorage.setItem("UserTips", "false");
                        setUserNeedsHelp(false);
                      }}
                      className="btn-ghost rounded-btn my-1 w-fit cursor-pointer  p-2 text-2xl text-primary transition"
                    >
                      <label className="cursor-pointer" htmlFor="bonus">
                        <ImDice />
                      </label>
                    </button>
                  </div>
                  <div className="tooltip" data-tip="Delete team">
                    <button className="btn-ghost rounded-btn my-1 h-fit w-fit cursor-pointer  p-2 text-2xl text-error transition">
                      <label className="cursor-pointer" htmlFor="my-modal">
                        <ImBin />
                      </label>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="flex h-auto flex-col items-stretch justify-between space-y-2 rounded-lg bg-base-300 p-6 sm:max-w-[80vw] sm:flex-row sm:space-x-4 sm:space-y-0">
              {serverTeam &&
                serverTeam.SelectedPlayer?.map((el) => {
                  return (
                    <MyPlayer
                      key={el.name}
                      name={el.name}
                      price={el.price}
                      rareity={el.rareity}
                      img={el.image}
                      bonus={el.bonus}
                      index={0}
                      points={el.points}
                      deleteBonus={handleBonusDelete}
                      bonusEdit={false}
                    />
                  );
                })}
            </div>
          </div>
          <h2 className="my-5 text-left text-4xl">Insights</h2>
          <section className="w-fit rounded-xl border-2 border-base-content ">
            <InsightsTable serverTeam={serverTeam} />
          </section>
        </div>
      ) : (
        <Loading />
      )}

      <input type="checkbox" id="bonus" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box flex h-5/6 max-h-full w-11/12 max-w-full select-none flex-col items-center justify-between">
          <div className="flex flex-row items-center justify-start gap-4">
            <section className="mt-1 flex flex-wrap justify-start gap-2">
              {allBonuses.map((el, i) => {
                for (let i = 0; i < 5; i++) {
                  const element = team?.SelectedPlayer[i];
                  if (element?.bonus?.name === el.name) {
                    return (
                      <span
                        key={el.name}
                        draggable={false}
                        onClick={() => {
                          setBonusName(el.name);
                          setBonusDesc(el.description);
                        }}
                        onDragStart={(e) => handleOnDrag(e, el.name, i)}
                        className={`${`rounded-btn cursor-not-allowed bg-gray-900 p-3 text-gray-700 line-through`}`}
                      >
                        {el.name}
                      </span>
                    );
                  }
                }
                return (
                  <span
                    key={el.name}
                    draggable={true}
                    onClick={() => {
                      setBonusName(el.name);
                      setBonusDesc(el.description);
                    }}
                    onDragStart={(e) => handleOnDrag(e, el.name, i)}
                    className="rounded-btn cursor-grab bg-primary/90 p-3 text-primary-content transition-all hover:scale-105"
                  >
                    {el.name}
                  </span>
                );
              })}
            </section>
          </div>

          <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg p-6 sm:max-w-[80vw] sm:flex-row sm:space-x-4 sm:space-y-0">
            {team &&
              team.SelectedPlayer?.map((el, i) => {
                return (
                  <div
                    key={el.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleOnDrop(e, i)}
                  >
                    <MyPlayer
                      index={i}
                      deleteBonus={handleBonusDelete}
                      name={el.name}
                      price={el.price}
                      rareity={el.rareity}
                      img={el.image}
                      bonus={el.bonus}
                      bonusEdit={true}
                    />
                  </div>
                );
              })}
          </div>
          <section className="rounded-btn w-full bg-primary p-4 text-primary-content ">
            <p className="text-xl font-bold">
              <span className="text-2xl font-normal">{`${bonusName}: `}</span>
              {bonusDesc}
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={HandleBonusSubmit} className="btn-success btn">
                Submit
              </button>
              <div className="modal-action m-0">
                <label htmlFor="bonus" className="btn-error btn ">
                  Cancel
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
};

export default Myteam;
