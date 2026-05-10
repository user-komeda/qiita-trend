import { createParamDecorator, ExecutionContext } from '@nestjs/common'

import { REQUEST_QIITA_TOKEN } from '@/const'
import { AuthenticatedRequest } from '@/types/AuthenticatedRequest'

/**
 * QiitaToken
 * AuthGuard が request に積んだ Qiita access token を controller 引数に注入する。
 */
export const QiitaToken = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const req = ctx.switchToHttp().getRequest<AuthenticatedRequest>()
    return req[REQUEST_QIITA_TOKEN]
  },
)
