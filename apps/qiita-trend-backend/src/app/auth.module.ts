import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'

import { JwtGuard } from './guard/jwtGuard'
import { RedisModule } from './redis.module'

import { AuthGuard } from '@/app/guard/authGuard'

/**
 * AuthModule
 * JwtGuard と AuthGuard を分離して登録する。
 *
 * JwtGuard:
 * - 全エンドポイントで JWT を検証
 * - sub があれば request.sessionId に積む
 *
 * AuthGuard:
 * - @RequireSession() が付いたエンドポイントだけ sessionId を検証
 * - Redis から Qiita token を取得して request.qiitaToken に積む
 */
@Module({
  imports: [
    ConfigModule,
    RedisModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.getOrThrow<string>('JWT_SECRET'),
        signOptions: { algorithm: 'HS256' },
      }),
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
