# Nikita Glazkov portfolio

Astro portfolio for Nikita Glazkov, Senior / Lead Android Engineer.

The production site is prepared for [https://biggemott.github.io/](https://biggemott.github.io/).
Astro's `site` is configured for the root domain and uses no `base` path. Production
metadata includes an Open Graph image, SVG favicon, Apple touch icon, `robots.txt`,
and `sitemap.xml`. Playwright remains development-only tooling.

## Local setup

Requires Node.js 22.12 or newer and npm.

```bash
npm install
npm run dev
```

## Validation

```bash
npm run format
npm run format:check
npm run check
npm run build
```

## Visual review

Install Playwright-managed Chromium once, then use the review commands from the
repository root:

```bash
npm.cmd run visual:install
npm.cmd run visual:capture
npm.cmd run visual:test
```

`visual:capture` creates a compact set of real viewport screenshots in
`artifacts/visual-review/`; the generated files are ignored by Git. Full-page
captures are for structural review, while viewport captures preserve gutters for
detailed review. `visual:test` runs responsive smoke checks without creating or
updating snapshot baselines. Snapshot comparison and CI are not enabled yet.
