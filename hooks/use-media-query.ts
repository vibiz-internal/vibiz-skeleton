"use client";

import { useEffect, useState } from "react";

/**
 * Subscribe to a CSS media query. Returns false during SSR + first
 * client paint, then flips to the real value on mount — avoids
 * hydration mismatches.
 *
 *   const isDesktop = useMediaQuery("(min-width: 768px)");
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  return matches;
}
