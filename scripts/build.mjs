// Builds the static pages from src/page.html and src/strings.mjs:
//   index.html     English, served at https://mossyware.com/
//   zh/index.html  Simplified Chinese, served at https://mossyware.com/zh/
//   404.html       bilingual not-found page
//   sitemap.xml    homepage alternates, plus /orbit/ and /orbit/privacy/
// Usage: node scripts/build.mjs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import STRINGS from '../src/strings.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://mossyware.com/';
const EMAIL = 'marsli2000@outlook.com';
const FONTS = 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Geist:wght@400;500;600';

const PAGES = {
  en: { lang: 'en', path: '', root: '', fonts: `${FONTS}&display=swap` },
  zh: { lang: 'zh-Hans', path: 'zh/', root: '../', fonts: `${FONTS}&family=Noto+Serif+SC:wght@400;600&display=swap` }
};

// Every key must exist in both languages.
const missing = Object.keys(STRINGS.en).filter((k) => !(k in STRINGS.zh))
  .concat(Object.keys(STRINGS.zh).filter((k) => !(k in STRINGS.en)));
if (missing.length) throw new Error('Keys missing in one language: ' + missing.join(', '));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function structuredData(code) {
  const t = STRINGS[code];
  const url = SITE + PAGES[code].path;
  const org = SITE + '#org';
  const services = ['1', '2', '3', '4'].map((n) => ({
    '@type': 'Offer',
    itemOffered: { '@type': 'Service', name: t[`svc.${n}t`], description: t[`svc.${n}`], provider: { '@id': org } }
  }));
  const faq = ['1', '2', '3', '4', '5'].map((n) => ({
    '@type': 'Question',
    name: t[`faq.q${n}`],
    acceptedAnswer: { '@type': 'Answer', text: t[`faq.a${n}`] }
  }));
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': org,
        name: 'MossyWare',
        url: SITE,
        logo: SITE + 'brand/png/mark-color-512.png',
        image: SITE + 'brand/og-image.png',
        email: EMAIL,
        description: STRINGS.en['meta.desc'],
        areaServed: [{ '@type': 'Country', name: 'Australia' }, 'Worldwide'],
        knowsLanguage: ['en', 'zh'],
        sameAs: ['https://github.com/MarsOriginal/MossyWare'],
        hasOfferCatalog: { '@type': 'OfferCatalog', name: t['services.title'], itemListElement: services }
      },
      { '@type': 'WebSite', '@id': SITE + '#website', url: SITE, name: 'MossyWare', publisher: { '@id': org }, inLanguage: ['en', 'zh-Hans'] },
      { '@type': 'WebPage', '@id': url + '#page', url, name: t['meta.title'], description: t['meta.desc'], inLanguage: PAGES[code].lang, isPartOf: { '@id': SITE + '#website' }, about: { '@id': org } },
      { '@type': 'FAQPage', '@id': url + '#faq', inLanguage: PAGES[code].lang, mainEntity: faq }
    ]
  };
  // Keep "</script>" from ever closing the tag early.
  return JSON.stringify(graph, null, 2).replace(/</g, '\\u003c').replace(/^/gm, '    ');
}

function render(template, code, vars) {
  const t = STRINGS[code];
  return template.replace(/\{\{(@?[\w.]+)\}\}/g, (m, key) => {
    if (key[0] === '@') {
      const v = vars[key.slice(1)];
      if (v === undefined) throw new Error(`Unknown variable ${m}`);
      return v;
    }
    if (!(key in t)) throw new Error(`Unknown string ${m}`);
    return esc(t[key]);
  });
}

const template = readFileSync(join(ROOT, 'src/page.html'), 'utf8');
const year = String(new Date().getFullYear());

for (const code of ['en', 'zh']) {
  const page = PAGES[code];
  const other = code === 'en' ? 'zh' : 'en';
  const html = render(template, code, {
    lang: page.lang,
    root: page.root,
    site: SITE,
    url: SITE + page.path,
    enUrl: SITE,
    zhUrl: SITE + 'zh/',
    home: page.root || './',
    otherHref: other === 'zh' ? page.root + 'zh/' : page.root,
    otherLang: PAGES[other].lang,
    otherCode: other,
    code,
    mossH: code === 'zh' ? '716' : '756',
    fonts: esc(page.fonts),
    email: EMAIL,
    mailto: esc(`mailto:${EMAIL}?subject=${encodeURIComponent(STRINGS[code]['contact.subject'])}`),
    year,
    ld: structuredData(code)
  });
  const out = join(ROOT, page.path, 'index.html');
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  console.log('wrote', join(page.path, 'index.html'));
}

// 404: GitHub Pages serves it for any missing path, so links are absolute.
const nf = `<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${esc(STRINGS.en['404.title'])} | MossyWare</title>
  <meta name="robots" content="noindex" />
  <link rel="icon" href="/favicon.ico" sizes="32x32" />
  <link rel="icon" href="/brand/favicon.svg" type="image/svg+xml" />
  <style>
    body { margin: 0; min-height: 100vh; display: grid; place-items: center; background: #f4f3ee; color: #1a1a17; font: 16px/1.6 system-ui, sans-serif; padding: 24px; box-sizing: border-box; }
    main { max-width: 440px; }
    img { height: 28px; margin-bottom: 40px; }
    h1 { font-size: 28px; font-weight: 500; margin: 0 0 8px; }
    p { margin: 0 0 6px; color: #55574f; }
    a { color: #4a5d3a; }
    .zh { margin-top: 28px; }
  </style>
</head>
<body>
  <main>
    <img src="/brand/svg/horizontal-color.svg" alt="MossyWare" />
    <h1>${esc(STRINGS.en['404.title'])}</h1>
    <p>${esc(STRINGS.en['404.body'])}</p>
    <p><a href="/">${esc(STRINGS.en['404.home'])}</a></p>
    <div class="zh" lang="zh-Hans">
      <h1>${esc(STRINGS.zh['404.title'])}</h1>
      <p>${esc(STRINGS.zh['404.body'])}</p>
      <p><a href="/zh/">${esc(STRINGS.zh['404.home'])}</a></p>
    </div>
  </main>
</body>
</html>
`;
writeFileSync(join(ROOT, '404.html'), nf);
console.log('wrote 404.html');

const today = new Date().toISOString().slice(0, 10);
const alternates = `
    <xhtml:link rel="alternate" hreflang="en" href="${SITE}" />
    <xhtml:link rel="alternate" hreflang="zh-Hans" href="${SITE}zh/" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}" />`;
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>${SITE}</loc>
    <lastmod>${today}</lastmod>${alternates}
  </url>
  <url>
    <loc>${SITE}zh/</loc>
    <lastmod>${today}</lastmod>${alternates}
  </url>
  <url>
    <loc>${SITE}orbit/</loc>
    <lastmod>${today}</lastmod>
  </url>
  <url>
    <loc>${SITE}orbit/privacy/</loc>
    <lastmod>${today}</lastmod>
  </url>
</urlset>
`;
writeFileSync(join(ROOT, 'sitemap.xml'), sitemap);
console.log('wrote sitemap.xml');
