import { createHash } from 'crypto'

export function clientIp(headers: Headers): string {
  const xff = headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return (
    headers.get('x-real-ip') ||
    headers.get('cf-connecting-ip') ||
    '0.0.0.0'
  )
}

export function hashIp(ip: string): string {
  return createHash('sha256')
    .update(ip + '::martian')
    .digest('hex')
    .slice(0, 12)
}
