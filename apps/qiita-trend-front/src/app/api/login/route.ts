import { randomBytes } from 'crypto'

import { NextResponse } from 'next/server'

const STATE_BYTES = 32
const STATE_MAX_AGE_SEC = 600

/**
 * /api/login
 * ログイン開始のみ行う
 */
export function GET(request: Request): Response {
  const newState = randomBytes(STATE_BYTES).toString('hex')

  const clientId = process.env.CLIENT_ID ?? ''
  const authorizeUrl =
    `https://qiita.com/api/v2/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=${encodeURIComponent('read_qiita write_qiita')}` +
    `&state=${encodeURIComponent(newState)}` +
    `&redirect_uri=${encodeURIComponent(`${new URL(request.url).origin}/api/login/redirect`)}`

  const response = NextResponse.redirect(authorizeUrl)
  response.cookies.set({
    name: 'oauth_state',
    value: newState,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: STATE_MAX_AGE_SEC,
  })
  return response
}
