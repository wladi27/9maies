import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const events = db.collection('events')

  if (req.method === 'GET') {
    const list = await events.find({}).sort({ createdAt: -1 }).toArray()
    return res.status(200).json(list)
  }

  if (req.method === 'POST') {
    const { title, description, date, location, featuredImage } = req.body || {}
    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' })
    }

    const result = await events.insertOne({
      title,
      description,
      date: date ? new Date(date) : null,
      location: location || null,
      featuredImage: featuredImage || null,
      createdAt: new Date(),
    })

    return res.status(201).json({ id: result.insertedId })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
