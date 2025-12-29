import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../../lib/mongodb'
import { ObjectId } from 'mongodb'
// import path from 'path'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query
  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Missing event id' })
  }

  // Basic CORS/preflight support for JSON requests
  const origin = req.headers.origin || '*'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Vary', 'Origin')
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.setHeader('Allow', ['POST', 'OPTIONS'])
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS'])
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` })
  }

  const { email, name, whatsapp, telegram, country, heardFrom, message } = req.body || {}
  if (!email) {
    return res.status(400).json({ error: 'email is required' })
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
    // Fallback para IDs estáticos usados en la UI (evt-1, evt-2, evt-3)
    // Esto asegura que el correo muestre título/fecha/lugar incluso cuando el evento no está en la BD.
    if (!event) {
      const staticEvents: Record<string, { title: string; description?: string; date: string; location: string; featuredImage?: string | null }> = {
        'evt-1': {
          title: 'Evento en Panamá',
          date: new Date(2026, 0, 8, 18, 0, 0).toISOString(), // 08 enero 2026
          location: 'Panamá',
          featuredImage: '/panama.jpg',
        },
        'evt-2': {
          title: 'Evento en Dubái EAU',
          date: new Date(2026, 1, 6, 10, 0, 0).toISOString(), // inicio 06 febrero 2026
          location: 'Dubái, EAU',
          featuredImage: '/dubai.jpg',
        },
        'evt-3': {
          title: 'Evento en México',
          date: new Date(2025, 11, 17, 16, 0, 0).toISOString(), // 17 diciembre 2025
          location: 'Ciudad de México, México',
          featuredImage: '/mexico.jpg',
        },
      }
      event = staticEvents[String(id)] || null
    }
    // Si el evento no existe en BD (IDs estáticos), seguimos permitiendo el registro

    const existing = eventObjectId
      ? await participants.findOne({ eventId: eventObjectId, email })
      : await participants.findOne({ eventSlug: id, email })
    if (existing) {
      // Idempotent behavior: allow duplicate and optionally resend email
      const resendParam = req.query?.resend
      const shouldResend = Array.isArray(resendParam)
        ? resendParam.includes('1') || resendParam.includes('true')
        : resendParam === '1' || resendParam === 'true'

      if (shouldResend) {
        try {
          const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RSVP_EMAIL_TO } = process.env as Record<string, string | undefined>
          if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && RSVP_EMAIL_TO) {
            console.log('[RSVP] Duplicate registration, resending email')
            const dynamicImport = new Function('return import("nodemailer")') as () => Promise<any>
            const nodemailer = await dynamicImport()
            const transporter = nodemailer.createTransport({
              host: SMTP_HOST,
              port: Number(SMTP_PORT),
              secure: Number(SMTP_PORT) === 465,
              auth: { user: SMTP_USER, pass: SMTP_PASS },
            })
            const whenDup = event?.date ? new Date(event.date).toLocaleString() : 'Fecha por definir'
            const whereDup = event?.location || 'Ubicación por definir'
            const brandColor = '#6d28d9'
            const html = `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Reenvío asistencia</title><style>body{margin:0;padding:0;background:#f7f7fb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#222;text-align:left}.container{max-width:640px;margin:24px auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}.header{display:flex;align-items:center;gap:12px;padding:16px 20px;background:${brandColor};color:#fff}.header-title{font-size:16px;font-weight:600;letter-spacing:.2px}.hero{padding:20px;background:linear-gradient(135deg,rgba(109,40,217,.08),rgba(99,102,241,.08));text-align:left}.card{padding:20px;text-align:left}.pill{display:inline-block;padding:6px 10px;font-size:12px;border-radius:999px;background:rgba(109,40,217,.12);color:${brandColor};font-weight:600;letter-spacing:.2px}.title{font-size:20px;font-weight:700;margin:10px 0 4px}.muted{color:#6b7280;font-size:14px}.list{margin:16px 0 0;padding:0;list-style:none}.row{display:flex;gap:10px;align-items:flex-start;margin:8px 0}.key{width:140px;color:#6b7280;font-weight:600;font-size:13px;text-align:left}.val{flex:1;font-size:14px;text-align:left}.footer{padding:16px 20px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;text-align:left}</style></head><body><div class="container"><div class="header"><div class="header-title">9M AI — Reenvío asistencia registrada</div></div><div class="hero"><span class="pill">Evento</span><div class="title">${event?.title || 'Evento'}</div><div class="muted">${whenDup} • ${whereDup}</div></div><div class="card"><ul class="list"><li class="row"><div class="key">Nombre</div><div class="val">${name || '-'}</div></li><li class="row"><div class="key">Email</div><div class="val">${email}</div></li><li class="row"><div class="key">WhatsApp</div><div class="val">${whatsapp || '-'}</div></li><li class="row"><div class="key">Telegram</div><div class="val">${telegram || '-'}</div></li><li class="row"><div class="key">País</div><div class="val">${country || '-'}</div></li><li class="row"><div class="key">¿Cómo nos conoció?</div><div class="val">${heardFrom || '-'}</div></li><li class="row"><div class="key">Mensaje</div><div class="val">${message || '-'}</div></li></ul></div><div class="footer">Este correo fue generado automáticamente por el sistema de RSVP de 9M AI.</div></div></body></html>`
            const mailOptions = {
              from: `RSVP 9M AI <${SMTP_USER}>`,
              to: RSVP_EMAIL_TO,
              subject: `Reenvío asistencia registrada: ${event?.title || id}`,
              text: `Reenvío de asistencia para el evento\n\nEvento: ${event?.title || id}\nFecha/Hora: ${whenDup}\nLugar: ${whereDup}\n\nNombre: ${name || '-'}\nEmail: ${email}\nWhatsApp: ${whatsapp || '-'}\nTelegram: ${telegram || '-'}\nPaís: ${country || '-'}\n¿Cómo nos conoció?: ${heardFrom || '-'}\nMensaje: ${message || '-'}\n\n(Registro ya existente)`,
              html,
              // attachments: [],
            }
            const info = await transporter.sendMail(mailOptions)
            console.log('[RSVP] Duplicate mail sent: %s', info?.messageId || 'unknown')
          }
        } catch (mailErr) {
          console.error('RSVP duplicate mail error', mailErr)
        }
      }
      return res.status(200).json({ message: 'Already registered', resent: shouldResend })
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
    // Attempt to send notification email if SMTP is configured
    try {
      const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RSVP_EMAIL_TO } = process.env as Record<string, string | undefined>
      if (SMTP_HOST && SMTP_PORT && SMTP_USER && SMTP_PASS && RSVP_EMAIL_TO) {
        console.log('[RSVP] SMTP config detected: host=%s port=%s user=%s to=%s', SMTP_HOST, SMTP_PORT, SMTP_USER, RSVP_EMAIL_TO)
        // Dynamic import to avoid type/module resolution issues when nodemailer is not installed
        const dynamicImport = new Function('return import("nodemailer")') as () => Promise<any>
        const nodemailer = await dynamicImport()

        const transporter = nodemailer.createTransport({
          host: SMTP_HOST,
          port: Number(SMTP_PORT),
          secure: Number(SMTP_PORT) === 465,
          auth: { user: SMTP_USER, pass: SMTP_PASS },
        })

  const when = event?.date ? new Date(event.date).toLocaleString() : 'Fecha por definir'
  const where = event?.location || 'Ubicación por definir'

        const brandColor = '#6d28d9'
  const html = `<!doctype html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Nueva asistencia</title><style>body{margin:0;padding:0;background:#f7f7fb;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#222;text-align:left}.container{max-width:640px;margin:24px auto;background:#fff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden}.header{display:flex;align-items:center;gap:12px;padding:16px 20px;background:${brandColor};color:#fff}.header-title{font-size:16px;font-weight:600;letter-spacing:.2px}.hero{padding:20px;background:linear-gradient(135deg,rgba(109,40,217,.08),rgba(99,102,241,.08));text-align:left}.card{padding:20px;text-align:left}.pill{display:inline-block;padding:6px 10px;font-size:12px;border-radius:999px;background:rgba(109,40,217,.12);color:${brandColor};font-weight:600;letter-spacing:.2px}.title{font-size:20px;font-weight:700;margin:10px 0 4px}.muted{color:#6b7280;font-size:14px}.list{margin:16px 0 0;padding:0;list-style:none}.row{display:flex;gap:10px;align-items:flex-start;margin:8px 0}.key{width:140px;color:#6b7280;font-weight:600;font-size:13px;text-align:left}.val{flex:1;font-size:14px;text-align:left}.footer{padding:16px 20px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;text-align:left}.btn{display:inline-block;background:${brandColor};color:#fff !important;text-decoration:none;padding:10px 14px;border-radius:8px;font-weight:600;font-size:14px}</style></head><body><div class="container"><div class="header"><div class="header-title">9M AI — Nueva asistencia registrada</div></div><div class="hero"><span class="pill">Evento</span><div class="title">${event?.title || 'Evento'}</div><div class="muted">${when} • ${where}</div></div><div class="card"><ul class="list"><li class="row"><div class="key">Nombre</div><div class="val">${name || '-'}</div></li><li class="row"><div class="key">Email</div><div class="val">${email}</div></li><li class="row"><div class="key">WhatsApp</div><div class="val">${whatsapp || '-'}</div></li><li class="row"><div class="key">Telegram</div><div class="val">${telegram || '-'}</div></li><li class="row"><div class="key">País</div><div class="val">${country || '-'}</div></li><li class="row"><div class="key">¿Cómo nos conoció?</div><div class="val">${heardFrom || '-'}</div></li><li class="row"><div class="key">Mensaje</div><div class="val">${message || '-'}</div></li><li class="row"><div class="key">Registro</div><div class="val">${String(result.insertedId)}</div></li></ul><div style="margin-top:16px;"><a class="btn" href="mailto:${RSVP_EMAIL_TO}">Responder</a></div></div><div class="footer">Este correo fue generado automáticamente por el sistema de RSVP de 9M AI.</div></div></body></html>`
        const mailOptions = {
          from: `RSVP 9M AI <${SMTP_USER}>`,
          to: RSVP_EMAIL_TO,
          subject: `Nueva asistencia registrada: ${event?.title || id}`,
          text: `Nueva asistencia para el evento\n\nEvento: ${event?.title || id}\nFecha/Hora: ${when}\nLugar: ${where}\n\nNombre: ${name || '-'}\nEmail: ${email}\nWhatsApp: ${whatsapp || '-'}\nTelegram: ${telegram || '-'}\nPaís: ${country || '-'}\n¿Cómo nos conoció?: ${heardFrom || '-'}\nMensaje: ${message || '-'}\n\nID de registro: ${String(result.insertedId)}`,
          html,
          // attachments: [],
        }
        const info = await transporter.sendMail(mailOptions)
        console.log('[RSVP] Mail sent: %s', info?.messageId || 'unknown')
      }
    } catch (mailErr) {
      // log but don't fail the request if email fails
      console.error('RSVP mail error', mailErr)
    }

    return res.status(201).json({ message: 'Registered', id: result.insertedId })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('RSVP error', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
