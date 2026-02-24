# Ralph Loop — Perfeccionamiento EspinalServicios

## Baseline
- **Fecha**: 2026-02-24
- **Commit**: 4879b88 (fase 2: WhatsApp-first CTA hierarchy)
- **URL producción**: https://espinalservicios.com
- **Dominio**: espinalservicios.com + www.espinalservicios.com (alias set)

---

## R1 — SEO Domain Fix + www Redirect + Perf Consistency

### Hallazgos

| Prioridad | Síntoma | Causa | Validación |
|-----------|---------|-------|------------|
| P0 | canonical, og:url, og:image, sitemap, robots Host apuntan a `techos-espinal-landing.vercel.app` | `SITE_URL` en `lib/conversion.ts` es el subdominio Vercel | Cambiar a `https://espinalservicios.com`, rebuild, curl + grep canonical |
| P0 | Structured data `url` en page.tsx apunta a Vercel subdomain | Usa `SITE_URL` | Cascaded from fix above |
| P1 | www.espinalservicios.com no redirige a raíz (o viceversa) — ambos sirven 200 con contenido duplicado | No hay redirect configurado en Vercel/next.config | Agregar redirect en next.config.ts |
| P1 | Footer link "Sitio principal" apunta a Vercel subdomain | Usa `SITE_URL` | Cascaded from fix above |

### Cambios R1
1. `lib/conversion.ts` — `SITE_URL` → `https://espinalservicios.com`
2. `next.config.ts` — redirect www → raíz (301)

### Evidencia post-fix
- Build: OK
- curl canonical: espinalservicios.com ✓
- sitemap/robots: espinalservicios.com ✓
