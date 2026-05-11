// Empty — shadows the parent vibiz-agents instrumentation.ts that Next's
// project-scan would otherwise reach via `../../instrumentation.ts`. The
// parent file references `@/lib/dispatcher/bootstrap` which resolves only
// inside vibiz-agents itself; this no-op keeps each scaffolded project
// hermetic.
export function register() {}
