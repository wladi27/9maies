import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing event id' })
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const events = db.collection('events')

    if (req.method === 'GET') {
      const event = await events.findOne({ _id: new ObjectId(id) })
      if (!event) return res.status(404).json({ error: 'Event not found' })
      return res.status(200).json(event)
    }

    if (req.method === 'PUT') {
      const { title, description, date, location, featuredImage } = req.body || {}
      const update: any = { updatedAt: new Date() }
      if (title !== undefined) update.title = title
      if (description !== undefined) update.description = description
      if (date !== undefined) update.date = date ? new Date(date) : null
      if (location !== undefined) update.location = location
      if (featuredImage !== undefined) update.featuredImage = featuredImage

      const result = await events.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' }
      )

      return res.status(200).json(result.value)
    }

    if (req.method === 'DELETE') {
      // remove event and its participants
      const participants = db.collection('participants')
      await participants.deleteMany({ eventId: new ObjectId(id) })
      await events.deleteOne({ _id: new ObjectId(id) })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Event [id] error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
