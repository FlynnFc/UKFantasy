import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allUserTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const league = req.headers.leaguename as string;
  switch (method) {
    case "GET":
      try {
        if (!league) {
          const userTeams = await prisma.playerTeam.findMany({
            include: {
              league: true,
              User: true,
              SelectedPlayer: { include: { points: true, bonusPoint: true } },
            },
          });
          res.status(200).json(userTeams);
        } else {
          const userTeams = await prisma.playerTeam.findMany({
            include: {
              league: true,
              User: true,
              SelectedPlayer: { include: { points: true, bonusPoint: true } },
            },
            where: { league: { name: league } },
          });
          res.status(200).json(userTeams);
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default allUserTeams;
