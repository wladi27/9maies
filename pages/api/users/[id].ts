import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id) return res.status(400).json({ error: 'Missing id' })
  let _id
  try { _id = new ObjectId(String(id)) } catch { return res.status(400).json({ error: 'Invalid id' }) }

  const client = await clientPromise
  const db = client.db()
  const users = db.collection('users')

  if (req.method === 'GET') {
    const user = await users.findOne({ _id }, { projection: { password: 0 } })
    if (!user) return res.status(404).json({ error: 'Not found' })
    return res.status(200).json(user)
  }

  if (req.method === 'PUT') {
    try {
      const update = { ...req.body, updatedAt: new Date() }
      await users.updateOne({ _id }, { $set: update })
      const u = await users.findOne({ _id }, { projection: { password: 0 } })
      return res.status(200).json(u)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error updating' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      await users.deleteOne({ _id })
      return res.status(204).end()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error deleting' })
    }
  }

  res.setHeader('Allow', ['GET','PUT','DELETE'])
  res.status(405).end('Method Not Allowed')
}
