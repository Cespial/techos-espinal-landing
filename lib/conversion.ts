export const COMPANY_NAME = "Espinal Multiservicios";
export const SITE_URL = "https://techos-espinal-landing.vercel.app";

export const PHONE_DISPLAY = "(+57) 300 733 6333";
export const PHONE_E164 = "+573007336333";
export const WA_NUMBER = "573007336333";
export const DEFAULT_CITY = "Medellin / Valle de Aburra";

export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;

export const NAV_LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "proceso", label: "Como funciona" },
  { id: "galeria", label: "Trabajos" },
  { id: "cobertura", label: "Cobertura" },
  { id: "faq", label: "Preguntas" },
] as const;

export const LINE_OPTIONS = [
  { id: "techos", label: "Techos y cubiertas" },
  { id: "pintura", label: "Pintura y acabados" },
  { id: "plomeria", label: "Plomeria" },
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
      name: "Impermeabilizacion de cubiertas",
      summary: "Control de filtraciones y sellado en puntos criticos.",
      basePrice: "$350.000 COP",
    },
    {
      id: "reparacion-goteras",
      name: "Reparacion de goteras",
      summary: "Intervencion puntual segun estado de la cubierta.",
      basePrice: "$180.000 COP",
    },
    {
      id: "mantenimiento-canoas",
      name: "Mantenimiento de canoas y bajantes",
      summary: "Limpieza y ajuste para mejorar evacuacion de agua.",
      basePrice: "$150.000 COP",
    },
    {
      id: "sellado-fisuras",
      name: "Sellado de fisuras y juntas",
      summary: "Correccion en puntos de filtracion y uniones criticas.",
      basePrice: "$210.000 COP",
    },
    {
      id: "cambio-teja-puntual",
      name: "Cambio puntual de teja",
      summary: "Reposicion de piezas danadas segun acceso y pendiente.",
      basePrice: "$190.000 COP",
    },
    {
      id: "ajuste-bajantes",
      name: "Ajuste de bajantes",
      summary: "Correccion de pendientes y conexiones para mejor descarga.",
      basePrice: "$170.000 COP",
    },
    {
      id: "limpieza-cubierta",
      name: "Limpieza de cubierta",
      summary: "Retiro de residuos para reducir acumulacion de humedad.",
      basePrice: "$140.000 COP",
    },
    {
      id: "revision-puntos-criticos",
      name: "Revision de puntos criticos",
      summary: "Inspeccion tecnica para prevenir filtraciones recurrentes.",
      basePrice: "$130.000 COP",
    },
  ],
  pintura: [
    {
      id: "pintura-interior",
      name: "Pintura interior",
      summary: "Renovacion de espacios con acabados limpios.",
      basePrice: "$280.000 COP",
    },
    {
      id: "pintura-exterior",
      name: "Pintura exterior",
      summary: "Proteccion y acabado para fachadas.",
      basePrice: "$320.000 COP",
    },
    {
      id: "resanes-acabados",
      name: "Resanes y acabados",
      summary: "Nivelacion y correcciones previas a pintura.",
      basePrice: "$210.000 COP",
    },
    {
      id: "estuco-pulido",
      name: "Estuco y pulido de muros",
      summary: "Preparacion de superficie para acabado uniforme.",
      basePrice: "$240.000 COP",
    },
    {
      id: "correccion-humedad-superficial",
      name: "Correccion de humedad superficial",
      summary: "Tratamiento base segun el estado visible del muro.",
      basePrice: "$250.000 COP",
    },
    {
      id: "pintura-rejas-barandas",
      name: "Pintura de rejas y barandas",
      summary: "Limpieza, fondo y acabado para elementos metalicos.",
      basePrice: "$160.000 COP",
    },
    {
      id: "retoques-post-obra",
      name: "Retoques post-obra",
      summary: "Correccion de detalles para entregar acabado limpio.",
      basePrice: "$140.000 COP",
    },
    {
      id: "acabado-fachada",
      name: "Acabado de fachada",
      summary: "Mejora visual con proteccion y uniformidad del color.",
      basePrice: "$330.000 COP",
    },
  ],
  plomeria: [
    {
      id: "reparacion-fugas",
      name: "Reparacion de fugas",
      summary: "Revision de tuberias y correccion segun el caso.",
      basePrice: "$170.000 COP",
    },
    {
      id: "destape-desagues",
      name: "Destape de desagues",
      summary: "Atencion de obstrucciones en redes internas.",
      basePrice: "$160.000 COP",
    },
    {
      id: "ajustes-hidrosanitarios",
      name: "Ajustes hidrosanitarios",
      summary: "Cambio y reparacion de piezas de uso frecuente.",
      basePrice: "$140.000 COP",
    },
    {
      id: "deteccion-fuga-visible",
      name: "Deteccion de fuga visible",
      summary: "Revision de conexiones y zonas humedas para ubicar origen.",
      basePrice: "$130.000 COP",
    },
    {
      id: "cambio-griferia",
      name: "Cambio de griferia",
      summary: "Instalacion y ajuste de griferia en cocina o bano.",
      basePrice: "$150.000 COP",
    },
    {
      id: "ajuste-sanitario",
      name: "Ajuste de sanitario",
      summary: "Correccion de fugas, sellos y nivelacion basica.",
      basePrice: "$165.000 COP",
    },
    {
      id: "revision-presion",
      name: "Revision de presion y caudal",
      summary: "Diagnostico inicial para definir mejora en alimentacion.",
      basePrice: "$120.000 COP",
    },
    {
      id: "mantenimiento-red-interna",
      name: "Mantenimiento de red interna",
      summary: "Ajustes preventivos en puntos de consumo frecuentes.",
      basePrice: "$200.000 COP",
    },
  ],
};

export const URGENCY_OPTIONS = ["Hoy", "Esta semana", "Solo cotizacion"] as const;

export const MUNICIPALITY_OPTIONS = [
  "Medellin",
  "Envigado",
  "Sabaneta",
  "Bello",
  "Itagui",
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
    title: "Brief de necesidad",
    detail:
      "Escuchamos el problema, validamos urgencia y definimos la linea de servicio adecuada para tu caso.",
    note: "Inicias por WhatsApp o llamada, sin formularios largos.",
  },
  {
    id: "diagnostic",
    step: 2,
    title: "Diagnostico en sitio",
    detail:
      "Revisamos acceso, estado actual y puntos criticos para proponer una solucion aterrizada.",
    note: "Equipos de diagnostico segun el caso.",
  },
  {
    id: "proposal",
    step: 3,
    title: "Alcance y valor base",
    detail:
      "Definimos actividades, materiales y valor base para que tomes la decision con claridad.",
    note: "Siempre sujeto a inspeccion tecnica y condiciones del sitio.",
  },
  {
    id: "execution",
    step: 4,
    title: "Ejecucion coordinada",
    detail:
      "Programamos, ejecutamos y dejamos el area limpia con cierre tecnico y recomendaciones de cuidado.",
    note: "Garantia por escrito segun servicio y alcance.",
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
    title: "Cubiertas preparadas para temporada de lluvias",
    summary:
      "Atendemos goteras, sellos, canoas y puntos de filtracion para hogares y locales en el Valle de Aburra.",
    bullets: [
      "Diagnostico de filtraciones visibles",
      "Intervencion segun acceso y pendiente",
      "Mantenimiento preventivo por zonas",
    ],
  },
  pintura: {
    title: "Acabados limpios para vivienda y comercio",
    summary:
      "Preparamos superficie, corregimos detalles y aplicamos acabados con enfoque en durabilidad y presentacion.",
    bullets: [
      "Resanes y correccion de superficie",
      "Pintura interior y exterior",
      "Retoques de entrega post-obra",
    ],
  },
  plomeria: {
    title: "Red hidraulica funcional y sin fugas recurrentes",
    summary:
      "Revisamos puntos criticos de cocina, bano y red interna para resolver fugas y obstrucciones.",
    bullets: [
      "Deteccion de fugas visibles",
      "Destapes y ajustes hidrosanitarios",
      "Mantenimiento preventivo basico",
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
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "¿Manejan garantia?",
    answer:
      "Si. Entregamos garantia por escrito segun servicio, alcance y condiciones del sitio.",
  },
  {
    id: "faq-2",
    question: "¿Como hacen el diagnostico?",
    answer:
      "Primero revisamos el problema en sitio y, segun el caso, usamos equipos de diagnostico para precisar la solucion.",
  },
  {
    id: "faq-3",
    question: "¿Atienden hogares y negocios?",
    answer:
      "Si. Atendemos hogares y negocios en Medellin, Valle de Aburra y municipios de Antioquia segun disponibilidad.",
  },
  {
    id: "faq-4",
    question: "¿Cuanto tiempo toma una visita tecnica?",
    answer:
      "Dependiendo de la ubicacion y el tipo de servicio, coordinamos visita en 24 a 72 horas habiles despues del primer contacto.",
  },
  {
    id: "faq-5",
    question: "¿Puedo cotizar sin compromiso?",
    answer:
      "Si. Puedes solicitar cotizacion orientativa por WhatsApp o llamada sin ningun compromiso. El valor final se confirma despues de la visita tecnica.",
  },
  {
    id: "faq-6",
    question: "¿Que formas de pago aceptan?",
    answer:
      "Efectivo, transferencia bancaria y Nequi. Dependiendo del alcance del proyecto, manejamos pagos parciales con acuerdo previo.",
  },
];

/* ------------------------------------------------------------------ */
/*  BEFORE/AFTER GALLERY PLACEHOLDERS                                 */
/* ------------------------------------------------------------------ */

export type BeforeAfterItem = {
  id: string;
  label: string;
  linea: ServiceLineId;
  location: string;
};

export const BEFORE_AFTER_ITEMS: BeforeAfterItem[] = [
  {
    id: "ba-1",
    label: "Impermeabilizacion cubierta",
    linea: "techos",
    location: "Envigado",
  },
  {
    id: "ba-2",
    label: "Reparacion de goteras",
    linea: "techos",
    location: "Medellin",
  },
  {
    id: "ba-3",
    label: "Pintura interior apartamento",
    linea: "pintura",
    location: "Sabaneta",
  },
  {
    id: "ba-4",
    label: "Acabado de fachada",
    linea: "pintura",
    location: "Bello",
  },
  {
    id: "ba-5",
    label: "Reparacion de fugas",
    linea: "plomeria",
    location: "Itagui",
  },
  {
    id: "ba-6",
    label: "Destape de desagues",
    linea: "plomeria",
    location: "La Estrella",
  },
];

/* ------------------------------------------------------------------ */
/*  COVERAGE SCHEDULE                                                 */
/* ------------------------------------------------------------------ */

export const COVERAGE_SCHEDULE = {
  hours: "Lunes a sabado, 7:00 a.m. - 6:00 p.m.",
  responseTime: "Respuesta en menos de 2 horas en horario laboral.",
  urgencyNote:
    "Urgencias fuera de horario: escribenos por WhatsApp y coordinamos lo antes posible.",
} as const;

/* ------------------------------------------------------------------ */
/*  CONTEXTUAL WHATSAPP MESSAGES                                      */
/* ------------------------------------------------------------------ */

export function buildWaLinkHero(municipio?: string, linea?: string) {
  const safeMunicipio = municipio?.trim() || DEFAULT_CITY;
  const safeLinea = linea?.trim() || "multiservicios";
  const msg = `Quiero cotizar un servicio en ${safeMunicipio}. Es sobre ${safeLinea}.`;
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkTechos() {
  const msg = "Tengo gotera/filtracion. Que hago hoy y cuando pueden venir?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkPintura() {
  const msg = "Quiero pintar apto/casa. Como cotizan?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkPlomeria() {
  const msg = "Tengo fuga/sanitario. Atienden hoy?";
  return `${WA_BASE_URL}?text=${encodeURIComponent(msg)}`;
}

export function buildWaLinkProcess() {
  const msg = "Quiero iniciar proceso de cotizacion.";
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
/*  LEGACY GENERIC WA LINK BUILDER (kept for QuoteModal)              */
/* ------------------------------------------------------------------ */

export type BuildWaLinkInput = {
  linea?: string;
  servicio?: string;
  municipio?: string;
  urgencia?: string;
  nombre?: string;
  telefono?: string;
  detalle?: string;
};

export function buildTelLink() {
  return `tel:${PHONE_E164}`;
}

export function buildWaLink({
  linea,
  servicio,
  municipio,
  urgencia,
  nombre,
  telefono,
  detalle,
}: BuildWaLinkInput) {
  const safeLinea = linea?.trim() || "multiservicios";
  const safeServicio = servicio?.trim() || "cotizacion general";
  const safeMunicipio = municipio?.trim() || DEFAULT_CITY;
  const safeUrgencia = urgencia?.trim() || "Solo cotizacion";

  const parts = [
    "Hola, quiero cotizar servicio.",
    `Linea: ${safeLinea}.`,
    `Servicio: ${safeServicio}.`,
    `Estoy en ${safeMunicipio}.`,
    `Urgencia: ${safeUrgencia}.`,
  ];

  if (nombre?.trim()) {
    parts.push(`Nombre: ${nombre.trim()}.`);
  }

  if (telefono?.trim()) {
    parts.push(`Telefono: ${telefono.trim()}.`);
  }

  if (detalle?.trim()) {
    parts.push(`Detalle: ${detalle.trim()}.`);
  }

  parts.push("¿Me confirmas disponibilidad y valor estimado?");

  return `${WA_BASE_URL}?text=${encodeURIComponent(parts.join(" "))}`;
}
