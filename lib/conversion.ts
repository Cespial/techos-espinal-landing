export const COMPANY_NAME = "Espinal Multiservicios";
export const SITE_URL = "https://techos-espinal-landing.vercel.app";

export const PHONE_DISPLAY = "(+57) 300 733 6333";
export const PHONE_E164 = "+573007336333";
export const WA_NUMBER = "573007336333";
export const DEFAULT_CITY = "Medellin / Valle de Aburra";

export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;

export const NAV_LINKS = [
  { id: "servicios", label: "Servicios" },
  { id: "planes", label: "Planes" },
  { id: "cobertura", label: "Cobertura" },
  { id: "resolver-ahora", label: "Resolver ahora" },
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
  ],
};

export const PLAN_DATA = [
  {
    id: "hogar-basico",
    name: "Plan Hogar Basico",
    price: "$290.000 COP",
    features: [
      "1 visita de diagnostico",
      "Arreglo simple segun inspeccion",
      "Reporte por WhatsApp",
      "Garantia por escrito (segun servicio y alcance)",
    ],
  },
  {
    id: "preventivo",
    name: "Plan Preventivo",
    price: "$690.000 COP",
    features: [
      "Revision programada",
      "Mantenimiento preventivo",
      "Recomendaciones priorizadas",
      "Seguimiento de puntos criticos",
    ],
  },
  {
    id: "integral",
    name: "Plan Integral",
    price: "$1.290.000 COP",
    features: [
      "Atencion por linea prioritaria",
      "Intervenciones por fases",
      "Coordinacion de varias lineas",
      "Plan de trabajo y control de avances",
    ],
  },
] as const;

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
