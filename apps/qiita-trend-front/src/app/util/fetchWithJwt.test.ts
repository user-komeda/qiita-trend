/* eslint-disable max-lines */
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import fetchWithJwt from '@/app/util/fetchWithJwt'
import createJwt from '@/app/util/jwt'

vi.mock(import('next/headers'), () => ({
  cookies: vi.fn<typeof cookies>(),
}))

vi.mock(import('next/navigation'), () => ({
  redirect: vi.fn<typeof redirect>(),
}))

vi.mock(import('./jwt'), () => ({
  default: vi.fn<typeof createJwt>(),
}))

// eslint-disable-next-line max-lines-per-function
describe(fetchWithJwt, () => {
  const setupMocks = (sessionId: string | undefined) => {
    const mockCookieStore = {
      get: vi
        .fn<(key: string) => { value: string } | undefined>()
        .mockReturnValue(sessionId ? { value: sessionId } : undefined),
    }
    vi.mocked(cookies).mockResolvedValue(
      mockCookieStore as unknown as Awaited<ReturnType<typeof cookies>>,
    )
    vi.mocked(createJwt).mockResolvedValue('test-jwt')
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ ok: true })),
    )

    return mockCookieStore
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(global, 'fetch').mockImplementation(
      vi
        .fn<typeof fetch>()
        .mockResolvedValue(new Response(JSON.stringify({ ok: true }))),
    )
  })

  test('正しいヘッダーを付けてfetchを呼び出すこと', async () => {
    expect.hasAssertions()

    const mockCookieStore = setupMocks('test-session-id')

    const path = 'https://api.example.com/test'
    await fetchWithJwt(path)

    expect(cookies).toHaveBeenCalledWith()
    expect(mockCookieStore.get).toHaveBeenCalledWith('sessionId')
    expect(createJwt).toHaveBeenCalledWith('test-session-id')
    expect(fetch).toHaveBeenCalledWith(
      path,
      expect.objectContaining({
        headers: expect.any(Headers) as Headers,
      }),
    )

    const callArgs = vi.mocked(fetch).mock.calls[0]
    const headers = callArgs[1]?.headers as Headers

    expect(headers.get('Authorization')).toBe('Bearer test-jwt')
  })

  test('sessionIdが存在しない場合でも動作すること', async () => {
    expect.hasAssertions()

    const mockCookieStore = setupMocks(undefined)

    await fetchWithJwt('/api/data')

    expect(mockCookieStore.get).toHaveBeenCalledWith('sessionId')
    expect(createJwt).toHaveBeenCalledWith(undefined)
    expect(fetch).toHaveBeenCalledWith(
      '/api/data',
      expect.objectContaining({
        headers: expect.any(Headers) as Headers,
      }),
    )
  })

  test('既存のヘッダーを保持しつつAuthorizationを追加すること', async () => {
    expect.hasAssertions()

    setupMocks(undefined)

    await fetchWithJwt('/api/data', {
      headers: { 'Content-Type': 'application/json' },
    })

    const callArgs = vi.mocked(fetch).mock.calls[0]
    const headers = callArgs[1]?.headers as Headers

    expect(headers.get('Content-Type')).toBe('application/json')
    expect(headers.get('Authorization')).toBe('Bearer test-jwt')
  })

  test('401エラー時にログイン画面にリダイレクトすること', async () => {
    expect.hasAssertions()

    setupMocks(undefined)
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 401 }))

    await fetchWithJwt('/api/data')

    expect(redirect).toHaveBeenCalledWith('/login')
  })

  test('レスポンスがokでない場合にエラーメッセージを返すこと', async () => {
    expect.hasAssertions()

    setupMocks(undefined)
    vi.mocked(fetch).mockResolvedValueOnce(new Response(null, { status: 500 }))

    const result = (await fetchWithJwt('/api/data')) as {
      ok: false
      message: string
      status?: number
    }

    expect(result.ok).toBe(false)
    expect(result.status).toBe(500)
    expect(result.message).toBe(
      'エラーが発生しました。時間をおいて再度お試しください。',
    )
  })

  test('fetchが例外を投げた場合にエラーメッセージを返すこと', async () => {
    expect.hasAssertions()

    setupMocks(undefined)
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'))

    const result = await fetchWithJwt('/api/data')

    expect(result.ok).toBe(false)
    expect(
      (
        result as {
          ok: false
          message: string
          status?: number
        }
      ).message,
    ).toBe('エラーが発生しました。時間をおいて再度お試しください。')
  })
})
