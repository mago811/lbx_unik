# Rediseño "revista de diseño"

Rediseño de la capa visual. No cambian contenido, rutas, catálogo, SEO ni formulario.
Se trabaja sección por sección y cada una se valida antes de pasar a la siguiente.

## Sistema

| | Elección | Por qué |
|---|---|---|
| Display | **Fraunces** (variable, eje óptico 9–144, pesos 300–400, cursiva) | Serif con carácter que gana elegancia a tamaño gigante gracias al eje óptico; la cursiva da el tono editorial. Libre (OFL), auto-alojada |
| Texto | **Inter Tight** (variable) | Sans neutra y compacta, contrasta con la display y funciona a tamaños pequeños |
| Logo | Wordmark slab original (SVG) | Se usa como elemento gráfico gigante en el hero; no se sustituye por la display |

Paleta (tokens en `src/styles/global.css`):

| Token | Valor | Uso |
|---|---|---|
| `--hueso` | `#EEE8DF` | Fondo base |
| `--blanco-roto` | `#F7F4EE` | Superficies, letras sobre foto |
| `--arena` | `#DCCFBD` | Fondos de sección |
| `--piedra` | `#A89B8C` | Líneas, texto terciario |
| `--tinta` | `#161412` | Texto (negro cálido casi puro) |
| `--terracota` | `#A54B2A` | **Único acento** (enlaces activos, hover, detalles) |

**Azul noche (#101E2C):** se retira de la web. Junto a fotos cálidas y fondos hueso se lee frío y corporativo.
La terracota sale de las propias fotos (las mantas y cojines de Bobbio) y la tinta casi negra da más contraste.
El azul se puede mantener en papelería e impresos si UNIK quiere.

## Movimiento
Pocas animaciones: texto que aparece por líneas, zoom-out de la foto al entrar, parallax suave, galería horizontal anclada al scroll.
Las animaciones de scroll irán con GSAP + ScrollTrigger (solo en las secciones que lo necesiten) y Lenis para el scroll suave.
Con `prefers-reduced-motion` todo aparece sin movimiento.

## Secciones

| # | Sección | Solución | Estado |
|---|---|---|---|
| 1 | Hero | Foto a sangre (100svh) del sofá Claudia. Wordmark UNIK gigante entre el fondo y el **sofá recortado** (capa PNG generada con rembg, `assets/hero/claudia-recorte.png`). Claim pequeño en Fraunces y un único enlace. En vertical, el claim va sobre la pared | ✅ Aprobado |
| 2 | Intro | Cita editorial grande (Fraunces 40–64 px), descompensada a la izquierda, con foto vertical de detalle con parallax | ✅ Para revisar |
| 3 | Colecciones | Lista tipográfica gigante. Escritorio: la foto sigue al cursor. Móvil: nombre + foto a ancho completo | Pendiente |
| 4 | Sofás | Galería horizontal anclada al scroll, una pieza por pantalla. Móvil: carrusel nativo con scroll-snap | Pendiente |
| 5 | Cómo trabajamos | Recorrido de 4 frases alternadas izquierda/derecha con una imagen de apoyo | Pendiente |
| 6 | Interiorismo y reformas | Foto a sangre con caja de texto que entra al hacer scroll | Pendiente |
| 7 | Materiales | Macro del tejido a pantalla completa, texto mínimo encima | Pendiente |
| 8 | Marcas | Marquee lento con los nombres en Fraunces grande; además, marca como pie de foto de cada sofá | Pendiente |
| 9 | Visítanos + footer | Dirección y horario en tipografía grande, foto del showroom al lado, formulario sobrio | Pendiente |

## Notas técnicas
- La cabecera de la home va en modo `overlay`: transparente sobre el hero y sólida al pasarlo. El logo pequeño aparece solo al hacer scroll.
- La foto de fondo y el recorte usan el mismo `object-fit`/`object-position` y el mismo `srcset`, así que coinciden en cualquier tamaño.
- El `<h1>` de la home es el wordmark, con el texto completo para lectores de pantalla y SEO.
