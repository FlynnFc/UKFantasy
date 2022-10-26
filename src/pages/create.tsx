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
  const [myTeam, setMyTeam] = useState([
    <SelectedPlayer
      rareity="gold"
      name="Smooya"
      price={35000}
      img={smooya}
      key={0}
    />,
    <SelectedPlayer
      rareity="bronze"
      name="Dweg"
      price={5000}
      img={dweg}
      key={1}
    />,
  ]);
  const [money, setMoney] = useState(100000);
  const [firstRender, setFirstRender] = useState(true);
  const session = useSession();
  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    } else {
      for (let i = 0; i < myTeam.length; i++) {
        console.log(myTeam[i]?.props.price);
        setMoney((prev) => prev - myTeam[i]?.props.price);
      }
    }
  }, [firstRender, myTeam]);
  const minusMoney = (price: number) => {
    setMoney((prev) => {
      if (prev - price >= 0) {
        const total = prev - price;
        return total;
      } else return 0;
    });
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
            <div className="flex justify-end">
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
          <div className="sticky top-0 z-10 my-4 ">
            <PlayerGroupSkeleton money={money}>{myTeam}</PlayerGroupSkeleton>
          </div>
          <div className="space-y-6">
            <PlayerGroup team="God Squad">
              <Player
                moneyLeft={money}
                rareity="gold"
                name="Smooya"
                price={35000}
                img={smooya}
              />
              <Player
                moneyLeft={money}
                rareity="silver"
                name="LVN"
                price={22000}
                img={lvn}
              />
              <Player
                moneyLeft={money}
                rareity="bronze"
                name="Dweg"
                price={3.4}
                img={dweg}
              />
              <Player
                moneyLeft={money}
                rareity="gold"
                name="Thomas"
                price={27000}
                img={thomas}
              />
              <Player
                moneyLeft={money}
                rareity="gold"
                name="Vacancey"
                price={55000}
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
