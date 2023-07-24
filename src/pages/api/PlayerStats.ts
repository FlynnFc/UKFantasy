import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";
import { Stats } from "@prisma/client";

const playerStats = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const { body } = req;
  const id: string = headers.id as string;
  const data = JSON.parse(body);
  console.log("asdasdddd", data);
  const queries = [];
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const query = prisma.stats.create({
      data: {
        ADR: element.ADR,
        clutchRounds: element.clutchRounds,
        deathsTraded: element.deathsTraded,
        entryKills: element.entryKills,
        event: element.event,
        hltv: element.hltv,
        hs: element.hs,
        KAST: element.KAST,
        Objectives: element.Objectives,
        utilThrown: element.utilThrown,
        Player: { connect: { steamid: element.steamid } },
      },
    });
    queries.push(query);
  }
  // const data = JSON.parse(body);
  // const statsExample = {
  //   clutchRounds: 0,
  //   elo: 2500,
  //   entryRounds: 1,
  //   hltv: 1.2,
  //   hs: 45,
  //   link: "",
  // };
  // const example = prisma.player.update({
  //   where: { steamid: "" },
  //   data: {
  //     stats: { create: statsExample },
  //   },
  // });
  switch (method) {
    case "POST":
      try {
        const plzDontCrash = await prisma.$transaction(queries);
        res.status(200).json(plzDontCrash);
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

export default playerStats;
