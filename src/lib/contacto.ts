// Validación y formato del formulario de contacto (sin dependencias, testeable).

export const TIPOS = ['Visita al showroom', 'Sofás', 'Mobiliario', 'Interiorismo', 'Reformas', 'Otro'] as const;

export interface Consulta {
  nombre: string;
  telefono: string;
  email: string;
  tipo: string;
  referencia: string;
  mensaje: string;
  pagina: string;
  utm: string;
}

const LIM = { nombre: 100, telefono: 30, email: 150, referencia: 150, mensaje: 3000, pagina: 300, utm: 300 };

const limpiar = (v: unknown, max: number) =>
  typeof v === 'string' ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, '').trim().slice(0, max) : '';

export type Resultado = { ok: true; datos: Consulta } | { ok: false; error: string; spam?: boolean };

export function validar(body: Record<string, unknown>): Resultado {
  // Honeypot: los humanos no ven este campo
  if (limpiar(body.empresa, 200)) return { ok: false, error: 'spam', spam: true };

  const datos: Consulta = {
    nombre: limpiar(body.nombre, LIM.nombre),
    telefono: limpiar(body.telefono, LIM.telefono),
    email: limpiar(body.email, LIM.email),
    tipo: limpiar(body.tipo, 40),
    referencia: limpiar(body.referencia, LIM.referencia),
    mensaje: limpiar(body.mensaje, LIM.mensaje),
    pagina: limpiar(body.pagina, LIM.pagina),
    utm: limpiar(body.utm, LIM.utm),
  };

  if (datos.nombre.length < 2) return { ok: false, error: 'Indica tu nombre.' };
  if (datos.telefono.replace(/\D/g, '').length < 9) return { ok: false, error: 'Indica un teléfono válido.' };
  if (datos.email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.email)) return { ok: false, error: 'El email no es válido.' };
  if (body.privacidad !== true && body.privacidad !== 'on') return { ok: false, error: 'Debes aceptar la política de privacidad.' };
  if (!(TIPOS as readonly string[]).includes(datos.tipo)) datos.tipo = 'Otro';

  return { ok: true, datos };
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export function email(d: Consulta) {
  const asunto = `[Web UNIK] ${d.tipo}${d.referencia ? ` · ${d.referencia}` : ''} — ${d.nombre}`;
  const filas: [string, string][] = [
    ['Nombre', d.nombre],
    ['Teléfono', d.telefono],
    ['Email', d.email || '—'],
    ['Tipo de consulta', d.tipo],
    ['Referencia', d.referencia || '—'],
    ['Página', d.pagina || '—'],
    ['Campaña (UTM)', d.utm || '—'],
  ];
  const tel = d.telefono.replace(/[^\d+]/g, '');
  const wa = tel.replace(/^\+/, '').replace(/^(?!34)(\d{9})$/, '34$1');
  const html = `<div style="font-family:Arial,sans-serif;color:#101e2c;max-width:560px">
  <h2 style="margin:0 0 16px">Nueva consulta desde la web</h2>
  <table cellpadding="6" style="border-collapse:collapse;width:100%">
    ${filas.map(([k, v]) => `<tr><td style="color:#7a5638;width:150px;vertical-align:top">${k}</td><td>${esc(v)}</td></tr>`).join('')}
  </table>
  <h3 style="margin:24px 0 8px">Mensaje</h3>
  <p style="white-space:pre-wrap;background:#f5f1ea;padding:12px">${esc(d.mensaje || '(sin mensaje)')}</p>
  <p><a href="tel:${esc(tel)}">Llamar</a> · <a href="https://wa.me/${esc(wa)}">WhatsApp</a>${d.email ? ` · <a href="mailto:${esc(d.email)}">Responder por email</a>` : ''}</p>
</div>`;
  const text = [...filas.map(([k, v]) => `${k}: ${v}`), '', 'Mensaje:', d.mensaje || '(sin mensaje)'].join('\n');
  return { asunto, html, text };
}
