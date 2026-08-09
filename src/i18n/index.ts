import en from './en.json';
import fa from './fa.json';

/**
 * Adding a language:
 *   1. copy en.json -> <code>.json and translate it
 *   2. import it below and add it to `dicts` + `LOCALES`
 *   3. add the code to `i18n.locales` in astro.config.mjs
 *   4. create src/pages/<code>/index.astro (4 lines, copy an existing one)
 * Right-to-left scripts only need the code added to `RTL`.
 */
const dicts = { en, fa: fa as unknown as typeof en };

export const LOCALES = Object.keys(dicts) as Locale[];
export type Locale = keyof typeof dicts;
export type Dict = typeof en;

export const DEFAULT_LOCALE: Locale = 'en';
export const RTL_LOCALES: Locale[] = ['fa'];

export const t = (lang: Locale): Dict => dicts[lang] ?? dicts[DEFAULT_LOCALE];

export const dir = (lang: Locale) => (RTL_LOCALES.includes(lang) ? 'rtl' : 'ltr');

/** Locale-aware, base-path-aware URL. `href('fa')` -> `/fa/`. */
export function href(lang: Locale, path = ''): string {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  const prefix = lang === DEFAULT_LOCALE ? '' : `/${lang}`;
  const rest = path.replace(/^\/+/, '');
  return `${base}${prefix}/${rest}`.replace(/([^:])\/{2,}/g, '$1/');
}

/** Entries live in <collection>/<lang>/<slug>.md, falling back to the default locale. */
export function forLocale<T extends { id: string }>(entries: T[], lang: Locale): T[] {
  const inLang = entries.filter((e) => e.id.startsWith(`${lang}/`));
  return inLang.length ? inLang : entries.filter((e) => e.id.startsWith(`${DEFAULT_LOCALE}/`));
}
