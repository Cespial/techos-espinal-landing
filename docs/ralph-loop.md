# Ralph Loop — Perfeccionamiento EspinalServicios

## Baseline
- **Fecha**: 2026-02-24
- **Commit**: 4879b88 (fase 2: WhatsApp-first CTA hierarchy)
- **URL producción**: https://espinalservicios.com
- **Dominio**: espinalservicios.com + www.espinalservicios.com (alias set)

---

## R1 — SEO Domain Fix + www Redirect
**Commit**: 95182ee

| Prioridad | Fix |
|-----------|-----|
| P0 | `SITE_URL` → `https://espinalservicios.com` (cascades to canonical, og:url, og:image, sitemap, robots, structured data, footer) |
| P1 | www→root 301 redirect via next.config.ts `redirects()` |

**Verificación**: canonical ✓, sitemap ✓, robots ✓, www 308→root ✓

---

## R2 — Dead Imports + Counter CLS Fix
**Commit**: d6238ba

| Prioridad | Fix |
|-----------|-----|
| P1 | Remove unused `MessageCircle` import from ServiceTabs.tsx |
| P1 | Remove unused `LINE_OPTIONS` import from Testimonials.tsx |
| P2 | Fix SocialProofBar counter flicker: wrap setValue(0) + animation start in same rAF |

---

## R3 — Green Text Contrast + Focus Visible
**Commit**: ec266b8

| Prioridad | Fix |
|-----------|-----|
| P1 | `text-[#25D366]` (~2.5:1) → `text-[#15803d]` (~5.1:1) on outlined green buttons for WCAG AA |
| P1 | Add `focus-visible:ring-2` to escape hatch, FAQ inline CTAs, service card CTAs |

---

## R4 — Security Headers
**Commit**: (this cycle)

| Prioridad | Fix |
|-----------|-----|
| P1 | Add X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy via next.config.ts `headers()` |

---

## R5 — Font Variable Rename + Domain Binding
**Commit**: dbfce6a

| Prioridad | Fix |
|-----------|-----|
| P2 | Rename `--font-inter` → `--font-manrope` in layout.tsx + globals.css |
| P1 | Bind espinalservicios.com + www (308→root) to Vercel project via API — `vercel --prod` now auto-aliases |
| P1 | Remove redundant www redirect from next.config.ts (Vercel edge handles it) |

**Verificación**: `vercel --prod` output shows `Aliased: https://espinalservicios.com` ✓

---

## STOP — All items resolved
No remaining improvements without changing copys or strategy.
