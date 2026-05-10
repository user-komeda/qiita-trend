import { type RedisClientType } from 'redis'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { getRedisClient } from '@/app/util/getRedisClinent'
import { redisDel, redisGet, redisSet } from '@/app/util/redisHelper'

vi.mock(import('./getRedisClinent'), () => ({
  getRedisClient: vi.fn<typeof getRedisClient>(),
}))

describe('redisHelper', () => {
  const mockGet = vi.fn<typeof redisGet>()
  const mockSet = vi.fn<typeof redisSet>()
  const mockDel = vi.fn<typeof redisDel>()

  const mockClient = {
    get: mockGet,
    set: mockSet,
    del: mockDel,
  } as unknown as RedisClientType

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(getRedisClient).mockResolvedValue(mockClient)
  })

  test('redisGetが正しく呼び出されること', async () => {
    expect.hasAssertions()

    const mockedGet = vi.mocked(mockGet)
    mockedGet.mockResolvedValue('value')
    const result = await redisGet('key')

    expect(getRedisClient).toHaveBeenCalledWith()
    expect(mockedGet).toHaveBeenCalledWith('key')
    expect(result).toBe('value')
  })

  test('redisSetが正しく呼び出されること', async () => {
    expect.hasAssertions()

    const mockedSet = vi.mocked(mockSet)
    mockedSet.mockResolvedValue('OK')
    await redisSet('key', 'value', { EX: 10 })

    expect(getRedisClient).toHaveBeenCalledWith()
    expect(mockedSet).toHaveBeenCalledWith('key', 'value', { EX: 10 })
  })

  test('redisDelが正しく呼び出されること', async () => {
    expect.hasAssertions()

    const mockedDel = vi.mocked(mockDel)
    mockedDel.mockResolvedValue(1)
    await redisDel('key')

    expect(getRedisClient).toHaveBeenCalledWith()
    expect(mockedDel).toHaveBeenCalledWith('key')
  })
})
