import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;
  const { headers } = req;
  const id = headers.id;
  const { body } = req;
  const teams = JSON.parse(body);
  console.log(teams[1].players);
  const queries = [];
  for (let i = 0; i < teams.length; i++) {
    const team = teams[i];
    const newteam = prisma.team.create({
      data: {
        teamName: team.teamName,
        league: { connect: { name: "epic39" } },
        Player: { createMany: { data: team.players } },
      },
    });
    queries.push(newteam);
  }

  switch (method) {
    case "POST":
      try {
        const newTeams = await prisma.$transaction(queries);
        res.status(200).json(newTeams);
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
}
