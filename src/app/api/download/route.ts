import { NextResponse } from 'next/server'
import { clientIp, hashIp } from '@/lib/hash'
import { addUniqueDownload } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const ipHash = hashIp(clientIp(request.headers))
  const { total, counted } = await addUniqueDownload(ipHash)
  return NextResponse.json(
    { total, counted },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
