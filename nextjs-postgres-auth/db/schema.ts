// Drizzle schema starter.
//
// Neon's Better Auth provider provisions a `neon_auth.user` table (and
// siblings: account, session, …). This file declares the columns we
// actually need to JOIN/FK against — Drizzle treats `neon_auth` as
// EXTERNAL: never generate migrations against it. `drizzle.config.ts`
// pins `schemaFilter: ['public']` so drizzle-kit only manages `public`.
//
// Reference `authUser.id` for FK targets only. Add your own tables in
// the `public` schema below.

import { boolean, pgSchema, text, timestamp, uuid } from "drizzle-orm/pg-core";

// External schema — managed by Neon Auth, NOT Drizzle.
export const neonAuth = pgSchema("neon_auth");

// `neon_auth.user` is the canonical Better Auth user table. Note the
// camelCased physical column names (Better Auth doesn't snake_case).
export const authUser = neonAuth.table("user", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  emailVerified: boolean("emailVerified").notNull(),
  image: text("image"),
  createdAt: timestamp("createdAt", { withTimezone: true }).notNull(),
  updatedAt: timestamp("updatedAt", { withTimezone: true }).notNull(),
});

// ---------------------------------------------------------------------------
// Your tables go here. Example shape — uncomment and adapt:
//
// import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
//
// export const posts = pgTable("posts", {
//   id: serial("id").primaryKey(),
//   userId: uuid("user_id")
//     .notNull()
//     .references(() => authUser.id, { onDelete: "cascade" }),
//   title: text("title").notNull(),
//   body: text("body"),
//   createdAt: timestamp("created_at", { withTimezone: true })
//     .notNull()
//     .defaultNow(),
// });
// ---------------------------------------------------------------------------
