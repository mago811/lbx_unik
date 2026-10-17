// Consentimiento de cookies + medición (GA4 y Meta Pixel).
// Nada de terceros se carga hasta que la persona lo acepta (criterio AEPD).
// Los IDs llegan por variables de entorno públicas: PUBLIC_GA4_ID y PUBLIC_META_PIXEL_ID.

export interface Consentimiento {
  analitica: boolean;
  marketing: boolean;
  fecha: string; // ISO
}

const CLAVE = 'unik-consentimiento';
const VIGENCIA_DIAS = 365;

type Ids = { ga4?: string; pixel?: string };
const w = window as any;
const ids = (): Ids => w.__UNIK_IDS ?? {};
export const hayMedicion = () => Boolean(ids().ga4 || ids().pixel);

export function leer(): Consentimiento | null {
  try {
    const c = JSON.parse(localStorage.getItem(CLAVE) || 'null') as Consentimiento | null;
    if (!c) return null;
    const dias = (Date.now() - new Date(c.fecha).getTime()) / 864e5;
    return dias > VIGENCIA_DIAS ? null : c;
  } catch {
    return null;
  }
}

export function guardar(nuevo: Omit<Consentimiento, 'fecha'>) {
  const previo = leer();
  const c = { ...nuevo, fecha: new Date().toISOString() };
  try {
    localStorage.setItem(CLAVE, JSON.stringify(c));
  } catch {
    /* modo privado: se pedirá de nuevo en la próxima visita */
  }
  // Si se retira un consentimiento ya dado, se borran sus cookies y se recarga sin los scripts
  const retira = previo && ((previo.analitica && !c.analitica) || (previo.marketing && !c.marketing));
  if (retira) {
    document.cookie.split(';').map((x) => x.split('=')[0].trim())
      .filter((n) => /^(_ga|_gid|_gat|_fbp|_fbc)/.test(n))
      .forEach((n) => {
        const dominio = location.hostname.replace(/^www\./, '');
        document.cookie = `${n}=; Max-Age=0; path=/`;
        document.cookie = `${n}=; Max-Age=0; path=/; domain=.${dominio}`;
      });
    location.reload();
    return;
  }
  aplicar(c);
}

let gaCargado = false;
let pixelCargado = false;

export function aplicar(c: Consentimiento) {
  const { ga4, pixel } = ids();
  if (c.analitica && ga4 && !gaCargado) {
    gaCargado = true;
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`;
    document.head.appendChild(s);
    w.dataLayer = w.dataLayer || [];
    w.gtag = function () { w.dataLayer.push(arguments); };
    w.gtag('js', new Date());
    w.gtag('config', ga4);
  }
  if (c.marketing && pixel && !pixelCargado) {
    pixelCargado = true;
    // Snippet oficial de Meta Pixel
    /* eslint-disable */
    (function (f: any, b: any, e: any, v: any) {
      if (f.fbq) return;
      const n: any = (f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); });
      if (!f._fbq) f._fbq = n;
      n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
      const t = b.createElement(e); t.async = true; t.src = v;
      const s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    w.fbq('init', pixel);
    w.fbq('track', 'PageView');
  }
}

// Eventos de conversión → dataLayer (siempre), GA4 y Meta (solo si hay consentimiento y están cargados)
const META: Record<string, string> = {
  clic_whatsapp: 'Contact',
  clic_telefono: 'Contact',
  envio_formulario: 'Lead',
  cta_reserva_visita: 'Schedule',
};

export function track(evento: string, datos: Record<string, unknown> = {}) {
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event: evento, ...datos });
  if (typeof w.gtag === 'function') w.gtag('event', evento, datos);
  if (typeof w.fbq === 'function' && META[evento]) w.fbq('track', META[evento], datos);
}
