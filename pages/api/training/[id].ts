import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const collection = db.collection('training')
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing id' })

  let _id
  try { _id = new ObjectId(String(id)) } catch (e) { return res.status(400).json({ error: 'Invalid id' }) }

  if (req.method === 'GET') {
    const item = await collection.findOne({ _id })
    if (!item) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(item)
  }

  if (req.method === 'PUT') {
    try {
      const update = { ...req.body, updatedAt: new Date() }
      const result = await collection.findOneAndUpdate({ _id }, { $set: update }, { returnDocument: 'after' })
      return res.status(200).json(result.value)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error updating' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await collection.deleteOne({ _id })
      return res.status(204).end()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error deleting' })
    }
  }

  res.setHeader('Allow', 'GET,PUT,DELETE')
  res.status(405).end('Method Not Allowed')
}
