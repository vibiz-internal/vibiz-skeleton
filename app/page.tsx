// Home page. Server Component — reads the current Neon Auth session and
// renders either a "logged in" view with a sign-out form (server action)
// or a link to the login page.
import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <p className="text-muted-foreground text-xs uppercase tracking-[0.2em]">
          New project
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Skeleton ready.
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Edit{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-[12px]">
            app/page.tsx
          </code>{" "}
          to start. Delete{" "}
          <code className="bg-muted rounded px-1.5 py-0.5 text-[12px]">
            .vibiz-skeleton.json
          </code>{" "}
          when you take over.
        </p>
      </header>

      <Card>
        <CardContent>
          {!authReady ? (
            <div className="flex flex-col gap-2">
              <p className="text-destructive text-sm">Auth not configured</p>
              <p className="text-muted-foreground text-xs">{authError}</p>
            </div>
          ) : user ? (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm">
                Logged in as{" "}
                <span className="font-medium">{user.email ?? user.id}</span>
              </p>
              <form action={signOutAction}>
                <Button type="submit" variant="outline" size="sm">
                  Sign out
                </Button>
              </form>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-muted-foreground text-sm">
                You are not signed in.
              </p>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign in</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign up</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <StackCard title="Framework" value="Next.js 16 - App Router" />
        <StackCard title="Styling" value="Tailwind v4 + shadcn/ui" />
        <StackCard title="Database" value="Postgres - Drizzle ORM" />
        <StackCard title="Auth" value="Neon Auth (Better Auth backend)" />
      </section>
    </main>
  );
}

function StackCard({ title, value }: { title: string; value: string }) {
  return (
    <Card className="gap-1 py-3">
      <CardHeader className="px-3">
        <CardDescription className="text-[10px] uppercase tracking-wider">
          {title}
        </CardDescription>
        <CardTitle className="text-sm font-medium">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
