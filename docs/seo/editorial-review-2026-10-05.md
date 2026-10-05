# Revisión editorial de las doce guías de Espinal

Fecha de ejecución: 5 de octubre de 2026 UTC (noche del 4 de octubre en Colombia). Archivo intervenido: `lib/blog-data.ts`. Revisión de contenido y fuentes; no equivale a una revisión técnica presencial de Henrry ni a una certificación de los trabajos descritos.

## Resultado

Se revisaron y reescribieron las doce guías existentes manteniendo sus doce slugs, fechas de publicación, autor, cargo e imágenes. Se actualizaron sus descripciones, cinco títulos que necesitaban eliminar afirmaciones o mejorar legibilidad, y tiempos de lectura. `updatedAt` refleja esta revisión real, no un cambio automático al desplegar.

La prioridad es que el contenido permita decidir qué información recoger, qué se necesita revisar, qué puede incluir el trabajo y cómo comparar una propuesta. Se conservaron los precios base ya publicados en `SERVICE_DATA` y se identificaron como referencias propias; no se atribuyen a un estudio del mercado ni se afirma que incluyen materiales, área o equipos que no están documentados.

Se retiraron recetas químicas, instrucciones para subir al techo o colocar plásticos con pesos, porcentajes de eficacia sin fuente, rangos comerciales no respaldados, plazos de vida útil universales, diagnósticos por apariencia y afirmaciones de experiencia o resultados no acreditados. Las referencias de fabricantes ilustran la necesidad de consultar un producto específico; no certifican que Espinal lo utiliza ni establecen una relación comercial.

## Cambios por URL

| Slug conservado | Corrección principal | Enlace comercial |
|---|---|---|
| `como-arreglar-gotera-techo` | Medidas desde zona segura; retirada de subida al techo, plásticos con ladrillos y reparación “definitiva”; causas como hipótesis, no diagnóstico | Goteras, impermeabilización, fugas |
| `precio-pintar-apartamento-medellin` | Retirados rangos por apartamento, incremento del 20–40 %, diferencial por galón y periodicidad universal; área de piso distinta del área de paredes; cotización detallada | Pintura interior |
| `fuga-agua-pared-como-detectar` | Señales no concluyentes; precaución eléctrica; detección visible distinta de oculta; retirado secado universal de 24–48 h y precios de aperturas inventados | Fugas de agua |
| `impermeabilizacion-techos-medellin-precios` | Retiradas duraciones y tarifas genéricas por tecnología; soporte, tránsito, sistema y mantenimiento; ejemplos de ficha técnica identificados | Impermeabilización, goteras |
| `humedad-paredes-causas-soluciones` | Separación de posibles causas; retirada de diagnóstico por altura/color y prescripción automática de barrera química; diferencia entre acabado y remediación especializada | Fugas, goteras, pintura interior |
| `preparar-casa-temporada-lluvias-medellin` | Lista segura; prioridad por señales; eliminadas promesas de prevención total y precios no coincidentes con catálogo | Goteras, destapes |
| `cuanto-cobra-plomero-medellin-precios` | Mantiene ocho precios base del catálogo; elimina supuestos rangos de mercado y descalificación por precio; distingue visita y diagnóstico | Fugas, destapes |
| `destape-canerias-medellin-metodos-precios` | Retira agua hirviendo, bombeo indiscriminado, recetas, potencias y alcances de equipos; no presume cámara/hidrojet propios; declara qué informar si se usó un químico | Destapes |
| `como-quitar-moho-paredes-definitivamente` | URL conservada; título deja de prometer solución definitiva; retira el 82 % de eficacia de vinagre y recetas; EPA/CDC y límites de alcance | Fugas, goteras, pintura/acabados |
| `tipos-tejas-casas-colombia-comparativa` | Comparación por criterios del producto; retirados precios de materiales y décadas de vida útil sin fuente; precaución en cubierta antigua de composición desconocida | Goteras |
| `segunda-temporada-lluvias-valle-aburra-revisar-techo` | Fuente histórica SIATA identificada, no presentada como pronóstico 2026; retira causas generalizadas por municipio e informe con fotos no acreditado | Goteras, impermeabilización |
| `cuanto-cuesta-impermeabilizar-techo-envigado-sabaneta-itagui` | Retira tablas inventadas de área/precio/duración y afirmaciones por barrio; organiza tres situaciones hipotéticas identificadas como tales | Impermeabilización, goteras |

## Títulos modificados

- Pintura: se conserva la pregunta principal y se elimina el año como supuesto aval de precios de mercado.
- Plomería: “Precios reales” pasa a “Precios de referencia”.
- Moho: “de forma definitiva” pasa a “Cómo tratar el moho en paredes y evitar que reaparezca”; la URL histórica se mantiene.
- Segunda temporada: se simplifica el título largo sin alterar el tema ni la URL.
- Impermeabilización del sur: se acorta y elimina el año; no se afirman rangos verificados de 2026.

Las doce imágenes sociales se revisaron visualmente: son ilustraciones sin títulos, cifras, precios ni promesas incrustadas. Las doce miden 1200 × 630 y conservan sus archivos y hashes locales; no requieren regeneración. Su origen en Git es el commit `9f1b418` (ilustraciones, portadas y OG del blog). No existe `app/blog/[slug]/opengraph-image.tsx`: la página declara estas imágenes estáticas y obtiene el título y la descripción OG/Twitter de `post.title` y `post.metaDescription`.

También se comprobaron tarjetas del listado, artículos relacionados, breadcrumbs, botones de compartir y JSON-LD. Todos leen los campos actualizados del artículo; no hay un segundo excerpt hardcodeado con las promesas retiradas. Los slugs históricos que contienen “definitivamente” se mantienen como URL para evitar una migración innecesaria, no como promesa editorial.

Un contraste HTTP de hashes encontró transferencias parciales y reinicios de conexión en esta sesión. Se detuvo sin alterar archivos: la confirmación de producción corresponde al integrador. La conclusión de no regenerar se basa en los doce originales locales inspeccionados y en que no han cambiado respecto al historial.

## Fuentes primarias consultadas

Consulta: 5 de octubre de 2026 UTC. Los enlaces relevantes aparecen junto al consejo al que dan soporte. La tabla registra su alcance para evitar extenderlos a afirmaciones que no respaldan.

| Fuente | Soporte utilizado | Límite |
|---|---|---|
| [EPA: Mold Cleanup in Your Home](https://www.epa.gov/mold/mold-cleanup-your-home) | Corregir agua, secar, no pintar sobre moho; superficie dura frente a porosa; referencia aproximada de 10 ft² (0,93 m²) | El tamaño no garantiza que sea seguro limpiarlo ni es una certificación de Espinal |
| [EPA: Should I use bleach to clean up mold?](https://www.epa.gov/mold/should-i-use-bleach-clean-mold) | No recomendar cloro como práctica rutinaria; no mezclar limpiadores; retirar el moho, no solo inactivarlo | No proporciona una receta universal ni avala productos caseros |
| [CDC: Clinical Guidance after a Severe Weather Event](https://www.cdc.gov/asthma/hcp/clinical-guidance/index.html) | Evitar exposición en asma, enfermedad pulmonar o inmunosupresión; niños fuera de tareas de limpieza | Consejos de salud generales; no diagnóstico ni tratamiento de pacientes |
| [EPA: Protect Your Family from Exposures to Asbestos](https://www.epa.gov/asbestos/protect-your-family-exposures-asbestos) | Apariencia no confirma asbesto; no perforar/lijar/cortar ni muestrear por cuenta propia | No se trasladan reglas jurídicas estadounidenses a Colombia; no se atribuye capacidad de retiro a Espinal |
| [Sika Colombia: SikaFill-12 Power, ficha técnica](https://col.sika.com/content/dam/dms/co01/d/sikafill_-12_power.pdf) | Soporte, sistema, refuerzos y diferencia entre tránsito habitual y mantenimiento | Ejemplo de un producto concreto, sin prometer duración universal o uso por Espinal |
| [Sika Colombia: SikaFill-50 Universal](https://col.sika.com/es/construccion/impermeabilizacion/impermeabilizacion-espacios-exteriores/cubiertas-terrazas/sikafill-50-universal.html) | Inspecciones de película y desagües; mantenimiento del sistema específico | Sin extrapolar frecuencia ni rendimiento a todo recubrimiento |
| [Pintuco: Viniltex Baños y Cocinas](https://www.pintuco.com.co/productos/pintura-viniltex-banos-y-cocinas/) | Requisitos de preparación y aplicación específicos | No se repiten porcentajes sanitarios del fabricante ni se convierte una pintura en arreglo de filtración |
| [SC Johnson: Drano Max Gel](https://drano.com/en-us/products/clogs/max-gel-clog-remover) | No combinar productos ni usar sopapa durante/después de su aplicación por riesgo de salpicadura | No se recomienda comprarlo ni se generalizan materiales compatibles de esa fórmula |
| [EPM: revista julio-diciembre 2022](https://comercializadorenergia.epm.com.co/content/dam/epm/institucional/documentos/epm-noticias/revista-epm-julio-diciembre-2022.pdf) | Observación del medidor sin consumo para orientar búsqueda de fugas | Sin manipular medidor, sin prometer localización exacta |
| [SIATA: segunda temporada, publicación de 2021](https://siata.gov.co/sitio_web/index.php/noticia18) | Referencia estacional septiembre–noviembre | No se presenta su pronóstico de 2021 como pronóstico actual |
| [SIATA: portal oficial](https://siata.gov.co/portalWeb) | Destino para información y alertas vigentes | No se inventa alerta activa ni clima esperado por municipio |

## Integridad y pruebas

- Se comprobaron los doce objetos de contenido contra `HEAD`: `slug`, `publishedAt`, `author`, `authorRole`, `ogImage`, `featuredImage` y `featuredImageAlt` conservados.
- Todos los `relatedSlugs` existen y los `relatedServiceIds` corresponden al catálogo de 24 prestaciones.
- Corregidos `revision-presion-agua` → `revision-presion`, `mantenimiento-tuberias` → `mantenimiento-red-interna` y `revision-techo` → `revision-puntos-criticos`.
- Marked analiza los doce cuerpos. Los 125 encabezados generan IDs únicos por artículo y ninguno introduce un H1 dentro del cuerpo.
- Cada artículo incluye al menos un enlace a las cinco soluciones acordadas. La comprobación HTTP de esos destinos depende de la integración y el build global.
- Las tres pruebas de `scripts/blog-headings.test.mjs` pasan.
- ESLint sobre `lib/blog-data.ts` sin errores.
- No se ejecutó un build concurrente ni se modificaron dependencias. El build global, el rastreo de enlaces y la revisión visual corresponden al integrador antes de publicar.

La prueba puntual de importación de `conversion.ts` con Node no pudo resolver su importación sin extensión a `coverage-areas`. Se rehízo la comprobación de IDs extrayendo únicamente el bloque real `SERVICE_DATA`, sin cambiar código por una limitación del runner; la verificación editorial pasó. Esto no indica un fallo del build Next.js.

## Datos que necesita aportar o confirmar Henrry

1. Vigencia de los 24 precios base, mínimos de intervención, materiales incluidos y condiciones de desplazamiento.
2. Diferencia comercial entre visita para cotizar y diagnósticos del catálogo; cualquier cobro debe informarse antes de agendar.
3. Equipos disponibles para fugas ocultas, destapes e inspección, y qué servicios se remiten a terceros.
4. Productos y sistemas usados realmente, fichas técnicas actuales y criterios de preparación.
5. Alcance y condiciones de garantía de cada intervención, sin sustituirlas por plazos genéricos.
6. Fotos reales, casos y presupuestos anonimizados con permiso de uso. No se añadieron casos, testimonios ni experiencia inventada.
7. Revisión técnica humana del contenido que sigue firmado por el autor histórico. Esta intervención no añade un sello “validado por Henrry”.

Estas confirmaciones permitirán aumentar precisión y evidencia propia. Mientras faltan, el texto evita convertir suposiciones en promesas.
