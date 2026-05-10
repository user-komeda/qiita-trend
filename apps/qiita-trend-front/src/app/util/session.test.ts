import { SetOptions } from 'redis'
import { describe, expect, vi, beforeEach, test, expectTypeOf } from 'vitest'

import { SESSION_PREFIX } from '@/app/const/sessionConfig'
import { redisDel, redisGet, redisSet } from '@/app/util/redisHelper'
import {
  deleteSession,
  generateSessionId,
  getSessionToken,
  saveSessionToken,
} from '@/app/util/session'

vi.mock(import('./redisHelper'), () => ({
  redisDel: vi.fn<(key: string) => Promise<number>>(),
  redisGet: vi.fn<(key: string) => Promise<string | null>>(),
  redisSet:
    vi.fn<
      (
        key: string,
        value: string,
        options?: SetOptions,
      ) => Promise<string | null>
    >(),
}))

describe('session utils', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe(generateSessionId, () => {
    test('指定された長さのsessionIdを生成すること', () => {
      expect.hasAssertions()

      const sessionId = generateSessionId()

      expectTypeOf(sessionId).toBeString()

      // SESSION_ID_BYTES = 32 なので、hexだと 64文字
      expect(sessionId).toHaveLength(64)
    })

    test('呼び出しごとに異なるIDを生成すること', () => {
      expect.hasAssertions()

      const id1 = generateSessionId()
      const id2 = generateSessionId()

      expect(id1).not.toBe(id2)
    })
  })

  describe(saveSessionToken, () => {
    test('正しい引数でredisSetを呼び出すこと', async () => {
      expect.hasAssertions()

      const sessionId = 'test-session'
      const token = 'test-token'
      const ttl = 100

      await saveSessionToken(sessionId, token, ttl)

      expect(redisSet).toHaveBeenCalledWith(
        `${SESSION_PREFIX}${sessionId}`,
        token,
        { EX: ttl },
      )
    })

    test('デフォルトのTTLを使用すること', async () => {
      expect.hasAssertions()

      const sessionId = 'test-session'
      const token = 'test-token'

      await saveSessionToken(sessionId, token)

      expect(redisSet).toHaveBeenCalledWith(
        `${SESSION_PREFIX}${sessionId}`,
        token,
        { EX: expect.any(Number) as number },
      )
    })
  })

  describe(getSessionToken, () => {
    test('正しいキーでredisGetを呼び出すこと', async () => {
      expect.hasAssertions()

      const sessionId = 'test-session'

      vi.mocked(redisGet).mockResolvedValue('mocked-token')

      const result = await getSessionToken(sessionId)

      expect(redisGet).toHaveBeenCalledWith(`${SESSION_PREFIX}${sessionId}`)
      expect(result).toBe('mocked-token')
    })
  })

  describe(deleteSession, () => {
    test('正しいキーでredisDelを呼び出すこと', async () => {
      expect.hasAssertions()

      const sessionId = 'test-session'

      await deleteSession(sessionId)

      expect(redisDel).toHaveBeenCalledWith(`${SESSION_PREFIX}${sessionId}`)
    })
  })
})
