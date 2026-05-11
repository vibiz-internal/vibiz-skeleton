// Catch-all route that forwards every `/api/auth/*` request to Neon's
// hosted Better Auth backend via the SDK. The folder is named
// `[...path]` by Neon convention — do not rename.
//
// Lazy resolves `auth` per request so a missing `NEON_AUTH_*` env var
// surfaces as a route-level 500 with an actionable message instead of
// crashing the whole server at import time.
import { getAuth } from "@/lib/auth/server";

type Handler = (...args: unknown[]) => Promise<Response> | Response;

function lazy(method: "GET" | "POST"): Handler {
  return (...args: unknown[]) => {
    const handler = getAuth().handler() as unknown as Record<string, Handler>;
    return handler[method](...args);
  };
}

export const GET = lazy("GET");
export const POST = lazy("POST");
