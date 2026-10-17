# UNIK — Especificaciones técnicas y funcionales (v1)

Complementa a [`PLAN.md`](../PLAN.md). Este documento es la referencia para desarrollar,
revisar y dar por terminada cada pieza de la web.

---

## 1. Objetivo y métricas

**Objetivo:** generar **consultas cualificadas** y **visitas al showroom** de San Sebastián de los Reyes.

| Conversión (evento) | Disparador | KPI inicial |
|---|---|---|
| `clic_whatsapp` | Botón flotante, barra móvil, fichas, bloques | Principal |
| `envio_formulario` | Formulario de consulta / reserva | Principal |
| `clic_telefono` | Enlaces `tel:` | Secundario |
| `clic_como_llegar` | Enlaces a Google Maps | Secundario (intención de visita) |
| `cta_reserva_visita` | Botón "Reserva tu visita" | Micro-conversión |
| `cta_consulta` | Botones que llevan al formulario | Micro-conversión |

Todos los elementos llevan `data-track="<evento>"` y `data-ubicacion="<dónde>"`. El layout
los empuja a `window.dataLayer`. En producción, Google Tag Manager los envía a GA4 y Meta Pixel.

---

## 2. Stack

| Capa | Elección | Notas |
|---|---|---|
| Framework | **Astro 7** (estático) | `npm run dev`, `npm run build` → `dist/` |
| Estilos | CSS propio con tokens (`src/styles/global.css`) | Sin framework CSS |
| Tipografías | `@fontsource/roboto-slab` (800/900) + `@fontsource-variable/outfit` | Auto-alojadas, sin Google Fonts externo (RGPD) |
| Imágenes | `astro:assets` + sharp → WebP en varios tamaños | Fuente: `content/proveedores/**` (JPG ≤ 2400 px) |
| Hosting | **Vercel** (equipo LOBOX-Dev, proyecto `lbx-unik`) | Adaptador `@astrojs/vercel`: todo estático salvo `/api/*` |
| Formularios | Vercel Function `/api/contacto` + Resend | Ver §6 |
| CMS | Fase 2: **Decap CMS** (git-based) o Sanity | El cliente edita fichas sin tocar código |
| Analítica | GTM + GA4 + Meta Pixel, tras consentimiento | Banner de cookies obligatorio |

Requisitos: Node 22+.

---

## 3. Estructura del repositorio

```
/
├── PLAN.md                 Plan y estrategia
├── docs/
│   ├── SPECS.md            Este documento
│   ├── PENDIENTES.md       Lo que necesitamos del cliente / de nosotros
│   ├── UNIK_*.pdf          Documentos originales del cliente
├── assets/
│   ├── brand/              Logo (PNG original, PNG transparentes, SVG vectorizado, favicon)
│   └── moodboard/          Moodboard y sus 6 recortes (imágenes IA: solo referencia)
├── content/proveedores/    Fotos de proveedores optimizadas (ver INVENTARIO.md)
├── public/                 favicon.svg
└── src/
    ├── data/site.ts        NAP, horario, WhatsApp, marcas  ← datos de negocio
    ├── data/productos.ts   Catálogo (modelos → fotos)        ← catálogo
    ├── layouts/Base.astro  <head>, SEO, schema, tracking
    ├── components/         Header, Footer, MobileBar, ProductCard, ContactForm,
    │                       ColeccionPage (plantilla), RefBadge
    └── pages/              Rutas (ver §4)
```

---

## 4. Rutas

| Ruta | Plantilla | Estado contenido |
|---|---|---|
| `/` | `index.astro` | ✅ Listo para validar |
| `/sofas` | `ColeccionPage` | ✅ Bobbio, Pedro Ortiz y Afosxsofas |
| `/salones` | `ColeccionPage` | ✅ Reutiliza referencias por etiqueta |
| `/mobiliario` | `ColeccionPage` | ✅ Mesas, sillas, aparadores (Oslo, Rodri, Modesto Navarro) y butacas |
| `/dormitorios` | `ColeccionPage` | ⚠️ Falta Guardia (dormitorio) |
| `/cocinas` | `ColeccionPage` | ⛔ Servicio sin confirmar |
| `/exterior` | `ColeccionPage` | ⛔ Servicio sin confirmar |
| `/interiorismo` | `ColeccionPage` | ⚠️ Confirmar alcance del servicio |
| `/reformas` | `ColeccionPage` | ⚠️ Confirmar alcance + fotos reales |
| `/catalogo/[slug]` | Ficha de referencia | ✅ Una por modelo |
| `/marcas` | Índice | ✅ |
| `/marcas/[slug]` | `ColeccionPage` | ✅ Solo marcas con fotos |
| `/nosotros` | Página | ⚠️ Faltan equipo/historia |
| `/visitanos` | Contacto + FAQ | ⚠️ Faltan foto de fachada y horario real |
| `/legal/*` | Legal | ⛔ Textos legales pendientes |
| `/proyectos` | — | Fase 2 (cuando haya 2+ proyectos reales con permiso) |

Regla: una página marcada ⛔ **no se enlaza ni se publica** hasta validarla (o se muestra solo como "Consúltanos").

---

## 5. Componentes

### Header
- Logo SVG (wordmark) + tagline en texto (SEO/accesibilidad).
- Escritorio: desplegables *Colecciones* y *Servicios*, *Marcas*, *Nosotros*, botón **Reserva tu visita**.
- ≤ 1080 px: menú hamburguesa a pantalla completa.
- Sticky con sombra al hacer scroll.

### Contacto rápido
- Escritorio: botón flotante de WhatsApp (abajo a la derecha).
- ≤ 760 px: barra inferior fija **Llamar · WhatsApp · Cómo llegar**.
- El texto de WhatsApp se precarga según la página (`waTexto`), p. ej. *"Hola UNIK, me interesa el modelo Beatrice (Bobbio)."*

### ProductCard
Foto 4:3, marca, nombre, tipos. Enlaza a `/catalogo/[slug]`. Lleva `data-tipos` para los filtros.

### ColeccionPage (plantilla)
Hero (texto + foto) → aviso de pendiente (solo preview) → rejilla con filtros por tipo →
bloques de proceso (opcional) → formulario de consulta.

### Ficha (`/catalogo/[slug]`)
Galería con miniaturas, marca, nombre, tipos, resumen, datos (medidas/tapizados/dónde verlo),
CTA WhatsApp con referencia + formulario con referencia precargada, relacionados por tipo.

### ContactForm
Campos: nombre*, teléfono*, email, tipo de consulta, referencia, mensaje, privacidad*.
Honeypot `empresa` contra spam. En preview no envía (ver §6).

### RefBadge
Etiqueta "Imagen de referencia" sobre las imágenes del moodboard (IA). **Obligatoria** mientras se usen.

---

## 6. Formularios (Resend) ✅ implementado

Flujo: `ContactForm` → `POST /api/contacto` (función serverless de Vercel, `src/pages/api/contacto.ts`) → API de Resend → email a UNIK.

- Validación en servidor (`src/lib/contacto.ts`): nombre, teléfono (≥ 9 dígitos), email opcional, privacidad obligatoria, longitudes máximas y escape de HTML.
- Antispam: honeypot `empresa` (al bot se le responde 200 sin enviar nada). Si llega spam, añadir Cloudflare Turnstile.
- El email incluye tipo, referencia, página de origen, UTM y enlaces directos para llamar, abrir WhatsApp o responder. `reply_to` = email del cliente.
- Respuestas: `200` ok · `422` error de validación · `503` faltan variables · `502` falla Resend. El formulario muestra el mensaje de error.
- El evento `envio_formulario` solo se dispara tras un `200`.
- Sin variables de entorno el formulario muestra «aún no está activo» y no se pierde nada en silencio (queda en los logs de Vercel).

Variables de entorno (Vercel → Settings → Environment Variables), ver `.env.example`:

| Variable | Ejemplo | Notas |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | Resend → API Keys (permiso *Sending access*) |
| `CONTACT_TO` | `hola@uniksofas.es` | Destinatarios, separados por coma |
| `CONTACT_FROM` | `UNIK Web <web@uniksofas.es>` | Requiere dominio verificado en Resend. Mientras tanto: `UNIK Web <onboarding@resend.dev>` (solo envía al email de la cuenta de Resend) |

Fase 2: subida de fotos/planos (máx. 5 archivos, 10 MB) para reformas e interiorismo.

---

## 7. Modelo de datos (catálogo)

Hoy en `src/data/productos.ts`; en Fase 2 pasa al CMS con el mismo esquema:

| Campo | Tipo | Notas |
|---|---|---|
| `slug` | string | URL `/catalogo/<slug>` |
| `nombre` | string | |
| `marca` | ref → marca | |
| `tipos` | enum[] | Rinconera, Chaise longue, Modular, Relax, Sofá cama, Desenfundable, Butaca, Pufs y auxiliares |
| `colecciones` | enum[] | sofas, mobiliario, salones, dormitorios (una referencia en varias, sin duplicar) |
| `fotos` | imagen[] | La primera es la portada |
| `resumen` | texto corto | Solo lo verificable; sin inventar prestaciones |
| `medidas`, `acabados`, `ficha_pdf` | opcionales | De la documentación pública del proveedor |
| `precio_desde` | número opcional | Decisión del cliente |
| `en_showroom` | bool | Para el sello "Ven a verlo" |
| `destacado` | bool | Aparece en la home |
| `estado` | borrador / publicado | |

**Nunca** publicar tarifas, precios de compra ni PDFs comerciales privados (en el ZIP de Afosxsofas
había una tarifa PVP; se excluyó a propósito).

---

## 8. Diseño

| Token | Valor | Uso |
|---|---|---|
| `--azul-noche` | `#101E2C` | Logo, texto, botón primario, footer |
| `--marfil` | `#F5F1EA` | Fondo principal |
| `--blanco-calido` | `#FBFAF6` | Superficies |
| `--piedra` | `#B5A89B` | Detalles, numeración |
| `--arena` | `#E6DCCD` | Fondos de sección |
| `--nogal` | `#7A5638` | Etiquetas, hover, acentos |
| `--oliva` | `#6B7256` | Mensajes de éxito |

- Titulares: Roboto Slab 800/900 (la más cercana libre al logo). Texto: Outfit 400–500.
- Etiquetas/menú: Outfit 500, MAYÚSCULAS, `letter-spacing: .12–.24em`.
- Botones rectangulares, radio 4 px. Transiciones 200–300 ms; apariciones 700 ms; respeta `prefers-reduced-motion`.
- Fotos grandes, mucho aire; nunca más de 3 columnas.

---

## 9. SEO

- Un `<h1>` por página. Title y meta description propios (ya en cada página).
- Todo el SEO local orientado a **San Sebastián de los Reyes / Sanse / Alcobendas / Madrid norte**. Nunca "Donostia".
- Schema: `FurnitureStore` (layout) + `FAQPage` (visítanos). Fase 2: `Product` en fichas.
- `canonical`, Open Graph, `sitemap.xml` (añadir `@astrojs/sitemap` al conectar dominio), `robots.txt`.
- Mientras `site.pendiente = true` se emite `noindex` y la barra de preview.
- Alt descriptivo en todas las fotos (`<Modelo> de <Marca>`).

---

## 10. Rendimiento y accesibilidad (criterios de aceptación)

- Lighthouse móvil ≥ 90 en Performance, Accessibility, Best Practices y SEO.
- LCP < 2,5 s en 4G: hero con `loading="eager"` + `fetchpriority="high"`, resto lazy.
- Imágenes WebP con `srcset`; ninguna imagen > 400 kB servida en móvil.
- Contraste AA, foco visible, navegación por teclado en menús y filtros, `aria-expanded` en desplegables.
- Sin scroll horizontal a 360 px.

---

## 11. Entornos

| Entorno | Dónde | Estado |
|---|---|---|
| Local | `npm run dev` → http://localhost:4321 | ✅ |
| Preview | Vercel (proyecto `lbx-unik`) | ✅ Creado |
| Producción | Vercel + dominio del cliente | ⏳ Falta dominio |

Variables de entorno: `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (ver §6). Futuras: `TURNSTILE_SECRET`, `PUBLIC_GTM_ID`.

---

## 12. Definición de "listo para publicar"

Ver checklist en [`PENDIENTES.md`](PENDIENTES.md). Como mínimo: datos NAP confirmados, `site.pendiente = false`,
formularios probados, cookies + legales, Google Business Profile enlazado, imágenes con permiso y sin imágenes IA presentadas como reales.
