import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const userteam = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const league = req.headers.leaguename as string;
        const teamid = req.headers.id as string;

        if (!league && !teamid) {
          const userTeams = await prisma.playerTeam.findMany({
            include: {
              league: true,
              User: { select: { name: true, id: true } },
              SelectedPlayer: { include: { points: true, bonusPoint: true } },
            },
          });
          res.status(200).json(userTeams);
          return res.end();
        } else if (league && !teamid) {
          const userTeams = await prisma.playerTeam.findMany({
            include: {
              league: true,
              User: { select: { name: true, id: true } },
              SelectedPlayer: { include: { points: true, bonusPoint: true } },
            },
            where: { league: { name: league } },
          });
          console.log(userTeams);
          res.status(200).json(userTeams);
          return res.end();
        } else if (teamid) {
          const userTeams = await prisma.playerTeam.findUnique({
            where: { id: teamid },
            include: {
              SelectedPlayer: {
                include: { bonus: true, points: true, bonusPoint: true },
              },
              User: { select: { name: true, id: true } },
            },
          });
          res.status(200).json(userTeams);
          return res.end();
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching players" });
      }
      break;
    case "PUT":
      try {
        console.log("Run run run");
        const data = await JSON.parse(req.body);
        const teamName = prisma.playerTeam.update({
          where: { id: data.id },
          data: { teamName: data.teamName },
        });
        const findnewPlayer = prisma.player.findMany({
          where: { id: { in: [...data.players] } },
        });

        const findCurrentPlayers = prisma.selectedPlayer.findMany({
          where: { id: { in: [...data.players] } },
        });

        const players = await prisma.$transaction([
          findCurrentPlayers,
          findnewPlayer,
          teamName,
        ]);

        const playersToDelete = [];
        for (let i = 0; i < data.originalTeam.length; i++) {
          let matched = false;
          const element = data.originalTeam[i];
          for (let j = 0; j < players[0].length; j++) {
            const el = players[0][j]?.id;
            if (el === element) {
              matched = true;
            }
          }
          if (!matched) {
            playersToDelete.push(element);
          }
        }

        const prismaDeletePlayers = [];
        for (let i = 0; i < playersToDelete.length; i++) {
          const player = playersToDelete[i];
          const deletePlayer = prisma.selectedPlayer.delete({
            where: { id: player },
          });
          prismaDeletePlayers.push(deletePlayer);
        }

        const prismaAddPlayer = [];
        if (players) {
          for (let i = 0; i < players[1].length; i++) {
            const player = players[1][i];
            if (player) {
              const newplayer = prisma.selectedPlayer.create({
                data: {
                  playerTeamId: data.id,
                  name: player.name,
                  price: player.price + player.priceadjust,
                  rareity: player.rareity,
                  image: player.image,
                  steamid: player.steamid,
                },
              });
              prismaAddPlayer.push(newplayer);
            }
          }
        }

        const updateTeam = prisma.$transaction([
          ...prismaAddPlayer,
          ...prismaDeletePlayers,
        ]);
        console.log("got to here lmao");
        res.status(200).json(updateTeam);
        return res.end();
      } catch (error) {
        res.status(500).json("Failed to submit");
        return res.end();
      }
    case "DELETE":
      try {
        const id = req.headers.id?.toString();
        const deletedTeam = await prisma.playerTeam.delete({
          where: {
            id: id,
          },
        });
        res.status(200).json(deletedTeam);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error deleting team" });
        return res.end();
      }
      break;
    case "POST":
      try {
        const data = await JSON.parse(req.body);

        const findLeagueId = await prisma.league.findMany({
          where: { name: data.league },
        });
        const findPlayerData = await prisma.player.findMany({
          where: { id: { in: [...data.players] } },
        });

        if (
          findPlayerData[0] &&
          findPlayerData[1] &&
          findPlayerData[2] &&
          findPlayerData[3] &&
          findPlayerData[4]
        ) {
          const finalTeam: any = [];
          for (let i = 0; i < findPlayerData.length; i++) {
            const player = findPlayerData[i];
            if (player) {
              finalTeam.push({
                bonusName: "",
                image: player?.image,
                name: player?.name,
                price: player?.price + player?.priceadjust,
                rareity: player?.rareity,
                steamid: player?.steamid,
              });
            }
          }
          const examples = await prisma.playerTeam.create({
            data: {
              teamName: data.teamName,
              points: "0",
              rolePoints: "0",
              User: { connect: { id: data.userId } },
              SelectedPlayer: { createMany: { data: [...finalTeam] } },
              league: { connect: { id: findLeagueId[0]?.id } },
            },
          });
          res.status(200).json(examples);
          return res.end();
        } else {
          res.status(500).json("Team size incorrect");
          return res.end();
        }
      } catch (error) {
        res.status(500).json("Failed to submit");
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET", "POST", "DELTE", "PUT"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default userteam;
