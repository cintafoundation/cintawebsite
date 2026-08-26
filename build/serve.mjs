// Local preview only — mimics how Netlify/Vercel/Pages serve dist/.
// Not part of the deployed site.
import http from 'node:http';
import { gzipSync } from 'node:zlib';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORT = Number(process.env.PORT || 4321);
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp'
};

http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  let file = path.join(ROOT, p);
  try {
    const s = await stat(file).catch(() => null);
    if (!s || s.isDirectory()) file = path.join(file, 'index.html');
    let body = await readFile(file);
    const type = TYPES[path.extname(file)] || 'application/octet-stream';
    const headers = { 'Content-Type': type };
    // Every named static host gzips text by default; mirror that so local
    // measurements reflect production.
    if (/text|javascript|xml|json/.test(type) && /\bgzip\b/.test(req.headers['accept-encoding'] || '')) {
      body = gzipSync(body);
      headers['Content-Encoding'] = 'gzip';
    }
    if (/^\/(assets)\//.test(p)) headers['Cache-Control'] = 'public, max-age=31536000, immutable';
    else if (/^\/(css|js)\//.test(p)) headers['Cache-Control'] = 'public, max-age=604800';
    res.writeHead(200, headers);
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404');
  }
}).listen(PORT, () => console.log(`dist/ on http://localhost:${PORT}`));
