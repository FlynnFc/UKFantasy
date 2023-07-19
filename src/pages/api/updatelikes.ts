import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const postHighlights = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { body } = req;
  const data = JSON.parse(body);

  const post = {
    likes: data.likes,
    id: data.id,
  };

  switch (method) {
    case "POST":
      try {
        const newHighlight = await prisma.highlight.update({
          where: { id: post.id },
          data: { likes: post.likes },
        });
        res.status(200).json(newHighlight);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error posting highlight" });
      }
  }
};

export default postHighlights;
