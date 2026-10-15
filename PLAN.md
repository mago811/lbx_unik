# UNIK — Plan de web (v1)

> Primera web de UNIK Sofás (UNIK Interior Design SL), San Sebastián de los Reyes, Madrid.
> Hoy solo tienen redes sociales (@unik_design.es). **Objetivo único: vender** →
> convertir visitas en **consultas cualificadas y visitas al showroom**.

Estado: **preview funcionando** (Astro). Specs en [`docs/SPECS.md`](docs/SPECS.md); lo que falta en [`docs/PENDIENTES.md`](docs/PENDIENTES.md).

Fuentes: `UNIK.pdf` (estructura premium), `UNIK_Contenidos_Web_Fotos_y_Textos.pdf`
(textos por sección), logo y moodboard (`assets/`), carpeta Drive de proveedores (`content/proveedores/`).

---

## 0. Errores a corregir de los PDF (importante)

| Problema | Por qué importa | Corrección |
|---|---|---|
| El PDF de estructura apunta el SEO a **"Donostia / San Sebastián"** (País Vasco). | La tienda está en **San Sebastián de los Reyes (Madrid)**. Posicionaríamos para la ciudad equivocada. | Todo el SEO local a *San Sebastián de los Reyes, Sanse, Alcobendas, Madrid norte*. Nunca "Donostia". |
| CP dudoso (28702 vs 28703). | Google Business Profile y web deben coincidir exactamente (NAP). | Confirmar con el cliente antes de publicar. |
| Fotos del moodboard son IA. | No se pueden presentar como proyectos reales. | Solo como placeholders / fondos de ambiente sin texto de "proyecto". |
| Cocinas, exterior, reformas e interiorismo sin confirmar. | Prometer un servicio que no dan = leads malos. | Fase 1 solo con lo confirmado; el resto como "Consúltanos" hasta validar. |
| "No confundir con Unika Sofás". | Riesgo de marca/SEO. | Usar siempre "UNIK Sofás · San Sebastián de los Reyes" en titles y schema. |

---

## 1. Estrategia: de "revista premium" a "showroom que vende"

Los PDF están muy orientados a imagen premium (Minotti, Poliform). Correcto para la estética,
pero UNIK es una **tienda local** y el cliente decide en tienda. La web debe empujar a 3 acciones:

1. **WhatsApp** (la conversión más fácil para alguien que viene de Instagram).
2. **Pedir cita en el showroom** (formulario corto con día/franja preferida).
3. **Consultar un modelo** (desde cada ficha, con la referencia pre-rellenada).

### Mejoras propuestas sobre los PDF

1. **Botón WhatsApp flotante** en toda la web, con mensaje precargado según la página
   ("Hola, me interesa el sofá *Adagio* de Bobbio…").
2. **"Reserva tu visita"** como CTA principal del menú (en lugar de "Visítanos" genérico).
3. **Marcas visibles**: franja "Trabajamos con Pedro Ortiz · Bobbio · Guardia · Rodri Diseño ·
   Modesto Navarro · Oslo · Afosxsofas" (si los proveedores lo autorizan). Da confianza inmediata.
4. **Prueba social**: reseñas de Google embebidas + Instagram feed. Pedir reseñas a clientes antes del lanzamiento.
5. **Bloque "Cómo trabajamos"** en 4 pasos (Ven → Elige tejido/medida → Te lo preparamos → Entrega).
   Elimina la fricción de "¿cuánto tarda, se puede personalizar?".
6. **"Desde X €"** opcional en fichas de sofás. Los PDF dicen sin precios; recomiendo al menos
   rangos orientativos: filtran curiosos y mejoran la tasa de cierre. Decisión del cliente.
7. **Formulario de proyecto** (reformas/interiorismo) con subida de fotos y medidas del espacio.
8. **Menos páginas en Fase 1**: 6 colecciones + 2 servicios es mucho contenido sin fotos reales.
   Lanzar con lo que tiene material (Sofás, Mobiliario, Dormitorios/Salones) y crecer.
9. **Medición desde el día 1**: GA4 + Meta Pixel + eventos (clic WhatsApp, clic teléfono,
   envío formulario, clic "Cómo llegar"). Así sabemos qué vende.
10. **Landing para campañas** de Instagram/Meta Ads (ej. "Sofás a medida en Sanse"), sin menú, un CTA.
11. **Google Business Profile** optimizado y enlazado (los PDF lo mencionan solo en el checklist; es lo que más visitas a tienda trae).

---

## 2. Identidad visual

### Logo
- Usar el logo entregado (`assets/brand/unik-logo-original.png`) con su tagline
  **SOFÁS · MOBILIARIO · INTERIORISMO · REFORMAS**.
- **Pendiente:** vectorizar a SVG (versión azul noche, versión marfil para fondos oscuros,
  versión solo "Unik" para header en móvil, favicon con la "U").

### Tipografía
El logo es una slab serif negra con remates redondeados. Equivalentes libres (Google Fonts) comparados:

| Uso | Fuente | Notas |
|---|---|---|
| Titulares (H1/H2) | **Roboto Slab 800–900** | La más parecida al logo. Usar con moderación: solo titulares grandes. |
| Alternativa titulares | Arvo 700 | Algo más ligera y "editorial". |
| Tagline, menú, labels | **Outfit 500** (o Manrope), MAYÚSCULAS, tracking 0.18em | Igual que el tagline del logo. |
| Cuerpo de texto | Outfit / Manrope 400, 17–18px | Legible y moderna. |

> Mejora sobre el PDF: el manual pedía "serif editorial refinada" para títulos. Recomiendo
> usar la slab del logo: da **identidad propia** y diferencia de las webs de muebles que todas
> parecen iguales. El contraste slab pesada + fotos cálidas + mucho aire es lo que lo hace premium.

### Color (del manual + moodboard)

```css
:root {
  --azul-noche:  #101E2C; /* logo, textos, botones primarios */
  --marfil:      #F5F1EA; /* fondo principal */
  --blanco-calido:#FBFAF6;/* fondo secundario / tarjetas */
  --piedra:      #B5A89B; /* líneas, labels, detalles */
  --arena:       #D9C9B4; /* fondos de sección (moodboard: lino/travertino) */
  --nogal:       #7A5638; /* acento cálido, hover, links (madera del moodboard) */
  --oliva:       #6B7256; /* acento puntual (vegetación del moodboard) */
}
```
Botón primario: azul noche sobre marfil. WhatsApp: verde estándar solo en el botón flotante.

### Dirección fotográfica (moodboard)
Luz natural cálida, tonos lino/travertino/nogal, ventanales con vegetación, mucho aire.
Las 6 tomas del moodboard están en `assets/moodboard/` como referencia y placeholder.

---

## 3. Mapa del sitio

```
Inicio
├── Colecciones
│   ├── Sofás            (/sofas)        ← protagonista, Fase 1
│   ├── Mobiliario       (/mobiliario)   ← Fase 1
│   ├── Salones          (/salones)      ← Fase 1 (reutiliza referencias por etiquetas)
│   ├── Dormitorios      (/dormitorios)  ← Fase 1 (Guardia)
│   ├── Cocinas          (/cocinas)      ← solo si se confirma el servicio
│   └── Exterior         (/exterior)     ← solo si se confirma
├── Servicios
│   ├── Interiorismo     (/interiorismo)
│   └── Reformas         (/reformas)
├── Proyectos            (/proyectos)    ← cuando haya 2+ reales con permiso
├── Marcas               (/marcas)       ← NUEVA: una página por proveedor (SEO de marca)
├── Showroom / Contacto  (/visitanos)
└── Legal: aviso legal, privacidad, cookies
```

Menú: `Colecciones ▾ · Servicios ▾ · Marcas · Proyectos · Nosotros` + botón **Reserva tu visita**.
Móvil: menú hamburguesa + barra inferior fija con **Llamar · WhatsApp · Cómo llegar**.

---

## 4. Home (orden propuesto)

1. **Hero** — foto a pantalla completa (salón/sofá), H1 *"Espacios para vivir. Diseño para sentir."*,
   subtítulo con ubicación ("Showroom de sofás y mobiliario en San Sebastián de los Reyes"),
   CTAs: **Reserva tu visita** · Ver colecciones.
2. **Franja de confianza** — marcas + nota de Google + "Showroom en Sanse · Av. de los Pirineos, 27".
3. **Colecciones** — cuadrícula de 6 fotos (textos del PDF de contenidos).
4. **Sofás destacados** — carrusel de 6–8 modelos reales (Pedro Ortiz, Bobbio, Afosxsofas) con "Consultar".
5. **Cómo trabajamos** — 4 pasos.
6. **Interiorismo y reformas** — bloque emocional con 2 accesos.
7. **Materiales** — tejidos y acabados (fotos de muestrarios de proveedores).
8. **Reseñas + Instagram**.
9. **Showroom** — foto real, horario, mapa, teléfono, WhatsApp.
10. **Contacto final** — *"Hablemos de tu próximo proyecto."* + formulario corto.

Los textos de cada sección/página están listos en `UNIK_Contenidos_Web_Fotos_y_Textos.pdf` (se usan tal cual, revisados).

---

## 5. Páginas de colección y fichas

- Plantilla común: hero → intro (texto del PDF) → filtros (tipo/marca) → cuadrícula → tejidos/acabados → CTA.
- **Ficha de referencia**: galería, marca, descripción, medidas, acabados, "Consultar este modelo"
  (WhatsApp + formulario con referencia), "Verlo en el showroom", relacionados.
- Una referencia puede aparecer en varias colecciones por **etiquetas** (sin duplicar).
- Sin carrito en Fase 1.

Modelo de datos por referencia (del PDF, ampliado):
`id · nombre · marca · familia · categorías[] · ambientes[] · descripción corta · fotos[] · medidas · acabados[] · precio_desde (opcional) · en_showroom (sí/no) · estado (borrador/publicado)`.

---

## 6. Stack técnico recomendado

| Pieza | Elección | Por qué |
|---|---|---|
| Framework | **Astro** | Web estática, carga muy rápida (SEO y móvil), fácil de mantener. |
| Gestor de contenido (Fase 2) | **Decap CMS** o **Sanity** | El cliente sube/edita referencias sin tocar código (requisito del PDF). |
| Imágenes | Pipeline Astro Image → AVIF/WebP, 3 tamaños | Las fotos de proveedores pesan 5–20 MB cada una. |
| Hosting | **Vercel** | Deploy desde GitHub, previews por rama. Pendiente de crear. |
| Formularios | Vercel Function + Resend (o Formspree) + antispam | |
| Analítica | GA4 + Meta Pixel + banner de cookies (RGPD) | |
| SEO | Schema `FurnitureStore` + `LocalBusiness`, sitemap, OG images | |

---

## 7. SEO local (corregido a Madrid)

| Página | Title |
|---|---|
| Inicio | UNIK Sofás y Mobiliario · San Sebastián de los Reyes |
| Sofás | Sofás en San Sebastián de los Reyes · Tienda de sofás · UNIK |
| Mobiliario | Tienda de muebles en San Sebastián de los Reyes · UNIK |
| Salones | Muebles de salón en Sanse y Alcobendas · UNIK |
| Dormitorios | Dormitorios y muebles de dormitorio · UNIK Madrid |
| Interiorismo | Interiorismo en San Sebastián de los Reyes · UNIK |
| Reformas | Reformas en San Sebastián de los Reyes · UNIK |
| Marcas/x | Sofás Pedro Ortiz en Madrid · UNIK (una por marca) |

Las páginas por **marca** son una oportunidad clara: gente que busca "sofás Bobbio Madrid" ya quiere comprar.

---

## 8. Contenido del Drive (proveedores)

Descargado en `content/proveedores/<proveedor>/` y **optimizado para web** (JPG máx. 2400px, ~85% calidad).
Los originales en alta (varios GB) quedan en el Drive; no se suben a git.

- No publicar tarifas ni PDFs comerciales privados.
- Confirmar autorización de uso de imágenes con cada proveedor.
- Inventario de archivos: `content/proveedores/INVENTARIO.md`.

---

## 9. Fases

**Fase 1 — Lanzamiento (2–3 semanas)**
Home, Sofás, Mobiliario, Salones, Dormitorios, Interiorismo, Reformas, Marcas, Visítanos, legales.
WhatsApp, formularios, GA4/Pixel, Google Business Profile, 15–30 referencias.

**Fase 2 — Catálogo**
CMS completo, filtros, fichas, Cocinas/Exterior si se confirman, Proyectos reales.

**Fase 3 — Crecimiento**
Landings para Meta Ads, blog/guías ("cómo elegir un sofá", "tejidos antimanchas"), más proyectos, reseñas.

---

## 10. Lo que necesitamos del cliente (bloqueante)

1. Dirección exacta, CP, horario, email, WhatsApp, enlaces a redes.
2. Qué servicios dan de verdad: ¿cocinas? ¿exterior? ¿reformas integrales o parciales? ¿interiorismo con proyecto?
3. **Fotos reales del showroom y fachada** (lo más importante para generar visitas). Si no tienen, sesión de fotos profesional.
4. Autorización de proveedores para usar sus fotos y nombres.
5. 15–30 modelos para empezar y si muestran "precio desde".
6. Proyectos reales (2+) con permiso.
7. Logo en vector (o lo vectorizamos nosotros).
8. Acceso a Google Business Profile.
