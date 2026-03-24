// pages/api/support.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { MailtrapClient } from 'mailtrap'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { accountId, fullName, email } = req.body || {}
  if (!accountId || !fullName || !email) {
    return res.status(400).json({ message: 'Missing fields' })
  }

  const TOKEN = process.env.MAILTRAP_API_KEY || "f1912ab58653375278435a75ef283faa"
  
  try {
    const client = new MailtrapClient({ token: TOKEN })

    // Usando el mismo remitente que funcionó en el curl
    const result = await client.send({
      from: {
        email: "hello@www.xn--9maienespaol-jhb.com",
        name: "9MX Soporte",
      },
      to: [{ email: "gsabusinesses@gmail.com" }], // Cambia al email que necesites
      subject: "Solicitud de Atención al Cliente - 9MX",
      text: `ID de cuenta: ${accountId}\nNombre: ${fullName}\nEmail: ${email}`,
      html: `
        <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; color: #111;">
          <div style="max-width:600px;margin:0 auto;padding:20px;border:1px solid #eee;border-radius:8px;background:#fff">
            <h2 style="color:#d4af37;margin:0 0 8px">Solicitud de Atención al Cliente</h2>
            <p style="margin:0 0 16px;color:#333">Has recibido una nueva solicitud desde el formulario de soporte.</p>
            <table style="width:100%;border-collapse:collapse">
              <tr><td style="padding:8px;border-top:1px solid #f0f0f0;font-weight:600;width:160px">ID de cuenta</td><td style="padding:8px;border-top:1px solid #f0f0f0">${accountId}</td></tr>
              <tr><td style="padding:8px;border-top:1px solid #f0f0f0;font-weight:600">Nombre Completo</td><td style="padding:8px;border-top:1px solid #f0f0f0">${fullName}</td></tr>
              <tr><td style="padding:8px;border-top:1px solid #f0f0f0;font-weight:600">Email</td><td style="padding:8px;border-top:1px solid #f0f0f0">${email}</td></tr>
            </table>
            <p style="margin:18px 0 0;color:#666;font-size:13px">Mensaje enviado desde el sistema de soporte de <strong>9MX</strong>.</p>
          </div>
        </div>
      `,
      category: "Soporte 9MX",
    })

    console.log('Email sent:', result)
    
    return res.status(200).json({ 
      message: 'Email sent successfully', 
      success: true,
      message_id: result.message_ids?.[0]
    })

  } catch (error: any) {
    console.error('Mailtrap error:', error)
    
    let errorMessage = error?.message || 'Unknown error'
    
    if (error?.response?.data?.errors) {
      errorMessage = error.response.data.errors.join(', ')
    }
    
    return res.status(500).json({ 
      message: 'Error sending email', 
      error: errorMessage,
      success: false 
    })
  }
}