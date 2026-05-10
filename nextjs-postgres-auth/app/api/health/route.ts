import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    return Response.json(
      { ok: false, db: false, reason: "DATABASE_URL not set" },
      { status: 503 },
    );
  }
  try {
    const db = getDb();
    const result = await db.execute(sql`SELECT 1 AS ok`);
    return Response.json({ ok: true, db: true, rows: result.rows ?? null });
  } catch (err) {
    return Response.json(
      { ok: false, db: false, reason: (err as Error).message },
      { status: 503 },
    );
  }
}
