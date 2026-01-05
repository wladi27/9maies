import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('training')

  if (req.method === 'GET') {
    try {
      const { slug } = req.query
      const query: any = {}
      if (slug) query.slug = String(slug)
      const items = await collection.find(query).sort({ createdAt: -1 }).toArray()
      return res.status(200).json(items)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error fetching training items' })
    }
  }

  if (req.method === 'POST') {
    try {
      const body = req.body || {}
      const now = new Date()
      const doc = {
        ...body,
        createdAt: now,
        updatedAt: now,
      }
      const result = await collection.insertOne(doc)
      return res.status(201).json({ ...doc, _id: result.insertedId })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error creating training item' })
    }
  }

  res.setHeader('Allow', 'GET,POST')
  res.status(405).end('Method Not Allowed')
}
