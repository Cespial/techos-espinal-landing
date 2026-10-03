# Indicadores — espinalservicios.com

Revisión semanal (viernes, 15 minutos). Una fila por semana en la hoja de Henrry; aquí, qué mirar y dónde.

## Cómo se mide la conversión

El sitio emite **dos eventos** a GA4 desde `lib/tracking.ts`, siempre a través de `WaButton` y `CallButton`:

| Evento | Cuándo | Parámetros |
|---|---|---|
| `cta_whatsapp_click` | clic en cualquier botón o enlace de WhatsApp | `source`, `page_type`, `linea`, `municipio`, `servicio` |
| `cta_call_click` | clic en cualquier botón de llamada | `source`, `page_type`, `linea`, `municipio` |

`source`: hero, header, sticky_bar, fab, service_card, process, owner, trust, coverage, faq, composer, final_cta,
footer, blog_inline, blog_sticky, blog_banner, emergency. `page_type`: home, servicio, servicio_municipio,
cobertura, cobertura_index, nosotros, blog, blog_index, legal.

### Estado de la configuración (hecho el 3-oct-2026 con la cuenta cristianjosue07@gmail.com)
- GA4: cuenta «Cristian Espinal» → propiedad **Espinal Multiservicios** (ID de propiedad 557166289), flujo web
  `espinalservicios.com` (ID 15983192441), **ID de medición `G-SWZZ5QGHBB`**, ya cargado como `NEXT_PUBLIC_GA_ID`
  en Vercel (Production) y desplegado: el HTML en vivo carga gtag.
- Search Console: propiedad de dominio `espinalservicios.com` **verificada** por registro TXT en el DNS de
  Vercel (`google-site-verification=0CnyjqpCP-…`, no borrar). Sitemap `https://espinalservicios.com/sitemap.xml`
  enviado. GA4 vinculado con Search Console.
- Pendiente en GA4: marcar `cta_whatsapp_click` y `cta_call_click` como **eventos clave** (Admin → Eventos →
  estrella) cuando aparezcan en la lista, es decir, tras fusionar el PR #3 y recibir los primeros clics.
  Comprobar antes en Admin → DebugView abriendo el sitio con `?debug_mode=1`.
- Clarity: sin cuenta Microsoft; opcional.

## Tabla semanal

| KPI | Fuente | Meta 90 días |
|---|---|---|
| Impresiones y clics orgánicos (28 días) | Search Console → Rendimiento | +20 % mes a mes |
| Posición media: «espinal multiservicios», «reparación de techos envigado», «plomero sabaneta», «pintores bello» | Search Console → Rendimiento → Consultas | marca #1; municipios top 10 |
| Páginas indexadas | Search Console → Páginas | 69 de 69 |
| Sesiones por canal | GA4 → Adquisición de tráfico | — |
| Clics a WhatsApp y llamada, por `page_type` y `source` | GA4 → Interacción → Eventos | identificar las 5 páginas que más convierten |
| Tasa de conversión = eventos clave ÷ sesiones | GA4 → Exploración | ≥ 8 % |
| Visitas sin bloqueadores | Vercel → Analytics | si GA4 < 60 % de Vercel, hay bloqueo alto |
| LCP p75 móvil | Vercel → Speed Insights | ≤ 2,5 s |
| Vistas de la ficha, llamadas, clics al sitio | Google Business Profile → Rendimiento | — |
| Reseñas: número y promedio | Google Business Profile → Reseñas | 15 reseñas en 60 días, ≥ 4,7 |
| Chats → cotizaciones → trabajos cerrados | Hoja de Henrry (a mano) | cerrar el embudo que GA4 no ve |

## Línea base (3 de octubre de 2026)
- Search Console: sin propiedad. GA4: sin ID en producción. Ficha de Google: no existe.
- Google: la marca ya sale primera con enlaces de sitio. «reparación de techos Envigado»: mapa con negocios de 1, 35 y 0 reseñas; el sitio no aparece.
- Lighthouse móvil local tras el rediseño: home 93–98 rendimiento, LCP 2,4–2,5 s; cruzada 100, LCP 1,7 s. Causa del NO_FCP anterior: animación de opacidad del `body`, ya retirada en producción.
