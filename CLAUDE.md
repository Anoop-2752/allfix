# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # start dev server (Vite HMR)
npm run build    # production build
npm run lint     # ESLint
npm run preview  # preview production build locally
```

No test runner is configured yet.

## Stack

- **React 19 + Vite 7** — JSX, no TypeScript
- **Tailwind CSS v4** — configured via `@tailwindcss/vite` plugin in `vite.config.js`. No `tailwind.config.js` needed. CSS entry is `src/index.css` with `@import "tailwindcss"`.
- **React Router v7** — `BrowserRouter` in `App.jsx`, nested routes under `<Layout />`
- **Lucide React** — icons are referenced by string name in data; resolved at runtime via `src/lib/icons.js`

## Architecture

### Routing (`src/App.jsx`)
Three routes, all nested under `<Layout>` (which renders `<Navbar>` + `<Outlet>`):
- `/` → `HomePage`
- `/:category` → `CategoryPage`
- `/:category/:tool` → `ToolPage`

### Data layer (`src/data/tools.js`)
Single source of truth. Exports:
- `categories` — array of category objects, each with a `tools` array
- `allTools` — flat array of all tools
- `getCategoryBySlug(slug)` — lookup helper
- `getToolBySlug(categorySlug, toolSlug)` — lookup helper

Category objects have: `id`, `name`, `slug`, `description`, `icon` (string, Lucide name), `color` (`'blue'` | `'purple'`), `tools[]`

Tool objects have: `id`, `name`, `slug`, `description`, `icon` (string, Lucide name), `category` (slug string)

### Icon system (`src/lib/icons.js`)
All Lucide icons used in the app are imported here by name (not `import *`) to keep the bundle small. Exports individual icons plus `getIcon(name)` — a resolver that maps icon name strings to components. **When adding new icons, register them here.**

### Tool components (`src/tools/`)
One component per tool, organized by category:
- `src/tools/developer/` — 6 tools (JsonFormatter, Base64, JwtDecoder, UuidGenerator, TimestampConverter, UrlEncoder)
- `src/tools/text/` — 6 tools (WordCounter, LoremIpsum, MarkdownPreviewer, CaseConverter, DiffChecker, FillerWordRemover)

Tools are purely client-side — no backend, no API calls.

## Design Tokens

| Token | Value |
|---|---|
| Page background | `#0f0f0f` |
| Card background | `#1a1a1a` |
| Borders | `#2a2a2a` |
| Subtle borders | `#1e1e1e` |
| Accent (indigo) | `#6366f1` / Tailwind `indigo-500` |
| Muted text | Tailwind `zinc-400` / `zinc-500` |

Category color theming (`blue` or `purple`) is handled via `colorMap` objects in card components — all Tailwind classes are written out statically (not constructed dynamically) so Tailwind's scanner picks them up.
