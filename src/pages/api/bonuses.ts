import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const bonuses = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const bonuses = await prisma.bonus.findMany();
        res.status(200).json(bonuses);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching Bonuses" });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
};

export default bonuses;
