
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allAdmins = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const admins = await prisma.user.findMany({where:{admin:true}})
        res.status(200).json(admins)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching Admins' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
};

export default allAdmins;