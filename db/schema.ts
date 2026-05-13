// Drizzle schema starter.
//
// Neon's Better Auth provider provisions a `neon_auth.user` table (and
// siblings: account, session, …) AT NEON's SIDE — Vibiz does not own
// that schema and you must NEVER declare it here with `pgSchema(...)`.
// drizzle-kit would dutifully include it in every generated migration
// and `drizzle-kit migrate` would then fail at deploy time with
// `schema "neon_auth" already exists`.
//
// `schemaFilter: ['public']` in `drizzle.config.ts` only filters
// introspection of the live DB; it does NOT filter declarations made
// from TS. So the rule is simply: keep this file PURE PUBLIC.
//
// Need a foreign key onto the Neon Auth user? Store the user id as a
// plain `text("user_id")` (Better Auth ids are strings). You can still
// query joins via raw SQL or by importing the user type from Better
// Auth's client — you just don't get a Drizzle-level relation.
//
// Add your own tables in the `public` schema below.

// ---------------------------------------------------------------------------
// Your tables go here. Example shape — uncomment and adapt:
//
// import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
//
// export const posts = pgTable("posts", {
//   id: serial("id").primaryKey(),
//   // Better Auth user id (string). No FK — `neon_auth.user` is owned
//   // by Neon, not Drizzle. Join in queries, not in the schema.
//   userId: text("user_id").notNull(),
//   title: text("title").notNull(),
//   body: text("body"),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });
// ---------------------------------------------------------------------------

// Marker export so TypeScript treats this file as a module even when
// no tables have been declared yet. Safe to leave in place; remove it
// once you add real exports above if you prefer a clean file.
export {};
