# espinalservicios.com

Sitio de **Espinal Multiservicios**, el negocio de techos, pintura y plomería a domicilio de **Henrry Espinal**
en Medellín y 11 municipios de Antioquia. Next.js 16 (App Router) + React 19 + Tailwind v4, desplegado en Vercel
(`main` = producción).

## Estructura

- `app/page.tsx` — home (server component).
- `app/servicios/[linea]` y `app/servicios/[linea]/[municipio]` — 3 líneas × 12 municipios.
- `app/cobertura` y `app/cobertura/[municipio]` — índice y páginas por municipio (OG dinámico).
- `app/nosotros` — perfil de Henrry (ProfilePage + Person).
- `app/blog` — guías y precios (`lib/blog-data.ts`).
- `app/resena`, `app/maps` — enlaces cortos a la ficha de Google (env vars).
- `components/local/*` — secciones compartidas; `WaButton` y `CallButton` son los únicos emisores de conversión.
- `lib/business.ts` (entidad y JSON-LD), `lib/owner.ts` (Henrry), `lib/seo-data.ts` (títulos, perfiles, FAQ),
  `lib/conversion.ts` (servicios, precios, mensajes de WhatsApp), `lib/tracking.ts` (GA4).

## Desarrollo

```bash
npm install
cp .env.example .env.local   # rellenar lo que exista
npm run dev
npm run build && npm run lint
```

## Documentos

- `docs/SEO-PLAN-2026-10-02.md` — diagnóstico, plan y checklist del negocio (ficha de Google, Search Console, fotos).
- `docs/INDICADORES.md` — eventos, configuración de GA4 y tabla semanal de indicadores.
- `docs/seo/` — líneas base de resultados en Google.
