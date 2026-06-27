import { Redis } from '@upstash/redis'

const TOTAL_KEY = 'martian:downloads:total'
const IPSET_KEY = 'martian:downloads:ips'

const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL
const token =
  process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN

const redis = url && token ? new Redis({ url, token }) : null

const memTotal = { value: 0 }
const memIps = new Set<string>()

export async function getTotal(): Promise<number> {
  if (!redis) return memTotal.value
  const v = await redis.get<number>(TOTAL_KEY)
  return v ?? 0
}

export async function addUniqueDownload(
  ipHash: string
): Promise<{ total: number; counted: boolean }> {
  if (!redis) {
    const counted = !memIps.has(ipHash)
    if (counted) {
      memIps.add(ipHash)
      memTotal.value += 1
    }
    return { total: memTotal.value, counted }
  }

  const added = await redis.sadd(IPSET_KEY, ipHash)
  const counted = added === 1
  const total = counted
    ? await redis.incr(TOTAL_KEY)
    : (await redis.get<number>(TOTAL_KEY)) ?? 0
  return { total, counted }
}
