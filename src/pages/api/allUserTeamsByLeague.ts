
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allUserTeamsByLeague = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  const url = req.headers.url as string
  const processed = url.split('/')
  
  switch (method) {
    case 'GET':
      try {
        const userTeams = await prisma.playerTeam.findMany({where:{league:{name:processed[1]}},include:{SelectedPlayer:{include:{points:true,bonusPoint:true}}}})
        res.status(200).json(userTeams)
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

export default allUserTeamsByLeague;