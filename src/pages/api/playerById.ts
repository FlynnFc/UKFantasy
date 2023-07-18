import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const playerById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const id: string = headers.id as string;

  switch (method) {
    case "GET":
      try {
        const player = await prisma.player.findUnique({ where: { id: id } });
        res.status(200).json(player);
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

export default playerById;
