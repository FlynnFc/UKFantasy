/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const submitTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(500).json("Method not authorised");
    return;
  }
  try {
    const data = await JSON.parse(req.body);
    const findLeagueId = await prisma.league.findMany({
      where: { name: data.league },
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
              price: player.price,
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

    res.status(200).json(updateTeam);
  } catch (error) {
    res.status(500).json("Failed to submit");
  }
};

export default submitTeam;
