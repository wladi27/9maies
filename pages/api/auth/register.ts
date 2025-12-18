import type { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcryptjs'
import clientPromise from '../../../lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { username, password, role } = req.body || {}

  if (!username || !password || !role) {
    return res.status(400).json({ error: 'username, password and role are required' })
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const users = db.collection('users')

    const existing = await users.findOne({ username })
    if (existing) {
      return res.status(409).json({ error: 'User already exists' })
    }

    const hashed = await bcrypt.hash(password, 10)

    const result = await users.insertOne({
      username,
      password: hashed,
      role,
      createdAt: new Date(),
    })

    return res.status(201).json({ message: 'User created', id: result.insertedId })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Register error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
