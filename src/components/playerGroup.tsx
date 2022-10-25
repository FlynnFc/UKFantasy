import React from "react";
import { Player } from "./Player";

const PlayerGroup = () => {
  return (
    <div className="flex w-full flex-col items-center justify-evenly rounded-lg bg-base-300 pb-4">
      <h2 className="py-2 text-2xl font-bold">Team name</h2>
      <div className="flex w-full flex-row justify-evenly">
        <Player rareity="gold" name="Smooya" price="35,000" img="test" />
        <Player rareity="silver" name="StayX" price="22,000" img="test" />
        <Player rareity="bronze" name="Dweg" price="5,000" img="test" />
        <Player rareity="silver" name="Ralphy" price="20,000" img="test" />
        <Player rareity="silver" name="Klon" price="1,000,000" img="test" />
      </div>
    </div>
  );
};

export default PlayerGroup;
