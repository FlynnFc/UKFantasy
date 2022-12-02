
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const myTeam = await prisma.team.findMany({include:{Player:true}})
        res.status(200).json(myTeam)
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

export default allTeams;