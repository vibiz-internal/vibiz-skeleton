import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Prefer DIRECT_URL for DDL (some DDL won't run through a pooler).
    // Fall back to DATABASE_URL when only one URL is configured.
    url: process.env.DIRECT_URL ?? process.env.DATABASE_URL ?? "",
  },
  // `neon_auth` is owned by Neon (Better Auth user store mirror). Drizzle
  // must NOT diff or migrate it — restrict to the `public` schema.
  schemaFilter: ["public"],
  strict: true,
  verbose: true,
} satisfies Config;
