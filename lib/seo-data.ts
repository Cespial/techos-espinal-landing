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
          "No hay un único intervalo para todas las cubiertas. Depende del material, la preparación, el estado del techo, la exposición y la intervención anterior. Si observas una filtración o deterioro visible, solicita una revisión y conserva la garantía o ficha del trabajo anterior si existe.",
      },
      {
        question: "¿Atienden emergencias de goteras los fines de semana?",
        answer:
          "Atendemos mensajes de lunes a sábado, de 7:00 a. m. a 6:00 p. m. Fuera de ese horario puedes dejar la información por WhatsApp; confirmamos la disponibilidad antes de programar una visita.",
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
          "La cotización indica quién suministra la pintura, qué producto se acuerda y cuáles materiales, preparación y limpieza quedan incluidos. La referencia inicial del catálogo no permite dar por incluidos materiales o trabajos que no aparezcan en la propuesta.",
      },
      {
        question: "¿Cuánto tiempo toma pintar un apartamento?",
        answer:
          "La duración depende de los espacios y superficies, su estado, los resanes, los materiales, el acceso y si el inmueble está ocupado. Esos datos se revisan para definir el alcance y la programación antes de empezar.",
      },
      {
        question: "¿Tratan la humedad antes de pintar?",
        answer:
          "Una mancha no confirma por sí sola el origen de la humedad. Revisamos lo visible y explicamos si hace falta cotizar por separado una fuga, filtración u otra intervención antes de pintar. La propuesta distingue la corrección de la causa, la preparación y el acabado.",
      },
    ],
    ogImage: "/og/og-pintura.png",
  },
  {
    slug: "plomeria",
    lineId: "plomeria",
    title: "Plomería en Medellín: reparación de fugas, destape y mantenimiento",
    metaDescription:
      "Reparación de fugas, destape de desagües y mantenimiento de tuberías en Medellín y Valle de Aburrá. Consulta disponibilidad por WhatsApp.",
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
      "Acordamos el alcance antes de intervenir",
    ],
    faqs: [
      {
        question: "¿Cuánto cuesta reparar una fuga de agua en Medellín?",
        answer:
          "La detección de fuga empieza desde $130.000 COP y la reparación desde $170.000 COP. El precio final depende de la ubicación de la fuga y la dificultad del acceso.",
      },
      {
        question: "¿Cómo confirman la disponibilidad?",
        answer:
          "Escríbenos por WhatsApp con tu municipio, sector y una descripción del problema. Atendemos mensajes de lunes a sábado, de 7:00 a. m. a 6:00 p. m., y confirmamos la disponibilidad antes de programar.",
      },
      {
        question: "¿Cómo detectan una fuga oculta en la pared?",
        answer:
          "Una mancha no permite confirmar por sí sola una fuga oculta. Revisamos las señales y las conexiones accesibles, y antes de realizar una revisión específica o abrir una superficie explicamos su alcance y si tiene costo.",
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
/*  PERFIL POR MUNICIPIO (sectores y datos útiles para coordinar)      */
/* ------------------------------------------------------------------ */

export type MunicipalityProfile = {
  /** Sectores de referencia dentro del área de cobertura. */
  sectors: string[];
  /** Inmuebles para los que se puede consultar atención; no implica experiencia previa allí. */
  propertyTypes: string;
  /** Dato operativo que ayuda a coordinar la visita sin inferir daños locales. */
  bookingNote: string;
};

export const MUNICIPALITY_PROFILE: Record<string, MunicipalityProfile> = {
  "medellin": {
    sectors: ["El Poblado", "Laureles y Estadio", "Belén", "Robledo", "Buenos Aires", "La América", "Castilla", "el Centro"],
    propertyTypes: "casas, apartamentos y locales comerciales",
    bookingNote: "Indica la comuna, el barrio y si el ingreso debe coordinarse con una administración.",
  },
  "envigado": {
    sectors: ["La Paz", "El Dorado", "Zúñiga", "Las Vegas", "San Marcos", "Alto de Misael", "Loma del Escobero", "Las Palmas"],
    propertyTypes: "casas, apartamentos, locales y propiedades en zonas de loma",
    bookingNote: "Comparte el barrio y las condiciones de acceso para confirmar cobertura y desplazamiento.",
  },
  "sabaneta": {
    sectors: ["Aves María", "Calle Larga", "Las Lomitas", "Betania", "La Doctora", "San José", "Holanda", "Prados de Sabaneta"],
    propertyTypes: "casas, apartamentos y locales",
    bookingNote: "Si es un edificio o conjunto, indícanos los requisitos de ingreso y quién autoriza el trabajo.",
  },
  "bello": {
    sectors: ["Niquía", "Cabañas", "Fontidueño", "Zamora", "Santa Ana", "El Trapiche", "París", "Navarra"],
    propertyTypes: "casas, apartamentos, conjuntos residenciales y negocios",
    bookingNote: "Comparte el barrio, el tipo de inmueble y fotografías tomadas desde un lugar seguro.",
  },
  "itagui": {
    sectors: ["el Centro", "Ditaires", "Santa María", "San Pío", "El Rosario", "San Gabriel", "Calatrava", "Yarumito"],
    propertyTypes: "viviendas, locales comerciales y bodegas",
    bookingNote: "Para locales o bodegas, indica horarios de ingreso, altura aproximada y restricciones del lugar.",
  },
  "la-estrella": {
    sectors: ["Pueblo Viejo", "Suramérica", "La Tablaza", "Ancón", "San Agustín", "El Pedrero", "Bellavista", "La Inmaculada"],
    propertyTypes: "casas, apartamentos y viviendas campestres",
    bookingNote: "Indica el sector y las condiciones de acceso para confirmar la agenda antes del desplazamiento.",
  },
  "caldas": {
    sectors: ["el Centro", "La Chuscala", "Mandalay", "Andalucía", "La Planta", "La Inmaculada", "Barrios Unidos", "El Porvenir"],
    propertyTypes: "casas, negocios y propiedades en sectores urbanos o rurales",
    bookingNote: "Para veredas o sectores alejados, comparte una referencia de ubicación para confirmar el desplazamiento.",
  },
  "copacabana": {
    sectors: ["el Centro", "Machado", "Las Vegas", "El Recreo", "Villanueva", "Fátima", "La Misericordia", "Zarzal"],
    propertyTypes: "casas, apartamentos, negocios y viviendas campestres",
    bookingNote: "Comparte el sector y una referencia de acceso para confirmar disponibilidad y desplazamiento.",
  },
  "girardota": {
    sectors: ["el Centro", "El Paraíso", "San Andrés", "El Totumo", "La Palma", "Aurelio Mejía", "Juan XXIII"],
    propertyTypes: "viviendas, negocios y fincas",
    bookingNote: "Si la propiedad está en una vereda, indica el punto de referencia y las condiciones de acceso.",
  },
  "rionegro": {
    sectors: ["el Centro", "San Antonio de Pereira", "Llanogrande", "El Porvenir", "Gualanday", "Cuatro Esquinas", "Alto Bonito", "El Tablazo"],
    propertyTypes: "casas, apartamentos, locales, parcelaciones y propiedades campestres",
    bookingNote: "Indica el sector y si la parcelación o copropiedad exige autorización previa para el ingreso.",
  },
  "la-ceja": {
    sectors: ["el Centro", "Fátima", "San Cayetano", "La Floresta", "El Tambo", "Payuco", "La Milagrosa"],
    propertyTypes: "casas, apartamentos, negocios y propiedades campestres",
    bookingNote: "Comparte el sector y los requisitos de ingreso para confirmar cobertura y disponibilidad.",
  },
  "marinilla": {
    sectors: ["el Centro", "El Progreso", "La Ramada", "El Rosario", "Belén", "Santa Lucía"],
    propertyTypes: "casas, apartamentos, negocios y propiedades en sectores rurales",
    bookingNote: "Si la dirección está fuera del casco urbano, envía una referencia de acceso antes de programar la visita.",
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
const LINE_LOCAL_FAQ: Record<string, (muni: string) => { question: string; answer: string }> = {
  techos: (muni) => ({
    question: `¿Qué información necesitan para revisar un techo en ${muni}?`,
    answer: `Indica el sector de ${muni}, el tipo de cubierta, dónde aparece el agua y cómo se accede al techo. Puedes enviar fotografías desde un lugar seguro; no necesitas subir. La revisión del techo figura desde $130.000 COP y la reparación puntual de goteras desde $180.000 COP como referencias de catálogo. Confirmamos el alcance y el precio antes de realizar el trabajo.`,
  }),
  pintura: (muni) => ({
    question: `¿Cómo cotizan pintura en ${muni}?`,
    answer: `Para cotizar en ${muni} necesitamos saber qué espacios y superficies quieres pintar, su estado y quién suministra los materiales. La pintura interior figura desde $280.000 COP como referencia inicial, no como el precio de una casa o apartamento completo. La preparación, los resanes y el tiempo se definen en la propuesta.`,
  }),
  plomeria: (muni) => ({
    question: `¿Cómo coordinan plomería en ${muni}?`,
    answer: `Atendemos solicitudes en ${muni} de lunes a sábado, de 7:00 a. m. a 6:00 p. m. Comparte el sector, dónde aparece el agua o qué desagüe está afectado; confirmamos disponibilidad antes de programar. La reparación de fugas figura desde $170.000 COP y el destape de desagües desde $160.000 COP como referencias de catálogo.`,
  }),
};

export function buildLocalFaqs(lineSlug: string, muni: { slug: string; name: string }) {
  const p = MUNICIPALITY_PROFILE[muni.slug];
  if (!p) return [];
  const coverage = {
    question: `¿Atienden en ${joinSectors(p.sectors)} (${muni.name})?`,
    answer: `Sí. Cubrimos todo ${muni.name}, incluidos ${joinSectors(p.sectors, p.sectors.length)}. Si tu sector no aparece, escríbenos por WhatsApp: confirmamos cobertura y disponibilidad antes de programar la visita.`,
  };
  const local = LINE_LOCAL_FAQ[lineSlug]?.(muni.name);
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
  "medellin": "todas las comunas, de Belén a El Poblado",
  "envigado": "el centro, Zúñiga y sectores de las lomas",
  "sabaneta": "el centro, Aves María y La Doctora",
  "bello": "Niquía, Cabañas, Fontidueño y el centro",
  "itagui": "el centro, Ditaires y Santa María",
  "la-estrella": "Pueblo Viejo, Suramérica y el casco urbano",
  "caldas": "el casco urbano y sectores rurales",
  "copacabana": "el casco urbano y sectores rurales",
  "girardota": "el casco urbano y sectores rurales",
  "rionegro": "el casco urbano, Llanogrande y San Antonio de Pereira",
  "la-ceja": "el casco urbano y sectores rurales",
  "marinilla": "el casco urbano y sectores rurales",
};

// Título (etiqueta <title>) y H1 por línea, escritos como busca la gente.
const LINE_TITLE: Record<string, (muni: string) => string> = {
  techos: (m) => `Reparación de techos y goteras en ${m}`,
  pintura: (m) => `Pintores en ${m}: interior y exterior`,
  plomeria: (m) => `Plomero en ${m}: fugas y destapes a domicilio`,
};

const LINE_H1: Record<string, (muni: string) => string> = {
  techos: (m) => `Reparación de techos y goteras en ${m}`,
  pintura: (m) => `Pintura de casas y apartamentos en ${m}`,
  plomeria: (m) => `Plomería a domicilio en ${m}`,
};

const LINE_INTRO: Record<string, (muni: string) => string> = {
  techos: (muni) => `Solicita en ${muni} reparación de goteras, impermeabilización o mantenimiento de cubiertas. Cuéntanos dónde aparece el agua, qué tipo de techo tienes y cómo se accede; definimos el alcance antes de cotizar.`,
  pintura: (muni) => `Solicita en ${muni} pintura interior o exterior, resanes y acabados. Indica los espacios, las superficies y su estado para preparar una propuesta con materiales y trabajos claramente definidos.`,
  plomeria: (muni) => `Solicita en ${muni} reparación de fugas, destape de desagües o cambio de grifería. Describe dónde aparece el agua o qué punto está afectado; confirmamos cobertura y disponibilidad antes de programar.`,
};

const CROSS_PAGE_FAQS: Record<string, { question: string; answer: string }[]> = {
  techos: [
    {
      question: "¿Cuánto cuesta reparar una gotera en {municipio}?",
      answer: "La reparación puntual de goteras figura desde $180.000 COP como referencia del catálogo. En {municipio}, el precio final depende del origen, el acceso y el sector de la cubierta que se acuerde intervenir. La visita inicial para cotizar no tiene costo; si hace falta una revisión específica, confirmamos su alcance y precio antes.",
    },
    {
      question: "¿Impermeabilizan techos en {municipio}?",
      answer: "Puedes solicitar impermeabilización de techos en {municipio}. La referencia del catálogo parte de $350.000 COP y no representa una cubierta completa. El material, la superficie, la preparación y el acceso se definen después de revisar el caso y quedan por escrito en la cotización.",
    },
    {
      question: "¿Cómo programan una reparación de techo en {municipio}?",
      answer: "Primero confirmamos el sector de {municipio}, el acceso y el trabajo que necesita la cubierta. La duración depende del área, los materiales, la preparación y las condiciones del sitio; la propuesta indica el alcance y la disponibilidad antes de programar.",
    },
  ],
  pintura: [
    {
      question: "¿Cuánto cuesta pintar un apartamento en {municipio}?",
      answer: "Para pintar un apartamento en {municipio} revisamos las superficies, su estado y los materiales. El catálogo de pintura interior parte de $280.000 COP como referencia inicial; no es el precio de un apartamento completo. El alcance y valor final quedan en la cotización.",
    },
    {
      question: "¿Pintan fachadas en {municipio}?",
      answer: "Puedes solicitar pintura de fachadas en {municipio}. El acabado de fachada figura desde $330.000 COP como referencia del catálogo. La cotización debe indicar la superficie, la preparación, los resanes, los materiales y las condiciones de acceso incluidos.",
    },
    {
      question: "¿Tratan humedad en paredes en {municipio}?",
      answer: "Una mancha no permite confirmar por sí sola el origen de la humedad. En {municipio} puedes solicitar la revisión del caso y pintura cuando la superficie esté en condiciones. La corrección de humedad superficial figura desde $250.000 COP como referencia; cualquier fuga, filtración o reparación adicional se cotiza por separado.",
    },
  ],
  plomeria: [
    {
      question: "¿Cuánto cuesta un plomero en {municipio}?",
      answer: "El catálogo de plomería incluye referencias desde $120.000 COP para revisión de presión, $170.000 para reparación de fugas, $160.000 para destape de desagües y $150.000 para cambio de grifería. En {municipio}, cada referencia corresponde a un servicio distinto; confirmamos el alcance y precio antes de realizarlo.",
    },
    {
      question: "¿Cómo confirman la disponibilidad de plomería en {municipio}?",
      answer: "Escríbenos por WhatsApp con el sector de {municipio} y una descripción del problema. Atendemos mensajes de lunes a sábado, de 7:00 a. m. a 6:00 p. m., y confirmamos la disponibilidad antes de programar. Fuera del horario puedes dejar el mensaje para revisión posterior.",
    },
    {
      question: "¿Destapan desagües en {municipio}?",
      answer: "Puedes solicitar destape de desagües de baño, cocina, patio o sifones en {municipio}. La referencia del catálogo parte de $160.000 COP. Indica qué punto está afectado, desde cuándo y si el problema se repite; confirmamos el alcance y el precio antes de intervenir.",
    },
  ],
};

function buildCrossPages(): CrossPageSEO[] {
  const pages: CrossPageSEO[] = [];
  for (const line of SERVICE_LINE_SEO) {
    for (const muni of MUNICIPALITY_SEO) {
      const lineLabel = LINE_LABELS[line.slug] ?? line.slug;
      const intro = LINE_INTRO[line.slug]?.(muni.name) ??
        `Consulta ${lineLabel.toLowerCase()} en ${muni.name}. Confirmamos cobertura, alcance y disponibilidad antes de programar.`;

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
        metaDescription: `${lineLabel} en ${muni.name}. Consulta atención en ${MUNICIPALITY_HOOKS[muni.slug] ?? muni.name}. Alcance y precio por escrito.`,
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
