import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const getPosts = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const leagueName = req.headers.leaguename as string;
  const skip = parseInt(req.headers.skip as string);
  switch (method) {
    case "GET":
      try {
        if (!leagueName) {
          const posts = await prisma.highlight.findMany({
            include: { author: true },
          });
          res.status(200).json(posts);
          return res.end();
        } else {
          const posts = await prisma.highlight.findMany({
            orderBy: { likes: "desc" },
            where: { League: { name: leagueName } },
            include: {
              author: true,
              highlightLike: true,
            },
            take: 10,
            skip: skip,
          });
          res.status(200).json(posts);
          return res.end();
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching highlight posts" });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default getPosts;
