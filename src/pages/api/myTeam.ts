
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req
    const {headers} = req
    const id = headers.id
    switch (method) {
      case 'GET':
        try {
          const myTeam = await prisma?.user.findUnique({
            where: {
              id: id?.toString(),
            },
            include: {
              PlayerTeam:{include:{Player:true,league:true}},
              
            },
          })
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