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
        if (!leagueName) {
          const teams = await prisma.team.findMany({
            include: {
              Player: { include: { stats: true, playerPoints: true } },
            },
          });

          res.status(200).json(teams);
          return res.end();
        } else {
          if (createPage === "true") {
            const teams = await prisma.league.findUnique({
              where: { name: leagueName },
              include: {
                Teams: { include: { Player: { include: { stats: true } } } },
              },
            });
            res.status(200).json(teams);
            return res.end();
          } else {
            const teams = await prisma.league.findUnique({
              where: { name: leagueName },
              include: {
                Teams: {
                  include: {
                    Player: { include: { stats: true, playerPoints: true } },
                  },
                },
              },
            });
            res.status(200).json(teams);
            return res.end();
          }
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
        return res.end();
      }
    case "POST":
      try {
        const players: player[] = [];
        const { body } = req;
        const teams = JSON.parse(body);

        const queries = [];
        for (let i = 0; i < teams.length; i++) {
          const team: { players: any[]; teamName: string } = teams[i];
          const teamId = crypto.randomUUID();
          team.players.forEach((el) => {
            players.push({ ...el, teamId: teamId });
          });
          const newteam = prisma.team.create({
            data: {
              teamName: team.teamName,
              id: teamId,
              league: { connect: { name: "epic42" } },
            },
          });
          queries.push(newteam);
        }
        const newplayers = [];
        for (let i = 0; i < players.length; i++) {
          const player = players[i] as player;
          const query = prisma.player.upsert({
            where: { steamid: player.steamid },
            update: { teamId: player.teamId, priceadjust: 0 },
            create: {
              image: player.image,
              name: player.name,
              price: player.price,
              rareity: player.rareity,
              steamid: player.steamid,
              teamId: player.teamId,
            },
          });
          newplayers.push(query);
        }

        const newTeams = await prisma.$transaction(queries);
        const playerPrisma = await prisma.$transaction(newplayers);
        res.status(200).json({ newTeams, playerPrisma });
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error adding team" });
        return res.end();
      }
    case "PUT":
      try {
        const { body } = req;
        const data = JSON.parse(body);
        const edits = [];
        for (let i = 0; i < data.SelectedPlayer.length; i++) {
          const element = data.SelectedPlayer[i];
          console.log(element);
          if (element.bonus) {
            const editplayer = prisma.selectedPlayer.update({
              data: { bonus: { connect: { name: element.bonus.name } } },
              where: { id: element.id },
            });
            edits.push(editplayer);
          }
        }
        const playerUpdate = await prisma.$transaction(edits);
        res.status(200).json({ data: playerUpdate });
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error editing team" });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default teams;
