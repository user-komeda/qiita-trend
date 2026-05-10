import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { createClient } from 'redis'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { RedisModule, REDIS_CLIENT } from './redis.module'
import { RedisStore } from './redisStore'

interface MockRedisClient {
  on: ReturnType<
    typeof vi.fn<(event: string, listener: (err: Error) => void) => unknown>
  >
  connect: ReturnType<typeof vi.fn<() => Promise<void>>>
  quit: ReturnType<typeof vi.fn<() => Promise<void>>>
}

const { mockCreateClient } = vi.hoisted(() => ({
  mockCreateClient: vi.fn<typeof createClient>(),
}))

vi.mock(import('redis'), () => ({
  createClient: mockCreateClient as unknown as typeof createClient,
}))

/* eslint-disable max-lines-per-function */
describe(RedisModule, () => {
  let module: TestingModule
  let mockRedisClient: MockRedisClient

  beforeEach(async () => {
    mockRedisClient = {
      on: vi.fn<(event: string, listener: (err: Error) => void) => unknown>(),
      connect: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
      quit: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
    }

    mockCreateClient.mockReturnValue(
      mockRedisClient as unknown as ReturnType<typeof createClient>,
    )

    module = await Test.createTestingModule({
      imports: [RedisModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: vi
          .fn<(key: string) => string | undefined>()
          .mockReturnValue('redis://localhost:6379'),
      })
      .compile()
  })

  test('should be defined', () => {
    expect.hasAssertions()

    expect(module).toBeDefined()
  })

  test('should provide REDIS_CLIENT', () => {
    expect.hasAssertions()

    const client = module.get<unknown>(REDIS_CLIENT)

    expect(client).toBeDefined()
    expect(createClient).toHaveBeenCalledWith({
      url: 'redis://localhost:6379',
    })
    expect(mockRedisClient.connect).toHaveBeenCalledWith()
  })

  test('should provide RedisStore', () => {
    expect.hasAssertions()

    const store = module.get(RedisStore)

    expect(store).toBeDefined()
  })

  test('should log error on redis client error', () => {
    expect.hasAssertions()

    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((..._args: unknown[]) => {
        void _args
      })

    const client = module.get<unknown>(REDIS_CLIENT)

    expect(client).toBeDefined()

    const errorCall = mockRedisClient.on.mock.calls.find(
      (call) => call[0] === 'error',
    )

    expect(errorCall).toBeDefined()

    const error = new Error('redis connection failed')
    errorCall?.[1](error)

    expect(consoleSpy).toHaveBeenCalledWith('[Redis] error:', error)

    consoleSpy.mockRestore()
  })

  test('should quit redis on module destroy', async () => {
    expect.hasAssertions()

    const redisModule = module.get(RedisModule)
    await redisModule.onModuleDestroy()

    expect(mockRedisClient.quit).toHaveBeenCalledWith()
  })

  test('should use default URL if REDIS_URL is not provided', async () => {
    expect.hasAssertions()

    vi.clearAllMocks()

    mockCreateClient.mockReturnValue(
      mockRedisClient as unknown as ReturnType<typeof createClient>,
    )

    const tempModule = await Test.createTestingModule({
      imports: [RedisModule],
    })
      .overrideProvider(ConfigService)
      .useValue({
        get: vi
          .fn<(key: string) => string | undefined>()
          .mockReturnValue(undefined),
      })
      .compile()

    expect(createClient).toHaveBeenCalledWith({
      url: "'redis://:password@localhost:6379'",
    })

    await tempModule.close()
  })
})
