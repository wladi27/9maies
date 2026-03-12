import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'

export const runtime = 'nodejs'

function corsHeaders(req: NextRequest) {
  const origin = req.headers.get('origin') || '*'
  return {
    'Access-Control-Allow-Origin': origin,
    Vary: 'Origin',
    'Access-Control-Allow-Methods': 'POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  }
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 200, headers: corsHeaders(req) })
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const headers = corsHeaders(req)

  // Resolve :id from params or pathname
  let id = params?.id
  try {
    const pathname = req.nextUrl?.pathname || ''
    const m = pathname.match(/\/api\/events\/([^/]+)\/rsvp/)
    if (m && m[1]) id = m[1]
  } catch {}

  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing event id' }, { status: 400, headers })
  }

  let body: any
  try {
    body = await req.json()
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers })
  }

  const { email, name, whatsapp, telegram, country, heardFrom, message } = body || {}
  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400, headers })
  }

  try {
    const client = await clientPromise
    const db = client.db()
    const events = db.collection('events')
    const participants = db.collection('participants')

    let eventObjectId: ObjectId | null = null
    try { eventObjectId = new ObjectId(id) } catch { eventObjectId = null }

    let event: any = null
    if (eventObjectId) {
      event = await events.findOne({ _id: eventObjectId })
    }

    if (!event) {
      const staticEvents: Record<string, { title: string; description?: string; date: string; location: string; featuredImage?: string | null }> = {
        'evt-1': {
          title: 'Evento en Panamá',
          date: new Date(2026, 0, 8, 18, 0, 0).toISOString(),
          location: 'Panamá',
          featuredImage: '/images/panama-evento.png',
        },
        'evt-2': {
          title: 'Evento en Dubái EAU',
          date: new Date(2026, 1, 6, 10, 0, 0).toISOString(),
          location: 'Dubái, EAU',
          featuredImage: '/images/dubai-evento.png',
        },
        'evt-3': {
          title: 'Evento en México',
          date: new Date(2025, 11, 17, 16, 0, 0).toISOString(),
          location: 'Ciudad de México, México',
          featuredImage: '/images/mexico-evento.png',
        },
      }
      event = staticEvents[String(id)] || null
    }

    const existing = eventObjectId
      ? await participants.findOne({ eventId: eventObjectId, email })
      : await participants.findOne({ eventSlug: id, email })

    if (existing) {
      return NextResponse.json({ message: 'Already registered', id: String(existing._id) }, { status: 200, headers })
    }

    const doc: any = {
      email,
      name: name || null,
      whatsapp: whatsapp || null,
      telegram: telegram || null,
      country: country || null,
      heardFrom: heardFrom || null,
      message: message || null,
      createdAt: new Date(),
    }
    if (eventObjectId) doc.eventId = eventObjectId
    else doc.eventSlug = id

    const result = await participants.insertOne(doc)

    return NextResponse.json({ message: 'Registered', id: String(result.insertedId) }, { status: 201, headers })
  } catch (err) {
    console.error('RSVP error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers })
  }
}
