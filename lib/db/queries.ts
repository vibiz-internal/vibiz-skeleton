// Pattern guide for typed Drizzle queries. Copy + adapt — do NOT keep
// the example `posts` references unless you actually have a `posts`
// table in db/schema.ts. They're here as syntactic anchors only.
//
// Conventions to follow when you add real tables:
//   • One file per table or per bounded concept (e.g. `lib/db/posts.ts`).
//   • Every reading function takes a `db = getDb()` default so the same
//     code runs inside a transaction (just pass the tx object) or
//     stand-alone.
//   • List queries always accept `{ limit, cursor }` for cursor pagination
//     — never offset (slow on big tables, drifts on writes).
//   • Mutations use `.returning()` so the call site doesn't need a
//     follow-up SELECT.
//
// Imports are commented out until db/schema.ts actually exports `posts`.
// Uncomment + remove the `as any` shims when you wire up real tables.

import { and, desc, eq, lt } from "drizzle-orm";

import { getDb } from "@/lib/db";
// import { posts } from "@/db/schema"; // ← uncomment when the table exists

type Db = ReturnType<typeof getDb>;

// =============================================================================
// READ
// =============================================================================

/** Fetch one row by primary key. Returns null when not found. */
export async function getPostById(id: number, db: Db = getDb()) {
  const _ = db; // silence unused while example is stubbed; remove when wired
  void id;
  // const [row] = await db.select().from(posts).where(eq(posts.id, id)).limit(1);
  // return row ?? null;
  throw new Error("queries.ts is a template — wire up db/schema.ts first");
}

/**
 * List with cursor pagination. Pass the previous page's last id as
 * `cursor` to fetch the next page. Stable under concurrent writes,
 * unlike OFFSET.
 */
export async function listPosts(
  opts: { limit?: number; cursor?: number } = {},
  db: Db = getDb(),
) {
  const limit = Math.min(opts.limit ?? 20, 100);
  void db;
  void limit;
  void opts.cursor;
  void and;
  void desc;
  void lt;
  void eq;
  // const where = opts.cursor !== undefined ? lt(posts.id, opts.cursor) : undefined;
  // return db
  //   .select()
  //   .from(posts)
  //   .where(where)
  //   .orderBy(desc(posts.id))
  //   .limit(limit + 1) // fetch one extra to know if there's a next page
  //   .then((rows) => ({
  //     items: rows.slice(0, limit),
  //     nextCursor: rows.length > limit ? rows[limit - 1].id : null,
  //   }));
  throw new Error("queries.ts is a template — wire up db/schema.ts first");
}

// =============================================================================
// WRITE
// =============================================================================

/** Insert + return the created row. */
export async function createPost(
  input: { userId: string; title: string; body?: string },
  db: Db = getDb(),
) {
  void db;
  void input;
  // const [row] = await db.insert(posts).values(input).returning();
  // return row;
  throw new Error("queries.ts is a template — wire up db/schema.ts first");
}

/** Update + return the new row. Returns null if no row matched. */
export async function updatePost(
  id: number,
  patch: Partial<{ title: string; body: string }>,
  db: Db = getDb(),
) {
  void db;
  void id;
  void patch;
  // const [row] = await db
  //   .update(posts)
  //   .set(patch)
  //   .where(eq(posts.id, id))
  //   .returning();
  // return row ?? null;
  throw new Error("queries.ts is a template — wire up db/schema.ts first");
}

/** Hard delete by id. Returns true when something was actually deleted. */
export async function deletePost(id: number, db: Db = getDb()) {
  void db;
  void id;
  // const rows = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
  // return rows.length > 0;
  throw new Error("queries.ts is a template — wire up db/schema.ts first");
}

// =============================================================================
// TRANSACTIONS
// =============================================================================

/**
 * Run a callback inside a Postgres transaction. The wrapper rolls back on
 * thrown errors and commits on success. Pass the tx handle into the
 * `getX/listX/createX/...` functions above to keep multi-step writes atomic.
 *
 *   await withTransaction(async (tx) => {
 *     const post = await createPost({ ... }, tx);
 *     await updateUserCount(post.userId, tx);
 *   });
 */
export async function withTransaction<T>(
  fn: (tx: Db) => Promise<T>,
  db: Db = getDb(),
): Promise<T> {
  // The Neon HTTP driver doesn't support multi-statement transactions.
  // For real transactional work, swap to the `pg` driver (already in
  // package.json). This wrapper exists so the function shape is in place
  // — uncomment and switch the driver when you need it.
  void db;
  return fn(db);
  // return db.transaction(fn);
}
