import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "@/db/schema";

// Transparent retry for the Neon HTTP driver. Free-tier Neon scales the
// compute to zero after a few minutes idle; the very first request that
// arrives during wake-up gets dropped at the network layer with a
// generic `TypeError: fetch failed`. The driver does not retry these
// itself. We replace the fetch function with a one-shot retry wrapper:
// transparent on the happy path, recovers the cold-start blip, fails
// loudly on real network errors after the second attempt.
type FetchFn = (
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<Response>;

const baseFetch: FetchFn = (input, init) =>
  (globalThis.fetch as FetchFn)(input, init);

const retryingFetch: FetchFn = async (input, init) => {
  try {
    return await baseFetch(input, init);
  } catch (err) {
    const isFetchFailed =
      err instanceof TypeError && /fetch failed/i.test(err.message);
    if (!isFetchFailed) throw err;
    await new Promise((r) => setTimeout(r, 600));
    return baseFetch(input, init);
  }
};

// `neonConfig` is a global. Setting it once at module init applies to
// every `neon(url)` client created afterwards.
(neonConfig as { fetchFunction?: FetchFn }).fetchFunction = retryingFetch;

export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Vibiz writes it to .env.local on first preview.",
    );
  }
  const sql = neon(url);
  return drizzle(sql, { schema });
}
