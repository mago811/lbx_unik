import type { APIRoute } from 'astro';
import { validar, email } from '../../lib/contacto';

// Función serverless (Vercel). El resto de la web es estática.
export const prerender = false;

const json = (status: number, body: object) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Petición no válida.' });
  }

  const r = validar(body);
  // Al spam le respondemos "ok" para no darle pistas
  if (!r.ok) return r.spam ? json(200, { ok: true }) : json(422, { ok: false, error: r.error });

  const key = import.meta.env.RESEND_API_KEY;
  const to = import.meta.env.CONTACT_TO;
  const from = import.meta.env.CONTACT_FROM || 'UNIK Web <onboarding@resend.dev>';
  if (!key || !to) {
    console.warn('[contacto] Falta RESEND_API_KEY o CONTACT_TO. Consulta no enviada:', r.datos);
    return json(503, { ok: false, error: 'El formulario aún no está activo. Escríbenos por WhatsApp o llámanos.' });
  }

  const { asunto, html, text } = email(r.datos);
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to: to.split(',').map((s: string) => s.trim()),
      reply_to: r.datos.email || undefined,
      subject: asunto,
      html,
      text,
    }),
  });

  if (!res.ok) {
    console.error('[contacto] Resend respondió', res.status, await res.text());
    return json(502, { ok: false, error: 'No hemos podido enviar tu consulta. Inténtalo de nuevo o escríbenos por WhatsApp.' });
  }
  return json(200, { ok: true });
};
