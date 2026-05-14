# Project rules

## Brand & visual identity — read DESIGN.md first

**`DESIGN.md` (at repo root) is the source of truth for the brand.** Before composing any UI — landing, dashboard, marketing surface, settings page — read it. It lists the canonical colors, typography scale, radius scale, spacing, and component variants this app commits to.

How it works:
- **Tokens in DESIGN.md = canonical.** `app/globals.css` is the implementation. If they drift, this file wins; bring `globals.css` back into line.
- **shadcn primitives consume the tokens automatically.** A `Button`, `Card`, `Input` already reads `--primary`, `--background`, `--radius`, etc. You almost never need to touch the primitive files — just update the tokens.
- **When the brand changes** (new accent, new font, new radius scale), update **both** DESIGN.md AND `app/globals.css`. If you only update one, the brand drifts.
- **When you need a token that doesn't exist** (e.g. `--warning`, `--chart-1 … --chart-5`), add it to DESIGN.md FIRST, then mirror in `globals.css` under `@theme inline`, then use it. Don't hardcode hex / oklch values inline.

DESIGN.md follows the [Google Labs DESIGN.md spec](https://github.com/google-labs-code/design.md) — YAML frontmatter for machine-readable tokens, markdown body for design rationale.

## UI components

- **shadcn/ui is pre-installed**. Config in `components.json`, primitives in `components/ui/`. Always prefer composing from these over hand-rolling buttons/inputs/cards.
- **Shipped primitives** (import via `@/components/ui/<name>`):
  - `Button`, `Input`, `Label`, `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`)
  - `Badge`, `Skeleton`
  - `Dialog`, `Sheet` (slide-over), `DropdownMenu`, `Select`, `Tabs`
  - `Form` (wraps react-hook-form + zod via `@hookform/resolvers`)
  - `Toaster` (sonner) — already mounted in `app/layout.tsx`. Use via `import { toast } from "sonner"`.
- Need something else? Run `npx shadcn@latest add <component>` (e.g. `accordion`, `command`, `popover`, `tooltip`, `data-table`). The CLI drops files into `components/ui/` and installs Radix deps automatically.
- Theming via CSS vars in `app/globals.css` (`--primary`, `--background`, `--muted`, etc.). The app defaults to dark mode (`class="dark"` on `<html>`). Override tokens or change to light by removing the class.
- Icons: `lucide-react` is installed. `import { ChevronRight } from "lucide-react"`.
- Tailwind v4 — no `tailwind.config.ts`. All tokens live in `globals.css` under `@theme inline`.

## Analytics (PostHog)

- **PostHog is pre-installed** (`posthog-js` dep + `lib/posthog.tsx` Analytics provider mounted in `app/layout.tsx`). Pageviews, pageleaves, and click autocapture are tracked automatically once the platform injects the env vars.
- **Required env (Vibiz injects them, do NOT hardcode)**: `NEXT_PUBLIC_POSTHOG_KEY`, `NEXT_PUBLIC_POSTHOG_HOST`, `NEXT_PUBLIC_POSTHOG_BUSINESS_SLUG`. When any is missing the provider is a no-op — local dev without keys still works.
- **Custom events**: `import posthog from "posthog-js"; posthog.capture("habit_completed", { habitId, streak })`. Use snake_case event names, keep payload small. The `business` group is set globally at init — every event inherits it; do NOT pass `business` in properties.
- **Per-user identification** (when the user logs in via Neon Auth): `posthog.identify(userId, { email })` inside the post-login flow. Reset on logout with `posthog.reset()`.
- **Opt-out of recording on sensitive routes** (e.g. password reset, payment forms): `posthog.opt_out_capturing()` on mount of that page, `posthog.opt_in_capturing()` on unmount.

## URL state

- **`nuqs`** is installed and the `<NuqsAdapter>` is mounted in `app/layout.tsx`. Use it for any state that should survive a refresh or be shareable via URL — filters, pagination, search query, "open modal" flags.
- Pattern: `const [q, setQ] = useQueryState("q", parseAsString.withDefault(""))`. Far better than `useState` for filters/sort/pagination because the URL captures the user's view.

## Hooks

Common hooks shipped in `hooks/` — copy/adapt rather than re-rolling:
- `useDebounce(value, ms)` — for search inputs, autosave.
- `useMediaQuery("(min-width: 768px)")` — responsive logic.
- `useLocalStorage(key, initial)` — persistent client preferences (cross-tab via `storage` event).
- `useCopyToClipboard()` — `[copied, copy]` pair for "Copied!" UX.

## Database schema

- The schema lives in `db/schema.ts` (Drizzle).
- After editing `db/schema.ts`, run `npm run db:gen` to materialize a migration file under `drizzle/`. Commit it.
- Never rename, delete, or edit existing files under `drizzle/`. Applied migrations are immutable history. To change something, write a new forward migration by editing `db/schema.ts` and re-running `db:gen`.
- Do not run `db:push` in production — it's only for the dev sandbox. Vercel applies migrations at build time via the `prebuild` step (`drizzle-kit migrate`).
- The `neon_auth` schema (Neon Auth's Better Auth tables) is managed by Neon and excluded from Drizzle via `schemaFilter: ["public"]` in `drizzle.config.ts`. Don't touch it.

## Landing + dashboard scaffolding

The skeleton ships a working **marketing landing** at `/` and a stub
**dashboard** at `/dashboard`. Use them, don't replace the whole shell:

- `components/site-header.tsx` — sticky responsive header with logo, desktop nav links, mobile `Sheet` menu, and an auth-aware right side (Sign in/Sign up buttons OR avatar `DropdownMenu` with Dashboard + Sign out). Reuses across landing and dashboard.
- `components/site-footer.tsx` — multi-column footer with brand block + Product/Company/Legal links + social + copyright.
- `app/page.tsx` — landing structure: header → hero → features grid → CTA → FAQ anchor → footer. CTAs point to `/dashboard` if signed in, otherwise `/signup`.
- `app/dashboard/page.tsx` — auth-gated (`redirect("/login")` when no session), shows stat cards + a "what's next" guide. Replace with the real product UI.

Brand placeholder is **"Acme"** in both header and footer — change in those two files. Copy throughout the landing is intentionally generic; replace the hero h1, the feature blurbs, and the CTA copy with what your product actually does.

## Delete what you don't need

The skeleton ships **opinionated defaults**, not minimums. Anything that doesn't fit your product can — and should — be deleted, not left as dead weight:

- Don't need a marketing landing? Replace `app/page.tsx` with `redirect("/dashboard")` (or whatever your real entry is) and delete the hero/features/CTA sections.
- Don't need user accounts? Delete `app/login/`, `app/signup/`, `app/api/auth/`, `lib/auth/`, drop `@neondatabase/auth` from `package.json`, and remove the auth-aware branches in the header.
- Don't need a database? Delete `db/`, `drizzle/`, `drizzle.config.ts`, `lib/db.ts`, `lib/db/queries.ts`, `scripts/migrate.mjs`, drop `drizzle-orm` + `@neondatabase/serverless` + `pg` from `package.json`, remove the `prebuild` script.
- Don't need a footer / nav menu / dropdowns / sheets / etc.? Delete the components and the imports.
- Don't need the Vibiz visual editor overlay? Delete `app/_vibiz/`, `babel-plugin-vibiz-locator.cjs`, `.babelrc.js`, drop the `<VibizEditorOverlay />` mount from `app/layout.tsx` (Next.js will switch back to SWC for ~10× faster builds).

The skeleton is a starting point, not a contract. Less code in the final repo = less surface area for bugs and faster builds.

## Database queries

- Pattern guide in `lib/db/queries.ts` — typed Drizzle queries with these conventions:
  - One query module per table (e.g. `lib/db/posts.ts`).
  - Every reading function takes a `db = getDb()` default so the same code runs inside a transaction or stand-alone.
  - List queries always accept `{ limit, cursor }` for cursor pagination — never offset.
  - Mutations use `.returning()` so the call site doesn't need a follow-up SELECT.
- Copy the file shape, replace `posts` with your table, uncomment the real implementations.
- Validation: use `zod` schemas (already installed) at the route/server-action boundary, before the queries. Don't trust input shapes from the client.
