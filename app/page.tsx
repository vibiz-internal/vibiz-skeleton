// Marketing landing. Server Component — reads the current Neon Auth
// session so the header + CTAs adapt to logged-in vs anonymous visitors.
// Replace the placeholder copy ("Acme", hero text, features) with what
// your product actually does. The structure (header / hero / features /
// CTA / footer) is the conventional shape for a SaaS landing.
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  Database,
  Layers,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

const FEATURES = [
  {
    icon: Zap,
    title: "Fast by default",
    body: "Server Components render on the edge; Turbopack keeps dev hot reloads under 100ms.",
  },
  {
    icon: ShieldCheck,
    title: "Auth, baked in",
    body: "Email + password via Neon Auth (Better Auth backend). Sessions, sign-up, sign-out — wired.",
  },
  {
    icon: Database,
    title: "Postgres + Drizzle",
    body: "Typed schema in `db/schema.ts`, forward-only migrations applied at deploy time.",
  },
  {
    icon: Layers,
    title: "shadcn/ui primitives",
    body: "Buttons, dialogs, forms, dropdowns, sheets — pre-installed. Add more with one CLI command.",
  },
];

export default async function Home() {
  let user: { id: string; email?: string | null } | null = null;
  let authReady = true;
  try {
    const { data: session } = await getAuth().getSession();
    user = session?.user ?? null;
  } catch {
    authReady = false;
  }

  async function signOutAction() {
    "use server";
    await getAuth().signOut();
    redirect("/");
  }

  const primaryCtaHref = user ? "/dashboard" : "/signup";
  const primaryCtaLabel = user ? "Open dashboard" : "Get started — it's free";

  return (
    <>
      <SiteHeader
        user={user}
        signOutAction={authReady ? signOutAction : undefined}
      />

      <main className="flex-1">
        {/* Hero */}
        <section className="mx-auto max-w-6xl px-4 pt-20 pb-16 sm:pt-28 sm:pb-24">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <Badge variant="outline" className="gap-1.5">
              <Sparkles className="size-3" /> New project
            </Badge>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">
              The fastest way to ship your SaaS.
            </h1>
            <p className="text-muted-foreground mt-5 max-w-xl text-base sm:text-lg">
              Replace this paragraph with what your product actually does.
              Two short sentences. The reader should know within 5 seconds
              whether to keep scrolling.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href={primaryCtaHref}>
                  {primaryCtaLabel}
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="#features">Learn more</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-4 py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase">
              What you get
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              A serious starting point.
            </h2>
            <p className="text-muted-foreground mt-3">
              The boring stuff is wired so you can focus on the part that
              makes your product worth using.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="gap-3">
                <CardHeader>
                  <div className="bg-muted flex size-9 items-center justify-center rounded-md">
                    <Icon className="size-4" />
                  </div>
                  <CardTitle className="text-base">{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{body}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section id="pricing" className="mx-auto max-w-6xl px-4 py-16">
          <Card className="bg-card mx-auto max-w-3xl text-center">
            <CardHeader className="items-center">
              <CardTitle className="text-2xl sm:text-3xl">
                {user ? "Welcome back." : "Ready when you are."}
              </CardTitle>
              <CardDescription className="mx-auto max-w-md">
                {user
                  ? "Jump back into your dashboard and pick up where you left off."
                  : "Free to try. No credit card required. Replace this copy with your real pricing."}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Button asChild size="lg" className="gap-2">
                <Link href={primaryCtaHref}>
                  {primaryCtaLabel}
                  <ArrowRight />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>

        {/* FAQ placeholder anchor for the nav link */}
        <section id="faq" className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight">
              Questions?
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Replace this with a real FAQ section. The nav link
              <code className="bg-muted mx-1 rounded px-1.5 py-0.5 text-[12px]">
                #faq
              </code>
              points here.
            </p>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
