// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const submitTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "POST") {
    res.status(500).json("Method not authorised")
    return
  }
  console.log(req.body)
  const examples = await prisma.playerTeam.create(req.body);
  res.status(200).json(examples);
};

export default submitTeam;