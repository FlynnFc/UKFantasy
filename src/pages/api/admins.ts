import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const admins = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { headers } = req;
  switch (method) {
    case "GET":
      try {
        const userid = headers.id as string;
        if (userid) {
          const admins = await prisma.user.findUnique({
            where: { id: JSON.parse(userid) },
            select: { admin: true },
          });
          res.status(200).json(admins);
          return res.end();
        } else {
          const admins = await prisma.user.findMany({ where: { admin: true } });
          res.status(200).json(admins);
          return res.end();
        }
      } catch (e: any) {
        console.error("Request error", e);
        res.status(500).json({ error: e.message });
        return res.end();
      }

    case "POST":
      const { id, adminBool } = req.body;
      try {
        const admins = await prisma.user.update({
          where: { id: id },
          data: { admin: adminBool },
        });
        res.status(200).json(admins);
        return res.end();
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: `Error making ${id} Admins` });
        return res.end();
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      return res.end();
  }
  return;
};

export default admins;
