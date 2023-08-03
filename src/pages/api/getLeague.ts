
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const getLeague = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const { headers} = req
  const LeagueName = headers.leaguename as string
  switch (method) {
    case 'GET':
      try {
        const league = await prisma.league.findUnique({where:{name:LeagueName}})
        res.status(200).json(league)
      } catch (e) {
        console.error('Request error', e)
        res.status(500).json({ error: `Error fetching data for ${LeagueName}` })
      }
      break
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
      break
  }
};

export default getLeague;