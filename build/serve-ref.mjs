import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'source');
const TYPES = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.jpg':'image/jpeg', '.png':'image/png' };
http.createServer(async (req,res)=>{
  let p = decodeURIComponent(new URL(req.url,'http://x').pathname);
  if (p === '/') p = '/Cinta Foundation Website v2.dc.html';
  const f = path.join(ROOT, p);
  try {
    const s = await stat(f); if (s.isDirectory()) throw 0;
    res.writeHead(200,{'Content-Type':TYPES[path.extname(f)]||'application/octet-stream'});
    res.end(await readFile(f));
  } catch { res.writeHead(404); res.end('404'); }
}).listen(4322, ()=>console.log('reference on http://localhost:4322'));
