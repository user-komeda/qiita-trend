import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config'
import { Test, TestingModule } from '@nestjs/testing'
import { AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { of } from 'rxjs'
import { describe, expect, beforeEach, vi, test } from 'vitest'

import { LoginService } from './login.service'

describe(LoginService, () => {
  let service: LoginService
  let httpService: HttpService
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: HttpService,
          useValue: {
            post: vi.fn<
              (url: string, data: unknown, config: unknown) => unknown
            >(),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: vi.fn<(key: string) => string | null>(),
          },
        },
      ],
    }).compile()

    service = module.get<LoginService>(LoginService)
    httpService = module.get<HttpService>(HttpService)
    configService = module.get<ConfigService>(ConfigService)
  })

  test('should be defined', () => {
    expect.hasAssertions()
    expect(service).toBeDefined()
  })

  describe('exchangeCodeForToken', () => {
    test('should return a token when successful', async () => {
      expect.hasAssertions()

      const code = 'valid_code'
      const token = 'qiita_token'
      const clientId = 'client_id'
      const clientSecret = 'client_secret'

      vi.spyOn(configService, 'get').mockImplementation((key: string) => {
        if (key === 'CLIENT_ID') return clientId
        if (key === 'CLIENT_SECRET') return clientSecret
        return null
      })

      const result: AxiosResponse = {
        data: { token },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {} as InternalAxiosRequestConfig,
      }

      vi.spyOn(httpService, 'post').mockReturnValue(of(result))

      const response = await service.exchangeCodeForToken(code)

      expect(response).toBe(token)
      expect(configService.get).toHaveBeenCalledWith('CLIENT_ID')
      expect(configService.get).toHaveBeenCalledWith('CLIENT_SECRET')
      expect(httpService.post).toHaveBeenCalledWith(
        'https://qiita.com/api/v2/access_tokens',
        {
          client_id: clientId,
          client_secret: clientSecret,
          code,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        },
      )
    })
  })
})
