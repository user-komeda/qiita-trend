import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'

import { RedisStore } from '@/app/redisStore'
import {
  REQUEST_QIITA_TOKEN,
  REQUEST_SESSION_ID,
  SESSION_PREFIX,
} from '@/const'
import { AuthenticatedRequest } from '@/types/AuthenticatedRequest'

const AUTH_REQUIRED_PATH_PREFIXES = ['/admin']

/**
 * AuthGuard
 * URL prefix ベースで session 認証を行う。
 *
 * - /admin/**: session 必須
 * - それ以外: session 不要
 */
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly redisStore: RedisStore) {}

  /**
   * canActivate
   *
   * @param context - ExecutionContext
   *
   * @returns 認証不要、または認証済みなら true
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const requiresSession = AUTH_REQUIRED_PATH_PREFIXES.some((prefix) =>
      req.path.startsWith(prefix),
    )

    if (!requiresSession) return true

    const sessionId = req[REQUEST_SESSION_ID] ?? ''
    if (sessionId === '') throw new UnauthorizedException('session_required')

    const qiitaToken = await this.redisStore.get(
      `${SESSION_PREFIX}${sessionId}`,
    )
    if (qiitaToken === null) {
      throw new UnauthorizedException('session_expired')
    }

    req[REQUEST_QIITA_TOKEN] = qiitaToken

    return true
  }
}
