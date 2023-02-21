
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

const allUserTeams = async (req: NextApiRequest, res: any) => {
    const { method } = req
    const {headers} = req
    const id:any = headers.id


  switch (method) {
    case 'GET':
      try {
        const userTeams = await prisma.playerTeam.findUnique({where:{id: id}, include:{ SelectedPlayer: true, User:true,}})
        console.log(userTeams)
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