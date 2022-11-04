// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const teams = async (req: NextApiRequest, res: NextApiResponse) => {
  const examples = await prisma.playerTeam.create(req);
  res.status(200).json(examples);
};

export default teams;