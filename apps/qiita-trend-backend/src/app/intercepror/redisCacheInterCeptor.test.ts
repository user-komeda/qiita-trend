import { firstValueFrom, of } from 'rxjs'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import type { CallHandler, ExecutionContext } from '@nestjs/common'
import type { SetOptions } from 'redis'

import { RedisCacheInterceptor } from '@/app/intercepror/redisCacheInterCeptor'
import { RedisStore } from '@/app/redisStore'

// eslint-disable-next-line max-lines-per-function
describe(RedisCacheInterceptor, () => {
  let redisStore: {
    get: ReturnType<typeof vi.fn>
    set: ReturnType<typeof vi.fn>
    del: ReturnType<typeof vi.fn>
  }
  let interceptor: RedisCacheInterceptor

  beforeEach(() => {
    redisStore = {
      get: vi.fn<(key: string) => Promise<string | null>>(),
      set: vi.fn<
        (key: string, value: string, option: SetOptions) => Promise<void>
      >(),
      del: vi.fn<(key: string) => Promise<number>>(),
    }

    interceptor = new RedisCacheInterceptor(redisStore as unknown as RedisStore)
  })

  const createExecutionContext = (
    method: string,
    url: string,
  ): ExecutionContext => {
    return {
      switchToHttp: () => ({
        getRequest: () => ({
          method,
          url,
        }),
      }),
    } as unknown as ExecutionContext
  }

  const createCallHandler = (responseBody: unknown): CallHandler => {
    return {
      handle: vi.fn<CallHandler['handle']>(() => of(responseBody)),
    }
  }

  test('should save response to Redis when GET request has no cache', async () => {
    expect.hasAssertions()

    const responseBody = [{ id: 'item-id', title: 'test title' }]
    const context = createExecutionContext('GET', '/public/items')
    const next = createCallHandler(responseBody)

    redisStore.get.mockResolvedValue(null)
    redisStore.set.mockResolvedValue(undefined)

    const result = await firstValueFrom(interceptor.intercept(context, next))

    expect(result).toStrictEqual(responseBody)
    expect(redisStore.get).toHaveBeenCalledWith(
      'public-response-cache:/public/items',
    )
    expect(next.handle).toHaveBeenCalledTimes(1)
    expect(redisStore.set).toHaveBeenCalledWith(
      'public-response-cache:/public/items',
      JSON.stringify(responseBody),
      {
        EX: 60 * 60 * 24,
      },
    )
  })

  test('should return cached response from Redis when cache exists', async () => {
    expect.hasAssertions()

    const cachedBody = [{ id: 'cached-item-id', title: 'cached title' }]
    const context = createExecutionContext('GET', '/public/items')
    const next = createCallHandler([{ id: 'item-id', title: 'test title' }])

    redisStore.get.mockResolvedValue(JSON.stringify(cachedBody))

    const result = await firstValueFrom(interceptor.intercept(context, next))

    expect(result).toStrictEqual(cachedBody)
    expect(redisStore.get).toHaveBeenCalledWith(
      'public-response-cache:/public/items',
    )
    expect(next.handle).not.toHaveBeenCalled()
    expect(redisStore.set).not.toHaveBeenCalled()
  })

  test('should not use Redis cache when request method is not GET', async () => {
    expect.hasAssertions()

    const responseBody = { ok: true }
    const context = createExecutionContext('POST', '/public/login')
    const next = createCallHandler(responseBody)

    const result = await firstValueFrom(interceptor.intercept(context, next))

    expect(result).toStrictEqual(responseBody)
    expect(redisStore.get).not.toHaveBeenCalled()
    expect(redisStore.set).not.toHaveBeenCalled()
    expect(next.handle).toHaveBeenCalledTimes(1)
  })

  test('should not use Redis cache for login endpoint', async () => {
    expect.hasAssertions()

    const responseBody = { token: 'dummy-token' }
    const context = createExecutionContext('GET', '/login')
    const next = createCallHandler(responseBody)

    const result = await firstValueFrom(interceptor.intercept(context, next))

    expect(result).toStrictEqual(responseBody)
    expect(redisStore.get).not.toHaveBeenCalled()
    expect(redisStore.set).not.toHaveBeenCalled()
    expect(next.handle).toHaveBeenCalledTimes(1)
  })
})
