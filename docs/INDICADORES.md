# Indicadores de Espinal — revisión del 4 de octubre de 2026

## Cuentas verificadas en esta revisión

- Search Console: propiedad de dominio `espinalservicios.com` accesible. Sitemap existente correcto; leído el 4 de octubre, 69 páginas descubiertas antes de esta entrega. El nuevo sitemap contiene 73 URL indexables. Descubiertas no significa indexadas.
- GA4: propiedad **Espinal Multiservicios**, ID `557166289`; flujo `15983192441`; medición pública `G-SWZZ5QGHBB` instalada.
- Google Business Profile: existe una ficha, pendiente de verificación y todavía no visible públicamente. No crear otra. Henrry debe realizar la verificación física que solicite Google.

## Línea base real (ventanas distintas)

| Fuente | Periodo consultado | Observado |
|---|---|---|
| Search Console, búsqueda Web | 30-sep a 2-oct | 2 clics, 151 impresiones, CTR 1,3 %, posición media 4,9 |
| GA4 | 27-sep a 3-oct | 5 usuarios, 50 eventos, 0 eventos clave |
| Search Console, páginas | consulta 4-oct | informe todavía procesando datos |
| Experiencia de página | consulta 4-oct | sin datos suficientes de campo |

La posición media procede de una muestra pequeña y no demuestra liderazgo para todas las soluciones. Las cifras agregadas por página pueden diferir del total de la propiedad. No usar diagnósticos anteriores que decían que no existían cuentas.

## Medición de contactos

El sitio emite `cta_whatsapp_click` y `cta_call_click`. Ambos quedaron registrados en GA4 como eventos clave el 4-oct por el método **Crear con código**, sin regla que duplique el evento ya emitido. Recuento del evento clave: **una vez por sesión**. Sin valor monetario predeterminado. Los eventos brutos conservan el recuento de clics.

Un clic NO demuestra que se haya enviado un mensaje, completado una llamada o contratado. Una sesión que use ambos canales puede contabilizar ambos eventos clave; no sumar los dos para afirmar clientes únicos. Para tasa de intención usar la proporción de sesiones con al menos uno de los dos eventos, por canal de adquisición.

Parámetros controlados: `source`, `page_type`, `linea`, `municipio`, `servicio`. Los dos últimos usan slugs/IDs permitidos. No enviar nombre, teléfono del visitante, dirección, mensaje libre, ni texto del formulario. El teléfono del footer también registra su contexto. Ver `docs/seo/measurement-2026-10-05.md` para taxonomía y pruebas.

Registro de eventos clave confirmado en la interfaz. Medición mejorada y vistas ante cambios del historial confirmadas activas en la configuración; se conservaron sin añadir pageviews manuales. La recepción de los eventos de contacto, las dimensiones personalizadas y la ausencia de duplicados durante navegación real necesitan comprobación independiente: estar registrados no prueba recepción. El parámetro `?debug_mode=1` por sí solo no activa actualmente el modo depuración del sitio; no darlo por validado.

## Revisión semanal: 20 minutos

1. Search Console: comparar periodos completos equivalentes (28 días cuando existan); consultas sin marca, páginas de soluciones y Medellín/Bello por separado. Anotar clics e impresiones, sin objetivos de posición garantizados.
2. Indexación: revisar exclusiones y errores de las páginas que sí queremos posicionar. Legales noindex fuera del sitemap. No esperar que Google indexe todas las URL por tenerlas en un sitemap.
3. GA4: sesiones orgánicas y sesiones con contacto; distinguir pruebas internas y muestras pequeñas. Verificar recepción antes de interpretar cero como ausencia de interés.
4. Registro comercial: solicitudes reales → cotizaciones → trabajos confirmados. Duplicados entre canales se resuelven con ID interno, sin publicar datos personales.
5. Perfil de Google: verificar estado; una vez visible, rendimiento y reseñas reales. Solicitud neutral para todos los clientes atendidos, sin cuotas, estrellas mínimas, incentivos ni palabras prescritas.
6. Rendimiento: Core Web Vitals de campo cuando haya muestra (p75 LCP ≤2,5 s, INP ≤200 ms y CLS ≤0,1). Las mediciones locales no sustituyen datos reales.

## Decisiones al disponer de datos

- Impresiones relevantes sin clics: revisar intención, título y descripción antes de duplicar páginas.
- Clics sin contactos: revisar claridad de alcance, presupuesto, CTA y funcionamiento; no concluir con dos visitas.
- Contactos fuera de cobertura: revisar mensajes, zonas y condiciones de atención.
- Solicitudes que sí cierran: priorizar contenido de esa necesidad usando casos y fotografías reales autorizadas.
- Costos: herramientas gratuitas; presupuesto máximo acordado 100.000 COP/mes, sin compras ejecutadas en esta jornada.
