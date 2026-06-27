import { NextResponse } from 'next/server'
import { fetchReleases } from '@/lib/github'

export const revalidate = 600

export async function GET() {
  try {
    const releases = await fetchReleases()
    return NextResponse.json({ releases })
  } catch {
    return NextResponse.json(
      { releases: [], error: 'Không tải được danh sách phiên bản.' },
      { status: 502 }
    )
  }
}
