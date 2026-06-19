# Diagnóstico SEO — Espinal Multiservicios
**Sitio:** https://espinalservicios.com · **Fecha:** 2026-06-19 · **Método:** auditoría multi-agente (8 dimensiones)

## Resumen ejecutivo

El SEO técnico de espinalservicios.com está muy por encima del promedio para un negocio local de servicios a domicilio: tiene metadataBase + title templates + canonical por página + hreflang es-CO/x-default, cobertura JSON-LD amplia y bien formada (WebSite/Organization/HomeAndConstructionBusiness/Service/LocalBusiness/FAQPage/BreadcrumbList/BlogPosting), sitemap completo de 66 rutas sin huérfanas, robots.ts que admite bots de IA, llms.txt consistente, 36 cross-pages servicio×municipio con intros únicas (no thin content), Core Web Vitals sólidos (Lighthouse 0.96, CLS 0) y una base de accesibilidad correcta (lang, skip link, focus-visible, landmarks). Dicho esto, hay cuatro gaps críticos que sabotean lo construido: (1) las reseñas son inventadas/hardcodeadas y se emiten con aggregateRating usando jobsCompleted (350) como ratingCount con solo 3 reseñas reales, lo que arriesga acción manual de Google y la pérdida de TODOS los rich results del dominio; (2) no existe ni un enlace al Google Business Profile, la señal #1 del Local Pack para un negocio que vive de búsquedas "cerca de mí"; (3) todas las imágenes OG por sección/artículo son SVG que WhatsApp/Facebook/LinkedIn/X NO renderizan, y las páginas de cobertura y cross-pages (el activo de captación local) ni siquiera declaran imagen, así que compartir cualquier enlace no muestra preview; (4) el home, la página de mayor autoridad, no pasa link equity rastreable a las 3 páginas de servicio, 12 de municipio ni 36 cross-pages porque ServiceTabs y CoverageAvailability son interactivos sin un solo <Link>. Por encima de esto hay deuda de marca: el logo es un monograma genérico "EM", el favicon es el stock de Next.js y no hay foto real de equipo ni de trabajos. La prioridad es retirar/corregir el schema de reseñas (riesgo legal-SEO), crear y enlazar el GBP, tejer el internal linking desde el home y sustituir los OG por JPG/PNG reales.

## Scorecard por dimensión

| Nota | Dimensión | Estado |
|:--:|---|---|
| **B** | Metadata & Head | Base excelente (canonical, hreflang, templates, JSON-LD); cae por OG en SVG y favicon stock. |
| **D** | Favicon, Icons & PWA | Solo favicon.ico stock; faltan icon.svg, apple-icon, 192/512, maskable y manifest; theme-color blanco genérico. |
| **C** | Structured Data (JSON-LD) | Cobertura amplia y de calidad, pero aggregateRating con ratingCount falso (riesgo de penalización) la frena. |
| **A** | Crawlability (robots/sitemap/llms.txt) | 66 rutas sin huérfanas, bots IA permitidos, llms.txt consistente; solo lastModified=build. |
| **B** | On-Page & Contenido | H1 único, alt y anchors correctos; falla el internal linking desde el home (P0) y NAP visible incompleto. |
| **C** | Local SEO | 36 cross-pages diferenciadas y geo correcto, pero sin GBP enlazado y con reseñas inventadas en schema. |
| **A** | Performance / Core Web Vitals | Lighthouse 0.96, CLS 0, TBT 10ms; solo afinar LCP 2.8s y borrar 3.5MB de assets muertos. |
| **B** | Accesibilidad (a11y) | Cimientos sólidos (skip link, focus, landmarks, labels); refinamientos en menú móvil inert y errores de form. |
| **D** | Assets sociales y marca | OG en SVG invisibles, logo monograma genérico, cero fotos reales; comparte mal y transmite poca confianza. |

## 🔴 P0 — Críticos (sabotean el SEO ya construido)

### 1. Reseñas inventadas: aggregateRating usa jobsCompleted (350) como ratingCount con solo 3 reseñas reales  · `⌨️ código`
- **Dónde:** app/page.tsx:48-64 (ratingCount: SOCIAL_PROOF_STATS.jobsCompleted), lib/conversion.ts:378-453 (TESTIMONIAL_DATA = 3 reviews), app/cobertura/[municipio]/page.tsx:115-120, app/servicios/[linea]/[municipio]/page.tsx:127-132, app/nosotros/page.tsx:118-123
- **Fix:** Es el hallazgo más serio: declarar 350 valoraciones (que son trabajos, no reseñas) más Review con autores/fechas inventados en 36+ páginas es exactamente lo que Google penaliza con acción manual y retiro de rich results de TODO el dominio. Acción inmediata: retirar el bloque aggregateRating + Review del JSON-LD en page.tsx, cobertura, cross-pages y nosotros. Mantener los testimonios solo como HTML visible. Reintroducir el rating únicamente cuando provenga de reseñas verificables reales (idealmente del Google Business Profile), nunca usando jobsCompleted como ratingCount.

### 2. No existe ninguna referencia ni CTA al Google Business Profile (señal #1 del Local Pack)  · `⌨️ código`
- **Dónde:** app/layout.tsx:134-137 (sameAs), components/sections/FaqFooter.tsx, components/blog/BlogFooter.tsx, app/cobertura/[municipio]/page.tsx
- **Fix:** Para un negocio que vive de 'cerca de mí' el GBP es la señal #1 para Maps y el Local Pack; sin él no aparece por mucho schema que haya. Crear el perfil como service-area business para los 12 municipios y enlazarlo: (a) URL del perfil (g.page/...) + 'Ver en Google Maps' + 'Dejar reseña en Google' en FaqFooter y BlogFooter; (b) añadir esa URL al array sameAs del Organization en layout.tsx y al LocalBusiness de cada página de municipio. Definir la URL en lib/conversion.ts para reutilizarla.

### 3. El home no enlaza de forma rastreable a servicios, municipios ni cross-pages (link equity atrapado)  · `⌨️ código`
- **Dónde:** components/sections/ServiceTabs.tsx (0 <Link>), components/sections/CoverageAvailability.tsx (0 <Link>, verificado), components/sections/FaqFooter.tsx (footer solo /servicios/techos y /cobertura/medellin), lib/conversion.ts:11 (NAV_LINKS solo anclas #servicios/#cobertura)
- **Fix:** La página de mayor autoridad no pasa equity a /servicios/[linea] (3), /cobertura/[municipio] (12) ni a las 36 cross-pages porque tabs y mapa son JS sin <Link>. (a) En ServiceTabs añadir <Link href='/servicios/{slug}'>Ver todo sobre {linea}</Link> por línea; (b) en CoverageAvailability renderizar <Link href='/cobertura/{slug}'> para los 12 municipios (lista HTML en servidor, no solo markers JS); (c) ampliar el footer de FaqFooter para listar las 3 líneas y municipios clave; (d) añadir entradas reales a /servicios y /cobertura en NAV_LINKS.

### 4. OG images por sección/artículo en SVG: invisibles en redes sociales  · `🎨 DISEÑO`
- **Dónde:** public/blog/placeholder-{techos,pintura,plomeria,hogar,servicios}.svg, referenciados en lib/blog-data.ts (10 ogImage) y lib/seo-data.ts (3 ogImage de SERVICE_LINE_SEO); consumidos en app/blog/[slug]/page.tsx:44 y app/servicios/[linea]/page.tsx:45
- **Fix:** WhatsApp, Facebook, LinkedIn y X NO renderizan OG en SVG (requieren JPG/PNG/WebP); hoy compartir cualquier servicio o post no muestra imagen. Sustituir los 5 SVG por JPG/PNG 1200x630 reales y actualizar las rutas .svg→.jpg en lib/blog-data.ts y lib/seo-data.ts. Solución superior: generar OG dinámicos por página con next/og (ImageResponse) vía app/.../opengraph-image.tsx, que produce PNG válidos con título + marca automáticamente.

### 5. Páginas de cobertura y cross-pages servicio×municipio sin imagen OG (SEO local sin preview)  · `🎨 DISEÑO`
- **Dónde:** app/cobertura/[municipio]/page.tsx:39-50 y app/servicios/[linea]/[municipio]/page.tsx:45-61 (generateMetadata, ambos sin campo images, verificado)
- **Fix:** Son las landings de captación local (12 cobertura + 36 cross = 48 URLs) y declaran twitter.card 'summary_large_image' pero sin imagen, así que al compartir en WhatsApp no aparece tarjeta. Next.js NO hereda openGraph.images del layout cuando el hijo define su propio bloque openGraph. Solución ideal: añadir opengraph-image dinámico (next/og) que renderice 'Techos, pintura y plomería en {Municipio}' + logo + teléfono. Mínimo viable: añadir openGraph.images y twitter.images con un JPG 1200x630 de marca.

## 🟠 P1 — Importantes

### 1. Falta el set moderno de iconos: icon.svg, apple-icon, 192/512 PWA y maskable  · `🎨 DISEÑO`
- **Dónde:** app/icon.svg, app/apple-icon.png, public/icon-192.png, public/icon-512.png, public/icon-maskable-512.png (ninguno existe; verificado: solo app/favicon.ico)
- **Fix:** Crear app/icon.svg (favicon vectorial), app/apple-icon.png (180x180, fondo sólido #ea580c sin transparencia), public/icon-192.png e icon-512.png (fondo #ea580c) e icon-maskable-512.png (logo en safe-zone ~60% central). Sin esto iOS muestra un screenshot borroso al guardar en inicio y Android no tiene icono al instalar. Next.js inyecta icon.svg/apple-icon automáticamente.

### 2. No existe web app manifest: el sitio no es instalable como PWA  · `⌨️ código`
- **Dónde:** app/manifest.ts (no existe, verificado)
- **Fix:** Crear app/manifest.ts (MetadataRoute.Manifest): name 'Espinal Multiservicios', short_name 'Espinal', start_url '/', display 'standalone', background_color '#FFFFFF', theme_color '#ea580c', lang 'es-CO', icons 192/512 + maskable. Next.js lo sirve en /manifest.webmanifest y enlaza <link rel=manifest> automáticamente. Para un negocio local móvil-first mejora retención y profesionalismo.

### 3. Favicon es el default genérico de Next.js, no la marca  · `🎨 DISEÑO`
- **Dónde:** app/favicon.ico (MS Windows icon 16x16+32x32; tamaño idéntico al stock de create-next-app)
- **Fix:** Regenerar favicon.ico desde el logo de marca naranja (#ea580c) incluyendo tamaños 16/32/48 para nitidez en pestañas de alta densidad y resultados de Google. Hoy es el icono de Next.js, no de Espinal.

### 4. sameAs no apunta a perfiles sociales reales (auto-referencia + wa.me)  · `⌨️ código`
- **Dónde:** app/layout.tsx:134-137 (sameAs solo SITE_URL y wa.me)
- **Fix:** wa.me no es un perfil social válido para sameAs y la auto-referencia al propio dominio no aporta. Reemplazar por URLs reales de Google Business Profile (mayor impacto local), Facebook, Instagram, TikTok, LinkedIn. Si no existen perfiles, crearlos con NAP consistente. Definir las URLs en lib/conversion.ts y reutilizarlas en Organization y en los LocalBusiness de municipio.

### 5. Falta priceRange en todos los LocalBusiness/HomeAndConstructionBusiness  · `⌨️ código`
- **Dónde:** app/page.tsx (HomeAndConstructionBusiness), app/cobertura/[municipio]/page.tsx:94, app/nosotros/page.tsx:104, providers de servicios (grep priceRange = 0 en todo el repo)
- **Fix:** Añadir priceRange (p.ej. '$$') a los nodos LocalBusiness del home, cobertura y a los provider de servicios. Es campo recomendado por Google para LocalBusiness, aparece en el knowledge panel y en el Local Pack. Hay basePrice real por servicio, así que el rango es defendible.

### 6. openingHours solo está en el home, falta en cobertura y nosotros  · `⌨️ código`
- **Dónde:** openingHoursSpecification solo en app/page.tsx:35-47; ausente en app/cobertura/[municipio]/page.tsx:94-122 y app/nosotros/page.tsx:104-143
- **Fix:** Añadir el mismo openingHoursSpecification (Lun-Sáb 07:00-18:00, dato ya canónico) al LocalBusiness de cada página de cobertura y al mainEntity de nosotros: son las páginas que más se indexan para 'servicio + municipio' y deben llevar el horario completo del NAP.

### 7. Entidades JSON-LD no se encadenan con @id (nodos isla, no grafo)  · `⌨️ código`
- **Dónde:** Único @id en app/blog/[slug]/page.tsx:104; layout.tsx (WebSite/Organization), page.tsx (HomeAndConstructionBusiness), cobertura (LocalBusiness) y Service.provider sin @id
- **Fix:** Asignar @id estables (SITE_URL+'#organization', '#website', '#localbusiness') y cruzar referencias: WebSite.publisher→{@id:#organization}; Service.provider y Article.publisher→{@id:#organization} en vez de re-declarar el objeto completo. Consolida las señales de entidad en lugar de duplicar nodos inconexos en cada página.

### 8. Falta página índice /cobertura; el breadcrumb la simula con /cobertura/medellin  · `⌨️ código`
- **Dónde:** app/cobertura/ (solo [municipio], verificado), app/cobertura/[municipio]/page.tsx:84 (item apunta a /cobertura/medellin)
- **Fix:** Crear app/cobertura/page.tsx como hub que liste los 12 municipios (enlaces internos + mapa), incluirla en sitemap.ts y apuntar el breadcrumb item de nivel 2 a ${SITE_URL}/cobertura. Hoy el breadcrumb 'Cobertura' apunta a una hoja (/cobertura/medellin), lo que confunde la jerarquía. Refuerza arquitectura de enlaces y da una landing geográfica.

### 9. NAP visible incompleto en el home: falta ciudad y horario en texto  · `⌨️ código`
- **Dónde:** components/sections/FaqFooter.tsx:101-165 (footer del home muestra Name y Phone, no ciudad ni horario), comparar app/nosotros/page.tsx:354-360
- **Fix:** Para SEO local el NAP debe ser visible y consistente, no solo en schema. Añadir en el footer del home 'Medellín, Antioquia, Colombia' + horario de atención (07:00-18:00, idéntico al openingHoursSpecification de page.tsx). Como service-area business sin local físico es válido omitir la calle, pero ciudad+horario deben aparecer en texto crawleable.

### 10. areaServed de la home solo lista 3 entradas genéricas, no los 12 municipios  · `⌨️ código`
- **Dónde:** app/page.tsx:29 (areaServed: ['Medellín','Valle de Aburrá','Antioquia'])
- **Fix:** Desaprovecha la señal de cobertura. La página /nosotros ya lo hace bien mapeando MUNICIPALITY_OPTIONS a objetos {@type:'City'}. Replicar en la home: areaServed con los 12 municipios como City importando MUNICIPALITY_SEO/MUNICIPALITY_OPTIONS.

### 11. Cross-pages: meta descriptions y 2 de 3 FAQs casi idénticas entre municipios de la misma línea  · `⌨️ código`
- **Dónde:** lib/seo-data.ts:415-458 (CROSS_PAGE_FAQS) y :481-482 (metaDescription por template)
- **Fix:** El intro por par sí es único (MUNICIPALITY_INTROS) y mitiga el thin content, pero la metaDescription se genera por plantilla idéntica salvo el municipio, y las 3 FAQs por línea solo cambian {municipio} con precios idénticos: es near-duplicate a escala de 36 URLs. Variar la metaDescription con un gancho del intro/clima local por municipio y rotar/añadir 1 FAQ específica del municipio para diferenciar el bloque FAQPage.

### 12. Video del hero compite con el LCP (2.8s) y hay 3.5MB de asset huérfano  · `⌨️ código`
- **Dónde:** components/sections/Hero.tsx:44-56 + public/video/hero-main.mp4 (1.2MB); public/media/Subtle_isometric_parallax_*.mp4 (3.5MB, no referenciado, verificado) + roof-before.svg/roof-after.svg huérfanos
- **Fix:** El <video autoPlay fetchPriority=high> compite con el poster (que pinta el LCP). Quitar fetchPriority='high' del video, bajar el bitrate del mp4 a ~700-800kbps (ffmpeg -crf 30) y/o servir un .webm VP9. Borrar public/media/Subtle_isometric_parallax_*.mp4 (3.5MB de peso muerto en cada deploy) y los SVG roof-before/after huérfanos.

### 13. Menú móvil oculto sigue enfocable por teclado (no usa inert/hidden)  · `⌨️ código`
- **Dónde:** components/sections/StickyHeader.tsx:98-147 y botón hamburguesa:81
- **Fix:** El menú móvil se colapsa con max-h-0+opacity-0 pero permanece en el orden de tabulación cuando está cerrado. Añadir inert={!isMobileMenuOpen || undefined} (o hidden) al contenedor, y aria-expanded + aria-controls en el botón hamburguesa.

### 14. Mensaje de error del formulario no asociado al campo (a11y)  · `⌨️ código`
- **Dónde:** components/sections/AppointmentScheduler.tsx:107-119 (input) y 163-171 (error tras el submit)
- **Fix:** El input usa aria-invalid pero el <p role=alert> se renderiza al final del form sin aria-describedby. Dar id al párrafo (id='nombre-error') y referenciarlo con aria-describedby en el input; mover el mensaje justo debajo del campo Nombre para que el orden visual y de lectura coincidan.

## 🟡 P2 — Refinamientos

### 1. theme-color es blanco genérico en vez del naranja de marca  · `⌨️ código`
- **Dónde:** app/layout.tsx:73 (viewport.themeColor: '#FFFFFF', verificado)
- **Fix:** Cambiar themeColor a '#ea580c' para teñir la barra de URL en Chrome Android y la barra de estado en PWA con el naranja de marca. Debe coincidir con el theme_color del manifest.

### 2. OG image del home es 1280x720 declarado erróneamente como 1600x900  · `🎨 DISEÑO`
- **Dónde:** app/layout.tsx:40-41,52 (declara width 1600/height 900; el JPG real public/video/slow-majestic-poster.jpg es 1280x720)
- **Fix:** Corregir width/height a 1280/720, o mejor sustituir por un OG de marca dedicado 1200x630 (ratio 1.91:1) con logo, 'Espinal Multiservicios', servicios (Techos · Pintura · Plomería), ciudad y teléfono. El poster de video genérico no comunica el negocio al compartir.

### 3. Inconsistencia de coordenadas geo entre meta tags y schema del home  · `⌨️ código`
- **Dónde:** app/layout.tsx:88-89 (6.2518;-75.5636) vs app/page.tsx:26-27 (6.2442,-75.5812) (verificado)
- **Fix:** Las coordenadas difieren entre el geo meta tag y el GeoCoordinates del LocalBusiness. Unificar a un único par canónico definido en lib/conversion.ts o lib/coverage.ts y referenciarlo en ambos sitios.

### 4. lastModified del sitemap usa new Date() (hora de build) salvo en blog  · `⌨️ código`
- **Dónde:** app/sitemap.ts líneas 18,24,32,41,46,56,62,68
- **Fix:** Solo blogEntries usa fecha real (post.updatedAt); el resto usa new Date(), que se reescribe en cada build aunque el contenido no cambie y degrada la fiabilidad del lastmod. Definir una fecha real de última edición por sección (campo en SERVICE_LINE_SEO/MUNICIPALITY_SEO/CROSS_PAGE_SEO o fecha estática de despliegue) y usarla. Para términos/privacidad la fecha real de revisión legal.

### 5. Logo es un monograma genérico 'EM' que alimenta el schema Organization  · `🎨 DISEÑO`
- **Dónde:** public/logo-espinal.svg (293 bytes, rect naranja con 'EM'); usado en StickyHeader, FaqFooter, BlogHeader/Footer y app/layout.tsx:120 (logo de Organization)
- **Fix:** El logo lee como template/AI y no como marca de techos. Diseñar identidad real (wordmark + glifo de techo/casa) y derivar de ahí TODO el set de iconos. Google recomienda un logo rasterizado PNG ≥112x112 para el rich result de Organization, así que exportar también PNG.

### 6. Faltan keywords en páginas de servicio/cobertura/cruzadas  · `⌨️ código`
- **Dónde:** app/servicios/[linea]/page.tsx, .../[municipio]/page.tsx, app/cobertura/[municipio]/page.tsx
- **Fix:** Bajo impacto (Google ignora meta keywords) pero por consistencia: añadir keywords:[data.targetKeyword, ...data.secondaryKeywords] en cada generateMetadata, datos ya disponibles en seo-data.ts. Opcional.

### 7. Descripción y cuerpo de /terminos solo mencionan 'techos'  · `⌨️ código`
- **Dónde:** app/terminos/page.tsx (metadata.description y body)
- **Fix:** La description y el cuerpo solo dicen 'reparaciones de techos' pero el negocio cubre techos, pintura y plomería. Ampliar para reflejar las 3 líneas. Inconsistencia menor de copy.

### 8. Densidad de contenido baja en cross-pages vs estándar de landing local  · `⌨️ código`
- **Dónde:** app/servicios/[linea]/[municipio]/page.tsx:203-376 (1 párrafo intro + grid de precios + 3 FAQs)
- **Fix:** Suficiente para no ser thin gracias al intro único, pero por debajo del estándar que rankea. Añadir 2-3 párrafos de contenido específico (señales/causas comunes en el municipio, materiales según clima del intro) o una sección 'Cómo trabajamos en {municipio}'. No bloqueante; sube el techo de las 36 URLs.

### 9. Contenedor del mapa con aria-label pero sin rol semántico  · `⌨️ código`
- **Dónde:** components/sections/CoverageMap.tsx:188-192
- **Fix:** El <div> lleva aria-label pero un div genérico no expone rol, así que algunos lectores lo ignoran. Añadir role='application' o role='img'. Corregir además 'Medellin/Aburra'→'Medellín/Aburrá' en el aria-label.

### 10. Tabs de servicios sin navegación por flechas (patrón WAI-ARIA Tabs incompleto)  · `⌨️ código`
- **Dónde:** components/sections/ServiceTabs.tsx:80-104
- **Fix:** El tablist usa role=tab/aria-selected/aria-controls correctamente pero no implementa roving tabindex ni ArrowLeft/Right/Home/End. Solo el tab activo con tabIndex=0, los demás -1, y manejar onKeyDown. Funciona con Tab/clic hoy; mejora la conformidad.

### 11. Estado 'Copiado' de compartir no se anuncia a lectores de pantalla  · `⌨️ código`
- **Dónde:** components/blog/ShareButtons.tsx:38-49
- **Fix:** Al copiar solo cambia el icono visualmente. Añadir un span aria-live='polite' visualmente oculto con 'Enlace copiado' cuando copied===true, o actualizar el aria-label del botón a 'Enlace copiado' en ese estado.

### 12. Video hero en autoplay sin respetar prefers-reduced-motion  · `⌨️ código`
- **Dónde:** components/sections/Hero.tsx:43-56; app/globals.css:393-424
- **Fix:** La regla prefers-reduced-motion mata la animación CSS pero el <video autoPlay loop> sigue reproduciéndose. Detectar prefers-reduced-motion con matchMedia y, si está activo, no autoreproducir (mostrar el poster) o pausar el video.

### 13. Falta preconnect/dns-prefetch a mapbox, GTM y Clarity  · `⌨️ código`
- **Dónde:** app/layout.tsx:91-92 (solo preconnect a wa.me); CoverageMap.tsx, GoogleAnalytics.tsx, MicrosoftClarity.tsx
- **Fix:** Bajo impacto y gratis: dns-prefetch a www.googletagmanager.com y clarity.ms en el head; inyectar preconnect a api.mapbox.com cuando el mapa entra en viewport (no en el head global, que gastaría conexión temprano). El preconnect actual a wa.me es de bajo valor (solo se navega tras click) y se puede quitar.

### 14. Author de BlogPosting es Organization en vez de Person (E-E-A-T)  · `⌨️ código`
- **Dónde:** app/blog/[slug]/page.tsx:80-110
- **Fix:** Si el autor del post es una persona, usar @type Person en vez de Organization para mejor atribución E-E-A-T. Mejora menor.

### 15. Falta lista HTML server-side de los 12 municipios como fallback del mapa  · `⌨️ código`
- **Dónde:** components/sections/CoverageMap.tsx (markers JS client-only, depende de NEXT_PUBLIC_MAPBOX_TOKEN)
- **Fix:** Los markers del mapa son JS y no aportan texto indexable; si falta el token solo se ve 'No fue posible cargar el mapa'. Renderizar en servidor una lista HTML de los 12 municipios junto al mapa para que la señal geográfica sea crawleable sin depender de Mapbox. (Esto se resuelve junto con el P0 de internal linking desde el home.)

## Quick wins solo-código (ejecutables en paralelo, sin diseño)

- **Retirar aggregateRating + Review del JSON-LD (riesgo de penalización)** — `app/page.tsx:48-64, app/cobertura/[municipio]/page.tsx:115-120, app/servicios/[linea]/[municipio]/page.tsx:127-132, app/nosotros/page.tsx:118-123` — Eliminar los bloques aggregateRating y Review del schema en estas 4 plantillas (mantener testimonios solo como HTML). Nunca usar SOCIAL_PROOF_STATS.jobsCompleted como ratingCount. Es el quick win de mayor impacto: protege la elegibilidad de todos los rich results del dominio.
- **Crear app/manifest.ts (PWA)** — `app/manifest.ts (nuevo)` — Exportar MetadataRoute.Manifest con name/short_name/start_url/display:'standalone'/background_color:'#FFFFFF'/theme_color:'#ea580c'/lang:'es-CO' e icons 192/512 + maskable. Next.js lo sirve en /manifest.webmanifest y enlaza automáticamente.
- **Cambiar themeColor a naranja de marca** — `app/layout.tsx:73 (viewport.themeColor)` — Cambiar '#FFFFFF' por '#ea580c' para que coincida con el theme_color del manifest y tiña la barra de URL en Chrome Android.
- **Corregir dimensiones del OG default** — `app/layout.tsx:40-41 (width 1600/height 900)` — Ajustar a width:1280/height:720 (dimensión real del JPG) hasta tener el OG de marca 1200x630.
- **Añadir <Link> rastreables desde el home a servicios y municipios** — `components/sections/ServiceTabs.tsx, components/sections/CoverageAvailability.tsx, components/sections/FaqFooter.tsx, lib/conversion.ts:11 (NAV_LINKS)` — Renderizar <Link href='/servicios/{slug}'> por línea y <Link href='/cobertura/{slug}'> por municipio (lista HTML server-side), ampliar el footer y añadir entradas reales a /servicios y /cobertura en NAV_LINKS.
- **Crear app/cobertura/page.tsx (índice de cobertura) + sitemap + breadcrumb** — `app/cobertura/page.tsx (nuevo), app/sitemap.ts, app/cobertura/[municipio]/page.tsx:84` — Crear el hub que lista los 12 municipios, añadirlo a sitemap.ts y cambiar el breadcrumb item de nivel 2 de /cobertura/medellin a ${SITE_URL}/cobertura.
- **Añadir priceRange y openingHours a LocalBusiness de cobertura/nosotros/home** — `app/page.tsx, app/cobertura/[municipio]/page.tsx:94, app/nosotros/page.tsx:104` — Añadir priceRange:'$$' y el openingHoursSpecification (Lun-Sáb 07:00-18:00) ya definido en page.tsx a los LocalBusiness que no lo tienen.
- **Expandir areaServed de la home a los 12 municipios** — `app/page.tsx:29` — Reemplazar ['Medellín','Valle de Aburrá','Antioquia'] por los 12 municipios como objetos {@type:'City'} importando MUNICIPALITY_SEO/MUNICIPALITY_OPTIONS, como ya hace /nosotros.
- **Unificar coordenadas geo (single source of truth)** — `app/layout.tsx:88-89 (6.2518) vs app/page.tsx:26-27 (6.2442)` — Definir un único par de coordenadas en lib/conversion.ts/lib/coverage.ts y referenciarlo en el geo meta tag y en el GeoCoordinates del LocalBusiness.
- **Encadenar entidades JSON-LD con @id** — `app/layout.tsx (WebSite/Organization), app/page.tsx, app/cobertura/[municipio]/page.tsx, app/servicios/*` — Asignar @id estables (#organization, #website, #localbusiness) y referenciarlos desde Service.provider, Article.publisher y WebSite.publisher en vez de re-declarar objetos completos.
- **Reemplazar sameAs con perfiles reales (GBP, redes)** — `app/layout.tsx:134-137, lib/conversion.ts` — Quitar la auto-referencia y wa.me; añadir URLs reales de Google Business Profile, Facebook, Instagram, TikTok. Definirlas en lib/conversion.ts y reutilizarlas en Organization y LocalBusiness.
- **Borrar assets huérfanos (3.5MB + SVG muertos)** — `public/media/Subtle_isometric_parallax_202602230825_igd1n.mp4 (3.5MB), public/media/roof-before.svg, public/media/roof-after.svg` — Eliminar; no están referenciados en ningún .tsx/.ts (grep confirmado). Peso muerto en cada deploy.
- **Optimizar LCP del hero** — `components/sections/Hero.tsx:44-56` — Quitar fetchPriority='high' del <video> para que no compita con el poster (que pinta el LCP); recomprimir hero-main.mp4 a ~700-800kbps con ffmpeg -crf 30 y opcionalmente añadir <source> webm VP9.
- **Añadir lastModified reales al sitemap** — `app/sitemap.ts líneas 18,24,32,41,46,56,62,68` — Sustituir new Date() por fechas de última edición reales por sección (constante o campo en SEO data); términos/privacidad con la fecha real de revisión legal.
- **Ampliar description y body de /terminos a las 3 líneas** — `app/terminos/page.tsx` — Cambiar 'reparaciones de techos' por techos, pintura y plomería en la meta description y el cuerpo para reflejar el negocio real.
- **Fixes a11y: menú móvil inert, error de form, aria-live copiado, rol del mapa, tabs por flechas** — `components/sections/StickyHeader.tsx:98-147, components/sections/AppointmentScheduler.tsx:107-171, components/blog/ShareButtons.tsx:38-49, components/sections/CoverageMap.tsx:188-192, components/sections/ServiceTabs.tsx:80-104, components/sections/Hero.tsx:43-56` — Añadir inert al menú móvil cerrado + aria-expanded/aria-controls; asociar el error del form con aria-describedby; aria-live='polite' en 'Enlace copiado'; role='img'/'application' + tildes en aria-label del mapa; roving tabindex + ArrowLeft/Right en los tabs; pausar/no autoplay del video con prefers-reduced-motion.
