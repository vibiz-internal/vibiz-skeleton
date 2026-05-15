// ⚠️  VIBIZ-MANAGED — DO NOT MODIFY THIS FILE.
//
// Reads the Buy-button offers seeded into `data/offers.json` by the
// Vibiz platform. The platform writes the JSON before each deploy
// based on offers configured in the Vibiz dashboard; the founder /
// agent never edits it by hand inside this repo.
//
// Use it from any server component (typically a /pricing or landing
// page) to render Buy buttons:
//
//   import { getSeededOffers } from "@/lib/offers";
//   const offers = await getSeededOffers();
//   return <div>{offers.map(o => <a href={o.paymentLinkUrl}>{o.title}</a>)}</div>
//
// Layout choice (grid, pricing table, single button) is up to the
// page that consumes this — the helper just reads + validates.
//
// SECURITY: every paymentLinkUrl is allowlisted to Stripe-hosted
// hostnames. A tampered offers.json that injects a phishing URL
// won't render. The list is empty on a fresh skeleton clone (no
// offers configured yet) — callers should handle that gracefully.

import { promises as fs } from "node:fs";
import path from "node:path";

export interface Offer {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  priceCents: number;
  priceCurrency: string;
  type: "one_time" | "subscription";
  paymentLinkUrl: string;
}

const OFFERS_PATH = path.join(process.cwd(), "data", "offers.json");

const STRIPE_URL_PREFIXES = [
  "https://buy.stripe.com/",
  "https://checkout.stripe.com/",
];

function isAllowedPaymentLinkUrl(url: unknown): url is string {
  if (typeof url !== "string") return false;
  return STRIPE_URL_PREFIXES.some((p) => url.startsWith(p));
}

function isValidOffer(raw: unknown): raw is Offer {
  if (!raw || typeof raw !== "object") return false;
  const o = raw as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.slug === "string" &&
    typeof o.title === "string" &&
    typeof o.priceCents === "number" &&
    Number.isFinite(o.priceCents) &&
    o.priceCents > 0 &&
    typeof o.priceCurrency === "string" &&
    (o.type === "one_time" || o.type === "subscription") &&
    isAllowedPaymentLinkUrl(o.paymentLinkUrl)
  );
}

/**
 * Read the seeded offers. Returns [] if the file is missing, empty,
 * or unreadable — a fresh skeleton clone has no offers and pages
 * that render Buy buttons should fall back to "no offers" copy.
 */
export async function getSeededOffers(): Promise<Offer[]> {
  try {
    const raw = await fs.readFile(OFFERS_PATH, "utf-8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidOffer).map((o) => ({
      id: o.id,
      slug: o.slug,
      title: o.title,
      description: o.description ?? null,
      priceCents: o.priceCents,
      priceCurrency: o.priceCurrency,
      type: o.type,
      paymentLinkUrl: o.paymentLinkUrl,
    }));
  } catch {
    return [];
  }
}

/** Convenience helper: find one offer by slug. */
export async function getSeededOffer(slug: string): Promise<Offer | null> {
  const offers = await getSeededOffers();
  return offers.find((o) => o.slug === slug) ?? null;
}
