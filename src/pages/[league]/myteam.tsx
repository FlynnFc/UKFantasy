import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { ImBin, ImTwitter, ImDice } from "react-icons/im";
import { FiShare } from "react-icons/fi";
import { MyPlayer } from "../../components/myPlayer";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import BonusPicker from "../../components/BonusPicker";
import Link from "next/link";

type bonus = {
  name: string;
  description: string;
};

type player = {
  id: string;
  name: string;
  price: number;
  rareity: string;
  teamId: string;
  statsId: string;
  image: string;
  bonus: { name: string; description: string };
};

type teamProps = {
  id: string;
  points: string;
  teamName: string;
  SelectedPlayer: player[];
};

const Myteam = () => {
  const { data: session } = useSession();
  const [team, setTeam] = useState<teamProps>();
  const [serverTeam, setServerTeam] = useState<teamProps>();
  const { query } = useRouter();
  const [bonusDesc, setBonusDesc] = useState(
    "or you can Drag and drop a bonus onto the desired player. Once you have selected 5 you can submit"
  );
  const [bonusName, setBonusName] = useState(`Click a bonus for more details`);

  const [allBonuses, setAllBonuses] = useState<bonus[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetcher = async () => {
      if (session?.user?.id && query.league) {
        const id = session.user.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.log("error");
        }
        const data = await res.json();
        console.log(data);
        for (let i = 0; i < data.PlayerTeam.length; i++) {
          if (data.PlayerTeam[i].league.name.toLowerCase() === query.league) {
            const allPlayers = data.PlayerTeam[i];
            setServerTeam({ ...allPlayers });
            setTeam({ ...allPlayers });

            return;
          }
        }
      } else return "error";
    };

    fetcher();

    console.log("running");
  }, [query.league, session]);

  const bonusFetcher = async () => {
    if (session?.user?.id && query.league) {
      console.log("Fettching bonuses");
      const res = await fetch("/api/allBonuses", {
        method: "GET",
      });
      if (!res.ok) {
        console.log("error");
      }
      const data = await res.json();
      setAllBonuses([...data]);
    }
  };

  const linkSetter = () => {
    const path: string = team?.id as string;
    const host = `https://uk-fantasy.vercel.app/${query.league}/team/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };

  const teamDeleter = async () => {
    if (session?.user?.id && team?.id) {
      console.log("team deleted", team?.id, query.league);
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
    console.log(e);
    e.dataTransfer.setData("Identifier", Identifier);
    e.dataTransfer.setData("BonusIndex", index.toString());
  };

  const handleOnDrop = (e: React.DragEvent, i: number) => {
    const Identifier = e.dataTransfer.getData("Identifier");
    const Index = parseInt(e.dataTransfer.getData("BonusIndex"));

    console.log(team?.SelectedPlayer[i]);
    console.log("Ident", Identifier, e.currentTarget);

    console.log(allBonuses);
    console.log("current", team);
    //TODO Figure out this type error
    setTeam((prev: any) => {
      const temp = prev;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      prev!.SelectedPlayer[i]!.bonus = {
        name: Identifier,
        description: allBonuses[Index]?.description,
      };
      return { ...temp };
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const HandleBonusSubmit = () => {
    toast.error("Editing bonus currnelty disabled!");
  };

  console.log(team, serverTeam);
  return (
    <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <Toaster position="bottom-left" />
      {serverTeam ? (
        <div className="flex flex-col items-center justify-center ">
          <header className="flex flex-col items-center space-x-2">
            <div className="flex flex-row ">
              <h1 className="text-4xl">{serverTeam.teamName}</h1>
              <button onClick={linkSetter} className="mb-1 p-2 text-2xl">
                <FiShare />
              </button>
            </div>
            <div className="flex flex-row items-end justify-center space-y-2">
              <h2 className="mb-2 text-3xl">{`${session?.user?.name}'s team`}</h2>
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
              <p>After deleting you cant get it back!</p>
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
            <div className="flex w-full flex-row items-center justify-end">
              <Link href={`/${query.league}`}>
                <button className="btn-ghost my-1 w-fit cursor-pointer rounded p-2 text-2xl text-base-content transition">
                  {query.league}
                </button>
              </Link>
              <div className="tooltip" data-tip="Edit player bonuses">
                <button className="btn-ghost my-1 w-fit cursor-pointer rounded p-2 text-2xl text-base-content transition">
                  <label onClick={bonusFetcher} htmlFor="bonus">
                    <ImDice />
                  </label>
                </button>
              </div>
              <div className="tooltip" data-tip="Delete team">
                <button className="btn-ghost my-1 h-fit w-fit cursor-pointer rounded p-2 text-2xl text-error transition">
                  <label htmlFor="my-modal">
                    <ImBin />
                  </label>
                </button>
              </div>
            </div>
            <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg bg-base-300 p-6 sm:max-w-[80vw] sm:flex-row sm:space-y-0 sm:space-x-4">
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
                    />
                  );
                })}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <input type="checkbox" id="bonus" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box flex h-5/6 max-h-full w-11/12 max-w-full select-none flex-col items-center justify-between">
          <div className="flex flex-col justify-start space-y-4">
            <section className="mt-1 flex flex-wrap justify-start gap-2 gap-y-8">
              {allBonuses.map((el, i) => (
                <span
                  key={el.name}
                  draggable
                  onClick={() => {
                    setBonusName(el.name);
                    setBonusDesc(el.description);
                  }}
                  onDragStart={(e) => handleOnDrag(e, el.name, i)}
                  className="rounded-btn cursor-grab bg-secondary p-3 text-primary-content transition-all hover:scale-105 "
                >
                  {el.name}
                </span>
              ))}
            </section>
          </div>

          <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg p-6 sm:max-w-[80vw] sm:flex-row sm:space-y-0 sm:space-x-4">
            {team &&
              team.SelectedPlayer?.map((el, i) => {
                return (
                  <div
                    key={el.id}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleOnDrop(e, i)}
                  >
                    <MyPlayer
                      name={el.name}
                      price={el.price}
                      rareity={el.rareity}
                      img={el.image}
                      bonus={el.bonus}
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
            <div className="flex items-center justify-end gap-2">
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
