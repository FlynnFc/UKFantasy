/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const submitTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(500).json("Method not authorised");
    return;
  }
  try {
    const data = await JSON.parse(req.body);

    const findLeagueId = await prisma.league.findMany({
      where: { name: data.league },
    });
    const findPlayerData = await prisma.player.findMany({
      where: { id: { in: [...data.players] } },
    });

    if (
      findPlayerData[0] &&
      findPlayerData[1] &&
      findPlayerData[2] &&
      findPlayerData[3] &&
      findPlayerData[4]
    ) {
      const finalTeam: any = [];
      for (let i = 0; i < findPlayerData.length; i++) {
        const player = findPlayerData[i];
        if (player) {
          finalTeam.push({
            bonusName: "",
            image: player?.image,
            name: player?.name,
            price: player?.price + player?.priceadjust,
            rareity: player?.rareity,
            steamid: player?.steamid,
          });
        }
      }

      console.log("YOO THIS RUNNIN");
      const examples = await prisma.playerTeam.create({
        data: {
          teamName: data.teamName,
          points: "0",
          rolePoints: "0",
          User: { connect: { id: data.userId } },
          SelectedPlayer: { createMany: { data: [...finalTeam] } },
          league: { connect: { id: findLeagueId[0]?.id } },
        },
      });
      res.status(200).json(examples);
    } else {
      res.status(500).json("Team size incorrect");
    }
  } catch (error) {
    res.status(500).json("Failed to submit");
  }
};

export default submitTeam;
