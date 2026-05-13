# Project rules

## Database schema

- The schema lives in `db/schema.ts` (Drizzle).
- After editing `db/schema.ts`, run `npm run db:gen` to materialize a migration file under `drizzle/`. Commit it.
- Never rename, delete, or edit existing files under `drizzle/`. Applied migrations are immutable history. To change something, write a new forward migration by editing `db/schema.ts` and re-running `db:gen`.
- Do not run `db:push` in production — it's only for the dev sandbox. Vercel applies migrations at build time via the `prebuild` step (`drizzle-kit migrate`).
- The `neon_auth` schema (Neon Auth's Better Auth tables) is managed by Neon and excluded from Drizzle via `schemaFilter: ["public"]` in `drizzle.config.ts`. Don't touch it.
