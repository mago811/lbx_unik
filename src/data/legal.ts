// Textos legales — BORRADOR. Revisar con un asesor antes de publicar.
// Lo marcado con pend() son datos que faltan: se ven resaltados en la web mientras site.pendiente = true.
import { site } from './site';

const pend = (t: string) => `<mark>[PENDIENTE: ${t}]</mark>`;
const D = site.direccion;
const domicilio = `${D.calle}, ${D.cp} ${D.ciudad} (${D.provincia}) ${pend('confirmar CP y nave')}`;
const titular = `<strong>${site.razonSocial}</strong>`;
const email = `${site.email} ${pend('confirmar email')}`;

export interface Seccion { h: string; p: string[] }
export interface TextoLegal { titulo: string; actualizado: string; intro: string; secciones: Seccion[] }

export const legal: Record<'aviso-legal' | 'privacidad' | 'cookies', TextoLegal> = {
  'aviso-legal': {
    titulo: 'Aviso legal',
    actualizado: pend('fecha de publicación'),
    intro: 'En cumplimiento del artículo 10 de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los datos del titular de este sitio web.',
    secciones: [
      {
        h: 'Titular del sitio web',
        p: [
          `Denominación social: ${titular}. Nombre comercial: UNIK Sofás.`,
          `NIF: ${pend('CIF de la sociedad')}.`,
          `Domicilio: ${domicilio}.`,
          `Teléfono: ${site.telefono}. Correo electrónico: ${email}.`,
          `Datos registrales: inscrita en el Registro Mercantil de Madrid, ${pend('tomo, folio, hoja y sección')}.`,
        ],
      },
      {
        h: 'Objeto',
        p: [
          'Este sitio web tiene por objeto dar a conocer el showroom de UNIK en San Sebastián de los Reyes, los productos de mobiliario que comercializa y sus servicios de asesoramiento, interiorismo y reformas, así como facilitar el contacto con la empresa.',
          'La información sobre productos es orientativa. Las fotografías, medidas, acabados y disponibilidad pueden variar y deben confirmarse en el showroom. Este sitio no permite realizar compras en línea.',
        ],
      },
      {
        h: 'Condiciones de uso',
        p: [
          'El acceso a este sitio es gratuito e implica la aceptación de estas condiciones. La persona usuaria se compromete a hacer un uso adecuado de los contenidos y a no emplearlos para actividades ilícitas o contrarias a la buena fe.',
        ],
      },
      {
        h: 'Propiedad intelectual e industrial',
        p: [
          `Los textos, el diseño, el logotipo y la marca UNIK son titularidad de ${site.razonSocial} o se usan con autorización. Las fotografías de producto pertenecen a sus respectivos fabricantes (Bobbio, Pedro Ortiz, Afosxsofas, Rodri Diseño, Oslo, Modesto Navarro) y se reproducen con su autorización ${pend('confirmar autorizaciones de los proveedores')}.`,
          'Queda prohibida su reproducción, distribución o transformación sin autorización expresa de sus titulares.',
        ],
      },
      {
        h: 'Responsabilidad',
        p: [
          `${site.razonSocial} no se hace responsable de los daños derivados de interrupciones del servicio, virus o fallos técnicos ajenos a su control, ni del contenido de los sitios web de terceros a los que se pueda acceder mediante enlaces.`,
        ],
      },
      {
        h: 'Legislación aplicable',
        p: [
          'Estas condiciones se rigen por la legislación española. Para cualquier controversia, las partes se someten a los juzgados y tribunales que correspondan conforme a la normativa de consumidores y usuarios.',
        ],
      },
    ],
  },

  privacidad: {
    titulo: 'Política de privacidad',
    actualizado: pend('fecha de publicación'),
    intro: 'Esta política explica cómo tratamos los datos personales que nos facilitas a través de esta web, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley Orgánica 3/2018 (LOPDGDD).',
    secciones: [
      {
        h: 'Responsable del tratamiento',
        p: [`${titular}, NIF ${pend('CIF')}, con domicilio en ${domicilio}. Contacto para privacidad: ${email}.`],
      },
      {
        h: 'Qué datos tratamos y para qué',
        p: [
          '<strong>Formulario de contacto y reserva de visita:</strong> nombre, teléfono, email (opcional), tipo de consulta, referencia del producto y el mensaje que escribas. Los usamos para responder a tu consulta, organizar tu visita al showroom y, en su caso, preparar un presupuesto.',
          '<strong>WhatsApp y teléfono:</strong> si nos contactas por estas vías, trataremos tu número y la conversación para atenderte.',
          '<strong>Analítica y marketing:</strong> solo si lo aceptas en el aviso de cookies, datos de navegación para medir visitas (Google Analytics) y la eficacia de nuestros anuncios (Meta). Ver la <a href="/legal/cookies">política de cookies</a>.',
        ],
      },
      {
        h: 'Base jurídica',
        p: [
          'Atender tu consulta o solicitud de visita: aplicación de medidas precontractuales a petición tuya (art. 6.1.b RGPD) y tu consentimiento al enviar el formulario (art. 6.1.a).',
          'Cookies de analítica y marketing: tu consentimiento (art. 6.1.a RGPD y art. 22.2 LSSI-CE), que puedes retirar en cualquier momento desde «Configurar cookies» en el pie de la web.',
        ],
      },
      {
        h: 'Cuánto tiempo conservamos los datos',
        p: [
          `Los datos de las consultas se conservan mientras sea necesario para atenderlas y, después, durante ${pend('plazo, p. ej. 12 meses si no hay relación comercial')}. Si llegas a ser cliente, durante los plazos legales aplicables (fiscales y mercantiles).`,
        ],
      },
      {
        h: 'Con quién compartimos los datos',
        p: [
          'No cedemos tus datos a terceros salvo obligación legal. Para prestar el servicio utilizamos proveedores que actúan como encargados del tratamiento:',
          '<strong>Vercel Inc.</strong> (alojamiento de la web) y <strong>Resend</strong> (envío de los correos del formulario), con sede en EE. UU. Las transferencias internacionales se amparan en el Marco de Privacidad de Datos UE-EE. UU. y/o en cláusulas contractuales tipo de la Comisión Europea.',
          'Si aceptas las cookies correspondientes: <strong>Google Ireland Ltd.</strong> (Google Analytics) y <strong>Meta Platforms Ireland Ltd.</strong> (Meta Pixel), que pueden transferir datos a EE. UU. con las mismas garantías.',
          `Fabricantes de los productos, solo si es necesario para gestionar un pedido o presupuesto que nos solicites ${pend('confirmar con UNIK')}.`,
        ],
      },
      {
        h: 'Tus derechos',
        p: [
          `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y portabilidad escribiendo a ${email} o por correo postal a nuestro domicilio, indicando el derecho que ejerces.`,
          'Si consideras que no hemos tratado tus datos correctamente, puedes presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener">www.aepd.es</a>).',
        ],
      },
      {
        h: 'Seguridad',
        p: ['Aplicamos medidas técnicas y organizativas adecuadas para proteger tus datos: conexión cifrada (HTTPS), acceso restringido a las consultas recibidas y proveedores con garantías de seguridad.'],
      },
    ],
  },

  cookies: {
    titulo: 'Política de cookies',
    actualizado: pend('fecha de publicación'),
    intro: 'Esta web usa cookies y tecnologías similares. Las de terceros solo se activan si las aceptas en el aviso que aparece en tu primera visita (art. 22.2 LSSI-CE y Guía sobre el uso de las cookies de la AEPD).',
    secciones: [
      {
        h: 'Qué son las cookies',
        p: ['Son pequeños archivos que la web guarda en tu navegador para recordar información sobre tu visita, por ejemplo tus preferencias o cómo usas el sitio.'],
      },
      {
        h: 'Cookies que utilizamos',
        p: [
          `<table>
            <thead><tr><th>Nombre</th><th>Titular</th><th>Finalidad</th><th>Duración</th><th>Tipo</th></tr></thead>
            <tbody>
              <tr><td>unik-consentimiento</td><td>UNIK (propia)</td><td>Recordar tu elección sobre cookies. Se guarda en el almacenamiento local del navegador.</td><td>12 meses</td><td>Técnica, necesaria</td></tr>
              <tr><td>_ga, _ga_*</td><td>Google</td><td>Distinguir visitas y medir el uso de la web (Google Analytics 4).</td><td>2 años</td><td>Analítica, solo con consentimiento</td></tr>
              <tr><td>_fbp</td><td>Meta</td><td>Medir la eficacia de nuestros anuncios en Facebook e Instagram.</td><td>3 meses</td><td>Marketing, solo con consentimiento</td></tr>
            </tbody>
          </table>`,
          `${pend('revisar la tabla cuando estén configurados GA4 y Meta Pixel, y si se añade un mapa embebido u otros servicios')}`,
        ],
      },
      {
        h: 'Cómo gestionar las cookies',
        p: [
          'Puedes aceptar, rechazar o configurar las cookies por categorías en el aviso de cookies, y cambiar tu decisión cuando quieras desde «Configurar cookies» en el pie de la web. Si retiras el consentimiento, eliminamos las cookies de analítica y marketing.',
          'También puedes borrarlas o bloquearlas desde la configuración de tu navegador (Chrome, Safari, Firefox o Edge). Si bloqueas todas, algunas funciones de la web podrían no funcionar correctamente.',
        ],
      },
      {
        h: 'Más información',
        p: [`Para cualquier duda sobre esta política puedes escribirnos a ${email}. Consulta también nuestra <a href="/legal/privacidad">política de privacidad</a>.`],
      },
    ],
  },
};
