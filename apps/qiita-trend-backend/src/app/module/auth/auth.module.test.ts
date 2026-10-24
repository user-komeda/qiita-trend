import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { createClient } from 'redis'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { AuthModule } from './auth.module'

const { mockCreateClient } = vi.hoisted(() => ({
  mockCreateClient: vi.fn<typeof createClient>(),
}))

vi.mock(import('redis'), () => ({
  createClient: mockCreateClient as unknown as typeof createClient,
}))

describe(AuthModule, () => {
  let module: TestingModule

  beforeEach(async () => {
    const mockRedisClient = {
      // eslint-disable-next-line vitest/require-mock-type-parameters
      on: vi.fn(),
      // eslint-disable-next-line vitest/require-mock-type-parameters
      connect: vi.fn().mockResolvedValue(undefined),
      // eslint-disable-next-line vitest/require-mock-type-parameters
      quit: vi.fn().mockResolvedValue(undefined),
    }

    mockCreateClient.mockReturnValue(
      mockRedisClient as unknown as ReturnType<typeof createClient>,
    )

    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => ({ JWT_SECRET: 'test-secret' })],
        }),
        AuthModule,
      ],
    })
      .overrideProvider(ConfigService)
      .useValue({
        getOrThrow: vi
          .fn<(key: string) => string>()
          .mockReturnValue('test-secret'),
        get: vi
          .fn<(key: string) => string>()
          .mockReturnValue('redis://localhost:6379'),
      })
      .compile()
  })

  test('should be defined', () => {
    expect.hasAssertions()
    expect(module).toBeDefined()
  })
})
