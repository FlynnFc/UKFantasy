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
        const allPrismaQueries: any[] = [];
        const round = data.round;
        const league = data.league;
        for (let index = 0; index < data.playerData.length; index++) {
          const element = data.playerData[index];
          console.log(element.steamid);
          const point = await prisma.player.update({
            data: {
              playerPoints: {
                create: {
                  round: round,
                  league: league,
                  points: element.points ?? 0,
                  ADR_warrior: element.ADR_warrior ?? 0,
                  all_rounder: element.allrounder ?? 0,
                  PTFO: element.PTFO ?? 0,
                  awper: element.awper ?? 0,
                  clutcher: element.clutcher ?? 0,
                  entry_king: element.entry_king ?? 0,
                  head_clicker: element.head_clicker ?? 0,
                  knife: element.knife ?? 0,
                  site_on_lock: element.site_on_lock ?? 0,
                  stat_padder: element.stat_padder ?? 0,
                  trade_me: element.trade_me ?? 0,
                  util_nerd: element.util_nerd ?? 0,
                },
              },
            },
            where: { steamid: element.steamid },
          });

          allPrismaQueries.push(point);
        }
        res.status(200).json({ data: allPrismaQueries });
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
        const pointsDelete = await prisma.playerPoints.deleteMany({
          where: {
            round: round,
            league: league,
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
