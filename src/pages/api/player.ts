import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const player = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const { body } = req;

  switch (method) {
    case "UPDATE":
      try {
        const id: string = headers.id as string;
        const data = JSON.parse(body);
        const querys = [];
        if (id) {
          const player = await prisma.player.update({
            where: { id: id },
            data: { ...data },
          });
          res.status(200).json(player);
        } else {
          for (let index = 0; index < data.length; index++) {
            const element = data[index];
            const query = prisma.player.update({
              where: { steamid: element.steamid },
              data: { price: element.price },
            });
            querys.push(query);
          }
          const player = await prisma.$transaction(querys);
          res.status(200).json(player);
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
      }
      break;
    case "GET":
      try {
        const id: string = headers.id as string;
        const player = await prisma.player.findUnique({ where: { id: id } });
        res.status(200).json(player);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
      }
      break;
    case "POST":
      playerStats(req, res);
    default:
      res.setHeader("Allow", ["UPDATE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default player;

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
  try {
    const plzDontCrash = await prisma.$transaction(queries);
    res.status(200).json(plzDontCrash);
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error fetching players" });
  }
};
