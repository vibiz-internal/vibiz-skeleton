"use client";

// Sign-up page. Client Component so the form posts through the
// Neon Auth proxy (`/api/auth/sign-up/email`) using the browser's
// fetch — guaranteeing a valid Origin header. See login/page.tsx
// for the rationale (server actions can drop the Origin header).
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    router.push("/");
    router.refresh();
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6 py-16">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-400">
          Email and password — that's it.
        </p>
      </header>

      {error ? (
        <div className="rounded-md border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wider text-zinc-500">
          Name
          <input
            type="text"
            name="name"
            autoComplete="name"
            className="rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wider text-zinc-500">
          Email
          <input
            type="email"
            name="email"
            required
            autoComplete="email"
            className="rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
        </label>
        <label className="flex flex-col gap-1 text-xs uppercase tracking-wider text-zinc-500">
          Password
          <input
            type="password"
            name="password"
            required
            minLength={8}
            autoComplete="new-password"
            className="rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
        </label>
        <button
          type="submit"
          disabled={pending}
          className="mt-2 rounded-md border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900 disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>

      <p className="text-xs text-zinc-500">
        Already have an account?{" "}
        <Link href="/login" className="underline hover:text-zinc-300">
          Sign in
        </Link>
      </p>
    </main>
  );
}
