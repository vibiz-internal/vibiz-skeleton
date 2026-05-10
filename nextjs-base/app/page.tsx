export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col gap-6 px-6 py-16">
      <header>
        <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          New project
        </p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">
          Skeleton ready.
        </h1>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          Edit{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px] dark:bg-zinc-900">
            app/page.tsx
          </code>{" "}
          to start. Delete{" "}
          <code className="rounded bg-zinc-100 px-1.5 py-0.5 text-[12px] dark:bg-zinc-900">
            .vibiz-skeleton.json
          </code>{" "}
          when you take over.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card title="Framework" value="Next.js 16 · App Router" />
        <Card title="Styling" value="Tailwind CSS v4" />
        <Card title="Language" value="TypeScript" />
        <Card title="Database" value="None — switch to the postgres skeleton if you need one" />
      </section>
    </main>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-zinc-200 p-3 dark:border-zinc-800">
      <p className="text-[10px] uppercase tracking-wider text-zinc-500">
        {title}
      </p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
