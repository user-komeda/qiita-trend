import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'

import { BASE_URL } from '@/app/const/const'

const OFF_SET = 1
/**
 *rootHandler
 *
 * @param request - request
 *
 * @returns response
 */
// eslint-disable-next-line  no-restricted-syntax
export async function POST(request: NextRequest): Promise<Response> {
  const body = await request.json()

  const response = await fetch(`${BASE_URL}/public/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // eslint-disable-next-line camelcase
      client_id: process.env.CLIENT_ID,
      // eslint-disable-next-line camelcase
      client_secret: process.env.CLIENT_SECRET,
      code: body.code,
    }),
  })
  const cookieValue = response.headers.get('set-cookie')
  const tokenPartStart = cookieValue?.indexOf('=')
  const tokenPartEnd = cookieValue?.indexOf(';')

  const token =
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    tokenPartStart && tokenPartEnd
      ? cookieValue?.substring(tokenPartStart + OFF_SET, tokenPartEnd)
      : ''
  const cookie = await cookies()
  cookie.set({
    name: 'token',
    value: token ?? '',
    sameSite: 'lax',
    secure: false,
    domain: 'localhost',
    path: '/',
    httpOnly: true,
  })

  return Response.json({ data: 'resultData' })
}
