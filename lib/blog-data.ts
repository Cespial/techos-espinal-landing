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
    relatedSlugs: ["impermeabilizacion-techos-medellin-precios", "humedad-paredes-causas-soluciones"],
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

Si tenés una gotera en tu casa o negocio en Medellín o el Valle de Aburrá, podemos ayudarte. Revisamos tu techo, te decimos qué pasa y cuánto cuesta arreglarlo. Sin compromiso.`,
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
    relatedSlugs: ["humedad-paredes-causas-soluciones", "como-arreglar-gotera-techo"],
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

Si estás en Medellín o el Valle de Aburrá, podemos ir a tu apartamento, revisar el estado de las paredes y darte un precio claro, sin sorpresas. La visita y la cotización no tienen costo.`,
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
    relatedSlugs: ["humedad-paredes-causas-soluciones", "como-arreglar-gotera-techo"],
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

Si sospechás que hay una fuga en tu casa o negocio en Medellín o el Valle de Aburrá, podemos ayudarte. Vamos, revisamos y te decimos qué pasa y cuánto cuesta arreglarlo.`,
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
    relatedSlugs: ["como-arreglar-gotera-techo", "humedad-paredes-causas-soluciones"],
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

Si estás en Medellín o el Valle de Aburrá, podemos ir a revisar tu techo y darte una cotización sin costo. Te decimos qué tipo de impermeabilización necesitás y cuánto va a costar.`,
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
    relatedSlugs: ["fuga-agua-pared-como-detectar", "como-arreglar-gotera-techo"],
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

Si tenés paredes con manchas de humedad en tu casa o negocio en Medellín o el Valle de Aburrá, podemos ayudarte. Revisamos cuál es la causa, te proponemos la solución y te damos un precio claro.`,
  },
];
