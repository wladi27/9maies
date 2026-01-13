import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
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

export async function POST(req: NextRequest) {
  const headers = corsHeaders(req)

  let body: any
  try {
    body = await req.json()
  } catch (e) {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400, headers })
  }

  const {
    productId,
    email,
    name,
    whatsapp,
    telegram,
    country,
    heardFrom,
    message,
    montoInversion,
    codigoInvitacion,
    codigoReferido,
    codigoPatrocinador,
  } = body || {}

  if (!email) return NextResponse.json({ error: 'email is required' }, { status: 400, headers })
  if (!montoInversion) return NextResponse.json({ error: 'montoInversion is required' }, { status: 400, headers })
  if (!codigoInvitacion) return NextResponse.json({ error: 'codigoInvitacion is required' }, { status: 400, headers })
  // Accept either codigoPatrocinador (new) or codigoReferido (legacy)
  const sponsorCode = codigoPatrocinador || codigoReferido
  if (!sponsorCode) return NextResponse.json({ error: 'codigoPatrocinador is required' }, { status: 400, headers })

  try {
    const client = await clientPromise
    const db = client.db()
    const col = db.collection('academy_signups')

    const doc: any = {
      productId: productId || 'academia',
      email,
      name: name || null,
      whatsapp: whatsapp || null,
      telegram: telegram || null,
      country: country || null,
      heardFrom: heardFrom || null,
      message: message || null,
      montoInversion,
      codigoInvitacion,
      codigoPatrocinador: sponsorCode,
      // keep legacy field if provided
      ...(codigoReferido ? { codigoReferido } : {}),
      createdAt: new Date(),
    }

    const result = await col.insertOne(doc)

    return NextResponse.json({ message: 'Signed up', id: String(result.insertedId) }, { status: 201, headers })
  } catch (err) {
    console.error('Academy signup error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers })
  }
}
