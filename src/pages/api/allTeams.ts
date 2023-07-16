import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const leagueName = req.headers.leaguename as string;
  switch (method) {
    case "GET":
      try {
        if (!leagueName) {
          const teams = await prisma.team.findMany({
            include: { Player: { include: { stats: true } } },
          });
          res.status(200).json(teams);
        } else {
          const teams = await prisma.league.findUnique({
            where: { name: leagueName },
            include: {
              Teams: { include: { Player: { include: { stats: true } } } },
            },
          });
          res.status(200).json(teams);
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

export default allTeams;
