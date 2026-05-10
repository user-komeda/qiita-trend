import { SignJWT } from 'jose'

import { JWT_AUDIENCE, JWT_ISSUER, JWT_TTL } from '@/app/const/jw'

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
