import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const updatePlayer = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const { body } = req;
  const id: string = headers.id as string;
  const data = JSON.parse(body);

  switch (method) {
    case "POST":
      try {
        const player = await prisma.player.update({
          where: { id: id },
          data: { ...data },
        });
        res.status(200).json(player);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default updatePlayer;
