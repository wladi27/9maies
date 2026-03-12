import type { NextApiRequest, NextApiResponse } from 'next'
import * as jose from 'jose'
import { serialize } from 'cookie'
import bcrypt from 'bcryptjs'
import clientPromise from '@/lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error('Missing environment variable: "JWT_SECRET"')
}

const secret = new TextEncoder().encode(JWT_SECRET)
const alg = 'HS256'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { username, password } = req.body || {}

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' })
    }

    try {
      const client = await clientPromise
      const db = client.db()
      const users = db.collection('users')

      const user = await users.findOne({ username })
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const passwordMatches = await bcrypt.compare(password, user.password)
      if (!passwordMatches) {
        return res.status(401).json({ error: 'Invalid credentials' })
      }

      const token = await new jose.SignJWT({ username: user.username, role: user.role })
        .setProtectedHeader({ alg })
        .setIssuedAt()
        .setExpirationTime('2h')
        .sign(secret)

      const cookie = serialize('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 60 * 60 * 2, // 2 hours
        path: '/',
      })

      res.setHeader('Set-Cookie', cookie)
      return res.status(200).json({ message: 'Login successful' })
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Login error', err)
      return res.status(500).json({ error: 'Internal server error' })
    }
  } else if (req.method === 'GET' && req.url?.endsWith('/logout')) {
    const cookie = serialize('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    })

    res.setHeader('Set-Cookie', cookie)
    res.status(200).json({ message: 'Logout successful' })
  } else {
    res.setHeader('Allow', ['POST', 'GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
