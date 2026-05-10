# vibiz-skeletons

Pre-scaffolded Next.js project templates the Vibiz CTO clones at the
start of each E2B sandbox. Each subdirectory is a runnable Next.js app
the CTO copies into the workspace and customizes for the user's brief.

| Skeleton | Stack |
| --- | --- |
| `nextjs-base/` | Next.js 16 + TypeScript + Tailwind v4 + Sapiom fetch. No DB. |
| `nextjs-postgres/` | Adds drizzle-orm + `@neondatabase/serverless` + `db/schema.ts`. |
| `nextjs-postgres-auth/` | Adds auth wiring on top of `nextjs-postgres`. |

The CTO chooses the closest skeleton based on the brief and copies it
into the project directory inside `/home/user/workspace/`.

This repo is consumed at runtime by `lib/e2b/bootstrap.ts` in the
[vibiz-agents](https://github.com/youssbim/vibiz-agents) repo.
