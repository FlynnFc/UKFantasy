import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

interface player {
  name: string;
  price: number;
  rareity: string;
  steamid: string;
  image: string;
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
        const playerTeamMap = new Map<string, string>();
        const { body } = req;
        const teams = JSON.parse(body);

        for (let i = 0; i < teams.length; i++) {
          const team: player[] = teams[i];
          team.forEach((el) => players.push(el));
        }
        const queries = [];
        for (let i = 0; i < teams.length; i++) {
          const team = teams[i];
          const teamId = crypto.randomUUID();
          team.players.forEach((el: { name: string }) =>
            playerTeamMap.set(el.name, teamId)
          );
          const newteam = prisma.team.create({
            data: {
              teamName: team.teamName,
              id: teamId,
              league: { connect: { name: "epic40" } },
              // Player: { connectOrCreate: {where:{steamid:}} data: team.players } },
            },
          });
          queries.push(newteam);
        }

        const createPlayers = [];
        for (let i = 0; i < players.length; i++) {
          const player = players[i] as player;
          const query = prisma.player.upsert({
            where: { steamid: player?.steamid },
            update: player,
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            create: { ...player, teamId: playerTeamMap.get(player.name)! },
          });
          createPlayers.push(query);
        }
        const newTeams = await prisma.$transaction(queries);
        const newPlayers = await prisma.$transaction(createPlayers);
        res.status(200).json({ newTeams, newPlayers });
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
