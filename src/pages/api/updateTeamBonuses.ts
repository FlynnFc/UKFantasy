/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const submitTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "POST") {
    res.status(500).json("Method not authorised")
    return
  }

  const data = await JSON.parse(req.body)
  const userID:string = data.id
  const allPrismaQueries = []
  let playerBonusCount = 0
  for (let index = 0; index < 5; index++) {
    const query = prisma.selectedPlayer.updateMany({
      where: { id:data.SelectedPlayer[index]?.id },
      data: {bonusName: data.SelectedPlayer[index]?.bonus?.name}
  })
  if(data.SelectedPlayer[index]?.bonus?.name.length > 0) {
    playerBonusCount++
  }
  allPrismaQueries.push(query)
  }
  if(playerBonusCount === 5) {
    const query = prisma.playerTeam.update({where:{id:userID},data:{ready:true}})
    allPrismaQueries.push(query)
  }

try {
const updateBonuses = await prisma.$transaction(allPrismaQueries)
res.status(200).json({data: updateBonuses})
} catch (error) {
  res.status(500).json('Failed to submit')
}

};

export default submitTeam;


