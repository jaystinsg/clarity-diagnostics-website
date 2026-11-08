// Inject the server-rendered page into dist/index.html so the full text is in the HTML.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const ssrDir = path.join(root, 'dist-ssr');
const entry = fs.readdirSync(ssrDir).find((f) => /^entry-server\.(m?js)$/.test(f));
const { render } = await import(pathToFileURL(path.join(ssrDir, entry)).href);

const htmlPath = path.join(root, 'dist', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');
const out = html.replace('<div id="root"></div>', `<div id="root">${render()}</div>`);
if (out === html) throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
fs.writeFileSync(htmlPath, out);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log('prerender: wrote', path.relative(root, htmlPath));
