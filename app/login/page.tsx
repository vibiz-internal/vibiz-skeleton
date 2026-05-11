// Sign-in page. Server Component with a server action that delegates to
// Neon Auth (`auth.signIn.email`). On success redirects home; on failure
// re-renders the form with the error message via a `?error=` query param.
import Link from "next/link";
import { redirect } from "next/navigation";

import { getAuth } from "@/lib/auth/server";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ error?: string }>;

export default async function LoginPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { error } = await searchParams;

  async function signInAction(formData: FormData) {
    "use server";
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    const { error: signInError } = await getAuth().signIn.email({
      email,
      password,
    });
    if (signInError) {
      const message = signInError.message ?? "Sign-in failed.";
      redirect(`/login?error=${encodeURIComponent(message)}`);
    }
    redirect("/");
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center gap-6 px-6 py-16">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
        <p className="mt-1 text-sm text-zinc-400">
          Use your email and password.
        </p>
      </header>

      {error ? (
        <div className="rounded-md border border-red-900 bg-red-950/40 px-3 py-2 text-sm text-red-200">
          {error}
        </div>
      ) : null}

      <form action={signInAction} className="flex flex-col gap-3">
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
            autoComplete="current-password"
            className="rounded-md border border-zinc-800 bg-transparent px-3 py-2 text-sm text-zinc-100 outline-none focus:border-zinc-500"
          />
        </label>
        <button
          type="submit"
          className="mt-2 rounded-md border border-zinc-700 px-3 py-2 text-sm hover:bg-zinc-900"
        >
          Sign in
        </button>
      </form>

      <p className="text-xs text-zinc-500">
        No account?{" "}
        <Link href="/signup" className="underline hover:text-zinc-300">
          Sign up
        </Link>
      </p>
    </main>
  );
}
