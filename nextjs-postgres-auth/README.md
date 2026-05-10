# Next.js + Postgres + Auth skeleton

Pre-wired starter dropped in by Vibiz. Edit and ship.

## Stack

- **Next.js 16** (App Router) - Turbopack
- **Tailwind CSS v4**
- **Drizzle ORM** (`drizzle-orm` + `drizzle-kit`)
- **Neon** Postgres driver (`@neondatabase/serverless`)
- **Neon Auth** (`@neondatabase/auth`) - hosted Better Auth backend
- **TypeScript** strict

## Layout

```
app/
  layout.tsx               Root layout. Fonts, metadata.
  page.tsx                 Home - shows session state, sign-in link / sign-out form.
  globals.css              Tailwind import + light/dark CSS vars.
  login/page.tsx           Sign-in form (server action).
  signup/page.tsx          Sign-up form (server action).
  api/
    health/route.ts        GET /api/health -> pings the DB.
    auth/[...path]/route.ts Catch-all forwarder for Neon Auth.
db/
  schema.ts                Drizzle table definitions + neon_auth.user FK mirror.
lib/
  db.ts                    getDb() - connection helper.
  utils.ts                 cn() class-name merger.
  auth/
    server.ts              Server-side Neon Auth handle.
    client.ts              Client-side Neon Auth handle ('use client').
drizzle.config.ts          drizzle-kit config (schemaFilter: ['public']).
.env.example               Documented env vars.
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

`db:push` is the fast dev loop - edits in `db/schema.ts` go straight to
the DB. Use `db:gen` + a migrate runner when you need versioned history.

## Auth

Zero-setup: `@neondatabase/auth` (beta as of May 2026) talks to Neon's
hosted Better Auth backend. On first preview start the platform writes
the required env vars to `.env.local`:

- `NEON_AUTH_BASE_URL` - SDK consumes this
- `NEON_AUTH_COOKIE_SECRET` - SDK consumes this
- `NEON_AUTH_PROJECT_ID`, `NEON_AUTH_PUB_CLIENT_KEY`,
  `NEON_AUTH_SECRET_SERVER_KEY`, `NEON_AUTH_JWKS_URL` - persisted but
  not used by the SDK at runtime

Neon owns the user store. The canonical Better Auth user table lives at
`neon_auth.user` (uuid id, name, email, emailVerified, image, createdAt,
updatedAt). It is declared as `authUser` in `db/schema.ts` so you can
JOIN against it and reference `authUser.id` as a FK target. Drizzle is
configured with `schemaFilter: ['public']` so it never tries to migrate
`neon_auth`.

Routes provided out of the box:

- `/login` - email + password sign-in (server action)
- `/signup` - email + password + name sign-up (server action)
- `/api/auth/[...path]` - SDK handler; do not rename the segment

In Server Components / route handlers / server actions, import from
`@/lib/auth/server`. In Client Components, import the `authClient` from
`@/lib/auth/client`.

## AI gateway (Sapiom)

`@sapiom/fetch` ships pre-installed and `lib/sapiom.ts` exports a
memoized `getAiFetch()` factory. `SAPIOM_API_KEY` (transaction-scoped,
$5/30d per-app budget) and `SAPIOM_AGENT_NAME` are injected by Vibiz at
preview start and on Vercel deploy.

```ts
// app/api/summarize/route.ts
import { getAiFetch, gatewayError } from "@/lib/sapiom";

export async function POST(req: Request) {
  const { text } = await req.json();
  const r = await getAiFetch()(
    "https://openrouter.services.sapiom.ai/v1/chat/completions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "openai/gpt-4o-mini",
        messages: [{ role: "user", content: `Summarize: ${text}` }],
      }),
    },
  );
  if (!r.ok) return Response.json({ error: await gatewayError(r) }, { status: 502 });
  return Response.json(await r.json());
}
```

Path conventions: openrouter (LLMs) uses `/v1/...`, fal (images) uses
bare `/run/...`. One key fronts LLMs, images, web search, TTS/STT, SMS.

## When you take over

Delete `.vibiz-skeleton.json` after the first real edit so future tooling
treats this project as yours, not the skeleton.
