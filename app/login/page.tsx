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
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "motion/react";
import { CheckCircle2, Loader2, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { FloatingInput } from "@/components/ui/floating-input";
import { AnimatedLink } from "@/components/ui/animated-link";
import { authClient } from "@/lib/auth/client";

type SubmitState = "idle" | "pending" | "success" | "error";

export default function LoginPage() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
  // Single controller drives mount entrance + later shake. Two separate
  // motion.divs caused a layout flicker because nested transforms
  // composed unpredictably.
  const cardControls = useAnimationControls();
  useEffect(() => {
    cardControls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, delay: 0.08, ease: [0.16, 1, 0.3, 1] },
    });
  }, [cardControls]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "pending") return;
    setError(null);
    setState("pending");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    const { error: signInError } = await authClient.signIn.email({
      email,
      password,
    });
    if (signInError) {
      setError(signInError.message ?? "Sign-in failed.");
      setState("error");
      // Horizontal shake to make the failure tactile.
      cardControls.start({
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      return;
    }
    setState("success");
    // Brief celebration before the redirect — the dashboard load
    // covers most of the perceived wait anyway.
    setTimeout(() => {
      router.push("/dashboard");
      router.refresh();
    }, 350);
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-1 flex-col justify-center gap-6 px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Link href="/" className="group flex items-center gap-2 self-start">
          <div className="bg-foreground flex size-6 items-center justify-center rounded-md transition-transform group-hover:scale-110">
            <Sparkles className="text-background size-3.5" />
          </div>
          <span className="font-semibold">Acme</span>
        </Link>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={cardControls}>
        <Card className="transition-shadow duration-300 focus-within:shadow-lg hover:shadow-md">
            <CardHeader>
              <CardTitle className="text-2xl">Sign in</CardTitle>
              <CardDescription>Use your email and password.</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                id="login-form"
                onSubmit={onSubmit}
                className="grid gap-4"
              >
                {error ? (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-destructive/40 bg-destructive/10 text-destructive rounded-md border px-3 py-2 text-sm"
                  >
                    {error}
                  </motion.p>
                ) : null}

                <div className="grid gap-2">
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <FloatingInput
                    id="email"
                    type="email"
                    name="email"
                    label="Email"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password" className="sr-only">
                    Password
                  </Label>
                  <FloatingInput
                    id="password"
                    type="password"
                    name="password"
                    label="Password"
                    required
                    autoComplete="current-password"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={state === "pending" || state === "success"}
                  className="mt-2 active:scale-[0.98] transition-transform"
                >
                  {state === "pending" ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Signing in…
                    </>
                  ) : state === "success" ? (
                    <>
                      <CheckCircle2 className="mr-2 size-4" />
                      Welcome back
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="text-muted-foreground border-t pt-6 text-sm">
              No account?
              <AnimatedLink href="/signup" className="ml-1">
                Sign up
              </AnimatedLink>
            </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
