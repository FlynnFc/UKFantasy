import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { body } = req;
  const data = JSON.parse(body);
  const league = data.league;
  console.log(league);
  // const allPrismaQueries = []
  const round = data.round;
  // for (let index = 0; index < data.playerData.length; index++) {
  //     const element = data.playerData[index];
  //     const query = prisma.selectedPlayer.update({where:{id:element.id}, data:{points:{create:{value:element.points,roundNumber:round }},bonusPoint:{create:{value:element.bonusPoint, roundNumber:round}}}})
  //     allPrismaQueries.push(query)
  // }

  switch (method) {
    case "POST":
      try {
        const pointsDelete = await prisma.point.deleteMany({
          where: {
            roundNumber: round,
            SelectedPlayer: { PlayerTeam: { league: { name: league } } },
          },
        });
        res.status(200).json({ data: pointsDelete });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error Deleting points" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
