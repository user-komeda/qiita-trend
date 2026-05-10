import { ExecutionContext } from '@nestjs/common'
import { describe, expect, test } from 'vitest'

import { QiitaToken } from './qiitaToken'

import { REQUEST_QIITA_TOKEN } from '@/const'

describe(QiitaToken, () => {
  test('should return the qiita token from request', () => {
    expect.hasAssertions()
    // 実際には 12-13 行目を通したい。
    // NestJS の内部構造を利用して factory を取り出すのが難しいため、
    // decorator のソースコードにあるロジックを直接テストしつつ、
    // ファイル自体のカバレッジを通すために QiitaToken を参照する。

    expect(QiitaToken).toBeDefined()

    const mockToken = 'test-token'
    const mockRequest = {
      [REQUEST_QIITA_TOKEN]: mockToken,
    }

    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    // NestJS の内部実装: createParamDecorator が返す関数を、ダミーのコントローラ引数に適用し、
    // そのメタデータから factory を抽出する。
    class TestController {
      test(@QiitaToken() _token: string): void {
        void _token
      }
    }

    const ROUTE_ARGS_METADATA = '__routeArguments__'
    const metadata = Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      TestController.prototype.constructor,
      'test',
    ) as Record<
      string,
      { factory: (data: unknown, context: ExecutionContext) => unknown }
    >
    const firstKey = Object.keys(metadata)[0]
    const factory = metadata[firstKey].factory

    const result = factory(null, mockExecutionContext)

    expect(result).toBe(mockToken)
  })

  test('should return undefined if qiita token is missing', () => {
    expect.hasAssertions()

    const mockRequest = {}
    const mockExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => mockRequest,
      }),
    } as unknown as ExecutionContext

    class TestController {
      test(@QiitaToken() _token: string): void {
        void _token
      }
    }
    const ROUTE_ARGS_METADATA = '__routeArguments__'
    const metadata = Reflect.getMetadata(
      ROUTE_ARGS_METADATA,
      TestController.prototype.constructor,
      'test',
    ) as Record<
      string,
      { factory: (data: unknown, context: ExecutionContext) => unknown }
    >
    const firstKey = Object.keys(metadata)[0]
    const factory = metadata[firstKey].factory

    const result = factory(null, mockExecutionContext)

    expect(result).toBeUndefined()
  })
})
