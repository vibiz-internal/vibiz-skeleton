// ⚠️  VIBIZ-MANAGED — DO NOT REMOVE `onRequestError`.
//
// `register()` is intentionally empty — shadows the parent vibiz-agents
// instrumentation that Next's project-scan would otherwise reach via
// `../../instrumentation.ts`. The parent file references
// `@/lib/dispatcher/bootstrap` which resolves only inside vibiz-agents
// itself; this no-op keeps each scaffolded project hermetic.
//
// `onRequestError` forwards every server-side error to PostHog as a
// `$exception` event tagged with the business group. Vibiz polls
// PostHog (via webhook) for these events and creates a CTO task per
// unique fingerprint, so backend errors in the live app become repair
// work automatically. Removing or stubbing this function breaks the
// Vibiz auto-bug-task pipeline.

export function register() {}

export async function onRequestError(
  error: unknown,
  request: {
    path: string;
    method: string;
    headers: Record<string, string | undefined>;
  },
  errorContext: {
    routerKind: "Pages Router" | "App Router";
    routePath: string;
    routeType: "render" | "route" | "action" | "middleware";
    renderSource?: string;
    revalidateReason?: string;
    renderType?: string;
  },
) {
  try {
    const { getPostHogServer, getBusinessSlug } = await import(
      "@/lib/posthog-server"
    );
    const ph = getPostHogServer();
    if (!ph) return;
    const slug = getBusinessSlug();

    // Try to extract the PostHog distinct_id from the request cookies
    // so the server error can be correlated with a session replay on
    // the client. The cookie shape is `ph_<projectKey>_posthog` whose
    // value is a URL-encoded JSON blob with a `distinct_id` field.
    let distinctId = "anonymous-server";
    const cookie = request.headers["cookie"];
    if (cookie) {
      const m = cookie.match(/ph_[^=]+_posthog=([^;]+)/);
      if (m && m[1]) {
        try {
          const parsed = JSON.parse(decodeURIComponent(m[1]));
          if (typeof parsed?.distinct_id === "string") {
            distinctId = parsed.distinct_id;
          }
        } catch {
          /* fall through with anonymous-server */
        }
      }
    }

    const err = error as Error;
    ph.captureException(err, distinctId, {
      $groups: slug ? { business: slug } : undefined,
      path: request.path,
      method: request.method,
      route_path: errorContext.routePath,
      route_type: errorContext.routeType,
      router_kind: errorContext.routerKind,
      // Tag so we can filter server-side errors separately if needed.
      source: "server",
    });
  } catch {
    // Never let error reporting itself crash the request response.
  }
}
