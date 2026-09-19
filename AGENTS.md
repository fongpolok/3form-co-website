# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and hydrates (or mounts) `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/routes.ts` - URL table and per-page SEO metadata; **add a page here first**
- `src/entry-server.tsx` - SSR entry used by the prerender build stage
- `src/structuredData.ts` - JSON-LD emitted into each prerendered page
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `scripts/prerender/` - Build stage that writes one static HTML file per route
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm
- `SEO.md` - How routing and the static prerender work, and how to verify them

## Routing and the build

Pages are **real paths** (`/services/`, `/tc/contact/`), not URL hashes, and
`pnpm build` prerenders each one to a static HTML file so crawlers get a real
title, description, H1 and body. `pnpm build` is three logged stages:
`build:client` → `build:ssr` → `build:prerender`.

Anything rendered during the initial render must be SSR-safe: no `window`,
`document` or `navigator` outside `useEffect`. Internal links should use the
`RouteLink` component in `src/App.tsx` (a real `<a href>`) rather than a
`<button onClick>`, or crawlers cannot follow them. See `SEO.md`.

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
