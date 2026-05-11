import { createFetch } from "@sapiom/fetch";

// Single client memoized per process. Vibiz injects `SAPIOM_API_KEY`
// (transaction-scoped, per-app $5/30d budget) and `SAPIOM_AGENT_NAME`
// at preview start and on Vercel deploy — read them once.
//
// Endpoint conventions vary: openrouter (LLMs) uses `/v1/...`, fal
// (images) uses bare `/run/...`. Always copy from sapiom docs / Vibiz
// CTO prompt examples.

let cached: ReturnType<typeof createFetch> | null = null;

export function getAiFetch(): ReturnType<typeof createFetch> {
  if (cached) return cached;
  const apiKey = process.env.SAPIOM_API_KEY;
  const agentName = process.env.SAPIOM_AGENT_NAME;
  if (!apiKey || !agentName) {
    throw new Error(
      "AI gateway not configured. SAPIOM_API_KEY / SAPIOM_AGENT_NAME are " +
        "missing from .env.local — Vibiz writes them on first preview start.",
    );
  }
  cached = createFetch({ apiKey, agentName, serviceName: process.env.npm_package_name });
  return cached;
}

export async function gatewayError(response: Response): Promise<string> {
  const text = await response.text().catch(() => "");
  return `Sapiom ${response.status}: ${text.slice(0, 240)}`;
}
