# Pulido visual · octubre 2026 — estado

Plan completo en `~/.claude/plans/https-espinalservicios-com-quiero-salir-cheerful-raven.md` (v4). Resumen de lo ejecutado el 3-oct-2026.

## Principios
1. Una sola cosa fuerte por página: la tarjeta naranja de Henrry. Las ilustraciones acompañan en crema y tinta.
2. Tres fondos y un ritmo: blanco → crema (`--color-paper`) → slate-50, nunca dos iguales seguidos.
3. Tres radios: `rounded-xl` controles, `rounded-2xl` tarjetas, `rounded-3xl` marcos de ilustración y tarjeta naranja; chips `rounded-full`.
4. Una escala tipográfica (Manrope): H1 interior `3xl→4xl→5xl` bold; H2 `3xl→4xl` semibold; H3 `xl` bold; secundario `sm` slate-600.
5. Toda imagen cuenta algo del lugar o del oficio. Nunca fotos simuladas; las reales van en `lib/owner.ts`.
6. El SEO no retrocede: `node scripts/seo-diff.mjs compare docs/seo/baseline-2026-10-03.json` antes de cada merge.

## Fases
| Fase | PR | Estado |
|---|---|---|
| A · Sistema (tokens, borde por línea, tipografía, radios, legales, a11y) | #5 | fusionado en `main` |
| B · Set 2 de ilustraciones (16 piezas, Midjourney v8.2 + style ref) | — | en `public/illustrations/` y `assets/og/`; hoja: `docs/seo/visual-2026-10/set2-elegidas.png` |
| C · Interiores (PageHero, LocalZones, ServiceGrid, /cobertura, /nosotros, composer, JSON-LD) | #6 | abierto, revisar preview |
| D · Open Graph ilustrado + blog | #7 (sobre #6) | abierto |

## Medición (Lighthouse móvil local, 3-oct)
| URL | Rend. | A11y | SEO | LCP |
|---|---|---|---|---|
| / | 100 | 100 | 100 | 1,4 s |
| /servicios/techos/envigado | 98 | 100 | 100 | 2,4 s |
| /cobertura/envigado | 97 | 100 | 100 | 2,5 s |
| /nosotros | 98 | 100 | 100 | 2,5 s |
| /cobertura | 98 | 100 | 100 | 2,4 s |
| /blog/como-arreglar-gotera-techo | 92 | 100 | 100 | 3,4 s |

## Pendiente
- Blog: LCP 3,4 s en móvil (no es por el peso de la portada; revisar el render de la imagen `priority` y la hidratación de `TableOfContents`).
- Fotos reales de Henrry y del equipo (`OWNER.photo`, `RECENT_WORK`).
- Reseñas de Google en `TrustSignals` cuando exista la ficha verificada.
- Capturas antes/después completas en `docs/seo/visual-2026-10/` (hoy: móvil de cruzada y blog, OG de raíz/línea/municipio, hoja del set 2).
