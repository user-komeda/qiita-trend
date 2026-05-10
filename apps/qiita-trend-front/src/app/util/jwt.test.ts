import { describe, expect, vi, beforeEach, test } from 'vitest'

import createJwt from '@/app/util/jwt'

vi.mock(import('jose'), () => {
  return {
    SignJWT: class {
      constructor(_payload?: unknown) {
        void _payload
      }

      setProtectedHeader = vi
        .fn<(header: { alg: string }) => this>()
        .mockReturnThis()
      setIssuer = vi.fn<(issuer: string) => this>().mockReturnThis()
      setAudience = vi.fn<(audience: string) => this>().mockReturnThis()
      setIssuedAt = vi.fn<() => this>().mockReturnThis()
      setExpirationTime = vi
        .fn<(expirationTime: string) => this>()
        .mockReturnThis()
      setSubject = vi.fn<(subject: string) => this>().mockReturnThis()
      sign = vi
        .fn<(secret: Uint8Array) => Promise<string>>()
        .mockResolvedValue('mocked-jwt')
    },
  } as unknown as Partial<typeof import('jose')>
})

describe(createJwt, () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv, JWT_SECRET: 'test-secret' }
  })

  test('jWT_SECRETが設定されていない場合にエラーを投げること', async () => {
    expect.hasAssertions()

    delete process.env.JWT_SECRET

    await expect(createJwt()).rejects.toThrow('JWT_SECRET is not configured')
  })

  test('jWT_SECRETが空の場合にエラーを投げること', async () => {
    expect.hasAssertions()

    process.env.JWT_SECRET = ''

    await expect(createJwt()).rejects.toThrow('JWT_SECRET is not configured')
  })

  test('jWTを作成できること', async () => {
    expect.hasAssertions()

    process.env.JWT_SECRET = 'test-secret'
    const jwt = await createJwt()

    expect(jwt).toBe('mocked-jwt')
  })

  test('sessionIdが提供された場合にsubjectを設定すること', async () => {
    expect.hasAssertions()

    process.env.JWT_SECRET = 'test-secret'
    const sessionId = 'test-session-id'

    const jwt = await createJwt(sessionId)

    expect(jwt).toBe('mocked-jwt')
  })
})
