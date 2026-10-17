// Tras `astro build`: borra de la salida estática las imágenes originales (.jpg/.png)
// que ninguna página, CSS o JS referencia. El adaptador de Vercel las conserva por si
// hubiera optimización al vuelo, pero aquí todo se optimiza en el build.
import { readdirSync, readFileSync, statSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const raiz = '.vercel/output/static';
const assets = join(raiz, '_astro');
const textos = [];
(function recorrer(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) recorrer(p);
    else if (/\.(html|css|js|json|xml|webmanifest)$/.test(f)) textos.push(readFileSync(p, 'utf8'));
  }
})(raiz);
const todo = textos.join('\n');

let borrados = 0, bytes = 0;
for (const f of readdirSync(assets)) {
  if (!/\.(jpe?g|png)$/i.test(f) || todo.includes(f)) continue;
  const p = join(assets, f);
  bytes += statSync(p).size;
  unlinkSync(p);
  borrados++;
}
console.log(`[limpiar-build] ${borrados} originales sin usar eliminados (${(bytes / 1e6).toFixed(0)} MB)`);
