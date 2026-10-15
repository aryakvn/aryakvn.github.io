import { getCollection, type CollectionEntry } from 'astro:content';
import { LOCALES, href, type Locale } from '../i18n';

export type Product = CollectionEntry<'products'>;

/** Entries live at products/<lang>/<slug>.md; the slug is shared across languages. */
export const slugOf = (p: Product) => p.id.split('/').pop()!;

/**
 * Strictly the requested language — no English fallback like `forLocale`.
 * A fallback would publish English copy under /fa/ and read as duplicate
 * content; a missing translation should simply have no page there.
 */
export async function getProducts(lang: Locale): Promise<Product[]> {
  const all = await getCollection('products');
  return all.filter((p) => p.id.startsWith(`${lang}/`)).sort((a, b) => a.data.order - b.data.order);
}

/** Which languages have a page for this slug — drives hreflang and the sitemap. */
export async function translationsOf(slug: string): Promise<Locale[]> {
  const all = await getCollection('products');
  return LOCALES.filter((l) => all.some((p) => p.id === `${l}/${slug}`));
}

// Trailing slash on purpose: GitHub Pages 301s the bare form, and canonicals
// and sitemap entries must not point at a redirect.
export const productsPath = 'products/';
export const productPath = (slug: string) => `products/${slug}/`;
export const productHref = (lang: Locale, slug: string) => href(lang, productPath(slug));
