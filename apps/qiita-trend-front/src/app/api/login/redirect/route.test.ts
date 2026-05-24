/* eslint-disable max-lines */
import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import { describe, expect, vi, test } from 'vitest'

import { GET } from '@/app/api/login/redirect/route'
import fetchWithJwt, { type FetchWithJwtResult } from '@/app/util/fetchWithJwt'
import { generateSessionId, saveSessionToken } from '@/app/util/session'

vi.mock(import('next/headers'), () => ({
  cookies: vi.fn<typeof cookies>(),
}))

type FetchWithJwtMock = <T>(
  path: string,
  init?: RequestInit,
) => Promise<FetchWithJwtResult<T>>

const fetchWithJwtMock = vi.hoisted(() => vi.fn<FetchWithJwtMock>())

vi.mock(import('@/app/util/fetchWithJwt'), () => ({
  default: fetchWithJwtMock as typeof fetchWithJwt,
}))

vi.mock(import('@/app/util/session'), () => ({
  generateSessionId: vi.fn<typeof generateSessionId>(),
  saveSessionToken: vi.fn<typeof saveSessionToken>(),
}))

describe('login Redirect', () => {
  const setupMocks = (cookieValue = 'test-state') => {
    const mockCookieStore = {
      get: vi
        .fn<(key: string) => { value: string } | undefined>()
        .mockReturnValue({ value: cookieValue }),
    }
    vi.mocked(cookies).mockResolvedValue(
      mockCookieStore as unknown as Awaited<ReturnType<typeof cookies>>,
    )
  }

  test('正常にログインが完了し、sessionIdがセットされること', async () => {
    expect.hasAssertions()

    setupMocks()
    fetchWithJwtMock.mockResolvedValue({
      ok: true,
      data: { token: 'qiita-token' },
    })
    vi.mocked(generateSessionId).mockReturnValue('mock-session-id')
    const request = new NextRequest(
      'http://localhost:3000/api/login/redirect?code=test-code&state=test-state',
    )
    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toBe('http://localhost:3000/')
    expect(saveSessionToken).toHaveBeenCalledWith(
      'mock-session-id',
      'qiita-token',
    )
    expect(response.headers.get('set-cookie')).toContain(
      'sessionId=mock-session-id',
    )
  })

  test('エラーケースのテスト', async () => {
    expect.hasAssertions()

    setupMocks('expected-state')

    const cases = [
      {
        url: 'http://localhost:3000/api/login/redirect?code=test-code&state=wrong-state',
        expected: 'login=invalid_state',
      },
      {
        url: 'http://localhost:3000/api/login/redirect?error=access_denied&state=test-state',
        expected: 'login=denied',
        mockState: 'test-state',
      },
      {
        url: 'http://localhost:3000/api/login/redirect?state=test-state',
        expected: 'login=invalid_request',
        mockState: 'test-state',
      },
      {
        url: 'http://localhost:3000/api/login/redirect?error=other_error&state=test-state',
        expected: 'login=error',
        mockState: 'test-state',
      },
    ]

    for (const { url, expected, mockState } of cases) {
      if (mockState) setupMocks(mockState)
      const response = await GET(new NextRequest(url))

      expect(response.status).toBe(307)
      expect(response.headers.get('location')).toContain(expected)
    }
  })

  test('backendRes不調時にリダイレクト', async () => {
    expect.hasAssertions()

    setupMocks()
    fetchWithJwtMock.mockResolvedValue({
      ok: false,
      message: 'error',
      status: 500,
    })
    const request = new NextRequest(
      'http://localhost:3000/api/login/redirect?code=test-code&state=test-state',
    )
    const response = await GET(request)

    expect(response.status).toBe(307)
    expect(response.headers.get('location')).toContain('login=failed')
  })
})
