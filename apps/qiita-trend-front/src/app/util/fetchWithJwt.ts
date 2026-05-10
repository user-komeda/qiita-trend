import { cookies } from 'next/headers'

import createJwt from '@/app/util/jwt'

const fetchWithJwt = async (
  path: string,
  init: RequestInit = {},
): Promise<Response> => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value
  const jwt = await createJwt(sessionId)
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${jwt}`)

  return await fetch(path, { ...init, headers })
}

export default fetchWithJwt
