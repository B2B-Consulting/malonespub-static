type RedisResponse<T> = { result?: T; error?: string };

export function isPoolDatabaseConfigured() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
  );
}

export async function poolRedisCommand<T>(command: unknown[]) {
  const url = process.env.UPSTASH_REDIS_REST_URL?.replace(/\/$/, "");
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) throw new Error("Tournament database is not configured.");

  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const body = (await response.json()) as RedisResponse<T>;
  if (!response.ok || body.error) throw new Error("Tournament database request failed.");
  return body.result as T;
}
