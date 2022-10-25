import React from "react";
import { Player } from "../../components/Player";

const Team = () => {
  return (
    <div className="flex h-screen flex-row items-center justify-center space-x-5">
      <Player />
      <Player />
      <Player />
      <Player />
      <Player />
    </div>
  );
};

export default Team;
