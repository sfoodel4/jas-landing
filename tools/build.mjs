// Build the static site: precompile src/*.jsx to js/*.js so the browser no longer
// downloads Babel and compiles JSX on every visit.
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

function compile(name) {
  const filename = `src/${name}.jsx`;
  const source = readFileSync(join(ROOT, filename), 'utf8');
  const { code } = Babel.transform(source, {
    filename,
    presets: ['react', 'env'],
    plugins: ['transform-class-properties', 'transform-object-rest-spread', 'transform-flow-strip-types'],
    targets: { browsers: undefined },
    compact: true,
    comments: false,
  });
  return `/* Generated from ${filename} by tools/build.mjs. Do not edit. */\n${code}\n`;
}

const outputs = new Map(ENTRIES.map((name) => [`js/${name}.js`, compile(name)]));

if (process.argv.includes('--check')) {
  const stale = [...outputs].filter(([file, text]) => {
    try { return readFileSync(join(ROOT, file), 'utf8').replace(/\r\n/g, '\n') !== text; } catch { return true; }
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
    console.log(`wrote ${file} (${text.length} bytes)`);
  }
}
