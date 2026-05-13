"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * useState backed by `localStorage`. Initial value comes from storage
 * on mount (so SSR sees `initial`, then hydrates to the stored value
 * — no mismatch since this hook is "use client" only). Writes sync
 * across tabs via the `storage` event.
 *
 *   const [theme, setTheme] = useLocalStorage("theme", "dark");
 */
export function useLocalStorage<T>(
  key: string,
  initial: T,
): [T, (value: T | ((prev: T) => T)) => void] {
  const [value, setValue] = useState<T>(initial);

  // Hydrate from storage after mount.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) setValue(JSON.parse(raw) as T);
    } catch {
      // ignore — storage disabled, quota, or malformed JSON
    }
  }, [key]);

  // Listen for changes from other tabs.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key) return;
      try {
        setValue(e.newValue === null ? initial : (JSON.parse(e.newValue) as T));
      } catch {
        // ignore
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initial]);

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved =
          typeof next === "function" ? (next as (p: T) => T)(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // ignore
        }
        return resolved;
      });
    },
    [key],
  );

  return [value, set];
}
