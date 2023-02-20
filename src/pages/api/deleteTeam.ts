
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function deleteTeam(req:any, res:any) {
    const { method } = req
    const {headers} = req
    const id = headers.id
    switch (method) {
      case 'GET':
        try {
            const deletedTeam = await prisma?.team.delete()
            const myTeam = await prisma?.user.findUnique({
            where: {
              id: id,
            },
            include: {
              PlayerTeam:{include:{Player:true },}
              
            },
          })
          console.log(myTeam?.PlayerTeam)
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
  }