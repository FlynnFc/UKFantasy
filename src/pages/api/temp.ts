import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const player = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { body } = req;

  switch (method) {
    case "POST":
      try {
        const data = JSON.parse(body);
        const querys = [];
        for (let i = 0; i < data.length; i++) {
          const player = data[i];
          console.log(player);
          const query = prisma.selectedPlayer.update({
            where: { id: player.id },
            data: { Player: { connect: { steamid: player.steamid } } },
          });
          querys.push(query);
        }

        const update = prisma.$transaction(querys);
        res.status(200).json(update);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
        return res.end();
      }

    default:
      res.setHeader("Allow", ["PUT", "GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default player;
