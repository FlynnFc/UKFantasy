import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const leagues = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const name = headers.leaguename as string;

  switch (method) {
    case "GET":
      try {
        if (!name) {
          const leagues = await prisma.league.findMany();
          res.status(200).json(leagues);
          return res.end();
        } else {
          const league = await prisma.league.findUnique({
            where: { name: name },
          });
          res.status(200).json(league);
          return res.end();
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default leagues;
