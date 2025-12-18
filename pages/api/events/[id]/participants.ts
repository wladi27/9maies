import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing event id' })
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const participants = db.collection('participants')

    const list = await participants
      .find({ eventId: new ObjectId(id) })
      .sort({ createdAt: -1 })
      .toArray()

    return res.status(200).json(list)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Participants error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
