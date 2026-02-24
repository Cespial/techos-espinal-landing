export const COMPANY_NAME = "Espinal Multiservicios";
export const SITE_URL = "https://techos-espinal-landing.vercel.app";

export const PHONE_DISPLAY = "(+57) 300 733 7333";
export const PHONE_E164 = "+573007337333";
export const WA_NUMBER = "573007337333";
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
      name: "Impermeabilización de cubiertas",
      summary: "Control de filtraciones y sellado en puntos críticos.",
      basePrice: "$350.000 COP",
    },
    {
      id: "reparacion-goteras",
      name: "Reparación de goteras",
      summary: "Intervención puntual según estado de la cubierta.",
      basePrice: "$180.000 COP",
    },
    {
      id: "mantenimiento-canoas",
      name: "Mantenimiento de canoas y bajantes",
      summary: "Limpieza y ajuste para mejorar evacuación de agua.",
      basePrice: "$150.000 COP",
    },
    {
      id: "sellado-fisuras",
      name: "Sellado de fisuras y juntas",
      summary: "Corrección en puntos de filtración y uniones críticas.",
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
      summary: "Retiro de residuos para reducir acumulación de humedad.",
      basePrice: "$140.000 COP",
    },
    {
      id: "revision-puntos-criticos",
      name: "Revisión de puntos críticos",
      summary: "Inspección técnica para prevenir filtraciones recurrentes.",
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
      summary: "Nivelación y correcciones previas a pintura.",
      basePrice: "$210.000 COP",
    },
    {
      id: "estuco-pulido",
      name: "Estuco y pulido de muros",
      summary: "Preparación de superficie para acabado uniforme.",
      basePrice: "$240.000 COP",
    },
    {
      id: "correccion-humedad-superficial",
      name: "Corrección de humedad superficial",
      summary: "Tratamiento base según el estado visible del muro.",
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
      summary: "Atención de obstrucciones en redes internas.",
      basePrice: "$160.000 COP",
    },
    {
      id: "ajustes-hidrosanitarios",
      name: "Ajustes hidrosanitarios",
      summary: "Cambio y reparación de piezas de uso frecuente.",
      basePrice: "$140.000 COP",
    },
    {
      id: "deteccion-fuga-visible",
      name: "Detección de fuga visible",
      summary: "Revisión de conexiones y zonas húmedas para ubicar origen.",
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
      name: "Revisión de presión y caudal",
      summary: "Diagnóstico inicial para definir mejora en alimentación.",
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
    title: "Brief de necesidad",
    detail:
      "Escuchamos el problema, validamos urgencia y definimos la línea de servicio adecuada para tu caso.",
    note: "Inicias por WhatsApp o llamada, sin formularios largos.",
  },
  {
    id: "diagnostic",
    step: 2,
    title: "Diagnóstico en sitio",
    detail:
      "Revisamos acceso, estado actual y puntos críticos para proponer una solución aterrizada.",
    note: "Equipos de diagnóstico según el caso.",
  },
  {
    id: "proposal",
    step: 3,
    title: "Alcance y valor base",
    detail:
      "Definimos actividades, materiales y valor base para que tomes la decisión con claridad.",
    note: "Siempre sujeto a inspección técnica y condiciones del sitio.",
  },
  {
    id: "execution",
    step: 4,
    title: "Ejecución coordinada",
    detail:
      "Programamos, ejecutamos y dejamos el área limpia con cierre técnico y recomendaciones de cuidado.",
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
    title: "Cubiertas preparadas para temporada de lluvias",
    summary:
      "Atendemos goteras, sellos, canoas y puntos de filtración para hogares y locales en el Valle de Aburrá.",
    bullets: [
      "Diagnóstico de filtraciones visibles",
      "Intervención según acceso y pendiente",
      "Mantenimiento preventivo por zonas",
    ],
  },
  pintura: {
    title: "Acabados limpios para vivienda y comercio",
    summary:
      "Preparamos superficie, corregimos detalles y aplicamos acabados con enfoque en durabilidad y presentación.",
    bullets: [
      "Resanes y corrección de superficie",
      "Pintura interior y exterior",
      "Retoques de entrega post-obra",
    ],
  },
  plomeria: {
    title: "Red hidráulica funcional y sin fugas recurrentes",
    summary:
      "Revisamos puntos críticos de cocina, baño y red interna para resolver fugas y obstrucciones.",
    bullets: [
      "Detección de fugas visibles",
      "Destapes y ajustes hidrosanitarios",
      "Mantenimiento preventivo básico",
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
    question: "¿Manejan garantía?",
    answer:
      "Sí. Entregamos garantía por escrito según servicio, alcance y condiciones del sitio.",
  },
  {
    id: "faq-2",
    question: "¿Cómo hacen el diagnóstico?",
    answer:
      "Primero revisamos el problema en sitio y, según el caso, usamos equipos de diagnóstico para precisar la solución.",
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
      "Dependiendo de la ubicación y el tipo de servicio, coordinamos visita en 24 a 72 horas hábiles después del primer contacto.",
  },
  {
    id: "faq-5",
    question: "¿Puedo cotizar sin compromiso?",
    answer:
      "Sí. Puedes solicitar cotización orientativa por WhatsApp o llamada sin ningún compromiso. El valor final se confirma después de la visita técnica.",
  },
  {
    id: "faq-6",
    question: "¿Qué formas de pago aceptan?",
    answer:
      "Efectivo, transferencia bancaria y Nequi. Dependiendo del alcance del proyecto, manejamos pagos parciales con acuerdo previo.",
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
  const msg = `Quiero cotizar un servicio en ${safeMunicipio}. Es sobre ${safeLinea}.`;
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
  telefono: string;
  municipio: string;
  linea: string;
  fecha: string;
  horario: string;
  descripcion?: string;
}) {
  const parts = [
    "Quiero agendar una visita técnica.",
    `Nombre: ${data.nombre}.`,
    `Teléfono: ${data.telefono}.`,
    `Municipio: ${data.municipio}.`,
    `Servicio: ${data.linea}.`,
    `Fecha preferida: ${data.fecha}.`,
    `Horario: ${data.horario}.`,
  ];

  if (data.descripcion?.trim()) {
    parts.push(`Problema: ${data.descripcion.trim()}.`);
  }

  parts.push("¿Me confirman disponibilidad?");

  return `${WA_BASE_URL}?text=${encodeURIComponent(parts.join(" "))}`;
}

export function buildTelLink() {
  return `tel:${PHONE_E164}`;
}
