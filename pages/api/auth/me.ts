import type { NextApiRequest, NextApiResponse } from 'next'
import { parse } from 'cookie'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('Missing environment variable: "JWT_SECRET"')
}

const secret = new TextEncoder().encode(JWT_SECRET)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const cookie = req.headers.cookie
    if (!cookie) return res.status(401).json({ error: 'Not authenticated' })

    const { token } = parse(cookie)
    if (!token) return res.status(401).json({ error: 'Not authenticated' })

    const { payload } = await jose.jwtVerify(token, secret)
    // payload contains whatever was in SignJWT — username and role
    return res.status(200).json({ user: payload })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Auth me error', err)
    return res.status(401).json({ error: 'Invalid token' })
  }
}
