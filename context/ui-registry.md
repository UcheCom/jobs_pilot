# UI Registry

Living document. Updated after every component is built. Read this before building any new component — match existing patterns exactly before inventing new ones.

---

## How to Use

Before building any component:

1. Check if a similar component already exists here
2. If yes — match its exact classes
3. If no — build it following ui-rules.md and ui-tokens.md, then add it here

After building any component — update this file with the component name, file path, and exact classes used.

---

## Components

_Empty. Components will be added here as they are built._

## Foundations

### Global Tailwind Theme

- Path: `app/globals.css`
- Purpose: Defines the JobPilot Tailwind v4 design tokens with `@theme`.
- Generated utility examples: `bg-background`, `bg-surface`, `text-text-primary`, `text-accent`, `border-border`, `rounded-md`.
- Base styles: `body` uses `var(--color-background)`, `var(--color-text-primary)`, and `var(--font-sans)`.
