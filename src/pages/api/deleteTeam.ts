
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function deleteTeam(req:NextApiRequest, res: NextApiResponse) {
    const { method } = req
    const {headers} = req
    const id = headers.id?.toString()
    console.log(id)
    switch (method) {
      case 'DELETE':
        try {
          console.log("Trying to delete")
          const deletedTeam = await prisma.playerTeam.delete({
            where: {
              id: id,
            
            },
          });
          res.status(200).json(deletedTeam)
        } catch (e) {
          console.error('Request error', e)
          res.status(500).json({ error: 'Error deleting team' })
        }
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
        break
    }
  }