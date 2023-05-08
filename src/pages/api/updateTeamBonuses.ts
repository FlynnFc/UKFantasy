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
  // const updatedPlayers:any = [
  //   {bonusName:data.SelectedPlayer[0]?.bonus?.name, image:data.SelectedPlayer[0]?.image, name:data.SelectedPlayer[0]?.name, price:data.SelectedPlayer[0]?.price, rareity:data.SelectedPlayer[0]?.rareity},
  //   {bonusName:data.SelectedPlayer[1]?.bonus?.name, image:data.SelectedPlayer[1]?.image, name:data.SelectedPlayer[1]?.name, price:data.SelectedPlayer[1]?.price, rareity:data.SelectedPlayer[1]?.rareity},
  //   {bonusName:data.SelectedPlayer[2]?.bonus?.name, image:data.SelectedPlayer[2]?.image, name:data.SelectedPlayer[2]?.name, price:data.SelectedPlayer[2]?.price, rareity:data.SelectedPlayer[2]?.rareity},
  //   {bonusName:data.SelectedPlayer[3]?.bonus?.name, image:data.SelectedPlayer[3]?.image, name:data.SelectedPlayer[3]?.name, price:data.SelectedPlayer[3]?.price, rareity:data.SelectedPlayer[3]?.rareity},
  //   {bonusName:data.SelectedPlayer[4]?.bonus?.name, image:data.SelectedPlayer[4]?.image, name:data.SelectedPlayer[4]?.name, price:data.SelectedPlayer[4]?.price, rareity:data.SelectedPlayer[4]?.rareity},
  // ]

try {
  const player1 = await prisma.selectedPlayer.updateMany({
      where: { id:data.SelectedPlayer[0]?.id },
      data: {bonusName: data.SelectedPlayer[0]?.bonus?.name}
  })
  const player2 = await prisma.selectedPlayer.updateMany({
    where: { id:data.SelectedPlayer[1]?.id },
    data: {bonusName: data.SelectedPlayer[1]?.bonus?.name}
})
const player3 = await prisma.selectedPlayer.updateMany({
  where: { id:data.SelectedPlayer[2]?.id },
  data: {bonusName: data.SelectedPlayer[2]?.bonus?.name}
})
const player4 = await prisma.selectedPlayer.updateMany({
  where: { id:data.SelectedPlayer[3]?.id },
  data: {bonusName: data.SelectedPlayer[3]?.bonus?.name}
})
const player5 = await prisma.selectedPlayer.updateMany({
  where: { id:data.SelectedPlayer[4]?.id },
  data: {bonusName: data.SelectedPlayer[4]?.bonus?.name}
})
  res.status(200).json([player1,player2,player3,player4,player5]);
} catch (error) {
  res.status(500).json('Failed to submit')
}

};

export default submitTeam;


