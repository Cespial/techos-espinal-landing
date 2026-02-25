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
    metaDescription:
      "Aprende cómo arreglar una gotera en el techo paso a paso. Causas, soluciones temporales y cuándo llamar a un profesional en Medellín.",
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
    updatedAt: "2026-02-15",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-techos.svg",
    featuredImage: "/blog/placeholder-techos.svg",
    featuredImageAlt: "Reparación de gotera en techo de casa en Medellín",
    readingTimeMinutes: 8,
    isFeatured: true,
    relatedSlugs: ["impermeabilizacion-techos-medellin-precios", "humedad-paredes-causas-soluciones", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["goteras", "techos", "reparación", "impermeabilización"],
    body: `## ¿Por qué gotea el techo de tu casa?

Si descubriste una gotera en el techo, lo primero es no entrar en pánico. Las goteras son uno de los problemas más comunes en las casas de Medellín y el Valle de Aburrá, especialmente durante las temporadas de lluvia.

Las goteras no aparecen de la nada. Siempre hay una causa, y entenderla es el primer paso para arreglarla bien. Acá te explicamos las causas más frecuentes:

### Tejas rotas o desplazadas

Con el viento, el sol y la lluvia, las tejas se van deteriorando. Una teja fisurada o que se movió de su posición deja pasar el agua directamente.

### Sellado deteriorado en las juntas

Las uniones entre tejas, entre el techo y la pared, o alrededor de tubos y ductos son puntos críticos. Con el tiempo, el sellado se seca, se agrieta y deja pasar agua.

### Canales y bajantes tapados

Cuando los canales se tapan con hojas y basura, el agua se devuelve y se mete por donde no debe. Esto es muy común en casas con árboles cerca.

### Impermeabilización vencida

Si el techo tiene una capa impermeabilizante, esta tiene vida útil. Después de unos años pierde efectividad y el agua empieza a filtrarse.

## Cómo detectar de dónde viene la gotera

Encontrar el origen exacto de una gotera no siempre es fácil, porque el agua puede recorrer el techo internamente antes de salir por donde la ves.

**Revisá estos puntos:**

- **Manchas en el techo o paredes**: Si ves manchas oscuras, amarillentas o pintura ampollada, ahí está llegando el agua.
- **Goteo activo durante la lluvia**: Poné un balde y observá. ¿El goteo es constante o solo cuando llueve fuerte?
- **Revisión externa del techo**: Si podés subir al techo de forma segura, buscá tejas rotas, desplazadas o sellados agrietados.
- **Olor a humedad**: A veces no ves la gotera, pero la olés. El olor a moho indica que hay humedad acumulada.

> **Ojo**: Si no podés subir al techo de forma segura, no te arriesgués. Es mejor que un técnico lo revise.

## Soluciones temporales mientras conseguís ayuda

Si está lloviendo y necesitás frenar el agua ahora mismo, estas medidas te pueden ayudar:

1. **Poné un balde o recipiente** debajo del goteo para recoger el agua.
2. **Usá un plástico grueso** sobre la zona del techo donde creés que entra el agua. Aseguralo con peso (ladrillos o piedras).
3. **Sellador de emergencia**: En las ferreterías venden selladores tipo silicona que podés aplicar temporalmente sobre grietas visibles.

**Importante**: Estas son soluciones temporales. No reemplazan una reparación profesional.

## Cómo arreglar la gotera de forma definitiva

La solución definitiva depende de la causa:

### Si es una teja rota o desplazada

Se reemplaza la teja dañada y se revisan las vecinas para verificar que estén bien asentadas. Es una reparación rápida si el resto del techo está en buen estado.

### Si es un problema de sellado

Se limpia la zona afectada, se retira el sellado viejo y se aplica sellante nuevo de poliuretano o silicona especializada para techos. Esto aplica especialmente en juntas, encuentros con paredes y pasos de tubería.

### Si los canales están tapados

Se hace una limpieza completa de canales y bajantes. Se recomienda hacer esto al menos dos veces al año, especialmente antes de las temporadas de lluvia.

### Si la impermeabilización está vencida

Se aplica un nuevo sistema impermeabilizante. Dependiendo del tipo de techo, puede ser una membrana asfáltica, un recubrimiento acrílico o una manta impermeabilizante.

## ¿Cuándo llamar a un profesional?

Hay situaciones donde la gotera no es un tema de una sola teja:

- La gotera es grande o hay varias a la vez.
- Notás que el cielo raso está hinchado o cediendo.
- La filtración viene de una pared, no del techo directamente.
- Ya intentaste sellar pero la gotera vuelve.
- No podés acceder al techo de forma segura.

En estos casos, lo mejor es que un técnico revise, identifique el problema real y proponga la solución correcta.

## ¿Cuánto cuesta arreglar una gotera en Medellín?

El precio varía según el tipo de reparación:

| Servicio | Precio aproximado |
|----------|------------------|
| Reparación de gotera puntual | Desde $180.000 COP |
| Sellado de fisuras y juntas | Desde $210.000 COP |
| Cambio de teja puntual | Desde $190.000 COP |
| Limpieza de canales | Desde $150.000 COP |
| Impermeabilización completa | Desde $350.000 COP |

Estos precios son de referencia. El valor final depende de la revisión técnica en sitio.

## Prevenís las goteras con mantenimiento regular

La mejor forma de evitar goteras es hacer mantenimiento preventivo:

- **Limpiar canales y bajantes** cada 6 meses.
- **Revisar el techo** después de tormentas fuertes.
- **Verificar la impermeabilización** cada 3-5 años.
- **No dejar pasar las señales**: manchas, olores o goteos menores son aviso de un problema que va a crecer.

## ¿Necesitás ayuda con una gotera?

Si tenés una gotera en tu casa o negocio en Medellín o el Valle de Aburrá, podemos ayudarte. Conoce todos nuestros [servicios de techos y cubiertas](/servicios/techos) o lee nuestra guía de [impermeabilización de techos en Medellín](/blog/impermeabilizacion-techos-medellin-precios). Revisamos tu techo, te decimos qué pasa y cuánto cuesta arreglarlo. Sin compromiso.`,
  },

  /* ---- ARTICLE 2 ---- */
  {
    slug: "precio-pintar-apartamento-medellin",
    title: "¿Cuánto cuesta pintar un apartamento en Medellín en 2026?",
    metaDescription:
      "Precios reales para pintar un apartamento en Medellín en 2026. Desglose por m², factores que afectan el costo y cómo cotizar sin sorpresas.",
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
    updatedAt: "2026-02-10",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-hogar.svg",
    featuredImage: "/blog/placeholder-hogar.svg",
    featuredImageAlt: "Pintura interior de apartamento en Medellín",
    readingTimeMinutes: 7,
    isFeatured: true,
    relatedSlugs: ["humedad-paredes-causas-soluciones", "como-quitar-moho-paredes-definitivamente", "como-arreglar-gotera-techo"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["pintura", "precios", "apartamento", "Medellín"],
    body: `## ¿Cuánto cuesta pintar un apartamento en Medellín?

Si estás pensando en pintar tu apartamento en Medellín, lo más probable es que quieras saber cuánto te va a costar antes de comprometerte con alguien. Es una pregunta válida y acá te la respondemos con precios reales del mercado en 2026.

**La respuesta corta**: pintar un apartamento estándar en Medellín puede costar entre **$800.000 y $3.500.000 COP**, dependiendo del tamaño, el estado de las paredes y el tipo de acabado que querás.

## Desglose de precios por tipo de apartamento

Estos son rangos de referencia para pintura interior con materiales incluidos:

| Tipo de apartamento | Área aprox. | Rango de precio |
|-------------------|-----------|----------------|
| Estudio o aparta-estudio | 25-40 m² | $800.000 - $1.200.000 |
| Apartamento 2 habitaciones | 50-70 m² | $1.200.000 - $2.000.000 |
| Apartamento 3 habitaciones | 80-110 m² | $1.800.000 - $2.800.000 |
| Apartamento grande (4+ hab.) | 120+ m² | $2.500.000 - $3.500.000+ |

> Estos precios incluyen mano de obra y pintura estándar de buena calidad. No incluyen reparaciones mayores en las paredes.

## ¿Qué factores cambian el precio?

No todos los apartamentos cuestan lo mismo de pintar. Estos son los factores que más afectan el precio:

### 1. Estado de las paredes

Si las paredes están lisas y en buen estado, el trabajo es más rápido y barato. Pero si hay huecos, grietas, humedad o estuco viejo, hay que resanar y preparar antes de pintar. Esto puede sumar entre un **20% y 40%** al costo.

### 2. Tipo de pintura

- **Pintura vinílica estándar**: La más común para interiores. Buena relación calidad-precio.
- **Pintura acrílica lavable**: Más resistente al agua y las manchas. Ideal para cocinas y baños.
- **Pintura premium o de marca reconocida**: Más duradera, mejor cobertura, pero más cara.

La diferencia entre una pintura básica y una premium puede ser de **$30.000 a $80.000 por galón**, y eso se multiplica por la cantidad de galones que necesite tu apartamento.

### 3. Altura de los techos

Los apartamentos con techos altos (más de 2.8 metros) requieren andamios o escaleras especiales, lo que aumenta el tiempo y el costo.

### 4. Cantidad de colores

Si querés un solo color en todo el apartamento, es más rápido. Pero si querés colores diferentes por habitación, acentos en paredes o combinaciones, el trabajo es más detallado y toma más tiempo.

### 5. Inclusión de techos y puertas

Pintar solo paredes es una cosa. Si también querés pintar techos, marcos de puertas, closets o muebles fijos, el precio sube.

## ¿Qué incluye un servicio profesional de pintura?

Un buen servicio de pintura interior debería incluir:

- **Preparación de superficies**: Resane de huecos menores, lijado y limpieza.
- **Protección de pisos y muebles**: Plástico y cinta para proteger lo que no se pinta.
- **Aplicación de pintura**: Mínimo dos manos para garantizar cobertura uniforme.
- **Limpieza final**: Recoger y dejar todo limpio al terminar.
- **Garantía**: Un servicio profesional te da garantía por el trabajo.

### ¿Qué NO incluye normalmente?

- Reparaciones grandes de pared (drywall dañado, grietas estructurales).
- Tratamiento de humedad (esto se hace antes de pintar).
- Mudanza de muebles pesados.

## Errores comunes al cotizar pintura

### Cotizar solo por precio

El pintor más barato no siempre es la mejor opción. A veces usan pintura aguada, no preparan las paredes o no dan garantía. Al final, terminás pagando dos veces.

### No preguntar qué incluye el precio

Siempre preguntá si el precio incluye materiales, preparación de paredes y limpieza. Algunos pintores cotizan solo la mano de obra y después te cobran aparte los materiales.

### Saltarse la preparación

Si las paredes tienen humedad, huecos o estuco viejo, hay que arreglar eso primero. Pintar encima de un problema es botarle plata al problema.

## ¿Cómo cotizar pintura para tu apartamento?

Lo ideal es que un profesional visite tu apartamento, mida las áreas y revise el estado de las paredes antes de darte un precio fijo. Las cotizaciones por teléfono son solo estimados.

**Para una cotización precisa necesitás:**

1. Que alguien vea las paredes en persona.
2. Definir qué áreas se van a pintar (solo habitaciones, todo el apto, etc.).
3. Elegir el tipo de pintura.
4. Saber si hay reparaciones previas necesarias.

## ¿Cada cuánto se debe pintar un apartamento?

Como referencia general:

- **Áreas de alto tráfico** (sala, cocina, corredores): cada 2-3 años.
- **Habitaciones**: cada 3-5 años.
- **Fachada exterior**: cada 3-4 años.

Esto varía según la calidad de la pintura usada y las condiciones del espacio.

## ¿Necesitás cotizar pintura para tu apartamento?

Si estás en Medellín o el Valle de Aburrá, podemos ir a tu apartamento, revisar el estado de las paredes y darte un precio claro, sin sorpresas. Explora nuestros [servicios de pintura y acabados](/servicios/pintura). Si tenés problemas de humedad antes de pintar, lee nuestra guía de [humedad en las paredes: causas y soluciones](/blog/humedad-paredes-causas-soluciones). La visita y la cotización no tienen costo.`,
  },

  /* ---- ARTICLE 3 ---- */
  {
    slug: "fuga-agua-pared-como-detectar",
    title: "Fuga de agua en la pared: cómo detectarla y qué hacer",
    metaDescription:
      "¿Tenés una fuga de agua en la pared? Aprende a detectarla, qué hacer de inmediato y cuándo llamar a un plomero en Medellín.",
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
    updatedAt: "2026-02-05",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-plomeria.svg",
    featuredImage: "/blog/placeholder-plomeria.svg",
    featuredImageAlt: "Detección de fuga de agua en pared de vivienda",
    readingTimeMinutes: 7,
    isFeatured: false,
    relatedSlugs: ["humedad-paredes-causas-soluciones", "cuanto-cobra-plomero-medellin-precios", "destape-canerias-medellin-metodos-precios"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["fugas", "plomería", "detección", "pared mojada"],
    body: `## ¿Cómo saber si hay una fuga de agua en la pared?

Una fuga de agua dentro de una pared puede ser difícil de detectar al principio, pero con el tiempo da señales claras. El problema es que mientras más tiempo pase sin atenderla, más daño hace: destruye la pintura, debilita la pared y puede generar moho que afecta la salud.

Acá te explicamos cómo detectarla y qué hacer.

## Señales de que hay una fuga en la pared

Estas son las señales más comunes que indican una fuga de agua oculta:

### 1. Manchas de humedad

Si ves una mancha oscura o amarillenta en la pared que va creciendo, es muy probable que haya agua detrás. Las manchas suelen aparecer cerca de baños, cocinas o donde pasan tuberías.

### 2. Pintura ampollada o descascarada

Cuando el agua se acumula detrás de la pared, la pintura se levanta, se ampolla o se cae en pedazos. Esto es diferente a una pintura vieja que se pela de forma uniforme.

### 3. Pared húmeda o fría al tacto

Poné la mano en la pared sospechosa. Si la sentís húmeda, fría o más blanda de lo normal, hay agua adentro.

### 4. Olor a moho o humedad

El olor a humedad es inconfundible. Si entrás a una habitación y sentís ese olor rancio y pesado, hay agua acumulada en algún lugar.

### 5. Aumento inexplicable en la factura del agua

Si tu factura del agua subió sin que hayas cambiado tus hábitos, es una señal clásica de fuga. Incluso una fuga pequeña puede desperdiciar miles de litros al mes.

### 6. Sonido de agua corriendo

En una casa en silencio, con todas las llaves cerradas, si escuchás un sonido de agua corriendo dentro de la pared, hay una fuga activa.

## ¿Qué hacer si detectás una fuga?

### Paso 1: Cerrá la llave de paso

Si podés identificar cuál llave de paso controla la tubería afectada, cerrala. Si no sabés cuál es, cerrá la llave principal de la casa. Esto frena el flujo de agua y evita que el daño siga creciendo.

### Paso 2: No toques las conexiones eléctricas

Si la fuga está cerca de un tomacorriente, interruptor o cableado eléctrico, **no toques nada**. El agua y la electricidad son una combinación peligrosa. Si es necesario, bajá el breaker de esa zona.

### Paso 3: Documentá el daño

Tomá fotos de las manchas, la zona afectada y cualquier daño visible. Esto te sirve si necesitás hacer un reclamo al seguro o como referencia para el técnico.

### Paso 4: Llamá a un plomero profesional

Una fuga en la pared no es algo que se arregla con sellador o con un video de YouTube. Se necesita:

- Identificar exactamente dónde está la fuga.
- Abrir la pared de forma controlada.
- Reparar o reemplazar la tubería dañada.
- Cerrar y resanar la pared.

Intentar hacerlo vos mismo puede empeorar el daño y terminar costando más.

## ¿Cómo se repara una fuga en la pared?

El proceso profesional normalmente incluye:

1. **Diagnóstico**: El plomero revisa las tuberías, identifica el punto de fuga y evalúa el daño.
2. **Apertura controlada**: Se abre solo la sección necesaria de la pared para acceder a la tubería.
3. **Reparación de tubería**: Se reemplaza o repara el tramo dañado. Puede ser un empate, un cambio de codo o el reemplazo de un tramo completo.
4. **Prueba de presión**: Se abre el agua y se verifica que no haya más fugas.
5. **Cierre y resane**: Se cierra la pared con mortero o drywall y se deja lista para pintar.

> La pintura final de la zona resanada se hace después de que el parche esté completamente seco, que puede tomar 24-48 horas.

## Causas comunes de fugas en la pared

### Tuberías viejas

En casas con más de 15-20 años, las tuberías de hierro galvanizado se corroen por dentro. Las de PVC duran más, pero las uniones pueden fallar.

### Presión alta del agua

Si la presión del agua en tu zona es muy alta, las tuberías y conexiones sufren más desgaste y pueden reventarse.

### Mala instalación original

Soldaduras deficientes, codos mal pegados o tuberías sin soporte adecuado fallan con el tiempo.

### Movimiento del terreno

En zonas de ladera (comunes en Medellín), el movimiento natural del suelo puede desplazar tuberías y generar fugas.

## ¿Cuánto cuesta reparar una fuga en la pared en Medellín?

| Servicio | Precio aproximado |
|----------|------------------|
| Detección de fuga | Desde $130.000 COP |
| Reparación de fuga sencilla | Desde $170.000 COP |
| Reparación con apertura de pared | Desde $250.000 COP |
| Cambio de tramo de tubería | Desde $300.000 COP |

El precio final depende de la ubicación de la fuga, el tipo de tubería y la dificultad del acceso.

## ¿Cómo prevenir fugas en las paredes?

- **Revisá la presión del agua** regularmente. Si es muy alta, considerá instalar un regulador.
- **Hacé mantenimiento preventivo** a las tuberías cada 2-3 años.
- **No ignores las señales**: una mancha pequeña hoy puede ser una pared destruida mañana.
- **Conocé dónde están las llaves de paso** de tu casa para actuar rápido en una emergencia.

## ¿Tenés una fuga en la pared?

Si sospechás que hay una fuga en tu casa o negocio en Medellín o el Valle de Aburrá, podemos ayudarte. Conoce todos nuestros [servicios de plomería](/servicios/plomeria). Si la humedad ya afectó tus paredes, te recomendamos leer [humedad en las paredes: causas y soluciones](/blog/humedad-paredes-causas-soluciones). Vamos, revisamos y te decimos qué pasa y cuánto cuesta arreglarlo.`,
  },

  /* ---- ARTICLE 4 ---- */
  {
    slug: "impermeabilizacion-techos-medellin-precios",
    title: "Impermeabilización de techos en Medellín: precios y tipos",
    metaDescription:
      "Guía de impermeabilización de techos en Medellín: tipos de impermeabilizante, precios por m² y cuándo aplicarlo. Protege tu casa de goteras.",
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
    updatedAt: "2026-01-28",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-techos.svg",
    featuredImage: "/blog/placeholder-techos.svg",
    featuredImageAlt: "Impermeabilización de techo con membrana en Medellín",
    readingTimeMinutes: 8,
    isFeatured: false,
    relatedSlugs: ["como-arreglar-gotera-techo", "tipos-tejas-casas-colombia-comparativa", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["impermeabilización", "techos", "precios", "Medellín"],
    body: `## ¿Qué es la impermeabilización de techos?

La impermeabilización es un tratamiento que se le hace al techo para que no deje pasar el agua. Es como ponerle una capa protectora que evita que la lluvia se filtre hacia adentro de tu casa o negocio.

En Medellín esto es especialmente importante. Con las lluvias frecuentes y a veces intensas del Valle de Aburrá, un techo sin impermeabilizar es un techo que va a dar problemas más temprano que tarde.

## ¿Cuándo necesitás impermeabilizar el techo?

No siempre es obvio cuándo impermeabilizar. Estas son las situaciones más comunes:

- **Ya tenés goteras**: Es la señal más clara. Si ya se filtra agua, la impermeabilización actual falló o nunca se hizo.
- **Manchas de humedad en el cielo raso**: Aunque no gotee activamente, las manchas indican que el agua está pasando.
- **Techo nuevo o renovado**: Si acabás de construir o cambiar el techo, es el momento ideal para impermeabilizar antes de que aparezcan problemas.
- **Impermeabilización anterior con más de 5 años**: La mayoría de sistemas impermeabilizantes tienen una vida útil de 3 a 7 años según el producto y la exposición.
- **Cambio de uso del espacio**: Si vas a convertir una terraza en un espacio habitable, necesitás impermeabilizar.

## Tipos de impermeabilización para techos

Hay varios sistemas y cada uno tiene sus ventajas. El más adecuado depende del tipo de techo que tengás:

### 1. Manto asfáltico (membrana)

Es una lámina gruesa de asfalto modificado que se pega al techo con calor (soplete) o adhesivo. Es el sistema más duradero y se usa mucho en techos planos o con poca pendiente.

**Ventajas:**
- Muy resistente y durable (5-10 años).
- Aguanta el tránsito de personas.
- Buena resistencia a cambios de temperatura.

**Precio aproximado:** $35.000 - $55.000 COP por m².

### 2. Impermeabilizante acrílico (pintura impermeabilizante)

Es un recubrimiento líquido que se aplica con rodillo o brocha. Se usa en techos con pendiente, tejas y superficies irregulares.

**Ventajas:**
- Fácil de aplicar.
- Se adapta a superficies irregulares.
- Económico comparado con el manto.

**Precio aproximado:** $18.000 - $30.000 COP por m².

### 3. Poliuretano líquido

Un recubrimiento que se aplica como pintura pero forma una membrana elástica y resistente. Se adhiere bien a casi cualquier superficie.

**Ventajas:**
- Muy elástico, resiste movimientos del techo.
- Sin juntas ni empalmes.
- Dura de 5 a 8 años.

**Precio aproximado:** $40.000 - $65.000 COP por m².

### 4. Silicona elastomérica

Recubrimiento de silicona que refleja el calor y protege contra la lluvia. Se usa en techos metálicos y planos.

**Ventajas:**
- Refleja el calor (ahorra energía).
- Excelente resistencia al agua estancada.
- Larga duración.

**Precio aproximado:** $45.000 - $70.000 COP por m².

## ¿Cuánto cuesta impermeabilizar un techo en Medellín?

El costo depende del tipo de sistema, el tamaño del techo y el estado actual de la superficie. Acá te damos rangos reales:

| Tipo de techo | Área aprox. | Rango de precio total |
|--------------|-----------|---------------------|
| Techo pequeño (casa sencilla) | 30-50 m² | $700.000 - $1.500.000 |
| Techo mediano (casa familiar) | 60-100 m² | $1.200.000 - $3.000.000 |
| Techo grande (edificio/bodega) | 150+ m² | $3.000.000 - $7.000.000+ |
| Terraza | 15-40 m² | $500.000 - $1.200.000 |

> Estos precios incluyen materiales y mano de obra. El valor final se define con la visita técnica.

## Factores que afectan el precio

### Estado actual del techo

Si el techo tiene daños (tejas rotas, grietas, humedad acumulada), hay que reparar antes de impermeabilizar. Esto agrega costo.

### Tipo de superficie

Un techo de concreto plano es más fácil de impermeabilizar que un techo de tejas con pendiente o con muchos quiebres y encuentros.

### Accesibilidad

Si el techo es difícil de acceder (pisos altos, pendiente pronunciada), se necesitan equipos especiales que aumentan el costo.

### Calidad del producto

Como en todo, hay productos económicos y productos premium. La diferencia está en la duración y la resistencia.

## Proceso de impermeabilización profesional

Un trabajo bien hecho sigue estos pasos:

1. **Limpieza del techo**: Se retira polvo, hojas, musgo y residuos. La superficie debe estar limpia para que el impermeabilizante se adhiera bien.
2. **Reparación de daños**: Se sellan grietas, se reemplazan tejas rotas y se corrigen desniveles.
3. **Aplicación de imprimante**: Una capa base que mejora la adherencia del producto principal.
4. **Aplicación del impermeabilizante**: Se aplica el sistema elegido según las especificaciones del fabricante.
5. **Inspección final**: Se verifica cobertura completa, especialmente en juntas, bordes y puntos críticos.

## ¿Cuánto dura la impermeabilización?

La duración depende del sistema usado y las condiciones:

| Sistema | Duración estimada |
|---------|------------------|
| Manto asfáltico | 5-10 años |
| Acrílico | 3-5 años |
| Poliuretano | 5-8 años |
| Silicona elastomérica | 7-12 años |

**Importante**: Estos tiempos se logran con una instalación correcta y mantenimiento básico (limpieza periódica del techo).

## Errores comunes al impermeabilizar

- **Aplicar sobre superficie sucia o húmeda**: El producto no se adhiere bien y falla rápido.
- **No reparar daños previos**: Impermeabilizar sobre un techo roto es botar plata.
- **Usar el producto equivocado**: No todos los impermeabilizantes sirven para todos los techos.
- **Aplicar menos capas de las recomendadas**: Cada producto tiene un rendimiento por m² que hay que respetar.

## ¿Necesitás impermeabilizar tu techo?

Si estás en Medellín o el Valle de Aburrá, podemos ir a revisar tu techo y darte una cotización sin costo. Explora todos nuestros [servicios de techos y cubiertas](/servicios/techos) o lee nuestra guía sobre [cómo arreglar una gotera en el techo](/blog/como-arreglar-gotera-techo). Te decimos qué tipo de impermeabilización necesitás y cuánto va a costar.`,
  },

  /* ---- ARTICLE 5 ---- */
  {
    slug: "humedad-paredes-causas-soluciones",
    title: "Humedad en las paredes: causas, soluciones y prevención",
    metaDescription:
      "¿Humedad en las paredes de tu casa? Conoce las causas principales, cómo solucionarla y cómo prevenir que vuelva. Guía para hogares en Medellín.",
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
    updatedAt: "2026-01-20",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-pintura.svg",
    featuredImage: "/blog/placeholder-pintura.svg",
    featuredImageAlt: "Tratamiento de humedad en pared de casa en Medellín",
    readingTimeMinutes: 8,
    isFeatured: false,
    relatedSlugs: ["fuga-agua-pared-como-detectar", "como-quitar-moho-paredes-definitivamente", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí"],
    tags: ["humedad", "paredes", "pintura", "tratamiento"],
    body: `## ¿Por qué salen manchas de humedad en las paredes?

Las manchas de humedad en las paredes no son solo un problema estético. Son una señal de que algo está pasando y si no se atiende, el daño va a seguir creciendo. En Medellín, con el clima húmedo que tenemos, este es uno de los problemas más frecuentes en las casas.

Antes de buscar la solución, hay que entender la causa. Porque no toda humedad se arregla igual.

## Los 4 tipos de humedad en paredes

### 1. Humedad por filtración

El agua entra desde afuera: por una gotera en el techo, por una ventana mal sellada o por una pared exterior que no tiene impermeabilización. Es la causa más obvia y generalmente la más fácil de solucionar.

**Cómo se ve**: Manchas que aparecen o crecen cuando llueve. Suelen estar en paredes exteriores o debajo del techo.

### 2. Humedad por capilaridad

El agua sube desde el suelo a través de la pared, como si la pared la absorbiera. Pasa en casas de primer piso, sótanos o construcciones sin barrera impermeable en la base.

**Cómo se ve**: Manchas que empiezan desde abajo, en la parte baja de la pared (primeros 50-100 cm). La pintura se descascara en esa zona.

### 3. Humedad por condensación

Cuando el aire húmedo de adentro de la casa toca una pared fría, se condensa (como cuando se empaña un vaso frío). Pasa mucho en baños, cocinas y habitaciones con mala ventilación.

**Cómo se ve**: Gotas de agua en la pared o ventanas. Moho negro en esquinas, detrás de muebles o en techos de baños.

### 4. Humedad por fuga de tubería

Una tubería rota o con fuga dentro de la pared libera agua que empapa la estructura desde adentro. Es la más difícil de detectar y puede causar daños serios si no se atiende.

**Cómo se ve**: Mancha localizada que crece, a veces con la pared hinchada o blanda. Puede aparecer lejos de la fuga porque el agua viaja por dentro.

## ¿Cómo solucionar la humedad en las paredes?

La solución depende de la causa. No tiene sentido pintar encima de una mancha si no arreglás lo que la genera.

### Solución para humedad por filtración

1. **Identificá el punto de entrada del agua**: ¿Viene del techo? ¿De una pared exterior? ¿De una ventana?
2. **Reparar la fuente**: Sellar el techo, impermeabilizar la pared exterior o arreglar la ventana.
3. **Dejar secar la pared** completamente (puede tomar varios días).
4. **Tratar la pared**: Aplicar sellador anti-humedad y pintar con pintura adecuada.

### Solución para humedad por capilaridad

1. **Barrera química**: Se inyecta un producto impermeabilizante en la base de la pared que crea una barrera contra la humedad ascendente.
2. **Drenaje perimetral**: En casos graves, se instala un drenaje alrededor de la casa para desviar el agua del suelo.
3. **Revestimiento interior**: Se aplica un mortero hidrófugo en la parte baja de la pared.

### Solución para humedad por condensación

1. **Mejorar la ventilación**: Abrir ventanas, instalar extractores en baños y cocinas.
2. **No secar ropa dentro de la casa**: Esto aumenta la humedad del ambiente.
3. **Aislar las paredes frías**: Un aislamiento térmico evita que la pared esté más fría que el aire interior.
4. **Limpiar el moho**: Con una solución de agua y vinagre o un producto anti-moho.

### Solución para humedad por fuga

1. **Llamar a un plomero** para que detecte y repare la fuga.
2. **Dejar secar la pared** completamente después de la reparación.
3. **Resanar y pintar** una vez que todo esté seco.

## ¿Cómo quitar las manchas de humedad de la pared?

Una vez que la causa está resuelta, podés tratar las manchas:

1. **Limpiar la superficie**: Retirá la pintura suelta, el moho y los residuos con una espátula y un cepillo.
2. **Aplicar anti-moho**: Si hay moho, aplicá un tratamiento anti-hongos y dejalo actuar según las instrucciones del producto.
3. **Dejar secar completamente**: La pared debe estar completamente seca antes de cualquier tratamiento.
4. **Aplicar sellador anti-humedad**: Una base selladora que impide que la mancha traspase la pintura nueva.
5. **Pintar con pintura anti-humedad**: Usá una pintura diseñada para resistir la humedad.

> **Importante**: Si pintás sobre una mancha sin resolver la causa, la mancha va a volver. Garantizado.

## ¿Cuánto cuesta tratar la humedad en paredes en Medellín?

| Servicio | Precio aproximado |
|----------|------------------|
| Tratamiento de humedad superficial | Desde $250.000 COP |
| Pintura anti-humedad (por m²) | Desde $15.000 COP/m² |
| Reparación de filtración + pintura | Desde $400.000 COP |
| Barrera química anti-capilaridad | Desde $45.000 COP/m lineal |
| Impermeabilización de pared exterior | Desde $25.000 COP/m² |

Estos son precios de referencia. El costo real depende de la extensión del daño y la causa.

## ¿Cómo prevenir la humedad en las paredes?

Prevenir es siempre más barato que reparar:

- **Ventilá bien tu casa**: Abrí ventanas al menos una hora al día, especialmente en baños y cocinas.
- **Revisá el techo regularmente**: Un techo en buen estado evita filtraciones.
- **No pegues muebles a paredes exteriores**: Dejá un espacio de 5-10 cm para que circule el aire.
- **Usá extractores en baños**: Especialmente si no tienen ventana.
- **Atendé las manchas a tiempo**: Una mancha chiquita hoy es una pared destruida mañana.
- **Impermeabilizá paredes exteriores**: Especialmente las que dan hacia donde más llueve.

## ¿La humedad afecta la salud?

Sí. La humedad en las paredes favorece la aparición de moho y hongos que pueden causar:

- Alergias y problemas respiratorios.
- Irritación en ojos, nariz y garganta.
- Problemas de piel.
- Empeoramiento de asma.

Por eso es importante resolver la humedad no solo por estética sino por salud.

## ¿Necesitás ayuda con la humedad en tus paredes?

Si tenés paredes con manchas de humedad en tu casa o negocio en Medellín o el Valle de Aburrá, podemos ayudarte. Conoce nuestros [servicios de pintura](/servicios/pintura) y [servicios de techos](/servicios/techos). Si sospechás que la humedad viene de una tubería, lee nuestra guía de [fuga de agua en la pared](/blog/fuga-agua-pared-como-detectar). Revisamos cuál es la causa, te proponemos la solución y te damos un precio claro.`,
  },

  /* ---- ARTICLE 6 ---- */
  {
    slug: "preparar-casa-temporada-lluvias-medellin",
    title: "Cómo preparar tu casa para la temporada de lluvias en Medellín",
    metaDescription:
      "Checklist completo para preparar tu casa antes de la temporada de lluvias en Medellín. Techo, canales, paredes y plomería: todo lo que debés revisar.",
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
    updatedAt: "2026-03-01",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-hogar.svg",
    featuredImage: "/blog/placeholder-hogar.svg",
    featuredImageAlt: "Mantenimiento de techo antes de temporada de lluvias en Medellín",
    readingTimeMinutes: 9,
    isFeatured: true,
    relatedSlugs: ["como-arreglar-gotera-techo", "impermeabilizacion-techos-medellin-precios", "humedad-paredes-causas-soluciones"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella", "Caldas", "Copacabana", "Girardota"],
    tags: ["lluvias", "mantenimiento", "checklist", "temporada", "Medellín"],
    body: `## ¿Cuándo es la temporada de lluvias en Medellín?

Medellín tiene dos temporadas de lluvias al año:

- **Primera temporada**: marzo a mayo.
- **Segunda temporada**: septiembre a noviembre.

Entre las dos, Medellín recibe en promedio más de 1.600 mm de lluvia al año. Eso es mucha agua cayendo sobre tu techo, tus paredes y tus bajantes.

El problema no es la lluvia en sí, sino lo que pasa cuando tu casa no está preparada. Goteras, inundaciones menores, humedades en las paredes y daños que pudieron evitarse con una revisión a tiempo.

## Checklist completo: qué revisar antes de las lluvias

Acá te dejamos una guía paso a paso con todo lo que debés revisar antes de que empiecen las lluvias fuertes.

### 1. Techo y cubierta

El techo es tu primera línea de defensa contra la lluvia. Si falla, todo lo demás se complica.

**Revisá:**

- **Tejas rotas o desplazadas**: Mirá desde abajo si hay luz entrando por el techo. Si podés subir con seguridad, revisá que todas las tejas estén completas y bien asentadas.
- **Sellados y juntas**: Los puntos donde el techo se encuentra con la pared, con tubos o con otros techos son los más vulnerables. Verificá que el sellado esté íntegro.
- **Impermeabilización**: Si tu techo tiene más de 3-5 años sin impermeabilizar, es momento de hacerlo. La impermeabilización vencida es la causa número uno de goteras.
- **Claraboyas y tragaluces**: Revisá que los sellos alrededor estén en buen estado.

> Si encontrás tejas rotas o sellados deteriorados, es mejor arreglarlos ahora. Consultá nuestra guía de [cómo arreglar una gotera en el techo](/blog/como-arreglar-gotera-techo).

### 2. Canales y bajantes

Los canales recogen el agua del techo y la conducen hacia abajo. Si están tapados, el agua se desborda y entra por donde no debe.

**Revisá:**

- **Hojas y basura acumulada**: Limpiá los canales a fondo. Si tenés árboles cerca, esto es especialmente importante.
- **Inclinación correcta**: El agua debe correr hacia los bajantes, no estancarse. Si ves charcos en los canales, están mal nivelados.
- **Bajantes libres**: Verificá que el agua baje bien. Podés echar agua con una manguera para probar.
- **Uniones y empalmes**: Revisá que no haya fugas en las uniones de los canales ni en la conexión con los bajantes.
- **Salida final**: ¿A dónde llega el agua? Asegurate de que la salida de los bajantes esté libre y dirija el agua lejos de la base de la casa.

### 3. Paredes exteriores

Las paredes exteriores también reciben agua directa, especialmente las que dan hacia el norte o hacia donde sopla el viento cuando llueve.

**Revisá:**

- **Pintura y revestimiento**: Si la pintura exterior está descascarada o agrietada, el agua se filtra por ahí. Una buena pintura exterior con impermeabilizante protege la pared.
- **Grietas visibles**: Cualquier grieta en la fachada es una puerta de entrada para el agua. Sellá con masilla o mortero.
- **Ventanas y marcos**: Revisá los sellos alrededor de las ventanas. Un sellado deteriorado deja pasar agua en cada aguacero.
- **Base de las paredes**: Si ves que la base de las paredes exteriores siempre está húmeda, puede haber un problema de capilaridad que hay que tratar antes de las lluvias.

> Para más información sobre humedad en las paredes, lee nuestra guía completa de [humedad en las paredes: causas y soluciones](/blog/humedad-paredes-causas-soluciones).

### 4. Plomería y desagües

Las lluvias fuertes ponen a prueba todo el sistema de desagüe de tu casa.

**Revisá:**

- **Desagües del patio y terraza**: Limpiá las rejillas y verificá que el agua drene rápido. Un desagüe lento se convierte en una inundación cuando llueve fuerte.
- **Sifones y trampas de grasa**: Si están tapados, el agua se devuelve. Hacé limpieza preventiva.
- **Tuberías visibles**: Revisá si hay fugas, goteos o conexiones flojas en tuberías que puedas ver (cuarto de lavado, baños, cocina).
- **Bombas de achique**: Si tu casa tiene sótano o zona baja que se inunda, verificá que la bomba de achique funcione antes de que la necesités.

### 5. Interior de la casa

También hay cosas que podés hacer adentro para prepararte:

- **Revisá los cielo rasos**: Manchas, abultamientos o pintura que se pela pueden indicar filtraciones activas desde el techo.
- **Ventilación**: Asegurate de que baños y cocina tengan buena ventilación para evitar condensación.
- **Muebles contra paredes exteriores**: Dejá un espacio de al menos 5 cm entre muebles y paredes exteriores para permitir circulación de aire.
- **Revisá las llaves de paso**: Sabé dónde están y verificá que cierren bien, por si necesitás cortar el agua en una emergencia.

## ¿Qué pasa si no preparás tu casa?

Los problemas más comunes que vemos después de cada temporada de lluvias son:

| Problema | Causa típica | Costo de reparación |
|----------|-------------|-------------------|
| Goteras activas | Impermeabilización vencida o tejas rotas | Desde $180.000 COP |
| Humedad en paredes interiores | Filtración por fachada o techo | Desde $250.000 COP |
| Inundación en patio o garaje | Desagües tapados | Desde $160.000 COP |
| Moho en paredes y techos | Condensación + falta de ventilación | Desde $250.000 COP |
| Daño en cielo raso | Agua acumulada sobre el cielo raso | Desde $350.000 COP |

Todos estos problemas son más baratos de prevenir que de reparar.

## Calendario de mantenimiento preventivo

Para que no se te olvide, acá tenés un calendario simple:

### Febrero - marzo (antes de la primera temporada)
- Limpiar canales y bajantes.
- Revisar impermeabilización del techo.
- Revisar y sellar grietas en fachada.
- Verificar desagües de patio y terraza.

### Agosto - septiembre (antes de la segunda temporada)
- Repetir limpieza de canales.
- Verificar que las reparaciones de la primera temporada aguantaron.
- Revisar pintura exterior.
- Limpiar sifones y desagües interiores.

### Todo el año
- Revisar el techo después de tormentas fuertes.
- Atender manchas de humedad apenas aparezcan.
- Mantener las rejillas de desagüe libres de hojas.

## Cuánto cuesta el mantenimiento preventivo

| Servicio preventivo | Precio aproximado |
|-------------------|------------------|
| Limpieza de canales y bajantes | Desde $150.000 COP |
| Revisión completa del techo | Desde $130.000 COP |
| Sellado de fisuras y juntas | Desde $210.000 COP |
| Impermeabilización de cubierta | Desde $350.000 COP |
| Limpieza de cubierta | Desde $140.000 COP |
| Pintura exterior (fachada) | Desde $330.000 COP |

> Todos los precios son de referencia. El valor final se define con la visita técnica gratuita.

## ¿Necesitás preparar tu casa antes de las lluvias?

Si estás en Medellín o el Valle de Aburrá, podemos hacer una revisión completa de tu techo, canales, paredes y desagües. Conoce nuestros [servicios de techos y cubiertas](/servicios/techos), [servicios de pintura](/servicios/pintura) y [servicios de plomería](/servicios/plomeria). Te decimos qué necesita atención, qué puede esperar y cuánto cuesta cada cosa. La visita y la cotización son gratuitas.`,
  },

  /* ---- ARTICLE 7 ---- */
  {
    slug: "cuanto-cobra-plomero-medellin-precios",
    title: "¿Cuánto cobra un plomero en Medellín en 2026? Precios reales",
    metaDescription:
      "Precios reales de plomería en Medellín en 2026. Cuánto cobra un plomero por destape, reparación de fugas, cambio de grifería y más servicios.",
    targetKeyword: "cuanto cobra un plomero en Medellín",
    secondaryKeywords: [
      "precio plomero Medellín",
      "plomero Medellín precio",
      "cuanto cuesta un plomero en Medellín",
      "tarifas plomería Medellín 2026",
      "plomero barato Medellín",
    ],
    category: "guias",
    serviceLines: ["plomeria"],
    relatedServiceIds: ["reparacion-fugas", "destape-desagues", "cambio-griferia", "ajuste-sanitario", "revision-presion-agua", "mantenimiento-tuberias"],
    publishedAt: "2026-03-05",
    updatedAt: "2026-03-05",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-plomeria.svg",
    featuredImage: "/blog/placeholder-plomeria.svg",
    featuredImageAlt: "Plomero profesional reparando tubería en Medellín",
    readingTimeMinutes: 8,
    isFeatured: true,
    relatedSlugs: ["fuga-agua-pared-como-detectar", "destape-canerias-medellin-metodos-precios", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella", "Copacabana"],
    tags: ["plomería", "precios", "plomero", "Medellín", "tarifas"],
    body: `## ¿Cuánto cobra un plomero en Medellín?

Si tenés un problema de plomería en tu casa o negocio, lo primero que querés saber es cuánto te va a costar resolverlo. Acá te damos los precios reales del mercado en Medellín y el Valle de Aburrá para 2026.

**La respuesta corta**: un servicio de plomería en Medellín cuesta entre **$120.000 y $500.000 COP** dependiendo del tipo de trabajo. La mayoría de reparaciones comunes están en el rango de $130.000 a $250.000 COP.

## Tabla de precios de plomería en Medellín 2026

Estos son los precios de referencia para los servicios de plomería más solicitados:

| Servicio | Precio desde | Rango típico |
|----------|-------------|-------------|
| Revisión de presión del agua | $120.000 COP | $120.000 - $180.000 |
| Detección de fuga visible | $130.000 COP | $130.000 - $200.000 |
| Reparación de llaves y conexiones | $140.000 COP | $140.000 - $220.000 |
| Cambio de grifería | $150.000 COP | $150.000 - $280.000 |
| Destape de desagües | $160.000 COP | $160.000 - $300.000 |
| Ajuste de sanitario | $165.000 COP | $165.000 - $250.000 |
| Reparación de fugas | $170.000 COP | $170.000 - $350.000 |
| Mantenimiento de tuberías | $200.000 COP | $200.000 - $400.000 |

> Estos precios incluyen mano de obra. Los materiales (llaves, griferías, tubos, accesorios) se cotizan aparte según lo que se necesite.

## ¿Qué incluye el precio de un plomero?

Un servicio de plomería profesional normalmente incluye:

- **Diagnóstico**: El plomero revisa el problema, identifica la causa y te explica qué hay que hacer.
- **Mano de obra**: El trabajo de reparación en sí.
- **Herramienta especializada**: El plomero lleva sus herramientas.
- **Garantía**: Un servicio profesional te da garantía por el trabajo realizado.

### ¿Qué NO incluye normalmente?

- **Materiales**: Tubos, codos, pegantes, griferías, válvulas y accesorios se cobran aparte.
- **Obra civil**: Si hay que romper piso o pared para acceder a la tubería, eso es un costo adicional.
- **Resane posterior**: Después de reparar, si se abrió pared o piso, el resane puede tener un costo adicional.

## Desglose por tipo de servicio

### Destape de desagües

El destape es uno de los servicios más pedidos. El precio varía según la dificultad:

| Tipo de destape | Precio aproximado |
|----------------|------------------|
| Destape sencillo (sifón o rejilla) | $160.000 - $200.000 |
| Destape con sonda manual | $200.000 - $280.000 |
| Destape con máquina rotativa | $280.000 - $400.000 |
| Destape de tubería principal | $350.000 - $500.000+ |

La diferencia está en dónde está el tapón y qué tan profundo hay que llegar para resolverlo. Un sifón tapado en el lavamanos es simple. Un tapón en la tubería principal de desagüe es otra cosa.

> Para más información, lee nuestra guía completa de [destape de cañerías en Medellín: métodos y precios](/blog/destape-canerias-medellin-metodos-precios).

### Reparación de fugas

El precio depende de la ubicación y la gravedad de la fuga:

| Tipo de fuga | Precio aproximado |
|-------------|------------------|
| Fuga visible en llave o conexión | $170.000 - $230.000 |
| Fuga en tubería expuesta | $200.000 - $300.000 |
| Fuga oculta en pared (con apertura) | $300.000 - $500.000 |
| Fuga en piso (con apertura) | $350.000 - $600.000+ |

Las fugas ocultas son más caras porque hay que encontrarlas, abrir la pared o el piso, reparar y cerrar de nuevo.

> Si sospechás que tenés una fuga oculta, consultá nuestra guía de [fuga de agua en la pared: cómo detectarla](/blog/fuga-agua-pared-como-detectar).

### Cambio de grifería

El precio del cambio depende del tipo de grifería y la complejidad de la instalación:

| Tipo de trabajo | Precio aproximado (solo mano de obra) |
|----------------|--------------------------------------|
| Cambio de llave sencilla | $150.000 - $200.000 |
| Instalación de grifería de cocina | $180.000 - $250.000 |
| Instalación de grifería de ducha | $200.000 - $300.000 |
| Cambio de mezclador (caliente/fría) | $220.000 - $320.000 |

> El precio de la grifería en sí varía enormemente. Una llave básica cuesta $30.000 - $60.000 COP. Una grifería de marca puede costar $150.000 - $500.000+.

## ¿Qué factores cambian el precio?

### 1. Urgencia

Un servicio de emergencia (fuga activa, inundación) puede costar más que un servicio programado, especialmente si es en horario nocturno o fin de semana.

### 2. Accesibilidad

Si la tubería está enterrada, empotrada en la pared o en un lugar de difícil acceso, el trabajo toma más tiempo y cuesta más.

### 3. Antigüedad de la instalación

En casas viejas con tuberías de hierro galvanizado o con conexiones obsoletas, las reparaciones son más complicadas porque a veces hay que adaptar materiales.

### 4. Materiales necesarios

Un cambio de llave simple necesita un accesorio de $20.000. Pero si hay que reemplazar un tramo de tubería completo, los materiales suman.

### 5. Zona

Los precios pueden variar ligeramente entre municipios del Valle de Aburrá. En zonas de difícil acceso o distantes, puede haber un cargo por desplazamiento.

## ¿Cómo elegir un buen plomero en Medellín?

No todos los plomeros son iguales. Acá te damos criterios para elegir bien:

### Lo que debés buscar

- **Que haga diagnóstico antes de cobrar**: Un buen plomero primero revisa, diagnostica y te dice qué hay que hacer antes de empezar.
- **Que te dé un precio claro antes de empezar**: Nada de "eso lo vemos después". Debés saber cuánto vas a pagar antes de que empiece el trabajo.
- **Que ofrezca garantía por escrito**: Si la reparación falla, debe responder sin costo adicional.
- **Que tenga experiencia demostrable**: Preguntá por trabajos anteriores o buscá referencias.

### Señales de alerta

- Te cobra solo por ir a mirar (la visita debería ser gratis o a precio simbólico).
- No te da precio antes de empezar.
- Te presiona para hacer trabajos adicionales que no pediste.
- No tiene herramienta profesional.
- No da factura ni garantía.

## Errores comunes al contratar un plomero

### 1. Buscar solo el más barato

El plomero que cobra $50.000 por un destape probablemente no tiene herramienta profesional, no da garantía y puede dejarte el problema peor.

### 2. Esperar demasiado

Una fuga pequeña que cuesta $170.000 hoy puede convertirse en un daño de $800.000 si dejás que el agua siga dañando la pared, el piso o la estructura.

### 3. Intentar hacerlo vos mismo

Hay cosas simples que podés hacer (cambiar un empaque, ajustar una llave). Pero las reparaciones de tuberías, destapes profundos y fugas ocultas necesitan herramientas y experiencia profesional.

## ¿Necesitás un plomero en Medellín?

Si tenés un problema de plomería en Medellín o el Valle de Aburrá, podemos ayudarte. Explorá todos nuestros [servicios de plomería](/servicios/plomeria) con precios de referencia. Vamos a tu casa o negocio, revisamos el problema y te damos un precio claro antes de empezar. La visita técnica y la cotización son gratuitas.`,
  },

  /* ---- ARTICLE 8 ---- */
  {
    slug: "destape-canerias-medellin-metodos-precios",
    title: "Destape de cañerías en Medellín: métodos, precios y consejos",
    metaDescription:
      "Guía completa de destape de cañerías en Medellín. Métodos profesionales, precios por tipo de destape, cuándo hacerlo vos mismo y cuándo llamar a un profesional.",
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
    relatedServiceIds: ["destape-desagues", "mantenimiento-tuberias", "reparacion-fugas"],
    publishedAt: "2026-03-15",
    updatedAt: "2026-03-15",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-plomeria.svg",
    featuredImage: "/blog/placeholder-plomeria.svg",
    featuredImageAlt: "Destape profesional de cañería con equipo especializado en Medellín",
    readingTimeMinutes: 8,
    isFeatured: false,
    relatedSlugs: ["cuanto-cobra-plomero-medellin-precios", "fuga-agua-pared-como-detectar", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella"],
    tags: ["destape", "cañerías", "desagües", "plomería", "Medellín"],
    body: `## ¿Por qué se tapan las cañerías?

Las cañerías tapadas son uno de los problemas de plomería más frecuentes en las casas de Medellín. Antes de hablar de soluciones, entendamos qué las causa:

### Causas más comunes

- **Grasa y residuos de cocina**: La grasa que botás por el lavaplatos se enfría dentro de la tubería y se va acumulando hasta formar un tapón.
- **Cabello y jabón**: En duchas y lavamanos, el cabello se enreda con residuos de jabón y forma obstrucciones.
- **Papel higiénico y toallas húmedas**: Botar toallas húmedas, toallas desmaquillantes o papel excesivo por el sanitario tapa las tuberías con el tiempo.
- **Raíces de árboles**: En casas con jardín, las raíces pueden meterse en las tuberías de desagüe y bloquearlas.
- **Sedimento y cal**: Con el tiempo, los minerales del agua se acumulan en las paredes internas de las tuberías, reduciendo el diámetro.
- **Objetos extraños**: Juguetes, tapas, cubiertos u objetos que caen accidentalmente al desagüe.

## Señales de que tu cañería está tapándose

No esperés a que se tape completamente. Estas señales te avisan que hay un problema en formación:

1. **El agua baja lento**: Si el lavamanos, la ducha o el lavaplatos tardan más de lo normal en vaciar, la tubería se está obstruyendo.
2. **Burbujas al drenar**: Si ves burbujas cuando el agua baja, hay aire atrapado por una obstrucción.
3. **Mal olor en los desagües**: Los residuos acumulados generan un olor fuerte y desagradable.
4. **Agua que se devuelve**: Si el agua sube por otro desagüe cuando descargás el sanitario o usás la lavadora, las tuberías principales están comprometidas.
5. **Ruidos en las tuberías**: Sonidos de gorgoteo o burbujeo cuando el agua drena.

## Métodos de destape: del más simple al más complejo

### 1. Agua caliente (DIY)

**Para qué sirve**: Tapones leves de grasa en el lavaplatos.

**Cómo hacerlo**:
1. Hervir una olla grande de agua.
2. Verter el agua caliente directamente por el desagüe en un chorro continuo.
3. Esperar 5 minutos y repetir.

**Limitaciones**: Solo funciona con tapones leves de grasa. No sirve para pelo, objetos sólidos ni tapones viejos.

> **Precaución**: No usés agua hirviendo en tuberías de PVC viejas, ya que el calor excesivo puede dañar las uniones.

### 2. Chupa o sopapa (DIY)

**Para qué sirve**: Tapones parciales en lavamanos, lavaplatos o sanitario.

**Cómo hacerlo**:
1. Tapá el rebosadero del lavamanos con un trapo húmedo (el orificio de arriba).
2. Poné la chupa sobre el desagüe asegurando un buen sello.
3. Bombeá con fuerza 15-20 veces.
4. Retirá y verificá si el agua baja.

**Limitaciones**: No funciona con tapones profundos ni con tuberías principales.

### 3. Sonda manual o cable destapador (semi-profesional)

**Para qué sirve**: Tapones a 1-3 metros de profundidad en tuberías secundarias.

**Cómo funciona**: Se introduce un cable flexible por el desagüe que va rompiendo o enganchando la obstrucción. Se puede comprar en ferreterías por $25.000-$50.000 COP.

**Limitaciones**: Requiere algo de habilidad. No es efectivo en tuberías principales ni en tapones muy duros.

### 4. Máquina rotativa (profesional)

**Para qué sirve**: Tapones difíciles, profundos o en tuberías principales.

**Cómo funciona**: Una máquina eléctrica gira un cable de acero que rompe cualquier obstrucción, incluyendo raíces, grasa endurecida y sedimento acumulado. Puede llegar a 15-30 metros de profundidad.

**Cuándo usarla**: Es el método más efectivo para tapones serios. Requiere un plomero profesional con el equipo.

### 5. Hydro-jetting (profesional avanzado)

**Para qué sirve**: Limpieza profunda de tuberías comerciales o residenciales con tapones recurrentes.

**Cómo funciona**: Se inyecta agua a alta presión (1.500-4.000 PSI) que barre todo el interior de la tubería: grasa, raíces, sedimento y cualquier obstrucción.

**Cuándo usarla**: Para tuberías que se tapan constantemente, edificios, restaurantes o cuando otros métodos no resuelven.

## ¿Cuánto cuesta destapar una cañería en Medellín?

| Tipo de destape | Precio aproximado | Tiempo estimado |
|----------------|------------------|----------------|
| Destape sencillo (sifón/rejilla) | $160.000 - $200.000 | 30-60 min |
| Destape con sonda manual | $200.000 - $280.000 | 1-2 horas |
| Destape con máquina rotativa | $280.000 - $400.000 | 1-3 horas |
| Destape de tubería principal | $350.000 - $500.000+ | 2-4 horas |
| Hydro-jetting (alta presión) | $400.000 - $700.000+ | 2-5 horas |

> Estos precios incluyen mano de obra y uso de equipos. Los precios pueden variar según la dificultad y la ubicación del tapón.

## ¿Cuándo hacerlo vos mismo y cuándo llamar a un profesional?

### Podés intentar vos mismo cuando:

- El agua baja lento pero todavía drena.
- El problema es en un solo punto (un lavamanos, una ducha).
- No hay mal olor fuerte ni agua devolviéndose.
- Es la primera vez que pasa en esa zona.

### Llamá a un profesional cuando:

- El agua no baja del todo.
- Varios desagües están afectados al mismo tiempo.
- El agua se devuelve por otro desagüe.
- Ya intentaste los métodos caseros y no funcionaron.
- Hay mal olor persistente.
- El problema es recurrente (se tapa cada pocas semanas).

## Productos químicos destapadores: ¿sirven?

Los destapadores químicos que se venden en el supermercado pueden funcionar para tapones leves, pero tienen problemas importantes:

**Contras:**
- Son corrosivos y pueden dañar tuberías de PVC con el uso frecuente.
- Son tóxicos y peligrosos para manipular.
- No resuelven tapones serios (solo los aflojan temporalmente).
- Contaminan el agua.

**Nuestra recomendación**: Evitalos. Un destape profesional es más seguro, más efectivo y no daña tus tuberías.

## Cómo prevenir que se tapen las cañerías

La prevención es más barata que el destape:

- **Usá un filtro en el lavaplatos**: Atrapa restos de comida antes de que lleguen a la tubería. Cuestan $5.000-$15.000 COP.
- **No botés grasa por el desagüe**: Dejá que la grasa se enfríe y botala a la basura.
- **Poné rejilla atrapa-pelos en la ducha**: Evita que el cabello llegue a la tubería.
- **No botés toallas húmedas por el sanitario**: Solo papel higiénico. Todo lo demás va a la basura.
- **Echá agua caliente por los desagües una vez por semana**: Ayuda a disolver grasa acumulada.
- **Hacé mantenimiento preventivo cada 6-12 meses**: Una limpieza profesional periódica evita tapones.

## ¿Tenés una cañería tapada?

Si tenés un desagüe tapado en Medellín o el Valle de Aburrá, podemos ayudarte. Conoce todos nuestros [servicios de plomería](/servicios/plomeria) o consultá nuestros [precios de plomería en Medellín](/blog/cuanto-cobra-plomero-medellin-precios). Vamos, revisamos y destapamos. Sin complicaciones.`,
  },

  /* ---- ARTICLE 9 ---- */
  {
    slug: "como-quitar-moho-paredes-definitivamente",
    title: "Cómo quitar el moho de las paredes de forma definitiva",
    metaDescription:
      "Guía para eliminar el moho de las paredes definitivamente. Métodos caseros, productos recomendados, riesgos para la salud y cuándo necesitás un profesional.",
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
    updatedAt: "2026-04-01",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-pintura.svg",
    featuredImage: "/blog/placeholder-pintura.svg",
    featuredImageAlt: "Tratamiento profesional de moho en pared de vivienda",
    readingTimeMinutes: 9,
    isFeatured: false,
    relatedSlugs: ["humedad-paredes-causas-soluciones", "preparar-casa-temporada-lluvias-medellin", "precio-pintar-apartamento-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "La Estrella"],
    tags: ["moho", "hongos", "paredes", "humedad", "salud"],
    body: `## ¿Qué es el moho y por qué aparece en las paredes?

El moho es un hongo que crece en superficies húmedas. Se ve como manchas negras, verdes, grises o blancas en las paredes, los techos o las esquinas de la casa. Además de ser feo, es un problema de salud.

En Medellín, con la humedad relativa que promedia el 70% durante el año y que sube durante las temporadas de lluvia, el moho es un problema muy común en las casas.

### ¿Por qué crece moho en tu casa?

El moho necesita tres cosas para crecer:

1. **Humedad**: Sin humedad no hay moho. Puede venir de goteras, fugas, condensación o humedad del suelo.
2. **Temperatura**: El moho crece mejor entre 20°C y 30°C. Exactamente el rango de temperatura de Medellín.
3. **Material orgánico**: La pintura, el papel de colgadura, la madera y hasta el polvo son alimento para el moho.

En resumen: si tu casa tiene alguna fuente de humedad y no tiene buena ventilación, el moho va a aparecer.

## Riesgos del moho para la salud

Antes de hablar de cómo quitarlo, es importante que sepas por qué debés hacerlo rápido:

- **Problemas respiratorios**: El moho libera esporas que irritan las vías respiratorias. Las personas con asma son especialmente sensibles.
- **Alergias**: Estornudos, congestión nasal, ojos rojos y picazón en la piel.
- **Infecciones**: En personas con el sistema inmune debilitado, el moho puede causar infecciones pulmonares.
- **Irritación**: Ojos llorosos, dolor de cabeza y malestar general.

> **Importante**: Si algún miembro de tu familia tiene asma, alergias o problemas respiratorios, el moho puede empeorar su condición significativamente. Actuá rápido.

## Cómo quitar el moho: métodos caseros

Para manchas de moho pequeñas (menos de 1 metro cuadrado) podés intentar estos métodos:

### 1. Vinagre blanco

El vinagre es un antifúngico natural que mata el 82% de las especies de moho.

**Cómo usarlo**:
1. Poné vinagre blanco puro (sin diluir) en un rociador.
2. Rociá generosamente sobre la zona con moho.
3. Dejá actuar 1-2 horas.
4. Limpiá con un cepillo de cerdas duras.
5. Enjuagá con agua limpia y dejá secar.

**Ventaja**: Es seguro, económico y no daña la mayoría de superficies.

### 2. Bicarbonato de sodio

Funciona bien solo o combinado con vinagre.

**Cómo usarlo**:
1. Mezclá 1 cucharada de bicarbonato en 1 taza de agua.
2. Rociá sobre el moho.
3. Dejá actuar 30 minutos.
4. Frotá con un cepillo.
5. Enjuagá con agua y secá bien.

**Para manchas difíciles**: Hacé una pasta espesa de bicarbonato con agua, aplicá sobre el moho y dejá actuar toda la noche. Al otro día, frotá y enjuagá.

### 3. Agua oxigenada (peróxido de hidrógeno al 3%)

Más potente que el vinagre para manchas difíciles.

**Cómo usarlo**:
1. Aplicá agua oxigenada con un rociador sobre la zona afectada.
2. Dejá actuar 15-20 minutos.
3. Frotá con un cepillo.
4. Limpiá y dejá secar.

**Precaución**: Puede aclarar superficies oscuras o de color. Probá primero en un área pequeña.

### 4. Cloro diluido (último recurso)

El cloro mata el moho superficial pero no penetra en materiales porosos.

**Cómo usarlo**:
1. Mezclá 1 parte de cloro en 10 partes de agua.
2. Aplicá con esponja o rociador.
3. Dejá actuar 10 minutos.
4. Enjuagá bien con agua limpia.

**Precauciones importantes**:
- **Nunca mezcles cloro con vinagre, amoníaco u otros productos**: produce gases tóxicos.
- Usá guantes, gafas y abrí las ventanas.
- El cloro puede dañar superficies pintadas y telas.

## ¿Por qué el moho vuelve después de limpiarlo?

Si limpiás el moho pero no resolvés la causa de la humedad, va a volver. Garantizado. Las causas más comunes son:

### Condensación

La causa más frecuente en Medellín. Pasa cuando el aire húmedo del interior toca una superficie más fría (paredes exteriores, esquinas, detrás de muebles).

**Solución**: Mejorar la ventilación. Abrí ventanas al menos 1 hora al día. Usá extractores en baños y cocinas. No sequés ropa adentro de la casa.

### Filtración por el techo

Si el moho está en el techo o en la parte alta de las paredes, probablemente hay una filtración desde arriba.

**Solución**: Revisar y reparar el techo. Impermeabilizar si es necesario. Para más información, consultá nuestra guía de [impermeabilización de techos en Medellín](/blog/impermeabilizacion-techos-medellin-precios).

### Fuga de tubería

Si el moho está localizado en una zona específica de la pared, puede haber una tubería rota detrás.

**Solución**: Llamar a un plomero para detectar y reparar la fuga. Lee nuestra guía de [fuga de agua en la pared](/blog/fuga-agua-pared-como-detectar).

### Humedad por capilaridad

Si el moho aparece en la parte baja de las paredes del primer piso, el agua puede estar subiendo desde el suelo.

**Solución**: Barrera química o tratamiento impermeabilizante en la base. Consultá nuestra guía de [humedad en las paredes: causas y soluciones](/blog/humedad-paredes-causas-soluciones).

## Cuándo llamar a un profesional

Debés llamar a un profesional cuando:

- **El moho cubre más de 1 metro cuadrado**: Un área grande requiere tratamiento profesional con productos industriales.
- **El moho vuelve después de limpiarlo**: Hay un problema de humedad que no estás resolviendo.
- **El moho está detrás de muebles empotrados o dentro de paredes**: No podés acceder ni tratarlo adecuadamente.
- **Hay personas con problemas respiratorios en la casa**: No debés exponerlas a esporas durante la limpieza.
- **El moho está en el cielo raso o el techo**: Puede indicar un problema estructural de humedad.

## Tratamiento profesional del moho

Un tratamiento profesional incluye:

1. **Diagnóstico**: Se identifica la causa de la humedad que genera el moho.
2. **Contención**: Se aísla la zona para evitar que las esporas se dispersen.
3. **Remoción**: Se retira el moho con productos antifúngicos industriales.
4. **Tratamiento de la causa**: Se repara la filtración, fuga o problema de ventilación.
5. **Sellado**: Se aplica sellador anti-humedad en la superficie.
6. **Pintura anti-moho**: Se pinta con pintura que contiene fungicida para prevenir reaparición.

## ¿Cuánto cuesta quitar el moho en Medellín?

| Servicio | Precio aproximado |
|----------|------------------|
| Tratamiento de humedad superficial | Desde $250.000 COP |
| Limpieza y tratamiento anti-moho (por m²) | $20.000 - $35.000 COP/m² |
| Sellado anti-humedad + pintura | Desde $400.000 COP |
| Tratamiento completo (causa + moho + pintura) | Desde $600.000 COP |

> Los precios dependen de la extensión del moho, la causa de la humedad y los materiales necesarios.

## Cómo prevenir que el moho vuelva

Una vez que eliminás el moho y resolvés la causa, seguí estos hábitos:

- **Ventilá tu casa todos los días**: Abrí ventanas para que circule el aire, especialmente después de ducharte o cocinar.
- **Usá extractores**: En baños sin ventana, un extractor es indispensable.
- **No sequés ropa adentro**: Si no tenés otra opción, abrí las ventanas mientras la ropa se seca.
- **Limpiá las paredes de baño y ducha regularmente**: Un trapo seco después de cada ducha evita que la humedad se acumule.
- **Dejá espacio entre muebles y paredes**: Al menos 5-10 cm para que circule el aire.
- **Revisá el techo y las tuberías periódicamente**: Prevenir fugas y filtraciones es prevenir el moho.

## ¿Necesitás ayuda con el moho en tu casa?

Si tenés moho en las paredes de tu casa en Medellín o el Valle de Aburrá, podemos ayudarte. Conoce nuestros [servicios de pintura y acabados](/servicios/pintura) para el tratamiento profesional. Si el problema viene del techo, revisá nuestros [servicios de techos y cubiertas](/servicios/techos). Identificamos la causa, eliminamos el moho y te damos garantía. La visita técnica es gratuita.`,
  },

  /* ---- ARTICLE 10 ---- */
  {
    slug: "tipos-tejas-casas-colombia-comparativa",
    title: "Tipos de tejas para casas en Colombia: comparativa completa",
    metaDescription:
      "Comparativa de los 6 tipos de tejas más usados en Colombia: barro, fibrocemento, termoacústica, policarbonato, PVC y metálica. Precios, ventajas y cuál elegir.",
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
    relatedServiceIds: ["impermeabilizacion-cubiertas", "cambio-teja-puntual", "revision-techo"],
    publishedAt: "2026-04-10",
    updatedAt: "2026-04-10",
    author: "Espinal Multiservicios",
    authorRole: "Equipo técnico",
    ogImage: "/blog/placeholder-techos.svg",
    featuredImage: "/blog/placeholder-techos.svg",
    featuredImageAlt: "Diferentes tipos de tejas para techos en Colombia",
    readingTimeMinutes: 10,
    isFeatured: false,
    relatedSlugs: ["impermeabilizacion-techos-medellin-precios", "como-arreglar-gotera-techo", "preparar-casa-temporada-lluvias-medellin"],
    targetMunicipalities: ["Medellín", "Envigado", "Sabaneta", "Bello", "Itagüí", "Rionegro", "La Ceja", "Marinilla"],
    tags: ["tejas", "techos", "cubiertas", "Colombia", "comparativa", "precios"],
    body: `## ¿Cómo elegir la teja correcta para tu casa?

Elegir la teja adecuada es una decisión importante. El techo protege tu casa de la lluvia, el sol y el ruido, y la teja que elijás determina qué tan bien cumple esa función y cuánto dura.

En Colombia, y especialmente en el Valle de Aburrá, el clima es un factor decisivo: lluvias frecuentes, sol fuerte, cambios de temperatura durante el día. No todas las tejas se comportan igual bajo estas condiciones.

Acá te presentamos los 6 tipos de teja más comunes en Colombia, con sus ventajas, desventajas y precios actualizados.

## 1. Teja de barro (arcilla)

La teja tradicional colombiana. Se fabrica con arcilla cocida y se encuentra en diversos perfiles: española, colonial, plana y media caña.

### Ventajas

- **Excelente aislamiento térmico**: Mantiene la casa más fresca en el día y más cálida en la noche.
- **Durabilidad**: Con buen mantenimiento puede durar 50+ años.
- **Estética**: Apariencia clásica y elegante. Ideal para casas de estilo colonial o campestre.
- **Resistencia al fuego**: No se quema ni se deforma con el calor.
- **Buena resistencia a la lluvia**: Las tejas de barro bien instaladas no dejan pasar agua.

### Desventajas

- **Peso**: Es la teja más pesada. Necesita una estructura de soporte fuerte.
- **Fragilidad**: Se puede romper con golpes o si alguien camina sobre ellas.
- **Mantenimiento**: Con el tiempo crece musgo y líquenes que hay que limpiar.
- **Instalación más lenta**: Requiere mano de obra experimentada.

### Precio aproximado

| Concepto | Precio |
|----------|--------|
| Teja de barro (unidad) | $2.500 - $5.000 COP |
| Metro cuadrado instalado | $45.000 - $75.000 COP/m² |
| Cambio puntual de teja | Desde $190.000 COP (incluye mano de obra) |

### Ideal para

Casas de uno o dos pisos, fincas, casas campestres, construcciones que buscan estética tradicional. Muy usada en municipios del oriente antioqueño como Rionegro, La Ceja y Marinilla.

## 2. Teja de fibrocemento

La más común en construcciones económicas y de interés social en Colombia. Se fabrica con cemento reforzado con fibras sintéticas.

### Ventajas

- **Precio accesible**: Es una de las opciones más económicas.
- **Liviana**: Mucho más liviana que la teja de barro, necesita menos estructura.
- **Fácil instalación**: Se instala rápido con ganchos y amarres simples.
- **Variedad de tamaños**: Viene en láminas grandes que cubren más área con menos piezas.
- **Resistencia a la intemperie**: Aguanta bien la lluvia y el sol.

### Desventajas

- **Aislamiento térmico regular**: Transmite el calor, la casa se calienta más.
- **Ruido con la lluvia**: Las gotas de lluvia hacen mucho ruido sobre fibrocemento.
- **Estética limitada**: Aspecto industrial, menos atractiva que otras opciones.
- **Vida útil menor**: 15-25 años en condiciones normales.

### Precio aproximado

| Concepto | Precio |
|----------|--------|
| Lámina de fibrocemento (2.44m x 1.22m) | $35.000 - $55.000 COP |
| Metro cuadrado instalado | $35.000 - $55.000 COP/m² |

### Ideal para

Construcciones económicas, ampliaciones, techos de lavaderos, zonas de servicio. Muy usada en casas de Bello, Itagüí y Copacabana.

## 3. Teja termoacústica

Teja de metal (acero o aluminio) con un núcleo de poliuretano o poliestireno que le da aislamiento térmico y acústico.

### Ventajas

- **Aislamiento térmico y acústico**: Reduce significativamente el calor y el ruido de la lluvia.
- **Liviana pero resistente**: Combina poco peso con alta resistencia.
- **Larga vida útil**: 20-30 años con buen mantenimiento.
- **No se quiebra**: A diferencia de la teja de barro, aguanta pisadas y golpes.
- **Variedad de colores y perfiles**: Disponible en varios estilos.
- **Fácil instalación**: Se fija con tornillos autorroscantes.

### Desventajas

- **Precio más alto**: Es más cara que el fibrocemento.
- **Puede abollar**: Golpes fuertes (granizo grande, caída de ramas) pueden abollarla.
- **Corrosión**: Si se raya y se expone el metal base, puede oxidarse.

### Precio aproximado

| Concepto | Precio |
|----------|--------|
| Teja termoacústica (metro lineal) | $25.000 - $45.000 COP |
| Metro cuadrado instalado | $55.000 - $85.000 COP/m² |

### Ideal para

Casas donde el ruido de la lluvia es un problema, ampliaciones con terraza, proyectos que buscan buen aislamiento sin el peso de la teja de barro. Muy popular en Medellín, Envigado y Sabaneta.

## 4. Teja de policarbonato (transparente)

Láminas translúcidas de policarbonato que dejan pasar la luz. Se usan principalmente en zonas que necesitan iluminación natural.

### Ventajas

- **Deja pasar la luz**: Ilumina espacios sin necesidad de electricidad durante el día.
- **Muy liviana**: Facilísima de instalar y no requiere estructura pesada.
- **Resistente a impactos**: Es prácticamente irrompible.
- **No se oxida ni se pudre**: Resistente a la intemperie.

### Desventajas

- **Calor**: Deja pasar el sol y puede calentar mucho el espacio debajo.
- **No aísla ruido**: El ruido de la lluvia puede ser fuerte.
- **Se raya**: Con el tiempo puede perder transparencia.
- **Se amarillea**: Después de varios años la exposición UV la pone amarillenta.

### Precio aproximado

| Concepto | Precio |
|----------|--------|
| Lámina policarbonato (2.44m x 1.22m) | $50.000 - $90.000 COP |
| Metro cuadrado instalado | $60.000 - $100.000 COP/m² |

### Ideal para

Patios interiores, zonas de lavadero, pasillos, tragaluces. Se combina frecuentemente con otro tipo de teja en el resto de la cubierta.

## 5. Teja de PVC

Teja sintética fabricada en PVC (policloruro de vinilo). Disponible en perfiles que imitan la teja de barro, la teja colonial o la ondulada.

### Ventajas

- **Muy liviana**: La más liviana de todas las opciones.
- **No se rompe**: Flexible y resistente a impactos.
- **No se oxida ni le sale moho**: Resistente a la humedad.
- **Fácil de cortar e instalar**: Se trabaja con herramientas simples.
- **Económica**: Buena relación calidad-precio.
- **Variedad de estilos**: Imita otros materiales con buena apariencia.

### Desventajas

- **Aislamiento térmico limitado**: Similar al fibrocemento en transmisión de calor.
- **Ruido con la lluvia**: Más ruidosa que la termoacústica y la de barro.
- **Vida útil variable**: 15-20 años según la calidad y la exposición.
- **Se decolora**: Con años de exposición al sol puede perder color.

### Precio aproximado

| Concepto | Precio |
|----------|--------|
| Teja de PVC (unidad estándar) | $15.000 - $35.000 COP |
| Metro cuadrado instalado | $40.000 - $65.000 COP/m² |

### Ideal para

Techos de bajo presupuesto que necesitan mejor apariencia que el fibrocemento, ampliaciones, kioscos y estructuras livianas.

## 6. Teja metálica (zinc, acero galvanizado)

Láminas de acero galvanizado o zinc. Es el material más básico y económico para techos.

### Ventajas

- **Precio bajo**: La opción más económica del mercado.
- **Resistente**: Aguanta viento, lluvia y sol sin romperse.
- **Fácil instalación**: Se fija con tornillos y se puede instalar rápidamente.
- **Larga duración**: El acero galvanizado de buena calidad dura 20-30 años.
- **Reciclable**: Se puede reciclar al final de su vida útil.

### Desventajas

- **Cero aislamiento**: Transmite todo el calor y todo el frío.
- **Muy ruidosa**: El ruido de la lluvia puede ser insoportable.
- **Estética básica**: Aspecto industrial.
- **Corrosión**: Si se raya o pierde la capa de galvanizado, se oxida.
- **Condensación**: En climas húmedos como Medellín, condensa agua en la cara inferior.

### Precio aproximado

| Concepto | Precio |
|----------|--------|
| Lámina de zinc calibre 33 (2.44m x 0.80m) | $25.000 - $40.000 COP |
| Metro cuadrado instalado | $30.000 - $50.000 COP/m² |

### Ideal para

Techos de presupuesto muy ajustado, bodegas, zonas de servicio, construcciones temporales.

## Comparativa general

| Característica | Barro | Fibrocemento | Termoacústica | Policarbonato | PVC | Metálica |
|---------------|-------|-------------|---------------|--------------|-----|---------|
| Precio/m² | $$$ | $ | $$$$ | $$$ | $$ | $ |
| Aislamiento térmico | Excelente | Regular | Muy bueno | Malo | Regular | Malo |
| Aislamiento acústico | Bueno | Malo | Muy bueno | Malo | Regular | Muy malo |
| Durabilidad | 50+ años | 15-25 años | 20-30 años | 15-20 años | 15-20 años | 20-30 años |
| Peso | Pesada | Liviana | Liviana | Muy liviana | Muy liviana | Liviana |
| Estética | Excelente | Básica | Buena | Funcional | Buena | Básica |
| Mantenimiento | Medio | Bajo | Bajo | Bajo | Bajo | Medio |

## ¿Cuál teja elegir para Medellín?

Para el clima de Medellín y el Valle de Aburrá, estas son nuestras recomendaciones:

- **Si buscás aislamiento y estética**: Teja de barro o termoacústica.
- **Si el presupuesto es limitado**: Teja de PVC o fibrocemento.
- **Si querés la mejor relación calidad-precio**: Teja termoacústica.
- **Si necesitás luz natural**: Combiná tu teja principal con secciones de policarbonato.
- **Para zonas de servicio o bodegas**: Teja metálica o fibrocemento.

## ¿Necesitás revisar o cambiar el techo?

Si estás pensando en cambiar las tejas de tu casa o necesitás reparar tu techo actual, podemos ayudarte. Conoce todos nuestros [servicios de techos y cubiertas](/servicios/techos) con precios de referencia. Si tu techo actual tiene goteras, lee nuestra guía de [cómo arreglar una gotera en el techo](/blog/como-arreglar-gotera-techo). Revisamos tu techo, te asesoramos sobre la mejor opción y te damos un precio claro. La visita técnica es gratuita.`,
  },
];
