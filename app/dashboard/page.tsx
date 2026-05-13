// Authed dashboard placeholder. Server Component — guards on session,
// redirects unsigned visitors to /login. Replace the stat cards + the
// "What's next" list with the real product UI.
import { redirect } from "next/navigation";
import { ArrowUpRight, Database, Users, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

const STATS = [
  { icon: Users, label: "Users", value: "0", delta: "Add your first metric" },
  { icon: Database, label: "Records", value: "0", delta: "Wire `lib/db/queries.ts`" },
  { icon: Zap, label: "Events today", value: "0", delta: "Hook your event source" },
];

export default async function Dashboard() {
  const { data: session } = await getAuth().getSession();
  const user = session?.user ?? null;
  if (!user) redirect("/login");

  async function signOutAction() {
    "use server";
    await getAuth().signOut();
    redirect("/");
  }

  return (
    <>
      <SiteHeader user={user} signOutAction={signOutAction} />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10">
        <div className="flex flex-col gap-1">
          <Badge variant="secondary" className="w-fit">
            Dashboard
          </Badge>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Welcome back.
          </h1>
          <p className="text-muted-foreground text-sm">
            Signed in as{" "}
            <span className="font-medium">{user.email ?? user.id}</span>.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {STATS.map(({ icon: Icon, label, value, delta }) => (
            <Card key={label}>
              <CardHeader className="flex-row items-center justify-between gap-2">
                <CardDescription>{label}</CardDescription>
                <Icon className="text-muted-foreground size-4" />
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-semibold tracking-tight">{value}</p>
                <p className="text-muted-foreground mt-1 text-xs">{delta}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8">
          <CardHeader>
            <CardTitle>What&apos;s next</CardTitle>
            <CardDescription>
              This page is a placeholder. Build the real product UI here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-muted-foreground flex flex-col gap-2 text-sm">
              <li className="flex items-start gap-2">
                <ArrowUpRight className="text-foreground mt-0.5 size-4 shrink-0" />
                Add your tables in <code>db/schema.ts</code> and
                <code className="bg-muted ml-1 rounded px-1 py-0.5 text-[11px]">
                  npm run db:gen
                </code>
                .
              </li>
              <li className="flex items-start gap-2">
                <ArrowUpRight className="text-foreground mt-0.5 size-4 shrink-0" />
                Wire typed queries in <code>lib/db/queries.ts</code>.
              </li>
              <li className="flex items-start gap-2">
                <ArrowUpRight className="text-foreground mt-0.5 size-4 shrink-0" />
                Replace these stat cards with metrics that matter to your
                users.
              </li>
            </ul>

            <form action={signOutAction} className="mt-6">
              <button
                type="submit"
                className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline"
              >
                Sign out
              </button>
            </form>
          </CardContent>
        </Card>
      </main>

      <SiteFooter />
    </>
  );
}
