"""Regenera content/proveedores/INVENTARIO.md a partir de las fotos optimizadas.
uso: python3 scripts/inventario.py
"""
import os, collections

BASE = os.path.join(os.path.dirname(__file__), '..', 'content', 'proveedores')
NOTAS = {
    'afosxsofas': 'Del ZIP de WeTransfer. Se excluyó la tarifa PVP de sofás cama.',
    'bobbio': 'Incluye Sira y Zenit (nuevos). Los TIF en alta y la subcarpeta `pedroortiz20260904` del Drive repiten estos modelos y no se subieron. Se excluyó `loomled` (duplicados).',
    'guardia': 'Solo 2 fotos. El catálogo Loft Neo y la tarifa vienen en PDF y no se suben.',
    'modesto-navarro': 'Sillas, sin nombres de modelo (solo número).',
    'oslo': 'Mesas y composiciones.',
    'pedro-ortiz': '22 modelos. Se excluyeron PDF, DOCX y vídeo. Algunas fotos son de WhatsApp (baja calidad).',
    'rodri-diseno': 'La mayoría de fotos están sueltas en la raíz con numeración del proveedor. Se excluyó la carpeta `tarifaprov` (tarifa) y los PDF.',
}

L = ['# Inventario de fotos de proveedores', '',
     'Fotos optimizadas para web (JPG, máx. 2400 px, calidad 80) generadas con `scripts/optimizar-fotos.py`.',
     'Los originales en alta resolución siguen en el Drive del cliente. **Nunca se suben tarifas, PDFs comerciales ni listas de precios.**', '',
     '⚠️ Uso pendiente de autorización de cada proveedor (ver `docs/PENDIENTES.md`).', '',
     '| Proveedor | Fotos | Peso | Carpetas / modelos | Notas |', '|---|---|---|---|---|']
total = 0
for p in sorted(d for d in os.listdir(BASE) if os.path.isdir(os.path.join(BASE, d))):
    n = size = 0
    subs = collections.Counter()
    for root, _, fs in os.walk(os.path.join(BASE, p)):
        for f in fs:
            if f.endswith('.jpg'):
                n += 1
                size += os.path.getsize(os.path.join(root, f))
                rel = os.path.relpath(root, os.path.join(BASE, p))
                subs[rel.split(os.sep)[0] if rel != '.' else '(raíz)'] += 1
    total += n
    mods = ', '.join(f'{k} ({v})' for k, v in sorted(subs.items()))
    L.append(f'| {p} | {n} | {size / 1e6:.0f} MB | {mods} | {NOTAS.get(p, "")} |')
L += ['', f'**Total: {total} fotos.**', '']
open(os.path.join(BASE, 'INVENTARIO.md'), 'w').write('\n'.join(L))
print(f'{total} fotos')
