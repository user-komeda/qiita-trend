import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService } from '@nestjs/jwt'

import { JWT_AUDIENCE, JWT_ISSUER, REQUEST_SESSION_ID } from '@/const'
import { AuthenticatedRequest } from '@/types/AuthenticatedRequest'
import { JwtPayload } from '@/types/jwt'

/**
 * JwtGuard
 * 全エンドポイントで BFF が発行した JWT を検証する。
 * sub があれば request に sessionId として積む。
 */
@Injectable()
export class JwtGuard implements CanActivate {
  private readonly logger = new Logger(JwtGuard.name)

  constructor(
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  /**
   * canActivate
   *
   * @param context - ExecutionContext
   *
   * @returns JWT が正当なら true
   */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<AuthenticatedRequest>()
    const auth = req.headers.authorization ?? ''
    const token = auth.startsWith('Bearer ') ? auth.slice('Bearer '.length) : ''

    if (token === '') throw new UnauthorizedException('missing_token')

    let payload: JwtPayload
    try {
      payload = await this.jwt.verifyAsync<JwtPayload>(token, {
        secret: this.config.getOrThrow<string>('JWT_SECRET'),
        issuer: JWT_ISSUER,
        audience: JWT_AUDIENCE,
        algorithms: ['HS256'],
      })
    } catch (e) {
      this.logger.warn(`JWT verify failed: ${(e as Error).message}`)
      throw new UnauthorizedException('invalid_token')
    }

    const sessionId = payload.sub ?? ''
    if (sessionId !== '') {
      req[REQUEST_SESSION_ID] = sessionId
    }

    return true
  }
}
