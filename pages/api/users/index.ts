import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'
import bcrypt from 'bcryptjs'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const users = db.collection('users')

  if (req.method === 'GET') {
    try {
      const list = await users.find({}, { projection: { password: 0 } }).sort({ createdAt: -1 }).toArray()
      return res.status(200).json(list)
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error fetching users' })
    }
  }

  if (req.method === 'POST') {
    // create user (admin helper)
    try {
      const { username, password, role } = req.body || {}
      if (!username || !password) return res.status(400).json({ error: 'username and password required' })
      const hashed = await bcrypt.hash(password, 10)
      const now = new Date()
      const doc = { username, password: hashed, role: role || 'user', createdAt: now }
      const result = await users.insertOne(doc)
      return res.status(201).json({ ...doc, _id: result.insertedId })
    } catch (err) {
      console.error(err)
      return res.status(500).json({ error: 'Error creating user' })
    }
  }

  res.setHeader('Allow', ['GET','POST'])
  res.status(405).end('Method Not Allowed')
}
