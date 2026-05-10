import { createClient } from 'redis'
import { beforeEach, describe, expect, test, vi } from 'vitest'

vi.mock(import('redis'), () => {
  return {
    // eslint-disable-next-line vitest/require-mock-type-parameters
    createClient: vi.fn(),
  }
})

describe('getRedisClient', () => {
  const mockClient = {
    isOpen: false,
    on: vi.fn<
      (event: string, listener: (...args: unknown[]) => void) => unknown
    >(),
    connect: vi.fn<() => Promise<void>>().mockResolvedValue(undefined),
  }

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(createClient).mockReturnValue(
      mockClient as unknown as ReturnType<typeof createClient>,
    )
    mockClient.isOpen = false
    vi.resetModules()
  })

  test('初回呼び出し時にクライアントを作成して接続すること', async () => {
    expect.hasAssertions()

    const { getRedisClient } = await import('./getRedisClinent')
    const client = await getRedisClient()

    expect(mockClient.connect).toHaveBeenCalledWith()
    expect(client).toBe(mockClient)
  })

  test('2回目以降、isOpenがtrueなら既存のクライアントを返すこと', async () => {
    expect.hasAssertions()

    const { getRedisClient } = await import('./getRedisClinent')
    mockClient.isOpen = true
    const client1 = await getRedisClient()

    // 2回目呼び出し。isOpenがtrueなのでそのまま返る
    const client2 = await getRedisClient()

    expect(client1).toBe(client2)
  })

  test('クライアントは存在するがisOpenがfalseの場合、再接続すること', async () => {
    expect.hasAssertions()

    const { getRedisClient } = await import('./getRedisClinent')
    // 1回目
    mockClient.isOpen = true
    await getRedisClient()

    // 2回目。何らかの理由で切断されている状態をシミュレート
    mockClient.isOpen = false
    await getRedisClient()

    expect(mockClient.connect).toHaveBeenCalledWith()
  })

  test('エラーハンドラーを登録すること', async () => {
    expect.hasAssertions()

    const { getRedisClient } = await import('./getRedisClinent')
    const consoleSpy = vi
      .spyOn(console, 'error')
      .mockImplementation((..._args: unknown[]) => {
        void _args
      })
    await getRedisClient()

    expect(mockClient.on).toHaveBeenCalledWith('error', expect.any(Function))

    const calls = vi.mocked(mockClient.on).mock.calls
    const errorCall = calls.find((call) => {
      return call[0] === 'error'
    })
    const errorHandlerArg = errorCall?.[1]
    const errorHandler = errorHandlerArg as ((err: Error) => void) | undefined

    expect(errorHandler).toBeDefined()

    const error = new Error('redis connection error')
    errorHandler?.(error)

    expect(consoleSpy).toHaveBeenCalledWith('[redis] client error', error)

    consoleSpy.mockRestore()
  })
})
