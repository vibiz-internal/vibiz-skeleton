---
version: alpha
name: Vibiz Skeleton Default
description: Neutral dark-mode-default starter brand built on shadcn/ui (new-york style, zinc base) over Tailwind v4. The defaults are intentionally quiet — replace tokens here when you brand the app for a real business. The CTO reads this file before composing UI and mirrors any change into app/globals.css.

colors:
  background: "oklch(0.145 0 0)"
  foreground: "oklch(0.985 0 0)"
  card: "oklch(0.205 0 0)"
  card-foreground: "oklch(0.985 0 0)"
  popover: "oklch(0.205 0 0)"
  popover-foreground: "oklch(0.985 0 0)"
  primary: "oklch(0.922 0 0)"
  primary-foreground: "oklch(0.205 0 0)"
  secondary: "oklch(0.269 0 0)"
  secondary-foreground: "oklch(0.985 0 0)"
  muted: "oklch(0.269 0 0)"
  muted-foreground: "oklch(0.708 0 0)"
  accent: "oklch(0.269 0 0)"
  accent-foreground: "oklch(0.985 0 0)"
  destructive: "oklch(0.704 0.191 22.216)"
  destructive-foreground: "oklch(0.985 0 0)"
  border: "oklch(1 0 0 / 10%)"
  input: "oklch(1 0 0 / 15%)"
  ring: "oklch(0.556 0 0)"

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
  toast:
    backgroundColor: "{colors.popover}"
    textColor: "{colors.popover-foreground}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    border: "1px solid {colors.border}"
    padding: 12px 16px
---

## Overview

The Vibiz skeleton ships a deliberately quiet, **dark-by-default** brand built on shadcn/ui (new-york style, zinc base) over Tailwind v4. The point of this default is to be **inoffensive and immediately replaceable** — a starting canvas, not a finished identity. When you brand the app for a real business, replace the tokens above and mirror the changes into `app/globals.css`.

**Key characteristics of the default:**
- Single accent: monochrome — `{colors.primary}` is near-white on dark, near-black on light. There is no second brand color until you add one.
- Quiet chrome: borders are 10% white, dialogs and cards use the same `card` surface, no decorative gradients or shadows.
- Compact rhythm: most controls are 36px tall (input, button-default). Cards live at `{rounded.xl}` (14px), buttons and inputs at `{rounded.md}` (8px).
- Editorial typography: Geist Sans + Geist Mono. Display sizes lean tight with negative letter-spacing; body copy at 14px / 1.5 for dashboard density.
- Dark mode is the default theme — `<html class="dark">` is set in `app/layout.tsx`. To switch a business to light-default, drop the class.

## How DESIGN.md and `app/globals.css` relate

This file is the **source of truth for the brand**. `app/globals.css` is the implementation. When they drift, this file wins; you bring `globals.css` back into line.

For tokens added or changed here, mirror them in `globals.css`:
- `colors:` → CSS variables under `.dark { ... }` (and `:root { ... }` if you support light mode)
- `rounded:` → the `--radius` chain in `@theme inline`
- `typography:` → `--font-sans`, `--font-mono`, and any new size scale you add as utility classes

shadcn primitives in `components/ui/` already consume these variables, so updating the tokens automatically re-themes every Button, Card, Input, Dialog, Sheet, etc.

## Colors

> The default palette is the canonical shadcn **zinc** scale in dark mode. Light-mode equivalents live in `app/globals.css` under `:root` and can be referenced as needed — they are not enumerated here because the skeleton ships dark-first.

### Surface
- **Background** (`{colors.background}` — oklch(0.145 0 0)): The page canvas. Near-black neutral.
- **Card / Popover** (`{colors.card}` / `{colors.popover}` — oklch(0.205 0 0)): A barely-lighter surface used for cards, dialogs, dropdowns, sheets, toasts. The minimal contrast keeps the hierarchy quiet.
- **Secondary / Muted / Accent** (`{colors.secondary}` / `{colors.muted}` / `{colors.accent}` — oklch(0.269 0 0)): All three resolve to the same value in the default palette (shadcn's choice). Used for subtle backgrounds — code blocks, hover states, secondary buttons.

### Text
- **Foreground** (`{colors.foreground}` — oklch(0.985 0 0)): Near-white. The voice of every paragraph and headline on dark.
- **Muted Foreground** (`{colors.muted-foreground}` — oklch(0.708 0 0)): Secondary copy. Footnotes, captions, "Skeleton ready" hints.

### Action
- **Primary** (`{colors.primary}` — oklch(0.922 0 0)): On dark, primary is near-white (inverted contrast). Buttons read as quiet, confident, monochrome. **This is intentional and on-brand for the default.** When a real business needs a brand accent, replace this token with their accent and the primary CTAs adopt it everywhere.
- **Destructive** (`{colors.destructive}` — oklch(0.704 0.191 22.216)): The one chromatic value — a warm red used only for danger / destructive actions.

### Borders
- **Border** (`{colors.border}` — oklch(1 0 0 / 10%)): Card edges, separators, input borders. White at 10% alpha so the line lives on top of the surface without claiming attention.
- **Input** (`{colors.input}` — oklch(1 0 0 / 15%)): A touch more present than `border` so inputs read as interactive.
- **Ring** (`{colors.ring}` — oklch(0.556 0 0)): Focus ring on keyboard-focused interactive elements.

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
| Flat | No shadow, no border | Page background, header, footer body |
| Hairline | 1px `{colors.border}` | Cards, dialog edges, input borders, separators |
| Soft shadow | `shadow-sm` (Tailwind) | Cards on the landing features grid (very subtle) |
| Popover shadow | `shadow-md` (Tailwind) | Dropdown menu, dialog overlay surfaces |
| Overlay | `bg-black/50` | Modal scrim — the only place pure black appears |

**Shadow philosophy.** Dark mode hides shadows. Elevation in the default brand comes from **surface contrast** (`background` → `card` → `popover` is a ladder of barely-lighter neutrals) and **borders**, not drop-shadows. Reserve `shadow-md` for popover-class elements (dropdowns, dialogs) where the float effect carries information.

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

- **`button-default`** — Primary action. `{component.button-default}` — 36px tall, `{rounded.md}`, `{colors.primary}` fill on `{colors.primary-foreground}` text. Used for the dominant CTA on each page.
- **`button-destructive`** — Danger action. Same shape; `{colors.destructive}` fill. Used for delete / irreversible operations.
- **`button-outline`** — Secondary action. Transparent fill, 1px `{colors.border}`, foreground text. Used as the second CTA when paired with `button-default`.
- **`button-ghost`** — Tertiary action. Transparent fill, no border, foreground text. Used for low-emphasis actions (header nav links, "Cancel" in dialogs).
- **`button-secondary`** — Compact action. `{colors.secondary}` fill, used inside cards or in tight UI where outline would feel busy.
- **`input`** — Text input. 36px tall, `{rounded.md}`, transparent on `{colors.input}` border. Always paired with a `Label` from `components/ui/label.tsx`.
- **`card`** — Container. `{colors.card}` fill, `{rounded.xl}`, 24px padding. Composed from `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`, `CardAction` in `components/ui/card.tsx`.
- **`badge-default` / `-secondary` / `-outline`** — Status pills. 12px caption-strong text at `{rounded.md}`. Used for status indicators ("New", "Beta", "Done").
- **`site-header`** — Sticky top chrome. 56px tall, `{colors.background}` with `backdrop-blur`, 1px bottom `{colors.border}`. Implementation in `components/site-header.tsx`.
- **`site-footer`** — Multi-column footer. `{colors.background}`, `{colors.muted-foreground}` text, 48px padding. Implementation in `components/site-footer.tsx`.
- **`dialog`** — Modal. `{colors.background}` fill, `{rounded.lg}`, 24px padding, centered with `bg-black/50` overlay. Implementation in `components/ui/dialog.tsx`.
- **`toast`** — Sonner toast. `{colors.popover}` fill, `{rounded.md}`. Mounted in `app/layout.tsx`; usage: `import { toast } from "sonner"`.

## Do's and Don'ts

### Do
- Replace tokens here when you brand the app — don't leave the monochrome default in a production business.
- Keep the change in BOTH places: this file AND `app/globals.css` (and re-import any new font in `app/layout.tsx`).
- Use shadcn primitives instead of raw `<button>` / `<input>` so the tokens flow through automatically.
- Add a real accent color in `{colors.primary}` when the brand has one — every interactive element picks it up.
- Use `{colors.destructive}` only for irreversible danger; not for "warning" or "incomplete" states.
- Lean on surface contrast (`background` → `card` → `popover`) for hierarchy before reaching for shadows.

### Don't
- Don't hardcode hex / oklch values in components — always reference a token (`bg-primary`, `text-muted-foreground`, etc.).
- Don't introduce a second brand accent without updating this file. Two accent colors with no documentation here means the brand drifted.
- Don't change `{colors.destructive}` to a different hue without explicit reason — red-orange is the established convention.
- Don't mix radii grammars — buttons/inputs stay at `{rounded.md}`, cards at `{rounded.xl}`, dialogs at `{rounded.lg}`. Going off-scale (e.g. button at `{rounded.lg}`) breaks the visual rhythm.
- Don't add drop-shadows to cards in dark mode — they don't carry information. Surface contrast + border is the elevation system.

## Iteration Guide

1. Focus on ONE token group at a time. Replace colors first (the brand accent), then typography (the brand font), then radii (the brand shape language). Components inherit; you almost never need to touch them.
2. Mirror every change here AND in `app/globals.css`. The CTO will not pick up a token-only change.
3. Never document `:hover` states explicitly — shadcn primitives ship sensible defaults derived from the base tokens.
4. If you need a token that doesn't exist (e.g. `{colors.warning}` for an amber state), ADD it to this file FIRST, then add the matching CSS variable in `globals.css` under `@theme inline`, then use it.
5. The font is the cheapest, highest-impact brand lever. A neutral shadcn theme on Inter looks like one brand; on Geist looks like another; on a serif (e.g. Fraunces) looks like a third. Try the font swap before fiddling with colors.

## Known Gaps

- Light-mode tokens exist in `globals.css` (`:root`) but are not enumerated in this file — the skeleton ships dark-first. If a business goes light-default, fold the `:root` values into a parallel `colors-light:` section.
- Chart colors are not yet tokenized (no `--chart-1 … --chart-5`). Add them when the first dashboard with charts ships.
- Hover / active states for shadcn primitives are derived in-component (e.g. `hover:bg-primary/90`) rather than documented here. Document them explicitly only if a brand needs to override the default opacity treatment.
- The default mono font is Geist Mono; a business that uses a specific code font (JetBrains Mono, Fira Code) should swap the `next/font` import and update `{typography.mono.fontFamily}` here.
