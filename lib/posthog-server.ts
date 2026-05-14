import "server-only";

// ⚠️  VIBIZ-MANAGED — DO NOT MODIFY THIS FILE.
//
// Backend PostHog wiring. Mirrors `lib/posthog.tsx` for the server side.
// Used by `instrumentation.ts > onRequestError` to capture every server
// error (route handlers, server actions, RSC, middleware) as a
// `$exception` event tagged with the business group. Vibiz then turns
// each unique error fingerprint into a CTO task automatically.
//
// Replacing this file (or routing server errors through a parallel
// posthog-events.* path) breaks:
//   - The Vibiz auto-bug-task pipeline (no $exception events arrive)
//   - Server/client error correlation (same group tag stitches them)
//
// The CI guard (`.github/workflows/ci.yml`) fails the build if this
// file is replaced or if a parallel raw-fetch capture file is added.

import { PostHog } from "posthog-node";

let _client: PostHog | null = null;

// Lazy singleton. Returns null in environments missing the env vars
// (local dev with no Vibiz injection) so the caller can no-op
// gracefully without throwing.
export function getPostHogServer(): PostHog | null {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
  if (!key || !host) return null;
  if (_client) return _client;
  _client = new PostHog(key, {
    host,
    // Flush every event immediately — server runtime in serverless is
    // ephemeral, batching loses events on cold-shutdown. Cost is one
    // extra HTTP per error, which is acceptable for an error path.
    flushAt: 1,
    flushInterval: 0,
    disableGeoip: false,
  });
  return _client;
}

export function getBusinessSlug(): string | null {
  return process.env.NEXT_PUBLIC_POSTHOG_BUSINESS_SLUG ?? null;
}
