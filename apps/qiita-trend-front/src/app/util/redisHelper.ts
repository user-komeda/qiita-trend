import { SetOptions } from 'redis'

import { getRedisClient } from '@/app/util/getRedisClinent'

export const redisGet = async (key: string) => {
  const client = await getRedisClient()
  return client.get(key)
}

export const redisSet = async (
  key: string,
  value: string,
  options?: SetOptions,
) => {
  const client = await getRedisClient()
  return client.set(key, value, options)
}

export const redisDel = async (key: string) => {
  const client = await getRedisClient()
  return client.del(key)
}
