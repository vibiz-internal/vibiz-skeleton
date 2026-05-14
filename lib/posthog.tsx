"use client";

// ⚠️  VIBIZ-MANAGED — DO NOT MODIFY THIS FILE.
//
// This is the ONLY allowed PostHog wiring in the project. Replacing it
// (or adding a parallel `lib/posthog-events.ts`, `lib/posthog-capture.ts`,
// or any file that POSTs to `/capture/` directly via `fetch`) breaks:
//   - Session replay (the recorder JS only loads via posthog-js)
//   - Click autocapture, scroll/rage-click detection
//   - Cross-page user identification cookies
//   - PostHog feature flags / experiments
//
// For custom semantic events, do NOT touch this file — just call from
// anywhere in the app:
//
//   import posthog from "posthog-js";
//   posthog.capture("habit_completed", { habit_id, streak });
//
// The CI guard (`.github/workflows/ci.yml`) will fail the build if this
// file is replaced or if a parallel raw-fetch capture file is added.

import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";

// PostHog client wiring. Vibiz injects three NEXT_PUBLIC env vars at
// build/deploy time:
//   - NEXT_PUBLIC_POSTHOG_KEY        the shared ingestion key (phc_...)
//   - NEXT_PUBLIC_POSTHOG_HOST       typically https://us.i.posthog.com
//   - NEXT_PUBLIC_POSTHOG_BUSINESS_SLUG  the slug of THIS business
//
// All three must be present for tracking to activate. When any is
// missing (e.g. running the skeleton locally with no env), the
// provider is a transparent passthrough — children render normally,
// posthog.init never runs, no errors.
//
// Why `posthog.group()`: Vibiz uses one shared PostHog project for all
// business apps. Each event is tagged with `business:<slug>` so the
// Vibiz dashboard can filter to a single tenant's data. The group is
// registered ONCE per page load — every subsequent capture inherits
// it automatically.

export function Analytics({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    const slug = process.env.NEXT_PUBLIC_POSTHOG_BUSINESS_SLUG;

    if (!key || !host || !slug) return;
    if (typeof window === "undefined") return;
    // Avoid re-init on Fast Refresh / second mount in dev (React strict mode).
    if ((posthog as unknown as { __loaded?: boolean }).__loaded) return;

    posthog.init(key, {
      api_host: host,
      capture_pageview: true,
      capture_pageleave: true,
      // Session recording defaults to ON when enabled in the PostHog
      // project settings — Vibiz turns it on for the shared project.
      // Toggle off for individual visitors with posthog.opt_out_capturing()
      // if needed (e.g. an internal "admin" route should not record).
    });

    posthog.group("business", slug);
  }, []);

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}
