import { ExecutionContext, ForbiddenException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'
import { describe, expect, vi, beforeEach, test } from 'vitest'

import { JwtGuard } from './jwtGuard'

import { JWT_AUDIENCE, JWT_ISSUER, REQUEST_SESSION_ID } from '@/const'

/* eslint-disable max-lines-per-function */
describe(JwtGuard, () => {
  let jwtGuard: JwtGuard
  let jwtService: JwtService
  let configService: ConfigService

  beforeEach(() => {
    jwtService = {
      verifyAsync:
        vi.fn<
          (token: string, options: Record<string, unknown>) => Promise<unknown>
        >(),
    } as unknown as JwtService
    configService = {
      getOrThrow: vi
        .fn<(key: string) => string>()
        .mockReturnValue('test-secret'),
    } as unknown as ConfigService
    jwtGuard = new JwtGuard(jwtService, configService)
  })

  test('should throw ForbiddenException if token is missing', async () => {
    expect.hasAssertions()

    const mockRequest = { headers: {} }
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    await expect(jwtGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('missing_token'),
    )
  })

  test('should throw ForbiddenException if token format is invalid', async () => {
    expect.hasAssertions()

    const mockRequest = { headers: { authorization: 'invalid-format' } }
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    await expect(jwtGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('missing_token'),
    )
  })

  test('should throw ForbiddenException if JWT verification fails', async () => {
    expect.hasAssertions()

    const mockRequest = { headers: { authorization: 'Bearer invalid-token' } }
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    vi.mocked(jwtService.verifyAsync).mockRejectedValue(
      new Error('verify failed'),
    )

    await expect(jwtGuard.canActivate(mockExecutionContext)).rejects.toThrow(
      new ForbiddenException('invalid_token'),
    )
  })

  test('should return true and set sessionId if JWT is valid', async () => {
    expect.hasAssertions()

    const sessionId = 'test-session-id'
    const mockRequest = {
      headers: { authorization: 'Bearer valid-token' },
    } as Record<string, unknown>
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: (): Record<string, unknown> => mockRequest,
      }),
    } as unknown as ExecutionContext

    vi.mocked(jwtService.verifyAsync).mockResolvedValue({ sub: sessionId })

    const result = await jwtGuard.canActivate(mockExecutionContext)

    expect(result).toBe(true)
    expect(mockRequest[REQUEST_SESSION_ID]).toBe(sessionId)
    expect(jwtService.verifyAsync).toHaveBeenCalledWith('valid-token', {
      secret: 'test-secret',
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
      algorithms: ['HS256'],
    })
  })

  test('should return true but not set sessionId if sub is missing in payload', async () => {
    expect.hasAssertions()

    const mockRequest = {
      headers: { authorization: 'Bearer valid-token' },
    } as Record<string, unknown>
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: (): Record<string, unknown> => mockRequest,
      }),
    } as unknown as ExecutionContext

    vi.mocked(jwtService.verifyAsync).mockResolvedValue({})

    const result = await jwtGuard.canActivate(mockExecutionContext)

    expect(result).toBe(true)
    expect(mockRequest[REQUEST_SESSION_ID]).toBeUndefined()
  })
})
