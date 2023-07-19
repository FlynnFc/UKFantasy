import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const postHighlights = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { body } = req;
  const data = JSON.parse(body);

  const post = {
    likes: 0,
    userId: data.author,
    source: data.source,
    title: data.title,
  };

  console.log(post);

  switch (method) {
    case "POST":
      try {
        const findLeagueID = await prisma.league.findUnique({
          where: { name: data.league },
        });
        const newHighlight = await prisma.highlightpost.create({
          data: {
            likes: 0,
            source: post.source,
            title: post.title,
            userId: post.userId,
            leagueId: findLeagueID?.id,
          },
        });
        res.status(200).json(newHighlight);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error posting highlight" });
      }
      break;
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default postHighlights;
