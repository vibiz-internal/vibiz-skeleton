"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * useState backed by `localStorage`, implemented with
 * `useSyncExternalStore` so SSR sees `initial`, the client hydrates to
 * the stored value, and there is no cascading-render warning. Writes
 * sync across tabs via the `storage` event AND across components in
 * the same tab via a manual `StorageEvent` dispatch.
 *
 *   const [theme, setTheme] = useLocalStorage("theme", "dark");
 */

// Per-key snapshot cache. Without this, `getSnapshot` would return a
// new object every render (because `JSON.parse` allocates) and
// `useSyncExternalStore` would treat every render as a change → infinite
// re-render. We cache by the raw localStorage string so a real change
// invalidates the cache automatically.
const cache = new Map<string, { raw: string | null; parsed: unknown }>();

function readSnapshot<T>(key: string, initial: T): T {
  if (typeof window === "undefined") return initial;
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(key);
  } catch {
    return initial;
  }
  const hit = cache.get(key);
  if (hit && hit.raw === raw) return hit.parsed as T;
  let parsed: T;
  try {
    parsed = raw === null ? initial : (JSON.parse(raw) as T);
  } catch {
    parsed = initial;
  }
  cache.set(key, { raw, parsed });
  return parsed;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const value = useSyncExternalStore<T>(
    subscribe,
    () => readSnapshot(key, initial),
    () => initial,
  );

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      try {
        const resolved =
          typeof next === "function" ? (next as (prev: T) => T)(value) : next;
        window.localStorage.setItem(key, JSON.stringify(resolved));
        // Bust the per-key cache so the next snapshot read picks up the
        // new value immediately (the `storage` event below doesn't
        // re-run our reader if cache says nothing changed).
        cache.delete(key);
        // Same-tab notification — the browser's `storage` event only
        // fires in OTHER tabs, not the originating one. Manually
        // dispatch so subscribers in this tab also re-render.
        window.dispatchEvent(new StorageEvent("storage", { key }));
      } catch {
        // ignore — storage disabled, quota, or non-serializable value
      }
    },
    [key, value],
  );

  return [value, set];
}
