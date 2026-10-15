# UNIK — Web

Web de **UNIK Sofás** (San Sebastián de los Reyes, Madrid). Astro, estática, pensada para desplegar en Vercel.

- Plan y estrategia: [`PLAN.md`](PLAN.md)
- Especificaciones: [`docs/SPECS.md`](docs/SPECS.md)
- Pendientes / qué necesitamos: [`docs/PENDIENTES.md`](docs/PENDIENTES.md)
- Fotos de proveedores: [`content/proveedores/INVENTARIO.md`](content/proveedores/INVENTARIO.md)

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run preview  # sirve dist/
```

Requiere Node 22+.

## Dónde se cambia qué

| Qué | Archivo |
|---|---|
| Teléfono, dirección, horario, WhatsApp, marcas | `src/data/site.ts` |
| Catálogo (modelos, fotos, tipos, colecciones) | `src/data/productos.ts` |
| Colores y tipografías | `src/styles/global.css` |
| Textos de cada página | `src/pages/*.astro` |

## Añadir fotos de un proveedor

```bash
python3 scripts/optimizar-fotos.py <proveedor> <carpeta_original> content/proveedores
```
Redimensiona a 2400 px máx. y guarda JPG optimizado. Los originales se quedan en el Drive.
Nunca subir tarifas ni PDFs comerciales.
