"use client";

import { useEffect, useState } from "react";

/**
 * Returns `value` only after it has stayed unchanged for `delay` ms.
 * Use for search inputs, autosave, anything where you want to wait for
 * the user to stop typing before firing an effect.
 */
export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
