import { createClient, type RedisClientType } from 'redis'

let client: RedisClientType | null = null

export const getRedisClient = async (): Promise<RedisClientType> => {
  if (client?.isOpen) {
    return client
  }
  if (client === null) {
    client = createClient({
      url: process.env.REDIS_URL ?? 'redis://:password@localhost:6379',
    })
    client.on('error', (err: unknown) => {
      console.error('[redis] client error', err)
    })
  }
  if (!client.isOpen) {
    await client.connect()
  }
  return client
}
