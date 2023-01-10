// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const submitTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "POST") {
    res.status(500).json("Method not authorised")
    return
  }
try {
  const data = await JSON.parse(req.body)
  console.log("Team name!", data)
  const findLeagueId = await prisma.league.findMany({where:{name:data.league}})
  console.log("League Stuff!", findLeagueId)
  const examples = await prisma.playerTeam.create({
  data:{
    teamName: data.teamName,
    points:'0',
    rolePoints:'0',
    User: {connect:{id:data.userId}}, Player:{connect:[{id:data.players[0]},{id:data.players[1]},{id:data.players[2]},{id:data.players[3]},{id:data.players[4]}]}, league:{connect:{id:findLeagueId[0]?.id}}
  }
  });
  res.status(200).json(examples);
} catch (error) {
  res.status(500).json('Failed to submit')
}

};

export default submitTeam;