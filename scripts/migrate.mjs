// Apply pending Drizzle migrations on the live database.
//
// Why a script instead of `drizzle-kit migrate`: drizzle-kit 0.31's
// CLI hangs indefinitely on the second migration (only emits a
// spinner, never advances). The drizzle-orm runtime migrator is the
// pattern Drizzle docs recommend for production deploys anyway —
// works in seconds, surfaces errors, and lets us choose a driver
// (here `node-postgres` over Neon's TCP endpoint via DIRECT_URL).
//
// Run on Vercel via the `prebuild` step in package.json. Invoking
// outside a build (e.g. `npm run db:migrate` locally) does the same.

import { drizzle } from "drizzle-orm/node-postgres";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import pg from "pg";

const url = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!url) {
  // No DB wired — typical when building a non-DB preview locally or
  // before Vibiz has provisioned Neon. Skip silently so `npm run
  // build` keeps working without env vars.
  console.log("[migrate] no DIRECT_URL/DATABASE_URL set — skipping.");
  process.exit(0);
}

const pool = new pg.Pool({ connectionString: url });
try {
  const db = drizzle(pool);
  await migrate(db, { migrationsFolder: "./drizzle" });
  console.log("[migrate] applied");
} catch (err) {
  console.error("[migrate] failed:", err);
  process.exitCode = 1;
} finally {
  await pool.end();
}
