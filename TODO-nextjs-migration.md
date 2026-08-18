# Migration TODO: Vite → Next.js

Plan for migrating this portfolio site from Vite + React (SPA) to Next.js.
Current stack: React 18, TypeScript, Vite 6, Tailwind CSS v4, shadcn/ui (Radix),
Framer Motion (`motion/react`). Single-page app — no real routing today despite
`react-router` being a listed dependency.

## 0. Decisions to make first

- [x] App Router vs Pages Router — **App Router** (`app/`), matches the
      existing `src/app/` folder name.
- [x] Single-page scrolling site — no new routes; migrate structure only.
- [x] Deployment target — **Vercel** (standard `next build`, no static export).
- [x] Unused dependencies dropped: `react-router`, `@mui/material`,
      `@mui/icons-material`, `@emotion/react`, `@emotion/styled`,
      `@popperjs/core`, `react-popper` — none were imported under `src/`.
- [x] React version — bumped to **React 19** (required by Next.js 16).
      `react-day-picker@8.10.1` only declares support up to React 18; added a
      package.json `overrides` entry (`"react-day-picker": { "react": "$react" }`)
      to unblock install. This is a stopgap, not a real fix — flagged in §4/§9
      as needing a proper look (v9 upgrade or replacement) since its internals
      aren't verified against React 19 yet.

## 1. Scaffold the Next.js app

- [x] Scaffolded a reference Next.js app (`create-next-app`, empty template,
      App Router, `src/` dir, Tailwind, ESLint, TS) in scratch space to diff
      config against — not committed, just used as a template source.
- [x] Matched config choices: App Router, `src/` dir, `@/*` import alias.
- [x] Added `next` (16.3.1), and promoted `react`/`react-dom` from
      `peerDependencies` to real `dependencies` at React 19.2.8 (removed the
      `peerDependencies`/`peerDependenciesMeta` block entirely).
- [x] Added `typescript`, `@types/node`, `@types/react`, `@types/react-dom`,
      `eslint`, `eslint-config-next` to `devDependencies` — this project had
      **no TypeScript type-checking at all** before (Vite/esbuild transformed
      `.tsx` without ever running `tsc`); worth running `tsc --noEmit` once
      files are moved over, to see what surfaces.
- [x] Clean `npm install` from scratch verified working — no ERESOLVE errors,
      `next`/`react`/`react-dom` resolve correctly, `npx tsc --version` and
      `npx next --version` both run.

## 2. Remove Vite-specific pieces

- [x] Deleted `vite.config.ts`
- [x] Deleted `index.html` (Next.js has no HTML entry point; `<head>` content
      moves to `app/layout.tsx` metadata, see §5 — **not done yet**, so the
      app currently has no way to render at all until §3 adds `app/layout.tsx`
      + `app/page.tsx`. Expected mid-migration state, not a bug.)
- [x] Removed `vite`, `@vitejs/plugin-react`, `@tailwindcss/vite` from
      `devDependencies`; `npm install` dropped 34 packages, 0 vulnerabilities
      remaining (the prior 3 were in the vite/esbuild chain).
- [x] Removed the `overrides.vite` entry (kept the `react-day-picker` one).
- [x] Updated `package.json` scripts:
      `dev` → `next dev`, `build` → `next build`, added `start` → `next start`,
      added `lint` → `next lint`.

## 3. Restructure files into Next.js conventions

- [ ] Decide: keep `src/app/...` as-is (Next supports a `src/` root) or flatten
      to `app/` at project root — either works, just be consistent.
- [ ] `src/main.tsx` → delete; Next.js doesn't use a manual `createRoot` entry.
- [ ] `src/app/App.tsx` → becomes `app/page.tsx` (the nav + section composition
      currently in `App.tsx` becomes the page body; consider moving the `<nav>`
      into `app/layout.tsx` if it should persist across future routes).
- [ ] `src/app/components/*.tsx` → move to `app/components/` or keep under
      `src/components/` per your choice in the step above; import paths will
      need updating either way.
- [ ] `src/styles/*.css` → move to `app/globals.css` (merge `fonts.css`,
      `tailwind.css`, `theme.css` imports, or keep as separate files imported
      from `globals.css` as they are now).

## 4. Client components

Next.js Server Components are the default — everything under `app/` is a
Server Component unless marked otherwise. This app is almost entirely
interactive (state, animation, Radix primitives), so:

- [ ] Add `'use client'` to the top of `App.tsx`/`page.tsx` (uses `useState`)
      and every component that uses hooks, `motion/react`, or Radix UI:
      `Hero`, `About`, `Contact`, `Experience`, `Impact`, `Projects`, `Skills`,
      and everything under `components/ui/*` (accordion, dialog, dropdown-menu,
      sheet, sidebar, tabs, tooltip, etc. — all Radix-based).
- [ ] Audit whether any purely presentational component (no hooks/handlers)
      can stay a Server Component to reduce client bundle size — likely few,
      given the animation-heavy design, but worth a pass after the initial
      port compiles.

## 5. Metadata / `<head>` content

`index.html`'s `<title>` and meta tags move into `app/layout.tsx`:

- [ ] Add `export const metadata: Metadata = { title: 'Personal Portfolio', ... }`
      to `app/layout.tsx`
- [ ] Add favicon/OG image/description now that Next.js makes this easy
      (`app/favicon.ico`, `app/opengraph-image.tsx` or static assets) —
      currently there's no favicon at all.
- [ ] Root `app/layout.tsx` must render `<html><body>{children}</body></html>`
      (replaces the `<div id="root">` mount point).

## 6. Tailwind CSS v4 setup

- [ ] Replace the `@tailwindcss/vite` plugin usage with the Next.js-compatible
      setup: `@tailwindcss/postcss` in `postcss.config.mjs` (currently that
      file is empty/commented since the Vite plugin handled everything).
- [ ] Verify `theme.css` custom properties and `tailwind.css` `@import`/`@theme`
      directives still resolve correctly under the PostCSS pipeline (Vite's
      plugin and the PostCSS plugin can differ slightly in v4).

## 7. Path aliases & config

- [ ] There's currently **no `tsconfig.json`** in the repo — Next.js scaffolding
      will generate one; make sure it includes the `@/*` → `./src/*` (or
      `./*`) path alias that `vite.config.ts` previously provided via
      `resolve.alias`.
- [ ] Re-implement or drop the custom `figma-asset-resolver` Vite plugin
      (resolves `figma:asset/*` imports to `src/assets/*`). No `figma:asset`
      imports currently exist under `src/`, and `src/assets/` doesn't exist
      yet either — confirm this is genuinely unused before dropping it; if
      Figma-exported assets get added later, they'll need to go through
      `public/` or standard Next.js image imports instead.
- [ ] Confirm `assetsInclude: ['**/*.svg', '**/*.csv']` (raw imports) has a
      Next.js equivalent if any component actually relies on raw
      SVG/CSV imports (audit before assuming — none currently obvious).

## 8. Routing

- [ ] `react-router` (v7) is a dependency but appears unused in `src/` — if
      no routing is actually needed, drop it entirely rather than porting it.
- [ ] If real routes are wanted later (e.g. `/projects/[slug]`), that's a
      separate follow-up using Next's file-based `app/` routing, not part of
      this migration.

## 9. Images

- [ ] `ImageWithFallback` (`src/app/components/figma/ImageWithFallback.tsx`)
      uses a plain `<img>` — works as-is under Next.js, but consider whether
      to migrate to `next/image` for automatic optimization once real image
      assets exist.

## 10. Verify

- [ ] `npm run dev` — confirm the app renders at `http://localhost:3000`
      with no hydration errors (check browser console — animation/hooks-heavy
      components are the most likely source of hydration mismatches).
- [ ] `npm run build && npm run start` — confirm a production build succeeds.
- [ ] `npm run lint` — run `next lint` and fix any new warnings.
- [ ] Manually click through all sections (`About`, `Projects`, `Experience`,
      `Contact`) and confirm Framer Motion animations and Radix components
      (dialogs, dropdowns, tooltips if used) still work client-side.

## 11. Cleanup

- [ ] Update `README.md` tech stack table and getting-started commands
      (`npm run dev` → Next.js dev server, mention port 3000 instead of 5173).
- [ ] Update `.gitignore` for Next.js output (`.next/`, `next-env.d.ts`) in
      place of/alongside the current Vite entries (`dist/`, `dist-ssr/`).
- [ ] Remove this file once the migration is complete.
