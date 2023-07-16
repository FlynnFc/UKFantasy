import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const leagueName = req.headers.leaguename as string;
  switch (method) {
    case "GET":
      try {
        if (!leagueName) {
          const posts = await prisma.highlightpost.findMany({
            include: { author: true },
          });
          res.status(200).json(posts);
        } else {
          const posts = await prisma.highlightpost.findMany({
            take: 10,
            orderBy: { title: "desc" },
            where: { League: { name: leagueName } },
            include: { author: true },
          });
          res.status(200).json(posts);
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching highlight posts" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default getPosts;
