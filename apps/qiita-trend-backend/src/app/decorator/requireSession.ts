import { SetMetadata } from '@nestjs/common'

import { REQUIRE_SESSION } from '@/const'

/**
 * RequireSession
 * このデコレータが付いたエンドポイントは sessionId 必須となり、
 * 未ログイン状態のリクエストは 401 で弾かれる。
 */
export const RequireSession = (): MethodDecorator & ClassDecorator =>
  SetMetadata(REQUIRE_SESSION, true)
