import type { ImageMetadata } from 'astro';

// Todas las fotos optimizadas de proveedores (content/proveedores/**).
const todas = import.meta.glob<{ default: ImageMetadata }>(
  '/content/proveedores/**/*.jpg',
  { eager: true },
);
const rutas = Object.keys(todas).sort();

export type Tipo =
  | 'Rinconera'
  | 'Chaise longue'
  | 'Modular'
  | 'Relax'
  | 'Sofá cama'
  | 'Desenfundable'
  | 'Butaca'
  | 'Pufs y auxiliares';

export type Coleccion = 'sofas' | 'mobiliario' | 'salones' | 'dormitorios';

interface Def {
  slug: string;
  nombre: string;
  marca: 'bobbio' | 'afosxsofas';
  tipos: Tipo[];
  colecciones: Coleccion[];
  /** fragmentos de ruta que identifican las fotos del modelo */
  fotos: string[];
  /** fragmento de ruta de la foto de portada */
  portada: string;
  resumen: string;
  destacado?: boolean;
}

// Textos provisionales: describen solo lo que se ve en las fotos.
// Sustituir por la ficha técnica oficial del proveedor.
const defs: Def[] = [
  // ---------- Bobbio ----------
  { slug: 'adagio', nombre: 'Adagio', marca: 'bobbio', tipos: ['Chaise longue', 'Rinconera'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/adagio/'], portada: 'adagio-03-velvety', destacado: true,
    resumen: 'Líneas ligeras sobre patas finas y cojines de respaldo sueltos. Composiciones con chaise longue, rinconera y puf.' },
  { slug: 'beatrice', nombre: 'Beatrice', marca: 'bobbio', tipos: ['Rinconera', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/beatrice/'], portada: 'beatrice-01-brixton', destacado: true,
    resumen: 'Grandes composiciones en U o en L para salones amplios, con asiento profundo y puf a juego.' },
  { slug: 'claudia', nombre: 'Claudia', marca: 'bobbio', tipos: ['Relax', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/claudia/'], portada: 'claudia-02-drom', destacado: true,
    resumen: 'Respaldos con capitoné suave y versiones con mecanismo relax. Disponible en tela y en piel.' },
  { slug: 'cotton', nombre: 'Cotton', marca: 'bobbio', tipos: ['Desenfundable', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/cotton/'], portada: 'cotton-03-dual-arena', destacado: true,
    resumen: 'Estética informal de funda suelta y cojines generosos. Sofá, love chair y puf.' },
  { slug: 'mauro', nombre: 'Mauro', marca: 'bobbio', tipos: ['Modular', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/mauro/'], portada: 'mauro-03-isco', destacado: true,
    resumen: 'Módulos amplios y mullidos para montar el sofá a la medida del salón.' },
  { slug: 'elliot', nombre: 'Elliot', marca: 'bobbio', tipos: ['Relax', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/elliot/'], portada: 'elliot-02-alba', destacado: true,
    resumen: 'Brazo metálico ligero y respaldos regulables. Chaise longue y puf a juego.' },
  { slug: 'linnen', nombre: 'Linnen', marca: 'bobbio', tipos: ['Desenfundable', 'Rinconera'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/linnen/'], portada: 'linen-02-dual-arena',
    resumen: 'Sofá de aire natural con funda y cojines de plumón visual. Lineal, rinconera y puf.' },
  { slug: 'paula', nombre: 'Paula', marca: 'bobbio', tipos: ['Rinconera', 'Modular'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/paula/'], portada: 'paula-01-velvety',
    resumen: 'Composiciones envolventes con asiento muy profundo, pensadas para compartir.' },
  { slug: 'ashley', nombre: 'Ashley', marca: 'bobbio', tipos: ['Relax', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['bobbio/ashley/'], portada: 'ashley-01-credo',
    resumen: 'Cabezales reclinables y chaise longue. Puf con base metálica a juego.' },
  { slug: 'amy', nombre: 'Amy', marca: 'bobbio', tipos: ['Butaca'], colecciones: ['sofas', 'mobiliario', 'dormitorios'],
    fotos: ['bobbio/amy/'], portada: 'amy-fb-blanco-nadia',
    resumen: 'Butaca de respaldo alto con falda, de estética sencilla y ligera.' },
  { slug: 'beta', nombre: 'Beta', marca: 'bobbio', tipos: ['Butaca'], colecciones: ['sofas', 'mobiliario'],
    fotos: ['bobbio/beta/'], portada: 'beta-01-credo',
    resumen: 'Butaca envolvente de formas redondeadas.' },
  { slug: 'gamma', nombre: 'Gamma', marca: 'bobbio', tipos: ['Butaca'], colecciones: ['sofas', 'mobiliario'],
    fotos: ['bobbio/gamma/'], portada: 'gamma-01',
    resumen: 'Butaca de líneas curvas y patas de madera.' },
  { slug: 'ifni', nombre: 'Ifni', marca: 'bobbio', tipos: ['Butaca', 'Relax'], colecciones: ['sofas', 'mobiliario'],
    fotos: ['bobbio/ifni/'], portada: 'ifni-01',
    resumen: 'Butaca relax con base giratoria.' },
  { slug: 'kent', nombre: 'Kent', marca: 'bobbio', tipos: ['Butaca', 'Relax'], colecciones: ['sofas', 'mobiliario'],
    fotos: ['bobbio/kent/'], portada: 'kent-fb-espesorada',
    resumen: 'Butaca relax de base circular.' },
  { slug: 'kira', nombre: 'Kira', marca: 'bobbio', tipos: ['Butaca', 'Relax'], colecciones: ['sofas', 'mobiliario'],
    fotos: ['bobbio/kira/'], portada: 'kira-01',
    resumen: 'Butaca de orejas con base de estrella.' },

  // ---------- Afosxsofas ----------
  { slug: 'veronica', nombre: 'Verónica', marca: 'afosxsofas', tipos: ['Modular', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['fotos-veronica-nuevas/'], portada: 'afosxsofa-oct-010-ambiente', destacado: true,
    resumen: 'Módulos con respaldos móviles para combinar colores y formas.' },
  { slug: 'bruselas', nombre: 'Bruselas', marca: 'afosxsofas', tipos: ['Chaise longue', 'Butaca'], colecciones: ['sofas', 'salones'],
    fotos: ['fotos-bruselass/'], portada: 'afosxsofa-nov-009',
    resumen: 'Sofá de líneas rectas con chaise longue y butaca a juego.' },
  { slug: 'berlin', nombre: 'Berlín', marca: 'afosxsofas', tipos: ['Rinconera', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['berlin-carro/'], portada: 'afosxsofa-oct-032',
    resumen: 'Sofá de asiento deslizante y respaldos reclinables.' },
  { slug: 'times', nombre: 'Times', marca: 'afosxsofas', tipos: ['Modular', 'Rinconera'], colecciones: ['sofas', 'salones'],
    fotos: ['fotos-times-nuevas/', 'novedades-afosxsofa/times'], portada: 'afosxsofa-oct-001',
    resumen: 'Gran sofá modular de cojines mullidos, en composiciones lineales o en U.' },
  { slug: 'antares', nombre: 'Antares', marca: 'afosxsofas', tipos: ['Relax', 'Chaise longue', 'Rinconera'], colecciones: ['sofas', 'salones'],
    fotos: ['fotos-antares-nuevas/', 'novedades-afosxsofa/antares'], portada: 'antares-rincon',
    resumen: 'Cabezales regulables y versiones relax. Lineal, chaise longue y rinconera.' },
  { slug: 'dove', nombre: 'Dove', marca: 'afosxsofas', tipos: ['Chaise longue', 'Rinconera'], colecciones: ['sofas', 'salones'],
    fotos: ['foto-dove-nueva/', 'novedades-afosxsofa/dove'], portada: 'dove-rincon',
    resumen: 'Sofá de patas metálicas finas, con chaise longue, rinconera y banqueta.' },
  { slug: 'siesta', nombre: 'Siesta', marca: 'afosxsofas', tipos: ['Chaise longue', 'Rinconera'], colecciones: ['sofas', 'salones'],
    fotos: ['novedades-afosxsofa/siesta'], portada: 'siesta-rincon',
    resumen: 'Sofá de brazo fino y asiento amplio. Lineal, chaise longue y rinconera.' },
  { slug: 'siena', nombre: 'Siena', marca: 'afosxsofas', tipos: ['Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['novedades-afosxsofa/siena'], portada: 'siena-sofas',
    resumen: 'Sofá de líneas sencillas para salones contemporáneos.' },
  { slug: 'sintra', nombre: 'Sintra', marca: 'afosxsofas', tipos: ['Relax', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['fotos-modelo-sintra/'], portada: 'af-4176-alta',
    resumen: 'Cabezales abatibles y patas de madera. Sofá, chaise longue y butaca.' },
  { slug: 'viena', nombre: 'Viena', marca: 'afosxsofas', tipos: ['Relax', 'Chaise longue'], colecciones: ['sofas', 'salones'],
    fotos: ['relax-viena/'], portada: 'afosxsofa-nov-018',
    resumen: 'Sofá relax con asientos motorizados y chaise longue.' },
  { slug: 'sofia', nombre: 'Sofía', marca: 'afosxsofas', tipos: ['Sofá cama'], colecciones: ['sofas', 'dormitorios'],
    fotos: ['sofas-cama-27-04-23/cama-sofia', 'sofas-cama-27-04-23/detalle-sofia', 'sofas-cama-27-04-23/sofia-abierto'], portada: 'cama-sofia',
    resumen: 'Sofá cama de apertura italiana para el día a día.' },
  { slug: 'logan', nombre: 'Logan', marca: 'afosxsofas', tipos: ['Sofá cama'], colecciones: ['sofas', 'dormitorios'],
    fotos: ['sofas-cama-27-04-23/sofa-logan', 'sofas-cama-27-04-23/logan-abierto'], portada: 'sofa-logan.jpg',
    resumen: 'Sofá cama compacto con patas metálicas.' },
  { slug: 'salma', nombre: 'Salma', marca: 'afosxsofas', tipos: ['Sofá cama'], colecciones: ['sofas', 'dormitorios'],
    fotos: ['sofas-cama-27-04-23/sofa-cama-salma', 'sofas-cama-27-04-23/sofa-salma'], portada: 'sofa-cama-salma',
    resumen: 'Sofá cama de brazos finos y líneas suaves.' },
  { slug: 'selfi', nombre: 'Selfi', marca: 'afosxsofas', tipos: ['Sofá cama'], colecciones: ['sofas', 'dormitorios'],
    fotos: ['sofas-cama-27-04-23/sofa-selfi', 'sofas-cama-27-04-23/selfi-abierto'], portada: 'sofa-selfi',
    resumen: 'Sofá cama para salón o habitación de invitados.' },
  { slug: 'ibiza', nombre: 'Ibiza', marca: 'afosxsofas', tipos: ['Butaca'], colecciones: ['sofas', 'mobiliario'],
    fotos: ['butaca-ibiza/'], portada: 'ibiza-1',
    resumen: 'Butaca y sofá de dos plazas de aire retro, en múltiples colores.' },
  { slug: 'x-delta', nombre: 'X-Delta', marca: 'afosxsofas', tipos: ['Butaca', 'Relax'], colecciones: ['sofas', 'mobiliario', 'dormitorios'],
    fotos: ['novedades-afosxsofa/x-delta'], portada: 'x-delta.jpg',
    resumen: 'Butaca relax con reposapiés.' },
  { slug: 'x-vega', nombre: 'X-Vega', marca: 'afosxsofas', tipos: ['Butaca'], colecciones: ['sofas', 'mobiliario', 'dormitorios'],
    fotos: ['novedades-afosxsofa/x-vega'], portada: 'x-vega',
    resumen: 'Butaca de orejas con puf a juego.' },
  { slug: 'x-hojas', nombre: 'Pufs Hojas', marca: 'afosxsofas', tipos: ['Pufs y auxiliares'], colecciones: ['mobiliario', 'salones'],
    fotos: ['novedades-afosxsofa/x-hojas'], portada: 'x-hojas',
    resumen: 'Pufs tapizados en varios tamaños y colores.' },
  { slug: 'x-mesas', nombre: 'Mesas auxiliares', marca: 'afosxsofas', tipos: ['Pufs y auxiliares'], colecciones: ['mobiliario', 'salones'],
    fotos: ['novedades-afosxsofa/x-mesas'], portada: 'x-mesas',
    resumen: 'Mesa auxiliar de estructura metálica y sobre de madera.' },
];

export interface Producto extends Omit<Def, 'fotos' | 'portada'> {
  fotos: ImageMetadata[];
  portada: ImageMetadata;
}

export const productos: Producto[] = defs.map((d) => {
  const propias = rutas.filter((r) => r.includes(`/${d.marca}/`) && d.fotos.some((f) => r.includes(f)));
  if (!propias.length) throw new Error(`Sin fotos para ${d.slug}`);
  const portadaRuta = propias.find((r) => r.includes(d.portada)) ?? propias[0];
  const ordenadas = [portadaRuta, ...propias.filter((r) => r !== portadaRuta)];
  return { ...d, fotos: ordenadas.map((r) => todas[r].default), portada: todas[portadaRuta].default };
});

export const porColeccion = (c: Coleccion) => productos.filter((p) => p.colecciones.includes(c));
export const porMarca = (m: string) => productos.filter((p) => p.marca === m);
export const destacados = productos.filter((p) => p.destacado);
export const tiposDe = (lista: Producto[]) => [...new Set(lista.flatMap((p) => p.tipos))];

/** Foto concreta por fragmento de ruta (para heros y bloques editoriales). */
export const foto = (fragmento: string): ImageMetadata => {
  const r = rutas.find((x) => x.includes(fragmento));
  if (!r) throw new Error(`Foto no encontrada: ${fragmento}`);
  return todas[r].default;
};
