# Soluciones comerciales: primera entrega

Fecha de contenido: 5 de octubre de 2026.

## Propósito y separación de intenciones

Las páginas de `/servicios/` mantienen la función de catálogo por oficio y cobertura. Las nuevas páginas de `/soluciones/` responden a un problema concreto, explican el alcance y orientan la cotización. Las guías del blog profundizan en información previa a la contratación. No se crean variantes de las cinco soluciones por cada municipio.

La prioridad comercial de esta entrega es Medellín y Bello, con cobertura del Valle de Aburrá. Las páginas enlazan las dos páginas locales existentes del oficio y la cobertura general, sin inventar sucursales ni oficinas.

| Ruta | Intención | Precio inicial obtenido del catálogo | Distinción editorial principal |
| --- | --- | --- | --- |
| `/soluciones/reparacion-goteras` | Cotizar una entrada de agua por la cubierta | Servicio `reparacion-goteras` | Arreglo de un punto frente a intervención de una superficie |
| `/soluciones/pintura-interior` | Cotizar paredes/cielos de vivienda o local | Servicio `pintura-interior` | Retoque, pared, habitación y apartamento no son el mismo alcance |
| `/soluciones/reparacion-fugas-agua` | Cotizar una fuga en tubería o conexión | Servicio `reparacion-fugas` | Localizar el origen frente a reparar un punto ya identificado |
| `/soluciones/impermeabilizacion-techos` | Evaluar una impermeabilización | Servicio `impermeabilizacion-cubiertas` | Reparación puntual frente a preparación y tratamiento por superficie |
| `/soluciones/destape-desagues` | Cotizar un desagüe obstruido | Servicio `destape-desagues` | Un punto frente a problemas recurrentes, varios puntos o reparación de red |

`/soluciones` reúne las cinco necesidades y explica cómo solicitar un presupuesto. El índice no compite deliberadamente con los pilares de techos, pintura o plomería: enlaza sus catálogos completos.

## Contenido y condiciones

Cada ficha aporta situaciones reconocibles, alcance a definir, trabajos que no se deben asumir incluidos, comparación de alternativas, factores del presupuesto, información para enviar por WhatsApp y cinco preguntas frecuentes. Las descripciones son propias de cada necesidad; la plantilla comparte solamente la estructura y algunos criterios comerciales generales.

- Los importes se leen de `SERVICE_DATA` durante el renderizado; no se mantiene otra lista de precios.
- La referencia de pintura o impermeabilización no se presenta como precio por metro cuadrado ni como valor de un inmueble completo.
- No se añaden años de experiencia, trabajos realizados, reseñas, fotografías reales, certificaciones ni revisión de Henrry que no hayan sido aportados.
- No se aseguran equipos, métodos, visitas el mismo día, atención permanente ni plazos o garantías generales. Los puntos que necesitan acuerdo quedan descritos como parte de la cotización.
- El material gráfico es la ilustración existente del oficio, con su texto alternativo explícito de ilustración. El índice utiliza la mesa de trabajo editorial existente.
- No se dan instrucciones para subir al techo, abrir paredes o manipular tuberías para pedir presupuesto. Se aceptan fotografías desde un sitio seguro y observaciones del usuario.
- Los enlaces a artículos existentes aportan continuidad, pero no convierten automáticamente sus afirmaciones en datos técnicos validados; su revisión editorial es otra parte de esta entrega de SEO.

## Implementación y API

`lib/solutions.ts` exporta:

- `SOLUTIONS`: colección editorial de las cinco soluciones.
- `Solution`: tipo de una ficha.
- `SOLUTIONS_UPDATED_AT`: fecha estable de actualización para el sitemap.
- `getSolutionBySlug(slug)`: búsqueda exacta; devuelve `undefined` si no existe.
- `getSolutionsByLine(linea)`: filtro por `ServiceLineId`.
- `getSolutionService(solution)`: referencia al servicio comercial existente; falla explícitamente si esa referencia desaparece.

`SolutionLinks` es un componente de servidor que acepta `linea?`, `excludeSlug?`, `heading?`, `intro?`, `tone?` e `id?`. Por defecto enlaza todas las soluciones; por línea enlaza las correspondientes. No renderiza una sección vacía cuando un filtro no tiene resultados. Cada instancia debe tener un `id` propio si se utiliza más de una vez en una misma página.

Las fichas usan Server Components, `generateStaticParams`, parámetros asíncronos, `dynamicParams = false` y `notFound`. Se incluyen título, descripción, canonical y versiones regionales auto-referentes; OG y Twitter reutilizan las imágenes de la identidad aprobada.

El JSON-LD `Service` vincula el proveedor con el `BUSINESS_ID` estable. Declara el Valle de Aburrá como área atendida y no inventa una dirección por municipio. No añade `Offer` con una tarifa o unidad que la referencia inicial no permite fijar. Las migas y las preguntas frecuentes utilizan los componentes existentes; el marcado FAQ no implica una promesa de resultados enriquecidos.

Los nuevos tipos de medición acordados son `solucion` y `soluciones_index`. Se mantienen los componentes de WhatsApp, llamada y barra móvil. El mensaje del hero, de precio y de cierre incluye la solución mediante `servicio`; los botones generales conservan el contexto del oficio.

## Verificación de esta parte

Completado por el autor de estas páginas:

- ESLint de `lib/solutions.ts`, `SolutionLinks.tsx` y ambas páginas: sin errores ni advertencias.
- Auditoría de las cinco fichas: slugs únicos, referencias de catálogo válidas, retorno vacío para slug desconocido y filtro por línea correcto.
- Las diez referencias a guías corresponden a slugs existentes.
- Las tres imágenes OG por oficio y las tres ilustraciones utilizadas existen.
- Las cinco fichas tienen alcance, exclusiones, factores de presupuesto y cinco FAQ cada una.
- Los títulos priorizan Medellín y Bello; el resto del Valle aparece como cobertura.
- `git diff --check`: sin errores al realizar esta revisión.

La comprobación se hizo con TypeScript transpileModule en memoria para leer la colección y compararla con `SERVICE_DATA` y el blog. No se añadió una dependencia ni se ejecutó un build concurrente.

Queda para la verificación integrada del release: build de Next.js, enlaces desde consumidores y sitemap, respuesta HTTP de rutas y 404, HTML y datos estructurados generados, medición comercial y revisión visual a 320 px. Estos puntos no se presentan como aprobados por esta revisión de código.

## Referencias de implementación

- [Next.js: generateStaticParams](https://nextjs.org/docs/app/api-reference/functions/generate-static-params), consultado para la generación estática y el tratamiento de parámetros no definidos.
- [Next.js: generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata), consultado para los metadatos de las fichas dinámicas.
- Fuente de servicios y precios: catálogo existente del repositorio, `lib/conversion.ts`; no se estimaron nuevos valores.

## Material pendiente de aportar

La siguiente mejora de contenido debe incorporar trabajos reales autorizados, fotos propias y condiciones comerciales confirmadas. No se insertan bloques vacíos de casos ni testimonios de ejemplo en producción. La nueva estructura permite añadir evidencia de cada solución cuando exista, sin multiplicar URLs locales genéricas.
