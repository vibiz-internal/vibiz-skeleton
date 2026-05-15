// ⚠️  VIBIZ-MANAGED — DO NOT MODIFY THIS FILE.
//
// Stripe redirects buyers here after a successful checkout. We
// exchange the session_id for an entitlement via the Vibiz runtime,
// then render a confirmation. The customer app is free to add UI
// around this (header / footer / branded layout) but the claim call
// + outcome handling MUST stay — without them, the buyer's
// entitlement is granted server-side but the customer-facing UI
// has no way to confirm + show what was unlocked.
//
// Customer apps with Neon Auth should pass the logged-in user id
// via an `externalUserId` field — the entitlement gets linked to
// that user so future feature gates can lookup by user id directly.

import Link from "next/link";

import { claimEntitlement } from "@/lib/entitlements";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{
    session_id?: string;
  }>;
};

export default async function PaymentSuccessPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const sessionId = sp.session_id;

  if (!sessionId) {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold">Pagina senza contesto</h1>
        <p className="text-muted-foreground">
          Manca il riferimento alla sessione di pagamento. Se hai appena
          completato un acquisto, controlla la tua email per la ricevuta.
        </p>
        <Link href="/" className="underline">Torna alla home</Link>
      </main>
    );
  }

  const outcome = await claimEntitlement(sessionId);

  if (outcome.kind === "success" || outcome.kind === "already_redeemed") {
    const ent = outcome.entitlement;
    const offer = outcome.offer;
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-6 px-6 py-12 text-center">
        <div className="rounded-full bg-emerald-500/10 p-4 text-emerald-600">
          <CheckIcon className="h-12 w-12" />
        </div>
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Pagamento confermato
          </h1>
          <p className="mt-2 text-muted-foreground">
            Grazie {ent.buyerEmail}. {offer?.title
              ? `Hai sbloccato: ${offer.title}.`
              : "Il tuo acquisto è stato registrato."}
          </p>
        </div>
        {offer?.description ? (
          <p className="max-w-md text-sm text-muted-foreground">
            {offer.description}
          </p>
        ) : null}
        <div className="flex gap-3">
          <Link
            href="/"
            className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-accent"
          >
            Torna alla home
          </Link>
        </div>
        <p className="mt-4 text-xs text-muted-foreground">
          Hai ricevuto una ricevuta sulla tua email.
        </p>
      </main>
    );
  }

  if (outcome.kind === "timeout") {
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 py-12 text-center">
        <h1 className="text-2xl font-semibold">Stiamo confermando il pagamento</h1>
        <p className="text-muted-foreground">
          Il pagamento è stato preso in carico ma serve qualche secondo per
          finalizzare. Aggiorna la pagina tra poco.
        </p>
        <Link
          href={`/payment-success?session_id=${encodeURIComponent(sessionId)}`}
          className="rounded-lg border border-border px-4 py-2 text-sm"
        >
          Riprova
        </Link>
      </main>
    );
  }

  // no_entitlement | error
  return (
    <main className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center gap-4 px-6 py-12 text-center">
      <h1 className="text-2xl font-semibold">
        Pagamento ricevuto, conferma non disponibile
      </h1>
      <p className="text-sm text-muted-foreground">
        Il pagamento è andato a buon fine ma non siamo riusciti a confermare
        i dettagli automaticamente. Ti arriverà comunque la ricevuta via email.
      </p>
      <Link href="/" className="underline">Torna alla home</Link>
    </main>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
