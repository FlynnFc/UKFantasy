
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allLeagues = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const leagues = await prisma.league.findMany({where:{name:{startsWith:''}}})
        console.log("all leagues",leagues)
        res.status(200).json(leagues)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: 'Error fetching players' })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
};

export default allLeagues;