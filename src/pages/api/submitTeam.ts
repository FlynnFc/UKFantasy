/* eslint-disable @typescript-eslint/no-non-null-assertion */
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
  console.log("Team data!", data)
  const findLeagueId = await prisma.league.findMany({where:{name:data.league}})
  const findPlayerData = await prisma.player.findMany({where:{ id:{ in: [...data.players]}}})
  console.log("Player data", findPlayerData )
  
  const finalTeam: any = [
    {bonusName:'', image:findPlayerData[0]?.Image, name:findPlayerData[0]?.name, price:findPlayerData[0]?.price, rareity:findPlayerData[0]?.Rareity},
    {bonusName:'', image:findPlayerData[1]?.Image, name:findPlayerData[1]?.name, price:findPlayerData[1]?.price, rareity:findPlayerData[1]?.Rareity},
    {bonusName:'', image:findPlayerData[2]?.Image, name:findPlayerData[2]?.name, price:findPlayerData[2]?.price, rareity:findPlayerData[2]?.Rareity},
    {bonusName:'', image:findPlayerData[3]?.Image, name:findPlayerData[3]?.name, price:findPlayerData[3]?.price, rareity:findPlayerData[3]?.Rareity},
    {bonusName:'', image:findPlayerData[4]?.Image, name:findPlayerData[4]?.name, price:findPlayerData[4]?.price, rareity:findPlayerData[4]?.Rareity},
  ]

  const examples = await prisma.playerTeam.create({
  data:{
    teamName: data.teamName,
    points:'0',
    rolePoints:'0',
    User: {connect:{id:data.userId}}, SelectedPlayer:{createMany:{data:finalTeam}} , league:{connect:{id:findLeagueId[0]?.id}}
  }
  });
  res.status(200).json(examples);
} catch (error) {
  res.status(500).json('Failed to submit')
}

};

export default submitTeam;


