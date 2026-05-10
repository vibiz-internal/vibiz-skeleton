# Next.js + Postgres skeleton

Pre-wired starter dropped in by Vibiz. Edit and ship.

## Stack

- **Next.js 16** (App Router) · Turbopack
- **Tailwind CSS v4**
- **Drizzle ORM** (`drizzle-orm` + `drizzle-kit`)
- **Neon** Postgres driver (`@neondatabase/serverless`)
- **TypeScript** strict

## Layout

```
app/
  layout.tsx        Root layout. Fonts, metadata.
  page.tsx          Home — replace with your landing.
  globals.css       Tailwind import + light/dark CSS vars.
  api/
    health/route.ts GET /api/health → pings the DB.
db/
  schema.ts         Drizzle table definitions. Add yours.
lib/
  db.ts             getDb() — connection helper.
  utils.ts          cn() class-name merger.
drizzle.config.ts   drizzle-kit config (uses DIRECT_URL).
.env.example        Documented env vars.
```

## Scripts

| Command            | What it does                                              |
|--------------------|-----------------------------------------------------------|
| `npm run dev`      | Dev server with Turbopack.                                |
| `npm run build`    | Production build.                                         |
| `npm run start`    | Run the production build.                                 |
| `npm run lint`     | ESLint on the project.                                    |
| `npm run typecheck`| `tsc --noEmit`.                                           |
| `npm run db:push`  | Push `db/schema.ts` to the database (dev iteration).      |
| `npm run db:gen`   | Generate a versioned migration in `drizzle/`.             |
| `npm run db:studio`| Open Drizzle Studio against the connected DB.             |

## Database

`DATABASE_URL` and `DIRECT_URL` are provisioned by Vibiz on first preview
and on deploy. Locally you can copy `.env.example` to `.env.local` and
point them at any Postgres.

`db:push` is the fast dev loop — edits in `db/schema.ts` go straight to
the DB. Use `db:gen` + a migrate runner when you need versioned history.

## AI gateway (Sapiom)

`@sapiom/fetch` ships pre-installed and `lib/sapiom.ts` exports
`getAiFetch()`. Vibiz injects `SAPIOM_API_KEY` (transaction-scoped,
$5/30d per-app budget) and `SAPIOM_AGENT_NAME` at preview start and on
Vercel deploy. ALWAYS call `.json()` on the returned Response — the
SDK returns a real `Response`, not the parsed body.

```ts
import { getAiFetch, gatewayError } from "@/lib/sapiom";

const r = await getAiFetch()(
  "https://openrouter.services.sapiom.ai/v1/chat/completions",
  { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "hi" }] }) },
);
if (!r.ok) throw new Error(await gatewayError(r));
const data = await r.json();
```

Endpoints: openrouter (LLMs) `/v1/...`, fal (images) bare `/run/...`.

## When you take over

Delete `.vibiz-skeleton.json` after the first real edit so future tooling
treats this project as yours, not the skeleton.
