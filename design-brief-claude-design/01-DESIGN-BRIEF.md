# Brief de diseño para Claude Design — Espinal Multiservicios

> Estos son los **assets visuales** que el diagnóstico SEO marcó como faltantes/rotos. Todo lo demás (código, schemas, metadata) lo implementa el equipo en paralelo. **Lee primero `00-CONTEXTO-MARCA.md`.**

## ⚠️ Por qué importa cada asset
- Las OG images actuales son **SVG**, que WhatsApp/Facebook/LinkedIn/X **no renderizan** → al compartir cualquier enlace NO aparece imagen. Hay que entregarlas en **JPG o PNG**.
- El favicon es el **stock de Next.js** y el logo es un **monograma "EM" genérico** → cero reconocimiento de marca en pestañas, buscador y schema.org.

## Lista de assets a diseñar

| # | Asset | Dimensiones | Formato | Propósito |
|:--:|---|---|---|---|
| 1 | **OG image por línea de servicio (techos, pintura, plomería)** | 1200x630 px | JPG o PNG (NO SVG) | Reemplazar los SVG placeholder en lib/seo-data.ts (SERVICE_LINE_SEO.ogImage) para que aparezca preview al compartir cada página de servicio en WhatsApp/Facebook/LinkedIn/X |
| 2 | **OG image por categoría de blog (techos, pintura, plomería, hogar, servicios)** | 1200x630 px | JPG o PNG (NO SVG) | Reemplazar public/blog/placeholder-{techos,pintura,plomeria,hogar,servicios}.svg referenciados en lib/blog-data.ts (10 ogImage) |
| 3 | **OG image de marca por defecto (home)** | 1200x630 px (ratio 1.91:1) | JPG o PNG | Sustituir el poster de video 1280x720 declarado erróneamente como 1600x900 en app/layout.tsx como OG default del sitio |
| 4 | **OG image plantilla para cobertura por municipio y cross-pages servicio×municipio** | 1200x630 px | PNG (idealmente vía next/og dinámico) | Dar preview social a las 12 páginas de cobertura y 36 cross-pages (48 landings de captación local) que hoy no declaran imagen |
| 5 | **Logo de marca real (identidad)** | SVG escalable + export PNG 1024x1024, 512x512, 192x192 | SVG (master) + PNG fondo transparente + PNG fondo sólido para schema | Sustituir public/logo-espinal.svg (monograma genérico 'EM') usado en header, footer, blog y como logo de Organization en JSON-LD (layout.tsx:120) |
| 6 | **Favicon multi-tamaño** | 16x16, 32x32, 48x48 (multi-res en un .ico) | ICO | Reemplazar app/favicon.ico (stock de Next.js) por la marca real |
| 7 | **Favicon vectorial (icon.svg)** | Escalable (viewBox cuadrado, ~512) | SVG | Crear app/icon.svg para que Next.js emita <link rel=icon type=image/svg+xml> nítido a cualquier resolución |
| 8 | **Apple touch icon** | 180x180 px | PNG (sin canal alfa) | Crear app/apple-icon.png para el icono al guardar el sitio en la pantalla de inicio de iPhone |
| 9 | **Iconos PWA Android** | 192x192 px y 512x512 px | PNG cuadrado | Crear public/icon-192.png e icon-512.png para el manifest y la instalación/splash en Android/Chrome |
| 10 | **Icono maskable Android (adaptive)** | 512x512 px | PNG con purpose maskable | Crear public/icon-maskable-512.png para que Android no recorte el logo al aplicar máscaras circulares/squircle |
| 11 | **Logo rasterizado para schema.org Organization** | ≥112x112 px (recomendado 512x512) | PNG | Proveer un logo PNG para el campo logo del Organization JSON-LD (hoy apunta al SVG); Google recomienda raster para el rich result |
| 12 | **Fotografías reales de trabajos y equipo** | ~1600px lado largo (paisaje y retrato) | WebP/JPG optimizado | Construir confianza local con prueba visual en galería, testimonios y como base de los OG por servicio; reemplazar los SVG sintéticos roof-before/roof-after |

## Detalle de contenido por asset

### 1. OG image por línea de servicio (techos, pintura, plomería)
- **Dimensiones:** 1200x630 px
- **Formato:** JPG o PNG (NO SVG)
- **Propósito:** Reemplazar los SVG placeholder en lib/seo-data.ts (SERVICE_LINE_SEO.ogImage) para que aparezca preview al compartir cada página de servicio en WhatsApp/Facebook/LinkedIn/X
- **Contenido sugerido:** 3 piezas. Cada una: foto/ilustración del servicio + logo de marca + nombre 'Espinal Multiservicios' + el servicio (ej. 'Reparación de techos e impermeabilización') + ciudad 'Medellín y Valle de Aburrá' + teléfono. Naranja de marca #ea580c. Texto legible a tamaño thumbnail.

### 2. OG image por categoría de blog (techos, pintura, plomería, hogar, servicios)
- **Dimensiones:** 1200x630 px
- **Formato:** JPG o PNG (NO SVG)
- **Propósito:** Reemplazar public/blog/placeholder-{techos,pintura,plomeria,hogar,servicios}.svg referenciados en lib/blog-data.ts (10 ogImage)
- **Contenido sugerido:** 5 piezas de categoría. Mismo sistema de marca que los OG de servicio, con un campo visual para el tema del artículo. Alternativa preferida: generar dinámicamente con next/og, en cuyo caso solo se necesita la plantilla base de marca.

### 3. OG image de marca por defecto (home)
- **Dimensiones:** 1200x630 px (ratio 1.91:1)
- **Formato:** JPG o PNG
- **Propósito:** Sustituir el poster de video 1280x720 declarado erróneamente como 1600x900 en app/layout.tsx como OG default del sitio
- **Contenido sugerido:** Logo + 'Espinal Multiservicios' + servicios (Techos · Pintura · Plomería) + cobertura (Medellín y Valle de Aburrá) + teléfono. Fondo de marca o foto real de trabajo terminado. Debe inspirar confianza al compartir el dominio.

### 4. OG image plantilla para cobertura por municipio y cross-pages servicio×municipio
- **Dimensiones:** 1200x630 px
- **Formato:** PNG (idealmente vía next/og dinámico)
- **Propósito:** Dar preview social a las 12 páginas de cobertura y 36 cross-pages (48 landings de captación local) que hoy no declaran imagen
- **Contenido sugerido:** Plantilla parametrizable: 'Techos, pintura y plomería en {Municipio}' o '{Servicio} en {Municipio}' + logo + teléfono + naranja #ea580c. Pensada como app/.../opengraph-image.tsx con ImageResponse; entregar el diseño base + tipografía + posición de variables.

### 5. Logo de marca real (identidad)
- **Dimensiones:** SVG escalable + export PNG 1024x1024, 512x512, 192x192
- **Formato:** SVG (master) + PNG fondo transparente + PNG fondo sólido para schema
- **Propósito:** Sustituir public/logo-espinal.svg (monograma genérico 'EM') usado en header, footer, blog y como logo de Organization en JSON-LD (layout.tsx:120)
- **Contenido sugerido:** Wordmark 'Espinal Multiservicios' + símbolo de techo/casa/multiservicio reconocible. Debe funcionar en naranja #ea580c y en versión monocroma. Es la base de TODO el set de iconos para coherencia.

### 6. Favicon multi-tamaño
- **Dimensiones:** 16x16, 32x32, 48x48 (multi-res en un .ico)
- **Formato:** ICO
- **Propósito:** Reemplazar app/favicon.ico (stock de Next.js) por la marca real
- **Contenido sugerido:** Derivar del logo definitivo, fondo o glifo naranja #ea580c, legible a 16x16. Incluir 48x48 para pestañas de alta densidad y resultados de Google.

### 7. Favicon vectorial (icon.svg)
- **Dimensiones:** Escalable (viewBox cuadrado, ~512)
- **Formato:** SVG
- **Propósito:** Crear app/icon.svg para que Next.js emita <link rel=icon type=image/svg+xml> nítido a cualquier resolución
- **Contenido sugerido:** Glifo del logo sobre fondo naranja #ea580c. Soportar dark mode si es posible. Distintivo, no dos letras.

### 8. Apple touch icon
- **Dimensiones:** 180x180 px
- **Formato:** PNG (sin canal alfa)
- **Propósito:** Crear app/apple-icon.png para el icono al guardar el sitio en la pantalla de inicio de iPhone
- **Contenido sugerido:** Fondo sólido #ea580c (iOS rellena la transparencia de negro). Logo centrado con padding seguro. Sin esquinas redondeadas (iOS las aplica).

### 9. Iconos PWA Android
- **Dimensiones:** 192x192 px y 512x512 px
- **Formato:** PNG cuadrado
- **Propósito:** Crear public/icon-192.png e icon-512.png para el manifest y la instalación/splash en Android/Chrome
- **Contenido sugerido:** Fondo sólido #ea580c, logo centrado. El 512 también alimenta el splash screen de Chrome.

### 10. Icono maskable Android (adaptive)
- **Dimensiones:** 512x512 px
- **Formato:** PNG con purpose maskable
- **Propósito:** Crear public/icon-maskable-512.png para que Android no recorte el logo al aplicar máscaras circulares/squircle
- **Contenido sugerido:** Logo dentro de la safe-zone: ocupar ~60% central con padding generoso alrededor sobre fondo #ea580c. Declarar purpose:'maskable' en el manifest.

### 11. Logo rasterizado para schema.org Organization
- **Dimensiones:** ≥112x112 px (recomendado 512x512)
- **Formato:** PNG
- **Propósito:** Proveer un logo PNG para el campo logo del Organization JSON-LD (hoy apunta al SVG); Google recomienda raster para el rich result
- **Contenido sugerido:** Versión sobre fondo sólido o transparente del logo definitivo, cuadrado, alta resolución.

### 12. Fotografías reales de trabajos y equipo
- **Dimensiones:** ~1600px lado largo (paisaje y retrato)
- **Formato:** WebP/JPG optimizado
- **Propósito:** Construir confianza local con prueba visual en galería, testimonios y como base de los OG por servicio; reemplazar los SVG sintéticos roof-before/roof-after
- **Contenido sugerido:** 6-10 fotos: antes/después de impermeabilización, goteras reparadas, pintura, plomería y equipo trabajando. Reales del negocio, no stock genérico. Con alt descriptivo por contenido.

## Estructura de entrega esperada (para incorporar sin fricción)
```
/icons
  favicon.ico            (multi-res 16/32/48)
  icon.svg               (vectorial cuadrado)
  icon-192.png  icon-512.png
  apple-icon.png         (180x180, sin alfa)
  maskable-512.png
  logo-icon.png          (512x512 para schema.org)
/logo
  logo-espinal.svg       (master vectorial)
  logo-espinal-1024.png  logo-512.png  logo-192.png
/og
  og-default.jpg         (1200x630 home/marca)
  og-techos.jpg  og-pintura.jpg  og-plomeria.jpg
  og-blog-techos.jpg ... og-blog-hogar.jpg
  og-cobertura.jpg       (plantilla municipios)
/fotos                   (opcional fase 2: trabajos reales/equipo)
```