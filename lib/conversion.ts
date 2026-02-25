export const COMPANY_NAME = "Espinal Multiservicios";
export const SITE_URL = "https://espinalservicios.com";

export const PHONE_DISPLAY = "(+57) 300 733 6333";
export const PHONE_E164 = "+573007336333";
export const WA_NUMBER = "573007336333";
export const DEFAULT_CITY = "Medellín / Valle de Aburrá";

export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;

export const NAV_LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Cómo funciona" },
  { id: "cobertura", label: "Cobertura" },
  { id: "agendar", label: "Agendar visita" },
  { id: "faq", label: "Preguntas" },
] as const;

export const LINE_OPTIONS = [
  { id: "techos", label: "Techos y cubiertas" },
  { id: "pintura", label: "Pintura y acabados" },
  { id: "plomeria", label: "Plomería" },
] as const;

export type ServiceLineId = (typeof LINE_OPTIONS)[number]["id"];

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
      "Nos escribes por WhatsApp o nos llamas. Nos cuentas qué pasa y te decimos qué servicio necesitas.",
    note: "Inicias por WhatsApp o llamada, sin formularios largos.",
  },
  {
    id: "diagnostic",
    step: 2,
    title: "Vamos a tu casa a revisar",
    detail:
      "Vamos a tu casa o negocio, miramos el problema y te explicamos qué hay que hacer.",
    note: "Sin costo. Solo vamos, miramos y te explicamos.",
  },
  {
    id: "proposal",
    step: 3,
    title: "Te damos el precio",
    detail:
      "Te decimos exactamente qué vamos a hacer, qué materiales se usan y cuánto cuesta. Sin sorpresas.",
    note: "El precio puede cambiar solo si encontramos algo extra que no se veía.",
  },
  {
    id: "execution",
    step: 4,
    title: "Hacemos el trabajo",
    detail:
      "Hacemos el trabajo, limpiamos todo y te damos garantía por escrito.",
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
];

/* ------------------------------------------------------------------ */
/*  SOCIAL PROOF                                                      */
/* ------------------------------------------------------------------ */

export const SOCIAL_PROOF_STATS = {
  jobsCompleted: 350,
  avgRating: 4.9,
  yearsExperience: 3,
} as const;

/* ------------------------------------------------------------------ */
/*  TESTIMONIALS                                                      */
/* ------------------------------------------------------------------ */

export type Testimonial = {
  id: string;
  name: string;
  municipality: string;
  serviceLine: ServiceLineId;
  text: string;
  rating: number;
  date: string;
};

export const TESTIMONIAL_DATA: Testimonial[] = [
  {
    id: "t1",
    name: "Carlos M.",
    municipality: "Envigado",
    serviceLine: "techos",
    text: "Teníamos goteras en toda la casa. Vinieron al otro día, revisaron todo el techo y lo dejaron perfecto. Precio justo y trabajo limpio.",
    rating: 5,
    date: "Noviembre 2025",
  },
  {
    id: "t2",
    name: "Andrea L.",
    municipality: "Medellín",
    serviceLine: "pintura",
    text: "Pintaron todo el apartamento en dos días. Quedó como nuevo. Muy organizados y puntuales con los horarios.",
    rating: 5,
    date: "Diciembre 2025",
  },
  {
    id: "t3",
    name: "Jorge R.",
    municipality: "Sabaneta",
    serviceLine: "plomeria",
    text: "Tenía una fuga que nadie encontraba. Ellos la detectaron rápido y la repararon el mismo día. Muy profesionales.",
    rating: 5,
    date: "Enero 2026",
  },
  {
    id: "t4",
    name: "María P.",
    municipality: "Itagüí",
    serviceLine: "techos",
    text: "Impermeabilizaron la cubierta del negocio. Ya pasaron dos temporadas de lluvias y cero filtraciones. Recomendados.",
    rating: 5,
    date: "Octubre 2025",
  },
  {
    id: "t5",
    name: "Luis F.",
    municipality: "Bello",
    serviceLine: "pintura",
    text: "Resanaron y pintaron la fachada completa. Los vecinos me preguntan quién lo hizo. Excelente acabado.",
    rating: 5,
    date: "Febrero 2026",
  },
  {
    id: "t6",
    name: "Sandra G.",
    municipality: "La Estrella",
    serviceLine: "plomeria",
    text: "Cambiaron toda la grifería del baño y arreglaron el sanitario. Rápidos, limpios y con garantía. Muy satisfecha.",
    rating: 5,
    date: "Enero 2026",
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

export function buildWaLinkHero(municipio?: string, linea?: string) {
  const safeMunicipio = municipio?.trim() || DEFAULT_CITY;
  const safeLinea = linea?.trim() || "multiservicios";
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Buenos días" : hour < 18 ? "Buenas tardes" : "Buenas noches";
  const msg = `${greeting}, quiero cotizar un servicio en ${safeMunicipio}. Es sobre ${safeLinea}.`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkTechos() {
  const msg = "Tengo gotera/filtración. ¿Qué hago hoy y cuándo pueden venir?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkPintura() {
  const msg = "Quiero pintar apto/casa. ¿Cómo cotizan?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkPlomeria() {
  const msg = "Tengo fuga/sanitario. ¿Atienden hoy?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkProcess() {
  const msg = "Quiero iniciar proceso de cotización.";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkPricing(servicio?: string, municipio?: string) {
  const safeServicio = servicio?.trim() || "servicio";
  const safeMunicipio = municipio?.trim() || DEFAULT_CITY;
  const msg = `Quiero confirmar valor para ${safeServicio} en ${safeMunicipio}.`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkCoverage(municipio?: string) {
  const safeMunicipio = municipio?.trim() || DEFAULT_CITY;
  const msg = `Quiero confirmar si atienden en ${safeMunicipio}.`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkFaq() {
  const msg = "Tengo una duda sobre sus servicios.";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

/* ------------------------------------------------------------------ */
/*  APPOINTMENT WA LINK BUILDER                                       */
/* ------------------------------------------------------------------ */

export function buildWaLinkAppointment(data: {
  nombre: string;
  telefono?: string;
  municipio?: string;
  linea: string;
  fecha?: string;
  horario?: string;
  descripcion?: string;
}) {
  const parts = [
    "Quiero agendar una visita técnica.",
    `Nombre: ${data.nombre}.`,
  ];

  if (data.telefono?.trim()) parts.push(`Teléfono: ${data.telefono}.`);
  if (data.municipio?.trim()) parts.push(`Municipio: ${data.municipio}.`);
  parts.push(`Servicio: ${data.linea}.`);
  if (data.fecha?.trim()) parts.push(`Fecha preferida: ${data.fecha}.`);
  if (data.horario?.trim()) parts.push(`Horario: ${data.horario}.`);

  if (data.descripcion?.trim()) {
    parts.push(`Problema: ${data.descripcion.trim()}.`);
  }

  parts.push("¿Me confirman disponibilidad?");

  return `${WA_BASE_URL}?text=${encodeURIComponent(parts.join(" "))}`;
}

/* ------------------------------------------------------------------ */
/*  BLOG                                                               */
/* ------------------------------------------------------------------ */

export const BLOG_NAV_LINKS = [
  { href: "/", label: "Inicio" },
  { href: "/blog", label: "Blog" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/#agendar", label: "Agendar visita" },
] as const;

export function buildWaLinkBlog(serviceLine: ServiceLineId, postTitle: string) {
  const lineLabel =
    LINE_OPTIONS.find((l) => l.id === serviceLine)?.label ?? "multiservicios";
  const msg = `Hola, estaba leyendo "${postTitle}" y necesito ayuda con ${lineLabel}. ¿Me pueden cotizar?`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkEmergency() {
  const msg = "URGENTE: Tengo una emergencia y necesito atención lo antes posible. ¿Pueden ayudarme?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildTelLink() {
  return `tel:${PHONE_E164}`;
}
