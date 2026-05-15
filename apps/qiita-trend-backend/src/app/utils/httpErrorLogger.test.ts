import { HttpService } from '@nestjs/axios'
import { InternalServerErrorException, Logger } from '@nestjs/common'
import {
  AxiosError,
  AxiosHeaders,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'
import { beforeEach, describe, expect, test, vi } from 'vitest'

import { HttpErrorLogger } from '@/utils/httpErrorLogger'

type ResponseRejectedHandler = (error: unknown) => Promise<never>

// eslint-disable-next-line max-lines-per-function
describe(HttpErrorLogger, () => {
  let rejectedHandler: ResponseRejectedHandler
  let httpService: HttpService
  let loggerErrorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.restoreAllMocks()

    loggerErrorSpy = vi
      .spyOn(Logger.prototype, 'error')
      .mockImplementation(vi.fn())

    httpService = {
      axiosRef: {
        interceptors: {
          response: {
            use: vi.fn<
              (
                fulfilled: (response: unknown) => unknown,
                rejected: ResponseRejectedHandler,
              ) => number
            >((_fulfilled, rejected) => {
              rejectedHandler = rejected

              return 1
            }),
          },
        },
      },
    } as unknown as HttpService

    const httpErrorLogger = new HttpErrorLogger(httpService)
    httpErrorLogger.onModuleInit()
  })

  test('should register response interceptor', () => {
    expect.hasAssertions()
    expect(
      httpService.axiosRef.interceptors.response.use,
    ).toHaveBeenCalledTimes(1)
  })

  test('should return response as is when request succeeds', () => {
    expect.hasAssertions()

    const useMock = vi.mocked(httpService.axiosRef.interceptors.response.use)
    const fulfilledHandler = useMock.mock.calls[0]?.[0]

    expect(fulfilledHandler).toBeDefined()

    const response: AxiosResponse<{ message: string }> = {
      data: { message: 'ok' },
      status: 200,
      statusText: 'OK',
      headers: {},
      config: {
        headers: new AxiosHeaders(),
      },
    }

    expect(fulfilledHandler?.(response)).toBe(response)
  })

  test('should log and throw InternalServerErrorException when error is not axios error', async () => {
    expect.hasAssertions()

    const error = new Error('unexpected error')

    await expect(rejectedHandler(error)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    )

    expect(loggerErrorSpy).toHaveBeenCalledWith(
      'Unexpected HTTP error occurred',
      error,
    )
  })

  test('should throw InternalServerErrorException when axios error has no response', async () => {
    expect.hasAssertions()

    const config: InternalAxiosRequestConfig = {
      method: 'get',
      url: 'https://example.com/items',
      headers: new AxiosHeaders(),
    }

    const error = new AxiosError(
      'network error',
      'ECONNRESET',
      config,
      undefined,
      undefined,
    )

    await expect(rejectedHandler(error)).rejects.toBeInstanceOf(
      InternalServerErrorException,
    )

    expect(loggerErrorSpy).toHaveBeenCalledWith({
      message: 'External HTTP request failed',
      axiosMessage: 'network error',
      code: 'ECONNRESET',
      method: 'GET',
      url: 'https://example.com/items',
      status: undefined,
      statusText: undefined,
      responseData: undefined,
    })
  })

  test('should throw HttpException with external api response when axios error has response', async () => {
    expect.hasAssertions()

    const config: InternalAxiosRequestConfig = {
      method: 'post',
      url: 'https://example.com/items',
      headers: new AxiosHeaders(),
    }

    const response: AxiosResponse<{ message: string }> = {
      status: 404,
      statusText: 'Not Found',
      data: { message: 'not found' },
      headers: {},
      config,
    }

    const error = new AxiosError(
      'request failed',
      'ERR_BAD_REQUEST',
      config,
      undefined,
      response,
    )

    await expect(rejectedHandler(error)).rejects.toMatchObject({
      response: {
        message: 'External API request failed',
        statusCode: 404,
        externalApi: {
          status: 404,
          statusText: 'Not Found',
          responseData: { message: 'not found' },
        },
      },
      status: 404,
    })

    expect(loggerErrorSpy).toHaveBeenCalledWith({
      message: 'External HTTP request failed',
      axiosMessage: 'request failed',
      code: 'ERR_BAD_REQUEST',
      method: 'POST',
      url: 'https://example.com/items',
      status: 404,
      statusText: 'Not Found',
      responseData: { message: 'not found' },
    })
  })
})
