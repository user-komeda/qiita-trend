import { describe, expect, vi, beforeEach, test } from 'vitest'

import { GET } from '@/app/api/login/route'

describe('login API Route', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.clearAllMocks()
    process.env = { ...originalEnv }
  })

  test('qiitaの認証URLにリダイレクトし、stateをクッキーにセットすること', () => {
    expect.hasAssertions()

    process.env.CLIENT_ID = 'test-client-id'
    const request = new Request('http://localhost:3000/api/login')

    const response = GET(request)

    expect(response.status).toBe(307) // NextResponse.redirectのデフォルト

    const location = response.headers.get('location')

    expect(location).toContain('https://qiita.com/api/v2/oauth/authorize')
    expect(location).toContain('client_id=test-client-id')
    expect(location).toContain('state=')
    expect(location).toContain(
      'redirect_uri=' +
        encodeURIComponent('http://localhost:3000/api/login/redirect'),
    )

    // クッキーがセットされていることを確認（NextResponseのモックなしでヘッダーから確認）
    const setCookie = response.headers.get('set-cookie')

    // eslint-disable-next-line vitest/max-expects
    expect(setCookie).not.toBeNull()
  })

  test('cLIENT_IDが未設定の場合でも動作すること', () => {
    expect.hasAssertions()

    delete process.env.CLIENT_ID
    const request = new Request('http://localhost:3000/api/login')

    const response = GET(request)

    const location = response.headers.get('location')

    expect(location).toContain('client_id=')
    expect(response.status).toBe(307)
  })
})
