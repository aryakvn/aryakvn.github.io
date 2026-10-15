import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { DEFAULT_LOCALE, LOCALES, href, type Locale } from '../i18n';
import { productPath, productsPath, slugOf, translationsOf } from '../lib/products';

/**
 * Hand-rolled instead of @astrojs/sitemap: every URL needs hreflang siblings
 * that exist only for the languages a page was actually translated into.
 */
export const GET: APIRoute = async ({ site }) => {
  const abs = (p: string) => new URL(p, site).toString();
  type Page = { path: string; langs: Locale[]; lastmod?: Date };

  const all = await getCollection('products');
  const slugs = [...new Set(all.map(slugOf))];
  const pages: Page[] = [
    { path: '', langs: LOCALES },
    { path: productsPath, langs: LOCALES },
    ...(await Promise.all(
      slugs.map(async (slug) => {
        const dates = all.filter((p) => slugOf(p) === slug).map((p) => +(p.data.updated ?? p.data.published));
        return { path: productPath(slug), langs: await translationsOf(slug), lastmod: new Date(Math.max(...dates)) };
      }),
    )),
  ];

  const urls = pages.flatMap(({ path, langs, lastmod }) => {
    const alts = [
      ...langs.map((l) => `<xhtml:link rel="alternate" hreflang="${l}" href="${abs(href(l, path))}"/>`),
      langs.includes(DEFAULT_LOCALE)
        ? `<xhtml:link rel="alternate" hreflang="x-default" href="${abs(href(DEFAULT_LOCALE, path))}"/>`
        : '',
    ].join('');
    const mod = lastmod ? `<lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
    return langs.map((lang) => `<url><loc>${abs(href(lang, path))}</loc>${mod}${alts}</url>`);
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls.join('')}</urlset>`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml' } });
};
