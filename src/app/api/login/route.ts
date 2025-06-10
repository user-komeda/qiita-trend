import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import * as v from 'valibot'

import { BASE_URL } from '@/app/const/const'

const OFF_SET = 1

const schema = v.object({
  code: v.string(),
})

export async function POST(request: NextRequest): Promise<Response> {
  const body: unknown = await request.json()

  const parsedBody = v.parse(schema, body)

  const response = await fetch(`${BASE_URL}/public/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: process.env.CLIENT_ID,

      client_secret: process.env.CLIENT_SECRET,
      code: parsedBody.code,
    }),
  })
  const cookieValue = response.headers.get('set-cookie')
  const tokenPartStart = cookieValue?.indexOf('=')
  const tokenPartEnd = cookieValue?.indexOf(';')

  const token =
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
