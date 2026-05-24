import { SignJWT } from 'jose'
export const JWT_ISSUER = 'qiita-trend-bff'
export const JWT_AUDIENCE = 'qiita-trend-backend'
export const JWT_TTL = '5m'

const getSecret = (): Uint8Array => {
  const secret = process.env.JWT_SECRET
  if (secret === undefined || secret === '') {
    throw new Error('JWT_SECRET is not configured')
  }
  return new TextEncoder().encode(secret)
}

const createJwt = async (sessionId?: string): Promise<string> => {
  const builder = new SignJWT({})
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuer(JWT_ISSUER)
    .setAudience(JWT_AUDIENCE)
    .setIssuedAt()
    .setExpirationTime(JWT_TTL)

  if (sessionId !== undefined && sessionId !== '') {
    builder.setSubject(sessionId)
  }

  return await builder.sign(getSecret())
}

export default createJwt
