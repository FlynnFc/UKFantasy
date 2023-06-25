
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allUserTeams = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req
  switch (method) {
    case 'GET':
      try {
        const userTeams = await prisma.playerTeam.findMany({include:{league:true,User:true,SelectedPlayer:{include:{points:true,bonus:true}}}})
        console.log("all teams", userTeams)
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

export default allUserTeams;