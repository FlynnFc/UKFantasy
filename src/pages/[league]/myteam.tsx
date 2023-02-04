import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { FiShare } from "react-icons/fi";
import { MyPlayer } from "../../components/myPlayer";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { CLIENT_RENEG_LIMIT } from "tls";

type player = {
  id: string;
  name: string;
  price: number;
  Rareity: string;
  teamId: string;
  statsId: string;
  Image: string;
};

type teamProps = {
  id: string;
  points: string;
  Player: player[];
  teamName: string;
};

const Myteam = () => {
  const { data: session } = useSession();
  const [team, setTeam] = useState<teamProps>();
  const { query } = useRouter();
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
  }, [session]);

  const linkSetter = () => {
    const path: string | any = team?.id;
    const host = `https://uk-fantasy.vercel.app/${query.league}/team/`;
    const link = host + path;
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };

  console.log(team, query.league);

  const teamDeleter = () => {
    if (session?.user?.id) {
      const id = session.user.id;
      console.log("team deleted", id);
    }
  };
  return (
    <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <Toaster />
      {team ? (
        <div className="flex flex-col items-center justify-center ">
          <header className="flex flex-row items-center space-x-2 sm:mb-10">
            <h1 className="mb-2 text-4xl">{`${session?.user?.name}'s team`}</h1>
            <button onClick={linkSetter} className="mb-1 p-2 text-2xl">
              <FiShare />
            </button>
          </header>

          <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg bg-base-300 p-6 sm:max-w-[80vw] sm:flex-row sm:space-y-0 sm:space-x-4">
            {team &&
              team.Player?.map((el) => {
                return (
                  <MyPlayer
                    key={el.id}
                    name={el.name}
                    price={el.price}
                    rareity={el.Rareity}
                    img={el.Image}
                  />
                );
              })}
          </div>

          <label htmlFor="my-modal" className="btn-error btn">
            Delete team
          </label>

          {/* Put this part before </body> tag */}
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
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Myteam;
