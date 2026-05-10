import { RedisClientType, type SetOptions } from 'redis'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { RedisStore } from './redisStore'

describe(RedisStore, () => {
  let redisStore: RedisStore
  let mockRedisClient: RedisClientType

  beforeEach(() => {
    mockRedisClient = {
      get: vi.fn<(key: string) => Promise<string | null>>(),
      set: vi.fn<
        (key: string, value: string, option: SetOptions) => Promise<void>
      >(),
      del: vi.fn<(key: string) => Promise<number>>(),
    } as unknown as RedisClientType
    redisStore = new RedisStore(mockRedisClient)
  })

  test('should call redis.get with correct key', async () => {
    expect.hasAssertions()

    const key = 'test-key'
    const value = 'test-value'
    vi.mocked(mockRedisClient.get).mockResolvedValue(value)

    const result = await redisStore.get(key)

    expect(result).toBe(value)
    expect(mockRedisClient.get).toHaveBeenCalledWith(key)
  })

  test('should call redis.set with correct arguments', async () => {
    expect.hasAssertions()

    const key = 'test-key'
    const value = 'test-value'
    const options = { EX: 10 }

    await redisStore.set(key, value, options)

    expect(mockRedisClient.set).toHaveBeenCalledWith(key, value, options)
  })

  test('should call redis.del with correct key', async () => {
    expect.hasAssertions()

    const key = 'test-key'

    await redisStore.del(key)

    expect(mockRedisClient.del).toHaveBeenCalledWith(key)
  })
})
