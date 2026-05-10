import { Request } from 'express'

import { REQUEST_QIITA_TOKEN, REQUEST_SESSION_ID } from '@/const'

/**
 * AuthenticatedRequest
 * JwtGuard / AuthGuard が値を積む request 型。
 */
export type AuthenticatedRequest = Request & {
  [REQUEST_SESSION_ID]?: string
  [REQUEST_QIITA_TOKEN]?: string
}
