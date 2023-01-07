import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { FiShare } from "react-icons/fi";
import { MyPlayer } from "../components/myPlayer";
import toast, { Toaster } from "react-hot-toast";

type player = {
  id: string;
  name: string;
  price: number;
  Rareity: string;
  teamId: string;
  statsId: string;
  Image: string;
};

type playerTeam = {
  id: string;
  points: string;
  Player: player[];
  teamName: string;
};

type teamProps = {
  PlayerTeam: playerTeam;
  email: string;
  name: string;
};

const Myteam = () => {
  const { data: session } = useSession();
  const [team, setTeam] = useState<teamProps>();
  const [link, setLink] = useState("");

  useEffect(() => {
    const fetcher = async () => {
      if (session?.user?.id) {
        const id = session.user.id;
        const res = await fetch("/api/myTeam", {
          method: "GET",
          headers: { id: id },
        });
        if (!res.ok) {
          console.log("error");
        }
        const data = await res.json();

        setTeam(data);
      } else return "error";
    };

    fetcher();

    console.log("running");
  }, [session]);

  const linkSetter = () => {
    const path: string | any = team?.PlayerTeam.id;
    const host = "https://uk-fantasy.vercel.app/team/";
    setLink(() => host + path);
    navigator.clipboard.writeText(link);
    toast.success("added link to clipboard");
  };
  return (
    <main className="min-w-screen container mx-auto flex h-screen min-h-[88.3vh] max-w-7xl flex-col items-center justify-start  p-4">
      <Toaster />
      {team ? (
        <div className="flex flex-col items-center justify-center ">
          <div className="flex flex-row items-center space-x-2 sm:mb-10">
            <h1 className=" mb-2 text-4xl ">{team?.PlayerTeam.teamName}</h1>

            <button onClick={linkSetter} className="mb-1 p-2 text-2xl">
              <FiShare />
            </button>
          </div>

          <div className="flex h-auto flex-col items-center justify-between space-y-2 rounded-lg bg-base-300 p-6 sm:max-w-[80vw] sm:flex-row sm:space-y-0 sm:space-x-4">
            {team &&
              team.PlayerTeam.Player?.map((el) => {
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
        </div>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Myteam;
