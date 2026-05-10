import { asc, desc } from "drizzle-orm";

import { TaskBoard } from "@/components/task-board";
import { tasks } from "@/db/schema";
import { getDb } from "@/lib/db";
import type { AthleteTask } from "@/lib/tasks";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { initialTasks, databaseReady } = await loadInitialTasks();

  return <TaskBoard initialTasks={initialTasks} databaseReady={databaseReady} />;
}

async function loadInitialTasks(): Promise<{
  initialTasks: AthleteTask[];
  databaseReady: boolean;
}> {
  if (!process.env.DATABASE_URL) {
    return { initialTasks: [], databaseReady: false };
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(tasks)
      .orderBy(asc(tasks.scheduledFor), asc(tasks.completed), desc(tasks.createdAt));

    const initialTasks = rows.map((task) => ({
      ...task,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    }));

    return { initialTasks, databaseReady: true };
  } catch {
    return { initialTasks: [], databaseReady: false };
  }
}
