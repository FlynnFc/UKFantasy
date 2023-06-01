import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../server/db/client";

export default async function assetHandler(req:NextApiRequest, res:NextApiResponse) {
    const { method } = req
    const {headers, body} = req
    const id = headers.id
    console.log(body)
//What this api needs to work!
//  Needs what round its applying edits to
// Needs array of players and their adjusted points array
    //https://www.prisma.io/docs/concepts/components/prisma-client/transactions#sequential-prisma-client-operations:~:text=prisma.resource,prisma.resource
    switch (method) {
      case 'GET':
        try {
        //   const pointsUpdate = await prisma.$transaction({forEach(callbackfn, thisArg) {
              
        //   },})
          res.status(200).json({data: 'data sent!'})
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