# Astro migration and maintenance guide

This branch is an experiment replacing Next.js and Contentlayer with Astro. It generates static HTML at build time using Astro content collections and the MDX integration. Existing post and page content remains in `content/`; public media remains in `public/`.

## What changed

- Astro's file-based routes in `src/pages/` generate the home page, paginated listings, posts, and content pages. Existing `/posts/<filename>`, `/page/<number>`, `/about`, and `/quotes` paths are retained. `/api/hello` is generated as a static text endpoint.
- `src/content.config.ts` defines and validates post and page frontmatter. The custom content ID retains the filename's case and nested path for existing URLs.
- `src/layouts/Layout.astro` owns the site shell and metadata; `src/styles/global.css` and Tailwind provide styling. Astro uses normal links and full page navigation by default.
- MDX can still use `FigureWithCaption`, `AudioPlayer`, and `SingaporeTime`. The audio player and clock use React islands and load JavaScript only where rendered. The footer's DOM-size indicator uses a small browser script.
- Content is rebuilt on deployment rather than using hourly incremental revalidation. An update to a post must be followed by a successful build and deployment.

## Work locally

Use Node.js 22.23.4 or newer, as required by the installed Astro release. Install dependencies with `npm ci`, then:

```sh
npm run dev       # local development server
npm run check     # type and Astro diagnostics
npm run build     # generate the static site in dist/
npm run preview   # serve the production build locally
```

## Publish and edit content

Create an `.mdx` file in `content/posts/` with `title` and `date` frontmatter; `description` is optional. The file name becomes the case-sensitive post URL after `/posts/`. Pages in `content/pages/` require `title`, accept `description`, and use the filename as the root URL. Keep filenames stable to avoid breaking existing links. The listing sorts by date and shows ten posts per page. `content/staging/` is excluded from both collections.

Use existing posts as examples for images, captions and audio. Static assets go in `public/` and are referenced from the site root. Keep image sizes small and check both light and dark modes. When adding interactive React components to MDX, configure an Astro wrapper with the appropriate `client:*` directive and pass it to the content renderer, or explicitly import and hydrate it in the MDX file. Test interaction in a browser.

## Deploy and maintain

Deploy `dist/` to a static host; set the build command to `npm run build` and the output directory to `dist`. Verify the hosting provider's redirects, trailing-slash handling, cache behavior and custom domain on a preview deployment. Changes to repository content appear only after deployment. This branch does not change the production deployment configuration.

The project `.npmrc` enables legacy peer dependency resolution; keep it with the lockfile so `npm ci` uses the same resolution. Use `npm ci` and commit `package-lock.json` changes when upgrading dependencies. Review Astro and integration upgrade guides and Node requirements before major upgrades, then run `npm run check` and `npm run build`. Check representative text, image and audio posts, the clock, pagination, metadata, existing URLs and missing-page behavior in a preview. The existing Bluesky workflow references `scripts/post-to-bluesky.js`, but the script is currently at the repository root. Correct and test that existing workflow separately before relying on it.

## Performance evaluation

This migration is a candidate for reducing JavaScript, not proof of a performance improvement. Compare the current production site and the preview under the same conditions: homepage, a text post, an image-heavy post, and pages with the clock and audio player. Record transferred HTML/CSS/JS/image bytes, mobile Lighthouse metrics, build time, and navigation behavior. The footer measures the current DOM's HTML size, not the full network transfer. Large images in `public/` may dominate page weight; optimize those separately.
