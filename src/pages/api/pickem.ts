import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const admins = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const userId = headers.id as string;
  const leagueId = headers.league as string;
  switch (method) {
    case "GET":
      try {
        if (userId) {
          const pickemTeam = await prisma.pickem.findUniqueOrThrow({
            where: { userId: userId },
            include: {
              playoffs: true,
              user: { select: { name: true } },
              results: { include: { league: { select: { startDate: true } } } },
            },
          });
          res.status(200).json(pickemTeam);
        } else {
          console.log(leagueId);
          const pickemTeams = await prisma.pickem.findMany({
            where: { results: { league: { name: leagueId } } },
            include: {
              playoffs: true,
            },
          });
          res.status(200).json(pickemTeams);
        }

        return res.end;
      } catch (e) {
        res.status(200).json("false");
        return res.end();
      }
    case "POST":
      const {
        playoffs,
        lowestRating,
        highestRating,
      }: {
        playoffs: { id: string }[];
        lowestRating: string;
        highestRating: string;
      } = JSON.parse(req.body);
      try {
        console.log(lowestRating, highestRating, playoffs);
        const pickem = await prisma.pickem.create({
          data: {
            highestRating: highestRating,
            lowestRating: lowestRating,
            playoffs: {
              connect: playoffs,
            },
            pickemResultsId: "clrwinpul0001905kqva17n9u",
            userId: userId,
          },
        });
        res.status(200).json(pickem);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: `Error creating pickem` });
        return res.end();
      }
    case "PUT":
      try {
        const {
          toAdd,
          toRemove,
          lowestRating,
          highestRating,
          id,
        }: {
          toAdd: { id: string }[];
          toRemove: { id: string }[];
          lowestRating: string;
          highestRating: string;
          id: string;
        } = JSON.parse(req.body);
        // console.log(toadd, toremove);
        const pickem = await prisma.pickem.update({
          where: { id: id },
          data: {
            highestRating: highestRating,
            lowestRating: lowestRating,
            playoffs: {
              disconnect: toRemove,
              connect: toAdd,
            },
          },
        });
        res.status(200).json(pickem);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: `Error creating pickem` });
        return res.end();
      }
    case "DELETE":
      try {
        const pickem = await prisma.pickem.delete({
          where: { id: userId },
        });
        res.status(200).json(pickem);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: `Error creating pickem` });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default admins;
