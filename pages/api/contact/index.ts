import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../lib/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
  const contacts = db.collection('contacts')

  if (req.method === 'GET') {
    try {
      const items = await contacts.find({}).sort({ createdAt: -1 }).toArray()
      return res.status(200).json(items)
    } catch (err) {
      console.error('Contact list error', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'POST') {
    const { firstName, lastName, country, birthdate, email, whatsapp, telegram } = req.body || {}

    if (!firstName || !lastName || !email) {
      return res.status(400).json({ error: 'firstName, lastName and email are required' })
    }

    try {
      const doc = {
        firstName,
        lastName,
        country: country || null,
        birthdate: birthdate || null,
        email,
        whatsapp: whatsapp || null,
        telegram: telegram || null,
        createdAt: new Date(),
      }

      await contacts.insertOne(doc)

      return res.status(200).json({ message: 'Contact saved' })
    } catch (err) {
      console.error('Contact save error', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  res.setHeader('Allow', ['GET', 'POST'])
  return res.status(405).end(`Method ${req.method} Not Allowed`)
}
