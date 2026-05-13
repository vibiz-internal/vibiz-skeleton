# Project rules

## UI components

- **shadcn/ui is pre-installed**. Config in `components.json`, primitives in `components/ui/`. Always prefer composing from these over hand-rolling buttons/inputs/cards.
- Shipped: `Button`, `Input`, `Label`, `Card` (+ `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction`). Import via `@/components/ui/<name>`.
- Need more? Run `npx shadcn@latest add <component>` (e.g. `dialog`, `dropdown-menu`, `sonner`, `form`, `select`, `tabs`). The CLI drops files into `components/ui/` and installs the Radix deps.
- Theming via CSS vars in `app/globals.css` (`--primary`, `--background`, `--muted`, etc.). The app defaults to dark mode (`class="dark"` on `<html>`). Override tokens or change to light by removing the class.
- Icons: `lucide-react` is installed. `import { ChevronRight } from "lucide-react"`.
- Tailwind v4 — no `tailwind.config.ts`. All tokens live in `globals.css` under `@theme inline`.

## Database schema

- The schema lives in `db/schema.ts` (Drizzle).
- After editing `db/schema.ts`, run `npm run db:gen` to materialize a migration file under `drizzle/`. Commit it.
- Never rename, delete, or edit existing files under `drizzle/`. Applied migrations are immutable history. To change something, write a new forward migration by editing `db/schema.ts` and re-running `db:gen`.
- Do not run `db:push` in production — it's only for the dev sandbox. Vercel applies migrations at build time via the `prebuild` step (`drizzle-kit migrate`).
- The `neon_auth` schema (Neon Auth's Better Auth tables) is managed by Neon and excluded from Drizzle via `schemaFilter: ["public"]` in `drizzle.config.ts`. Don't touch it.
