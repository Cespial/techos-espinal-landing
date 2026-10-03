# Plan de ilustraciones con Midjourney — espinalservicios.com

Objetivo: dar altura y profesionalismo a una página que debe seguir siendo simple y minimalista. Una sola
familia visual, pocas piezas, bien colocadas. Las imágenes generadas son **ilustraciones editoriales**, nunca
fotos simuladas.

## 1. Reglas

- **Qué NO se genera**: fotos de «nuestro equipo», trabajos hechos, antes/después, clientes, reseñas, fachadas
  de casas «de clientes». Eso solo con fotos reales (sección `RecentWork` y la foto de Henrry).
- **Qué SÍ**: ilustraciones de techos y casas del Valle de Aburrá, pictogramas de servicio, un mapa
  ilustrado de los 12 municipios, portadas de artículos del blog, imágenes Open Graph y la página 404.
- **Un solo estilo** en todo el sitio: ilustración plana editorial, trazo limpio, tres tintas (blanco papel,
  tinta casi negra, naranja de marca `#ea580c`) con un acento por línea (teal `#0891b2` pintura, verde
  `#059669` plomería). Sin degradados, sin sombras suaves, sin texto dentro de la imagen.
- **Restricción de peso**: cada imagen ≤ 120 KB en WebP; el hero ≤ 90 KB. Si no cabe, se simplifica la
  ilustración, no se baja la calidad.
- **Licencia**: con un plan de pago de Midjourney, las imágenes generadas se pueden usar comercialmente.

## 2. Flujo

1. **Ancla de estilo** (una sola vez). Generar 4 variantes con el prompt A, elegir la que mejor sienta la
   familia y guardar su URL. Todas las demás piezas usan `--sref <esa URL> --sw 250` para mantener el estilo.
2. Generar cada pieza con su prompt. Upscale (U1–U4) y descargar PNG.
3. Fondo: pedir siempre «isolated on plain white background» para que encaje con el blanco del sitio. Si queda
   un tono crema, corregir a blanco puro en Photoshop/Figma o con `sharp` (umbral).
4. Convertir y redimensionar con el script de abajo → `public/illustrations/`.
5. Integrar en los componentes indicados en la sección 4.
6. QA: Lighthouse móvil (LCP ≤ 2,5 s), peso total del home < 1,2 MB, `alt` descriptivo en cada imagen.

## 3. Prompts

Parámetros base (Midjourney v7; ajustar si cambia la versión):
`--v 7 --style raw --s 60 --no text, letters, logo, watermark, people, photo, gradient, 3d render`

**A. Ancla de estilo**
```
flat editorial illustration of terracotta tile rooftops of Medellín houses with green mountains of the Aburrá valley behind, clean vector-like shapes, limited palette: paper white, near-black ink, burnt orange #ea580c, minimal detail, generous negative space, isolated on plain white background --ar 16:9 --v 7 --style raw --s 60 --no text, letters, logo, watermark, people, photo, gradient, 3d render
```

**B. Hero (columna derecha, detrás de la tarjeta de Henrry)** — 1 pieza, `--ar 4:5`
```
flat editorial illustration, close view of a terracotta tile roof edge with a rain gutter and a downspout, one small ladder leaning on the wall, Medellín mountains faint in the background, paper white, near-black ink, burnt orange accent, minimal, isolated on plain white background --ar 4:5 --sref <URL_ANCLA> --sw 250 [parámetros base]
```

**C. Tres pictogramas de servicio** (cabecera de cada tarjeta en el home y columnas de «Servicios por municipio»), `--ar 1:1`, cada uno en su acento:
```
minimal line icon illustration of a terracotta roof with a single raindrop, two-tone: near-black ink and burnt orange #ea580c, thick even strokes, centered, isolated on plain white background --ar 1:1 --sref <URL_ANCLA> --sw 250 [base]
minimal line icon illustration of a paint roller leaving a flat stripe on a wall, two-tone: near-black ink and teal #0891b2, thick even strokes, centered, isolated on plain white background --ar 1:1 --sref <URL_ANCLA> --sw 250 [base]
minimal line icon illustration of a water tap with a pipe elbow and one drop, two-tone: near-black ink and green #059669, thick even strokes, centered, isolated on plain white background --ar 1:1 --sref <URL_ANCLA> --sw 250 [base]
```

**D. Mapa ilustrado del Valle de Aburrá** (sección «Dónde trabajamos», decorativo; la lista HTML de municipios se mantiene), `--ar 3:2`
```
flat editorial map illustration of a long north–south mountain valley with a river in the middle and twelve small rooftop clusters along it, no labels, no text, paper white, near-black ink lines, burnt orange dots marking the clusters, minimal, isolated on plain white background --ar 3:2 --sref <URL_ANCLA> --sw 250 [base]
```

**E. Portadas del blog** (12 artículos, sustituyen los SVG de relleno; también sirven de OG del artículo), `--ar 16:9`. Un prompt por tema, siempre con la misma cola:
- Goteras: `flat editorial illustration of a ceiling corner with a single water drop falling into a bucket`
- Pintura de apartamento: `flat editorial illustration of a paint roller and a masking-taped wall edge, half painted`
- Fuga en pared: `flat editorial illustration of a wall with a faint damp patch and a pipe behind it, cutaway view`
- Impermeabilización: `flat editorial illustration of a flat rooftop terrace with a roller applying a coating, rain clouds far away`
- Humedad en paredes: `flat editorial illustration of a plaster wall with small bubbles of paint lifting, a dehumidifier icon`
- Temporada de lluvias: `flat editorial illustration of a tile roof under heavy rain lines with a gutter overflowing`
- Precio de plomero: `flat editorial illustration of a toolbox with a wrench and a pipe, a receipt sheet beside it`
- Destape de cañerías: `flat editorial illustration of a sink drain with a cutaway pipe and a plumber's snake`
- Moho en paredes: `flat editorial illustration of a bathroom corner with dark spots and a brush with soap`
- Tipos de tejas: `flat editorial illustration of four roof tile samples side by side: clay, fiber-cement, metal, thermoacoustic`
- Lluvias Valle de Aburrá (nuevo): `flat editorial illustration of Medellín rooftops with a rain front arriving over the mountains`
- Impermeabilizar en Envigado/Sabaneta/Itagüí (nuevo): `flat editorial illustration of three small rooftops of different heights with one coated in burnt orange`
Cola común: `, paper white, near-black ink, burnt orange accent, minimal, isolated on plain white background --ar 16:9 --sref <URL_ANCLA> --sw 250 [base]`

**F. Open Graph por defecto** (1200×630, se compone en Figma): ilustración B o A a la izquierda, a la derecha
logo «La Casa», «Espinal Multiservicios», «Techos · pintura · plomería a domicilio», «Medellín y Valle de Aburrá».
El texto se añade en Figma, nunca en Midjourney.

**G. 404** — `--ar 1:1`
```
flat editorial illustration of a roof tile slipped out of place with a question-mark-shaped crack, paper white, near-black ink, burnt orange accent, minimal, isolated on plain white background --ar 1:1 --sref <URL_ANCLA> --sw 250 [base]
```

## 4. Dónde va cada pieza (código)

| Pieza | Archivo | Componente / campo |
|---|---|---|
| B hero | `public/illustrations/hero-techo.webp` (960×1200) | `components/local/HomeHero.tsx`: capa detrás de `OwnerCard` en la columna derecha, `next/image` con `priority` y `sizes="(min-width: 768px) 40vw, 100vw"` |
| C pictogramas | `public/illustrations/icono-techos.webp`, `-pintura`, `-plomeria` (256×256) | `components/local/ServiceCards.tsx` (cabecera de cada tarjeta) y `LocalLinks.tsx` (junto al título de cada columna) |
| D mapa | `public/illustrations/mapa-valle.webp` (1200×800) | `components/local/LocalLinks.tsx`, a la derecha del texto en escritorio, encima en móvil; la lista de 12 municipios sigue en HTML |
| E portadas | `public/blog/<slug>.webp` (1600×900) y `public/og/blog-<slug>.png` (1200×630) | `lib/blog-data.ts`: `featuredImage`, `ogImage` |
| F OG | `public/og/og-default.png` (1200×630) | `app/layout.tsx` (ya referenciado) |
| G 404 | `public/illustrations/404.webp` (800×800) | `app/not-found.tsx` (crear) |
| JSON-LD | — | `ImageObject` de la organización sigue siendo el logo; las ilustraciones no entran al esquema |

Lo que NO cambia: tipografía Manrope, la tarjeta naranja de Henrry como único bloque de color, la estructura
de secciones, los textos.

## 5. Script de conversión

```bash
# en el repo, una vez descargados los PNG de Midjourney en ~/Downloads/mj/
npm i -D sharp
node -e '
const sharp=require("sharp"),fs=require("fs");
const jobs=[["hero-techo",960,1200],["icono-techos",256,256],["icono-pintura",256,256],["icono-plomeria",256,256],["mapa-valle",1200,800],["404",800,800]];
for(const [n,w,h] of jobs){ sharp(`${process.env.HOME}/Downloads/mj/${n}.png`).resize(w,h,{fit:"cover"}).webp({quality:82}).toFile(`public/illustrations/${n}.webp`).then(i=>console.log(n,Math.round(i.size/1024),"KB")); }
'
```
Para las portadas del blog: 1600×900 WebP calidad 80 y, aparte, 1200×630 PNG para OG.

## 6. Criterio de aceptación

- Las piezas se reconocen como de la misma familia a simple vista (misma línea, mismos tres colores).
- Ninguna imagen contiene texto, caras ni fotos simuladas.
- Home: LCP ≤ 2,5 s en móvil, peso total < 1,2 MB, Lighthouse rendimiento ≥ 95.
- El home sigue teniendo una sola «cosa» fuerte: la tarjeta naranja. Las ilustraciones acompañan, no compiten.
