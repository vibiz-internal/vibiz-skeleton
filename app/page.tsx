// Home page. Server Component — reads the current Neon Auth session and
// renders either a "logged in" view with a sign-out form (server action)
// or a link to the login page.
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  // Tolerate an unconfigured-auth state at render so the skeleton home
  // still loads (showing a clear hint) when env vars aren't in place yet.
  let user: { id: string; email?: string | null } | null = null;
  let authReady = true;
  let authError: string | null = null;
  try {
    const { data: session } = await getAuth().getSession();
    user = session?.user ?? null;
  } catch (err) {
    authReady = false;
    authError = err instanceof Error ? err.message : String(err);
  }

  async function signOutAction() {
    "use server";
    await getAuth().signOut();
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-16">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          New project
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Skeleton ready.
        </h1>
        <p className="mt-2 text-sm text-zinc-400">
          Edit{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-[12px]">
            app/page.tsx
          </code>{" "}
          to start. Delete{" "}
          <code className="rounded bg-zinc-900 px-1.5 py-0.5 text-[12px]">
            .vibiz-skeleton.json
          </code>{" "}
          when you take over.
        </p>
      </header>

      <section className="rounded-xl border border-zinc-800 p-4">
        {!authReady ? (
          <div className="flex flex-col gap-2">
            <p className="text-sm text-amber-400">Auth not configured</p>
            <p className="text-xs text-zinc-400">{authError}</p>
          </div>
        ) : user ? (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              Logged in as{" "}
              <span className="font-medium">{user.email ?? user.id}</span>
            </p>
            <form action={signOutAction}>
              <button
                type="submit"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs hover:bg-zinc-900"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">You are not signed in.</p>
            <div className="flex gap-2">
              <Link
                href="/login"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs hover:bg-zinc-900"
              >
                Sign in
              </Link>
              <Link
                href="/signup"
                className="rounded-md border border-zinc-700 px-3 py-1.5 text-xs hover:bg-zinc-900"
              >
                Sign up
              </Link>
            </div>
          </div>
        )}
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card title="Framework" value="Next.js 16 - App Router" />
        <Card title="Styling" value="Tailwind CSS v4" />
        <Card title="Database" value="Postgres - Drizzle ORM" />
        <Card title="Auth" value="Neon Auth (Better Auth backend)" />
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-800 p-3">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">
        {title}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
