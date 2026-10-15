// @ts-check
import { defineConfig } from 'astro/config';

// Deploying to a project page (github.com/<user>/<repo> -> user.github.io/<repo>)?
// Set BASE_PATH=/<repo> in the workflow and it will be picked up here.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  // configure-pages reports http:// while "Enforce HTTPS" is off, which put
  // http URLs in every canonical and the sitemap — duplicates of the https pages.
  site: (process.env.SITE_URL || 'https://aryakvn.github.io').replace(/^http:/, 'https:'),
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    routing: { prefixDefaultLocale: false },
  },
});
