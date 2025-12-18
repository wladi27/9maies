import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing event id' })
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { email, name } = req.body || {}
  if (!email) {
    return res.status(400).json({ error: 'email is required' })
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const events = db.collection('events')
    const participants = db.collection('participants')

    const event = await events.findOne({ _id: new ObjectId(id) })
    if (!event) return res.status(404).json({ error: 'Event not found' })

    const existing = await participants.findOne({ eventId: new ObjectId(id), email })
    if (existing) {
      return res.status(409).json({ error: 'Email already registered for this event' })
    }

    const result = await participants.insertOne({
      eventId: new ObjectId(id),
      email,
      name: name || null,
      createdAt: new Date(),
    })

    return res.status(201).json({ message: 'Registered', id: result.insertedId })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('RSVP error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
