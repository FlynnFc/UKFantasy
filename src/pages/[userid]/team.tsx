import React from "react";
import { Player } from "../../components/Player";

const Team = () => {
  return (
    <div className="flex h-screen flex-row items-center justify-center space-x-5">
      <Player rareity="gold" name="Smooya" price="35,000" img="test" />
      <Player rareity="silver" name="StayX" price="22,000" img="test" />
      <Player rareity="bronze" name="Dweg" price="5,000" img="test" />
      <Player rareity="silver" name="Ralphy" price="20,000" img="test" />
      <Player rareity="silver" name="Klon" price="1,000,000" img="test" />
    </div>
  );
};

export default Team;
