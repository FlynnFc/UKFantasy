import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import NotSignedin from "../components/NotSignedin";
import { Player } from "../components/Player";
import PlayerGroup from "../components/playerGroup";
import PlayerGroupSkeleton from "../components/playerGroupSkeleton";
import SelectedPlayer from "../components/SelectedPlayer";
import lvn from "../images/lvn.webp";
import dweg from "../images/dweg.webp";
import smooya from "../images/smooya.webp";
import thomas from "../images/thomas.webp";
import vacancey from "../images/vacancey.webp";

const Create = () => {
  const [introModal, setIntroModal] = useState(true);
  const [myTeam, setMyTeam] = useState<JSX.Element[]>([]);
  const [money, setMoney] = useState(100000);
  const [teamFull, setTeamFull] = useState(false);
  const [deletes, setDeletes] = useState("");
  const session = useSession();
  useEffect(() => {
    let count = 100000;
    for (let i = 0; i < myTeam.length - 1; i++) {
      count = count - myTeam[i]?.props.price;
      setMoney((prev) => {
        if (prev - myTeam[i]?.props.price >= 0) {
          return count;
        } else return prev;
      });
    }
  }, [myTeam]);

  const minusMoney = (price: number) => {
    setMoney((prev) => {
      if (prev - price >= 0) {
        const total = prev - price;
        return total;
      } else return 0;
    });
  };
  useEffect(() => {
    console.log(myTeam, deletes);
    const tempTeam = myTeam;
    for (let index = 0; index < tempTeam.length; index++) {
      const element = tempTeam[index]?.key;
      if (element === deletes) {
        tempTeam.splice(index, 1);
      }
    }

    setMyTeam([...tempTeam]);
    if (tempTeam.length < 5) {
      setTeamFull(false);
    }
  }, [deletes, myTeam]);

  const PlayerRemove = (data: { name: React.SetStateAction<string> }) => {
    setDeletes(data.name);
  };

  const PlayerSelect = (data: any) => {
    if (myTeam.length < 5) {
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
          team={myTeam}
        />,
      ]);

      console.log("added player", myTeam);
    }
  };

  return (
    <main className="min-w-screen container mx-auto  mt-20 flex min-h-screen max-w-7xl flex-col items-end justify-start  p-4">
      {introModal && (
        <div className="createModal fixed top-0 left-0 z-20 flex h-screen w-full items-start justify-center bg-info">
          <div className="mt-32 w-[80%] rounded-lg bg-neutral p-10">
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Vero
              accusamus expedita facere ex voluptatem exercitationem veniam
              itaque est repellendus libero neque, culpa distinctio aliquam
              dolor atque natus esse non nisi!
            </p>
            <div className="mr-8 flex justify-end">
              <button
                onClick={() => setIntroModal(false)}
                className="btn-outline btn"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
      {session.data ? (
        <div className="w-full">
          <h1
            onClick={() => minusMoney(20000)}
            className="text-5xl leading-snug"
          >
            Making your team
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            alias cupiditate est nam in nihil eaque laboriosam delectus repellat
            illo voluptate dignissimos accusantium eius maxime, natus dolor
            velit! Accusantium, ea!
          </p>
          <div className="z-10 my-4 ">
            <PlayerGroupSkeleton money={money}>{myTeam}</PlayerGroupSkeleton>
          </div>
          <div className="space-y-6">
            <PlayerGroup team="God Squad">
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Smooya"
                price={20000}
                img={smooya}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="silver"
                name="LVN"
                price={22000}
                img={lvn}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="bronze"
                name="Dweg"
                price={3.4}
                img={dweg}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Thomas"
                price={27000}
                img={thomas}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Vacancey"
                price={25000}
                img={vacancey}
              />
            </PlayerGroup>
            <PlayerGroup team="God Squad">
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Smooya"
                price={20000}
                img={smooya}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="silver"
                name="LVN"
                price={22000}
                img={lvn}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="bronze"
                name="Dweg"
                price={3.4}
                img={dweg}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Thomas"
                price={27000}
                img={thomas}
              />
              <Player
                teamFull={teamFull}
                PlayerSelect={PlayerSelect}
                moneyLeft={money}
                rareity="gold"
                name="Vacancey"
                price={25000}
                img={vacancey}
              />
            </PlayerGroup>
          </div>
        </div>
      ) : (
        <NotSignedin />
      )}
    </main>
  );
};
export default Create;
