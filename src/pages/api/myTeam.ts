import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { headers } = req;
  const id = headers.id as string;
  switch (method) {
    case "GET":
      try {
        const myTeam = await prisma.user.findUnique({
          where: {
            id: id,
          },
          include: {
            PlayerTeam: {
              include: {
                league: true,
                SelectedPlayer: { include: { Player: true } },
              },
            },
          },
        });
        res.status(200).json(myTeam);
        return res.end();
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
}
