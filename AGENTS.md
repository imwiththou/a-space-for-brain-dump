# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single **Next.js 13 (App Router) + Contentlayer** static blog written in
TypeScript and styled with Tailwind. There is no backend, database, or auth — all content
lives as MDX files under `content/` (`content/posts`, `content/pages`, `content/staging`).

### Services

There is only one service: the Next.js app. Standard scripts live in `package.json`
(`dev`, `build`, `start`, `preview`, `lint`).

- Run dev server: `npm run dev` (serves on `http://localhost:3000`).
- Lint: `npm run lint`.
- Build: `npm run build` (also runs Contentlayer generation, then produces the static site).

### Non-obvious notes

- Use **npm**, not pnpm, for local dev. `package.json` declares `"packageManager": "pnpm@7.5.1"`,
  but the committed lockfile is `package-lock.json` (npm) and CI uses npm. Stick with npm to match the lockfile.
- Contentlayer 0.3.2 runs fine on the VM's Node v22 — build and dev both succeed despite the older CI (Node 20).
- Contentlayer runs automatically inside `next dev` / `next build` (via `withContentlayer` in
  `next.config.js`); there is no separate content-build command. Generated output goes to
  `.contentlayer/generated`.
- Authoring a post = add an MDX file to `content/posts/` with frontmatter `title`, `date`
  (required) and optional `description`. The dev server hot-reloads and the post appears at
  `/posts/<filename-without-extension>`.
- `.github/workflows/bluesky-post.yml` is CI-only automation (posts new entries to Bluesky) and
  is unrelated to running the app locally. Note it references `scripts/post-to-bluesky.js` while
  the script actually lives at the repo root (`post-to-bluesky.js`).
