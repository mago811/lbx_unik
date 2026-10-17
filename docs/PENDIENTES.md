# Lo que necesitamos

## Del cliente (UNIK)

| # | Qué | Para qué | Bloquea |
|---|---|---|---|
| 1 | **Número de WhatsApp** | Botones de WhatsApp (hoy hay un número de prueba) | Lanzamiento |
| 2 | Dirección exacta + **CP (28702 o 28703)** + nave | Web, Google Business, schema | Lanzamiento |
| 3 | **Horario real** | Footer, Visítanos (hoy es inventado) | Lanzamiento |
| 4 | Email de contacto | Recepción de formularios | Lanzamiento |
| 5 | **Fotos reales del showroom y fachada** | Visítanos, Nosotros, home | Lanzamiento (muy recomendable) |
| 6 | ¿Qué servicios dan de verdad? Cocinas, exterior, reformas (integrales/parciales), interiorismo (alcance) | Decidir qué páginas se publican | Lanzamiento |
| 7 | Validar "Cómo trabajamos" (gestión de pedido, entrega) | Bloque de la home | Lanzamiento |
| 8 | Autorización de proveedores para usar fotos y nombres | Catálogo y franja de marcas | Lanzamiento |
| 8b | ¿Bobbio es una marca de Pedro Ortiz? (sus fotos vienen en carpetas de Pedro Ortiz) | Mostrarlas como uno o dos fabricantes | Fase 1 |
| 9 | Qué modelos tienen **expuestos** en tienda | Sello "Ven a verlo" | Fase 2 |
| 10 | ¿Mostrar "precio desde"? | Fichas | Decisión |
| 11 | ~~Fotos de Rodri Diseño, Oslo, Pedro Ortiz~~ ✅ Recibidas y en el catálogo | Mobiliario y sofás | — |
| 12 | 2+ proyectos reales con permiso | Página Proyectos | Fase 2 |
| 13 | Equipo / historia / años en Sanse | Nosotros | Fase 1 |
| 14 | Acceso a Google Business Profile e Instagram | Reseñas, feed, enlaces | Fase 1 |
| 15 | Dominio (¿tienen uno?) | Producción | Lanzamiento |
| 16 | Datos fiscales para aviso legal | Legales | Lanzamiento |

## Nuestro (LBX)

| # | Qué | Estado |
|---|---|---|
| 1 | Crear proyecto en **Vercel** y conectar el repo | ✅ Hecho |
| 2 | Resend: crear API key y cargar `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` en Vercel | ⏳ Tú |
| 2b | Resend: verificar el dominio del cliente (registros DNS) para enviar desde `@sudominio` | ⏳ Cuando haya dominio |
| 3 | GTM + GA4 + Meta Pixel + banner de cookies | ⏳ |
| 4 | Textos legales (privacidad, cookies, aviso legal) | ⏳ |
| 5 | `/api/contacto` con Resend + honeypot | ✅ Hecho |
| 6 | Revisar el logo vectorizado (se generó automáticamente desde PNG; idealmente pedir el original al diseñador) | ⚠️ |
| 7 | Descargar del Drive y optimizar las fotos de los 7 proveedores (1.309 fotos, ver `content/proveedores/INVENTARIO.md`) | ✅ Hecho |
| 7b | Sumar al catálogo Pedro Ortiz, Oslo, Rodri Diseño, Modesto Navarro y los nuevos Sira y Zenit de Bobbio (68 fichas) | ✅ Hecho |
| 8 | CMS (Decap) para que el cliente edite el catálogo | Fase 2 |

## Checklist antes de publicar

- [ ] `site.pendiente = false` en `src/data/site.ts` (quita barra de preview y `noindex`)
- [ ] NAP idéntico en web, Google Business y redes
- [ ] WhatsApp, teléfono y formularios probados de punta a punta
- [ ] Páginas sin confirmar (cocinas/exterior) ocultas o en modo "Consúltanos"
- [ ] Imágenes del moodboard (IA) sustituidas o claramente marcadas como referencia
- [ ] Legales + banner de cookies
- [ ] Lighthouse móvil ≥ 90
- [ ] Dominio, HTTPS, redirección www
- [ ] Sitemap enviado a Google Search Console
