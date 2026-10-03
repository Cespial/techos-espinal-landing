export const COMPANY_NAME = "Espinal Multiservicios";
export const SITE_URL = "https://espinalservicios.com";

// Fecha estable de última actualización de contenido (para sitemap.lastModified).
// Evita que cada deploy marque todas las URLs como "actualizadas" con la hora de build.
// Actualizar manualmente al revisar el contenido de las páginas estructurales.
export const LAST_CONTENT_UPDATE = "2026-10-03";

export const PHONE_DISPLAY = "(+57) 300 733 6333";
export const PHONE_E164 = "+573007336333";
export const WA_NUMBER = "573007336333";
export const DEFAULT_CITY = "Medellín / Valle de Aburrá";

export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;

export const NAV_LINKS = [
  { href: "/servicios/techos", label: "Techos" },
  { href: "/servicios/pintura", label: "Pintura" },
  { href: "/servicios/plomeria", label: "Plomería" },
  { href: "/cobertura", label: "Cobertura" },
  { href: "/blog", label: "Blog" },
  { href: "/nosotros", label: "Henrry" },
] as const;

export const LINE_OPTIONS = [
  { id: "techos", label: "Techos y cubiertas" },
  { id: "pintura", label: "Pintura y acabados" },
  { id: "plomeria", label: "Plomería" },
] as const;

export type ServiceLineId = (typeof LINE_OPTIONS)[number]["id"];

/** Servicios destacados por línea (páginas de municipio y resúmenes). */
export const HIGHLIGHT_SERVICES: Record<ServiceLineId, string[]> = {
  techos: ["impermeabilizacion-cubiertas", "reparacion-goteras", "mantenimiento-canoas"],
  pintura: ["pintura-interior", "pintura-exterior", "correccion-humedad-superficial"],
  plomeria: ["reparacion-fugas", "destape-desagues", "cambio-griferia"],
};

export type ServiceItem = {
  id: string;
  name: string;
  summary: string;
  basePrice: string;
};

export const SERVICE_DATA: Record<ServiceLineId, ServiceItem[]> = {
  techos: [
    {
      id: "impermeabilizacion-cubiertas",
      name: "Protección contra goteras en el techo",
      summary: "Sellamos el techo para que no entre agua.",
      basePrice: "$350.000 COP",
    },
    {
      id: "reparacion-goteras",
      name: "Reparación de goteras",
      summary: "Arreglamos la gotera sin cambiar todo el techo.",
      basePrice: "$180.000 COP",
    },
    {
      id: "mantenimiento-canoas",
      name: "Limpieza de canales y bajantes",
      summary: "Limpiamos los canales por donde baja el agua lluvia.",
      basePrice: "$150.000 COP",
    },
    {
      id: "sellado-fisuras",
      name: "Sellado de fisuras y juntas",
      summary: "Sellamos las uniones del techo donde se mete el agua.",
      basePrice: "$210.000 COP",
    },
    {
      id: "cambio-teja-puntual",
      name: "Cambio puntual de teja",
      summary: "Reposición de piezas dañadas según acceso y pendiente.",
      basePrice: "$190.000 COP",
    },
    {
      id: "ajuste-bajantes",
      name: "Ajuste de bajantes",
      summary: "Corrección de pendientes y conexiones para mejor descarga.",
      basePrice: "$170.000 COP",
    },
    {
      id: "limpieza-cubierta",
      name: "Limpieza de cubierta",
      summary: "Limpiamos hojas y suciedad del techo para evitar humedad.",
      basePrice: "$140.000 COP",
    },
    {
      id: "revision-puntos-criticos",
      name: "Revisión del techo",
      summary: "Revisamos todo el techo para encontrar problemas antes de que empeoren.",
      basePrice: "$130.000 COP",
    },
  ],
  pintura: [
    {
      id: "pintura-interior",
      name: "Pintura interior",
      summary: "Renovación de espacios con acabados limpios.",
      basePrice: "$280.000 COP",
    },
    {
      id: "pintura-exterior",
      name: "Pintura exterior",
      summary: "Protección y acabado para fachadas.",
      basePrice: "$320.000 COP",
    },
    {
      id: "resanes-acabados",
      name: "Resanes y acabados",
      summary: "Arreglamos las paredes antes de pintar (huecos, grietas, desniveles).",
      basePrice: "$210.000 COP",
    },
    {
      id: "estuco-pulido",
      name: "Alisado de paredes",
      summary: "Dejamos las paredes lisas y parejas antes de pintar.",
      basePrice: "$240.000 COP",
    },
    {
      id: "correccion-humedad-superficial",
      name: "Tratamiento de humedad en paredes",
      summary: "Tratamos las manchas de humedad en las paredes.",
      basePrice: "$250.000 COP",
    },
    {
      id: "pintura-rejas-barandas",
      name: "Pintura de rejas y barandas",
      summary: "Limpieza, fondo y acabado para elementos metálicos.",
      basePrice: "$160.000 COP",
    },
    {
      id: "retoques-post-obra",
      name: "Retoques post-obra",
      summary: "Corrección de detalles para entregar acabado limpio.",
      basePrice: "$140.000 COP",
    },
    {
      id: "acabado-fachada",
      name: "Acabado de fachada",
      summary: "Mejora visual con protección y uniformidad del color.",
      basePrice: "$330.000 COP",
    },
  ],
  plomeria: [
    {
      id: "reparacion-fugas",
      name: "Reparación de fugas",
      summary: "Revisión de tuberías y corrección según el caso.",
      basePrice: "$170.000 COP",
    },
    {
      id: "destape-desagues",
      name: "Destape de desagües",
      summary: "Destapamos desagües del baño, cocina o patio.",
      basePrice: "$160.000 COP",
    },
    {
      id: "ajustes-hidrosanitarios",
      name: "Reparación de llaves y conexiones",
      summary: "Arreglamos o cambiamos llaves, mangueras y conexiones del baño o cocina.",
      basePrice: "$140.000 COP",
    },
    {
      id: "deteccion-fuga-visible",
      name: "Detección de fuga visible",
      summary: "Buscamos de dónde viene la fuga revisando las tuberías y conexiones.",
      basePrice: "$130.000 COP",
    },
    {
      id: "cambio-griferia",
      name: "Cambio de grifería",
      summary: "Instalación y ajuste de grifería en cocina o baño.",
      basePrice: "$150.000 COP",
    },
    {
      id: "ajuste-sanitario",
      name: "Ajuste de sanitario",
      summary: "Corrección de fugas, sellos y nivelación básica.",
      basePrice: "$165.000 COP",
    },
    {
      id: "revision-presion",
      name: "Revisión de presión del agua",
      summary: "Revisamos por qué sale poca agua o con poca fuerza.",
      basePrice: "$120.000 COP",
    },
    {
      id: "mantenimiento-red-interna",
      name: "Mantenimiento de tuberías",
      summary: "Revisamos las tuberías de la casa para prevenir fugas.",
      basePrice: "$200.000 COP",
    },
  ],
};

export const URGENCY_OPTIONS = ["Hoy", "Esta semana", "Solo cotización"] as const;

export const MUNICIPALITY_OPTIONS = [
  "Medellín",
  "Envigado",
  "Sabaneta",
  "Bello",
  "Itagüí",
  "La Estrella",
  "Caldas",
  "Copacabana",
  "Girardota",
  "Rionegro",
  "La Ceja",
  "Marinilla",
  "Otro",
] as const;

export type UrgencyOption = (typeof URGENCY_OPTIONS)[number];
export type MunicipalityOption = (typeof MUNICIPALITY_OPTIONS)[number];

/* ------------------------------------------------------------------ */
/*  PROCESS STEPS                                                     */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  id: string;
  step: number;
  title: string;
  detail: string;
  note: string;
};

export const PROCESS_STEPS: ProcessStep[] = [
  {
    id: "brief",
    step: 1,
    title: "Nos cuentas el problema",
    detail:
      "Nos escribes por WhatsApp o nos llamas. Nos cuentas qué pasa, con una foto si puedes, y te decimos qué servicio necesitas.",
    note: "Sin formularios largos: un mensaje basta.",
  },
  {
    id: "diagnostic",
    step: 2,
    title: "Vamos a revisar",
    detail:
      "Vamos a tu casa o negocio, miramos el problema y te explicamos qué hay que hacer.",
    note: "La visita no tiene costo.",
  },
  {
    id: "proposal",
    step: 3,
    title: "Te damos el precio por escrito",
    detail:
      "Te decimos exactamente qué vamos a hacer, qué materiales usamos y cuánto cuesta. Sin sorpresas.",
    note: "El precio cambia solo si aparece algo que no se veía, y lo acordamos antes.",
  },
  {
    id: "execution",
    step: 4,
    title: "Hacemos el trabajo",
    detail:
      "Hacemos el trabajo, dejamos todo limpio y te entregamos la garantía por escrito.",
    note: "Garantía por escrito según servicio y alcance.",
  },
];

/* ------------------------------------------------------------------ */
/*  LINE STORY                                                        */
/* ------------------------------------------------------------------ */

export const LINE_STORY: Record<
  ServiceLineId,
  { title: string; summary: string; bullets: [string, string, string] }
> = {
  techos: {
    title: "Que no te entre agua por el techo",
    summary:
      "Arreglamos goteras, sellamos techos y limpiamos canales para que tu casa o negocio quede seco.",
    bullets: [
      "Encontramos de dónde entra el agua",
      "Arreglamos según lo que necesite tu techo",
      "Revisamos todo para prevenir problemas",
    ],
  },
  pintura: {
    title: "Tu casa o negocio como nuevo",
    summary:
      "Preparamos las paredes, arreglamos lo que haga falta y pintamos con buen acabado.",
    bullets: [
      "Arreglamos paredes antes de pintar",
      "Pintamos por dentro y por fuera",
      "Corregimos detalles al final",
    ],
  },
  plomeria: {
    title: "Adiós a las fugas y desagües tapados",
    summary:
      "Arreglamos fugas, destapamos desagües y reparamos lo que haga falta en baño y cocina.",
    bullets: [
      "Encontramos de dónde sale la fuga",
      "Destapamos y reparamos lo que falle",
      "Revisamos todo para que no se repita",
    ],
  },
};

/* ------------------------------------------------------------------ */
/*  FAQ ITEMS                                                         */
/* ------------------------------------------------------------------ */

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  ctaText?: string;
  ctaSource?: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "¿Me dan garantía?",
    answer:
      "Sí. Te damos garantía por escrito. El tiempo depende del trabajo que se haga.",
  },
  {
    id: "faq-2",
    question: "¿Cómo revisan el problema?",
    answer:
      "Vamos a tu casa, miramos qué pasa y te explicamos qué hay que hacer. Si hace falta, usamos herramientas especiales para encontrar el problema.",
  },
  {
    id: "faq-3",
    question: "¿Atienden hogares y negocios?",
    answer:
      "Sí. Atendemos hogares y negocios en Medellín, Valle de Aburrá y municipios de Antioquia según disponibilidad.",
  },
  {
    id: "faq-4",
    question: "¿Cuánto tiempo toma una visita técnica?",
    answer:
      "Después de que nos escribas, coordinamos la visita en 1 a 3 días hábiles.",
    ctaText: "Agendar visita ahora",
    ctaSource: "faq_visita",
  },
  {
    id: "faq-5",
    question: "¿Cotizar es gratis?",
    answer:
      "Sí. Nos escribes por WhatsApp o nos llamas, te damos un precio aproximado y si quieres confirmamos con una visita gratis. Sin compromiso.",
    ctaText: "Pedir cotización gratis",
    ctaSource: "faq_cotizar",
  },
  {
    id: "faq-6",
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Efectivo, transferencia bancaria y Nequi. Si el trabajo es grande, podemos acordar pagos por partes.",
  },
  {
    id: "faq-7",
    question: "¿Qué es Espinal Multiservicios?",
    answer:
      "Espinal Multiservicios es una empresa de techos y cubiertas, pintura y acabados, y plomería a domicilio en Medellín y Valle de Aburrá, fundada y dirigida por Henrry Espinal. Nuestro equipo va a tu casa, revisa gratis, te da el precio por escrito y responde con garantía firmada. Atendemos 12 municipios de Antioquia.",
  },
  {
    id: "faq-8",
    question: "¿En qué municipios atienden?",
    answer:
      "Atendemos en Medellín, Envigado, Sabaneta, Bello, Itagüí, La Estrella, Caldas, Copacabana, Girardota, Rionegro, La Ceja y Marinilla. Todos en el departamento de Antioquia, Colombia.",
  },
  {
    id: "faq-9",
    question: "¿Cuánto cuesta un plomero en Medellín?",
    answer:
      "Nuestros servicios de plomería en Medellín empiezan desde $120.000 COP. Incluyen revisión de presión del agua, detección de fugas, reparación de llaves, destape de desagües, cambio de grifería y mantenimiento de tuberías. La visita técnica y la cotización son gratuitas.",
  },
  {
    id: "faq-10",
    question: "¿Cuánto cuesta pintar un apartamento en Medellín?",
    answer:
      "Pintar un apartamento en Medellín cuesta entre $800.000 y $3.500.000 COP dependiendo del tamaño y estado de las paredes. Incluye mano de obra, pintura de buena calidad, preparación de superficies y limpieza final. Cotización gratis.",
  },
];

/* ------------------------------------------------------------------ */
/*  COVERAGE SCHEDULE                                                 */
/* ------------------------------------------------------------------ */

export const COVERAGE_SCHEDULE = {
  hours: "Lunes a sábado, 7:00 a.m. - 6:00 p.m.",
  responseTime: "Respuesta en menos de 2 horas en horario laboral.",
  urgencyNote:
    "Urgencias fuera de horario: escríbenos por WhatsApp y coordinamos lo antes posible.",
} as const;

/* ------------------------------------------------------------------ */
/*  CONTEXTUAL WHATSAPP MESSAGES                                      */
/* ------------------------------------------------------------------ */

const LINE_NEED: Record<ServiceLineId, string> = {
  techos: "un arreglo en el techo",
  pintura: "pintar",
  plomeria: "un plomero",
};

const LINE_LABEL_SHORT: Record<ServiceLineId, string> = {
  techos: "techos",
  pintura: "pintura",
  plomeria: "plomería",
};

export type WaLinkOptions = {
  linea?: ServiceLineId;
  municipio?: string;
  /** Nombre del servicio puntual ("Reparación de goteras"). */
  servicio?: string;
  intent?: "cotizar" | "urgencia" | "duda" | "blog" | "composer";
  /** Título del artículo (blog) o texto libre (composer). */
  context?: string;
};

/**
 * Único constructor de enlaces de WhatsApp. El mensaje no depende de la hora (evita diferencias entre servidor y cliente).
 */
export function buildWaLink(o: WaLinkOptions = {}) {
  const where = o.municipio ? ` en ${o.municipio}` : "";
  const label = o.linea ? LINE_LABEL_SHORT[o.linea] : "";
  let msg: string;

  switch (o.intent) {
    case "urgencia":
      msg = `Hola, tengo una urgencia${label ? ` de ${label}` : ""}${where}. ¿Puedes venir hoy?`;
      break;
    case "blog":
      msg = `Hola, leí "${o.context ?? "un artículo"}" en tu página y necesito ayuda${label ? ` con ${label}` : ""}${where}.`;
      break;
    case "composer":
      msg = `Hola, ${o.context ?? "necesito una cotización"}${label ? ` Es sobre ${label}.` : ""}${where ? ` Estoy${where}.` : ""}`;
      break;
    case "duda":
      msg = `Hola, tengo una duda${label ? ` sobre ${label}` : ""}${where}. ¿Me ayudas?`;
      break;
    default:
      if (o.servicio) {
        msg = `Hola, necesito cotizar: ${o.servicio}${where}. ¿Cuándo puedes venir a revisar?`;
      } else if (o.linea) {
        msg = `Hola, necesito ${LINE_NEED[o.linea]}${where}. ¿Cuándo puedes venir a revisar?`;
      } else {
        msg = `Hola, necesito una cotización para mi casa${where}. ¿Cuándo puedes venir a revisar?`;
      }
  }
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildTelLink() {
  return `tel:${PHONE_E164}`;
}
