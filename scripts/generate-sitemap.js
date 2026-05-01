#!/usr/bin/env node
/**
 * Generate sitemap.xml and robots.txt from the HTML files at the repo root.
 * Run with:  node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = (process.env.SITE_URL || 'https://aryakvn.ir').replace(/\/$/, '');
const ROOT = path.resolve(__dirname, '..');

// Per-page priority + change frequency
const PAGES = {
  'index.html':    { priority: '1.0', changefreq: 'monthly' },
  'resume.html':   { priority: '0.9', changefreq: 'monthly' },
  'projects.html': { priority: '0.9', changefreq: 'monthly' },
  'blog.html':     { priority: '0.8', changefreq: 'weekly'  },
  'contact.html':  { priority: '0.7', changefreq: 'yearly'  },
};

const isoDate = (d) => new Date(d).toISOString().split('T')[0];

const htmlFiles = fs
  .readdirSync(ROOT)
  .filter((f) => f.endsWith('.html'));

const urls = htmlFiles
  .sort()
  .map((file) => {
    const stat = fs.statSync(path.join(ROOT, file));
    const meta = PAGES[file] || { priority: '0.5', changefreq: 'monthly' };
    const loc =
      file === 'index.html'
        ? `${SITE_URL}/`
        : `${SITE_URL}/${file}`;
    return {
      loc,
      lastmod: isoDate(stat.mtime),
      changefreq: meta.changefreq,
      priority: meta.priority,
    };
  });

const sitemap =
  `<?xml version="1.0" encoding="UTF-8"?>\n` +
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls
    .map(
      (u) =>
        `  <url>\n` +
        `    <loc>${u.loc}</loc>\n` +
        `    <lastmod>${u.lastmod}</lastmod>\n` +
        `    <changefreq>${u.changefreq}</changefreq>\n` +
        `    <priority>${u.priority}</priority>\n` +
        `  </url>`
    )
    .join('\n') +
  `\n</urlset>\n`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap);

const robots =
  `User-agent: *\n` +
  `Allow: /\n` +
  `\n` +
  `Sitemap: ${SITE_URL}/sitemap.xml\n`;

fs.writeFileSync(path.join(ROOT, 'robots.txt'), robots);

console.log(`✓ Wrote sitemap.xml with ${urls.length} URL(s)`);
console.log(`✓ Wrote robots.txt`);
console.log(`  base: ${SITE_URL}`);
urls.forEach((u) => console.log(`  - ${u.loc}  (${u.lastmod})`));
