import type { ServiceLineId } from "./conversion";

/* ------------------------------------------------------------------ */
/*  SERVICE LINE SEO DATA                                              */
/* ------------------------------------------------------------------ */

export type ServiceLineSEO = {
  slug: string;
  lineId: ServiceLineId;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  heroTitle: string;
  heroDescription: string;
  heroBullets: [string, string, string];
  faqs: { question: string; answer: string }[];
  ogImage: string;
};

export const SERVICE_LINE_SEO: ServiceLineSEO[] = [
  {
    slug: "techos",
    lineId: "techos",
    title: "Techos y cubiertas en Medellín: reparación, impermeabilización y mantenimiento",
    metaDescription:
      "Reparación de goteras, impermeabilización y mantenimiento de techos en Medellín y Valle de Aburrá. Visita técnica gratis. Cotiza por WhatsApp.",
    targetKeyword: "techos Medellín",
    secondaryKeywords: [
      "reparación techos Medellín",
      "impermeabilización techos Valle de Aburrá",
      "arreglar goteras Medellín",
      "mantenimiento cubiertas Antioquia",
    ],
    heroTitle: "Que no te entre agua por el techo",
    heroDescription:
      "Arreglamos goteras, sellamos techos y limpiamos canales para que tu casa o negocio quede seco.",
    heroBullets: [
      "Encontramos de dónde entra el agua",
      "Arreglamos según lo que necesite tu techo",
      "Revisamos todo para prevenir problemas",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta arreglar una gotera en Medellín?",
        answer:
          "La reparación de una gotera puntual empieza desde $180.000 COP. El precio final depende de la causa y la extensión del daño. Ofrecemos visita técnica gratuita para darte un precio exacto.",
      },
      {
        question: "¿Cada cuánto se debe impermeabilizar el techo?",
        answer:
          "Depende del sistema usado: los acrílicos duran 3-5 años, el manto asfáltico de 5-10 años y la silicona elastomérica de 7-12 años. Lo ideal es revisar antes de que aparezcan goteras.",
      },
      {
        question: "¿Atienden emergencias de goteras los fines de semana?",
        answer:
          "Atendemos lunes a sábado de 7 a.m. a 6 p.m. Para urgencias fuera de horario, escríbenos por WhatsApp y coordinamos lo antes posible.",
      },
      {
        question: "¿Qué garantía dan en reparación de techos?",
        answer:
          "Damos garantía por escrito en cada trabajo. El tiempo depende del tipo de reparación y los materiales usados. Te la explicamos antes de empezar.",
      },
    ],
    ogImage: "/og/og-techos.png",
  },
  {
    slug: "pintura",
    lineId: "pintura",
    title: "Pintura y acabados en Medellín: interior, exterior y tratamiento de paredes",
    metaDescription:
      "Pintura interior y exterior, resanes, estuco y tratamiento de humedad en Medellín y Valle de Aburrá. Cotización gratis. Escríbenos por WhatsApp.",
    targetKeyword: "pintura Medellín",
    secondaryKeywords: [
      "pintar apartamento Medellín",
      "pintura interior Valle de Aburrá",
      "pintura exterior Medellín precio",
      "tratamiento humedad paredes Medellín",
    ],
    heroTitle: "Tu casa o negocio como nuevo",
    heroDescription:
      "Preparamos las paredes, arreglamos lo que haga falta y pintamos con buen acabado.",
    heroBullets: [
      "Arreglamos paredes antes de pintar",
      "Pintamos por dentro y por fuera",
      "Corregimos detalles al final",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta pintar un apartamento en Medellín?",
        answer:
          "El catálogo de pintura interior parte de $280.000 COP como referencia inicial, no como precio de un apartamento completo ni tarifa por metro cuadrado. El valor depende de superficies, preparación y materiales; te damos una cotización para el alcance que necesitas.",
      },
      {
        question: "¿El precio incluye materiales?",
        answer:
          "Sí. Nuestras cotizaciones incluyen mano de obra, pintura de buena calidad, preparación de superficies y limpieza final. Si necesitás una pintura específica, también la conseguimos.",
      },
      {
        question: "¿Cuánto tiempo toma pintar un apartamento?",
        answer:
          "Un apartamento de 2 habitaciones se pinta en 2-3 días. Si hay resanes o tratamiento de humedad previo, puede tomar 1-2 días más.",
      },
      {
        question: "¿Tratan la humedad antes de pintar?",
        answer:
          "Sí. No pintamos encima de humedad sin resolver la causa primero. Diagnosticamos el origen, lo tratamos y luego pintamos con pintura anti-humedad para un resultado duradero.",
      },
    ],
    ogImage: "/og/og-pintura.png",
  },
  {
    slug: "plomeria",
    lineId: "plomeria",
    title: "Plomería en Medellín: reparación de fugas, destape y mantenimiento",
    metaDescription:
      "Reparación de fugas, destape de desagües y mantenimiento de tuberías en Medellín y Valle de Aburrá. Respuesta rápida. Cotiza por WhatsApp.",
    targetKeyword: "plomería Medellín",
    secondaryKeywords: [
      "plomero Medellín",
      "reparar fuga agua Medellín",
      "destape desagüe Valle de Aburrá",
      "plomero Envigado Sabaneta",
    ],
    heroTitle: "Adiós a las fugas y desagües tapados",
    heroDescription:
      "Arreglamos fugas, destapamos desagües y reparamos lo que haga falta en baño y cocina.",
    heroBullets: [
      "Encontramos de dónde sale la fuga",
      "Destapamos y reparamos lo que falle",
      "Revisamos todo para que no se repita",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta reparar una fuga de agua en Medellín?",
        answer:
          "La detección de fuga empieza desde $130.000 COP y la reparación desde $170.000 COP. El precio final depende de la ubicación de la fuga y la dificultad del acceso.",
      },
      {
        question: "¿Atienden el mismo día?",
        answer:
          "Hacemos lo posible por atender urgencias el mismo día. Escríbenos por WhatsApp, te confirmamos disponibilidad y coordinamos la visita lo antes posible.",
      },
      {
        question: "¿Cómo detectan una fuga oculta en la pared?",
        answer:
          "Revisamos tuberías, conexiones y puntos críticos. Verificamos presión del agua y revisamos señales visibles como manchas de humedad, pintura ampollada o sonido de agua corriendo.",
      },
      {
        question: "¿Destapan desagües de cocina y baño?",
        answer:
          "Sí. Destapamos desagües de baño, cocina, patio y sifones. El servicio de destape empieza desde $160.000 COP.",
      },
    ],
    ogImage: "/og/og-plomeria.png",
  },
];

export function getServiceLineSEO(slug: string) {
  return SERVICE_LINE_SEO.find((s) => s.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  MUNICIPALITY SEO DATA                                              */
/* ------------------------------------------------------------------ */

export type MunicipalitySEO = {
  slug: string;
  name: string;
  title: string;
  metaDescription: string;
  targetKeyword: string;
  secondaryKeywords: string[];
  description: string;
  lat: number;
  lng: number;
};

export const MUNICIPALITY_SEO: MunicipalitySEO[] = [
  {
    slug: "medellin",
    name: "Medellín",
    title: "Techos, pintura y plomería en Medellín | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Medellín. Atendemos todas las comunas, de Belén a El Poblado. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Medellín",
    secondaryKeywords: ["plomero Medellín", "pintor Medellín", "techos Medellín"],
    description:
      "Atendemos hogares y negocios en todo Medellín. Llegamos rápido, revisamos el problema y te damos un precio claro antes de empezar.",
    lat: 6.2518,
    lng: -75.5636,
  },
  {
    slug: "envigado",
    name: "Envigado",
    title: "Techos, pintura y plomería en Envigado | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Envigado. Del centro a Loma del Escobero y Las Palmas. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Envigado",
    secondaryKeywords: ["plomero Envigado", "pintor Envigado", "techos Envigado"],
    description:
      "Cubrimos Envigado con servicio rápido y profesional. Desde reparación de goteras hasta pintura completa y plomería.",
    lat: 6.167,
    lng: -75.5864,
  },
  {
    slug: "sabaneta",
    name: "Sabaneta",
    title: "Techos, pintura y plomería en Sabaneta | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Sabaneta. Casas tradicionales y edificios nuevos del sur. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Sabaneta",
    secondaryKeywords: ["plomero Sabaneta", "pintor Sabaneta", "techos Sabaneta"],
    description:
      "Atendemos Sabaneta con el mismo compromiso y calidad. Revisamos, cotizamos gratis y trabajamos con garantía.",
    lat: 6.1515,
    lng: -75.6167,
  },
  {
    slug: "bello",
    name: "Bello",
    title: "Techos, pintura y plomería en Bello | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Bello. Niquía, Cabañas, Fontidueño y el centro de Bello. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Bello",
    secondaryKeywords: ["plomero Bello", "pintor Bello", "techos Bello"],
    description:
      "Llegamos a Bello con servicio puntual y profesional. Techos, pintura y plomería para hogares y negocios.",
    lat: 6.3373,
    lng: -75.5569,
  },
  {
    slug: "itagui",
    name: "Itagüí",
    title: "Techos, pintura y plomería en Itagüí | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Itagüí. Viviendas, locales y bodegas del sector industrial. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Itagüí",
    secondaryKeywords: ["plomero Itagüí", "pintor Itagüí", "techos Itagüí"],
    description:
      "Cubrimos Itagüí con atención rápida. Reparamos techos, pintamos y solucionamos problemas de plomería.",
    lat: 6.1719,
    lng: -75.611,
  },
  {
    slug: "la-estrella",
    name: "La Estrella",
    title: "Techos, pintura y plomería en La Estrella | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en La Estrella. Pueblo Viejo, Suramérica y el casco urbano. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar La Estrella",
    secondaryKeywords: ["plomero La Estrella", "pintor La Estrella", "techos La Estrella"],
    description:
      "Atendemos La Estrella con servicio profesional. Desde goteras hasta pintura completa y reparaciones de plomería.",
    lat: 6.1578,
    lng: -75.6434,
  },
  {
    slug: "caldas",
    name: "Caldas",
    title: "Techos, pintura y plomería en Caldas | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Caldas. Casco urbano y veredas cercanas del sur del Valle. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Caldas Antioquia",
    secondaryKeywords: ["plomero Caldas", "pintor Caldas", "techos Caldas"],
    description:
      "Llegamos a Caldas para resolver problemas de techos, pintura y plomería en hogares y negocios.",
    lat: 6.0911,
    lng: -75.6405,
  },
  {
    slug: "copacabana",
    name: "Copacabana",
    title: "Techos, pintura y plomería en Copacabana | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Copacabana. Casco urbano y zona campestre del norte del Valle. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Copacabana",
    secondaryKeywords: ["plomero Copacabana", "pintor Copacabana", "techos Copacabana"],
    description:
      "Cubrimos Copacabana con servicio rápido. Reparamos techos, pintamos y resolvemos problemas de plomería.",
    lat: 6.3466,
    lng: -75.508,
  },
  {
    slug: "girardota",
    name: "Girardota",
    title: "Techos, pintura y plomería en Girardota | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Girardota. Casco urbano y fincas del norte del Valle de Aburrá. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Girardota",
    secondaryKeywords: ["plomero Girardota", "pintor Girardota", "techos Girardota"],
    description:
      "Atendemos Girardota con servicio profesional y puntual. Techos, pintura y plomería con garantía.",
    lat: 6.3773,
    lng: -75.4488,
  },
  {
    slug: "rionegro",
    name: "Rionegro",
    title: "Techos, pintura y plomería en Rionegro | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Rionegro. Casco urbano, Llanogrande y San Antonio de Pereira. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Rionegro",
    secondaryKeywords: ["plomero Rionegro", "pintor Rionegro", "techos Rionegro"],
    description:
      "Llegamos a Rionegro para atender problemas de techos, pintura y plomería. Servicio profesional con garantía.",
    lat: 6.1535,
    lng: -75.3764,
  },
  {
    slug: "la-ceja",
    name: "La Ceja",
    title: "Techos, pintura y plomería en La Ceja | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en La Ceja. Casco urbano y parcelaciones del Oriente. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar La Ceja",
    secondaryKeywords: ["plomero La Ceja", "pintor La Ceja", "techos La Ceja"],
    description:
      "Cubrimos La Ceja con atención profesional. Desde impermeabilización hasta pintura y reparaciones de plomería.",
    lat: 6.0313,
    lng: -75.4335,
  },
  {
    slug: "marinilla",
    name: "Marinilla",
    title: "Techos, pintura y plomería en Marinilla | Reparación a domicilio",
    metaDescription:
      "Reparación de techos, pintura y plomería en Marinilla. Casco urbano y veredas del altiplano del Oriente. Visita técnica gratis y garantía por escrito.",
    targetKeyword: "servicios hogar Marinilla",
    secondaryKeywords: ["plomero Marinilla", "pintor Marinilla", "techos Marinilla"],
    description:
      "Atendemos Marinilla con el mismo compromiso de siempre. Techos, pintura y plomería con garantía por escrito.",
    lat: 6.1739,
    lng: -75.3364,
  },
];

export function getMunicipalitySEO(slug: string) {
  return MUNICIPALITY_SEO.find((m) => m.slug === slug);
}

/* ------------------------------------------------------------------ */
/*  PERFIL POR MUNICIPIO (sectores, vivienda, clima)                   */
/* ------------------------------------------------------------------ */

export type MunicipalityProfile = {
  /** Sectores o barrios conocidos. Se redactan como "incluidos ..." porque cubrimos todo el municipio. */
  sectors: string[];
  /** Tipo de vivienda predominante. */
  housing: string;
  /** Nota de clima o entorno que afecta techos, pintura o plomería. */
  climate: string;
};

export const MUNICIPALITY_PROFILE: Record<string, MunicipalityProfile> = {
  "medellin": {
    sectors: ["El Poblado", "Laureles y Estadio", "Belén", "Robledo", "Buenos Aires", "La América", "Castilla", "el Centro"],
    housing:
      "casas de barrio de uno y dos pisos, apartamentos en edificios de todas las épocas y locales comerciales",
    climate:
      "Medellín tiene dos temporadas de lluvia, abril–mayo y septiembre–noviembre, con aguaceros cortos y fuertes que ponen a prueba techos, canales y fachadas.",
  },
  "envigado": {
    sectors: ["La Paz", "El Dorado", "Zúñiga", "Las Vegas", "San Marcos", "Alto de Misael", "Loma del Escobero", "Las Palmas"],
    housing:
      "casas de dos pisos con teja de barro en los barrios tradicionales y edificios nuevos en las lomas",
    climate:
      "En las lomas del oriente de Envigado llueve más y hay más neblina que en la parte plana, así que las cubiertas y fachadas sufren más humedad.",
  },
  "sabaneta": {
    sectors: ["Aves María", "Calle Larga", "Las Lomitas", "Betania", "La Doctora", "San José", "Holanda", "Prados de Sabaneta"],
    housing:
      "casas tradicionales del centro y conjuntos de apartamentos nuevos que ya empiezan a necesitar mantenimiento",
    climate:
      "Sabaneta comparte el clima húmedo del sur del Valle de Aburrá, con lluvias frecuentes en la tarde que afectan sobre todo a terrazas y balcones.",
  },
  "bello": {
    sectors: ["Niquía", "Cabañas", "Fontidueño", "Zamora", "Santa Ana", "El Trapiche", "París", "Navarra"],
    housing:
      "casas de barrio con cubiertas de teja y conjuntos residenciales nuevos en Niquía y Navarra",
    climate:
      "Bello, al norte del Valle, recibe lluvias fuertes y viento que levantan tejas y tapan canales con hojas y tierra.",
  },
  "itagui": {
    sectors: ["el Centro", "Ditaires", "Santa María", "San Pío", "El Rosario", "San Gabriel", "Calatrava", "Yarumito"],
    housing:
      "viviendas de barrio, locales comerciales y bodegas del sector industrial",
    climate:
      "En Itagüí los techos de bodegas y locales acumulan hollín y sedimento que tapan bajantes, y las lluvias de la tarde los desbordan.",
  },
  "la-estrella": {
    sectors: ["Pueblo Viejo", "Suramérica", "La Tablaza", "Ancón", "San Agustín", "El Pedrero", "Bellavista", "La Inmaculada"],
    housing:
      "casas tradicionales en el casco urbano y viviendas campestres en las lomas",
    climate:
      "La Estrella tiene lluvias constantes y zonas de ladera con mucha humedad, lo que acelera el moho en paredes y el deterioro de los sellados.",
  },
  "caldas": {
    sectors: ["el Centro", "La Chuscala", "Mandalay", "Andalucía", "La Planta", "La Inmaculada", "Barrios Unidos", "El Porvenir"],
    housing:
      "casas de barrio con teja de barro o fibrocemento y fincas en las veredas cercanas",
    climate:
      "Caldas es de los municipios más lluviosos del Valle de Aburrá; los techos viejos y las canales sin mantenimiento fallan primero aquí.",
  },
  "copacabana": {
    sectors: ["el Centro", "Machado", "Las Vegas", "El Recreo", "Villanueva", "Fátima", "La Misericordia", "Zarzal"],
    housing:
      "casas del casco urbano y viviendas campestres hacia las veredas",
    climate:
      "Copacabana, al norte del Valle, alterna sol fuerte y aguaceros, lo que agrieta los sellados de las cubiertas con el tiempo.",
  },
  "girardota": {
    sectors: ["el Centro", "El Paraíso", "San Andrés", "El Totumo", "La Palma", "Aurelio Mejía", "Juan XXIII"],
    housing:
      "viviendas del casco urbano y fincas con techos amplios en las veredas",
    climate:
      "En Girardota las fincas tienen cubiertas grandes con mucha hoja encima; limpiar canales antes de las lluvias evita la mayoría de las goteras.",
  },
  "rionegro": {
    sectors: ["el Centro", "San Antonio de Pereira", "Llanogrande", "El Porvenir", "Gualanday", "Cuatro Esquinas", "Alto Bonito", "El Tablazo"],
    housing:
      "casas campestres, parcelaciones y apartamentos nuevos en el casco urbano",
    climate:
      "Rionegro está a 2.100 metros: llueve más, hace más frío y la humedad se queda en las paredes, así que la pintura y los sellados duran menos si no se preparan bien.",
  },
  "la-ceja": {
    sectors: ["el Centro", "Fátima", "San Cayetano", "La Floresta", "El Tambo", "Payuco", "La Milagrosa"],
    housing:
      "casas del casco urbano y parcelaciones campestres",
    climate:
      "La Ceja tiene clima frío y húmedo del altiplano; la humedad en paredes y el moho son los problemas más frecuentes.",
  },
  "marinilla": {
    sectors: ["el Centro", "El Progreso", "La Ramada", "El Rosario", "Belén", "Santa Lucía"],
    housing:
      "casas tradicionales del casco urbano y viviendas en veredas cercanas",
    climate:
      "Marinilla, en el altiplano del Oriente, combina lluvia y frío; las cubiertas con pendiente baja acumulan agua y necesitan revisión periódica.",
  },
};

export function getMunicipalityProfile(slug: string): MunicipalityProfile | undefined {
  return MUNICIPALITY_PROFILE[slug];
}

/** "La Paz, El Dorado y Zúñiga" */
export function joinSectors(sectors: string[], max = 3): string {
  const list = sectors.slice(0, max);
  if (list.length <= 1) return list.join("");
  return `${list.slice(0, -1).join(", ")} y ${list[list.length - 1]}`;
}

// FAQ específicas por municipio y línea: usan el perfil y precios ya publicados.
const LINE_LOCAL_FAQ: Record<string, (muni: string, p: MunicipalityProfile) => { question: string; answer: string }> = {
  techos: (muni, p) => ({
    question: `¿Qué pasa con las goteras en ${muni} cuando llegan las lluvias?`,
    answer: `${p.climate} Por eso recomendamos una revisión del techo (desde $130.000 COP) antes de la temporada y reparar las goteras que aparezcan (desde $180.000 COP) sin esperar a que dañen el cielo raso.`,
  }),
  pintura: (muni, p) => ({
    question: `¿Cuánto tarda pintar una casa o apartamento en ${muni}?`,
    answer: `En ${muni} trabajamos sobre todo en ${p.housing}. Un apartamento de dos habitaciones toma 2 a 3 días; una casa de dos pisos, 4 a 6. La pintura interior empieza desde $280.000 COP e incluye preparación de paredes y limpieza final.`,
  }),
  plomeria: (muni, p) => ({
    question: `¿Hacen plomería de urgencia en ${muni}?`,
    answer: `Sí. En ${muni} atendemos de lunes a sábado de 7:00 a. m. a 6:00 p. m., y fuera de ese horario coordinamos por WhatsApp lo antes posible. ${p.climate} La reparación de fugas empieza desde $170.000 COP y el destape de desagües desde $160.000 COP.`,
  }),
};

export function buildLocalFaqs(lineSlug: string, muni: { slug: string; name: string }) {
  const p = MUNICIPALITY_PROFILE[muni.slug];
  if (!p) return [];
  const coverage = {
    question: `¿Atienden en ${joinSectors(p.sectors)} (${muni.name})?`,
    answer: `Sí. Cubrimos todo ${muni.name}, incluidos ${joinSectors(p.sectors, p.sectors.length)}. Si tu sector no aparece, escríbenos por WhatsApp: confirmamos cobertura y disponibilidad antes de programar la visita.`,
  };
  const local = LINE_LOCAL_FAQ[lineSlug]?.(muni.name, p);
  return local ? [coverage, local] : [coverage];
}

/* ------------------------------------------------------------------ */
/*  CROSS-PAGE SEO DATA (Service × Municipality)                       */
/* ------------------------------------------------------------------ */

export type CrossPageSEO = {
  lineSlug: string;
  municipioSlug: string;
  lineLabel: string;
  municipioName: string;
  title: string;
  metaDescription: string;
  h1: string;
  intro: string;
  faqs: { question: string; answer: string }[];
};

const LINE_LABELS: Record<string, string> = {
  techos: "Techos y cubiertas",
  pintura: "Pintura y acabados",
  plomeria: "Plomería",
};

// Frase propia de cada municipio para que ninguna meta description se repita.
export const MUNICIPALITY_HOOKS: Record<string, string> = {
  "medellin": "Atendemos todas las comunas, de Belén a El Poblado.",
  "envigado": "Del centro a Loma del Escobero y Las Palmas.",
  "sabaneta": "Casas tradicionales y edificios nuevos del sur.",
  "bello": "Niquía, Cabañas, Fontidueño y el centro de Bello.",
  "itagui": "Viviendas, locales y bodegas del sector industrial.",
  "la-estrella": "Pueblo Viejo, Suramérica y el casco urbano.",
  "caldas": "Casco urbano y veredas cercanas del sur del Valle.",
  "copacabana": "Casco urbano y zona campestre del norte del Valle.",
  "girardota": "Casco urbano y fincas del norte del Valle de Aburrá.",
  "rionegro": "Casco urbano, Llanogrande y San Antonio de Pereira.",
  "la-ceja": "Casco urbano y parcelaciones del Oriente.",
  "marinilla": "Casco urbano y veredas del altiplano del Oriente.",
};

// Título (etiqueta <title>) y H1 por línea, escritos como busca la gente.
const LINE_TITLE: Record<string, (muni: string) => string> = {
  techos: (m) => `Reparación de goteras y techos en ${m} | Visita gratis`,
  pintura: (m) => `Pintores en ${m}: pintura interior y exterior | Precio claro`,
  plomeria: (m) => `Plomero en ${m}: fugas y destapes a domicilio`,
};

const LINE_H1: Record<string, (muni: string) => string> = {
  techos: (m) => `Reparación de techos y goteras en ${m}`,
  pintura: (m) => `Pintura de casas y apartamentos en ${m}`,
  plomeria: (m) => `Plomería a domicilio en ${m}`,
};

const LINE_SHORT: Record<string, string> = {
  techos: "Goteras, impermeabilización y mantenimiento de techos",
  pintura: "Pintura interior, exterior y resanes",
  plomeria: "Fugas, destapes y grifería a domicilio",
};

const LINE_VERB: Record<string, string> = {
  techos: "reparación de techos, impermeabilización y mantenimiento de cubiertas",
  pintura: "pintura interior y exterior, resanes y tratamiento de humedad",
  plomeria: "reparación de fugas, destape de desagües y cambio de grifería",
};

const MUNICIPALITY_INTROS: Record<string, Record<string, string>> = {
  techos: {
    medellin: "Medellín, con su clima de lluvias frecuentes y temperaturas cambiantes, exige techos en buen estado. Las cubiertas expuestas al sol y a la lluvia del Valle de Aburrá necesitan mantenimiento regular para evitar filtraciones.",
    envigado: "Las lluvias del sur del Valle de Aburrá afectan directamente las cubiertas en Envigado. Ya sea en casas del centro o edificios residenciales, un techo bien sellado es clave para evitar daños.",
    sabaneta: "Sabaneta, con su crecimiento urbano acelerado, tiene tanto casas antiguas con tejas de barro como edificios nuevos. Ambos tipos de cubierta necesitan revisión y mantenimiento periódico.",
    bello: "Bello, al norte del Valle de Aburrá, recibe lluvias fuertes que ponen a prueba los techos. Ofrecemos impermeabilización, reparación de goteras y limpieza de canales en todo el municipio.",
    itagui: "En Itagüí, las zonas industriales y residenciales requieren cubiertas en buen estado. Atendemos bodegas, locales comerciales y viviendas con servicio profesional y garantía.",
    "la-estrella": "La Estrella, ubicada al sur del Valle de Aburrá, tiene viviendas expuestas a lluvias constantes. Sellamos, impermeabilizamos y reparamos techos con materiales de calidad.",
    caldas: "Caldas, al sur del Valle de Aburrá, tiene un clima húmedo que exige techos bien protegidos. Atendemos casas y negocios con reparación de goteras e impermeabilización.",
    copacabana: "Copacabana, al norte del Valle de Aburrá, presenta condiciones de humedad que afectan las cubiertas. Ofrecemos mantenimiento preventivo y reparaciones rápidas.",
    girardota: "Girardota combina zona rural y urbana, con techos de diferentes materiales. Atendemos desde fincas hasta viviendas del casco urbano con servicio profesional.",
    rionegro: "Rionegro, en el Oriente antioqueño, tiene un clima frío y lluvioso que exige techos impermeabilizados. Atendemos viviendas, fincas y locales comerciales.",
    "la-ceja": "La Ceja tiene un clima frío y húmedo que deteriora rápidamente las cubiertas sin mantenimiento. Reparamos goteras, sellamos juntas e impermeabilizamos con garantía.",
    marinilla: "Marinilla, con lluvias frecuentes en el Oriente antioqueño, necesita techos bien protegidos. Ofrecemos impermeabilización, reparación y mantenimiento de cubiertas.",
  },
  pintura: {
    medellin: "En Medellín, el clima templado y la humedad del Valle de Aburrá exigen pinturas de calidad que resistan. Ya sea un apartamento en El Poblado o una casa en Robledo, pintamos con acabado profesional.",
    envigado: "Envigado tiene viviendas y apartamentos que necesitan pintura de calidad. Preparamos las superficies, tratamos la humedad si la hay, y dejamos el acabado impecable.",
    sabaneta: "En Sabaneta, los apartamentos nuevos y las casas antiguas necesitan diferentes tratamientos. Nos adaptamos al tipo de superficie y te damos un acabado limpio y duradero.",
    bello: "Bello tiene barrios residenciales grandes donde la pintura se deteriora por la humedad y el sol. Preparamos las paredes, resanamos y pintamos con materiales que duran.",
    itagui: "En Itagüí, atendemos viviendas y locales comerciales con pintura interior y exterior. Tratamos humedad, resanamos paredes y dejamos el espacio como nuevo.",
    "la-estrella": "La Estrella tiene conjuntos residenciales y casas que necesitan mantenimiento de pintura. Hacemos resanes, tratamiento de humedad y pintura con acabado profesional.",
    caldas: "En Caldas, las condiciones de humedad pueden afectar la pintura de las paredes. Tratamos el origen de la humedad antes de pintar para un resultado que dure.",
    copacabana: "Copacabana tiene viviendas que necesitan renovación periódica de pintura. Desde interiores hasta fachadas completas, pintamos con calidad y limpieza.",
    girardota: "En Girardota, las fincas y viviendas del casco urbano necesitan pintura que resista el clima. Atendemos interiores, exteriores y fachadas con garantía.",
    rionegro: "Rionegro tiene un crecimiento urbano fuerte, con apartamentos y casas que necesitan pintura de calidad. Atendemos desde estudios hasta fincas del Oriente antioqueño.",
    "la-ceja": "La Ceja tiene condiciones de humedad que afectan la pintura. Tratamos las paredes, resanamos y pintamos con productos anti-humedad para un acabado duradero.",
    marinilla: "En Marinilla, la humedad del Oriente antioqueño exige pinturas resistentes. Preparamos las superficies y usamos materiales que soporten las condiciones climáticas.",
  },
  plomeria: {
    medellin: "En Medellín, los problemas de plomería son frecuentes por la antigüedad de muchas instalaciones. Atendemos fugas, desagües tapados y cambio de grifería en todo el Valle de Aburrá.",
    envigado: "Envigado tiene edificios y casas con instalaciones que necesitan mantenimiento. Detectamos fugas, destapamos desagües y reparamos conexiones con servicio rápido.",
    sabaneta: "En Sabaneta, los apartamentos nuevos y las casas antiguas presentan diferentes problemas de plomería. Nos adaptamos y solucionamos desde fugas hasta instalación de grifería.",
    bello: "Bello tiene barrios con tuberías antiguas que presentan fugas y obstrucciones. Atendemos el mismo día cuando es posible y reparamos con garantía.",
    itagui: "En Itagüí, atendemos hogares y negocios con problemas de plomería. Desde una fuga simple hasta reparaciones más complejas de tuberías.",
    "la-estrella": "La Estrella tiene viviendas que necesitan mantenimiento de plomería regular. Reparamos fugas, destapamos desagües y cambiamos grifería con servicio profesional.",
    caldas: "En Caldas, atendemos problemas de plomería en casas y negocios. Detección de fugas, destape de desagües y mantenimiento de tuberías con garantía.",
    copacabana: "Copacabana tiene instalaciones que necesitan atención profesional de plomería. Llegamos rápido, diagnosticamos el problema y lo reparamos el mismo día cuando es posible.",
    girardota: "En Girardota, atendemos plomería en viviendas urbanas y fincas. Reparamos fugas, destapamos cañerías y hacemos mantenimiento preventivo de tuberías.",
    rionegro: "Rionegro tiene un crecimiento urbano que exige servicios de plomería confiables. Atendemos fugas, desagües y grifería en viviendas y locales del Oriente antioqueño.",
    "la-ceja": "En La Ceja, ofrecemos servicio de plomería profesional para hogares y negocios. Detección de fugas, destape de desagües y reparación de conexiones.",
    marinilla: "Marinilla necesita plomeros confiables. Atendemos fugas, desagües tapados, cambio de grifería y mantenimiento de tuberías con servicio profesional.",
  },
};

const CROSS_PAGE_FAQS: Record<string, { question: string; answer: string }[]> = {
  techos: [
    {
      question: "¿Cuánto cuesta reparar una gotera en {municipio}?",
      answer: "La reparación de una gotera puntual en {municipio} empieza desde $180.000 COP. El precio final depende de la causa y extensión del daño. Ofrecemos visita técnica gratuita en {municipio} para dar un precio exacto.",
    },
    {
      question: "¿Impermeabilizan techos en {municipio}?",
      answer: "Sí. Impermeabilizamos techos en {municipio} desde $350.000 COP. Usamos sistemas acrílicos, manto asfáltico, poliuretano y silicona elastomérica según las necesidades del techo.",
    },
    {
      question: "¿Cuánto tarda una reparación de techo en {municipio}?",
      answer: "Una reparación puntual de gotera toma entre medio día y un día. Una impermeabilización completa puede tomar 1 a 3 días dependiendo del área. Coordinamos horarios flexibles en {municipio}.",
    },
  ],
  pintura: [
    {
      question: "¿Cuánto cuesta pintar un apartamento en {municipio}?",
      answer: "Para pintar un apartamento en {municipio} revisamos las superficies, su estado y los materiales. El catálogo de pintura interior parte de $280.000 COP como referencia inicial; no es el precio de un apartamento completo. El alcance y valor final quedan en la cotización.",
    },
    {
      question: "¿Pintan fachadas en {municipio}?",
      answer: "Sí. Pintamos fachadas de casas, edificios y locales en {municipio}. El acabado de fachada empieza desde $330.000 COP. Incluimos preparación, resanes y pintura exterior resistente.",
    },
    {
      question: "¿Tratan humedad en paredes en {municipio}?",
      answer: "Sí. Antes de pintar, diagnosticamos y tratamos el origen de la humedad. El tratamiento de humedad en paredes empieza desde $250.000 COP en {municipio}. No pintamos encima de humedad sin resolver la causa.",
    },
  ],
  plomeria: [
    {
      question: "¿Cuánto cuesta un plomero en {municipio}?",
      answer: "Los servicios de plomería en {municipio} empiezan desde $120.000 COP (revisión de presión). Reparación de fugas desde $170.000, destape de desagües desde $160.000, cambio de grifería desde $150.000. Visita técnica gratis.",
    },
    {
      question: "¿Atienden emergencias de plomería en {municipio}?",
      answer: "Hacemos lo posible por atender urgencias el mismo día en {municipio}. Escríbenos por WhatsApp, confirmamos disponibilidad y coordinamos la visita lo antes posible. Horario: lunes a sábado 7 a.m. a 6 p.m.",
    },
    {
      question: "¿Destapan desagües en {municipio}?",
      answer: "Sí. Destapamos desagües de baño, cocina, patio y sifones en {municipio}. El servicio empieza desde $160.000 COP. Usamos herramientas profesionales para un resultado efectivo.",
    },
  ],
};

function buildCrossPages(): CrossPageSEO[] {
  const pages: CrossPageSEO[] = [];
  for (const line of SERVICE_LINE_SEO) {
    for (const muni of MUNICIPALITY_SEO) {
      const lineLabel = LINE_LABELS[line.slug] ?? line.slug;
      const lineVerb = LINE_VERB[line.slug] ?? line.slug;

      const intro =
        MUNICIPALITY_INTROS[line.slug]?.[muni.slug] ??
        `Ofrecemos ${lineVerb} en ${muni.name} con visita técnica gratuita y garantía por escrito.`;

      const faqs = [
        ...(CROSS_PAGE_FAQS[line.slug] ?? []).map((faq) => ({
          question: faq.question.replace(/\{municipio\}/g, muni.name),
          answer: faq.answer.replace(/\{municipio\}/g, muni.name),
        })),
        ...buildLocalFaqs(line.slug, muni),
      ];

      pages.push({
        lineSlug: line.slug,
        municipioSlug: muni.slug,
        lineLabel,
        municipioName: muni.name,
        title: (LINE_TITLE[line.slug] ?? ((m: string) => `${lineLabel} en ${m}`))(muni.name),
        metaDescription: `${LINE_SHORT[line.slug] ?? lineLabel} en ${muni.name}. ${MUNICIPALITY_HOOKS[muni.slug] ?? ""} Visita técnica gratis y garantía por escrito.`
          .replace(/\s+/g, " ")
          .trim()
          .slice(0, 158),
        h1: (LINE_H1[line.slug] ?? ((m: string) => `${lineLabel} en ${m}`))(muni.name),
        intro,
        faqs,
      });
    }
  }
  return pages;
}

export const CROSS_PAGE_SEO = buildCrossPages();

export function getCrossPageSEO(lineSlug: string, municipioSlug: string) {
  return CROSS_PAGE_SEO.find(
    (p) => p.lineSlug === lineSlug && p.municipioSlug === municipioSlug,
  );
}
