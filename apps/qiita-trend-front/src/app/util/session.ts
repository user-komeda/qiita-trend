import { randomBytes } from 'crypto'

import {
  SESSION_ID_BYTES,
  SESSION_MAX_AGE_SEC,
  SESSION_PREFIX,
} from '@/app/const/sessionConfig'
import { redisDel, redisGet, redisSet } from '@/app/util/redisHelper'

/**
 * ランダムな sessionId を生成する。
 * 256bit のエントロピーがあるので推測は実質不可能。
 *
 * @returns hex 文字列の sessionId
 */
export const generateSessionId = (): string =>
  randomBytes(SESSION_ID_BYTES).toString('hex')

/**
 * sessionId → token のマッピングを Redis に保存する。
 *
 * @param sessionId - セッション ID
 * @param token - Qiita のアクセストークン
 * @param ttlSec - 有効期限（秒）
 */
export const saveSessionToken = async (
  sessionId: string,
  token: string,
  ttlSec: number = SESSION_MAX_AGE_SEC,
): Promise<void> => {
  await redisSet(`${SESSION_PREFIX}${sessionId}`, token, { EX: ttlSec })
}

/**
 * sessionId に紐づく token を取り出す。
 *
 * @param sessionId - セッション ID
 *
 * @returns token、無ければ null
 */
export const getSessionToken = async (
  sessionId: string,
): Promise<string | null> => {
  return await redisGet(`${SESSION_PREFIX}${sessionId}`)
}

/**
 * セッションを破棄する（Redis 側）。
 *
 * @param sessionId - セッション ID
 */
export const deleteSession = async (sessionId: string): Promise<void> => {
  await redisDel(`${SESSION_PREFIX}${sessionId}`)
}
