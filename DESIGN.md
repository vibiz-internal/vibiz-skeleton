---
version: alpha
name: Vibiz Skeleton Default
description: Neutral light-mode-default starter brand built on shadcn/ui (new-york style, zinc base) over Tailwind v4. The defaults are intentionally quiet — replace tokens here when you brand the app for a real business. The CTO reads this file before composing UI and mirrors any change into app/globals.css.

colors:
  background: "oklch(1 0 0)"
  foreground: "oklch(0.145 0 0)"
  card: "oklch(1 0 0)"
  card-foreground: "oklch(0.145 0 0)"
  popover: "oklch(1 0 0)"
  popover-foreground: "oklch(0.145 0 0)"
  primary: "oklch(0.205 0 0)"
  primary-foreground: "oklch(0.985 0 0)"
  secondary: "oklch(0.97 0 0)"
  secondary-foreground: "oklch(0.205 0 0)"
  muted: "oklch(0.97 0 0)"
  muted-foreground: "oklch(0.556 0 0)"
  accent: "oklch(0.97 0 0)"
  accent-foreground: "oklch(0.205 0 0)"
  destructive: "oklch(0.577 0.245 27.325)"
  destructive-foreground: "oklch(0.985 0 0)"
  border: "oklch(0.922 0 0)"
  input: "oklch(0.922 0 0)"
  ring: "oklch(0.708 0 0)"

typography:
  display-xl:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 60px
    fontWeight: 600
    lineHeight: 1.0
    letterSpacing: -0.025em
  display-lg:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 36px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: -0.02em
  display-md:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 30px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.015em
  lead:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0
  body:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0
  body-strong:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: 0
  caption:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0
  caption-strong:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.05em
  eyebrow:
    fontFamily: "Geist, system-ui, -apple-system, sans-serif"
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: 0.2em
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0

rounded:
  none: 0px
  sm: 6px       # --radius-sm = calc(var(--radius) - 4px) = 6px
  md: 8px       # --radius-md = calc(var(--radius) - 2px) = 8px
  lg: 10px      # --radius-lg = var(--radius) = 0.625rem
  xl: 14px      # --radius-xl = calc(var(--radius) + 4px) = 14px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 80px

components:
  button-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 0 16px
  button-destructive:
    backgroundColor: "{colors.destructive}"
    textColor: "{colors.destructive-foreground}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 0 16px
  button-outline:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
    height: 36px
    padding: 0 16px
  button-ghost:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 0 16px
  button-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
    height: 36px
    padding: 0 16px
  input:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.input}"
    height: 36px
    padding: 0 12px
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.card-foreground}"
    rounded: "{rounded.xl}"
    border: "1px solid {colors.border}"
    padding: 24px
    shadow: "0 1px 2px rgba(0,0,0,0.04)"
  badge-default:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.primary-foreground}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-secondary:
    backgroundColor: "{colors.secondary}"
    textColor: "{colors.secondary-foreground}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.md}"
    padding: 2px 8px
  badge-outline:
    backgroundColor: transparent
    textColor: "{colors.foreground}"
    typography: "{typography.caption-strong}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
    padding: 2px 8px
  site-header:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    typography: "{typography.body}"
    height: 56px
    border-bottom: "1px solid {colors.border}"
  site-footer:
    backgroundColor: "{colors.background}"
    textColor: "{colors.muted-foreground}"
    typography: "{typography.caption}"
    border-top: "1px solid {colors.border}"
    padding: 48px
  dialog:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    border: "1px solid {colors.border}"
    padding: 24px
    shadow: "0 8px 24px rgba(0,0,0,0.08)"
  toast:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
    padding: 12px 16px
    shadow: "0 4px 12px rgba(0,0,0,0.08)"
---

## Overview

The Vibiz skeleton ships a deliberately quiet, **light-by-default** brand built on shadcn/ui (new-york style, zinc base) over Tailwind v4. The point of this default is to be **inoffensive and immediately replaceable** — a starting canvas, not a finished identity. When you brand the app for a real business, replace the tokens above and mirror the changes into `app/globals.css`.

**Key characteristics of the default:**
- Light page (`{colors.background}` = pure white) with near-black text (`{colors.foreground}`). Editorial, calm, dashboard-friendly.
- Single accent: monochrome — `{colors.primary}` is near-black so the primary CTA reads as "this is the one action that matters". There is no second brand color until you add one.
- Quiet chrome: borders are a soft light gray (`{colors.border}`), cards are pure white on a pure white page (lifted by border + tiny shadow), no decorative gradients.
- Compact rhythm: most controls are 36px tall (input, button-default). Cards live at `{rounded.xl}` (14px), buttons and inputs at `{rounded.md}` (8px).
- Editorial typography: Geist Sans + Geist Mono. Display sizes lean tight with negative letter-spacing; body copy at 14px / 1.5 for dashboard density.
- Light mode is the default theme — the root `<html>` carries no `class` attribute, so `:root` tokens apply. A dark-mode palette is also defined in `app/globals.css` under `.dark` for opt-in (add `class="dark"` to `<html>` or to a subtree). To make a real business dark-default, restore the `dark` class on `<html>` in `app/layout.tsx`.

## How DESIGN.md and `app/globals.css` relate

This file is the **source of truth for the brand**. `app/globals.css` is the implementation. When they drift, this file wins; you bring `globals.css` back into line.

For tokens added or changed here, mirror them in `globals.css`:
- `colors:` → CSS variables under `:root { ... }` for the default (light) theme. The dark counterpart lives under `.dark { ... }` — opt-in only.
- `rounded:` → the `--radius` chain in `@theme inline`
- `typography:` → `--font-sans`, `--font-mono`, and any new size scale you add as utility classes

shadcn primitives in `components/ui/` already consume these variables, so updating the tokens automatically re-themes every Button, Card, Input, Dialog, Sheet, etc.

## Colors

> The default palette is the canonical shadcn **zinc** scale in **light mode**. A parallel dark palette exists in `app/globals.css` under `.dark` but is opt-in. The skeleton ships light-first.

### Surface
- **Background** (`{colors.background}` — oklch(1 0 0)): Pure white page canvas.
- **Card / Popover** (`{colors.card}` / `{colors.popover}` — oklch(1 0 0)): Same as background in the light default — cards lift off the page via `{colors.border}` + a hairline shadow, not via a surface-color shift. This is intentional: light mode reads cleanly with border-driven separation; in dark mode the equivalent step uses a brighter surface instead.
- **Secondary / Muted / Accent** (`{colors.secondary}` / `{colors.muted}` / `{colors.accent}` — oklch(0.97 0 0)): All three resolve to the same very-light-gray in the default palette (shadcn's choice). Used for subtle backgrounds — secondary buttons, hover states, code blocks, muted info panels.

### Text
- **Foreground** (`{colors.foreground}` — oklch(0.145 0 0)): Near-black (not pure black). The voice of every paragraph and headline. Pure black would feel too harsh against the white canvas; near-black keeps the page editorial.
- **Muted Foreground** (`{colors.muted-foreground}` — oklch(0.556 0 0)): Mid-gray for secondary copy — footnotes, captions, disabled labels, "Skeleton ready" hints.

### Action
- **Primary** (`{colors.primary}` — oklch(0.205 0 0)): Near-black. On light backgrounds, primary is dark so the primary CTA reads as the dominant action. **This is intentional and on-brand for the default.** When a real business needs a brand accent, replace this token with their accent and every primary CTA adopts it.
- **Destructive** (`{colors.destructive}` — oklch(0.577 0.245 27.325)): The one chromatic value — a warm red used only for danger / destructive actions.

### Borders
- **Border** (`{colors.border}` — oklch(0.922 0 0)): Soft light gray. Card edges, separators, input borders. Carries hierarchy in light mode where surface contrast can't.
- **Input** (`{colors.input}` — oklch(0.922 0 0)): Same as border by default — inputs share the line weight of cards. Diverge if you want inputs to feel more present.
- **Ring** (`{colors.ring}` — oklch(0.708 0 0)): Focus ring on keyboard-focused interactive elements. Mid-gray so it's visible against white without screaming.

## Typography

### Font Family
- **Display / Body**: `Geist, system-ui, -apple-system, sans-serif` — loaded via `next/font/google` in `app/layout.tsx`. CSS variable `--font-geist-sans`.
- **Mono**: `Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace` — same import. CSS variable `--font-geist-mono`. Used for code, IDs, technical values in the UI.

Geist is Vercel's typeface and is the default Next.js skeleton font; we keep it for the default brand because it pairs naturally with the shadcn/ui aesthetic. Replace `Geist` with the brand's chosen sans-serif on `next/font` import to rebrand.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 60px | 600 | 1.0 | -0.025em | Marketing hero `<h1>` on the landing |
| `{typography.display-lg}` | 36px | 600 | 1.1 | -0.02em | Section headings, dashboard page titles |
| `{typography.display-md}` | 30px | 600 | 1.15 | -0.015em | Card titles in feature grids |
| `{typography.lead}` | 18px | 400 | 1.6 | 0 | Hero subcopy, intro paragraphs |
| `{typography.body}` | 14px | 400 | 1.5 | 0 | Default paragraph and UI text |
| `{typography.body-strong}` | 14px | 500 | 1.5 | 0 | Inline emphasis, button labels |
| `{typography.caption}` | 12px | 400 | 1.4 | 0 | Captions, helper text, dashboard labels |
| `{typography.caption-strong}` | 12px | 500 | 1.4 | 0.05em | Badge labels, table column headers |
| `{typography.eyebrow}` | 12px | 500 | 1.0 | 0.2em | Uppercase eyebrows above headlines |
| `{typography.mono}` | 13px | 400 | 1.5 | 0 | Code, IDs, technical strings |

### Principles
- **Negative tracking at display sizes only.** Headlines (≥30px) tighten by -0.015 → -0.025em. Body stays at 0.
- **Body at 14px, not 16px.** This is the shadcn dashboard convention — denser than typical marketing copy, which is what you want for tools. Marketing pages can step up to 16px or `{typography.lead}` (18px) where copy density matters less than reading rhythm.
- **Weight ladder is 400 / 500 / 600.** The default does not use 700 or 300. Step UP to 500 for emphasis, UP again to 600 for headlines. Step down to 400 for everything else.
- **Eyebrow tracking is wide.** `{typography.eyebrow}` is the only token using positive letter-spacing — `0.2em` for uppercase eyebrows over headlines.
- **Near-black, not pure black.** Body and display text use `{colors.foreground}` = oklch(0.145 0 0) — softer than `#000` so the page feels editorial rather than printed.

## Layout

### Spacing system
- **Base unit:** 4px. Tailwind v4 spacing scale (`gap-2` = 8px, `gap-4` = 16px, etc.) is the implementation.
- **Tokens:** `{spacing.xxs}` 4px · `{spacing.xs}` 8px · `{spacing.sm}` 12px · `{spacing.md}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Section vertical padding:** `{spacing.section}` (80px) between marketing sections; `{spacing.xxl}` (48px) for footer.
- **Card padding:** `{spacing.lg}` (24px) inside cards; tighter (`{spacing.md}` 16px) on dense dashboard cards.
- **Button padding:** 0 vertical, 16px horizontal at `{component.button-default}` height 36px.

### Grid & container
- **Max content width:** `max-w-6xl` (1152px) for the landing and dashboard chassis; `max-w-md` (448px) for auth forms.
- **Column patterns:** marketing features at `sm:grid-cols-2 lg:grid-cols-4`; dashboard stats at `sm:grid-cols-3`.
- **Gutters:** 16px (`gap-4`) between cards in a grid.

### Whitespace philosophy
Dense enough to feel like a tool, generous enough to feel modern. Marketing sections breathe (80px section padding); dashboard packs more (16–24px between cards). Never let two interactive surfaces share an edge without a 1px `{colors.border}` separator.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Page background, header (border-bottom only), footer body |
| Hairline | 1px `{colors.border}` | Cards, dialog edges, input borders, separators |
| Card shadow | `shadow-sm` (Tailwind ≈ `0 1px 2px rgba(0,0,0,0.04)`) | Cards lift gently off the white canvas |
| Popover shadow | `shadow-md` (≈ `0 4px 12px rgba(0,0,0,0.08)`) | Dropdown menu, toast, tooltip |
| Dialog shadow | `shadow-lg` (≈ `0 8px 24px rgba(0,0,0,0.08)`) | Modal cards above the scrim |
| Overlay | `bg-black/50` | Modal scrim — the only place pure black appears, behind dialogs |

**Shadow philosophy.** Light mode is where shadows carry information. The default brand uses **three tiers of shadow** (sm / md / lg) that align with the elevation a surface should feel at: a card is "barely lifted", a dropdown is "floating over content", a modal is "above the page". Reserve `shadow-lg` for true modal-class surfaces — overusing it flattens the hierarchy.

When the brand swaps to dark mode (opt-in via the `.dark` class), shadows largely disappear and elevation shifts to surface contrast (`background` → `card` → `popover` is a ladder of barely-lighter neutrals). Both layers are defined in `globals.css`.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Full-bleed sections, dividers |
| `{rounded.sm}` | 6px | Small inline chips, code spans |
| `{rounded.md}` | 8px | Buttons, inputs, toasts, dropdown menu items |
| `{rounded.lg}` | 10px | Dialogs, popovers |
| `{rounded.xl}` | 14px | Cards (the default Card primitive) |
| `{rounded.pill}` / `{rounded.full}` | 9999px | Avatars, badges that should read as tags, pill CTAs (rare) |

The default brand leans on `{rounded.md}` for almost every interactive control. Going higher (`{rounded.lg}`, `{rounded.xl}`) signals "container" — cards and dialogs. Going lower (`{rounded.sm}`, `{rounded.none}`) signals "structural" or "compact utility".

## Components

The shadcn primitives in `components/ui/` are the implementation of the tokens below. When a real business needs a different button shape, update the relevant component file AND this DESIGN.md.

- **`button-default`** — Primary action. `{component.button-default}` — 36px tall, `{rounded.md}`, `{colors.primary}` (near-black) fill on `{colors.primary-foreground}` (near-white) text. Used for the dominant CTA on each page.
- **`button-destructive`** — Danger action. Same shape; `{colors.destructive}` fill. Used for delete / irreversible operations.
- **`button-outline`** — Secondary action. Transparent fill, 1px `{colors.border}`, foreground text. Used as the second CTA when paired with `button-default`.
- **`button-ghost`** — Tertiary action. Transparent fill, no border, foreground text. Used for low-emphasis actions (header nav links, "Cancel" in dialogs).
- **`button-secondary`** — Compact action. `{colors.secondary}` (very-light-gray) fill, used inside cards or in tight UI where outline would feel busy.
- **`input`** — Text input. 36px tall, `{rounded.md}`, transparent on `{colors.input}` border. Always paired with a `Label` from `components/ui/label.tsx`.
- **`card`** — Container. `{colors.card}` (white) fill, `{rounded.xl}`, 24px padding, 1px `{colors.border}`, hairline `shadow-sm`. Composed from `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction` in `components/ui/card.tsx`.
- **`badge-default` / `-secondary` / `-outline`** — Status pills. 12px caption-strong text at `{rounded.md}`. Used for status indicators ("New", "Beta", "Done").
- **`site-header`** — Sticky top chrome. 56px tall, `{colors.background}` (white) with `backdrop-blur`, 1px bottom `{colors.border}`. Implementation in `components/site-header.tsx`.
- **`site-footer`** — Multi-column footer. `{colors.background}`, `{colors.muted-foreground}` text, 48px padding. Implementation in `components/site-footer.tsx`.
- **`dialog`** — Modal. `{colors.background}` fill, `{rounded.lg}`, 24px padding, `shadow-lg`, centered with `bg-black/50` overlay. Implementation in `components/ui/dialog.tsx`.
- **`toast`** — Sonner toast. `{colors.popover}` (white) fill, `{rounded.md}`, `shadow-md`. Mounted in `app/layout.tsx`; usage: `import { toast } from "sonner"`.

## Do's and Don'ts

### Do
- Replace tokens here when you brand the app — don't leave the monochrome default in a production business.
- Keep the change in BOTH places: this file AND `app/globals.css` (and re-import any new font in `app/layout.tsx`).
- Use shadcn primitives instead of raw `<button>` / `<input>` so the tokens flow through automatically.
- Add a real accent color in `{colors.primary}` when the brand has one — every interactive element picks it up.
- Use `{colors.destructive}` only for irreversible danger; not for "warning" or "incomplete" states.
- Use shadow tiers to communicate elevation hierarchy (card < popover < dialog). Don't flatten everything to `shadow-sm`.

### Don't
- Don't hardcode hex / oklch values in components — always reference a token (`bg-primary`, `text-muted-foreground`, etc.).
- Don't introduce a second brand accent without updating this file. Two accent colors with no documentation here means the brand drifted.
- Don't change `{colors.destructive}` to a different hue without explicit reason — red-orange is the established convention.
- Don't mix radii grammars — buttons/inputs stay at `{rounded.md}`, cards at `{rounded.xl}`, dialogs at `{rounded.lg}`. Going off-scale (e.g. button at `{rounded.lg}`) breaks the visual rhythm.
- Don't use `text-black` / `text-white` — use `{colors.foreground}` / `{colors.background}` semantic tokens so dark-mode opt-in works.
- Don't switch to dark mode silently. If a business should be dark-default, restore `class="dark"` on `<html>` in `app/layout.tsx` AND update this file's `description` + token enumeration to reflect that.

## Iteration Guide

1. Focus on ONE token group at a time. Replace colors first (the brand accent), then typography (the brand font), then radii (the brand shape language). Components inherit; you almost never need to touch them.
2. Mirror every change here AND in `app/globals.css`. The CTO will not pick up a token-only change.
3. Never document `:hover` states explicitly — shadcn primitives ship sensible defaults derived from the base tokens.
4. If you need a token that doesn't exist (e.g. `{colors.warning}` for an amber state), ADD it to this file FIRST, then add the matching CSS variable in `globals.css` under `@theme inline`, then use it.
5. The font is the cheapest, highest-impact brand lever. A neutral shadcn theme on Inter looks like one brand; on Geist looks like another; on a serif (e.g. Fraunces) looks like a third. Try the font swap before fiddling with colors.

## Known Gaps

- Dark-mode tokens exist in `globals.css` (`.dark`) but are not enumerated in this file — the skeleton ships light-first. If a business goes dark-default, fold the `.dark` values into a parallel `colors-dark:` section here.
- Chart colors are not yet tokenized (no `--chart-1 … --chart-5`). Add them when the first dashboard with charts ships.
- Hover / active states for shadcn primitives are derived in-component (e.g. `hover:bg-primary/90`) rather than documented here. Document them explicitly only if a brand needs to override the default opacity treatment.
- The default mono font is Geist Mono; a business that uses a specific code font (JetBrains Mono, Fira Code) should swap the `next/font` import and update `{typography.mono.fontFamily}` here.
