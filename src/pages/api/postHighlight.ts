import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const postHighlights = async (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  const data = JSON.parse(body);

  const post = {
    likes: 0,
    userId: data.author,
    source: data.source,
    title: data.title,
  };

  try {
    const newHighlight = await prisma.highlight.create({
      data: {
        likes: 0,
        source: post.source,
        title: post.title,
        author: { connect: { id: post.userId } },
      },
    });
    res.status(200).json(newHighlight);
  } catch (e) {
    console.error("Request error", e);
    res.status(500).json({ error: "Error posting highlight" });
  }
};

export default postHighlights;
