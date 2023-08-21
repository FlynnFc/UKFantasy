import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { body } = req;
  const data = JSON.parse(body);

  switch (method) {
    case "POST":
      try {
        const allPrismaQueries = [];
        const round = data.round;
        for (let index = 0; index < data.playerData.length; index++) {
          const element = data.playerData[index];
          const point = prisma.player.update({
            data: {
              playerPoints: {
                create: {
                  round: round,
                  points: element.points ?? 0,
                },
              },
            },
            where: { steamid: element.id },
          });

          allPrismaQueries.push(point);
        }
        const pointsUpdated = await prisma.$transaction(allPrismaQueries);
        res.status(200).json({ data: pointsUpdated });
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error Applying points" });
      }
      break;
    case "DELETE":
      try {
        const round = data.round;
        const league = data.league;
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
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
