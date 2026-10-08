# Pulido visual · octubre 2026 — estado al 8-oct

## Qué quedó en producción
| PR | Qué aportó |
|---|---|
| #5 (3-oct) | Sistema visual: tokens por rol, borde por línea arreglado, una escala de títulos, legales con cabecera, accesibilidad, `scripts/seo-diff.mjs` |
| #8 (4-oct) | Marca «Emblema de oficio» v2.1: paleta `#B94B24`, logo, favicons, `public/brand/` |
| #9 (5-oct) | Ilustraciones del set 2 en interiores, `/cobertura`, `/nosotros`, OG ilustrados (`scripts/render-illustrated-og.mjs`), blog a 68ch con índice plegable |
| #10–#14 (5-oct) | `/soluciones`, Barbosa, validación de eventos en `lib/tracking.ts`, tests en `scripts/*.test.mjs`, `llms.txt` comprobado |

Los PR #6 y #7 se cerraron el 8-oct: los cubrió el #9 y chocaban con la marca v2.1 y con la validación de eventos.

## Cómo comprobar que el SEO no retrocede
```
BASE_URL=https://espinalservicios.com node scripts/seo-diff.mjs capture docs/seo/baseline-AAAA-MM-DD.json   # antes
npm run build && npx next start -p 3077 &
node scripts/seo-diff.mjs compare docs/seo/baseline-AAAA-MM-DD.json                                       # después
```
Las URLs salen del sitemap. Línea base vigente: `docs/seo/baseline-2026-10-08.json` (77 URLs).

## Medición en `main` (8-oct)
Lighthouse móvil local del artículo «Cómo arreglar una gotera»: rendimiento, accesibilidad y SEO 100, LCP 1,4 s.

## Pendiente
- Viñeta propia de Barbosa: hoy `lib/illustrations.ts` y el OG de cobertura usan `mapa-valle` y `og-fondo` de relleno.
- Fotos reales de Henrry y de trabajos (`OWNER.photo`, `RECENT_WORK`). Nunca fotos simuladas.
