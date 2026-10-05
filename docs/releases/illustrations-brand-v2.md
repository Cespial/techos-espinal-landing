# Ilustraciones editoriales con la identidad Espinal 2.1

Integra las escenas de Midjourney ya seleccionadas para servicios, cobertura y equipo. Mantiene la firma, el favicon y los iconos SVG de la identidad 2.1. Las escenas son ilustraciones editoriales, no fotografías del equipo ni de trabajos realizados.

## Cambios

- 28 WebP recuperados de la selección de interiores: tres oficios, doce paisajes municipales en dos tamaños y una mesa de herramientas. Imágenes intrínsecamente dimensionadas, carga diferida y contacto antes de la imagen en móvil.
- Cinco PNG sociales estables y doce imágenes generadas por municipio comparten composición, logo vectorial maestro y fuentes locales. Regenerar con `node scripts/render-illustrated-og.mjs`; opcionalmente pasar una carpeta para las pruebas municipales. El manifiesto registra hashes de los cinco PNG.
- Doce portadas del blog pasan de 1.015.102 a 624.382 bytes (38,49 % menos), con 1200×675 píxeles. Índice nativo al comienzo del artículo en móvil; barra de contacto y CTA del contenido conservados.
- Encabezados repetidos del blog ahora tienen identificadores únicos. El primer destino conserva su URL, los siguientes reciben sufijos estables. Autorías coherentes con «Fundador y técnico principal».

## Comprobación local

- `npm run build`: 91 páginas/recursos generados, TypeScript correcto.
- `npm run lint`: 0 errores; advertencia previa `_args` en `lib/tracking.ts`.
- `node --test scripts/blog-headings.test.mjs`: 3 pruebas pasan. Revisión independiente de los 202 encabezados de los 12 artículos: sin duplicados ni diferencias entre índice y contenido.
- `BASE_URL=http://127.0.0.1:4175 node scripts/seo-diff.mjs compare docs/seo/baseline-2026-10-03.json`: 56 URLs conservan títulos/descripciones/H1, enlaces y JSON-LD.
- `node scripts/check-brand.mjs http://127.0.0.1:4175`: 12 rutas y 45 activos correctos, mismos contactos y metadatos de marca.
- Comparación de los 68 HTML de la compilación anterior: mismas páginas, títulos, descripciones, canónicas, H1 y destinos de contacto. IDs únicos y destinos de anclas presentes.
- Navegador integrado: escritorio 1280, móvil 320/390 y tablet 768; ilustraciones, cobertura, equipo y blog. Apertura/cierre del índice con teclado, foco visible y navegación a un encabezado repetido. Sin nuevos errores de consola en la sesión revisada.

No se añaden dependencias, formularios, animaciones ni funciones de servidor. Las fotos reales de Henrry/trabajos siguen pendientes. No se ha repetido Lighthouse ni se ha hecho prueba específica en Safari/Firefox; reducción de bytes no equivale a una mejora medida de LCP.
