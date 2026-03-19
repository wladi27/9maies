import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const events = db.collection('events')

  if (req.method === 'GET') {
    try {
      const q = req.query || {}
      const limit = q.limit ? parseInt(String(q.limit), 10) : 0
      const skip = q.skip ? parseInt(String(q.skip), 10) : 0

      const total = await events.countDocuments()

      let cursor = events.find({}).sort({ createdAt: -1 })
      if (skip) cursor = cursor.skip(skip)
      if (limit) cursor = cursor.limit(limit)

      const list = await cursor.toArray()
      return res.status(200).json({ items: list, total })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Events list error', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    const { title, description, date, location, featuredImage, featuredPublicId } = req.body || {}
    if (!title || !description) {
      return res.status(400).json({ error: 'title and description are required' })
    }

    const result = await events.insertOne({
      title,
      description,
      date: date ? new Date(date) : null,
      location: location || null,
      featuredImage: featuredImage || null,
      featuredPublicId: featuredPublicId || null,
      createdAt: new Date(),
    })

    return res.status(201).json({ id: result.insertedId })
  }

  res.setHeader('Allow', ['GET', 'POST'])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
