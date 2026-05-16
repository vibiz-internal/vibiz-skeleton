"use client";

// Sign-up page. Client Component so the form posts through the
// Neon Auth proxy (`/api/auth/sign-up/email`) using the browser's
// fetch — guaranteeing a valid Origin header. See login/page.tsx
// for the rationale (server actions can drop the Origin header).
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

export default function SignupPage() {
  const router = useRouter();
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState<string | null>(null);
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
      setState("error");
      cardControls.start({
        x: [0, -8, 8, -6, 6, -3, 3, 0],
        transition: { duration: 0.5, ease: "easeInOut" },
      });
      return;
    }
    setState("success");
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
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Email and password — that&apos;s it.</CardDescription>
          </CardHeader>

          <CardContent>
            <form id="signup-form" onSubmit={onSubmit} className="grid gap-4">
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
                <Label htmlFor="name" className="sr-only">
                  Name
                </Label>
                <FloatingInput
                  id="name"
                  type="text"
                  name="name"
                  label="Name"
                  autoComplete="name"
                />
              </div>

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
                  label="Password (min 8 chars)"
                  required
                  minLength={8}
                  autoComplete="new-password"
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
                    Creating account…
                  </>
                ) : state === "success" ? (
                  <>
                    <CheckCircle2 className="mr-2 size-4" />
                    Welcome
                  </>
                ) : (
                  "Create account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="text-muted-foreground border-t pt-6 text-sm">
            Already have an account?
            <AnimatedLink href="/login" className="ml-1">
              Sign in
            </AnimatedLink>
          </CardFooter>
        </Card>
      </motion.div>
    </main>
  );
}
