import { useSession } from "next-auth/react";
import React, { useState } from "react";
import NotSignedin from "../components/NotSignedin";
import { Player } from "../components/Player";
import PlayerGroup from "../components/playerGroup";
import PlayerGroupSkeleton from "../components/playerGroupSkeleton";

const Create = () => {
  const [introModal, setIntroModal] = useState(true);
  const session = useSession();
  console.log(session.data);
  return (
    <main className="min-w-screen container mx-auto  mt-20 flex max-h-screen max-w-7xl flex-col items-end justify-start  p-4">
      {introModal && (
        <div className="createModal fixed top-0 left-0 z-20 my-2 flex min-h-screen w-full items-start justify-center bg-info">
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
          <h1>TEST TITLE</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
            alias cupiditate est nam in nihil eaque laboriosam delectus repellat
            illo voluptate dignissimos accusantium eius maxime, natus dolor
            velit! Accusantium, ea!
          </p>
          <div>
            <PlayerGroupSkeleton>
              <Player rareity="gold" name="Smooya" price="35,000" img="test" />
              <Player rareity="silver" name="StayX" price="22,000" img="test" />
            </PlayerGroupSkeleton>
          </div>
          <div className="space-y-6">
            <PlayerGroup team="God Squad">
              <Player rareity="gold" name="Smooya" price="35,000" img="test" />
              <Player
                rareity="silver"
                name="Stay X"
                price="22,000"
                img="test"
              />
              <Player rareity="bronze" name="Dweg" price="5,000" img="test" />
              <Player
                rareity="silver"
                name="Ralphy"
                price="20,000"
                img="test"
              />
              <Player
                rareity="silver"
                name="Klon"
                price="1,000,000"
                img="test"
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
