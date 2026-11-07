// Build the static site.
//   js/*.js        src/*.jsx precompiled, so the browser no longer downloads Babel and
//                  compiles JSX on every visit
//   ar/index.html  the Arabic page: index.html with an Arabic head, the Arabic static
//                  block from src/static-ar.html and an Arabic FAQPage
//   npm run build        write the outputs
//   npm run build:check  fail if a committed output is out of date
// The transform is the one @babel/standalone applied to <script type="text/babel">
// (same version, presets and plugins), minus the inline source maps.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const Babel = require('@babel/standalone');
const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
// Load order matters: each file reads globals the earlier ones set on window.
export const ENTRIES = ['i18n', 'sections', 'logistics', 'app'];

const read = (file) => readFileSync(join(ROOT, file), 'utf8').replace(/\r\n/g, '\n');

function compile(name) {
  const filename = `src/${name}.jsx`;
  const { code } = Babel.transform(read(filename), {
    filename,
    presets: ['react', 'env'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
    targets: { browsers: undefined },
    compact: true,
    comments: false,
  });
  return `/* Generated from ${filename} by tools/build.mjs. Do not edit. */\n${code}\n`;
}

const AR = {
  title: 'Orchestra AI — أول وكيل عمليّاتٍ ذاتيّ للخدمات اللوجستية | JAS Agents',
  description: 'Orchestra AI من جاس هو أول وكيل عمليّاتٍ ذاتيّ للخدمات اللوجستية. يراقب كل طلبٍ نشط، ويعالج توقّف المركبات وانحرافها بالمكالمات وواتساب، ويجمع الأدلّة لكسب الغرامات المتنازع عليها — للتوصيل والطرود والوقود والإسمنت. عمّان، الأردن.',
  keywords: 'وكيل عمليات لوجستية, ذكاء اصطناعي للأساطيل, أتمتة إرسال التوصيل, غرامات الانتظار, لوجستيات الوقود, الخرسانة الجاهزة, الأردن, الشرق الأوسط',
  ogTitle: 'Orchestra AI — أول وكيل عمليّاتٍ ذاتيّ للخدمات اللوجستية',
  ogDescription: 'لا يكتفي بمراقبة أسطولك — بل يديره. يكتشف توقّف المركبة في أقل من دقيقتين، ويعالج الحوادث بالمكالمات وواتساب، ويسترد أكثر من ٧٠٪ من الرسوم المتنازع عليها بالأدلّة. توصيل، طرود، وقود، إسمنت.',
  twitterTitle: 'Orchestra AI — عمليّاتٌ ذاتيّة للخدمات اللوجستية',
  twitterDescription: 'الوكيل الذكي الذي يدير عمليات أسطولك على مدار الساعة — ويُثبت التأخير الذي لست سببه.',
};

// Swap `from` (string or regex) for `to` (string, or a replacer for regex groups), and fail
// loudly when index.html no longer has exactly one `from`.
function swap(html, from, to) {
  const n = typeof from === 'string' ? html.split(from).length - 1 : (html.match(new RegExp(from.source, 'g')) || []).length;
  if (n !== 1) throw new Error(`ar page: expected one match, found ${n}: ${String(from).slice(0, 70)}`);
  return html.replace(from, typeof to === 'function' ? to : () => to);
}

const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const plain = (s) => s.replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
const meta = (kind, key, value) => [new RegExp(`<meta ${kind}="${key}" content="[^"]*" />`), `<meta ${kind}="${key}" content="${attr(value)}" />`];

function arabicPage() {
  const en = read('index.html');
  const block = read('src/static-ar.html');
  const swaps = [
    ['<html lang="en" data-theme="dark">', '<html lang="ar" dir="rtl" data-theme="dark">'],
    [/<title>[^<]*<\/title>/, `<title>${AR.title}</title>`],
    meta('name', 'description', AR.description),
    meta('name', 'keywords', AR.keywords),
    ['<link rel="canonical" href="https://jas.it.com/" />', '<link rel="canonical" href="https://jas.it.com/ar/" />'],
    ['<meta property="og:url" content="https://jas.it.com/" />', '<meta property="og:url" content="https://jas.it.com/ar/" />'],
    meta('property', 'og:title', AR.ogTitle),
    meta('property', 'og:description', AR.ogDescription),
    meta('property', 'og:image:alt', AR.ogTitle),
    ['<meta property="og:locale" content="en_US" />\n<meta property="og:locale:alternate" content="ar_JO" />',
      '<meta property="og:locale" content="ar_JO" />\n<meta property="og:locale:alternate" content="en_US" />'],
    meta('name', 'twitter:title', AR.twitterTitle),
    meta('name', 'twitter:description', AR.twitterDescription),
    ['<a class="lang-toggle" id="lang-toggle" href="/ar/" hreflang="ar" lang="ar" title="العربية">ع</a>',
      '<a class="lang-toggle" id="lang-toggle" href="/" hreflang="en" lang="en" title="English">EN</a>'],
    [/( *<!-- STATIC:BEGIN[^\n]*\n)[\s\S]*?( *<!-- STATIC:END -->\n)/, (_, begin, end) => begin + block + end],
  ];
  let html = swaps.reduce((acc, [from, to]) => swap(acc, from, to), en);

  // FAQPage must match the page's own questions: take them from the Arabic block.
  const faq = [...block.matchAll(/<details[^>]*><summary><h3>([\s\S]*?)<\/h3><\/summary><p>([\s\S]*?)<\/p><\/details>/g)]
    .map(([, q, a]) => ({ '@type': 'Question', name: plain(q), acceptedAnswer: { '@type': 'Answer', text: plain(a) } }));
  if (faq.length === 0) throw new Error('ar page: no FAQ found in src/static-ar.html');
  const ld = /(<script type="application\/ld\+json">\n)([\s\S]*?)(\n<\/script>)/;
  const graph = JSON.parse(en.match(ld)[2]);
  const node = graph['@graph'].find((n) => n['@type'] === 'FAQPage');
  Object.assign(node, { '@id': 'https://jas.it.com/ar/#faq', inLanguage: 'ar', mainEntity: faq });
  return swap(html, ld, (_, open, _json, close) => open + JSON.stringify(graph, null, 1) + close);
}

const outputs = new Map(ENTRIES.map((name) => [`js/${name}.js`, compile(name)]));
outputs.set('ar/index.html', arabicPage());

if (process.argv.includes('--check')) {
  const stale = [...outputs].filter(([file, text]) => {
    try { return read(file) !== text; } catch { return true; }
  });
  if (stale.length) {
    console.error(`out of date: ${stale.map(([file]) => file).join(', ')} (run npm run build)`);
    process.exit(1);
  }
  console.log(`up to date: ${outputs.size} files`);
} else {
  for (const [file, text] of outputs) {
    mkdirSync(dirname(join(ROOT, file)), { recursive: true });
    writeFileSync(join(ROOT, file), text);
    console.log(`wrote ${file} (${text.length} chars)`);
  }
}
