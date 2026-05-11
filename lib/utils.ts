/**
 * Tiny class-name merger. Filters falsy values and joins with spaces.
 * Drop-in for the `cn(...)` helper most Tailwind-based UIs use.
 *
 * Example:
 *   <div className={cn("p-2", isActive && "bg-zinc-900")} />
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
