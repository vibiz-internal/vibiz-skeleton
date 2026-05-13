"use client";

import { useCallback, useState } from "react";

/**
 * `[copied, copy]` — `copied` flips to true for `resetMs` after a
 * successful write to the clipboard, then back to false. Useful for
 * "Copied!" confirmation UI.
 *
 *   const [copied, copy] = useCopyToClipboard();
 *   <button onClick={() => copy(text)}>{copied ? "Copied!" : "Copy"}</button>
 */
export function useCopyToClipboard(
  resetMs = 1500,
): [boolean, (value: string) => Promise<boolean>] {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (value: string) => {
      try {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), resetMs);
        return true;
      } catch {
        setCopied(false);
        return false;
      }
    },
    [resetMs],
  );

  return [copied, copy];
}
