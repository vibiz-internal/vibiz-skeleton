# Project rules

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

## Database queries

- Pattern guide in `lib/db/queries.ts` — typed Drizzle queries with these conventions:
  - One query module per table (e.g. `lib/db/posts.ts`).
  - Every reading function takes a `db = getDb()` default so the same code runs inside a transaction or stand-alone.
  - List queries always accept `{ limit, cursor }` for cursor pagination — never offset.
  - Mutations use `.returning()` so the call site doesn't need a follow-up SELECT.
- Copy the file shape, replace `posts` with your table, uncomment the real implementations.
- Validation: use `zod` schemas (already installed) at the route/server-action boundary, before the queries. Don't trust input shapes from the client.
