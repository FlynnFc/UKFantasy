// src/pages/api/examples.ts
import type { NextApiRequest, NextApiResponse } from "next";

import { prisma } from "../../server/db/client";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(500).json("Method not authorised");
    return;
  }
  try {
    const data = await JSON.parse(req.body);
    const nameChange = await prisma.user.update({
      where: { id: data.id },
      data: { name: data.name },
    });
    res.status(200).json(nameChange);
  } catch (error) {
    res.status(500).json("Failed to Update");
  }
};

export default user;
