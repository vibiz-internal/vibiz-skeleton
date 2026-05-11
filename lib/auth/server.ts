// Server-side Neon Auth handle.
//
// Lazy-initialized so importing this module never throws at load time.
// `createNeonAuth` validates `cookies.secret` at construction; constructing
// at top-level would crash any page (auth-related or not) when the
// `NEON_AUTH_*` env vars are missing — for example before Vibiz has run
// the bootstrap that provisions auth and writes them to `.env.local`.
//
// Usage:  import { getAuth } from "@/lib/auth/server"; const auth = getAuth();
//         const { data: session } = await auth.getSession();
//
// `NEON_AUTH_BASE_URL` and `NEON_AUTH_COOKIE_SECRET` are written to
// `.env.local` automatically by Vibiz at first preview start. The other
// `NEON_AUTH_*` vars (project id, public/secret keys, JWKS URL) are
// persisted by the platform but the SDK does not consume them directly.
import { createNeonAuth } from "@neondatabase/auth/next/server";

type NeonAuthInstance = ReturnType<typeof createNeonAuth>;

let cached: NeonAuthInstance | null = null;

export function getAuth(): NeonAuthInstance {
  if (cached) return cached;

  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;

  if (!baseUrl || !cookieSecret) {
    const missing = [
      !baseUrl && "NEON_AUTH_BASE_URL",
      !cookieSecret && "NEON_AUTH_COOKIE_SECRET",
    ]
      .filter(Boolean)
      .join(", ");
    throw new Error(
      `Neon Auth not configured: missing ${missing}. ` +
        "These are written to .env.local by Vibiz when you first run " +
        "preview. If you're seeing this in dev, restart the preview from " +
        "Vibiz so the bootstrap can provision auth.",
    );
  }

  cached = createNeonAuth({
    baseUrl,
    cookies: { secret: cookieSecret },
  });
  return cached;
}
