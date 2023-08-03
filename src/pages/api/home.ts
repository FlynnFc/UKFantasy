import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(500).json("Method not authorised");
    return;
  }
  const data = await prisma.playerTeam.findMany();
  res.status(200).json(data);
};

export default allTeams;
