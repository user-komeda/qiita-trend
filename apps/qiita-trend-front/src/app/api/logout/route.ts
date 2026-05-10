import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

import { deleteSession } from '@/app/util/session'

/**
 * /api/logout
 * セッションを破棄する（リダイレクトはフロント側で行う）
 */
export async function POST(): Promise<Response> {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value

  if (sessionId !== undefined && sessionId !== '') {
    await deleteSession(sessionId)
  }

  const response = new NextResponse(null, { status: 204 })
  response.cookies.delete({ name: 'sessionId', path: '/' })
  return response
}
