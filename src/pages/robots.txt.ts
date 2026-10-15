import type { APIRoute } from 'astro';
import { href, DEFAULT_LOCALE } from '../i18n';

export const GET: APIRoute = ({ site }) =>
  new Response(`User-agent: *\nAllow: /\n\nSitemap: ${new URL(href(DEFAULT_LOCALE, 'sitemap.xml'), site)}\n`);
