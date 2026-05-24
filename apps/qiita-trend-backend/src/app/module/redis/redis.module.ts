import { Inject, Module, OnModuleDestroy } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { createClient } from 'redis'

import type { RedisClientType } from 'redis'

import { RedisStore } from '@/app/redisStore'

export const REDIS_CLIENT = 'REDIS_CLIENT'

/**
 * RedisModule
 * BFF と共有する Redis 接続を提供する。
 */
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: REDIS_CLIENT,
      inject: [ConfigService],
      useFactory: async (config: ConfigService): Promise<RedisClientType> => {
        const url =
          config.get<string>('REDIS_URL') ?? 'redis://:password@localhost:6379'
        const client: RedisClientType = createClient({ url })
        client.on('error', (e) => {
          console.error('[Redis] error:', e)
        })
        await client.connect()
        return client
      },
    },
    RedisStore,
  ],
  exports: [REDIS_CLIENT, RedisStore],
})
export class RedisModule implements OnModuleDestroy {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClientType) {}

  /**
   * onModuleDestroy
   * Nest 終了時に Redis 接続を閉じる。
   */
  async onModuleDestroy(): Promise<void> {
    await this.redis.quit()
  }
}
