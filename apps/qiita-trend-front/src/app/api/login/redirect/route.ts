import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import * as v from 'valibot'

import { BASE_URL } from '@/app/const/path'
import { SESSION_MAX_AGE_SEC } from '@/app/const/sessionConfig'
import fetchWithJwt from '@/app/util/fetchWithJwt'
import { generateSessionId, saveSessionToken } from '@/app/util/session'

const tokenSchema = v.object({
  token: v.string(),
})

/**
 * /api/login/redirect
 * Qiita からの callback を処理する
 */
export async function GET(request: NextRequest): Promise<Response> {
  const codeOrResponse = await validation(request)
  if (codeOrResponse instanceof Response) {
    return codeOrResponse
  }
  const code = codeOrResponse

  const backendRes = await fetchWithJwt(`${BASE_URL}/public/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
  if (!backendRes.ok) {
    const response = NextResponse.redirect(
      new URL('/?login=failed', request.url),
    )
    response.cookies.delete('oauth_state')
    return response
  }

  const json: unknown = await backendRes.json()
  return await setResponseCookie(request, json)
}

const validation = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get('code')
  const state = request.nextUrl.searchParams.get('state')
  const error = request.nextUrl.searchParams.get('error')

  const cookieStore = await cookies()
  const expectedState = cookieStore.get('oauth_state')?.value

  // state 検証はエラーレスポンスでも先に行う（CSRF 対策）
  if (expectedState === undefined || state !== expectedState) {
    const response = NextResponse.redirect(
      new URL('/?login=invalid_state', request.url),
    )
    response.cookies.delete('oauth_state')
    return response
  }

  // Qiita 側で認可エラー（ユーザー拒否など）が発生したケース
  if (error !== null) {
    const reason = error === 'access_denied' ? 'denied' : 'error'
    const response = NextResponse.redirect(
      new URL(`/?login=${reason}`, request.url),
    )
    response.cookies.delete('oauth_state')
    return response
  }

  if (code === null) {
    const response = NextResponse.redirect(
      new URL('/?login=invalid_request', request.url),
    )
    response.cookies.delete('oauth_state')
    return response
  }
  return code
}

const setResponseCookie = async (request: NextRequest, json: unknown) => {
  const { token } = v.parse(tokenSchema, json)

  const sessionId = generateSessionId()
  await saveSessionToken(sessionId, token)
  const response = NextResponse.redirect(new URL('/', request.url))
  response.cookies.delete('oauth_state')
  response.cookies.set({
    name: 'sessionId',
    value: sessionId,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE_SEC,
  })
  return response
}
