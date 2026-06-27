import { NextResponse } from 'next/server'
import { clientIp, hashIp } from '@/lib/hash'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const id = hashIp(clientIp(request.headers))
  return NextResponse.json(
    { id },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
