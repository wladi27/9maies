import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import crypto from 'crypto'

function extractCloudinaryPublicId(url: string) {
  try {
    const u = new URL(url)
    // path after /upload/
    const parts = u.pathname.split('/upload/')
    if (parts.length < 2) return null
    let rest = parts[1] // may contain v123/.../public_id.ext
    // remove version prefix like v1234567890/
    rest = rest.replace(/^v\d+\//, '')
    // remove extension
    const idx = rest.lastIndexOf('.')
    if (idx !== -1) rest = rest.slice(0, idx)
    return rest
  } catch (err) {
    return null
  }
}

async function destroyCloudinaryImage(publicId: string) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME
  const apiKey = process.env.CLOUDINARY_API_KEY
  const apiSecret = process.env.CLOUDINARY_API_SECRET
  if (!cloudName || !apiKey || !apiSecret) {
    // not configured
    console.warn('Cloudinary not configured for delete (missing env vars)')
    return false
  }

  const timestamp = Math.floor(Date.now() / 1000)
  const signatureBase = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`
  const signature = crypto.createHash('sha1').update(signatureBase).digest('hex')

  const form = new URLSearchParams()
  form.append('public_id', publicId)
  form.append('api_key', apiKey)
  form.append('timestamp', String(timestamp))
  form.append('signature', signature)

  const resp = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
    method: 'POST',
    body: form.toString(),
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  const data = await resp.json()
  if (!resp.ok || !(data.result === 'ok' || data.result === 'not_found')) {
    // log for debugging
    // eslint-disable-next-line no-console
    console.error('Cloudinary delete response', { status: resp.status, data })
    return false
  }
  return true
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing event id' })
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const events = db.collection('events')

    if (req.method === 'GET') {
      const event = await events.findOne({ _id: new ObjectId(id) })
      if (!event) return res.status(404).json({ error: 'Event not found' })
      return res.status(200).json(event)
    }

    if (req.method === 'PUT') {
      const { title, description, date, location, featuredImage } = req.body || {}
      const update: any = { updatedAt: new Date() }
      if (title !== undefined) update.title = title
      if (description !== undefined) update.description = description
      if (date !== undefined) update.date = date ? new Date(date) : null
      if (location !== undefined) update.location = location
      if (featuredImage !== undefined) update.featuredImage = featuredImage

      // support storing featuredPublicId when provided
      if ((req.body && req.body.featuredPublicId) !== undefined) update.featuredPublicId = req.body.featuredPublicId

      const result = await events.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: update },
        { returnDocument: 'after' }
      )

      return res.status(200).json(result.value)
    }

    if (req.method === 'DELETE') {
      // remove event and its participants
      const participants = db.collection('participants')
      const event = await events.findOne({ _id: new ObjectId(id) })

      // delete participants
      await participants.deleteMany({ eventId: new ObjectId(id) })

      // attempt to delete cloudinary image if present
      try {
        let publicId: string | null = null
        if (event?.featuredPublicId && typeof event.featuredPublicId === 'string') {
          publicId = event.featuredPublicId
          // eslint-disable-next-line no-console
          console.log('Using stored featuredPublicId for Cloudinary delete', publicId)
        } else if (event?.featuredImage && typeof event.featuredImage === 'string') {
          publicId = extractCloudinaryPublicId(event.featuredImage)
          // eslint-disable-next-line no-console
          console.log('Extracted publicId from featuredImage', publicId)
        }

        if (publicId) {
          const ok = await destroyCloudinaryImage(publicId)
          if (!ok) {
            // eslint-disable-next-line no-console
            console.error('Cloudinary reported failure deleting publicId', publicId)
          }
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Cloudinary delete failed', err)
      }

      await events.deleteOne({ _id: new ObjectId(id) })
      return res.status(204).end()
    }

    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Event [id] error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
