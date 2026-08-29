import { timingSafeEqual } from 'node:crypto'

/**
 * Bearer-token check for the publishing endpoints. Compares in constant time so
 * the token cannot be recovered by measuring response latency.
 */
export function isConnectorAuthorized(request: Request) {
  const expected = process.env.OLKERI_CONNECTOR_TOKEN

  if (!expected) return false

  const authorization = request.headers.get('authorization') ?? ''
  const [scheme, token] = authorization.split(' ')

  if (scheme?.toLowerCase() !== 'bearer' || !token) return false

  const expectedBuffer = Buffer.from(expected)
  const tokenBuffer = Buffer.from(token)

  return (
    expectedBuffer.length === tokenBuffer.length &&
    timingSafeEqual(expectedBuffer, tokenBuffer)
  )
}
