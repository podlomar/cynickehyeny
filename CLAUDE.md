# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cynické Hyeny** is a Czech-language publication website with two main components:

- **`/website`** — Next.js 13 frontend that fetches content from a Directus headless CMS
- **`/newsletter`** — A Directus custom endpoint extension for managing and sending newsletters via MailerSend

## Commands

### Website (`/website`)
```bash
npm run dev      # Start Next.js dev server (port 3000)
npm run build    # Production build
npm start        # Start production server
npm run lint     # Run ESLint
```

Requires a `.env.local` file (see `.env.local.sample`):
```
BACKOFFICE_URL=https://backoffice.cynickehyeny.cz
```

### Newsletter (`/newsletter`)
```bash
npm run dev       # Watch mode build (no minification)
npm run build     # Full build: clean dist → gulp (CSS inline) → build extension
npm run build-js  # Only build Directus extension via directus-extension CLI
```

## Architecture

### Website

The website is a standard Next.js app with file-based routing. All content is fetched from a **Directus CMS** instance via the `api-client/` module (axios-based).

Key data flow:
1. Pages call functions from `api-client/index.ts` (posts, authors, subscribers)
2. API client hits `BACKOFFICE_URL` (Directus REST API)
3. Pages render with SSR/SSG using `getStaticProps`/`getServerSideProps`
4. Subscription form POSTs to `/api/subscribe` (Next.js API route), which writes to Directus

Theme (light/dark) is managed via React context in `lib/theme.ts` and persisted with cookies.

Markdown is parsed with `markdown-it` plus the `markdown-it-directive` plugin that adds `::sup[]` and `::sub[]` custom directives.

Styling uses SCSS (`styles.scss`) with CSS custom properties for light/dark theming. The layout is CSS Grid (3 rows: header, main, footer).

### Newsletter

This is a **Directus custom endpoint** (`type: "endpoint"` in package.json). It runs server-side within the Directus host.

Build pipeline:
1. **Gulp** copies template files and inlines CSS (for email client compatibility)
2. **directus-extension CLI** bundles `src/index.js` into `dist/`

Key modules:
- `src/db.js` — Queries Directus database for newsletters, posts, and subscribers
- `src/send.js` — Sends bulk email via MailerSend API
- `src/email.js` — Renders individual email HTML
- `src/render.js` — Nunjucks template renderer
- `src/templates/` — Nunjucks email templates (CSS gets inlined during build)

The newsletter flow: select posts from Directus → render HTML with Nunjucks → inline CSS → send bulk via MailerSend.
