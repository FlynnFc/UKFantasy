import React, { useState } from "react";
import { Player } from "../../components/Player";
import PlayerGroup from "../../components/playerGroup";
import PlayerGroupSkeleton from "../../components/playerGroupSkeleton";

const Index = () => {
  const money = 100000;
  const [myTeam, setMyTeam] = useState<JSX.Element[]>([]);
  return <div className="mx-5 flex h-screen items-center justify-center"></div>;
};

export default Index;
