export const COMPANY_NAME = "Espinal Multiservicios";
export const SITE_URL = "https://techos-espinal-landing.vercel.app";

export const PHONE_DISPLAY = "(+57) 300 733 6333";
export const PHONE_E164 = "+573007336333";
export const WA_NUMBER = "573007336333";
export const DEFAULT_CITY = "Medellin / Valle de Aburra";

export const WA_BASE_URL = `https://wa.me/${WA_NUMBER}`;

export const NAV_LINKS = [
  { id: "servicios", label: "Cotizacion en linea" },
  { id: "proceso", label: "Proceso" },
  { id: "cobertura", label: "Cobertura" },
  { id: "escenarios-frecuentes", label: "Escenarios" },
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
