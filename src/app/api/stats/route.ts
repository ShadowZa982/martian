import { NextResponse } from 'next/server'
import { getTotal } from '@/lib/kv'

export const dynamic = 'force-dynamic'

export async function GET() {
  const total = await getTotal()
  return NextResponse.json(
    { total },
    { headers: { 'Cache-Control': 'no-store' } }
  )
}
