/* eslint-disable @typescript-eslint/no-non-null-assertion */
// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const submitTeam = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method !== "POST") {
    res.status(500).json("Method not authorised")
    return
  }
try {
  const data = await JSON.parse(req.body)
  console.log("Team data!", data)

  const tempId= "clegcm4yz0000la084bgyxjlm"
  const examples = await prisma.playerTeam.update({
      where: { id: tempId },
      data: {}
  })
  res.status(200).json(examples);
} catch (error) {
  res.status(500).json('Failed to submit')
}

};

export default submitTeam;


