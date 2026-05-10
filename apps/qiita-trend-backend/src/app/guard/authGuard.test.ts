import { ExecutionContext, UnauthorizedException } from '@nestjs/common'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { AuthGuard } from './authGuard'

import { RedisStore } from '@/app/redisStore'
import {
  REQUEST_SESSION_ID,
  SESSION_PREFIX,
  REQUEST_QIITA_TOKEN,
} from '@/const'

describe(AuthGuard, () => {
  let authGuard: AuthGuard
  let redisStore: RedisStore

  beforeEach(() => {
    redisStore = {
      get: vi.fn<(key: string) => Promise<string | null>>(),
    } as unknown as RedisStore
    authGuard = new AuthGuard(redisStore)
  })

  test('should return true if path does not require session', async () => {
    expect.hasAssertions()

    const mockRequest = { path: '/public/items' }
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    const result = await authGuard.canActivate(mockExecutionContext)

    expect(result).toBe(true)
  })

  test('should throw UnauthorizedException if session is required but missing', async () => {
    expect.hasAssertions()

    const mockRequest = { path: '/admin/settings' }
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new UnauthorizedException('session_required'),
    )
  })

  test('should throw UnauthorizedException if session is expired', async () => {
    expect.hasAssertions()

    const sessionId = 'expired-session'
    const mockRequest = {
      path: '/admin/settings',
      [REQUEST_SESSION_ID]: sessionId,
    }
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    vi.mocked(redisStore.get).mockResolvedValue(null)

    await expect(authGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new UnauthorizedException('session_expired'),
    )
    expect(redisStore.get).toHaveBeenCalledWith(`${SESSION_PREFIX}${sessionId}`)
  })

  test('should return true and set qiita token if session is valid', async () => {
    expect.hasAssertions()

    const sessionId = 'valid-session'
    const qiitaToken = 'qiita-token'
    const mockRequest = {
      path: '/admin/settings',
      [REQUEST_SESSION_ID]: sessionId,
    } as Record<string, unknown>
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: (): Record<string, unknown> => mockRequest,
      }),
    } as unknown as ExecutionContext

    vi.mocked(redisStore.get).mockResolvedValue(qiitaToken)

    const result = await authGuard.canActivate(mockExecutionContext)

    expect(result).toBe(true)
    expect(mockRequest[REQUEST_QIITA_TOKEN]).toBe(qiitaToken)
  })
})
