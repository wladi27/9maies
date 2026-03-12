import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise
  const db = client.db()
    const participants = db.collection('participants')

    if (req.method !== 'GET') {
      res.setHeader('Allow', ['GET'])
      return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    try {
      const { page = '1', limit = '50', q, eventId, export: exportFlag } = req.query as Record<string, string | undefined>
      const pageNum = Math.max(1, parseInt(page || '1', 10) || 1)
      const lim = Math.min(1000, Math.max(1, parseInt(limit || '50', 10) || 50))

      const filter: any = {}
      if (eventId) {
        // try to match ObjectId, otherwise match eventSlug
        try {
          filter.eventId = new ObjectId(String(eventId))
        } catch {
          filter.eventSlug = String(eventId)
        }
      }

      if (q) {
        const re = new RegExp(String(q), 'i')
        filter.$or = [
          { email: re },
          { name: re },
          { whatsapp: re },
          { telegram: re },
          { country: re },
          { heardFrom: re },
          { message: re },
        ]
      }

      const total = await participants.countDocuments(filter)

      // Export CSV if requested
      if (exportFlag === '1' || exportFlag === 'true') {
        const cursor = participants.find(filter).sort({ createdAt: -1 })
        const rows = await cursor.toArray()
        const header = ['email', 'name', 'whatsapp', 'telegram', 'country', 'heardFrom', 'message', 'createdAt', 'eventId', 'eventSlug']
        const csv = [header.join(',')]
        for (const r of rows) {
          const vals = header.map((h) => {
            const v = r[h as keyof typeof r]
            if (v == null) return ''
            if (v instanceof Date) return v.toISOString()
            // escape quotes
            const s = String(v).replace(/"/g, '""')
            // wrap in quotes if contains comma or newline
            return /[",\n]/.test(s) ? `"${s}"` : s
          })
          csv.push(vals.join(','))
        }

        res.setHeader('Content-Type', 'text/csv')
        res.setHeader('Content-Disposition', `attachment; filename="participants.csv"`)
        return res.status(200).send(csv.join('\n'))
      }

      const cursor = participants
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * lim)
        .limit(lim)

      const list = await cursor.toArray()

      return res.status(200).json({ data: list, total, page: pageNum, limit: lim })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Participants list error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
