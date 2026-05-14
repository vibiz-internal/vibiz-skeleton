"use client";

// Sign-up page. Client Component so the form posts through the
// Neon Auth proxy (`/api/auth/sign-up/email`) using the browser's
// fetch — guaranteeing a valid Origin header. See login/page.tsx
// for the rationale (server actions can drop the Origin header).
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

export default function SignupPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const { error: signUpError } = await authClient.signUp.email({
      name: name || email.split("@")[0],
      email,
      password,
    });
    if (signUpError) {
      setError(signUpError.message ?? "Sign-up failed.");
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
          <CardTitle className="text-2xl">Create your account</CardTitle>
          <CardDescription>Email and password — that&apos;s it.</CardDescription>
        </CardHeader>

        <CardContent>
          <form id="signup-form" onSubmit={onSubmit} className="grid gap-4">
            {error ? (
              <p
                role="alert"
                className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
              >
                {error}
              </p>
            ) : null}

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Jane Doe"
              />
            </div>

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
                minLength={8}
                autoComplete="new-password"
              />
            </div>

            <Button type="submit" disabled={pending} className="mt-2">
              {pending ? "Creating account…" : "Create account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="text-muted-foreground border-t pt-6 text-sm">
          Already have an account?
          <Link
            href="/login"
            className="text-foreground ml-1 underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}
