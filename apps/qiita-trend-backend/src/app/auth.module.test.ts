import { ConfigModule, ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { AuthModule } from './auth.module'

describe(AuthModule, () => {
  let module: TestingModule

  beforeEach(async () => {
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
