import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const postHighlights = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { body } = req;
  const data = JSON.parse(body);

  const post = {
    likedBy: data.likedBy as string,
    id: data.id as string,
    isLiked: data.isLiked,
  };

  switch (method) {
    case "POST":
      try {
        if (post.isLiked) {
          const addHighLightLike = await prisma.highlight.update({
            where: { id: post.id },
            data: { highlightLike: { create: { userId: post.likedBy } } },
          });
          res.status(200).json(addHighLightLike);
        } else {
          const highlight = await prisma.highlightLike.findMany({
            where: {
              AND: [{ highlightId: post.id }, { userId: post.likedBy }],
            },
          });
          const addHighLightLike = await prisma.highlightLike.delete({
            where: { id: highlight[0]?.id },
          });
          res.status(200).json(addHighLightLike);
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error posting highlight" });
      }
  }
};

export default postHighlights;
