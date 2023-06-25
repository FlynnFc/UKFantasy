import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req
    const { body} = req
    const data = JSON.parse(body)
    const allPrismaQueries = []
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
    const query = prisma.selectedPlayer.update({where:{id:element.id}, data:{points:{create:{value:element.points}},bonusPoint:{create:{value:element.bonusPoint}}}})
    allPrismaQueries.push(query)
    }


    switch (method) {
      case 'POST':
        try {
          const pointsUpdate = await prisma.$transaction(allPrismaQueries)
          res.status(200).json({data: pointsUpdate})
        } catch (e) {
          console.error('Request error', e)
          res.status(500).json({ error: 'Error Applying points' })
        }
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  }