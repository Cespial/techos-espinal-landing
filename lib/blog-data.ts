import type { ServiceLineId } from "./conversion";

/* ------------------------------------------------------------------ */
/*  TYPES                                                              */
/* ------------------------------------------------------------------ */

export type BlogCategory = "techos" | "pintura" | "plomeria" | "hogar" | "guias";

export type BlogPost = {
  slug: string;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  category: BlogCategory;
  serviceLines: ServiceLineId[];
  relatedServiceIds: string[];
  publishedAt: string;
  updatedAt: string;
  author: string;
  authorRole: string;
  ogImage: string;
  featuredImage: string;
  featuredImageAlt: string;
  readingTimeMinutes: number;
  isFeatured: boolean;
  relatedSlugs: string[];
  targetMunicipalities: string[];
  body: string;
  tags: string[];
};

/* ------------------------------------------------------------------ */
/*  CATEGORIES                                                         */
/* ------------------------------------------------------------------ */

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  techos: {
    label: "Techos y cubiertas",
    description: "Goteras, impermeabilización y mantenimiento de techos",
  },
  pintura: {
    label: "Pintura y acabados",
    description: "Pintura interior, exterior y tratamiento de paredes",
  },
  plomeria: {
    label: "Plomería",
    description: "Fugas, desagües y reparaciones hidráulicas",
  },
  hogar: {
    label: "Hogar",
    description: "Consejos generales de mantenimiento del hogar",
  },
  guias: {
    label: "Guías y precios",
    description: "Guías de precios y comparativas para tu proyecto",
  },
};

/* ------------------------------------------------------------------ */
/*  ARTICLES                                                           */
/* ------------------------------------------------------------------ */

export const BLOG_POSTS: BlogPost[] = [
  /* ---- ARTICLE 1 ---- */
  {
    slug: "como-arreglar-gotera-techo",
    title: "Cómo arreglar una gotera en el techo: guía completa",
    metaDescription: "Qué hacer ante una gotera, cómo orientar la revisión y qué reparaciones pueden corresponder. Precios base de Espinal en Medellín y Bello.",
    targetKeyword: "como arreglar gotera en el techo",
    secondaryKeywords: [
      "reparar gotera techo",
      "gotera en el techo que hacer",
      "arreglar filtración techo",
      "goteras en casa",
    ],
    category: "techos",
    serviceLines: ["techos"],
    relatedServiceIds: ["reparacion-goteras", "impermeabilizacion-cubiertas", "sellado-fisuras"],
    publishedAt: "2026-02-15",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-como-arreglar-gotera-techo.png",
    featuredImage: "/blog/como-arreglar-gotera-techo.webp",
    featuredImageAlt: "Reparación de gotera en techo de casa en Medellín",
    readingTimeMinutes: 4,
    isFeatured: true,
    relatedSlugs: ["impermeabilizacion-techos-medellin-precios", "humedad-paredes-causas-soluciones", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["goteras", "techos", "reparación", "impermeabilización"],
    body: `## Qué hacer cuando aparece una gotera

Una gotera requiere encontrar por dónde entra el agua antes de escoger el arreglo. La mancha interior no siempre está debajo del punto de entrada: el agua puede recorrer la cubierta y salir por una junta o por el cielo raso.

Mientras consigues una revisión, recoge el goteo con un recipiente y aparta objetos únicamente si puedes hacerlo sin exponerte. **No subas al techo durante la lluvia ni para colocar plásticos, ladrillos o selladores.** Si el cielo raso está abombado, se desprende material o el agua alcanza una instalación eléctrica, aléjate y evita el acceso a esa zona. No manipules interruptores ni tableros mojados.

## Causas que conviene revisar

### Tejas, fijaciones y traslapos

Una pieza rota, una fijación deteriorada o un encuentro mal resuelto pueden permitir el paso del agua. El arreglo puede ser puntual, pero antes hay que comprobar el estado de las piezas cercanas y las condiciones de acceso.

### Uniones con paredes, tubos y otras cubiertas

Estos encuentros necesitan detalles compatibles con los materiales existentes. Aplicar cualquier silicona sobre una superficie sucia o un sellado que ya se desprende puede ocultar temporalmente el problema sin resolverlo.

### Canales y bajantes

El rebose durante la lluvia puede relacionarse con residuos, conexiones defectuosas o problemas de evacuación. Limpiar es una posibilidad; no siempre basta si el recorrido o la descarga necesitan corrección.

### Sistema impermeabilizante deteriorado

Ampollas, desprendimientos o roturas justifican una evaluación. La edad por sí sola no indica que haya que retirar todo el sistema: también importan el producto, la aplicación, el mantenimiento y el estado del soporte.

## Qué puedes observar desde un lugar seguro

- Cuándo aparece: con lluvia suave, con viento o incluso en días secos.
- Dónde empieza la mancha y si ha aumentado.
- Si se devuelve agua por un canal visible desde el suelo.
- Si hubo una reparación o intervención reciente.
- Si existen fotos anteriores de la cubierta o de la humedad.

Estas pistas orientan la revisión; una foto no confirma por sí sola el origen ni la seguridad de la estructura. Si la humedad aparece sin lluvia, también puede ser necesario descartar una [fuga en la tubería](/soluciones/reparacion-fugas-agua).

## Reparación puntual o impermeabilización

| Hallazgo que debe comprobarse | Trabajo que podría corresponder |
|---|---|
| Una pieza dañada y cubierta vecina en buen estado | Cambio puntual de teja |
| Falla localizada en un encuentro | Preparación y sellado compatible |
| Residuos en canales o bajantes | Limpieza y revisión de la descarga |
| Deterioro distribuido del sistema | Evaluación de impermeabilización |
| Deformación o daño del soporte | Revisión especializada antes de intervenir |

Una gotera visible no permite elegir el trabajo automáticamente. En la [reparación de goteras](/soluciones/reparacion-goteras) explicamos el alcance y qué información enviar. Si hace falta un sistema más amplio, consulta la [impermeabilización de techos](/soluciones/impermeabilizacion-techos).

## Precios de referencia de Espinal

Estos son precios base publicados en nuestro catálogo, no un promedio del mercado ni una cotización de tu techo:

| Servicio | Desde |
|---|---|
| Reparación de goteras | $180.000 COP |
| Sellado de fisuras y juntas | $210.000 COP |
| Cambio puntual de teja | $190.000 COP |
| Limpieza de canales y bajantes | $150.000 COP |
| Protección contra goteras en el techo | $350.000 COP |

El valor depende del acceso, la extensión, los materiales y las reparaciones previas. Antes de aceptar, confirma por escrito qué incluye el precio, qué se cobra aparte y las condiciones de garantía. Consulta también las condiciones de visita y diagnóstico; no son necesariamente el mismo servicio.

## Cómo preparar la solicitud en Medellín o Bello

Envíanos el municipio, el barrio, una foto tomada desde un sitio seguro y cuándo ocurre el goteo. Indica si se trata de una casa, apartamento, local o cubierta común de un edificio. Con esa información podemos coordinar la atención y explicar los siguientes pasos.

Revisa nuestros servicios de [techos en Medellín](/servicios/techos/medellin), [techos en Bello](/servicios/techos/bello) y la [cobertura completa](/cobertura). Para prevenir nuevas filtraciones, conserva el registro del arreglo y acuerda el mantenimiento según el sistema instalado.`,
  },

  /* ---- ARTICLE 2 ---- */
  {
    slug: "precio-pintar-apartamento-medellin",
    title: "¿Cuánto cuesta pintar un apartamento en Medellín?",
    metaDescription: "Precio base de pintura interior de Espinal en Medellín, factores del presupuesto y qué pedir en una cotización de apartamento. Alcance y materiales.",
    targetKeyword: "cuanto cuesta pintar apartamento Medellín",
    secondaryKeywords: [
      "precio pintar apartamento",
      "costo pintura interior Medellín",
      "valor pintar casa Medellín 2026",
      "pintor apartamento precio",
    ],
    category: "guias",
    serviceLines: ["pintura"],
    relatedServiceIds: ["pintura-interior", "resanes-acabados", "estuco-pulido"],
    publishedAt: "2026-02-10",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-precio-pintar-apartamento-medellin.png",
    featuredImage: "/blog/precio-pintar-apartamento-medellin.webp",
    featuredImageAlt: "Pintura interior de apartamento en Medellín",
    readingTimeMinutes: 4,
    isFeatured: true,
    relatedSlugs: ["humedad-paredes-causas-soluciones", "como-quitar-moho-paredes-definitivamente", "como-arreglar-gotera-techo"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["pintura", "precios", "apartamento", "Medellín"],
    body: `## Cuánto cuesta pintar un apartamento en Medellín

El catálogo de Espinal publica **pintura interior desde $280.000 COP**. Es un precio base de servicio: no significa que pintar un apartamento completo cueste ese valor. El presupuesto total depende de la superficie que se va a pintar, su estado, los productos y el alcance acordado.

No contamos con un estudio de precios del mercado para presentar un promedio confiable por apartamento o por metro cuadrado. Para comparar propuestas, conviene medir lo mismo y separar preparación, materiales y aplicación.

## Los metros cuadrados del apartamento no son los metros a pintar

El área del piso y el área de paredes son distintas. Dos apartamentos de 60 m² pueden tener diferentes alturas, divisiones, ventanas y superficies por intervenir. También cambia el presupuesto si se incluyen cielos rasos, puertas o rejas.

Para preparar una cotización, registra cada espacio y su alcance:

| Espacio | Superficies | Estado y observaciones |
|---|---|---|
| Sala y comedor | Paredes; indicar si incluye techo | Color actual, manchas y resanes |
| Habitaciones | Paredes de cada habitación | Muebles que deben protegerse o moverse |
| Cocina y baños | Solo áreas que se pintarán | Vapor, grasa o humedad por revisar |
| Puertas y elementos adicionales | Material y cantidad | Se cotizan con preparación y acabado propios |

La tabla sirve para levantar información, no para calcular una tarifa sin revisar el lugar.

## Qué cambia el precio

### Preparación de las paredes

Los huecos, las zonas sueltas y los acabados deteriorados requieren trabajo antes de pintar. Si hay humedad activa, primero debe aclararse su origen. Un presupuesto de repinte sobre una pared estable no es comparable con otro que incluya resanes extensos.

### Producto y acabado

Pide el nombre exacto del producto y el acabado. Que una pintura sea lavable no significa que corrija una filtración. La ficha de [Viniltex Baños y Cocinas de Pintuco](https://www.pintuco.com.co/productos/pintura-viniltex-banos-y-cocinas/) describe requisitos de preparación y aplicación para ese producto; no deben extrapolarse a todas las pinturas.

### Color y cobertura

Cambiar de un color muy oscuro a uno claro, usar distintos acabados o pintar una superficie de absorción desigual puede exigir preparación adicional. El número de capas y los tiempos entre aplicaciones deben responder al producto y al resultado necesario, no a una promesa universal.

### Acceso y uso de la vivienda

La altura, los muebles, los horarios de la copropiedad y la posibilidad de trabajar por habitaciones influyen en la organización. Confirma cómo quedarán protegidos los espacios y cuándo podrán volver a utilizarse según las indicaciones del fabricante.

## Qué pedir en la cotización

1. Espacios y superficies incluidos, con medidas cuando corresponda.
2. Resanes, limpieza y preparación que se realizarán.
3. Marca, referencia, color y acabado de la pintura.
4. Materiales aportados por cada parte.
5. Protección de muebles, pisos y elementos que no se pintan.
6. Limpieza final, manejo de residuos y plazo estimado.
7. Precio total, exclusiones y condiciones de garantía por escrito.

No supongas que mover muebles pesados, corregir filtraciones o pintar puertas está incluido si no aparece en la propuesta.

## Referencias del catálogo de Espinal

| Servicio | Precio base desde |
|---|---|
| Pintura interior | $280.000 COP |
| Resanes y acabados | $210.000 COP |
| Alisado de paredes | $240.000 COP |
| Tratamiento de humedad en paredes | $250.000 COP |

Son referencias de servicios diferentes. No deben sumarse automáticamente ni interpretarse como precio por m². La combinación y el valor final se definen según el trabajo; pregunta también por las condiciones de visita o diagnóstico antes de agendar.

## Si hay humedad, resuélvela antes del acabado

Una pared con manchas puede necesitar una intervención distinta de la pintura. Consulta la guía de [humedad en paredes](/blog/humedad-paredes-causas-soluciones) para preparar la revisión. Pintar encima de una causa activa puede hacer que el deterioro reaparezca.

## Cómo solicitar un presupuesto

Envíanos fotos generales y de los detalles, municipio, barrio, áreas que quieres pintar y si el inmueble está habitado. En la página de [pintura interior](/soluciones/pintura-interior) encontrarás el alcance del servicio. También puedes consultar [pintura en Medellín](/servicios/pintura/medellin), [pintura en Bello](/servicios/pintura/bello) y nuestra [cobertura](/cobertura).`,
  },

  /* ---- ARTICLE 3 ---- */
  {
    slug: "fuga-agua-pared-como-detectar",
    title: "Fuga de agua en la pared: cómo detectarla y qué hacer",
    metaDescription: "Señales de una posible fuga en la pared, medidas iniciales y qué aclarar al cotizar la reparación en Medellín o Bello. Alcance y precios base.",
    targetKeyword: "fuga de agua en la pared que hacer",
    secondaryKeywords: [
      "detectar fuga agua pared",
      "pared mojada por dentro",
      "humedad pared tubería rota",
      "plomero fuga Medellín",
    ],
    category: "plomeria",
    serviceLines: ["plomeria"],
    relatedServiceIds: ["reparacion-fugas", "deteccion-fuga-visible", "ajustes-hidrosanitarios"],
    publishedAt: "2026-02-05",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-fuga-agua-pared-como-detectar.png",
    featuredImage: "/blog/fuga-agua-pared-como-detectar.webp",
    featuredImageAlt: "Detección de fuga de agua en pared de vivienda",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["humedad-paredes-causas-soluciones", "cuanto-cobra-plomero-medellin-precios", "destape-canerias-medellin-metodos-precios"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["fugas", "plomería", "detección", "pared mojada"],
    body: `## Cómo reconocer una posible fuga en la pared

Una mancha que crece, pintura levantada, sonido de agua o consumo inesperado son motivos para revisar. **Ninguna de estas señales confirma por sí sola una fuga oculta:** también puede haber filtración de lluvia, condensación o una instalación de otro inmueble.

Anota cuándo aparece la humedad y qué aparatos se estaban usando. Una foto general y otra del detalle ayudan a explicar el problema sin abrir la pared antes de tiempo.

## Qué hacer primero

1. Si identificas la llave de paso de tu vivienda y puedes alcanzarla desde una zona seca y segura, ciérrala para limitar una posible pérdida de la red interna. No fuerces una válvula deteriorada.
2. Mantente alejado de enchufes, equipos o tableros alcanzados por el agua. No los manipules ni entres a una zona inundada para desconectarlos.
3. Aparta objetos solo si es seguro y evita el acceso a zonas con desprendimientos o cielo raso deformado.
4. Informa a la administración si la fuga puede afectar zonas comunes, otra vivienda o una red compartida.
5. Solicita revisión. Si hay riesgo eléctrico o estructural, requiere atención especializada antes del arreglo de acabados.

No perfores para buscar la tubería ni tapes la mancha con pintura. Cerrar una llave no resuelve el daño ya acumulado y no detiene necesariamente filtraciones provenientes de otra instalación.

## Datos útiles para encontrar el origen

| Observación | Qué conviene comprobar |
|---|---|
| Humedad después de lluvia | Cubierta, fachada o encuentros exteriores |
| Mancha cerca de baño o cocina | Conexiones, suministro y desagües |
| Consumo inusual | Lectura del medidor y posibles pérdidas internas |
| Agua al usar un aparato concreto | Relación con esa instalación, sin darla por confirmada |
| Humedad en un muro compartido | Coordinación con vecino o administración |

Si el medidor corresponde únicamente a tu vivienda y está accesible, observa si registra consumo cuando no se utiliza agua y han terminado de llenarse sanitarios y tanques. Es una pista, no una localización exacta. EPM explica esta comprobación básica en su [revista informativa de servicios públicos](https://comercializadorenergia.epm.com.co/content/dam/epm/institucional/documentos/epm-noticias/revista-epm-julio-diciembre-2022.pdf). No manipules el medidor ni sus sellos.

## Cómo se define la reparación

Primero se delimita la instalación afectada y el acceso necesario. Si hay que abrir una pared, deben acordarse la zona de intervención, el retiro de material y la reposición de acabados. No todas las fugas exigen demoler, ni se puede prometer localizar una fuga oculta sin revisar.

La reparación puede involucrar una conexión o un tramo de tubería compatible con la instalación. Después corresponde comprobar el funcionamiento y verificar el área intervenida antes de cerrar. El secado, resane y pintura pueden requerir etapas separadas: no hay un plazo universal de 24 o 48 horas para repintar cualquier pared mojada.

## Cuánto cuesta la revisión o reparación

| Servicio del catálogo de Espinal | Desde |
|---|---|
| Detección de fuga visible | $130.000 COP |
| Reparación de fugas | $170.000 COP |
| Reparación de llaves y conexiones | $140.000 COP |

La detección visible no equivale a una búsqueda instrumental dentro de paredes. Estos valores base no son tarifas de mercado ni incluyen automáticamente apertura, repuestos, cierre y pintura. Confirma esos conceptos y cualquier diagnóstico cobrado antes de autorizar el trabajo.

## Qué revisar para evitar que se repita

Conserva la descripción del tramo intervenido y las fotos disponibles. Aprende dónde está la llave de paso y consulta si las conexiones accesibles necesitan atención. Si el consumo sigue siendo anormal o reaparece la mancha, solicita seguimiento: pintar de nuevo no permite saber si la fuga quedó resuelta.

## Solicitar ayuda en Medellín, Bello y el Valle de Aburrá

Envíanos municipio, barrio, fotos y desde cuándo notas el problema. Indica si el agua está saliendo en ese momento y si has podido cerrar el suministro. Consulta el alcance de [reparación de fugas de agua](/soluciones/reparacion-fugas-agua) y las páginas de [plomería en Medellín](/servicios/plomeria/medellin) o [plomería en Bello](/servicios/plomeria/bello).

Si aún no está claro si el origen es una tubería, revisa también nuestra guía de [humedad en las paredes](/blog/humedad-paredes-causas-soluciones).`,
  },

  /* ---- ARTICLE 4 ---- */
  {
    slug: "impermeabilizacion-techos-medellin-precios",
    title: "Impermeabilización de techos en Medellín: precios y tipos",
    metaDescription: "Impermeabilización de techos en Medellín: precio base de Espinal, sistemas, preparación y criterios para comparar cotizaciones sin promesas de duración.",
    targetKeyword: "impermeabilizacion techos precio Medellín",
    secondaryKeywords: [
      "impermeabilizar techo precio",
      "tipos impermeabilizante techos",
      "impermeabilización cubierta Medellín",
      "cuanto cuesta impermeabilizar techo",
    ],
    category: "techos",
    serviceLines: ["techos"],
    relatedServiceIds: ["impermeabilizacion-cubiertas", "reparacion-goteras", "limpieza-cubierta"],
    publishedAt: "2026-01-28",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-impermeabilizacion-techos-medellin-precios.png",
    featuredImage: "/blog/impermeabilizacion-techos-medellin-precios.webp",
    featuredImageAlt: "Impermeabilización de techo con membrana en Medellín",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["como-arreglar-gotera-techo", "tipos-tejas-casas-colombia-comparativa", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["impermeabilización", "techos", "precios", "Medellín"],
    body: `## Cuándo tiene sentido impermeabilizar un techo

Impermeabilizar consiste en instalar o reparar un sistema que limite el paso del agua a través de una cubierta. Antes de elegirlo hay que revisar el soporte, los encuentros y la evacuación de lluvia. Una gotera puede necesitar cambiar una teja o corregir un bajante; aplicar una capa sobre todo el techo no siempre es el arreglo adecuado.

En Espinal, el servicio de protección contra goteras tiene un **precio base publicado desde $350.000 COP**. Es una referencia del catálogo, no el precio de cualquier techo ni una tarifa por metro cuadrado.

## Qué se debe revisar antes de recomendar un sistema

- Material y estado de la cubierta.
- Extensión de la zona que se va a intervenir.
- Pendientes, desagües y puntos donde se acumula agua.
- Uniones con paredes, tubos, equipos o cambios de nivel.
- Capas anteriores, adherencia y compatibilidad.
- Uso de la superficie: mantenimiento ocasional, tránsito frecuente u otro acabado encima.
- Acceso y condiciones seguras para ejecutar el trabajo.

Si hay deformación, desprendimientos o daño estructural, primero corresponde una evaluación especializada. No subas a la cubierta para medirla ni para comprobar su resistencia.

## Tipos de sistemas: qué comparar

### Recubrimientos líquidos

Existen formulaciones acrílicas, de poliuretano y de otras tecnologías. Se aplican formando una película, pero no tienen las mismas exigencias de soporte, espesor, refuerzo o humedad. La compatibilidad se debe comprobar para el producto específico.

### Membranas prefabricadas

Se instalan en láminas o rollos con un método de unión definido por el fabricante. Los traslapos, bordes y encuentros forman parte del sistema. El método de instalación y las protecciones necesarias deben quedar incluidos en la propuesta.

### Sistemas para superficies transitables

Que un producto impermeabilice no significa que sea un piso de uso diario. Cuando una terraza se utiliza habitualmente, hay que definir la protección o acabado y su compatibilidad con el soporte y las cargas.

La [ficha de SikaFill-12 Power](https://col.sika.com/content/dam/dms/co01/d/sikafill_-12_power.pdf), por ejemplo, distingue el tránsito de mantenimiento del tránsito habitual y describe requisitos propios de su sistema. Es una referencia técnica, no una recomendación automática para tu cubierta ni una declaración de que usamos ese producto en todos los trabajos.

## Por qué no hay una duración igual para todos los techos

No es riguroso prometer una cantidad de años solo por decir “acrílico” o “manto”. El desempeño depende del producto exacto, preparación, instalación, exposición, uso y mantenimiento. Tampoco es lo mismo la duración estimada del material que la garantía del trabajo.

Solicita la referencia del sistema, las instrucciones de mantenimiento y las condiciones de garantía aplicables. Si te ofrecen un plazo, pide que expliquen su alcance y qué intervenciones posteriores pueden afectarlo.

## Qué cambia el presupuesto

| Concepto | Qué debe aclarar la propuesta |
|---|---|
| Medición | Área y detalles incluidos |
| Preparación | Limpieza, retiros y reparación del soporte |
| Sistema | Productos, refuerzos y terminaciones |
| Evacuación de agua | Qué ajustes se incluyen o cotizan aparte |
| Acceso | Medios y restricciones para trabajar |
| Entrega | Verificación, mantenimiento y garantía acordada |

El precio base no permite calcular un techo completo multiplicando o dividiendo metros. No publicamos rangos de mercado por m² sin un levantamiento que los respalde. La visita para cotizar y una revisión técnica específica pueden tener alcances distintos: confirma sus condiciones antes de agendar.

## Mantenimiento y señales para revisar

Busca cambios visibles desde un sitio seguro: nuevas manchas interiores, reboses, material desprendido o una filtración que reaparece. El mantenimiento debe seguir las condiciones del sistema instalado. Como ejemplo, [SikaFill-50 Universal](https://col.sika.com/es/construccion/impermeabilizacion/impermeabilizacion-espacios-exteriores/cubiertas-terrazas/sikafill-50-universal.html) documenta inspecciones de la película y los desagües; eso no fija una frecuencia universal para todas las cubiertas.

## Solicitar una cotización

Envíanos municipio, barrio, fotos disponibles y si la superficie se usa como terraza o solo como cubierta. Consulta nuestra [solución de impermeabilización de techos](/soluciones/impermeabilizacion-techos), los servicios en [Medellín](/servicios/techos/medellin) y [Bello](/servicios/techos/bello). Si el daño parece localizado, también puedes revisar la [reparación de goteras](/soluciones/reparacion-goteras).`,
  },

  /* ---- ARTICLE 5 ---- */
  {
    slug: "humedad-paredes-causas-soluciones",
    title: "Humedad en las paredes: causas, soluciones y prevención",
    metaDescription: "Cómo orientar la revisión de humedad en paredes: filtración, fuga y condensación. Qué información recoger y qué corregir antes de pintar.",
    targetKeyword: "humedad en paredes como quitar",
    secondaryKeywords: [
      "humedad en las paredes soluciones",
      "manchas humedad pared",
      "paredes con humedad que hacer",
      "quitar humedad pared definitivamente",
    ],
    category: "pintura",
    serviceLines: ["pintura", "techos"],
    relatedServiceIds: ["correccion-humedad-superficial", "pintura-interior", "impermeabilizacion-cubiertas"],
    publishedAt: "2026-01-20",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-humedad-paredes-causas-soluciones.png",
    featuredImage: "/blog/humedad-paredes-causas-soluciones.webp",
    featuredImageAlt: "Tratamiento de humedad en pared de casa en Medellín",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["fuga-agua-pared-como-detectar", "como-quitar-moho-paredes-definitivamente", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["humedad", "paredes", "pintura", "tratamiento"],
    body: `## Antes de pintar, identifica de dónde viene la humedad

Una mancha, pintura ampollada o material que se desprende indica que hace falta revisar. La apariencia orienta, pero no confirma el origen. Una misma pared puede recibir agua de una tubería, de la fachada o del contacto con el terreno, además de presentar condensación.

El orden útil es **identificar la entrada o acumulación de agua, corregirla y después recuperar el acabado**. Pintar encima de una pared que sigue mojándose puede ocultar el problema por un tiempo.

## Causas que conviene diferenciar

### Filtración de lluvia

Si la mancha cambia después de llover, revisa con un técnico la cubierta, la fachada y sus encuentros. Que la humedad aparezca junto a una ventana no demuestra que la ventana sea el único punto de entrada.

### Fuga de una instalación

Una tubería de suministro o un desagüe puede afectar paredes y pisos. Registra si la mancha coincide con el uso del baño, la cocina o la vivienda vecina. Consulta la guía de [fugas de agua en paredes](/blog/fuga-agua-pared-como-detectar) para preparar la revisión.

### Condensación

Puede producirse cuando aire húmedo entra en contacto con una superficie suficientemente fría. Ventilación, extracción y fuentes de vapor son datos a revisar, pero abrir ventanas durante un número fijo de minutos no garantiza resolver todos los casos.

### Humedad desde el terreno

Una franja baja deteriorada puede ser compatible con humedad procedente del terreno, aunque existen otras explicaciones. No se debe recomendar una barrera química o impermeabilizar toda la base solo por una fotografía: hace falta evaluar materiales, entorno y vías de entrada.

## Qué información ayuda al diagnóstico

| Dato | Qué registrar |
|---|---|
| Inicio | Cuándo apareció y si ha crecido |
| Relación con lluvia | Antes, durante o después de los aguaceros |
| Instalaciones próximas | Baño, cocina, bajante o muro compartido |
| Intervenciones anteriores | Producto aplicado y cuánto tardó en reaparecer |
| Ventilación y uso | Vapor, secado de ropa y extracción existente |
| Estado del acabado | Manchas, salitre, desprendimientos o crecimiento visible |

Toma fotos sin raspar ni romper. Mantente alejado si hay electricidad afectada o desprendimientos. En un edificio, informa a la administración cuando el origen pueda ser común o de otra unidad.

## Si también hay moho

No lo cubras con pintura. La EPA recomienda corregir la fuente de agua, retirar el crecimiento de manera adecuada y secar antes de repintar; los materiales porosos dañados pueden necesitar reemplazo. Consulta sus [orientaciones de limpieza de moho](https://www.epa.gov/mold/mold-cleanup-your-home) y nuestra [guía de moho en paredes](/blog/como-quitar-moho-paredes-definitivamente).

Los daños extensos, el agua contaminada y la presencia de personas especialmente vulnerables requieren una evaluación distinta de un simple trabajo de acabado. El tratamiento superficial de paredes no debe confundirse con remediación especializada.

## Qué trabajo puede corresponder

- **Origen en techo o fachada:** revisar y corregir el punto de entrada antes de recuperar la pared.
- **Origen en tubería:** delimitar la instalación, reparar y verificar antes de cerrar.
- **Condensación:** evaluar producción de vapor, extracción y condiciones del ambiente.
- **Acabado ya deteriorado:** acordar qué se retira, qué se repone y cuándo permite continuar el soporte.

No hay un único producto “antihumedad” que resuelva todas las causas. Sigue la ficha técnica del sistema elegido y evita fijar un tiempo de secado sin comprobar el material y las condiciones del lugar.

## Precio y alcance del servicio

Espinal publica **tratamiento de humedad en paredes desde $250.000 COP**. Es una referencia del catálogo para un alcance por definir; no incluye automáticamente reparar tuberías, impermeabilizar fachadas, sustituir muros ni atender contaminación por moho.

La cotización debe separar la corrección de la causa y la recuperación de acabados. Confirma los materiales, el diagnóstico necesario, las exclusiones y la garantía que corresponda al trabajo acordado.

## Solicitar una revisión

En Medellín, Bello y el resto de nuestra [cobertura](/cobertura), envíanos fotos, ubicación y cuándo se presenta la humedad. Según el origen, puedes consultar [reparación de fugas](/soluciones/reparacion-fugas-agua), [reparación de goteras](/soluciones/reparacion-goteras) o [pintura interior](/soluciones/pintura-interior). La selección final depende de revisar el problema, no solo de renovar su apariencia.`,
  },

  /* ---- ARTICLE 6 ---- */
  {
    slug: "preparar-casa-temporada-lluvias-medellin",
    title: "Cómo preparar tu casa para la temporada de lluvias en Medellín",
    metaDescription: "Lista para revisar tu casa antes de las lluvias en Medellín y el Valle de Aburrá: techo, desagües, señales de atención y mantenimiento.",
    targetKeyword: "preparar casa temporada lluvias Medellín",
    secondaryKeywords: [
      "temporada lluvias Medellín 2026",
      "checklist mantenimiento casa lluvias",
      "proteger casa lluvias Valle de Aburrá",
      "mantenimiento techo antes de lluvias",
    ],
    category: "hogar",
    serviceLines: ["techos", "pintura", "plomeria"],
    relatedServiceIds: ["impermeabilizacion-cubiertas", "mantenimiento-canoas", "reparacion-goteras", "correccion-humedad-superficial"],
    publishedAt: "2026-03-01",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-preparar-casa-temporada-lluvias-medellin.png",
    featuredImage: "/blog/preparar-casa-temporada-lluvias-medellin.webp",
    featuredImageAlt: "Mantenimiento de techo antes de temporada de lluvias en Medellín",
    readingTimeMinutes: 4,
    isFeatured: true,
    relatedSlugs: ["como-arreglar-gotera-techo", "impermeabilizacion-techos-medellin-precios", "humedad-paredes-causas-soluciones"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella", "Caldas", "Copacabana", "Girardota"],
    tags: ["lluvias", "mantenimiento", "checklist", "temporada", "Medellín"],
    body: `## Prepara la vivienda antes de los aguaceros

Una revisión organizada ayuda a detectar tareas pendientes antes de que aparezcan filtraciones o reboses. No garantiza evitar todos los daños, pero permite atender señales que ya están presentes y coordinar el mantenimiento con tiempo.

En el Valle de Aburrá las lluvias varían entre sectores y años. Consulta el [portal de SIATA](https://siata.gov.co/portalWeb) para información y alertas vigentes; una guía de mantenimiento no reemplaza un pronóstico ni una instrucción de emergencia.

## 1. Revisa señales del techo desde el interior y el suelo

Busca manchas nuevas, desprendimientos, goteos anteriores y canales que rebosan durante la lluvia. Si ves una teja desplazada desde un lugar seguro, registra la ubicación.

**No subas a una cubierta para hacer esta lista.** El acceso y el trabajo sobre techos requieren condiciones adecuadas; tampoco se debe probar la resistencia caminando sobre las tejas. Si hay un cielo raso abombado o material que cae, evita el área y pide atención especializada.

## 2. Revisa la salida del agua

Comprueba visualmente que las rejillas accesibles no estén cubiertas por objetos. La limpieza de canales elevados y bajantes debe planearse con acceso seguro. Un rebose puede deberse a residuos, pero también a pendientes o conexiones: no se debe diagnosticar únicamente por el agua que se devuelve.

Si varios desagües fallan a la vez, puede ser necesario revisar un tramo común. En un edificio, informa a la administración antes de intervenir la red.

## 3. Observa paredes, ventanas y encuentros

Registra dónde aparece la humedad y si coincide con la lluvia. No sellemos todos los bordes sin conocer por dónde debe evacuar agua la ventana o el sistema de fachada. Una reparación debe respetar el funcionamiento de esos elementos.

Puedes usar la guía de [humedad en las paredes](/blog/humedad-paredes-causas-soluciones) para distinguir qué datos conviene recoger.

## 4. Prepara el interior de la vivienda

- Identifica la llave de paso y cómo informar una novedad a la administración.
- Mantén libres los accesos y las rutas de salida.
- Guarda documentos y objetos sensibles lejos de un punto que ya se moja.
- Conserva fotos del estado previo, facturas y datos de reparaciones anteriores.
- Si hay instalaciones eléctricas afectadas, no las manipules; pide atención especializada.

## 5. Ordena las tareas por urgencia

| Situación | Siguiente paso |
|---|---|
| Agua junto a electricidad, deformación o desprendimientos | Evitar el acceso y solicitar atención especializada |
| Goteo activo o rebose repetido | Coordinar revisión del origen y acceso |
| Sellos deteriorados o manchas que reaparecen | Programar diagnóstico antes de repintar |
| Suciedad visible sin daño activo | Planificar mantenimiento con acceso seguro |

No es necesario esperar a acumular varias señales. Una sola condición de riesgo puede requerir atención inmediata.

## Referencias de mantenimiento del catálogo

| Servicio de Espinal | Precio base desde |
|---|---|
| Revisión del techo | $130.000 COP |
| Limpieza de canales y bajantes | $150.000 COP |
| Limpieza de cubierta | $140.000 COP |
| Sellado de fisuras y juntas | $210.000 COP |
| Reparación de goteras | $180.000 COP |

Estos valores son referencias propias y no una cotización integral. La revisión del techo es una prestación del catálogo: no asumas que toda inspección técnica está incluida en una visita para cotizar. Confirma el alcance, los materiales y cualquier costo antes de agendar.

## Si empieza a llover antes del arreglo

Recoge el goteo solo desde una zona segura, aparta objetos si es posible y evita manipular la cubierta, los equipos eléctricos o los elementos deformados. No coloques plásticos sujetos con ladrillos sobre el techo ni intentes aplicar productos durante el aguacero.

## Coordina el trabajo en tu municipio

Al solicitar atención, indica municipio, barrio, tipo de inmueble, acceso y la señal que observaste. Confirma disponibilidad y condiciones; no todas las intervenciones pueden realizarse mientras llueve.

Consulta [techos en Medellín](/servicios/techos/medellin), [techos en Bello](/servicios/techos/bello), [reparación de goteras](/soluciones/reparacion-goteras) y [destape de desagües](/soluciones/destape-desagues). Para el resto del territorio, revisa nuestra [cobertura](/cobertura).`,
  },

  /* ---- ARTICLE 7 ---- */
  {
    slug: "cuanto-cobra-plomero-medellin-precios",
    title: "Precios de plomería en Medellín 2026: tabla y alcances",
    metaDescription: "Tabla de precios base de plomería 2026 publicada por Espinal en Medellín: fugas, destapes, grifería y sanitarios. Compara alcances antes de contratar.",
    targetKeyword: "precios de plomería en Medellín 2026",
    secondaryKeywords: [
      "lista de precios de plomería en Colombia 2026",
      "cuanto cobra un plomero por hora",
      "cuanto cobra un plomero por día",
      "cuanto cuesta la plomería de un baño",
      "precio plomero Medellín",
      "plomero Medellín precio",
      "cuanto cuesta un plomero en Medellín",
      "tarifas plomería Medellín 2026",
      "plomero barato Medellín",
    ],
    category: "guias",
    serviceLines: ["plomeria"],
    relatedServiceIds: ["reparacion-fugas", "destape-desagues", "cambio-griferia", "ajuste-sanitario", "revision-presion", "mantenimiento-red-interna"],
    publishedAt: "2026-03-05",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-cuanto-cobra-plomero-medellin-precios.png",
    featuredImage: "/blog/cuanto-cobra-plomero-medellin-precios.webp",
    featuredImageAlt: "Plomero profesional reparando tubería en Medellín",
    readingTimeMinutes: 6,
    isFeatured: true,
    relatedSlugs: ["fuga-agua-pared-como-detectar", "destape-canerias-medellin-metodos-precios", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella", "Copacabana"],
    tags: ["plomería", "precios", "plomero", "Medellín", "tarifas"],
    body: `## Cuánto cobra un plomero en Medellín

Depende del problema, el acceso, los repuestos y el trabajo necesario. En esta guía mostramos **los precios base publicados por Espinal**, para que puedas preparar una solicitud y comparar cotizaciones con el mismo alcance.

No son un estudio del mercado de Medellín ni tarifas cerradas para todos los casos. Tampoco permiten calcular una reparación oculta sin revisar la instalación. La cotización de tu trabajo debe confirmar qué incluye y qué se cobra por separado.

## Precios de referencia de plomería en Espinal

| Servicio | Precio base desde |
|---|---|
| Revisión de presión del agua | $120.000 COP |
| Detección de fuga visible | $130.000 COP |
| Reparación de llaves y conexiones | $140.000 COP |
| Cambio de grifería | $150.000 COP |
| Destape de desagües | $160.000 COP |
| Ajuste de sanitario | $165.000 COP |
| Reparación de fugas | $170.000 COP |
| Mantenimiento de tuberías | $200.000 COP |

Son referencias del [catálogo de plomería](/servicios/plomeria). “Desde” identifica un punto de partida, no un máximo. No se afirma que cada valor incluya todos los repuestos, equipos, aperturas o acabados de cualquier instalación. Pide ese detalle antes de aceptar.

## ¿Es una lista de precios de plomería para toda Colombia?

No. La tabla reúne los precios base que **Espinal Multiservicios publica para su propia atención** en Medellín y las zonas indicadas en la página de [cobertura](/cobertura). No representa un promedio nacional, una tarifa oficial ni el precio de todos los plomeros de Colombia.

Si comparas listas de distintas empresas, confirma la ciudad, la fecha, el servicio exacto y lo que incluye cada valor. Dos filas con el mismo nombre pueden contemplar actividades, repuestos y condiciones de acceso diferentes.

## ¿Se cobra por hora, por día o por servicio?

Espinal publica referencias por servicio. Cobrar por hora o por día también puede ser válido cuando el alcance no puede definirse de antemano, pero la propuesta debe explicar la unidad, el valor, el tiempo que se facturará y los materiales o desplazamientos que se cobran aparte.

Para una reparación concreta, compara el resultado acordado y no solo la unidad de tiempo. Pregunta qué ocurre si el trabajo toma más de lo previsto y quién debe autorizar una actividad adicional. Esta guía no publica una tarifa universal por hora o por día porque no existe un único alcance comparable.

## ¿Cuánto cuesta la plomería de un baño?

“La plomería de un baño” puede referirse a una fuga, un sanitario, una grifería, un desagüe o a renovar varias conexiones. La tabla no permite sumar esos precios y asumir el valor de un baño completo.

Para cotizar, indica qué aparatos existen, qué falla, si hay que abrir paredes o pisos, quién aporta los repuestos y qué acabado debe recuperarse. Si se trata de una remodelación, pide una propuesta separada para redes, aparatos, obra civil y acabados. Así evitas comparar una reparación puntual con una renovación completa.

## Visita para cotizar y diagnóstico: qué aclarar

Una visita comercial y un trabajo técnico de diagnóstico pueden tener alcances diferentes. Por ejemplo, el catálogo incluye revisión de presión y detección visible como servicios. Pregunta antes de agendar:

- Si la visita tiene costo y bajo qué condiciones.
- Si se hará solo una observación inicial o una revisión técnica específica.
- Si un diagnóstico se cobra aparte o se descuenta del trabajo posterior.
- Qué pasa si el problema pertenece a una red común o requiere otro especialista.

Que un profesional cobre una revisión no demuestra por sí solo mala práctica. Lo importante es conocer y aceptar sus condiciones con anticipación.

## Qué cambia el precio de cada reparación

### Fugas de agua

Una conexión accesible es diferente de una tubería detrás de un muro. En la [reparación de fugas](/soluciones/reparacion-fugas-agua), aclara si el precio incluye localizar el punto, abrir, reparar, verificar, cerrar y recuperar el acabado. La detección visible no equivale a una búsqueda instrumental de fugas ocultas.

### Destapes

El costo depende del punto afectado, el acceso y si hay varios aparatos involucrados. Un atasco recurrente puede necesitar evaluación adicional. Consulta la [solución de destape de desagües](/soluciones/destape-desagues); el equipo y el alcance se confirman según el caso, no se presumen incluidos.

### Cambio de grifería

Identifica la referencia de la grifería y quién aporta la pieza. Conviene revisar si las conexiones existentes son compatibles y si también necesitan cambio. No todos los repuestos o adaptaciones están contemplados en una instalación básica.

### Ajuste de sanitario

Describe si el problema es goteo, llenado, descarga o movimiento. Los mecanismos, sellos y conexiones pueden requerir intervenciones distintas. La cotización debe identificar el trabajo y los repuestos acordados.

### Presión o mantenimiento de la red interna

Una baja presión puede tener causas dentro o fuera del inmueble. Antes de prometer un cambio de tubería, corresponde delimitar qué se revisará y qué resultado se puede entregar. En redes compartidas puede ser necesaria la coordinación con la administración.

## Cómo comparar dos cotizaciones

| Concepto | Qué verificar |
|---|---|
| Problema a resolver | Misma instalación y mismo alcance |
| Mano de obra | Actividades incluidas |
| Repuestos | Referencia, cantidad y responsable de aportarlos |
| Aperturas y acabados | Qué se retira y cómo se entrega |
| Diagnóstico | Costo y condiciones previamente informados |
| Cambios | Cómo se autoriza un trabajo adicional |
| Garantía | Cobertura y condiciones por escrito |

Un precio menor o mayor no demuestra por sí solo la calidad. Compara la propuesta y las condiciones, y evita autorizar actividades que no entiendas.

## Datos para solicitar una cotización

Envíanos municipio, barrio, foto del punto afectado y una descripción de lo que ocurre. Indica si el agua sigue saliendo, si varios desagües están fallando y si ya aplicaste algún producto. No desarmes la instalación para conseguir una foto.

Puedes consultar [plomería en Medellín](/servicios/plomeria/medellin), [plomería en Bello](/servicios/plomeria/bello) y nuestra [cobertura en el Valle de Aburrá](/cobertura). Confirmamos disponibilidad y explicamos el alcance antes de acordar el trabajo.`,
  },

  /* ---- ARTICLE 8 ---- */
  {
    slug: "destape-canerias-medellin-metodos-precios",
    title: "Destape de cañerías en Medellín: métodos, precios y consejos",
    metaDescription: "Destape de cañerías en Medellín: precio base de Espinal, métodos y límites, qué hacer si el agua se devuelve y qué informar antes de la revisión.",
    targetKeyword: "destape cañerías Medellín",
    secondaryKeywords: [
      "destape desagües Medellín precio",
      "desatapar cañería",
      "cañería tapada que hacer",
      "destape tuberías precio Medellín",
      "plomero destape Medellín",
    ],
    category: "plomeria",
    serviceLines: ["plomeria"],
    relatedServiceIds: ["destape-desagues", "mantenimiento-red-interna", "reparacion-fugas"],
    publishedAt: "2026-03-15",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-destape-canerias-medellin-metodos-precios.png",
    featuredImage: "/blog/destape-canerias-medellin-metodos-precios.webp",
    featuredImageAlt: "Destape profesional de cañería con equipo especializado en Medellín",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["cuanto-cobra-plomero-medellin-precios", "fuga-agua-pared-como-detectar", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella"],
    tags: ["destape", "cañerías", "desagües", "plomería", "Medellín"],
    body: `## Qué hacer cuando el agua no baja

Deja de usar el aparato afectado para evitar un desborde. Si el agua se devuelve por otro desagüe o fallan varios puntos, reduce el uso de los aparatos conectados y solicita una revisión. En edificios, avisa a la administración cuando pueda estar afectada una red común.

No añadas sucesivamente productos ni viertas agua hirviendo. Si hay aguas residuales fuera de la tubería, mantén alejados a niños y mascotas y evita el contacto directo. El problema puede requerir atención distinta de retirar un residuo de una rejilla.

## Qué información ayuda a ubicar la obstrucción

- Qué punto falla: lavaplatos, lavamanos, ducha, patio o sanitario.
- Si el agua baja lento o está completamente detenida.
- Si otros desagües también presentan el problema.
- Si ocurre al usar un aparato concreto, como la lavadora.
- Si es la primera vez o reaparece después de un destape.
- Qué productos o herramientas se han utilizado.

El mal olor o el gorgoteo por sí solos no identifican una causa. Puede haber residuos acumulados, un objeto o una condición de la instalación que deba revisarse.

## Métodos de destape y sus límites

### Retiro de residuos accesibles

Una rejilla o filtro desmontable puede acumular cabello o restos visibles. Solo retira lo que sea accesible y esté previsto para limpieza habitual, siguiendo las instrucciones del elemento. No introduzcas herramientas improvisadas, la mano en un triturador ni objetos para forzar el tapón.

### Desatascador manual

Puede ser una opción para ciertos atascos simples, pero no es adecuado cuando quedan productos químicos en el desagüe. Si desconoces qué se ha aplicado, hay agua residual desbordada o existe riesgo de salpicadura, detén el intento y solicita ayuda.

### Herramientas mecánicas

Una sonda o equipo de limpieza se selecciona según la tubería y el acceso. Su uso requiere conocer la instalación; forzar un cable no garantiza solucionar el atasco y puede dañar elementos. No se puede prometer alcance, potencia o resultado sin revisar el caso.

### Revisión adicional de una falla recurrente

Si vuelve a taparse, hace falta aclarar por qué. Pueden requerirse otras comprobaciones o un proveedor especializado. La disponibilidad de cámara, máquina rotativa o limpieza a presión debe confirmarse en la cotización; no forma parte automática de todos los destapes de Espinal.

## Si ya utilizaste un destapador químico

Informa el nombre del producto, cuánto aplicaste y cuándo. Conserva el envase sin manipular el contenido. **No mezcles limpiadores ni uses una sopapa cuando pueda quedar producto acumulado.** Sigue la etiqueta y evita salpicaduras.

Como referencia, [SC Johnson advierte para Drano Max Gel](https://drano.com/en-us/products/clogs/max-gel-clog-remover) que no debe combinarse con otros químicos ni usarse con un desatascador durante o después de su aplicación. Esa referencia no es una recomendación de compra ni sustituye las instrucciones del producto que tengas.

## Cuánto cuesta destapar un desagüe en Medellín

Espinal publica **destape de desagües desde $160.000 COP**. Es un precio base del catálogo, no una tarifa cerrada por cualquier método ni un precio máximo.

Antes de autorizar el servicio, aclara:

1. Punto o tramo que se intervendrá.
2. Método previsto y si requiere equipo o proveedor adicional.
3. Qué se hará si no se logra liberar el flujo.
4. Si incluye desmontar y volver a instalar piezas.
5. Cómo se comprobará el funcionamiento y cuáles son las condiciones de garantía.
6. Costo de visita o diagnóstico, si corresponde.

No publicamos tiempos de ejecución o rangos por equipo sin conocer la instalación. La [guía de precios de plomería](/blog/cuanto-cobra-plomero-medellin-precios) ayuda a comparar conceptos sin confundirlos.

## Hábitos de mantenimiento

Usa filtros o rejillas compatibles, retira los residuos accesibles y evita que comida, aceites, toallas húmedas u objetos terminen en los desagües. Si la falla se repite, registra la frecuencia y pide revisión en vez de encadenar destapes o productos.

## Solicitar atención

Consulta [destape de desagües](/soluciones/destape-desagues), [plomería en Medellín](/servicios/plomeria/medellin) y [plomería en Bello](/servicios/plomeria/bello). Envíanos la ubicación, el punto afectado y las pruebas o productos ya utilizados para coordinar el siguiente paso.`,
  },

  /* ---- ARTICLE 9 ---- */
  {
    slug: "como-quitar-moho-paredes-definitivamente",
    title: "Cómo tratar el moho en paredes y evitar que reaparezca",
    metaDescription: "Moho en paredes: corregir la humedad, reconocer cuándo pedir ayuda especializada y preparar la recuperación del acabado. Orientaciones EPA y CDC.",
    targetKeyword: "como quitar moho paredes",
    secondaryKeywords: [
      "eliminar moho pared",
      "moho negro pared como quitar",
      "hongos en las paredes como eliminar",
      "quitar moho pared definitivamente",
      "moho en casa Medellín",
    ],
    category: "pintura",
    serviceLines: ["pintura", "techos"],
    relatedServiceIds: ["correccion-humedad-superficial", "pintura-interior", "impermeabilizacion-cubiertas"],
    publishedAt: "2026-04-01",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-como-quitar-moho-paredes-definitivamente.png",
    featuredImage: "/blog/como-quitar-moho-paredes-definitivamente.webp",
    featuredImageAlt: "Tratamiento profesional de moho en pared de vivienda",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["humedad-paredes-causas-soluciones", "preparar-casa-temporada-lluvias-medellin", "precio-pintar-apartamento-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella"],
    tags: ["moho", "hongos", "paredes", "humedad", "salud"],
    body: `## Para que el moho no reaparezca, hay que resolver la humedad

Limpiar una mancha o cubrirla con pintura no corrige una filtración, fuga o problema de condensación. Por eso no es posible prometer que el moho desaparecerá “para siempre” con un producto casero. Primero hay que aclarar qué mantiene húmedo el material.

La EPA señala que **corregir la fuente de agua y secar los materiales** es parte esencial del trabajo, y desaconseja pintar sobre superficies con moho. Consulta sus [indicaciones para limpieza de moho en el hogar](https://www.epa.gov/mold/mold-cleanup-your-home).

## Cuándo no conviene intentar una limpieza doméstica

Solicita evaluación especializada si el área es extensa, el crecimiento vuelve, hay daño oculto, se afectaron materiales porosos o el agua procede de un desagüe. La EPA usa aproximadamente **0,9 m²** como una referencia para distinguir problemas pequeños; ese tamaño no sustituye la evaluación del material, la contaminación o las personas expuestas.

Si hay asma, enfermedad pulmonar o defensas disminuidas, evita la exposición y consulta con un profesional de salud antes de participar en la limpieza. Los CDC recomiendan que las personas con estas condiciones no permanezcan en edificios afectados por moho o filtraciones tras eventos severos. Los niños no deben participar en la limpieza. [Orientación de los CDC](https://www.cdc.gov/asthma/hcp/clinical-guidance/index.html).

## Qué hacer antes de intervenir la pared

1. Registra dónde está la mancha y cuándo apareció, sin raspar para buscar más crecimiento.
2. Revisa si coincide con lluvia, uso de agua o una instalación vecina.
3. Mantén el área apartada si hay materiales que se desprenden o electricidad alcanzada por agua.
4. Solicita que se determine la causa y el tipo de material antes de definir limpieza, retiro o acabado.

No se puede identificar la especie ni el riesgo solo por el color del moho. Una fotografía ayuda a describir la situación, pero no certifica que la pared esté lista para pintar.

## Limpieza: por qué no damos recetas de mezclas

En una superficie dura, la EPA describe la limpieza con detergente y agua seguida de secado completo; en materiales absorbentes o porosos puede ser necesario retirar y reemplazar el material afectado. Esto no significa que cualquier pared pintada, yeso o estuco se pueda tratar igual. Si no conoces el soporte o el daño continúa por dentro, pide orientación profesional. [Guía de la EPA](https://www.epa.gov/mold/mold-cleanup-your-home).

**No mezcles productos de limpieza ni pruebes recetas caseras sobre una pared con moho.** La EPA no recomienda el uso rutinario de biocidas como el cloro para la limpieza de moho y advierte que eliminarlo requiere más que matar el organismo. [EPA: uso de cloro](https://www.epa.gov/mold/should-i-use-bleach-clean-mold).

## Qué diferencia hay entre limpiar, corregir la causa y pintar

| Etapa | Qué debe quedar claro |
|---|---|
| Diagnóstico | De dónde procede la humedad y qué materiales afecta |
| Corrección | Qué entrada de agua o condición se va a tratar |
| Limpieza o retiro | Alcance y necesidad de un especialista |
| Secado y preparación | Cómo se determinará que puede continuarse |
| Acabado | Producto compatible y condiciones de mantenimiento |

La pintura final no sustituye las etapas anteriores. Tampoco se debe fijar un plazo de secado único para todos los muros. Conserva el registro de lo que se hizo y consulta si reaparece crecimiento, olor o humedad.

## Qué puede cotizar Espinal

El catálogo incluye **tratamiento de humedad en paredes desde $250.000 COP**, con alcance que debe definirse tras revisar. Ese precio no constituye una oferta de remediación especializada de moho ni una promesa de descontaminación de la vivienda.

Podemos recibir información del problema y evaluar si corresponde a los trabajos de [pintura y acabados](/servicios/pintura), [reparación de fugas de agua](/soluciones/reparacion-fugas-agua) o [reparación de goteras](/soluciones/reparacion-goteras). Si requiere un especialista, ese alcance debe distinguirse antes de contratar. La cotización explicará actividades, exclusiones y condiciones, sin prometer eliminar el moho definitivamente.

## Cómo preparar tu consulta

Envía municipio, barrio, foto general, foto del detalle y desde cuándo existe la humedad. Indica si vuelve después de limpiar o si hubo una filtración o desborde. Evita intervenir la zona solo para tomar mejores imágenes.

Lee también [humedad en paredes: causas y soluciones](/blog/humedad-paredes-causas-soluciones) para organizar la información. Si tienes síntomas o dudas sobre exposición, consulta a un profesional de salud; una revisión de mantenimiento no reemplaza esa atención.`,
  },

  /* ---- ARTICLE 10 ---- */
  {
    slug: "tipos-tejas-casas-colombia-comparativa",
    title: "Tipos de tejas para casas en Colombia: comparativa completa",
    metaDescription: "Compara tipos de tejas para casas en Colombia: material, estructura, accesorios y mantenimiento. Qué revisar al cotizar y cuidado con cubiertas antiguas.",
    targetKeyword: "tipos de tejas para casas Colombia",
    secondaryKeywords: [
      "tejas para casas precios Colombia",
      "mejor teja para clima Medellín",
      "teja termoacústica vs fibrocemento",
      "cambiar tejas casa precio",
      "tipos cubiertas Colombia",
    ],
    category: "techos",
    serviceLines: ["techos"],
    relatedServiceIds: ["impermeabilizacion-cubiertas", "cambio-teja-puntual", "revision-puntos-criticos"],
    publishedAt: "2026-04-10",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-tipos-tejas-casas-colombia-comparativa.png",
    featuredImage: "/blog/tipos-tejas-casas-colombia-comparativa.webp",
    featuredImageAlt: "Diferentes tipos de tejas para techos en Colombia",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["impermeabilizacion-techos-medellin-precios", "como-arreglar-gotera-techo", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "Rionegro", "La Ceja", "Marinilla"],
    tags: ["tejas", "techos", "cubiertas", "Colombia", "comparativa", "precios"],
    body: `## Cómo comparar tejas sin elegir solo por apariencia

La cubierta debe ser compatible con la estructura, la pendiente, el clima, los apoyos y el uso del espacio. No basta con escoger el material más económico por lámina: también cuentan fijaciones, remates, aislamiento, transporte, montaje y retiro de la cubierta anterior.

Esta guía organiza las preguntas para comparar opciones. No sustituye el diseño de una cubierta ni prescribe un producto para una vivienda sin revisarla.

## Teja de barro

### Qué comparar

Forma, peso declarado, dimensiones útiles, apoyos y piezas de terminación del fabricante. Si quieres reemplazar unas pocas unidades, confirma que el formato nuevo sea compatible con el existente.

### Qué revisar en la propuesta

La condición de la estructura y el acceso para montaje. No debe suponerse que cualquier techo puede recibir el mismo peso ni que una pieza visualmente parecida tiene idéntico encaje.

## Lámina de fibrocemento

### Qué comparar

Referencia exacta, composición documentada, apoyos, fijaciones y recomendaciones de instalación. La palabra fibrocemento no basta para identificar la composición de una cubierta antigua.

### Atención con materiales antiguos

Si desconoces la composición y existe sospecha de asbesto, **no cortes, lijes, perfores ni tomes muestras por tu cuenta**. Se requiere evaluación especializada antes de intervenir. La [EPA explica que la apariencia no permite confirmar su presencia y que la manipulación puede liberar fibras](https://www.epa.gov/asbestos/protect-your-family-exposures-asbestos). Esta precaución no implica que toda lámina de fibrocemento contenga asbesto ni que Espinal ofrezca su retiro especializado.

## Cubierta metálica

### Qué comparar

Tipo de metal, espesor, protección, perfil, fijaciones y exposición prevista. “Zinc” se usa coloquialmente para productos diferentes; pide la referencia para saber qué se está cotizando.

### Qué revisar en la propuesta

Tratamiento de encuentros, condensación, transmisión de ruido y necesidad de aislamiento. No se puede garantizar confort térmico o acústico solo por el nombre comercial de una lámina.

## Panel o teja termoacústica

### Qué comparar

Composición, espesor, desempeño declarado y sistema completo de montaje. El término termoacústico no describe una prestación única compartida por todas las marcas.

### Qué revisar en la propuesta

Remates, apoyos y compatibilidad con los elementos existentes. Pide que las características del producto elegido aparezcan en su ficha técnica y en la cotización.

## Policarbonato y elementos translúcidos

### Qué comparar

Transmisión de luz, protección y orientación indicadas por el fabricante, expansión y accesorios de unión. La elección también depende de cuánto sol recibe el espacio y cómo se resuelve la ventilación.

### Qué revisar en la propuesta

Que no se trate el material translúcido como una superficie sobre la que se puede caminar. El acceso de mantenimiento debe resolverse independientemente de la apariencia de la lámina.

## Tejas o láminas plásticas

### Qué comparar

Composición, comportamiento declarado frente a exposición, separación de apoyos y método de fijación. No todos los productos etiquetados como PVC o plástico tienen el mismo uso.

### Qué revisar en la propuesta

Compatibilidad con pendientes y accesorios. La vida útil no se debe estimar con una cifra genérica para toda la categoría; revisa la garantía y las condiciones del producto específico.

## Tabla para comparar cotizaciones

| Concepto | Pregunta útil |
|---|---|
| Producto | ¿Cuál es la marca y referencia exacta? |
| Dimensión útil | ¿Qué área cubre después de traslapos? |
| Estructura | ¿Se evaluaron peso, apoyos y estado? |
| Accesorios | ¿Incluye fijaciones, remates y encuentros? |
| Uso interior | ¿Cómo se aborda calor, ruido o condensación? |
| Retiro | ¿Qué incluye desmontar y disponer la cubierta previa? |
| Acceso | ¿Cómo se hará la instalación y el mantenimiento? |
| Garantía | ¿Qué cubre el material y qué cubre el trabajo? |

## Cuánto cuesta cambiar una teja

Espinal publica **cambio puntual de teja desde $190.000 COP**. Es una referencia de servicio sujeta a pieza, acceso y alcance; no representa el precio de una teja nueva, el metro cuadrado instalado ni la renovación completa del techo.

El precio de una lámina depende de su referencia y dimensión útil. Para presupuestar la cubierta, solicita medición y una propuesta que detalle materiales, accesorios y trabajo, con las condiciones de duración y mantenimiento del sistema elegido.

## Reparar una parte o cambiar la cubierta

El número de goteras por sí solo no decide si hay que reemplazar todo el techo. Primero se revisan las piezas, los encuentros, la estructura y los arreglos anteriores. Consulta [reparación de goteras](/soluciones/reparacion-goteras) y nuestros servicios de [techos en Medellín](/servicios/techos/medellin) o [techos en Bello](/servicios/techos/bello). Envía fotos tomadas desde un sitio seguro y la referencia del material si la conoces.`,
  },
  /* ---- ARTICLE 11 ---- */
  {
    slug: "segunda-temporada-lluvias-valle-aburra-revisar-techo",
    title: "Techos y segunda temporada de lluvias en el Valle de Aburrá",
    metaDescription: "Qué revisar desde un lugar seguro antes de las lluvias en el Valle de Aburrá. Señales de atención, mantenimiento y precios base de Espinal.",
    targetKeyword: "temporada de lluvias Medellín techo",
    secondaryKeywords: [
      "revisar techo antes de lluvias",
      "goteras temporada de lluvias Valle de Aburrá",
      "mantenimiento de techo octubre noviembre",
      "limpieza de canales antes de lluvias",
    ],
    category: "techos",
    serviceLines: ["techos"],
    relatedServiceIds: ["revision-puntos-criticos", "mantenimiento-canoas", "reparacion-goteras", "sellado-fisuras"],
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-segunda-temporada-lluvias-valle-aburra-revisar-techo.png",
    featuredImage: "/blog/segunda-temporada-lluvias-valle-aburra-revisar-techo.webp",
    featuredImageAlt: "Revisión de techo antes de la temporada de lluvias en el Valle de Aburrá",
    readingTimeMinutes: 4,
    isFeatured: true,
    relatedSlugs: ["como-arreglar-gotera-techo", "preparar-casa-temporada-lluvias-medellin", "impermeabilizacion-techos-medellin-precios"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella", "Caldas", "Copacabana", "Girardota", "Rionegro", "La Ceja", "Marinilla"],
    tags: ["lluvias", "techos", "mantenimiento", "goteras", "canales"],
    body: `## La temporada de lluvias es una oportunidad para revisar pendientes

SIATA describe septiembre, octubre y noviembre como parte de la segunda temporada de lluvias del Valle de Aburrá en su [explicación del ciclo local publicada en 2021](https://siata.gov.co/sitio_web/index.php/noticia18). Esa referencia climática no es un pronóstico para 2026: los acumulados y la distribución cambian entre años y sectores.

Para conocer condiciones actuales, consulta el [portal de SIATA](https://siata.gov.co/portalWeb). En casa, usa esta guía para organizar una revisión preventiva sin exponerte sobre la cubierta.

## Lista de observación desde un lugar seguro

1. **Manchas nuevas o que crecen:** registra dónde aparecen y si coinciden con lluvia.
2. **Rebose de canales:** anota en qué punto sale el agua, sin acercarte a bordes ni cables.
3. **Tejas desplazadas visibles desde el suelo:** toma una foto sin subir para comprobarlas.
4. **Pintura levantada en paredes altas:** puede relacionarse con filtración, pero necesita revisión del origen.
5. **Reparaciones anteriores:** reúne datos del material instalado y cuándo se hizo.
6. **Zonas compartidas:** informa a la administración si la cubierta o el bajante pertenecen al edificio.

Esta observación no detecta todos los problemas. Una sola señal grave, como un cielo raso deformado, desprendimientos o agua cerca de electricidad, requiere alejarse y solicitar atención especializada.

## Qué acordar en una revisión técnica

El catálogo de Espinal incluye **revisión del techo desde $130.000 COP**. Antes de contratar, confirma qué zonas son accesibles, qué se revisará, cómo se comunicarán los hallazgos y si se necesita otro especialista. No toda cubierta puede recorrerse, ni una inspección visual certifica la estabilidad de una estructura.

Distingue esta prestación de la visita para preparar una cotización. Cualquier costo, material o actividad adicional debe informarse antes de realizarlo.

## Trabajos que podrían ser necesarios

| Servicio del catálogo | Referencia desde | Qué debe comprobarse |
|---|---|---|
| Limpieza de canales y bajantes | $150.000 COP | Residuos, acceso y funcionamiento de la descarga |
| Sellado de fisuras y juntas | $210.000 COP | Material, movimiento y compatibilidad del sellante |
| Reparación de goteras | $180.000 COP | Origen y extensión del daño |
| Cambio puntual de teja | $190.000 COP | Compatibilidad de la pieza y estado del entorno |
| Protección contra goteras | $350.000 COP | Sistema y preparación necesarios |

Son precios base de Espinal, no tarifas universales ni una propuesta para tu inmueble. No hay que impermeabilizar automáticamente por cumplir cierto número de años: importan el estado y las especificaciones del sistema.

## Medellín, Bello y otros municipios

La prioridad del mantenimiento debe basarse en el inmueble: tipo de cubierta, árboles cercanos, intervenciones previas, pendiente y antecedentes de filtración. No podemos asumir que todos los techos de un municipio tienen el mismo problema por su ubicación.

Consulta [techos en Medellín](/servicios/techos/medellin), [techos en Bello](/servicios/techos/bello) y la [cobertura completa](/cobertura). Si se trata de una terraza común o una bodega con acceso restringido, indícalo al coordinar la revisión.

## Si la gotera ya está activa

Recoge el agua y aparta objetos solo si puedes hacerlo desde una zona segura. No subas al techo mojado, no intentes colocar plásticos sujetos con pesos y no manipules instalaciones eléctricas alcanzadas por agua. Evita permanecer bajo partes abombadas o con desprendimientos.

Una fotografía permite explicar el caso, pero no descarta riesgo. La disponibilidad y el momento de intervención deben confirmarse según condiciones de acceso y clima.

## Deja un registro del mantenimiento

Guarda la cotización, la descripción de los puntos intervenidos, las fotos disponibles y las condiciones de garantía. Pregunta qué debe revisarse después y cómo reportar una filtración que reaparezca. Esto aporta más información para el siguiente mantenimiento que recordar únicamente el mes del último arreglo.

Consulta [reparación de goteras](/soluciones/reparacion-goteras), [impermeabilización de techos](/soluciones/impermeabilizacion-techos) y la lista general para [preparar la casa para las lluvias](/blog/preparar-casa-temporada-lluvias-medellin).`,
  },
  /* ---- ARTICLE 12 ---- */
  {
    slug: "cuanto-cuesta-impermeabilizar-techo-envigado-sabaneta-itagui",
    title: "Impermeabilizar techos en Envigado, Sabaneta e Itagüí: precio",
    metaDescription: "Precio base de impermeabilización de Espinal y factores para cotizar en Envigado, Sabaneta e Itagüí: área, preparación, acceso, sistema y alcance.",
    targetKeyword: "impermeabilizar techo Envigado precio",
    secondaryKeywords: [
      "impermeabilización techos Sabaneta",
      "impermeabilización terraza Itagüí precio",
      "cuánto cuesta impermeabilizar un techo",
      "precio impermeabilización por metro cuadrado",
    ],
    category: "guias",
    serviceLines: ["techos"],
    relatedServiceIds: ["impermeabilizacion-cubiertas", "sellado-fisuras", "revision-puntos-criticos"],
    publishedAt: "2026-10-03",
    updatedAt: "2026-10-05",
    author: "Henrry Espinal",
    authorRole: "Fundador y técnico principal",
    ogImage: "/og/blog-cuanto-cuesta-impermeabilizar-techo-envigado-sabaneta-itagui.png",
    featuredImage: "/blog/cuanto-cuesta-impermeabilizar-techo-envigado-sabaneta-itagui.webp",
    featuredImageAlt: "Impermeabilización de techo en el sur del Valle de Aburrá",
    readingTimeMinutes: 4,
    isFeatured: false,
    relatedSlugs: ["impermeabilizacion-techos-medellin-precios", "segunda-temporada-lluvias-valle-aburra-revisar-techo", "como-arreglar-gotera-techo"],
    targetMunicipalities: ["Envigado", "Sabaneta", "Itagüí", "Medellín"],
    tags: ["impermeabilización", "precios", "techos", "Envigado", "Sabaneta", "Itagüí"],
    body: `## Precio de partida y presupuesto de tu cubierta

Espinal publica **protección contra goteras en el techo desde $350.000 COP**. Es una referencia del catálogo para un alcance por definir. No establece cuántos metros incluye ni permite cotizar automáticamente un balcón, una terraza o una bodega.

En Envigado, Sabaneta e Itagüí el presupuesto se prepara con las características del inmueble. No tenemos un estudio local de tarifas por m² ni una muestra de trabajos documentados que permita publicar un promedio de cada municipio.

## Información para cotizar sin confundir áreas

Indica si se trata de cubierta inclinada, terraza, losa o un encuentro localizado. Si tienes planos o medidas existentes, compártelos; no subas a medir por tu cuenta.

| Dato | Por qué cambia el alcance |
|---|---|
| Área que se intervendrá | No siempre coincide con el área del piso |
| Material del soporte | Determina compatibilidad y preparación |
| Sistema anterior | Puede requerir prueba, reparación o retiro |
| Uso de la superficie | El tránsito habitual necesita una solución adecuada |
| Encuentros y desagües | Forman parte del detalle de impermeabilización |
| Acceso | Condiciona medios, tiempo y seguridad |
| Humedad o daño previo | Puede exigir correcciones antes de aplicar |

## Tres situaciones para explicar lo que necesitas

### Una filtración localizada

Si entra agua junto a un encuentro, puede corresponder una reparación puntual, aunque el origen debe comprobarse. No conviene asumir que toda la terraza necesita una nueva membrana ni que una gotera aislada siempre se resuelve con sellador. Consulta la [reparación de goteras](/soluciones/reparacion-goteras).

### Una terraza de uso común

Es necesario coordinar con la administración, definir quién autoriza y aclarar cómo se protegerá el sistema del tránsito. El presupuesto debe identificar si se repone el acabado y qué restricciones de uso habrá durante el trabajo.

### Una cubierta de local o bodega

Importan acceso, actividad del negocio y elementos instalados sobre el techo. No se elige el sistema solo porque el inmueble sea industrial: se debe revisar la cubierta específica y coordinar la protección del interior.

Estos ejemplos describen alcances posibles; no son casos ejecutados ni cotizaciones reales de Espinal.

## Qué debe incluir una propuesta comparable

1. Área y detalles que se intervendrán.
2. Preparación, reparaciones y retiros incluidos.
3. Referencia del sistema y productos compatibles.
4. Tratamiento de uniones, bordes y desagües.
5. Condiciones de aplicación y plazo estimado sujeto al caso.
6. Protección de superficies y manejo de residuos.
7. Precio, exclusiones, mantenimiento y garantía por escrito.

Para comparar dos ofertas, revisa estos conceptos y no solo el valor por m². Una propuesta puede incluir recuperación del soporte y otra únicamente aplicar producto sobre el estado existente.

## Duración y garantía: pide el dato del sistema específico

No hay una duración universal de “acrílico”, “poliuretano” o “manto”. Pide la ficha del producto, las condiciones de instalación y el mantenimiento requerido. La [información de SikaFill-12 Power](https://col.sika.com/content/dam/dms/co01/d/sikafill_-12_power.pdf), por ejemplo, diferencia condiciones del soporte y usos permitidos; no se puede extrapolar su desempeño a otros sistemas.

La garantía de un producto y la del trabajo pueden tener alcances diferentes. Las condiciones deben explicarse antes de contratar. No publicamos plazos genéricos de 8, 10 o 15 años ni un tiempo fijo de ejecución sin definir la intervención.

## Atención en Envigado, Sabaneta e Itagüí

Puedes consultar nuestros servicios de [techos en Envigado](/servicios/techos/envigado), [techos en Sabaneta](/servicios/techos/sabaneta) y [techos en Itagüí](/servicios/techos/itagui). Indica barrio, tipo de inmueble, uso de la cubierta y fotos tomadas desde un lugar seguro.

Pregunta por las condiciones de visita y por cualquier diagnóstico técnico necesario antes de agendar. En la página de [impermeabilización de techos](/soluciones/impermeabilizacion-techos) encontrarás el alcance general y los datos para preparar tu solicitud. También atendemos otras zonas de nuestra [cobertura](/cobertura).`,
  },
];
