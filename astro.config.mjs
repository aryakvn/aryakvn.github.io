// @ts-check
import { defineConfig } from 'astro/config';

// Deploying to a project page (github.com/<user>/<repo> -> user.github.io/<repo>)?
// Set BASE_PATH=/<repo> in the workflow and it will be picked up here.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://aryakvn.github.io',
  base,
  trailingSlash: 'ignore',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fa'],
    routing: { prefixDefaultLocale: false },
  },
});
