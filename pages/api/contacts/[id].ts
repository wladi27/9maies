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
  const contacts = db.collection('contacts')

  if (req.method === 'DELETE') {
    try {
      await contacts.deleteOne({ _id })
      return res.status(204).end()
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error deleting' })
    }
  }

  if (req.method === 'GET') {
    try {
      const c = await contacts.findOne({ _id })
      if (!c) return res.status(404).json({ error: 'Not found' })
      return res.status(200).json(c)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error fetching' })
    }
  }

  res.setHeader('Allow', ['GET','DELETE'])
  res.status(405).end('Method Not Allowed')
}
