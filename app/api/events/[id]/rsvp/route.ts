import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'

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

  // Robustly resolve dynamic :id even if Next doesn't populate params
  let id = params?.id
    let emailSent = false
    try {
    const pathname = req.nextUrl?.pathname || ''
    const m = pathname.match(/\/api\/events\/([^/]+)\/rsvp/)
    if (m && m[1]) id = m[1]
  }
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Missing event id' }, { status: 400, headers })
  }

          requireTLS: Number(SMTP_PORT) === 587,
  let body: any
  try {
    body = await req.json()
  } catch {
        const info = await transporter.sendMail({
  }

          replyTo: email,
  const { email, name, whatsapp, telegram, country, heardFrom, message } = body || {}
  if (!email) {
    return NextResponse.json({ error: 'email is required' }, { status: 400, headers })
        })
        emailSent = Boolean(info?.messageId)

    } catch (mailErr) {
      console.error('RSVP mail error', mailErr)
    const client = await clientPromise
    return NextResponse.json({ message: 'Registered', id: String(result.insertedId), emailSent }, { status: 201, headers })
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

    const brandColor = '#6d28d9'

    if (existing) {
      const resend = req.nextUrl.searchParams.get('resend')
      const shouldResend = resend === '1' || resend === 'true'

      if (shouldResend) {
        try {
          const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RSVP_EMAIL_TO } = process.env as Record<string, string | undefined>
          if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && RSVP_EMAIL_TO) {
            const nodemailer = await (new Function('return import("nodemailer")') as () => Promise<any>)()
            const transporter = nodemailer.createTransport({
              host: SMTP_HOST,
              port: Number(SMTP_PORT),
              secure: Number(SMTP_PORT) === 465,
              auth: { user: SMTP_USER, pass: SMTP_PASS },
            })
            const whenDup = event?.date ? new Date(event.date).toLocaleString() : 'Fecha por definir'
            const whereDup = event?.location || 'Ubicación por definir'
            const html = `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Reenvío asistencia</title><style>body{margin:0;padding:0;background:#f7f7fb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#222;text-align:left}.container{max-width:640px;margin:24px auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}.header{display:flex;align-items:center;gap:12px;padding:16px 20px;background:${brandColor};color:#fff}.header-title{font-size:16px;font-weight:600;letter-spacing:.2px}.hero{padding:20px;background:linear-gradient(135deg,rgba(109,40,217,.08),rgba(99,102,241,.08));text-align:left}.card{padding:20px;text-align:left}.pill{display:inline-block;padding:6px 10px;font-size:12px;border-radius:999px;background:rgba(109,40,217,.12);color:${brandColor};font-weight:600;letter-spacing:.2px}.title{font-size:20px;font-weight:700;margin:10px 0 4px}.muted{color:#6b7280;font-size:14px}.list{margin:16px 0 0;padding:0;list-style:none}.row{display:flex;gap:10px;align-items:flex-start;margin:8px 0}.key{width:140px;color:#6b7280;font-weight:600;font-size:13px;text-align:left}.val{flex:1;font-size:14px;text-align:left}.footer{padding:16px 20px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;text-align:left}</style></head><body><div class="container"><div class="header"><div class="header-title">9M AI — Reenvío asistencia registrada</div></div><div class="hero"><span class="pill">Evento</span><div class="title">${event?.title || 'Evento'}</div><div class="muted">${whenDup} • ${whereDup}</div></div><div class="card"><ul class="list"><li class="row"><div class="key">Nombre</div><div class="val">${name || '-'}</div></li><li class="row"><div class="key">Email</div><div class="val">${email}</div></li><li class="row"><div class="key">WhatsApp</div><div class="val">${whatsapp || '-'}</div></li><li class="row"><div class="key">Telegram</div><div class="val">${telegram || '-'}</div></li><li class="row"><div class="key">País</div><div class="val">${country || '-'}</div></li><li class="row"><div class="key">¿Cómo nos conoció?</div><div class="val">${heardFrom || '-'}</div></li><li class="row"><div class="key">Mensaje</div><div class="val">${message || '-'}</div></li></ul></div><div class="footer">Este correo fue generado automáticamente por el sistema de RSVP de 9M AI.</div></div></body></html>`
            await transporter.sendMail({
              from: `RSVP 9M AI <${SMTP_USER}>`,
              to: RSVP_EMAIL_TO,
              subject: `Reenvío asistencia registrada: ${event?.title || id}`,
              text: `Reenvío de asistencia para el evento\n\nEvento: ${event?.title || id}\nFecha/Hora: ${whenDup}\nLugar: ${whereDup}\n\nNombre: ${name || '-'}\nEmail: ${email}\nWhatsApp: ${whatsapp || '-'}\nTelegram: ${telegram || '-'}\nPaís: ${country || '-'}\n¿Cómo nos conoció?: ${heardFrom || '-'}\nMensaje: ${message || '-'}\n\n(Registro ya existente)`,
              html,
            })
          }
        } catch (e) {
          console.error('RSVP duplicate mail error', e)
        }
      }
      return NextResponse.json({ message: 'Already registered', resent: shouldResend }, { status: 200, headers })
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

    try {
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RSVP_EMAIL_TO } = process.env as Record<string, string | undefined>
      if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && RSVP_EMAIL_TO) {
        const nodemailer = await (new Function('return import("nodemailer")') as () => Promise<any>)()
        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT),
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })
        const when = event?.date ? new Date(event.date).toLocaleString() : 'Fecha por definir'
        const where = event?.location || 'Ubicación por definir'
        const html = `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Nueva asistencia</title><style>body{margin:0;padding:0;background:#f7f7fb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#222;text-align:left}.container{max-width:640px;margin:24px auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}.header{display:flex;align-items:center;gap:12px;padding:16px 20px;background:${brandColor};color:#fff}.header-title{font-size:16px;font-weight:600;letter-spacing:.2px}.hero{padding:20px;background:linear-gradient(135deg,rgba(109,40,217,.08),rgba(99,102,241,.08));text-align:left}.card{padding:20px;text-align:left}.pill{display:inline-block;padding:6px 10px;font-size:12px;border-radius:999px;background:rgba(109,40,217,.12);color:${brandColor};font-weight:600;letter-spacing:.2px}.title{font-size:20px;font-weight:700;margin:10px 0 4px}.muted{color:#6b7280;font-size:14px}.list{margin:16px 0 0;padding:0;list-style:none}.row{display:flex;gap:10px;align-items:flex-start;margin:8px 0}.key{width:140px;color:#6b7280;font-weight:600;font-size:13px;text-align:left}.val{flex:1;font-size:14px;text-align:left}.footer{padding:16px 20px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;text-align:left}.btn{display:inline-block;background:${brandColor};color:#fff !important;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;font-size:14px}</style></head><body><div class="container"><div class="header"><div class="header-title">9M AI — Nueva asistencia registrada</div></div><div class="hero"><span class="pill">Evento</span><div class="title">${event?.title || 'Evento'}</div><div class="muted">${when} • ${where}</div></div><div class="card"><ul class="list"><li class="row"><div class="key">Nombre</div><div class="val">${name || '-'}</div></li><li class="row"><div class="key">Email</div><div class="val">${email}</div></li><li class="row"><div class="key">WhatsApp</div><div class="val">${whatsapp || '-'}</div></li><li class="row"><div class="key">Telegram</div><div class="val">${telegram || '-'}</div></li><li class="row"><div class="key">País</div><div class="val">${country || '-'}</div></li><li class="row"><div class="key">¿Cómo nos conoció?</div><div class="val">${heardFrom || '-'}</div></li><li class="row"><div class="key">Mensaje</div><div class="val">${message || '-'}</div></li><li class="row"><div class="key">Registro</div><div class="val">${String(result.insertedId)}</div></li></ul><div style="margin-top:16px;"><a class="btn" href="mailto:${RSVP_EMAIL_TO}">Responder</a></div></div><div class="footer">Este correo fue generado automáticamente por el sistema de RSVP de 9M AI.</div></div></body></html>`
        await transporter.sendMail({
          from: `RSVP 9M AI <${SMTP_USER}>`,
          to: RSVP_EMAIL_TO,
          subject: `Nueva asistencia registrada: ${event?.title || id}`,
          text: `Nueva asistencia para el evento\n\nEvento: ${event?.title || id}\nFecha/Hora: ${when}\nLugar: ${where}\n\nNombre: ${name || '-'}\nEmail: ${email}\nWhatsApp: ${whatsapp || '-'}\nTelegram: ${telegram || '-'}\nPaís: ${country || '-'}\n¿Cómo nos conoció?: ${heardFrom || '-'}\nMensaje: ${message || '-'}\n\nID de registro: ${String(result.insertedId)}`,
          html,
        })
      }
    } catch (mailErr) {
      console.error('RSVP mail error', mailErr)
    }

    return NextResponse.json({ message: 'Registered', id: String(result.insertedId) }, { status: 201, headers })
  } catch (err) {
    console.error('RSVP error', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500, headers })
  }
}
