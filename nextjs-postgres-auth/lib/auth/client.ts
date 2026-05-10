"use client";

// Client-side Neon Auth handle.
//
// Use in Client Components for interactive flows (e.g. social sign-in,
// session subscriptions). Server actions / route handlers should import
// from `lib/auth/server` instead.
import { createAuthClient } from "@neondatabase/auth/next";

export const authClient = createAuthClient();
