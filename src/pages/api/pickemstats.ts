import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import crypto from "crypto";

interface player {
  name: string;
  price: number;
  rareity: string;
  steamid: string;
  image: string;
  teamId: string;
}

const teams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const leagueName = req.headers.leaguename as string;
  const createPage = req.headers.create as string;
  switch (method) {
    case "GET":
      try {
        const teams = await prisma.league.findUnique({
          where: { name: leagueName },
          include: {
            Teams: {
              include: {
                pickem: true,
              },
            },
          },
        });
        res.status(200).json(teams);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default teams;
