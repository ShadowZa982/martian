import { kv } from '@vercel/kv'

const TOTAL_KEY = 'martian:downloads:total'
const IPSET_KEY = 'martian:downloads:ips'

const hasKv = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
)

const memTotal = { value: 0 }
const memIps = new Set<string>()

export async function getTotal(): Promise<number> {
  if (!hasKv) return memTotal.value
  const v = await kv.get<number>(TOTAL_KEY)
  return v ?? 0
}

export async function addUniqueDownload(
  ipHash: string
): Promise<{ total: number; counted: boolean }> {
  if (!hasKv) {
    const counted = !memIps.has(ipHash)
    if (counted) {
      memIps.add(ipHash)
      memTotal.value += 1
    }
    return { total: memTotal.value, counted }
  }

  const added = await kv.sadd(IPSET_KEY, ipHash)
  const counted = added === 1
  const total = counted
    ? await kv.incr(TOTAL_KEY)
    : (await kv.get<number>(TOTAL_KEY)) ?? 0
  return { total, counted }
}
