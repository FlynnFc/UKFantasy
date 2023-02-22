import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { ImBin, ImTwitter, ImDice } from "react-icons/im";
import { FiShare } from "react-icons/fi";
import { MyPlayer } from "../../components/myPlayer";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import BonusPicker from "../../components/BonusPicker";
import { AnimatePresence, motion } from "framer-motion";

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
  Player: player[];
  teamName: string;
  SelectedPlayer: player[];
};

const Myteam = () => {
  const [editBonuses, setEditBonuses] = useState(false);
  const { data: session } = useSession();
  const [team, setTeam] = useState<teamProps>();
  const { query } = useRouter();
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
            setTeam(data.PlayerTeam[i]);
            return;
          }
        }
      } else return "error";
    };

    fetcher();

    console.log("running");
  }, [query.league, session]);

  const linkSetter = () => {
    const path: string = team?.id as string;
    const host = `https://uk-fantasy.vercel.app/${query.league}/team/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };

  console.log(team, query.league);

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
  return (
    <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <Toaster />
      {team ? (
        <div className="flex flex-col items-center justify-center ">
          <header className="flex flex-col items-center space-x-2">
            <div className="flex flex-row ">
              <h1 className="mb-2 text-4xl">{`${session?.user?.name}'s team`}</h1>
              <button onClick={linkSetter} className="mb-1 p-2 text-2xl">
                <FiShare />
              </button>
            </div>
            <div className="flex flex-row items-end justify-center space-y-2">
              <h2 className="text-3xl">{team.teamName}</h2>
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
              <div className="tooltip" data-tip="Edit player bonuses">
                <button className="btn-ghost my-1 w-fit cursor-pointer rounded p-2 text-2xl text-base-content transition">
                  <label htmlFor="bonus">
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
              {team &&
                team.SelectedPlayer?.map((el) => {
                  return (
                    <MyPlayer
                      key={el.id}
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
        <div className="modal-box  w-11/12 max-w-full">
          <h3 className="text-lg font-bold">
            Congratulations random Internet user!
          </h3>
          <p className="py-4">
            You&apos;ve been selected for a chance to get one year of
            subscription to use Wikipedia for free! You&apos;ve been selected
            for a chance to get one year of subscription to use Wikipedia for
            free! You&apos;ve been selected for a chance to get one year of
            subscription to use Wikipedia for free! You&apos;ve been selected
            for a chance to get one year of subscription to use Wikipedia for
            free! You&apos;ve been selected for a chance to get one year of
            subscription to use Wikipedia for free! You&apos;ve been selected
            for a chance to get one year of subscription to use Wikipedia for
            free!
          </p>
          <ul></ul>
          <div className="modal-action">
            <label htmlFor="bonus" className="btn">
              Yay!
            </label>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Myteam;
