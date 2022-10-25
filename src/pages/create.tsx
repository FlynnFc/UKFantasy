import { useSession } from "next-auth/react";
import React, { useState } from "react";
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
      price="35,000"
      img={smooya}
      key={0}
    />,
    <SelectedPlayer
      rareity="bronze"
      name="Dweg"
      price="3.30"
      img={dweg}
      key={1}
    />,
  ]);
  const [money, setMoney] = useState(100000);
  const session = useSession();

  const minusMoney = (price: number) => {
    setMoney((prev) => prev - price);
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
                rareity="gold"
                name="Smooya"
                price="35,000"
                img={smooya}
              />
              <Player rareity="silver" name="LVN" price="22,000" img={lvn} />
              <Player rareity="bronze" name="Dweg" price="3.30" img={dweg} />
              <Player
                rareity="gold"
                name="Thomas"
                price="27,000"
                img={thomas}
              />
              <Player
                rareity="gold"
                name="Vacancey"
                price="23,000"
                img={vacancey}
              />
            </PlayerGroup>
            <PlayerGroup team="God Squad">
              <Player
                rareity="gold"
                name="Smooya"
                price="35,000"
                img={smooya}
              />
              <Player rareity="silver" name="LVN" price="22,000" img={lvn} />
              <Player rareity="bronze" name="Dweg" price="3.30" img={dweg} />
              <Player
                rareity="gold"
                name="Thomas"
                price="27,000"
                img={thomas}
              />
              <Player
                rareity="gold"
                name="Vacancey"
                price="23,000"
                img={vacancey}
              />
            </PlayerGroup>
            <PlayerGroup team="God Squad">
              <Player
                rareity="gold"
                name="Smooya"
                price="35,000"
                img={smooya}
              />
              <Player rareity="silver" name="LVN" price="22,000" img={lvn} />
              <Player rareity="bronze" name="Dweg" price="3.30" img={dweg} />
              <Player
                rareity="gold"
                name="Thomas"
                price="27,000"
                img={thomas}
              />
              <Player
                rareity="gold"
                name="Vacancey"
                price="23,000"
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
