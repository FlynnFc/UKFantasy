import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const admins = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  const userId = headers.id as string;
  console.log(userId);
  switch (method) {
    case "GET":
      try {
        const pickemTeam = await prisma.pickem.findUniqueOrThrow({
          where: { userId: userId },
        });

        res.status(200).json(pickemTeam);

        return res.end;
      } catch (e) {
        const newTeam = await prisma.pickem.create({
          data: {
            highestRating: "",
            lowestRating: "",
            userId: userId,
            pickemResultsId: "clrwinpul0001905kqva17n9u",
          },
        });
        res.status(200).json(newTeam);
        return res.end();
      }
    case "POST":
      const {
        playoffs,
        lowestRating,
        highestRating,
      }: { playoffs: string[]; lowestRating: string; highestRating: string } =
        req.body;
      try {
        const pickem = await prisma.pickem.create({
          data: {
            highestRating: highestRating,
            lowestRating: lowestRating,
            playoffs: {
              connect: [{ id: playoffs[0] }],
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
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default admins;
