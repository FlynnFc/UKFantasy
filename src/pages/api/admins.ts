import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const admins = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const userid = req.headers.id as string;
        console.log(userid);
        if (userid) {
          const admins = await prisma.user.findUnique({
            where: { id: JSON.parse(userid) },
          });
          res.status(200).json(admins);
        } else {
          const admins = await prisma.user.findMany({ where: { admin: true } });
          res.status(200).json(admins);
        }
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: "Error fetching Admins" });
      }

    case "POST":
      const { id, adminBool } = req.body;
      try {
        const admins = await prisma.user.update({
          where: { id: id },
          data: { admin: adminBool },
        });
        res.status(200).json(admins);
      } catch (e) {
        console.error("Request error", e);
        res.status(500).json({ error: `Error making ${id} Admins` });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
};

export default admins;
