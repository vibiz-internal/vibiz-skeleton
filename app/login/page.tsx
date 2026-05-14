"use client";

// Sign-in page. Client Component so the form posts through the
// Neon Auth proxy (`/api/auth/sign-in/email`) using the browser's
// fetch — guaranteeing a valid Origin header reaches the hosted
// better-auth backend. The previous server-action flow relied on
// the incoming request's Origin header, which gets dropped or
// rewritten on some Next.js + Vercel edge configurations and
// surfaces as "Invalid origin" at sign-in.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth/client";

export default function LoginPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message ?? "Sign-in failed.");
      setPending(false);
      return;
    }
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
      <Link href="/" className="flex items-center gap-2 self-start">
        <div className="bg-foreground flex size-6 items-center justify-center rounded-md">
          <Sparkles className="text-background size-3.5" />
        </div>
        <span className="font-semibold">Acme</span>
      </Link>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>Use your email and password.</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="login-form" onSubmit={onSubmit} className="grid gap-4">
            {error ? (
              <p
                role="alert"
                className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
              >
                {error}
              </p>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required
                autoComplete="current-password"
              />
            </div>

            <Button type="submit" disabled={pending} className="mt-2">
              {pending ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-muted-foreground border-t pt-6 text-sm">
          No account?
          <Link
            href="/signup"
            className="text-foreground ml-1 underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
