import { Inject, Injectable } from '@nestjs/common'

import type { RedisClientType, SetOptions } from 'redis'

import { REDIS_CLIENT } from '@/const'

/**
 * RedisStore
 * Redis 操作を隠蔽する汎用 store。
 */
@Injectable()
export class RedisStore {
  constructor(@Inject(REDIS_CLIENT) private readonly redis: RedisClientType) {}

  /**
   * 指定 key の値を取得する。
   *
   * @param key - Redis key
   *
   * @returns value、存在しなければ null
   */
  async get(key: string): Promise<string | null> {
    return await this.redis.get(key)
  }

  /**
   * 指定 key に値を保存する。
   *
   * @param key - Redis key
   * @param value - 保存する値
   * @param options - Redis set options
   */
  async set(key: string, value: string, options?: SetOptions): Promise<void> {
    await this.redis.set(key, value, options)
  }

  /**
   * 指定 key を削除する。
   *
   * @param key - Redis key
   */
  async del(key: string): Promise<void> {
    await this.redis.del(key)
  }
}
