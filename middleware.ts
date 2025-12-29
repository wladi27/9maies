import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import * as jose from 'jose'

const JWT_SECRET = process.env.JWT_SECRET
const secret = JWT_SECRET ? new TextEncoder().encode(JWT_SECRET) : null

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value

  // Protect admin routes without crashing the entire app if env is missing
  if (req.nextUrl.pathname.startsWith('/admin')) {
    // If no secret or no token, redirect to login
    if (!secret || !token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    try {
      await jose.jwtVerify(token, secret)
      return NextResponse.next()
    } catch (err) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  // Allow all other routes
  return NextResponse.next()
}
