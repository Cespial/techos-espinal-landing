# Medición comercial: 5 de octubre de 2026

## Contrato implementado

Los clics propios de contacto se envían a la cola de GA4 como `cta_whatsapp_click` y `cta_call_click`. Cada activación del handler registra un evento. El objeto conservado en `dataLayer` es `arguments`, conforme al contrato del snippet de `gtag.js`; puede encolarse antes de cargar el script remoto. La integración de eventos no añade pageviews manuales. Durante la revisión de cuenta, ambos nombres se registraron como eventos clave mediante «Crear con código», sin regla derivada, sin importe predeterminado y una vez por sesión. Ver docs/INDICADORES.md para la línea base y los límites de esta comprobación.

Un clic indica intención de contacto: no demuestra que se haya enviado un mensaje, atendido una llamada, recibido una cotización ni cerrado un trabajo. Esos hitos se concilian con el registro comercial del negocio.

| Parámetro permitido | Valores |
| --- | --- |
| `source` | Posición controlada del CTA: hero, header, sticky_bar, fab, service_card, process, owner, trust, coverage, faq, composer, final_cta, footer, blog_inline, blog_sticky, blog_banner, emergency |
| `page_type` | home, servicio, servicio_municipio, cobertura, cobertura_index, nosotros, blog, blog_index, solucion, soluciones_index, legal |
| `linea` | techos, pintura, plomeria, general |
| `municipio` | Slug conocido de los 13 municipios atendidos, o general |
| `servicio` | ID estable de una de las 24 prestaciones; se omite si no se reconoce |

La normalización central aplica a WhatsApp, botones de llamada, formulario y teléfono del footer. Medellín/MEDELLÍN/medellin se agrupan en `medellin`; Itagüí en `itagui`; La Estrella en `la-estrella`. Los valores desconocidos de municipio y línea pasan a `general`. Los nombres comerciales del catálogo se traducen a IDs; los textos de servicio desconocidos se omiten. Un source o page_type no permitido descarta el evento.

La función no copia propiedades del objeto de entrada: nombres, teléfonos, correos, texto del problema, contexto libre y campos añadidos accidentalmente quedan fuera del payload y del registro de consola. Tampoco se envía el pathname como parámetro personalizado. Esta restricción corresponde a estos eventos propios; no es una auditoría completa de todos los datos automáticos que GA4 pueda recoger.

## Teléfono del footer

`FooterPhone` mantiene `tel:`, el texto y el estilo actuales, y usa el pathname de Next para atribuir la llamada a su tipo de página, línea y municipio cuando estos se conocen. No carga datos del blog ni el contenido comercial de soluciones. No envía `servicio` desde el footer; en artículos, índices y páginas sin municipio, la dimensión es `general`.

El clic sigue abriendo el manejador telefónico nativo. La medición no cancela el evento ni espera a la red. Si Analytics está bloqueado o falla, el handler absorbe el error.

## Verificación

```sh
node --test scripts/tracking.test.mjs
```

La prueba verifica el contrato `arguments`, un evento por invocación, valores normalizados, exclusión de datos libres, errores de Analytics y contexto del footer. No emite llamadas ni mensajes y no depende de credenciales.

La validación de navegador debe comprobar el payload de un clic mediante instrumentación local, sin llamar a clientes ni enviar mensajes. La recepción de eventos y las dimensiones en GA4 requieren revisión adicional de la propiedad y su configuración; una cola local correcta no prueba la recepción remota.

Para mantener la taxonomía, toda incorporación de municipios o prestaciones deberá actualizar las listas compactas de `lib/tracking.ts`. El dato histórico con mayúsculas/nombres antiguos permanecerá en GA4: la normalización aplica desde este despliegue.
