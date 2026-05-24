import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import createJwt from '@/app/util/jwt'

const ERROR_MESSAGE = 'エラーが発生しました。時間をおいて再度お試しください。'

export type FetchWithJwtResult<T> =
  | {
      ok: true
      data: T
    }
  | {
      ok: false
      message: string
      status?: number
    }

const fetchWithJwt = async <T>(
  path: string,
  init: RequestInit = {},
): Promise<FetchWithJwtResult<T>> => {
  const cookieStore = await cookies()
  const sessionId = cookieStore.get('sessionId')?.value
  const jwt = await createJwt(sessionId)
  const headers = new Headers(init.headers)
  headers.set('Authorization', `Bearer ${jwt}`)

  try {
    const response = await fetch(path, { ...init, headers })

    if (response.status === 401) {
      redirect('/login')
    }

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        message: ERROR_MESSAGE,
      }
    }

    const data = (await response.json()) as T

    return {
      ok: true,
      data,
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars,unused-imports/no-unused-vars
  } catch (error) {
    return {
      ok: false,
      message: ERROR_MESSAGE,
    }
  }
}

export default fetchWithJwt
