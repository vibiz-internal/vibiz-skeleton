// ⚠️  VIBIZ-MANAGED — DO NOT MODIFY THIS FILE.
//
// Customer-app helper for the Vibiz entitlements runtime API. Two
// phases:
//
//   1) After Stripe redirects the buyer back to /payment-success,
//      `claimEntitlement(sessionId)` exchanges the session id for
//      the entitlement payload via Vibiz `/api/runtime/entitlements/
//      claim`. Handles the webhook-vs-redirect race with retry +
//      backoff (Stripe redirect can land before the webhook
//      processes — the API returns 409 'payment_not_recorded' which
//      we retry up to ~6 seconds).
//
//   2) Anywhere else (feature gates), `checkEntitlement(...)` looks
//      up by buyer email or external user id. Customer apps that
//      have auth (Neon Auth) should ALSO mirror the entitlement
//      into their own DB on first claim — this helper is the cold-
//      cache path, not the hot path.

const VIBIZ_BASE_URL =
  process.env.VIBIZ_RUNTIME_URL ?? "https://youss.ngrok.app";
// In production each business app should have VIBIZ_RUNTIME_URL set
// to the canonical Vibiz platform URL (Vibiz injects it as an env at
// deploy time, same way it injects POSTHOG_KEY etc).

export type ClaimedEntitlement = {
  id: string;
  entitlementKey: string;
  type: "one_time" | "subscription";
  status: "active" | "past_due" | "canceled" | "expired";
  buyerEmail: string;
  currentPeriodEnd: string | null;
  grantedAt: string;
};

export type ClaimedOffer = {
  slug: string;
  title: string;
  description: string | null;
  priceCents: number;
  priceCurrency: string;
};

export type ClaimOutcome =
  | { kind: "success"; entitlement: ClaimedEntitlement; offer: ClaimedOffer | null }
  | { kind: "already_redeemed"; entitlement: ClaimedEntitlement; offer: ClaimedOffer | null }
  | { kind: "no_entitlement"; message: string }
  | { kind: "timeout"; message: string }
  | { kind: "error"; message: string };

const CLAIM_RETRY_DELAYS_MS = [400, 800, 1500, 2500, 4000]; // ~9.2s total budget

export async function claimEntitlement(
  sessionId: string,
  opts: { externalUserId?: string } = {},
): Promise<ClaimOutcome> {
  let lastErr: string | null = null;
  for (let attempt = 0; attempt <= CLAIM_RETRY_DELAYS_MS.length; attempt++) {
    try {
      const res = await fetch(`${VIBIZ_BASE_URL}/api/runtime/entitlements/claim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          externalUserId: opts.externalUserId,
        }),
        cache: "no-store",
      });
      const data = await res.json();
      if (res.status === 409 && data.kind === "payment_not_recorded") {
        // Webhook hasn't landed yet — wait and retry.
        if (attempt < CLAIM_RETRY_DELAYS_MS.length) {
          await new Promise((r) => setTimeout(r, CLAIM_RETRY_DELAYS_MS[attempt]));
          continue;
        }
        return {
          kind: "timeout",
          message:
            "Payment still being processed — please refresh in a few seconds.",
        };
      }
      if (!res.ok) {
        if (data.kind === "no_entitlement") {
          return { kind: "no_entitlement", message: data.message ?? "No entitlement granted." };
        }
        lastErr = data.message ?? data.error ?? `HTTP ${res.status}`;
        return { kind: "error", message: lastErr ?? "Unknown error" };
      }
      // 200 OK — success or already_redeemed
      return {
        kind: data.kind,
        entitlement: data.entitlement,
        offer: data.offer ?? null,
      };
    } catch (err) {
      lastErr = (err as Error).message;
      if (attempt < CLAIM_RETRY_DELAYS_MS.length) {
        await new Promise((r) => setTimeout(r, CLAIM_RETRY_DELAYS_MS[attempt]));
        continue;
      }
      return { kind: "error", message: lastErr };
    }
  }
  return { kind: "error", message: lastErr ?? "Unknown" };
}

export type EntitlementCheck =
  | { active: true; entitlement: ClaimedEntitlement }
  | { active: false; reason?: string };

export async function checkEntitlement(opts: {
  entitlementKey: string;
  buyerEmail?: string;
  externalUserId?: string;
}): Promise<EntitlementCheck> {
  try {
    const res = await fetch(`${VIBIZ_BASE_URL}/api/runtime/entitlements/check`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(opts),
      cache: "no-store",
    });
    const data = await res.json();
    if (!res.ok || !data.ok) return { active: false };
    if (!data.active) return { active: false, reason: data.reason };
    return { active: true, entitlement: data.entitlement };
  } catch {
    return { active: false };
  }
}
