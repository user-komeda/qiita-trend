import { Test, TestingModule } from '@nestjs/testing'
import { describe, expect, beforeEach, vi, test } from 'vitest'

import { LoginController } from './login.controller'

import { LoginService } from '@/public/login/domain/login.service'

describe(LoginController, () => {
  let controller: LoginController
  let service: LoginService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginController],
      providers: [
        {
          provide: LoginService,
          useValue: {
            exchangeCodeForToken: vi.fn<(code: string) => Promise<string>>(),
          },
        },
      ],
    }).compile()

    controller = module.get<LoginController>(LoginController)
    service = module.get<LoginService>(LoginService)
  })

  test('should be defined', () => {
    expect.hasAssertions()
    expect(controller).toBeDefined()
  })

  describe('login', () => {
    test('should return a token', async () => {
      expect.hasAssertions()

      const code = 'test_code'
      const token = 'test_token'
      vi.spyOn(service, 'exchangeCodeForToken').mockResolvedValue(token)

      const result = await controller.login({ code })

      expect(result).toStrictEqual({ token })
      expect(service.exchangeCodeForToken).toHaveBeenCalledWith(code)
    })
  })
})
