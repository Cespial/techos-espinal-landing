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
    ogImage: "/blog/placeholder-servicios.svg",
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
          "Un apartamento estándar puede costar entre $800.000 y $3.500.000 COP dependiendo del tamaño, estado de las paredes y tipo de pintura. Visitamos tu espacio para darte un precio exacto sin costo.",
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
    ogImage: "/blog/placeholder-servicios.svg",
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
    ogImage: "/blog/placeholder-servicios.svg",
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
    title: "Servicios en Medellín: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Medellín. Visita técnica gratis, precios claros y garantía por escrito. Cotiza por WhatsApp.",
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
    title: "Servicios en Envigado: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Envigado. Visita técnica gratis, precios claros y garantía por escrito. Cotiza por WhatsApp.",
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
    title: "Servicios en Sabaneta: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Sabaneta. Visita técnica gratis, precios claros y garantía por escrito. Cotiza por WhatsApp.",
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
    title: "Servicios en Bello: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Bello. Visita técnica gratis, precios claros y garantía por escrito. Cotiza por WhatsApp.",
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
    title: "Servicios en Itagüí: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Itagüí. Visita técnica gratis, precios claros y garantía por escrito. Cotiza por WhatsApp.",
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
    title: "Servicios en La Estrella: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en La Estrella. Visita técnica gratis, precios claros y garantía por escrito. Cotiza por WhatsApp.",
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
    title: "Servicios en Caldas: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Caldas, Antioquia. Visita técnica gratis, precios claros y garantía por escrito.",
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
    title: "Servicios en Copacabana: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Copacabana. Visita técnica gratis, precios claros y garantía por escrito.",
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
    title: "Servicios en Girardota: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Girardota. Visita técnica gratis, precios claros y garantía por escrito.",
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
    title: "Servicios en Rionegro: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Rionegro, Antioquia. Visita técnica gratis y precios claros. Cotiza por WhatsApp.",
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
    title: "Servicios en La Ceja: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en La Ceja, Antioquia. Visita técnica gratis y precios claros. Cotiza por WhatsApp.",
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
    title: "Servicios en Marinilla: techos, pintura y plomería",
    metaDescription:
      "Reparación de techos, pintura y plomería en Marinilla, Antioquia. Visita técnica gratis y precios claros. Cotiza por WhatsApp.",
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
