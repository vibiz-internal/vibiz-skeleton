# Next.js skeleton (no DB)

Pre-wired starter dropped in by Vibiz. Edit and ship.

## Stack

- **Next.js 16** (App Router) · Turbopack
- **Tailwind CSS v4**
- **TypeScript** strict

## Layout

```
app/
  layout.tsx        Root layout. Fonts, metadata.
  page.tsx          Home — replace with your landing.
  globals.css       Tailwind import + light/dark CSS vars.
public/             Static assets (svgs, images).
```

## Scripts

| Command            | What it does            |
|--------------------|-------------------------|
| `npm run dev`      | Dev server (Turbopack). |
| `npm run build`    | Production build.       |
| `npm run start`    | Run production build.   |
| `npm run lint`     | ESLint.                 |
| `npm run typecheck`| `tsc --noEmit`.         |

## AI gateway (Sapiom)

`@sapiom/fetch` is pre-installed. Use the `getAiFetch()` factory in
`lib/sapiom.ts`. Vibiz injects `SAPIOM_API_KEY` (transaction-scoped,
$5/30d per-app budget) and `SAPIOM_AGENT_NAME` at preview start.

```ts
import { getAiFetch, gatewayError } from "@/lib/sapiom";

const r = await getAiFetch()(
  "https://openrouter.services.sapiom.ai/v1/chat/completions",
  { method: "POST", headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "openai/gpt-4o-mini",
      messages: [{ role: "user", content: "hi" }] }) },
);
if (!r.ok) throw new Error(await gatewayError(r));
```

ONE key fronts LLMs (openrouter, `/v1/...`), images (fal, bare `/run/...`),
web search, TTS/STT, SMS. Always `.json()` the Response.

## Need a database?

Switch to the `nextjs-postgres` skeleton — it's the same shape plus
Drizzle + `@neondatabase/serverless` pre-wired. Or `npm install` them in
this project and copy `lib/db.ts` from there.

## When you take over

Delete `.vibiz-skeleton.json` after the first real edit so future tooling
treats this project as yours, not the skeleton.
