import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

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
        const allPrismaQueries: Prisma.Prisma__PlayerClient<
          {
            id: string;
            steamid: string | null;
            name: string;
            price: number;
            image: string;
            rareity: string;
            priceadjust: number;
            teamId: string;
          },
          never,
          DefaultArgs
        >[] = [];
        const round = data.round;
        for (let index = 0; index < data.playerData.length; index++) {
          const element = data.playerData[index];
          const point = prisma.player.update({
            data: {
              playerPoints: {
                create: {
                  round: round,
                  points: element.points ?? 0,
                  ADR_warrior: null,
                  all_rounder: null,
                  PTFO: null,
                  awper: null,
                  clutcher: null,
                  entry_king: null,
                  head_clicker: null,
                  knife: null,
                  site_on_lock: null,
                  stat_padder: null,
                  trade_me: null,
                  util_nerd: null,
                },
              },
            },
            where: { steamid: element.id },
          });

          allPrismaQueries.push(point);
        }
        const pointsUpdated = await prisma.$transaction(
          async (tx) => {
            allPrismaQueries;
          },
          {
            maxWait: 5000, // default: 2000
            timeout: 10000, // default: 5000
            isolationLevel: Prisma.TransactionIsolationLevel.Serializable, // optional, default defined by database configuration
          }
        );
        res.status(200).json({ data: pointsUpdated });
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error Applying points" });
        return res.end();
      }
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
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error Deleting points" });
        return res.end();
      }

    default:
      res.setHeader("Allow", ["POST", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
}
